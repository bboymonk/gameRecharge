$(function () {
    var slid = $('ul.slide_box li'), controls = $('ul.bx-controls a');
    slid.addClass('none');
    slid.eq(0).removeClass('none');

    var slideindex = 0;

    function switchi() {
        if (slideindex == slid.length - 1) {
            slideindex = 0;
        } else {
            slideindex = slideindex + 1;
        }
        slid.addClass('none');
        slid.eq(slideindex).removeClass('none');
        controls.removeClass('actives');
        controls.eq(slideindex).addClass('actives');
    }

    var timer = setInterval(switchi, 3000);

    function options(indexs) {
        slid.addClass('none');
        slid.eq(indexs).removeClass('none');
        controls.removeClass('actives');
        controls.eq(indexs).addClass('actives');
    }

    $('a.options').click(function () {
        var drec = $(this).data('drec');
        if (drec == 'pre') {
            if (slideindex == 0) {
                slideindex = 3;
            } else {
                slideindex = slideindex - 1;
            }
        } else {
            if (slideindex == 3) {
                slideindex = 0;
            } else {
                slideindex = slideindex + 1;
            }
        }
        clearInterval(timer);
        options(slideindex);
        timer = setInterval(switchi, 3000);
    });
    $('ul.bx-controls li').hover(function () {
        slideindex = $(this).index();
        clearInterval(timer);
        options(slideindex);
    }, function () {
        timer = setInterval(switchi, 3000);
    });
    $(".top_slide_wrap").mousemove(function () {
        $(".top_slide_wrap a.options").show();
    }).mouseout(function () {
        $(".top_slide_wrap a.options").hide();
    });
    /*锟斤拷锟斤拷乇锟�*/
    $(".noticeClose").on("click", function () {
        $(".notice").hide();
    });
    /*锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷息锟侥癸拷锟斤拷效锟斤拷*/
    $(".newsContain").Slide({
        effect: "scroolTxt",
        speed: "normal",
        timer: 3000,
        steps: 1
    });
    $(".notice").Slide({
        effect: "scroolTxt",
        speed: "normal",
        timer: 3000,
        steps: 1
    });
    $(".couponBoxCloseBtn").on("click", function () {
        $(".couponBox").hide();
    });
    $(".couponBoxConLink").on("click", function () {
        var csrf = $("#csrf").val();
        $.post('/coupon/send-coupon.html', {'_csrf': csrf}, function (data) {
            if (data.status == 4000) {
                window.location.href = data.msg;
            } else if (data.status == 1000) {
                $(".couponBox").hide();
                $(".couponBoxDrop").show();
            } else {
                alert(data.msg);
            }
        }, 'json');
    });
    $(".couponBoxDropConClose").on("click", function () {
        $(".couponBoxDrop").hide();
    })
});
$(function () {
    var index = 1;
    var lists = $(".shopRecommendCon .shopRecommendList");
    var num = lists.length;
    var max = Math.ceil(num / 4);
    for (var i = 0; i < 4; i++) {
        lists.eq(i).show();
    }
    $(".more").click(function () {
        index++;
        if (index > max) index = 1;
        lists.hide();
        var end = index * 4 > num ? num : index * 4;//锟斤拷锟斤拷位锟斤拷
        for (var i = (index - 1) * 4; i < end; i++) {
            lists.eq(i).show();
        }
    });
});