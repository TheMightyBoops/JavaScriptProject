/************************************************************************************************
 * The script contained in this file is all to save a cookie to the browser for a player that
 * lasts a day. It may also contain a delete character cookie to get rid of the character so a
 * new once can be input.
 *
 * Lucas Nolting                                                                      21/10/2017
 *************************************************************************************************/

function setCookie(name, value, days) {
    var expires="";
    if(days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + "; path=/"
}

function getCookie(name) {
    var nameEQ = name + "=";
    var cArray = document.cookie.split(';');

    for(var i=0; i < cArray.length; ++i) {
        var cookie = cArray[i];
        while(cookie.charAt(0)== ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) == 0) {
            return cookie.substring(nameEQ.length, cookie.length)
        }
    }
    return null;
}

function eraseCookie(name) {
    setCookie(name, "", -1)
}