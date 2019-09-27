$(document).ready(function() {
    //move banner icon
    var $s_clder  = $('#s_clder');
    var banT = $s_clder.offset().top;
    var footT = $('#footer').offset().top; 
    var banHei = $s_clder.outerHeight();     
    var maxT = footT - banHei;
 

    $(window).on('scroll', function () {
        var scrollT = $(this).scrollTop()+94;
        if (scrollT < banT) $s_clder.css({position: 'absolute',top: banT});
        else if (scrollT < maxT) $s_clder.css({position: 'fixed',top: 130});
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

    // product_r fade right 
    var scrollT;
    var timer = 0;   
    $(window).on('scroll', function () {      
        clearTimeout(timer);  
        timer = setTimeout(function () {
          scrollT = $(this).scrollTop();

          $('.fade').each(function () {
            if (scrollT > $(this).offset().top - 700) $(this).addClass('on');
            else $(this).removeClass('on');
          });
        }, 100);
    });



    var tgTop = $(".s_contentss").offset().top;

    $s_clder.on("click", function(){
        $("html, body").stop().animate({scrollTop: tgTop - 130}, 500);
    });

  });
  