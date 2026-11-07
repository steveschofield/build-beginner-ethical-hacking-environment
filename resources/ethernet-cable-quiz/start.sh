#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "$0")"
if ! command -v python3 >/dev/null 2>&1; then
  echo 'Python 3 is required. On Kali, Python 3 is normally already installed.' >&2
  exit 1
fi
exec python3 server.py "$@"
