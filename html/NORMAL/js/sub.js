$(document).ready(function() {

  


    //culture////////////////////////////////////////////////////////////////////////////////////////////////////////////////




    //scal////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //move banner icon
    var $s_clder  = $('#s_clder');
    var banT = $s_clder.offset().top;
    var footT = $('#footer').offset().top; 
    var banHei = $s_clder.outerHeight();     
    var maxT = footT - banHei;          

    $(window).on('scroll', function () {
        var scrollT = $(this).scrollTop();
        if (scrollT < banT) $s_clder.css({position: 'absolute',top: banT});
        else if (scrollT < maxT) $s_clder.css({position: 'fixed',top: 30});
        else $s_clder.css({position: 'absolute',top: maxT});
    });

    //scal hover effect
    $(".scal_over div").on({
        "mouseenter focusin": function(){
            $(this).addClass("on");
        },
        "mouseleave focusout": function(){
            $(this).removeClass("on");
        }
    });



    //redroom////////////////////////////////////////////////////////////////////////////////////////////////////////////////




});