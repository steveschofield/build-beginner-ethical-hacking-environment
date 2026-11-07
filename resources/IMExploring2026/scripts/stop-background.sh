#!/usr/bin/env bash
set -euo pipefail
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [[ "$(uname -s)" == "Darwin" ]]; then
  export PATH="/usr/bin:/bin:/usr/sbin:/sbin:/opt/homebrew/bin:/usr/local/bin:${PATH:-}"
fi
if message="$(python3 "${script_dir}/background-kiosk.py" stop "${1:-8080}" 2>&1)"; then
  printf '%s\n' "${message}"
  if [[ "$(uname -s)" == "Linux" ]] && command -v notify-send >/dev/null 2>&1; then
    notify-send "IM Exploring 2026" "${message}" || true
  fi
else
  printf '%s\n' "${message}" >&2
  if [[ "$(uname -s)" == "Linux" ]] && command -v notify-send >/dev/null 2>&1; then
    notify-send -u critical "IM Exploring 2026 could not stop" "${message}" || true
  fi
  exit 1
fi
