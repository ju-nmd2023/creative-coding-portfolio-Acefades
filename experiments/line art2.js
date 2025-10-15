function setup() {
  createCanvas(600, 600);
  frameRate(20);

}

function drawGradient() {
  // Diagonal gradient from top-left to bottom-right
  for (let i = 0; i < width; i++) {
    let inter = map(i, 0, width, 0, 1);
    let c = lerpColor(color(20, 50, 100), color(255, 100, 180), inter);
    stroke(c);
    line(i, 0, i, height);
  }
}

function draw() {
  drawGradient();

  // Random glowing circles scattered more toward top-left
  for (let i = 0; i < 200; i++) {
    let x = random(width * 0.7);
    let y = random(height * 0.6);
    let r = random(3, 8);
    fill(random(150, 255), random(50, 200), random(200, 255), random(80, 200));
    noStroke();
    ellipse(x, y, r);
  }

  const baseY = 250; // vertical starting point for horizontal waves
  const baseX = 320; // horizontal starting point for vertical waves
  const waveDiv = 70;

  // Horizontal waves
  for (let i = 0; i < 5; i++) {
    strokeWeight(random(1, 3));
    stroke(random(50, 200), random(100, 255), random(150, 255));
    noFill();
    beginShape();
    for (let x = 0; x < width; x++) {
      const y =
        baseY +
        i * 30 +
        sin(x / waveDiv + frameCount * 0.03) * 60 +
        noise(x / 120) * 50;
      vertex(x, y);
    }
    endShape();
  }

  // Vertical waves
  for (let i = 0; i < 4; i++) {
    strokeWeight(random(1, 3));
    stroke(random(200, 255), random(150, 200), random(100, 180));
    noFill();
    beginShape();
    for (let y = 0; y < height; y++) {
      const x =
        baseX +
        i * 35 +
        cos(y / waveDiv + frameCount * 0.03) * 50 +
        noise(y / 120) * 40;
      vertex(x, y);
    }
    endShape();
  }
}
