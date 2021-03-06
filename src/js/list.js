; (function () {
    class List {
        constructor() {
            this.init();
        }
        init() {
            //选项卡
            $('.sear-b-l li').each(function () {
                $(this).on('click', function () {
                    $(this).addClass('active').siblings().removeClass('active');
                })
            });
            //初始化购物车
            if (localStorage.getItem("lecart")) {
                let num = 0;
                let buyArr = JSON.parse(localStorage.getItem("lecart"));
                buyArr.forEach(val => {
                    num += Number(val.num);
                });
                $(".buynum").html(num);
            }
            //数据请求
            $.getJSON("../data/thing.json", function (data) {
                // console.log(data);
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < data.length; j++) {
                        $(".pro-list").append(`<li>
                        <a href="detail.html?id=${data[j].id}"><img src=${data[j].imgSrc[0]} alt=""></a>
                        <div class="pro-Na">
                            <a class="pro-name" title="${data[j].name}" href="detail.html?id=${data[j].id}">
                            ${data[j].name} </a>
                        </div>
                        <p class="price">
                            ￥ <b>${data[j].Nprice}</b>
                        </p>
                        <p class="score">
                            <em>
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                            </em>
                            <span class="score-mes">暂无评价</span>
                        </p>
                        <a href="detail.html?id=${data[j].id}" class="buy">立即购买</a>
                    </li> `);
                    }
                }
            })
        }
    }
    window.onload = function () {
        new List();
        $(".category a").each(function () {
            this.href = 'list.html';
        })

        $(".cart").click(function () {
            if (!$.cookie("login")) {
              if (confirm("你还没有登录，请先登录，是否跳转到登录页面")) {
                location.href = "login.html";
              }
            }else{
              location.href = "cart.html";
            }
          })
    }
})();