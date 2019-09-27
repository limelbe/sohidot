$(document).ready(function() {
    
    var $acc = $("#accordian");
    var bgSrc = ["../images/culture/bg1.jpg", "../images/culture/bg3.jpg", "../images/culture/bg2.jpg", "../images/culture/bg4.jpg"];

    $acc.children().on({
        mouseenter: function(){
            var idx = $(this).index();

            if($acc.children().hasClass("active")){
                if(!$(this).hasClass("active")){
                    $acc.css({width: "100%"});
                    $(this).stop().animate({width: "5%"}).siblings(".accgroup:not(.active)").stop().animate({width: "3.5%"});
                    $(this).find(".over_cnt").stop().animate({opacity: 0.7});
                }
            } else{
                $("#c_wrap").css("background-image", "url(" + bgSrc[idx] + ")");
                $(this).parent().stop().animate({width: "50%"},600);
                $(this).stop().animate({width: "70%"}, 600).siblings().stop().animate({width: "10%"}, 600);
                $(this).find(".over_cnt").css({display: "block"}).stop().animate({opacity: 0.7});
                $(this).find(".tit").hide();
            }
        },

        mouseleave: function(){
            if($acc.children().hasClass("active")){
                $acc.css({width: "100%"});
                $acc.children(".accgroup:not(.active)").stop().animate({width: "4%"});
                $(this).find(".over_cnt").animate({opacity: 0});
            } else{
                if($(this).parent().children().hasClass("active")) return false;
                $(this).find(".tit").show();
                $(this).parent().stop().animate({width: "20%"}).children().stop().animate({width: "25%"});
                $(this).find(".over_cnt").stop().animate({opacity: 0});
            }
        },

        click: function(){
            var $tg = $(this);
            clickBtn($tg);
        }

    });


    $acc.find(".accgroup .tit button").on("keydown", function(e){
        var key = e.keyCode;

        switch(key){
            case 37:
                if($(this).closest(".accgroup").hasClass("first")) $(this).closest(".accgroup").siblings(".last").find("button").focus();
                else $(this).closest(".accgroup").prev().find("button").focus();
                break;
            case 39:
                if($(this).closest(".accgroup").hasClass("last")) $(this).closest(".accgroup").siblings(".first").find("button").focus();
                else $(this).closest(".accgroup").next().find("button").focus();
                break;
            case 36:
                $(this).closest(".accgroup").siblings(".first").find("button").focus();
                break;
            case 35:
                $(this).closest(".accgroup").siblings(".last").find("button").focus();
                break;
            case 13:
            case 32:
                var $tg = $(this);
                clickBtn($target);
        }
    });

    
    function clickBtn($target){
        $target.find(".tit").hide().parent().siblings().find(".tit").show();

        if(!$target.hasClass("active")){
            $acc.animate({width: "100%"});
            $acc.children().removeClass("active").find(".over_cnt").stop().animate({opacity: 0}, 400, function(){
                $(this).css({display: "none"});
            });
            $acc.children().find(".click_cnt").stop().animate({opacity: 0});
            $target.addClass("active").animate({width: "88%"}).siblings().stop().animate({width: "4%"});
            $target.find(".click_cnt").stop().animate({opacity: 1});
        }
        else {
            $acc.children().removeClass("active");
            $acc.stop().animate({width: "20%"}).children().stop().animate({width: "25%"});
            $acc.children().find(".click_cnt").stop().animate({opacity: 0});
        }
    }

});