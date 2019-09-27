$(document).ready(function() {
    //방송중 레드룸
    var maxNum = 8; 
    var lineHei = 70;
    var loadnum = $('.RedRoom_user li').length;

    $('.RedRoom_user').css('paddingTop', (maxNum - loadnum)*70);

    //엔터 
    $('#chat_box #chat_txt').on('keydown', function (e) {
        var key = e.keyCode;
        if (key == 13) chatWrite();
         
    });

    //클릭이벤트
    $('#chat_box button').on('click', chatWrite);

    function chatWrite(){
        var listNum = $('.RedRoom_user li').length;

        var iconNum = Math.ceil(Math.random() * 5);
        var iconScr = '<img class="icon" src="../images/redroom/person0' + iconNum + '.png" alt="">';

        if ($('#chat_txt').val() != '') {
            if (listNum < maxNum - 2) {
                $('.RedRoom_user').css('paddingTop', (maxNum - listNum - 1) * 70);
            } else if (listNum < maxNum - 1) {
                $('.RedRoom_user').css('paddingTop', 70);
                $('.RedRoom_user li').eq(0).addClass('opacity50');
            } else if (listNum < maxNum) {
                $('.RedRoom_user').css('paddingTop', 0);
                $('.RedRoom_user li').removeClass();
                $('.RedRoom_user li').eq(0).addClass('opacity25').next().addClass('opacity50');
            } else {
                $('.RedRoom_user').css('paddingTop', 0);
                $('.RedRoom_user li').removeClass();
                $('.RedRoom_user li').eq(1).addClass('opacity25').next().addClass('opacity50');
                $('.RedRoom_user li').eq(0).remove()
            }
            $('.RedRoom_user').append('<li>' + iconScr + '<p>' + $('#chat_txt').val() + '</p></li>');
        }
        $('#chat_txt').val('');
    }


});