function setup () {
    createCanvas (600,600);
}

function draw () {
    background (255,255,255);
    const originalY = 300; // center of canvas
    const divider = 50;
    // draw more waves
    for (let i = 0; i < 5;i++) {
      noiseSeed(i*100);
      stroke(random(255), random(255),random(255));
      noFill();
      beginShape();
      for (let x = 0; x < 600; x++) {
        // from width 0 to 600 is drawn
        //const y = originalY + Math.random() * 100;
        const y = originalY + noise(x / divider) * 100;

        vertex(x, y);
      }
      endShape();


    }
    
    noLoop();      
}
