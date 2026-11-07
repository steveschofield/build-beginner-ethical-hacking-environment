#!/usr/bin/env bash
set -euo pipefail
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Finder/desktop launches do not inherit interactive shell startup files.
if [[ "$(uname -s)" == "Darwin" ]]; then
  export PATH="/usr/bin:/bin:/usr/sbin:/sbin:/opt/homebrew/bin:/usr/local/bin:${PATH:-}"
fi
if message="$(python3 "${script_dir}/background-kiosk.py" start "${1:-8080}" 2>&1)"; then
  printf '%s\n' "${message}"
else
  printf '%s\n' "${message}" >&2
  if [[ "$(uname -s)" == "Linux" ]] && command -v notify-send >/dev/null 2>&1; then
    notify-send -u critical "IM Exploring 2026 could not start" "${message}" || true
  fi
  exit 1
fi
