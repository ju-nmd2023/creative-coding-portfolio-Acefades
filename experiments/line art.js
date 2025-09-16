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
  for (let i = 0; i < 200; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(1, 3);
    fill(255, 255, 200, random(100, 255));
    stroke(255);
    ellipse(x, y, r);
    point(random(width), random(height));
  }
  const originalY = 300; // center of canvas
  const originalX = 230; 
  const divider = 50;

  // draw more waves with different y offsets
  for (let i = 0; i < 5; i++) {
    strokeWeight(random(2, 5));
    noiseSeed(i * 100);
    for (let j = 0; j < 3; j++) {
      // draws 3 waves with variations

      stroke(random(100, 255), random(100, 255), random(100, 255));
      noFill();

      beginShape();
      for (let x = 0; x < width; x++) {
        const y =
          originalY + i * 20 + noise(x / divider + i + frameCount * 0.01) * 100;
        vertex(x, y);
      }
      endShape();
    }
  }

  for (let i = 0; i < 5; i++) {
    strokeWeight(random(2, 5));
    noiseSeed(i * 100);
    for (let j = 0; j < 2; j++) {
      // draws 3 waves with variations

      stroke(random(100, 255), random(100, 255), random(100, 255));
      noFill();

      beginShape();
      for (let y = 0; y < height; y++) {
        const x =
          originalX + i * 20 + noise(y / divider + i + frameCount * 0.01) * 100;
        vertex(x, y);
      }
      endShape();
    }
  }

  noLoop();
}
