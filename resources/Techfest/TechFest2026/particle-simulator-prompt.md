# Particle Simulator Prompt

Source: https://x.com/emilylambert/status/2009475725947228308

Build a real-time particle simulator where thousands of particles flow to form the shape of your face and hands on camera using MediaPipe for tracking.

Start with a clean intro screen featuring an Enable Camera button. Once started, show a fullscreen particle canvas with a small camera preview overlay in a 256x144 box at top center, displaying the mirrored feed with skeleton and mesh overlays on detected hands and face.

For hand tracking, detect up to 2 hands with all 21 landmarks. Draw a skeleton overlay with cyan and pink glowing lines between joints, with larger dots at fingertips and wrist. Taper the particle spread so fingertips are narrow, finger segments are medium, and palm areas are wider. Use golden ratio math for smooth organic particle distribution along the bones.

For face tracking, use FaceMesh with all 468 landmarks and refined features. Boost the depth on nose, cheekbones, and eye sockets so facial features pop out. Draw the mesh overlay with colored outlines for eyes in teal, lips in pink, and face oval in cyan. Keep particle clustering very tight at 1-2 pixels for a dense mesh effect.

The particle system should manage 8,000 to 15,000 particles that attract toward hand and face landmarks, distributing evenly between whatever is visible. Include 5 color themes called Rainbow, Fire, Ocean, Galaxy, and Matrix that cycle when you make a fist gesture. Add particle trails with semi-transparent fade, and support both Attract mode where particles flow toward you and Repel mode where they push away.

For the UI, place mode toggle buttons in the top left, a keyboard shortcuts panel in the bottom right showing SPACE for mode and V for camera toggle, and a status indicator in the top right displaying loading state, detection status, or a Show your hands prompt. The whole experience should feel smooth and responsive with particles flowing like liquid to form recognizable shapes in real-time.
