#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
project_dir="$(cd "${script_dir}/.." && pwd)"
port="${1:-8080}"
url="http://127.0.0.1:${port}"
server_log="${IMEXPLORING_SERVER_LOG:-${TMPDIR:-/tmp}/imexploring2026-server-${port}.log}"

if ! command -v python3 >/dev/null 2>&1; then
  echo "Python 3 is required to run the local kiosk server."
  exit 1
fi

cd "${project_dir}"
python3 -m http.server "${port}" --bind 127.0.0.1 >>"${server_log}" 2>&1 &
server_pid=$!

cleanup() {
  if kill -0 "${server_pid}" 2>/dev/null; then
    kill "${server_pid}" 2>/dev/null || true
    wait "${server_pid}" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

ready=0
for _ in {1..50}; do
  if ! kill -0 "${server_pid}" 2>/dev/null; then
    echo "The local server could not start. Port ${port} may already be in use."
    echo "Try: ./scripts/launch-kiosk.sh 8088"
    echo "Details: ${server_log}"
    exit 1
  fi
  if python3 -c "import urllib.request; urllib.request.urlopen('${url}', timeout=0.2).read(1)" >/dev/null 2>&1; then
    ready=1
    break
  fi
  sleep 0.1
done

if [[ "${ready}" -ne 1 ]]; then
  echo "The local server did not become ready. Details: ${server_log}"
  exit 1
fi

echo "See Yourself in AI is running locally at ${url}"
echo "Camera frames stay in the browser and are not exposed by this server."
if [[ "${IMEXPLORING_BACKGROUND:-0}" == "1" ]]; then
  echo "Background mode. Use Stop IM Exploring 2026 to stop the server."
else
  echo "Keep this window open. Press Ctrl+C to stop."
fi

if [[ "${IMEXPLORING_NO_OPEN:-0}" != "1" ]]; then
  case "$(uname -s)" in
    Darwin) open "${url}" ;;
    Linux)
      if command -v xdg-open >/dev/null 2>&1; then
        xdg-open "${url}" >/dev/null 2>&1 || true
      else
        echo "Open ${url} in Chromium."
      fi
      ;;
    *) echo "Open ${url} in Chromium or Chrome." ;;
  esac
fi

wait "${server_pid}"
