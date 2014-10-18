# Soundtrack

Concept: using WebRTC and the Web Audio API, take input from a user's camera
and generate synthesized audio based on the current camera frame's properties
(brightness, color profile, etc.).

Right now it's very rudementary, but everything starts somewhere.

## Running locally

1. `npm install`
2. `grunt browserify`
3. `python -m SimpleHTTPServer`
4. navigate to [http://localhost:8000](http://localhost:8000)
5. Turn down your speakers/headphones JUST IN CASE.
6. Allow access to your camera.
7. Listen, fiddle with your camera, enjoy.
