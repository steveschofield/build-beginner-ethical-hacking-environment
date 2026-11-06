#!/usr/bin/env bash
set -euo pipefail

project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec "${project_dir}/scripts/launch-kiosk.sh" "${1:-8080}"
