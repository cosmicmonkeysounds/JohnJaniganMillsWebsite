'use strict';

const topBarButtonsClicked =
{
    'about' : false,
    'portfolio' : false,
    'theory' : false,
    //'misc' : false,
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

}

function portfolioSort(kind)
{
    let galleryChildren = document.getElementsByClassName(kind);

    document.getElementById(kind.concat("_btn")).style.textDecoration = "underline";

    for( const [key, value] of Object.entries(document.getElementById("gallery_bar").getElementsByTagName('a')) )
    {
        if( value.id != kind.concat("_btn") )
        {
            document.getElementById(value.id).style.textDecoration = "none";
        }
    }

    for( const [key, value] of Object.entries(document.getElementsByClassName("all")) )
    {
        value.style.display = "none";
    }

    for( const [key, value] of Object.entries(galleryChildren) )
    {
        value.style.display = "inline";
    }


}

topBarClicked("portfolio");
portfolioSort("all");