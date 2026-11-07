#!/usr/bin/env python3
"""Double-click launcher: reuse or start the local server, then open the quiz."""
import json
import subprocess
import sys
import time
import urllib.error
import urllib.request
import webbrowser
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CONFIG = json.loads((ROOT / 'settings.json').read_text()) if (ROOT / 'settings.json').exists() else {}
HOST = CONFIG.get('host', '127.0.0.1')
URL = f'http://{HOST}:8765'


def check():
    try:
        with urllib.request.urlopen(URL + '/api/state', timeout=1) as response:
            result = json.load(response)
        if result.get('app') != 'ethernet-cable-quiz':
            raise RuntimeError('Port 8765 is in use by a different app. See README.md to use another port.')
        return True
    except urllib.error.URLError:
        return False


def main():
    if not check():
        data = ROOT / 'data'
        data.mkdir(exist_ok=True)
        with (data / 'server.log').open('a') as log:
            process = subprocess.Popen([sys.executable, str(ROOT / 'server.py'), '--no-browser', '--host', HOST], cwd=ROOT,
                                       stdout=log, stderr=log, stdin=subprocess.DEVNULL, start_new_session=True)
        for _ in range(40):
            if check():
                (data / 'server.pid').write_text(str(process.pid) + '\n')
                break
            if process.poll() is not None:
                raise RuntimeError('The quiz server could not start. Check data/server.log.')
            time.sleep(.1)
        else:
            raise RuntimeError('The server did not become ready. Check data/server.log.')
    print('Cable Clash is ready at ' + URL + '\nThe local server keeps running when the browser closes. Votes are saved.')
    webbrowser.open(URL + ('/?display=1' if '--display' in sys.argv else ''))


if __name__ == '__main__':
    try:
        main()
    except (OSError, ValueError, RuntimeError) as error:
        print('Could not open Cable Clash: ' + str(error), file=sys.stderr)
        sys.exit(1)
