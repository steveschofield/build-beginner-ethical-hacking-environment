# Three-laptop operator guide

The event laptops are Dell Precision 3551 systems with:

- Intel Core i7-10750H CPUs;
- 15 GiB RAM;
- Intel UHD and NVIDIA Quadro P620 graphics;
- integrated Realtek webcams; and
- 1920×1080 displays.

The same build should be used on all three systems.

The kiosk includes three activities. The activity dock stays visible at the bottom of the 1080p display; number keys `1`–`3` provide a backup. See [ACTIVITIES.md](ACTIVITIES.md) for interaction and teaching notes.

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

Close the browser tab or window. The app stops every camera track on page unload. No visitor images are stored by the application.
