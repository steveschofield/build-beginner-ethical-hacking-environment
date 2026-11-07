# Background launcher

## Daily use

- Double-click **IM Exploring 2026** to start the local server and open the browser without a Terminal window.
- Use the browser and camera exactly as before. Keep the camera tab open while using the activities.
- Close the camera tab to release the webcam, then double-click **Stop IM Exploring 2026** to stop the background server.
- Closing Terminal is safe for a server started by the new launcher. Closing the browser does not stop the server automatically.
- The server does not start at login or after reboot. Double-click the launch icon again when needed.
- Repeated launches reuse the running background server. If a foreground or other server already occupies port 8080, the launcher reports it and leaves that session alone. Finish that session and press Control-C in its Terminal first, or use a different port.

## Terminal commands

From the IMExploring2026 directory:

```bash
./scripts/launch-background.sh
python3 scripts/background-kiosk.py status
./scripts/stop-background.sh
```

Pass a port such as `8088` to each command to manage a separate instance. The original `Launch-IMExploring2026.command` and `./scripts/launch-kiosk.sh` remain foreground troubleshooting options.

## Mac app bundles

`./scripts/build-mac-apps.sh` builds **IM Exploring 2026.app** and **Stop IM Exploring 2026.app** next to the scripts directory using macOS's built-in AppleScript compiler. They do not launch Terminal. Keep the apps in that directory; put aliases or symbolic links on the desktop. The generated bundles are ignored by Git and can be rebuilt from the script.

## Logs and process management

- Mac: `~/Library/Logs/IMExploring2026/`
- Kali: `~/.local/state/IMExploring2026/` (or `$XDG_STATE_HOME/IMExploring2026/`)
- Each checkout and port has a `.log` for launch output and `.http.log` for local server requests. Existing logs are kept and appended to.
- A small JSON file records the managed wrapper PID, exact process command, and start time. Stop checks the process identity before signaling it; the original wrapper then shuts down its own server. Unmanaged processes are never stopped, and no forced kill is used.
- The background wrapper is detached from the starting terminal and uses no terminal input or output. An exclusive file lock prevents duplicate simultaneous starts.
- This change does not modify the camera code, browser permissions, loopback binding, or model assets.

## Verification

```bash
for script in scripts/*.sh; do bash -n "$script" || exit; done
python3 tests/background-launcher-test.py
node --check app.js
node --check activities.js
node tests/static-check.mjs
```

The launcher test uses temporary state and spare local ports, with browser opening disabled. It covers detached operation, local asset responses, status, repeated and simultaneous launches, graceful stopping, occupied ports, stale process records, and invalid ports. It does not request camera access or test real-camera performance.
