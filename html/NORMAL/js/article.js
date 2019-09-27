$(document).ready(function(){
  
//메인아티클_슬라이드
    var $slider = $('.A_slider');
    var $indiEle = $('.A_slider .indicator li');
    var current = 0; 
    var nextNum;
    var timer;
 
    $indiEle.eq(0).addClass('on');
    $slider.find('.play_stop .play').hide(); 
    $indiEle.children().on('click', function (e) {
        e.preventDefault();

        nextNum = $(this).parent().index();
        if (current == nextNum) return false;
        clearInterval(timer);
        $slider.find('.play_stop .play').show().siblings().hide();
        active();
    });

    function active() {
        $indiEle.eq(nextNum).addClass('on').siblings().removeClass('on');

        $slider.find('.visual li').eq(current).css('left', 0).stop().animate({left: '-100%'}, 600);
        $slider.find('.visual li').eq(nextNum).css('left', '100%').stop().animate({left: 0}, 600);
        current = nextNum;
    }

    function playTimer() {
        timer = setInterval(function () {
            nextNum = current + 1;
            if (nextNum == 3) nextNum = 0;
            active();
        }, 5000);
    }
    playTimer();

    $slider.find('.prev_next button').on('click', function () {
        var btnNum = $(this).index();
      
        nextNum = btnNum == 0 ? current - 1 : current + 1;
        
        if (nextNum == -1) nextNum = 2; 
        else if (nextNum == 3) nextNum = 0; 

        $indiEle.eq(nextNum).children().click();
    });

    $slider.find('.play_stop button').on('click', function () {
       var btnNum = $(this).index(); 
        btnNum == 0 ? playTimer() : clearInterval(timer);     
        $(this).hide().siblings().show();
    });
    
   
   
    //메인아티클_탭
    $('.tab:first-of-type, .tabpanel:first-of-type').addClass('active').attr('tabIndex', 0);

    $('.tab:first-of-type').attr('aria-selected',true);
    $('tabpanel:first-of-type').attr('aria-hidden', false);

    $('.tab').on('keydown',function(e){
        var key = e.keyCode;
        console.log(key);
        switch(key){
            case 37:
                $(this).attr('tabIndex', -1);
                if ($(this).hasClass('first')) $(this).siblings('.last').attr('tabIndex', 0).focus();
                else $(this).prev().attr('tabIndex', 0).focus();
                break;

            case 39:
                $(this).attr('tabIndex', -1);
                if ($(this).hasClass('last')) $(this).siblings('.first').attr('tabIndex', 0).focus();
                else $(this).next().attr('tabIndex', 0).focus();
                break;

            case 32 :
            case 13 :
                var $tg =$(this);
                activeOn($tg);
                break;
        }
    });

    $('.tab').on('click', function () {
        var $tg = $(this);
        activeOn($tg);
     });

      function activeOn($target) {
        $target.addClass('active').attr({'aria-selected': true, tabIndex: 0}).siblings().removeClass('active').attr({'aria-selected': false, tabIndex: -1});
    
        $('#' + $target.attr('aria-controls')).addClass('active').attr({'aria-hidden': false, tabIndex: 0}).siblings('.tabpanel').removeClass('active').attr({'aria-hidden': true, tabIndex: -1});
    }


//서브_위클리 핫 이슈
    var scrollT;
    var timer = 0;
    $(window).on('scroll', function () {

        clearTimeout(timer);


        timer = setTimeout(function () {
            scrollT = $(this).scrollTop();

            $('#Week_content .fade').each(function () {
                if (scrollT > $(this).offset().top - 597) $(this).addClass('on');
                else $(this).removeClass('on');
            });
        }, 100);
        console.log(timer);

    });


    //nb////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //nb click
    $(".nb_content ul li").on("click", function(){

        $(this).siblings().removeClass("on").find(".hidden_box").stop().animate({left: "0"}, 1000, "easeInOutQuad");

       if($(this).hasClass("on")){
            $(this).find("button").eq(1).slideUp(200).prev().slideDown(800);
           if($(this).hasClass("right")) $(this).removeClass("on").find(".hidden_box").stop().animate({left: "0"}, 1000, "easeInOutQuad");
           else $(this).removeClass("on").find(".hidden_box").stop().animate({left: "0"}, 1000);
       } else {
            $(this).find("button").eq(0).slideUp(200).next().slideDown(800);
            if($(this).hasClass("right")) {
                $(this).addClass("on").css({zIndex: 20}).find(".hidden_box").css({zIndex: 10}).stop().animate({left: "-100%"}, 1000, "easeInOutQuad").parent().siblings().css({zIndex: 1});
            }
            else {
                $(this).addClass("on").css({zIndex: 20}).find(".hidden_box").css({zIndex: 10}).stop().animate({left: "100%"}, 1000, "easeInOutQuad").parent().siblings().css({zIndex: 1});
            }
       }
    });

    //img hover effect
    $(".nb_content ul li").on({
        mouseenter: function(){
            $(this).addClass("over");
        },
        mouseleave: function(){
            $(this).removeClass("over");
        }

    });

    //read more hover,focus
    $(".nb_content ul li button").on({
        "mouseenter focus": function(){
            $(this).animate({letterSpacing: 2, fontWeight: 700});
        },
        "mouseleave blur": function(){
            $(this).animate({letterSpacing: 0, fontWeight: 400});
        }

    });





});

