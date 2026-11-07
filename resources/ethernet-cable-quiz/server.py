#!/usr/bin/env python3
"""Offline Ethernet poll. Localhost by default, optional trusted LAN. Python standard library only."""
import argparse
from contextlib import contextmanager
import csv
import io
import ipaddress
import json
import sqlite3
import time
import uuid
import webbrowser
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent
CHOICES = ("short", "medium", "long")


class Conflict(ValueError):
    pass


class VoteStore:
    def __init__(self, path):
        self.path = Path(path)
        self.path.parent.mkdir(parents=True, exist_ok=True)
        with self.connect() as db:
            db.executescript("""
                PRAGMA journal_mode=WAL;
                CREATE TABLE IF NOT EXISTS sessions (
                    id TEXT PRIMARY KEY, started REAL NOT NULL);
                CREATE TABLE IF NOT EXISTS votes (
                    request_id TEXT PRIMARY KEY,
                    session_id TEXT NOT NULL REFERENCES sessions(id),
                    choice TEXT NOT NULL CHECK(choice IN ('short','medium','long')),
                    created REAL NOT NULL);
                CREATE INDEX IF NOT EXISTS votes_session ON votes(session_id, created);
                CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
            """)
            db.execute("BEGIN IMMEDIATE")
            if not db.execute("SELECT value FROM meta WHERE key='active'").fetchone():
                session = str(uuid.uuid4())
                db.execute("INSERT INTO sessions VALUES (?, ?)", (session, time.time()))
                db.executemany("INSERT INTO meta VALUES (?, ?)", [("active", session), ("revision", "0")])
            db.execute("INSERT OR IGNORE INTO meta VALUES (?, ?)", ("database_id", str(uuid.uuid4())))

    @contextmanager
    def connect(self):
        db = sqlite3.connect(self.path, timeout=10)
        db.row_factory = sqlite3.Row
        db.execute("PRAGMA foreign_keys=ON")
        try:
            with db:
                yield db
        finally:
            db.close()

    def snapshot(self):
        with self.connect() as db:
            db.execute("BEGIN")
            meta = dict(db.execute("SELECT key,value FROM meta").fetchall())
            counts = dict.fromkeys(CHOICES, 0)
            counts.update({row["choice"]: row["n"] for row in db.execute(
                "SELECT choice,COUNT(*) AS n FROM votes WHERE session_id=? GROUP BY choice", (meta["active"],))})
            recent = [dict(row) for row in db.execute(
                "SELECT choice,created FROM votes WHERE session_id=? ORDER BY rowid DESC LIMIT 60", (meta["active"],))]
            started = db.execute("SELECT started FROM sessions WHERE id=?", (meta["active"],)).fetchone()[0]
            return {"app": "ethernet-cable-quiz", "database_id": meta["database_id"], "session_id": meta["active"], "revision": int(meta["revision"]), "started": started,
                    "counts": counts, "total": sum(counts.values()), "recent": list(reversed(recent))}

    def vote(self, choice, request_id, session_id):
        if choice not in CHOICES:
            raise ValueError("Choose short, medium, or long.")
        try:
            if str(uuid.UUID(request_id)) != request_id:
                raise ValueError()
        except (ValueError, TypeError, AttributeError):
            raise ValueError("A valid vote ID is required.") from None
        replayed = False
        with self.connect() as db:
            db.execute("BEGIN IMMEDIATE")
            previous = db.execute("SELECT choice,session_id FROM votes WHERE request_id=?", (request_id,)).fetchone()
            if previous:
                if previous["choice"] != choice or previous["session_id"] != session_id:
                    raise Conflict("This vote ID was already used for a different vote.")
                replayed = True
            elif db.execute("SELECT value FROM meta WHERE key='active'").fetchone()[0] != session_id:
                raise Conflict("A new round has started. Please choose again.")
            else:
                db.execute("INSERT INTO votes VALUES (?,?,?,?)", (request_id, session_id, choice, time.time()))
                db.execute("UPDATE meta SET value=CAST(value AS INTEGER)+1 WHERE key='revision'")
        return {"replayed": replayed, "choice": choice, "state": self.snapshot()}

    def new_session(self, expected_session):
        with self.connect() as db:
            db.execute("BEGIN IMMEDIATE")
            if db.execute("SELECT value FROM meta WHERE key='active'").fetchone()[0] != expected_session:
                raise Conflict("The round already changed. Refresh before starting another.")
            session = str(uuid.uuid4())
            db.execute("INSERT INTO sessions VALUES (?,?)", (session, time.time()))
            db.execute("UPDATE meta SET value=? WHERE key='active'", (session,))
            db.execute("UPDATE meta SET value=CAST(value AS INTEGER)+1 WHERE key='revision'")
        return self.snapshot()

    def export_csv(self, all_rounds=False):
        output = io.StringIO(newline="")
        writer = csv.writer(output)
        writer.writerow(["round", "choice", "voted_at_utc"])
        with self.connect() as db:
            query = "SELECT session_id,choice,created FROM votes"
            params = ()
            if not all_rounds:
                query += " WHERE session_id=?"
                params = (db.execute("SELECT value FROM meta WHERE key='active'").fetchone()[0],)
            for row in db.execute(query + " ORDER BY rowid", params):
                writer.writerow([row[0], row[1], datetime.fromtimestamp(row[2], timezone.utc).isoformat()])
        return output.getvalue().encode("utf-8")


class PollServer(ThreadingHTTPServer):
    daemon_threads = True
    allow_reuse_address = True

    def __init__(self, address, store):
        self.store = store
        super().__init__(address, PollHandler)


class PollHandler(BaseHTTPRequestHandler):
    server_version = "EthernetQuiz/1.0"

    def log_message(self, *args):
        pass  # No visitor/IP logs or tracking.

    def reply(self, status, body, content_type="application/json; charset=utf-8", download=None):
        if not isinstance(body, bytes):
            body = json.dumps(body).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "no-referrer")
        self.send_header("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'")
        if download:
            self.send_header("Content-Disposition", 'attachment; filename="' + download + '"')
        self.end_headers()
        self.wfile.write(body)

    def allowed_host(self):
        port = self.server.server_address[1]
        host = self.server.server_address[0]
        allowed = {f"{host}:{port}"}
        if host == "127.0.0.1":
            allowed.add(f"localhost:{port}")
        return self.headers.get("Host") in allowed

    def can_admin(self):
        return self.client_address[0] in ("127.0.0.1", self.server.server_address[0])

    def public_state(self, state):
        return dict(state, can_admin=self.can_admin())

    def do_GET(self):
        if not self.allowed_host():
            return self.reply(403, {"error": "Use the localhost address printed in the terminal."})
        path = urlsplit(self.path).path
        try:
            if path == "/api/state":
                return self.reply(200, self.public_state(self.server.store.snapshot()))
            if path == "/api/export.csv":
                if not self.can_admin():
                    return self.reply(403, {"error": "Export is available only on the booth computer."})
                all_rounds = urlsplit(self.path).query == "all=1"
                return self.reply(200, self.server.store.export_csv(all_rounds), "text/csv; charset=utf-8", "ethernet-votes.csv")
            files = {"/": ("index.html", "text/html"), "/app.js": ("app.js", "text/javascript"),
                     "/styles.css": ("styles.css", "text/css"),
                     "/montcalm-theme.css": ("montcalm-theme.css", "text/css"),
                     "/fonts/plus-jakarta-sans-latin.woff2": ("fonts/plus-jakarta-sans-latin.woff2", "font/woff2")}
            if path in files:
                name, mime = files[path]
                return self.reply(200, (ROOT / "static" / name).read_bytes(), mime + "; charset=utf-8")
            return self.reply(404, {"error": "Not found."})
        except (sqlite3.Error, OSError):
            return self.reply(503, {"error": "Local data is unavailable. Check the terminal and disk space."})

    def do_POST(self):
        origin = self.headers.get("Origin")
        expected = "http://" + self.headers.get("Host", "")
        if not self.allowed_host() or self.headers.get("X-Ethernet-Poll") != "1" or (origin and origin != expected):
            return self.reply(403, {"error": "Only the local quiz can submit votes."})
        if self.headers.get_content_type() != "application/json":
            return self.reply(415, {"error": "JSON required."})
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if not 0 < length <= 2048:
                return self.reply(413, {"error": "Invalid request size."})
            body = json.loads(self.rfile.read(length))
            if not isinstance(body, dict):
                raise ValueError("Expected a JSON object.")
            path = urlsplit(self.path).path
            if path == "/api/vote":
                result = self.server.store.vote(body.get("choice"), body.get("request_id"), body.get("session_id"))
                result["state"] = self.public_state(result["state"])
            elif path == "/api/new-round":
                if not self.can_admin():
                    return self.reply(403, {"error": "Start new rounds on the booth computer."})
                if body.get("confirmation") != "NEW":
                    raise ValueError("Type NEW to archive this round and start another.")
                result = self.public_state(self.server.store.new_session(body.get("session_id")))
            else:
                return self.reply(404, {"error": "Not found."})
            return self.reply(200, result)
        except Conflict as error:
            return self.reply(409, {"error": str(error)})
        except (ValueError, UnicodeError, TypeError) as error:
            return self.reply(400, {"error": str(error) or "Invalid request."})
        except sqlite3.Error:
            return self.reply(503, {"error": "The vote could not be confirmed. Check disk space, then retry."})


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--host", default="127.0.0.1", help="Loopback or a specific private LAN IPv4 address; never all interfaces.")
    parser.add_argument("--port", type=int, default=8765)
    parser.add_argument("--data-dir", type=Path, default=ROOT / "data")
    parser.add_argument("--no-browser", action="store_true")
    args = parser.parse_args()
    try:
        address = ipaddress.IPv4Address(args.host)
        if not (address.is_loopback or address.is_private) or address.is_unspecified or address.is_multicast:
            raise ValueError()
    except ValueError:
        parser.error("Host must be a specific loopback or private LAN IPv4 address.")
    if not 1 <= args.port <= 65535:
        parser.error("Port must be between 1 and 65535.")
    try:
        server = PollServer((args.host, args.port), VoteStore(args.data_dir / "votes.sqlite3"))
    except (OSError, sqlite3.Error) as error:
        parser.exit(1, f"Could not start the quiz: {error}\nIf the port is busy, use --port 8766.\n")
    url = f"http://{args.host}:{args.port}"
    print(f"\nEthernet cable quiz: {url}\nLive display only: {url}/?display=1\nVotes saved in: {(args.data_dir / 'votes.sqlite3').resolve()}\nWorks offline. Keep this terminal open. Press Ctrl+C to stop.\n", flush=True)
    if not args.no_browser:
        webbrowser.open(url)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nQuiz stopped. Votes are saved.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
