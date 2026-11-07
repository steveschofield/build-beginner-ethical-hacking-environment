# Cable Clash: the Ethernet challenge

An offline walk-up prediction poll for three physical Ethernet cables. Students tap a large choice; the screen records one vote, updates the totals immediately, and celebrates a complete two-ended cable with confetti. Respecting the operating system's **Reduce motion** setting disables confetti and animation.

## Quick start

Requirements: **Python 3.9+** and a modern browser (Chromium/Chrome, Firefox, or Safari). No packages, internet connection, npm, remotely loaded fonts, accounts, camera, or microphone are needed. The Plus Jakarta Sans font is bundled locally.

**Kali / Linux:** In this folder, run `python3 launch.py`. A local server starts in the background and the browser opens. Re-running the launcher reuses the server. Press **F11** or click **Full screen** for the booth.

**Mac:** Double-click `Launch-Ethernet-Quiz.command`, or run `python3 launch.py` in this folder.

**Foreground / alternative port:** `./start.sh --port 8766` (or `python3 server.py --port 8766`). Keep that terminal open. Stop with Ctrl+C. The default port is 8765.

Open **http://127.0.0.1:8765** on the computer running the app. This server deliberately listens only on localhost. It is not reachable from other machines and is not publicly hosted. It does not alter firewall or network security settings.

### Display-only screen

Open **http://127.0.0.1:8765/?display=1** in a second browser window on the **same computer**, then move it to a second monitor. It refreshes every second and has no voting controls. The main voting screen also includes live totals and the trend, so a second monitor is optional.

## Set up the table

Place the cables left to right and label them to match the screen:

- **A · Short:** one RJ45 plug and one unfinished end.
- **B · Medium:** RJ45 plugs on both ends.
- **C · Long:** RJ45 plugs on both ends.

Ask students to predict which sends data fastest before tapping. The drawings are symbolic, not to scale. The app cannot measure cable length, category, quality, continuity or link speed.

**Teaching note:** the short cable cannot connect two Ethernet ports as shown. Medium is a sensible choice, but **medium and long can have the same negotiated link speed and throughput** if both are properly made, appropriate for the devices, and within the relevant Ethernet specification. A shorter cable has slightly less propagation delay; that does not automatically give it higher throughput. No specifications or defects are invented for the real cables. Both complete-cable choices receive positive feedback and confetti; long is never marked inherently wrong. Use **The science** for the fuller explanation. To make medium the only technically correct choice, first establish and explain a verified limitation of the long cable.

## Voting and trends

- A tap submits a vote to the local SQLite database. Stats update after the server confirms it is saved, not before.
- Buttons briefly lock after a vote to prevent accidental repeated taps. **Next student** becomes available after 1.5 seconds; the screen resets automatically after 8 seconds.
- This is an anonymous event poll, not an election system. It cannot enforce one vote per person without identifying people.
- **What the room thinks:** totals and percentages for the current round.
- **Rolling trend:** the mix of the newest 20 votes plus an A/B/C sequence, oldest to newest. Once 20 votes exist, the caption compares the latest 10 against the previous 10.
- Totals may round to 99% or 101% because each percentage is rounded independently.
- If a connection drops mid-vote, use **Retry this vote**. A unique request ID makes retries count once. The pending vote survives a refresh in the same browser tab when session storage is available. Do not close the tab until its vote is confirmed.
- All tabs and browsers connected to the same server share totals. Separate computers running their own server have separate totals.

## Facilitator controls and data

**Facilitator** opens CSV exports and **Archive & start new round**. Type `NEW` to confirm. Starting a round preserves all previous votes; export all rounds to retrieve them. This is an accidental-tap safeguard, not authentication. Supervise a public kiosk.

Persistent data lives in `data/votes.sqlite3` next to `server.py`. Choices, anonymous request IDs, round IDs and timestamps are stored. No names, contacts, accounts, cookies, analytics or visitor/IP access logs are collected. The `data/` folder is ignored by Git. Closing the browser, refreshing or restarting the app does not erase votes.

For a portable backup, export all rounds as CSV. For a restorable database backup, stop the server before copying the whole `data/` folder (including any SQLite WAL files). Alternatively, use Python's SQLite backup API while it is running.

The background launcher writes `data/server.log` and `data/server.pid`. To stop that instance, first verify the PID still belongs to this app with `ps -p "$(cat data/server.pid)" -o args=`; then send `kill "$(cat data/server.pid)"`. Do not kill an unrelated process if the PID was reused. A foreground run is easier to stop with Ctrl+C.

## Deploy to a Kali booth computer

Copy this entire folder **without test or production `data/`** to the booth computer. No elevated permissions or installed service are required. A desktop launcher can execute:

```ini
[Desktop Entry]
Type=Application
Name=Cable Clash - Ethernet Quiz
Comment=Vote for an Ethernet cable and watch the live trend
Exec=python3 /home/techfest/code/ethernet-cable-quiz/launch.py
Path=/home/techfest/code/ethernet-cable-quiz
Icon=network-wired
Terminal=false
Categories=Education;
```

Make that `.desktop` file executable. Some desktops ask to trust a new launcher on first use. The source folder must remain at the path in the shortcut. Nothing auto-starts at login or boot; launch the app when the booth opens.

## Test

From this folder:

```sh
python3 -m unittest discover -s tests -v
python3 -m py_compile server.py launch.py
node --check static/app.js  # optional developer syntax check; Node is not a runtime dependency
```

Tests use temporary databases and never touch real votes. For isolated manual testing use `python3 server.py --no-browser --port 8876 --data-dir /tmp/ethernet-quiz-test`, then visit that address. Test medium/long celebrations, short feedback, rapid repeated taps, reload persistence, two-window synchronization, canceling dialogs, export, new rounds, disconnect/retry and keyboard-only navigation. A phone-width layout is supported, but the primary booth layout targets landscape desktop screens.

## Optional trusted-LAN access

When a phone needs to try the quiz on the same Wi-Fi, explicitly bind to the booth computer's **specific private IPv4 address**, for example:

```sh
python3 server.py --host 192.168.1.8 --no-browser
```

Then use **http://192.168.1.8:8765/**. It is plain HTTP on a trusted local network, not internet hosting. Guests on that network can vote and see anonymous totals. Remote devices cannot export CSVs or start new rounds; those actions are restricted to connections from the booth computer. No firewall rules, port forwarding or security settings are changed. Do not use this on an untrusted/public network. Wi-Fi client isolation or a firewall may prevent access; the app does not bypass those restrictions.

To have the desktop launcher use the same address, create local `settings.json` containing `{"host":"192.168.1.8"}`. This machine-specific file is ignored by Git. When this option is used, open the LAN address even on the booth computer. The default without this file remains localhost-only. A changed DHCP address requires updating this file and restarting the server.

## Montcalm-inspired theme

The interface uses the green, deep green, gold, warm-white palette and locally bundled Plus Jakarta Sans typography observed on [montcalm.edu](https://www.montcalm.edu/). Square cards, bold headings, gold actions and green/gold confetti echo the site. This independent activity does not use a college logo or imply endorsement. See `THIRD_PARTY_NOTICES.md` for sources and the font license.
