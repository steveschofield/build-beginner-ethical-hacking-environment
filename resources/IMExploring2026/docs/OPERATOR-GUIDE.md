# Three-laptop operator guide

The event laptops are Dell Precision 3551 systems with:

- Intel Core i7-10750H CPUs;
- 15 GiB RAM;
- Intel UHD and NVIDIA Quadro P620 graphics;
- integrated Realtek webcams; and
- 1920×1080 displays.

The same build should be used on all three systems.

The kiosk includes three activities. The activity dock stays visible at the bottom of the 1080p display; number keys `1`–`3` provide a backup. See [ACTIVITIES.md](ACTIVITIES.md) for interaction and teaching notes.

## Daily launch without a Terminal

Double-click **IM Exploring 2026** on the desktop. The local server runs in the background, while the camera experience stays in the browser. Close the camera tab to release the webcam, and double-click **Stop IM Exploring 2026** when finished. The server is not configured to start at login or reboot.

If an old launcher Terminal is still running, finish that session and press `Control-C` there before using the new desktop shortcut. New launchers never stop an unmanaged server or unrelated browser session.

## One-time setup on each laptop

```bash
cd /path/to/build-beginner-ethical-hacking-environment/resources/IMExploring2026
./scripts/launch-kiosk.sh
```

The launcher opens `http://127.0.0.1:8080` in the default browser. Do not open `index.html` directly. Allow camera permission, enter full screen, and verify Body silhouette, Face landmarks, and Hand landmarks each change to an active state when visible.

Before the event, test all three activity buttons, Cyber Shield scoring, Reset, Music Painter mute, and Reduced effects. Sound should be off when the page first loads.

## Offline rehearsal

1. Start once while online only to confirm browser and camera permissions.
2. Disconnect Wi-Fi.
3. Close Chromium completely, restart the local server, reopen the page, and select **Start the camera**.
4. Confirm tracking begins and the browser's Network panel shows requests only to `127.0.0.1`.

This rehearsal is the final proof that the specific browser profile and laptop can run the bundled assets offline.

## Kiosk recovery

- If the page stops responding, reload it and select **Start the camera** again.
- If the camera is busy, close Chromium and any camera app, then reopen Chromium.
- If performance drops, close all other tabs and restart Chromium.
- If the screen sleeps, wake it and verify the camera stream resumed; reload if it did not.

## End of day

Close the browser tab or window. The app stops every camera track on page unload. Then double-click **Stop IM Exploring 2026** to stop the background server. No visitor images are stored by the application.

## Green/gold theme and optional overlays (2026-11-07)

The default live view intentionally leaves the person unobstructed. Open **Controls & help** in the upper right, or press `H`, to view activity instructions, tracking/FPS, walk-up help, sound, Reset, Reduced effects, and Full screen. Click the summary again, press `H`, or press `Escape` to collapse it. The three activity choices remain visible; Cyber Shield retains its small score in the lower-right corner. The panel scrolls on smaller displays and resets to closed after a page reload.

The default Mirror look is Montcalm Green & Gold. The `T` key / Change look control still cycles through the original creative color options. No camera, model, network, or privacy behavior changed. The font is bundled locally, so the theme adds no internet dependency.
