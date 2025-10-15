function setup() {
  createCanvas(600, 600);
  noStroke();
}

const size = 10;
const divider = 100;
const numRows = 60;
const numCols = 60;

function draw() {
  background(0);
  const maxSize = map(mouseX, 0, width, size, size * 4);

  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      const value = noise(x / divider, y / divider, frameCount * 0.02);
      const c = lerpColor(color(50, 255, 230), color(255, 80, 200), value);
      const dotSize = value * maxSize;

      for (let g = 2; g > 0; g--) {
        fill(red(c), green(c), blue(c), 30);
        ellipse(size / 2 + x * size, size / 2 + y * size, dotSize + g * 6);
      }

      fill(c);
      ellipse(size / 2 + x * size, size / 2 + y * size, dotSize);
    }
  }
}
