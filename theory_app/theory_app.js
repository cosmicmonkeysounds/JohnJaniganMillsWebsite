let canvas;
let circle;

function setup() 
{
    canvas = createCanvas( windowWidth, windowHeight );
   
    // attaches canvas to a .div in the HTML
    canvas.parent( 'spiral' );

}

function windowResized() 
{
    resizeCanvas(windowWidth, windowHeight);
}

function draw()
{
    background(150);
    
}
