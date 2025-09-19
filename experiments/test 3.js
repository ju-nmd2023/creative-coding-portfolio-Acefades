function setup () {
    createCanvas (600,600);
    frameRate(10);
    colorMode ( HSB,360,255,255,255);
}

let counter = 0;
const size = 10;
const divider = 300;
const numRows =60;
const numCols = 60;
function draw () {
    background (0,0,100,10);
    noStroke();

   // noiseSeed(50);
   for ( let y = 0; y<numRows; y++){
    for ( let x = 0; x< numCols; x++) {
        const value = noise(x/divider,counter ,y)*size; // this + value at the end in the line below = makes it random
     
        const offsetX=map(noise(x*0.1,frameCount*0.01),0,1,-4,4);
        const offsetY = map(noise(y * 0.1, frameCount * 0.01+100), 0, 1, -4, 4);
        
        const cx = size / 2 + x*size+offsetX;
        const cy = size / 2 + x * size + offsetY;
        const hue = map(value,0,size,180,220);
       fill (hue,255,255);  
        ellipse (size / 2 +x * size,size / 2 + y*size,value);
       }
   }
  counter += 0.1;
}