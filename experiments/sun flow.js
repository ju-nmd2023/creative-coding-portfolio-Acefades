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

  for (let i = 0; i < 1000; i++) {
    particles.push(new Particle());
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 2;
    this.hue = random(35, 55); // warm base
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
    let h = (this.hue + frameCount * 0.4) % 360;
    for (let g = 4; g > 0; g--) {
      stroke(h, 180, 255, 12);
      strokeWeight(g * 1.8);
      line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    }
    stroke(h, 180, 255, 80);
    strokeWeight(1.5);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.prevPos = this.pos.copy();
  }
}

function draw() {
  background(0, 0, 0, 15);

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
  zoff += 0.001;

  for (let p of particles) {
    p.follow(flowfield);
    p.update();
    p.edges();
    p.show();
  }
}
