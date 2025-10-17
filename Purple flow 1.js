let inc = 0.1;
let scl = 10;
let cols, rows;
let zoff = 0;
let flowfield;


function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 255, 255, 255);
  background(0);
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);
}

function draw() {
  background(0, 0, 0, 10);
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
    }
    yoff += inc;
  }

  zoff += 0.002;
}


