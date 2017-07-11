$(function () {
    $("#mobileTerminal").mousemove(function () {
        $(".erweima").show();
    }).mouseout(function () {
        $(".erweima").hide();
    });

    /*********************************/
    $(".option").on("click", function () {
        $(".option a").removeClass("optionActive");
        $(this).children("a").addClass("optionActive");
    });

    /*?涓嬫媺鍒楄〃涓殑鍏抽棴鎸夐挳*/
    $(".searchBoxTitle .closeButton").on("click", function () {
        $(".searchBoxDrop").hide();
    });
    /*?渚ц竟鏍忕殑閫変腑鏁堟灉*/

    //$(".sidebar ul li").on("click", function () {
    //    $(".sidebar ul li").removeClass("asideActive");
    //    $(this).addClass("asideActive");
    //});

    $(".nav_items li").on("click", function () {
        $(".nav_items li").removeClass("navActive");
        $(this).addClass("navActive");
    })
    /**********************************/
    $(".letterTab li a").on("click", function () {
        $(".letterTab li a").removeClass("active");
        $(this).addClass("active");
    })
});