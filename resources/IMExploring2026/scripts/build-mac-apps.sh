#!/usr/bin/env bash
set -euo pipefail
project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
if [[ "$(uname -s)" != "Darwin" ]]; then
  echo "Run this script on macOS." >&2
  exit 1
fi
for action in launch stop; do
  if [[ "${action}" == "launch" ]]; then
    name="IM Exploring 2026"
  else
    name="Stop IM Exploring 2026"
  fi
  /usr/bin/osacompile -o "${project_dir}/${name}.app" <<APPLESCRIPT
on run
  set bundlePath to POSIX path of (path to me)
  set projectPath to do shell script "/usr/bin/dirname " & quoted form of bundlePath
  set launcherPath to projectPath & "/scripts/${action}-background.sh"
  try
    set resultMessage to do shell script quoted form of launcherPath
    if "${action}" is "stop" then
      display notification resultMessage with title "IM Exploring 2026"
    end if
  on error errorMessage
    display alert "IM Exploring 2026" message errorMessage as warning
  end try
end run
APPLESCRIPT
  /usr/libexec/PlistBuddy -c 'Add :LSUIElement bool true' "${project_dir}/${name}.app/Contents/Info.plist" 2>/dev/null || \
    /usr/libexec/PlistBuddy -c 'Set :LSUIElement true' "${project_dir}/${name}.app/Contents/Info.plist"
  /usr/bin/codesign --force --sign - "${project_dir}/${name}.app"
done
