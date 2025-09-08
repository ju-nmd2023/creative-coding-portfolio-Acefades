function setup () {
    createCanvas (600,600);
}

const size = 10;
const divider = 300;
const numRows =60;
const numCols = 60;
function draw () {
    background (255,255,255);
    noStroke();
    fill(0,0,0);
    
   // noiseSeed(50);
   for ( let y = 0; y<numRows; y++){
    for ( let x = 0; x< numCols; x++) {
        const value = noise(x/divider ,y)*size; // this + value at the end in the line below = makes it random
        ellipse (size / 2 +x * size,size / 2 + y*size,value);
       }
   }
  


    noLoop();
}
