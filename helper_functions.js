function isAlpha(str) 
{ 
    let letter;
    for( let i = 0; i < str.length; i++ ) 
    {
        letter = str.charCodeAt(i);
        if( !(letter > 96 && letter < 123) && !(letter > 64 && letter < 91) ) 
        {  
            return false;
        }
    }
    return true;
}