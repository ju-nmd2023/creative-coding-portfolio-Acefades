function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);

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
