function setup() {
  createCanvas(600, 600);
  frameRate(10);
  colorMode(HSB, 360, 255, 255, 255);
}

let counter = 0;
const size = 10;
const divider = 300;
const numRows = 60;
const numCols = 60;

function draw() {
  background(0, 0, 100, 10);
  noStroke();

  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      const value = noise(x / divider, counter, y) * size;

      // position offsets
      const offsetX = map(noise(x * 0.1, frameCount * 0.01), 0, 1, -4, 4);
      const offsetY = map(noise(y * 0.1, frameCount * 0.01 + 100), 0, 1, -4, 4);

      const cx = size / 2 + x * size + offsetX;
      const cy = size / 2 + y * size + offsetY;

      // color, smooth gradient
      const hue = map(value, 0, size, 180, 280);

      const dotSize = value;

      // glow effect
      for (let g = 3; g > 0; g--) {
        fill(hue, 255, 255, 50); // semi-transparent glow
        ellipse(cx, cy, dotSize + g * 6);
      }

      // main visible circle
      fill(hue, 255, 255, 255); // full opacity
      ellipse(cx, cy, dotSize); // draw after glow
    }
  }

  counter += 0.1;
}
