'use strict';

const topBarButtonsClicked =
{
    'about' : false,
    'portfolio' : false,
    'theory' : false,
    'misc' : false,
    'contact': false
}

function topBarClicked(name)
{
    topBarButtonsClicked[name] = true;
    document.getElementById(name).style.display = "inline";
    document.getElementById(name.concat("_btn")).style.textDecoration = "underline";

    for( let key in topBarButtonsClicked )
    {
        if( key != name )
        {          
            topBarButtonsClicked[key] = false;
            document.getElementById(key).style.display = "none";
            document.getElementById(key.concat("_btn")).style.textDecoration = "none";
        }
    }

    console.log(topBarButtonsClicked);

}

topBarClicked("portfolio");