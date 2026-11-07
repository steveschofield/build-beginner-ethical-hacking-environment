#!/usr/bin/env python3
"""Manage the existing local kiosk launcher without a visible terminal."""
import argparse
import fcntl
import hashlib
import json
import os
from pathlib import Path
import signal
import socket
import subprocess
import sys
import time
import urllib.request

PROJECT = Path(__file__).resolve().parent.parent


def process_identity(pid):
    result = subprocess.run(
        ["/bin/ps", "-p", str(pid), "-o", "lstart=", "-o", "command="],
        stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, env=dict(os.environ, LC_ALL="C"),
    )
    if result.returncode and result.stderr.strip():
        raise RuntimeError("Cannot safely identify the kiosk process: " + result.stderr.strip())
    return result.stdout.strip()


def owned_process(state):
    if not state or state.get("project") != str(PROJECT):
        return False
    pid = state.get("pid")
    if not isinstance(pid, int) or pid < 2 or not state.get("identity"):
        return False
    return process_identity(pid) == state["identity"]


def port_in_use(port):
    with socket.socket() as sock:
        sock.settimeout(0.3)
        return sock.connect_ex(("127.0.0.1", port)) == 0


def app_is_ready(port):
    try:
        with urllib.request.urlopen("http://127.0.0.1:%d/index.html" % port, timeout=0.5) as reply:
            return reply.read() == (PROJECT / "index.html").read_bytes()
    except (OSError, ValueError):
        return False


def open_browser(port):
    if os.environ.get("IMEXPLORING_NO_OPEN") == "1":
        return
    command = "open" if sys.platform == "darwin" else "xdg-open"
    try:
        subprocess.Popen(
            [command, "http://127.0.0.1:%d" % port], stdin=subprocess.DEVNULL,
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, start_new_session=True,
        )
    except OSError:
        raise RuntimeError("The server is running. Open http://127.0.0.1:%d in your browser." % port)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("action", choices=("start", "stop", "status"))
    parser.add_argument("port", nargs="?", type=int, default=8080)
    args = parser.parse_args()
    if not 1024 <= args.port <= 65535:
        parser.error("port must be between 1024 and 65535")
    base = (Path.home() / "Library/Logs/IMExploring2026" if sys.platform == "darwin"
            else Path(os.environ.get("XDG_STATE_HOME", str(Path.home() / ".local/state"))) / "IMExploring2026")
    base = Path(os.environ.get("IMEXPLORING_STATE_DIR", str(base)))
    base.mkdir(parents=True, exist_ok=True)
    key = "%s-%d" % (hashlib.sha256(str(PROJECT).encode()).hexdigest()[:12], args.port)
    state_path, log_path = base / (key + ".json"), base / (key + ".log")
    with (base / (key + ".lock")).open("a") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        try:
            state = json.loads(state_path.read_text())
        except (FileNotFoundError, ValueError):
            state = None
        live = owned_process(state)
        if args.action == "status":
            print(("Running" if live and app_is_ready(args.port) else "Not running") +
                  " at http://127.0.0.1:%d\nLog: %s" % (args.port, log_path))
            return 0 if live and app_is_ready(args.port) else 1
        if args.action == "stop":
            if not live:
                print("No managed background server is running. Other servers and browsers were left alone.")
                return 0
            # Re-check the exact command and process start time before signaling it.
            if not owned_process(state):
                raise RuntimeError("The server process changed; no process was stopped.")
            os.kill(state["pid"], signal.SIGTERM)
            for _ in range(100):
                if not owned_process(state):
                    state_path.unlink(missing_ok=True)
                    print("Background server stopped. Close the camera tab to release the webcam.")
                    return 0
                time.sleep(0.1)
            raise RuntimeError("The server has not exited yet; no forced termination was attempted. Log: %s" % log_path)
        if live:
            if not app_is_ready(args.port):
                raise RuntimeError("The managed server is not responding. Try Stop IM Exploring 2026, then launch it again. Log: %s" % log_path)
            open_browser(args.port)
            print("Already running in the background. Log: %s" % log_path)
            return 0
        if port_in_use(args.port):
            raise RuntimeError("Port %d is already in use. If IM Exploring 2026 was started in Terminal, finish that session and press Control-C in its Terminal, then launch again. Nothing was stopped." % args.port)
        # Fail safely before starting anything if process inspection is unavailable.
        if not process_identity(os.getpid()):
            raise RuntimeError("Process identity checks are unavailable; nothing was started.")
        environment = os.environ.copy()
        environment["IMEXPLORING_NO_OPEN"] = "1"
        environment["IMEXPLORING_BACKGROUND"] = "1"
        environment["IMEXPLORING_SERVER_LOG"] = str(base / (key + ".http.log"))
        with log_path.open("a") as log:
            log.write("\n--- Background start %s ---\n" % time.strftime("%Y-%m-%d %H:%M:%S"))
            log.flush()
            child = subprocess.Popen(
                ["/bin/bash", str(PROJECT / "scripts/launch-kiosk.sh"), str(args.port)],
                cwd=PROJECT, env=environment, stdin=subprocess.DEVNULL,
                stdout=log, stderr=subprocess.STDOUT, start_new_session=True,
            )
        for _ in range(100):
            if child.poll() is not None:
                raise RuntimeError("The server could not start. See %s" % log_path)
            if app_is_ready(args.port):
                # Give an immediate bind failure time to surface before declaring success.
                time.sleep(0.15)
                if child.poll() is not None:
                    raise RuntimeError("The server could not start. See %s" % log_path)
                identity = process_identity(child.pid)
                if not identity:
                    raise RuntimeError("The server exited before its identity could be recorded. See %s" % log_path)
                temporary = state_path.with_suffix(".tmp")
                temporary.write_text(json.dumps({"pid": child.pid, "identity": identity, "project": str(PROJECT), "port": args.port}, indent=2) + "\n")
                temporary.replace(state_path)
                open_browser(args.port)
                print("Running in the background at http://127.0.0.1:%d\nLog: %s" % (args.port, log_path))
                return 0
            time.sleep(0.1)
        child.terminate()
        raise RuntimeError("The server did not become ready. See %s" % log_path)


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (OSError, RuntimeError) as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
