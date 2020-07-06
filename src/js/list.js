;(function(){
    class List{
        constructor(){
            this.init();
        }
        init(){
            $('.sear-b-l li').each(function(){
                $(this).on('click',function(){
                    $(this).addClass('active').siblings().removeClass('active');
                })
            })
            if(localStorage.getItem("lecart")){
                let num = 0;
                let buyArr = JSON.parse(localStorage.getItem("lecart"));
                buyArr.forEach(val => {
                    // console.log(val);
                    num += val.num;
                });
                $(".buynum").html(num);
              }
            $.getJSON("../data/thing.json",function(data){
                // console.log(data);
                for(let i=0;i<4;i++){
                    for(let j=0;j<data.length;j++){
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
    window.onload = function(){
        new List();
        $(".category a").each(function () {
            this.href = 'list.html';
          })
    }
})();