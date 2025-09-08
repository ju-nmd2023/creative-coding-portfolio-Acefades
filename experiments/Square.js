function setup () {
    createCanvas (1000,1000);
    frameRate(10);
}

const size = 100;
const layers = 10;

function getRandomValue(pos,variance) {
    return pos + map(Math.random(),0,1, -variance,variance);
}
function drawLayers (x,y,size,layers) {

    //const half = size / 2;
    const variance = size / 20;
    noFill();
    //rectMode(CENTER);
    for (let i = 0; i<layers; i++) {
        const s = ( size / layers) * i;
        const half = s / 2;
        beginShape();
        vertex(getRandomValue(x-half,variance),getRandomValue(y-half,variance));
        vertex(getRandomValue(x+half,variance),getRandomValue( y-half,variance));
        vertex(getRandomValue(x+half,variance),getRandomValue(  y+half,variance));
        vertex(x-half, y+half);
     endShape(CLOSE);
       // rect(x- half,y-half,s,s);
    }
}

function draw () {
    background (255,255,255);
    drawLayers(100,100,size,layers);
    noLoop();
}