function setup() {
  createCanvas(600, 600);
}
function drawGradient() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(50, 100, 200), color(255, 200, 150), inter);
    stroke(c);
    line(0, y, width, y);
  }
}
function draw() {
  drawGradient();

  const originalY = 300; // center of canvas
  const divider = 50;

  // draw more waves with different y offsets
  for (let i = 0; i < 5; i++) {
    noiseSeed(i * 100);
    stroke(random(255), random(255), random(255));
    noFill();
    beginShape();
    for (let x = 0; x < width; x++) {
      const y = originalY + i * 20 + noise(x / divider + i) * 100;
      vertex(x, y);
    }
    endShape();
  }

  noLoop();
}
