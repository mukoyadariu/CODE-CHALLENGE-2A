// load the zebra image
let zebra;
function preload() {
zebra = loadImage();
}

// create a canvas
function setup() {
createCanvas(400, 400);
}

// draw the zebra and make it move
function draw() {
background(220);
// calculate the angle of rotation based on the frame count
let angle = sin(frameCount * 0.1) * PI / 6;
// translate the origin to the center of the canvas
translate(width / 2, height / 2);
// rotate the zebra image by the angle
rotate(angle);
// draw the zebra image at the origin
imageMode(CENTER);
image(zebra, 0, 0);
}