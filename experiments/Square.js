function setup() {
  createCanvas(600, 600);
  frameRate(3);
}

const size = 100;
const layers = 10;

function getRandomValue(pos, variance) {
  return pos + map(Math.random(), 0, 1, -variance, variance);
}                      

function drawLayers(x, y, size, layers) {
  const variance = size / 20;

  stroke(random(255), random(120), random(160));
  noFill();

  for (let i = 0; i < layers; i++) {
    if (Math.random() > 0.9) {
      continue;
    }

    const s = (size / layers) * i;
    const half = s / 2;
  
  
    for (let j = 0; j < 3; j++) {
      beginShape();
      vertex(
        getRandomValue(x - half, variance),
        getRandomValue(y - half, variance)
      );
      vertex(
        getRandomValue(x + half, variance),
        getRandomValue(y - half, variance)
      );
      vertex(
        getRandomValue(x + half, variance),
        getRandomValue(y + half, variance)
      );
      vertex(
        getRandomValue(x - half, variance),
        getRandomValue(y + half, variance)
      );
      endShape(CLOSE);
    }
  }
}

function draw() {
  background(random(255), random(255), random(255));

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      drawLayers(size / 2 + x * size, size / 2 + y * size, size, layers);
    }
  }

}

