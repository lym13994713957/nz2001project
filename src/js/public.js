; (function () {
    //当页面滚动一定像素，按钮出现
    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            $(".back").fadeIn(300);
        }
        else {
            $(".back").fadeOut(300);
        }
    });
    //当点击跳转链接后，回到页面顶部位置
    $(".back").click(function () {
        if ($('html').scrollTop()) {
            $('html').animate({ scrollTop: 0 }, 300);
            return false;
        }
        $('body').animate({ scrollTop: 0 }, 300);
        return false;
    })

    //初始化页面
    if($.cookie('login')){
        $('.login').css("display","none");
        $(".loginin").css("display","block");
        $(".user").html(JSON.parse($.cookie("login")).user);
        $(".exit").click(function(){
            $('.login').css("display","block");
            $(".loginin").css("display","none");
            $.cookie("login","",{expires:-1,path:"/"})
        })
    }
    
})();