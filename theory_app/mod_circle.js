class CirlceSlice
{
    constructor(angle)
    {

    }
}

class ModCircle
/**
 * 
 * An absolute central contruct in music.
 * Mod circles form the basis of all scales and chords.
 * 
 * This class allows you to create a mod circle with 'n' numbers of divisions,
 * with each division representing some unique note.
 * 
 * For example, a diatonic scale can be represented by a 7-segment mod circle,
 * a triad as a 3-segment mod circle, etc etc.
 * 
 */
{
    constructor(numOfDivisions)
    {
        this.x = function(){ return windowWidth  / 2; }
        this.y = function(){ return windowHeight / 2; }
        this.radius = function(){ return Math.abs( Math.min(windowHeight, windowWidth) - 50 ); }
        this.numOfDivisions = numOfDivisions;
        this.angleIncrement = radians(360 / numOfDivisions);
    }

    animate()
    {

        // saves computing coordinates on every call
        let x = this.x();
        let y = this.y();
        let r = this.radius();

        // creates main circle
        // fill(255);
        // ellipse( x, y, r );
        
        //angleMode(RADIANS);

        let lastAngle = this.angleIncrement / 2;
        let colour = this.numOfDivisions;

        for( let i = 1; i <= this.numOfDivisions; i++ )
        {
            fill(255 * (colour % 2) + 200 );
            colour--;
            // strokeWeight(4);
            // stroke(0);
            arc( x, y, r, r, 
                 lastAngle, lastAngle + this.angleIncrement );
            lastAngle += this.angleIncrement;
        }
    }
}