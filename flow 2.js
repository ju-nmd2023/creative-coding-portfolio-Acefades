let inc = 0.1;
let scl = 10;
let cols, rows;
let zoff = 0;
let flowfield;
let particles = [];

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 255, 255, 255);
  background(0);
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);

  // Create particles
  for (let i = 0; i < 500; i++) {
    particles.push(new Particle());
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 2;
    
    const rand = random(1);
    if (rand < 0.4) this.hue = random(20, 40); 
    else if (rand < 0.8) this.hue = random(260, 290); 
    else this.hue = random(100, 140); 
    this.prevPos = this.pos.copy();
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  follow(vectors) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    let index = x + y * cols;
    let force = vectors[index];
    if (force) {
      this.applyForce(force);
    }
  }

  edges() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
    this.prevPos = this.pos.copy();
  }

  show() {
    // Hue effect
    let h = (this.hue + frameCount * 0.2) % 360;

    // Smooth glowing trail
    for (let g = 3; g > 0; g--) {
      stroke(h, 200, 255, 12);
      strokeWeight(g * 1.5);
      line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    }

    // Bright core
    stroke(h, 255, 255, 60);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);

    this.prevPos = this.pos.copy();
  }
}

function draw() {
  // Low opacity background for soft trails
  background(0, 0, 0, 12);

  // cloud effect 
  noStroke();
  for (let i = 0; i < 30; i++) {
    let fx = random(width);
    let fy = random(height);
    let fsize = random(50, 150);
    let alpha = random(3, 8); // subtle transparency
    fill(0, 0, 100, alpha); // white fog
    ellipse(fx, fy, fsize);
  }

  // Flow field generation
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

  zoff += 0.0015;

  for (let p of particles) {
    p.follow(flowfield);
    p.update();
    p.edges();
    p.show();
  }
}
 