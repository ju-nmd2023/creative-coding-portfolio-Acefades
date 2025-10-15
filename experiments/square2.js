function setup() {
  createCanvas(600, 600);
}  

const size = 100;
const layers = 10;
const gap = 20;

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
    const half = s / 4;
  
  strokeWeight(random(2,8));
  stroke(random(200,255),random(200,255),random(0,255)); 
    
    for (let j = 0; j < 3; j++) { 
      fill (random(255),random(255),random(255),20);  // wobbly squares      
      beginShape(); //wobbly squares
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
  background(random(255),random(255),random(255));

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      drawLayers(
        size / 2 + x * (size + gap),
        size / 2 + y * (size + gap),
        size,
        layers
      );

    }
  }       
   
}
 