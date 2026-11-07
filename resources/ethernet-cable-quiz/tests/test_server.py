"""Standard-library regression tests; every database lives in a temporary directory."""
import concurrent.futures
import csv
import gc
from email.message import Message
import http.client
import importlib.util
import io
import json
import socket
import subprocess
import sys
import time
from pathlib import Path
import tempfile
import threading
import unittest
from unittest import mock
from types import SimpleNamespace
import warnings
import uuid

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('ethernet_quiz_server', ROOT / 'server.py')
server = importlib.util.module_from_spec(spec)
spec.loader.exec_module(server)


def vote_id():
    return str(uuid.uuid4())


class StoreTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.path = Path(self.tmp.name) / 'nested' / 'votes.sqlite3'
        self.store = server.VoteStore(self.path)
        self.session = self.store.snapshot()['session_id']

    def vote(self, choice='medium', request_id=None):
        return self.store.vote(choice, request_id or vote_id(), self.session)

    def test_empty_state(self):
        state = self.store.snapshot()
        self.assertEqual(state['counts'], dict.fromkeys(server.CHOICES, 0))
        self.assertEqual(state['total'], 0)
        self.assertEqual(state['revision'], 0)
        self.assertEqual(state['recent'], [])
        uuid.UUID(state['session_id'])
        self.assertGreater(state['started'], 0)

    def test_persistence_after_reopen(self):
        self.vote('short'); self.vote('long')
        expected = self.store.snapshot()
        self.assertEqual(server.VoteStore(self.path).snapshot(), expected)

    def test_duplicate_vote_is_idempotent(self):
        request = vote_id()
        first = self.vote(request_id=request)
        second = self.vote(request_id=request)
        self.assertFalse(first['replayed'])
        self.assertTrue(second['replayed'])
        self.assertEqual(first['state'], second['state'])
        self.assertEqual(second['state']['total'], 1)

    def test_duplicate_id_cannot_change_choice_or_round(self):
        request = vote_id()
        self.vote(request_id=request)
        with self.assertRaises(server.Conflict):
            self.vote('long', request)
        new = self.store.new_session(self.session)
        with self.assertRaises(server.Conflict):
            self.store.vote('medium', request, new['session_id'])
        self.assertEqual(self.store.snapshot()['total'], 0)

    def test_retry_of_archived_vote_remains_idempotent(self):
        request = vote_id(); self.vote(request_id=request)
        self.store.new_session(self.session)
        result = self.vote(request_id=request)
        self.assertTrue(result['replayed'])
        self.assertEqual(result['state']['total'], 0)
        self.assertEqual(len(list(csv.DictReader(io.StringIO(self.store.export_csv(True).decode())))), 1)

    def test_concurrent_votes_are_all_counted(self):
        choices = list(server.CHOICES) * 30
        with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
            list(pool.map(self.vote, choices))
        state = self.store.snapshot()
        self.assertEqual(state['total'], 90)
        self.assertEqual(state['revision'], 90)
        self.assertEqual(state['counts'], dict.fromkeys(server.CHOICES, 30))
        self.assertEqual(len(state['recent']), 60)

    def test_concurrent_duplicates_only_count_once(self):
        request = vote_id()
        with concurrent.futures.ThreadPoolExecutor(max_workers=10) as pool:
            results = list(pool.map(lambda _: self.vote(request_id=request), range(30)))
        self.assertEqual(sum(not result['replayed'] for result in results), 1)
        self.assertEqual(self.store.snapshot()['total'], 1)
        self.assertEqual(self.store.snapshot()['revision'], 1)

    def test_invalid_choices_and_ids_leave_state_unchanged(self):
        for choice in ('', 'MEDIUM', 'other', None, [], {}, 0):
            with self.subTest(choice=choice), self.assertRaises(ValueError):
                self.store.vote(choice, vote_id(), self.session)
        for request in ('', 'invalid', None, [], {}, 7, vote_id().upper()):
            with self.subTest(request=request), self.assertRaises(ValueError):
                self.store.vote('medium', request, self.session)
        self.assertEqual(self.store.snapshot()['total'], 0)

    def test_new_round_archives_and_rejects_stale_writes(self):
        self.vote('short'); self.vote('long')
        state = self.store.new_session(self.session)
        self.assertNotEqual(state['session_id'], self.session)
        self.assertEqual(state['total'], 0)
        self.assertEqual(state['recent'], [])
        self.assertEqual(state['revision'], 3)
        with self.assertRaises(server.Conflict): self.vote()
        with self.assertRaises(server.Conflict): self.store.new_session(self.session)
        self.assertEqual(self.store.snapshot(), state)
        self.assertEqual(server.VoteStore(self.path).snapshot(), state)

    def test_csv_current_and_archived_rounds(self):
        self.vote('short'); self.vote('long')
        second = self.store.new_session(self.session)['session_id']
        self.store.vote('medium', vote_id(), second)
        current = list(csv.DictReader(io.StringIO(self.store.export_csv().decode())))
        all_rows = list(csv.DictReader(io.StringIO(self.store.export_csv(True).decode())))
        self.assertEqual(len(current), 1)
        self.assertEqual(current[0]['round'], second)
        self.assertEqual(current[0]['choice'], 'medium')
        self.assertTrue(current[0]['voted_at_utc'].endswith('+00:00'))
        self.assertEqual([row['choice'] for row in all_rows], ['short', 'long', 'medium'])
        self.assertEqual(all_rows[0]['round'], self.session)
        self.assertEqual(set(current[0]), {'round', 'choice', 'voted_at_utc'})

    def test_recent_window_is_in_insertion_order(self):
        sequence = [server.CHOICES[i % 3] for i in range(65)]
        for choice in sequence: self.vote(choice)
        state = self.store.snapshot()
        self.assertEqual([row['choice'] for row in state['recent']], sequence[-60:])
        self.assertEqual(state['total'], 65)


class StorageLifecycleTests(unittest.TestCase):
    def test_database_id_persists_and_differs_for_new_databases(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'one.sqlite3'
            store = server.VoteStore(path)
            first = store.snapshot()
            uuid.UUID(first['database_id'])
            store.new_session(first['session_id'])
            self.assertEqual(server.VoteStore(path).snapshot()['database_id'], first['database_id'])
            self.assertNotEqual(server.VoteStore(Path(directory) / 'two.sqlite3').snapshot()['database_id'], first['database_id'])

    def test_existing_database_without_id_is_migrated_once(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'votes.sqlite3'
            store = server.VoteStore(path)
            original = store.snapshot()
            store.vote('long', vote_id(), original['session_id'])
            with store.connect() as db:
                db.execute("DELETE FROM meta WHERE key='database_id'")
            migrated = server.VoteStore(path).snapshot()
            self.assertEqual(migrated['total'], 1)
            self.assertEqual(migrated['session_id'], original['session_id'])
            self.assertEqual(server.VoteStore(path).snapshot()['database_id'], migrated['database_id'])

    def test_connections_close_on_success_and_exception(self):
        with tempfile.TemporaryDirectory() as directory:
            store = server.VoteStore(Path(directory) / 'votes.sqlite3')
            with store.connect() as db:
                db.execute('SELECT 1')
            with self.assertRaises(server.sqlite3.ProgrammingError): db.execute('SELECT 1')
            with self.assertRaisesRegex(RuntimeError, 'intentional'):
                with store.connect() as failed:
                    raise RuntimeError('intentional')
            with self.assertRaises(server.sqlite3.ProgrammingError): failed.execute('SELECT 1')

    def test_storage_operations_emit_no_resource_warning(self):
        gc.collect()
        with warnings.catch_warnings(record=True) as captured:
            warnings.simplefilter('always', ResourceWarning)
            with tempfile.TemporaryDirectory() as directory:
                store = server.VoteStore(Path(directory) / 'votes.sqlite3')
                for _ in range(10):
                    state = store.snapshot()
                    request = vote_id()
                    store.vote('medium', request, state['session_id'])
                    store.vote('medium', request, state['session_id'])
                    with self.assertRaises(server.Conflict):
                        store.vote('long', request, state['session_id'])
                    store.export_csv(True)
                    store.new_session(state['session_id'])
                del store
                gc.collect()
            self.assertEqual([str(w.message) for w in captured if issubclass(w.category, ResourceWarning)], [])


class LANPolicyTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.store = server.VoteStore(Path(self.tmp.name) / 'votes.sqlite3')

    def handler(self, client='192.168.1.50', host='192.168.1.8', path='/api/state', body=None):
        handler = object.__new__(server.PollHandler)
        handler.server = SimpleNamespace(server_address=(host, 8765), store=self.store)
        handler.client_address = (client, 50000)
        handler.headers = Message()
        handler.headers['Host'] = f'{host}:8765'
        handler.headers['Origin'] = f'http://{host}:8765'
        handler.headers['Content-Type'] = 'application/json'
        handler.headers['X-Ethernet-Poll'] = '1'
        payload = json.dumps(body or {}).encode()
        handler.headers['Content-Length'] = str(len(payload))
        handler.rfile = io.BytesIO(payload)
        handler.path = path
        handler.reply = mock.Mock()
        return handler

    def test_lan_requires_exact_bound_host_and_port(self):
        handler = self.handler()
        self.assertTrue(handler.allowed_host())
        for host in ('localhost:8765', '127.0.0.1:8765', '192.168.1.8:8766', '192.168.1.9:8765', 'evil.example:8765', '192.168.1.8.evil.example:8765'):
            with self.subTest(host=host):
                handler.headers.replace_header('Host', host)
                self.assertFalse(handler.allowed_host())

    def test_admin_is_only_loopback_or_booth_address(self):
        for client, expected in [('127.0.0.1', True), ('192.168.1.8', True), ('192.168.1.50', False), ('10.0.0.2', False)]:
            with self.subTest(client=client):
                handler = self.handler(client=client)
                self.assertEqual(handler.can_admin(), expected)
                handler.do_GET()
                self.assertEqual(handler.reply.call_args.args[0], 200)
                self.assertEqual(handler.reply.call_args.args[1]['can_admin'], expected)
        self.assertNotIn('can_admin', self.store.snapshot())

    def test_remote_can_vote_and_receives_non_admin_state(self):
        state = self.store.snapshot()
        handler = self.handler(path='/api/vote', body={'choice': 'long', 'request_id': vote_id(), 'session_id': state['session_id']})
        handler.do_POST()
        status, receipt = handler.reply.call_args.args
        self.assertEqual(status, 200)
        self.assertFalse(receipt['state']['can_admin'])
        self.assertEqual(receipt['state']['total'], 1)

    def test_remote_cannot_export_or_start_round(self):
        state = self.store.snapshot()
        self.store.vote('medium', vote_id(), state['session_id'])
        before = self.store.snapshot()
        for path in ('/api/export.csv', '/api/export.csv?all=1'):
            with self.subTest(path=path):
                handler = self.handler(path=path)
                handler.do_GET()
                self.assertEqual(handler.reply.call_args.args[0], 403)
        handler = self.handler(path='/api/new-round', body={'confirmation': 'NEW', 'session_id': state['session_id']})
        handler.do_POST()
        self.assertEqual(handler.reply.call_args.args[0], 403)
        self.assertEqual(self.store.snapshot(), before)

    def test_booth_lan_address_can_export_and_start_round(self):
        handler = self.handler(client='192.168.1.8', path='/api/export.csv')
        handler.do_GET()
        self.assertEqual(handler.reply.call_args.args[0], 200)
        handler = self.handler(client='192.168.1.8', path='/api/new-round', body={'confirmation': 'NEW', 'session_id': self.store.snapshot()['session_id']})
        handler.do_POST()
        self.assertEqual(handler.reply.call_args.args[0], 200)
        self.assertTrue(handler.reply.call_args.args[1]['can_admin'])

    def test_host_cli_accepts_private_and_loopback_addresses(self):
        for host in ('127.0.0.1', '192.168.1.8', '10.2.3.4', '172.16.2.3'):
            with self.subTest(host=host), mock.patch.object(sys, 'argv', ['server.py', '--host', host, '--no-browser', '--data-dir', self.tmp.name]), mock.patch.object(server, 'VoteStore', return_value=self.store), mock.patch.object(server, 'PollServer') as poll, mock.patch('builtins.print'):
                server.main()
                self.assertEqual(poll.call_args.args[0], (host, 8765))
                poll.return_value.serve_forever.assert_called_once()
                poll.return_value.server_close.assert_called_once()

    def test_host_cli_rejects_public_wildcard_ipv6_and_names(self):
        for host in ('0.0.0.0', '8.8.8.8', '224.0.0.1', '::1', 'localhost', 'example.com', '192.168.1.999'):
            with self.subTest(host=host), mock.patch.object(sys, 'argv', ['server.py', '--host', host, '--no-browser']), mock.patch.object(server, 'VoteStore') as store, mock.patch('sys.stderr', new_callable=io.StringIO):
                with self.assertRaises(SystemExit) as caught:
                    server.main()
                self.assertEqual(caught.exception.code, 2)
                store.assert_not_called()


class CLITests(unittest.TestCase):
    def test_invalid_port_is_rejected(self):
        for port in ('0', '65536', '-1'):
            with self.subTest(port=port):
                result = subprocess.run([sys.executable, str(ROOT / 'server.py'), '--port', port, '--no-browser'], capture_output=True, text=True, timeout=5)
                self.assertEqual(result.returncode, 2)
                self.assertIn('Port must be between', result.stderr)

    def test_startup_and_restart_persistence_in_temporary_directory(self):
        with tempfile.TemporaryDirectory() as directory:
            with socket.socket() as reservation:
                reservation.bind(('127.0.0.1', 0))
                port = reservation.getsockname()[1]
            expected_session = None
            for launch in range(2):
                process = subprocess.Popen([sys.executable, str(ROOT / 'server.py'), '--port', str(port), '--data-dir', directory, '--no-browser'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
                try:
                    deadline = time.monotonic() + 5
                    state = None
                    while time.monotonic() < deadline:
                        self.assertIsNone(process.poll(), 'CLI server stopped unexpectedly')
                        conn = http.client.HTTPConnection('127.0.0.1', port, timeout=.3)
                        try:
                            conn.request('GET', '/api/state')
                            response = conn.getresponse()
                            if response.status == 200:
                                state = json.loads(response.read())
                                break
                        except (OSError, http.client.HTTPException):
                            time.sleep(.05)
                        finally:
                            conn.close()
                    self.assertIsNotNone(state, 'CLI did not become ready')
                    if launch == 0:
                        expected_session = state['session_id']
                        body = json.dumps({'choice': 'long', 'request_id': vote_id(), 'session_id': expected_session})
                        conn = http.client.HTTPConnection('127.0.0.1', port, timeout=2)
                        try:
                            conn.request('POST', '/api/vote', body, {'Content-Type': 'application/json', 'X-Ethernet-Poll': '1'})
                            response = conn.getresponse()
                            self.assertEqual(response.status, 200)
                            self.assertEqual(json.loads(response.read())['state']['total'], 1)
                        finally:
                            conn.close()
                    else:
                        self.assertEqual(state['session_id'], expected_session)
                        self.assertEqual(state['counts']['long'], 1)
                    self.assertTrue((Path(directory) / 'votes.sqlite3').exists())
                finally:
                    process.terminate()
                    try:
                        output, errors = process.communicate(timeout=5)
                    except subprocess.TimeoutExpired:
                        process.kill(); output, errors = process.communicate(timeout=5)
                self.assertIn('http://127.0.0.1:', output)
                self.assertIn('Works offline', output)


class HTTPTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp = tempfile.TemporaryDirectory()
        cls.store = server.VoteStore(Path(cls.tmp.name) / 'test.sqlite3')
        cls.httpd = server.PollServer(('127.0.0.1', 0), cls.store)
        cls.port = cls.httpd.server_address[1]
        cls.thread = threading.Thread(target=cls.httpd.serve_forever, daemon=True)
        cls.thread.start()

    @classmethod
    def tearDownClass(cls):
        cls.httpd.shutdown(); cls.httpd.server_close(); cls.thread.join(timeout=5)
        cls.tmp.cleanup()

    def setUp(self):
        self.session = self.store.new_session(self.store.snapshot()['session_id'])['session_id']

    def request(self, method='GET', path='/api/state', body=None, headers=None, raw=None):
        default_headers = {'Host': f'127.0.0.1:{self.port}'}
        if method == 'POST':
            default_headers.update({'Content-Type': 'application/json', 'X-Ethernet-Poll': '1', 'Origin': f'http://127.0.0.1:{self.port}'})
        if headers:
            for key, value in headers.items():
                if value is None: default_headers.pop(key, None)
                else: default_headers[key] = value
        payload = raw if raw is not None else (json.dumps(body).encode() if body is not None else None)
        conn = http.client.HTTPConnection('127.0.0.1', self.port, timeout=5)
        try:
            conn.request(method, path, body=payload, headers=default_headers)
            response = conn.getresponse()
            return response.status, dict(response.getheaders()), response.read()
        finally: conn.close()

    def payload(self, **changes):
        body = {'choice': 'medium', 'request_id': vote_id(), 'session_id': self.session}
        body.update(changes)
        return body

    def test_state_and_security_headers(self):
        status, headers, data = self.request()
        self.assertEqual(status, 200)
        self.assertEqual(json.loads(data)['session_id'], self.session)
        self.assertEqual(headers['Cache-Control'], 'no-store')
        self.assertEqual(headers['X-Content-Type-Options'], 'nosniff')
        self.assertIn("frame-ancestors 'none'", headers['Content-Security-Policy'])
        self.assertNotIn('Access-Control-Allow-Origin', headers)
        self.assertEqual(self.httpd.server_address[0], '127.0.0.1')

    def test_static_files_and_traversal(self):
        for path, mime in [('/', 'text/html'), ('/app.js', 'text/javascript'), ('/styles.css', 'text/css'), ('/montcalm-theme.css', 'text/css'), ('/fonts/plus-jakarta-sans-latin.woff2', 'font/woff2')]:
            with self.subTest(path=path):
                status, headers, body = self.request(path=path)
                self.assertEqual(status, 200)
                self.assertIn(mime, headers['Content-Type'])
                self.assertTrue(body)
        for path in ('/server.py', '/data/votes.sqlite3', '/../server.py', '/%2e%2e/server.py', '/missing'):
            with self.subTest(path=path): self.assertEqual(self.request(path=path)[0], 404)

    def test_vote_replay_and_conflict(self):
        body = self.payload()
        self.assertEqual(self.request('POST', '/api/vote', body)[0], 200)
        status, _, data = self.request('POST', '/api/vote', body)
        self.assertEqual(status, 200); self.assertTrue(json.loads(data)['replayed'])
        body['choice'] = 'long'
        self.assertEqual(self.request('POST', '/api/vote', body)[0], 409)
        self.assertEqual(self.store.snapshot()['total'], 1)

    def test_reject_bad_host_for_reads_and_writes(self):
        for host in ('evil.example', f'evil.example:{self.port}', f'127.0.0.1:{self.port + 1}', f'localhost.evil:{self.port}'):
            for method in ('GET', 'POST'):
                with self.subTest(host=host, method=method):
                    self.assertEqual(self.request(method, '/api/vote', self.payload() if method == 'POST' else None, {'Host': host})[0], 403)
        self.assertEqual(self.store.snapshot()['total'], 0)

    def test_reject_cross_origin_or_missing_custom_header(self):
        for headers in ({'Origin': 'https://example.com'}, {'Origin': 'null'}, {'Origin': f'http://localhost:{self.port}'}, {'X-Ethernet-Poll': None}, {'X-Ethernet-Poll': '0'}):
            with self.subTest(headers=headers):
                self.assertEqual(self.request('POST', '/api/vote', self.payload(), headers)[0], 403)
        self.assertEqual(self.store.snapshot()['total'], 0)

    def test_accept_matching_localhost_origin_and_cli_no_origin(self):
        self.assertEqual(self.request('POST', '/api/vote', self.payload(), {'Host': f'localhost:{self.port}', 'Origin': f'http://localhost:{self.port}'})[0], 200)
        self.assertEqual(self.request('POST', '/api/vote', self.payload(), {'Origin': None})[0], 200)

    def test_bad_json_and_content_type(self):
        for raw in (b'{broken', b'[]', b'null', b'123', b'"text"', b'\xff'):
            with self.subTest(raw=raw): self.assertEqual(self.request('POST', '/api/vote', raw=raw)[0], 400)
        self.assertEqual(self.request('POST', '/api/vote', self.payload(), {'Content-Type': 'text/plain'})[0], 415)
        self.assertEqual(self.request('POST', '/api/vote', raw=b'')[0], 413)
        self.assertEqual(self.request('POST', '/api/vote', raw=b' ' * 2049)[0], 413)
        self.assertEqual(self.store.snapshot()['total'], 0)

    def test_invalid_fields(self):
        for changes in ({'choice': 'unknown'}, {'request_id': 'bad'}, {'choice': {}}, {'request_id': []}):
            with self.subTest(changes=changes):
                self.assertEqual(self.request('POST', '/api/vote', self.payload(**changes))[0], 400)
        self.assertEqual(self.request('POST', '/api/vote', self.payload(session_id='old-round'))[0], 409)

    def test_new_round_confirmation_and_stale_conflict(self):
        body = {'session_id': self.session, 'confirmation': 'new'}
        self.assertEqual(self.request('POST', '/api/new-round', body)[0], 400)
        body['confirmation'] = 'NEW'
        status, _, data = self.request('POST', '/api/new-round', body)
        self.assertEqual(status, 200)
        self.assertNotEqual(json.loads(data)['session_id'], self.session)
        self.assertEqual(self.request('POST', '/api/new-round', body)[0], 409)
        self.assertEqual(self.request('POST', '/api/vote', self.payload())[0], 409)

    def test_csv_download(self):
        self.request('POST', '/api/vote', self.payload())
        status, headers, data = self.request(path='/api/export.csv')
        self.assertEqual(status, 200)
        self.assertIn('text/csv', headers['Content-Type'])
        self.assertIn('attachment;', headers['Content-Disposition'])
        self.assertEqual(len(list(csv.DictReader(io.StringIO(data.decode())))), 1)
        self.assertEqual(self.request(path='/api/export.csv?all=1')[0], 200)

    def test_unknown_post_endpoint(self):
        self.assertEqual(self.request('POST', '/api/unknown', {})[0], 404)


if __name__ == '__main__':
    unittest.main()
