/************************************************************************************
 *   This js is responsible for little touches on the site, like the jquery slideshow
 *
 *   Lucas Nolting                                                          12/8/2017
 **************************************************************************************/
$(function () {
    //Sl Sh
    $('#slideShow > div:gt(0)').hide();

    setInterval(function () {
        $('#slideShow > div:first').fadeOut(1000).next().fadeIn(1000).end().appendTo('#slideShow');
    }, 5000);
});


