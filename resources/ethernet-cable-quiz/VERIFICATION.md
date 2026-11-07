# Verification and deployment

Verified 2026-11-06.

## Locations

- Source on Mac: `~/code/build-beginner-ethical-hacking-environment/resources/ethernet-cable-quiz/`
- Deployed on Kali `kali1` (`192.168.1.8`): `/home/techfest/code/ethernet-cable-quiz/`
- Desktop shortcut: `/home/techfest/Desktop/Cable-Clash-Ethernet-Quiz.desktop`
- LAN voting link: `http://192.168.1.8:8765/`
- Live display: `http://192.168.1.8:8765/?display=1`

The booth server is bound only to `192.168.1.8:8765`, not all interfaces. No firewall, router, login startup, external hosting, or GitHub publishing changes were made. The desktop launcher can start it again after a reboot. A phone needs access to the same LAN; cellular and isolated guest Wi-Fi cannot reach it.

## Automated checks

35 Python standard-library tests pass on Mac and Kali. Coverage includes concurrent submissions, idempotent duplicate votes, disk persistence and restart, validation, new-round archival, stale-round handling, CSV exports, Host/Origin guards, remote facilitator restrictions, database identity and connection cleanup. Tests use temporary data only. Python compile checks and JavaScript syntax checks pass.

## Browser and deployment checks

- Chrome browser: medium and long choices save votes, immediately update totals, show positive feedback, and lock buttons briefly; short choice explains the missing plug.
- Reload retained test votes.
- Science dialog opens and closes; facilitator rejects an empty new-round confirmation, then archives test votes successfully after `NEW`.
- Kiosk layout visually checked at 1366×768; phone layout at 390×844. Phone layout scrolls vertically; no horizontal clipping was seen.
- Production page loads from the Mac over LAN, not just on the Kali host. The production data was left free of test votes.
- Remote CSV access returns 403; the same host's state exposes facilitator access. Unit tests verify remote new-round requests cannot mutate data.
- Desktop file syntax was checked with `desktop-file-validate` on Kali.

## Limits

No physical iPhone or physical cable throughput test was performed. The Kali desktop shortcut was installed and validated over SSH, not double-clicked in its graphical session. Browser visual checks used Chrome on the Mac; installed Firefox/Chromium on Kali were detected but not driven through their GUI. Reduced-motion handling is implemented and statically reviewed, not manually toggled in the OS. Automated tests cover interrupted/idempotent API submissions; a browser-level network interruption was not simulated.

The kiosk is an anonymous educational poll, not a one-person/one-vote or authenticated election system. Properly made medium and long cables can deliver equal throughput; the software does not grade length alone as a unique winner.

## Theme update

The Montcalm-inspired theme was visually checked at 1366×768 and 390×844. Medium voting, updated percentages and green/gold confetti were verified again with isolated test data. The server serves the bundled WOFF2 font and theme CSS locally. All 35 automated tests pass after the theme change, including the new static routes. A SQLite backup was taken before the brief production restart; existing live votes were retained.

## Mac source reconciliation (2026-11-07)

Compared SHA-256 hashes for all 16 source, static asset, license, documentation and test files against the deployed app at `techfest@192.168.1.8:/home/techfest/code/ethernet-cable-quiz/`. Every file matched, including the Montcalm theme and bundled font, so no source overwrite was necessary. This verification note is the only subsequent source-tree edit.

Re-ran all 35 tests on the Mac using temporary databases: all passed. Python compilation (`server.py`, `launch.py`), JavaScript syntax (`static/app.js`) and shell syntax (`start.sh`, `Launch-Ethernet-Quiz.command`) also passed. No new browser or Kali runtime tests were performed during this reconciliation.

No live server was restarted or changed. Production votes, backups, logs, machine-specific settings and credentials were not copied or modified. Git ignore checks confirmed that `data/`, `settings.json` and Python bytecode remain excluded. The app remains an untracked local repository addition; nothing was staged, committed or pushed.
