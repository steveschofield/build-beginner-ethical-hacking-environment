#!/usr/bin/env python3
"""Integration checks using isolated state, spare ports, and no browser/camera."""
import hashlib
import json
import os
from pathlib import Path
import socket
import subprocess
import sys
import tempfile
import time
import urllib.request

ROOT = Path(__file__).resolve().parent.parent
MANAGER = ROOT / "scripts/background-kiosk.py"


def free_port():
    with socket.socket() as sock:
        sock.bind(("127.0.0.1", 0))
        return sock.getsockname()[1]


def call(action, port, env, expected=0):
    result = subprocess.run([sys.executable, str(MANAGER), action, str(port)], env=env,
                            stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    assert result.returncode == expected, result.stdout
    return result.stdout


def get(port):
    with urllib.request.urlopen("http://127.0.0.1:%d/index.html" % port, timeout=1) as response:
        return response.read()


def main():
    with tempfile.TemporaryDirectory(prefix="imexploring-launcher-test-") as directory:
        env = dict(os.environ, IMEXPLORING_STATE_DIR=directory, IMEXPLORING_NO_OPEN="1")
        port = free_port()
        state_path = Path(directory) / (hashlib.sha256(str(ROOT).encode()).hexdigest()[:12] + "-%d.json" % port)
        try:
            call("start", port, env)
            state = json.loads(state_path.read_text())
            assert get(port) == (ROOT / "index.html").read_bytes()
            sid = subprocess.check_output(["/bin/ps", "-p", str(state["pid"]), "-o", "tty="], text=True).strip()
            assert sid in ("??", "?"), "Background server still has a terminal: " + sid
            assert "Running" in call("status", port, env)
            call("start", port, env)
            assert json.loads(state_path.read_text())["pid"] == state["pid"], "Repeated launch created a second process"
            time.sleep(0.2)
            assert get(port), "Server did not survive the starting process exiting"
            call("stop", port, env)
            call("stop", port, env)
            assert "Not running" in call("status", port, env, expected=1)
            print("PASS: detached start, local assets, status, repeat start, stop, repeat stop")
            children = [subprocess.Popen([sys.executable, str(MANAGER), "start", str(port)], env=env,
                         stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True) for _ in range(2)]
            for child in children:
                output = child.communicate(timeout=15)[0]
                assert child.returncode == 0, output
            assert get(port)
            call("stop", port, env)
            print("PASS: simultaneous launches share one managed server")
            dummy = subprocess.Popen([sys.executable, "-m", "http.server", str(port), "--bind", "127.0.0.1"],
                                     cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            try:
                for _ in range(50):
                    try:
                        if get(port):
                            break
                    except OSError:
                        time.sleep(0.1)
                else:
                    raise AssertionError("Test server did not start")
                assert "already in use" in call("start", port, env, expected=1)
                state_path.write_text(json.dumps({"pid": dummy.pid, "identity": "stale or reused PID", "project": str(ROOT)}))
                call("stop", port, env)
                assert dummy.poll() is None and get(port), "Unmanaged server was disturbed"
                print("PASS: occupied port and stale/reused PID never stop an unrelated server")
            finally:
                dummy.terminate()
                dummy.wait(timeout=5)
            assert "between 1024 and 65535" in call("start", 0, env, expected=2)
            print("PASS: invalid ports rejected")
        finally:
            call("stop", port, env)


if __name__ == "__main__":
    main()
