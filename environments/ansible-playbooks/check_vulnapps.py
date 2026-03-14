#!/usr/bin/env python3
"""
Health check script for vulnerable applications deployed by remote_playbook_vulnapps.yml.
Usage: python3 check_vulnapps.py [host]
  host  IP or hostname of the remote server (default: localhost)
"""

import sys
import urllib.request
import urllib.error

def check(name, url, timeout=10):
    try:
        with urllib.request.urlopen(url, timeout=timeout) as resp:
            status = resp.status
            ok = status < 400
            print(f"  {'UP' if ok else 'WARN':4}  {name:20} {url}  (HTTP {status})")
            return ok
    except urllib.error.HTTPError as e:
        # Some apps return 4xx on root but are still running
        ok = e.code < 500
        print(f"  {'UP' if ok else 'DOWN':4}  {name:20} {url}  (HTTP {e.code})")
        return ok
    except Exception as e:
        print(f"  DOWN  {name:20} {url}  ({e})")
        return False


def main():
    host = sys.argv[1] if len(sys.argv) > 1 else "localhost"
    host = "192.168.1.49"

    apps = [
        ("Juice Shop",   f"http://{host}:3000"),
        ("WebGoat",      f"http://{host}:8082/WebGoat"),
        ("VAmPI",        f"http://{host}:5000"),
        ("WrongSecrets", f"http://{host}:8889"),
        ("DVWA",         f"http://{host}:4280"),
        ("Musashi JS",   f"http://{host}:8083"),
    ]

    print(f"\nChecking vulnerable apps on {host}...\n")
    results = [check(name, url) for name, url in apps]
    up = sum(results)
    total = len(results)
    print(f"\n{up}/{total} apps responding.\n")
    sys.exit(0 if up == total else 1)


if __name__ == "__main__":
    main()
