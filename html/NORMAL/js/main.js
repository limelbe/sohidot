$(document).ready(function(){

    var $header = $("#header");
    
    $header.on({
        "focusin": function(){
            $header.addClass("view");
        },

        "focusout": function(){
            $header.removeClass("view");
        }
    });
    

    //cover slide
    var $coverSlide = $("#cover .cover_slide ul.slide_img");
    var $coverSlideTxt = $("#cover .cover_slide_txt ul.slide_txt");
    var txtBg = ["#61121a", "#7c4530", "#0e1e60"];
    var txtColor = ["#c2848b", "#190e0a", "#6372ae"];
    var bgNum = 0;
    var slideOn = 0;
    
    $coverSlide.find(".cover_slider01").css({backgroundPosition: "-100px"}).siblings().css({backgroundPosition: "-200px"});
    slide();

    function slide() {
        slideOn = setInterval(next, 5000);
    }

    function next() {
        if($coverSlide.is(":animated")) return false;
        var $first_img = $coverSlide.children().eq(0);
        var $second_img = $coverSlide.children().eq(1);

        $first_img.stop().animate({backgroundPosition: "-200px"}, 1500);
        $second_img.stop().animate({backgroundPosition: "-100px"}, 1500);
        $coverSlide.stop().animate({marginLeft: "-100%"}, 1500, function(){
            $(this).append($first_img).css({marginLeft: 0});
        });

        //txt slide
        var $first_txt = $coverSlideTxt.children().eq(0);

        bgNum++;
        if(bgNum > 2) bgNum = 0;

        $coverSlideTxt.stop().animate({marginLeft: "-100%"}, 1000, function(){
            $(this).append($first_txt).css({marginLeft: 0});
        }).parent().stop().delay(400).animate({backgroundColor: txtBg[bgNum]},800).find("a").stop().delay(600).animate({color: txtColor[bgNum]},800);
    }

    function prev() {
        var $first_img = $coverSlide.children().eq(0);
        var $second_img = $coverSlide.children().eq(1);
        var $last_img = $coverSlide.children().eq(2);
        var $lastClone = $last_img.clone();

        $coverSlide.css({width: "400%", marginLeft: "-100%"}).prepend($lastClone);

        $first_img.stop().animate({backgroundPosition: "-200px"}, 1500);
        $lastClone.stop().animate({backgroundPosition: "-100px"}, 1500);
        $coverSlide.stop().animate({marginLeft: 0}, 1500, function(){
            $last_img.remove();
            $(this).css({width: "300%", marginLeft: "0"});
        });

        //txt slide
        var $last_txt = $coverSlideTxt.children().eq(2);

        $coverSlideTxt.css({width: "400%", marginLeft: "-100%"}).prepend($last_txt.clone()).children().css({width: "25%"});

        bgNum--;
        if(bgNum < 0) bgNum = 2;

        $coverSlideTxt.stop().animate({marginLeft: 0}, 1000, function(){
            $last_txt.remove();
            $(this).css({width: "300%", marginLeft: "0"}).children().css({width: "33.3333%"});
        }).parent().stop().delay(400).animate({backgroundColor: txtBg[bgNum]},800).find("a").stop().delay(600).animate({color: txtColor[bgNum]},800);
    }

   
    //slide prev,next btn
    $("#cover .btn_next").on("click", function(){
        $("#cover .btn_play").addClass("stop").find("span").text("PLAY");
        clearInterval(slideOn);
        if($coverSlide.is(":animated")) return false;
        next();
    });

    $("#cover .btn_prev").on("click", function(){
        $("#cover .btn_play").addClass("stop").find("span").text("PLAY");
        clearInterval(slideOn);
        if($coverSlide.is(":animated")) return false;
        prev();
    });


    //slide play btn
    $("#cover .btn_play").on("click", function(){
        if($(this).hasClass("stop")) {
            $(this).find("span").text("STOP");
            slide();
        } else {
            $(this).find("span").text("PLAY");
            clearInterval(slideOn);
        }

        $(this).toggleClass("stop");
    });


    //subscribe click
    $(".subscribe_btn").on("click", function(){
        alert("THANK YOU FOR SUBSCRIBING :)");  //모달로 바꾸기
    });


    //m_article hover effect
    $("#m_article a").on({
        "mouseenter focus": function(){
            $(this).addClass("on");
        },

        "mouseleave blur": function(){
            $(this).removeClass("on");
        },
    });


    //culture
    var $culImg = $("#m_culture .cul_imgbox img");
    var imgPos1 = parseInt($culImg.eq(0).css("top"));
    var imgPos2 = parseInt($culImg.eq(1).css("top"));
    var bgC = ["#1F3670", "#CE4442", "#D69146", "#052F2D"];

    $("#m_culture ul li a").on({
        "mouseenter focus": function(){
            var imgSrc1 = $(this).data("src1");
            var imgSrc2 = $(this).data("src2");
            var downImg = $(this).parent().index();

            $culImg.eq(0).attr("src", imgSrc1).css({zIndex: 50}).css({display: "block"}, 300).stop().animate({top: imgPos1 + (downImg+1)*150}, 800, "easeOutQuart");

            $culImg.eq(1).attr("src", imgSrc2).css({zIndex: 50}).css({display: "block"}, 300).stop().animate({top: imgPos2 + (downImg+1)*160}, 1200, "easeOutQuart");

            $(this).parent().css({zIndex: 100}).stop().animate({opacity: 1}, 500).siblings().css({zIndex: 20}).stop().animate({opacity: 0.3}, 500);

            $("body").stop().animate({backgroundColor: bgC[downImg]}, 100);
        },

        "mouseleave blur": function(){
            $("#m_culture .cul_imgbox img").css({display: "none"});
            $(this).parent().css({opacity: 0.3});
            $("body").stop().animate({backgroundColor: "#000"}, 100);
        }
        
    });


    //redroom d-day

    function clock(){
        var now = new Date();
        var nowyy = now.getFullYear();
        var nowmm = now.getMonth();
        var nowdd = now.getDate();
        var dDay = new Date(nowyy, nowmm, nowdd+3); //일단 매일 오늘+3일로 설정
    
        var remain = dDay.getTime() - now.getTime();
        var reDay = Math.floor(remain / (1000*60*60*24));
        var reHrs = Math.floor(remain / (1000*60*60)) - reDay*24;
        var reMin = Math.floor(remain / (1000*60)) - reDay*24*60 - reHrs*60;
        var reSec = Math.ceil(remain / (1000)) - reDay*24*60*60 - reHrs*60*60 - reMin*60;

        reHrs %= 24;
        reHrs==24 ? 0 : reHrs;

        reMin %= 60;
        reMin==60 ? 0 : reMin;

        reSec %= 60;
        reSec==60 ? 0 : reSec;

        if(reDay < 10) reDay = "0" + reDay;
        if(reHrs < 10) reHrs = "0" + reHrs;
        if(reMin < 10) reMin = "0" + reMin;
        if(reSec < 10) reSec = "0" + reSec;

        $("#m_redroom .remain_time .digi_clock .day p").text(reDay);
        $("#m_redroom .remain_time .digi_clock .hrs p").text(reHrs);
        $("#m_redroom .remain_time .digi_clock .min p").text(reMin);
        $("#m_redroom .remain_time .digi_clock .sec p").text(reSec);

    }
    
    clock();
    setInterval(clock, 1000);




    //scroll evnet
    var scrollT;
    var scalY = $("#m_scal").offset().top;
    var scalYend = scalY + $("#m_scal").height();
    var winHei = $(window).height();
    var redrY = $("#m_redroom").offset().top;
    var timer = 0;

    $(window).on("scroll", function(){
        timer = setTimeout(function(){
            clearTimeout(timer);

            scrollT = $(this).scrollTop();

            /* header opacity */
            if(scrollT > 200) $header.addClass("view");
            else $header.removeClass("view");

            /* scal on */
            if(scrollT > scalY - 400) {
                $("#m_scal .main_area ul li").addClass("view");
            }

            //bgColor controll
            if(scrollT > scalY - winHei && scrollT < scalYend + winHei/4){
                $("body").addClass("bg");
                $("#m_redroom").stop().animate({opacity: 0}, 600);
                $header.addClass("bg");
                $(".move_top").addClass("bg");

            } else {
                $("body").removeClass("bg");
                $("#m_redroom").stop().animate({opacity: 1}, 700, "easeOutBounce");
                $header.removeClass("bg");
                $(".move_top").removeClass("bg");
            }
        },10);

    });

});