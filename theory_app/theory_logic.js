"use strict";

/**
 * Assuming that the note 'C' is our zero point / reference,
 * these coordinates, [X, Y], denote the distance in fifths (X) from C, 
 * and the octave displacement (Y) in order to get that note into the same octave class as our C reference.
 * 
 * For example, the note D is can be made by transforming the note C up a perfect fifth 2 times,
 * however, the nearest C is an octave higher than the octave we started, so a -1 octave displacement is needed.
 * 
 * Another way to interpret the first coordinate is the amount of sharps or flats that note's major scale has,
 * assuming that sharps and flats lie on the same number line, with sharps acting as positive numbers,
 * and flats as negative. 
 * 
 * Of course, it is arbitrary which note we chose as a reference, but the note C is a 'natural' zero point,
 * and it ties nicely into the concept of the natural note set being the genesis for the chromatic note set.  
 */

const naturalNoteCoords = 
{
    "F" : [-1, 1, "fourth"],
    "C" : [0, 0,  "unison"],
    "G" : [1, 0,  "fifth"],
    "D" : [2, -1, "second"],
    "A" : [3, -1, "sixth"],
    "E" : [4, -2, "major"],
    "B" : [5, -2, "seventh"]
};

const sharpCoords = [7, -4]; // aka C#
const flatCoords  = [-7, 4]; // aka Cb

// this may be a little hack-y, but it works for now (:
const accidentalCoords = { '#x': 3, 'x': 2 , '#': 1, '': 0, 'b': -1, 'bb': -2, 'bbb': -3 }; 

function sumArrays( list )
{ 
    return list[0].map( (x, index) => list.reduce((sum, curr) => sum + curr[index], 0) ); 
}

function scaler( s, list )
{ 
    return list.map( x => x * s ); 
}

class Note 
/**
 * A container for individual notes, and the logic of how they're spelling and pitch relate to 2-D pitch space.
 */
{
    constructor( noteStr = "c4" )
    {
        // if the first character isn't a letter, abort the creation process.
        try 
        {
            noteStr[0].match(/[a-zA-Z]/);
        } 
        catch( error ) 
        {
            // id is set to undefined so the owner of the note will not use it
            this.id = -1;
            return;
        }
        
        // if a letter is found in index 0, slice it, make sure it's uppercase and then use it as the natural note
        this.naturalNote = noteStr[0].toUpperCase();
        noteStr = noteStr.slice(1);

        // if the string is not empty
        if( noteStr )
        {
            // if the last character in string is a number, slice it off and assign to octave
            if( noteStr.slice(-1).match(/[0-9]/) )
            {
                this.octave = parseInt( noteStr.slice(-1) );
                noteStr = noteStr.slice( 0, noteStr.length - 1 );
            }

            // all that's left of the input string is the accidental, 
            // so make sure it matches something in the accidental list and assign it to the note's accidental
            if( Object.keys(accidentalCoords).includes(noteStr) )
                this.accidental = noteStr;

        }

        // if that fails, fuck it, make it a natural note
        if( this.accidental == undefined )
            this.accidental = '';
        
        // same for the octave
        if( this.octave == undefined )
            this.octave = 4;

    }

    // After some intense algebra, this yields the coordinates of the chromatic note in 2-D pitch space.
    // This is useful for many things, including constructing infinite circle/helix of fifths, ordering scales,
    // comparing relative brightness/darkness of scales/chords/passages, to name a few.
    // This coordinate may be considered the most raw, mathematical form of a musical note.
    get chromaticCoords()
    { 
        return sumArrays( [naturalNoteCoords[this.naturalNote].slice(0,2), scaler(accidentalCoords[this.accidental], sharpCoords)] ); 
    }

    // Convert to semi tones. C0 = 0.
    get pitchInteger()
    {
        let coords = this.chromaticCoords;

            // fifths offset, fifths octave offset, note octave offset
        return (coords[0] * 7) + (coords[1] * 12) + (this.octave * 12);
    }

    get chromaticNoteString()
    { 
        return new String( this.naturalNote + this.accidental ); 
    }

}

// some quick tests (: /////////
let n = new Note("G4");
console.log(n.pitchInteger);
////////////////////////////////
