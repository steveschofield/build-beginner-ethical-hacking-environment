#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
project_dir="$(cd "${script_dir}/.." && pwd)"
port="${1:-8080}"

cd "${project_dir}"
echo "See Yourself in AI: http://127.0.0.1:${port}"
echo "Press Ctrl+C to stop the kiosk server."
python3 -m http.server "${port}" --bind 127.0.0.1
