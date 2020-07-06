; (function () {
    class Large {
        constructor(imgData) {
            this.sBox = $('.small-pic').get(0);
            this.sImg = $(".small-pic img").get(0);
            this.sSpan = $(".small-pic span").get(0);
            this.bBox = $(".big-pic").get(0);
            this.bImg = $(".big-pic img").get(0);
            this.li = $(".img-list li");
            this.imgData = imgData;
            this.addEvent();
        }
        addEvent() {
            var that = this;
            this.sBox.onmouseover = function () {
                that.over();
            }
            this.sBox.onmousemove = function (eve) {
                var e = eve || window.event;
                that.move(e);
            }
            this.sBox.onmouseout = function () {
                that.out();
            }
            for (let i = 0; i < this.li.length; i++) {
                this.li[i].onclick = function () {
                    that.sImg.src = that.imgData[i];
                    that.bImg.src = that.imgData[i];
                }
            }
        }
        over() {
            this.sSpan.style.display = "block";
            this.bBox.style.display = "block";
        }
        move(e) {
            // 因为页面结构日渐复杂，所以将pageX改回offsetX，但是灰色小滑块会抖，解决方式，纯布局结局
            var l = e.offsetX - this.sSpan.offsetWidth / 2;
            var t = e.offsetY - this.sSpan.offsetHeight / 2;
            if (l < 0) l = 0;
            if (t < 0) t = 0;
            if (l > this.sBox.offsetWidth - this.sSpan.offsetWidth) {
                l = this.sBox.offsetWidth - this.sSpan.offsetWidth;
            }
            if (t > this.sBox.offsetHeight - this.sSpan.offsetHeight) {
                t = this.sBox.offsetHeight - this.sSpan.offsetHeight;
            }
            this.sSpan.style.left = l + "px";
            this.sSpan.style.top = t + "px";
            var x = l / (this.sBox.offsetWidth - this.sSpan.offsetWidth);
            var y = t / (this.sBox.offsetHeight - this.sSpan.offsetHeight);
            this.bImg.style.left = (this.bBox.offsetWidth - this.bImg.offsetWidth) * x + "px";
            this.bImg.style.top = (this.bBox.offsetHeight - this.bImg.offsetHeight) * y + "px";
        }
        out() {
            this.sSpan.style.display = "none";
            this.bBox.style.display = "none";
        }
    }
    class Detail {
        constructor() {
            //获取所有必须元素
            this.tit = $(".title");
            this.imgList = $(".img-list");
            this.price = $(".price");
            this.format = $(".formated");
            this.tot = $(".tot-money");
            this.tabtit = $(".tab-tit li");
            this.tablist = $(".tab-list li");
            this.plus = $(".plus");
            this.minus = $(".minus");
            this.num = $('#num');
            this.buy = $(".buy");
            this.sImg = $(".small-pic img").get(0);
            this.bImg = $(".big-pic img").get(0);
            this.getDate();
            this.load();
        }
        getDate() {
            this.id = location.search.slice(1).split("=")[1];
        }
        load() {
            let that = this;
            if(localStorage.getItem("lecart")){
                let num = 0;
                let buyArr = JSON.parse(localStorage.getItem("lecart"));
                buyArr.forEach(val => {
                    // console.log(val);
                    num += val.num;
                });
                $(".buynum").html(num);
              }
            $.getJSON("../data/thing.json", function (data) {
                for (let i = 0; i < data.length; i++) {
                    if (that.id == data[i].id) {
                        that.data = data[i];
                        //初始化页面数据
                        that.display();
                    }
                }
            })
        }
        display() {
            let that = this;
            for (let i = 0; i < this.tit.length; i++) {
                $(this.tit[i]).html(`${that.data.name}`);
            }
            for (let i = 0; i < this.data.imgSrc.length; i++) {
                this.imgList.append(`<li>
                <img src=${this.data.imgSrc[i]} alt="">
            </li> `);
            }
            //渲染数据
            this.sImg.src = this.data.imgSrc[0];
            this.bImg.src = this.data.imgSrc[0];
            this.price.html(`${this.data.Nprice}`);
            this.tot.html(`${this.data.Nprice}`);
            this.format.html(`${this.data.format}`);
            for (let i = 0; i < this.data.msg.length; i++) {
                $(this.tablist[0]).append(`<img src = ${this.data.msg[i]}>`);
            }
            this.addEvent();
        }
        addEvent() {
            let that = this;
            //放大镜
            new Large(this.data.imgSrc);
            // 数量增加，总计增加
            this.plus.click(function(){
                that.num.val(function(i,val){
                    return parseInt(val) + 1
                });
                that.tot.html(function(){
                    return (parseFloat(that.tot.html()) + parseFloat(that.data.Nprice)).toFixed(2);
                });
            })
            //数量介绍，总计减少，数量不能少于1
            this.minus.click(function(){
                if(that.num.val() <= 1) return;
                that.num.val(function(i,val){
                    return parseInt(val) - 1
                });
                that.tot.html(function(){
                    return (parseFloat(that.tot.html()) - parseFloat(that.data.Nprice)).toFixed(2);
                });
            })
            //选项卡
            this.tabtit.each((i,val)=>{
                $(val).click(function(){
                    $(this).addClass("active").siblings().removeClass('active');
                    that.tablist.eq(i).addClass("active").siblings().removeClass("active");
                });
            })
            // 吸顶菜单 805
            window.onscroll = ()=>{
                if($(window).scrollTop()>805){
                    $(this.tabtit[0]).parent().parent().addClass('fix');
                }else{
                    $(this.tabtit[0]).parent().parent().removeClass("fix");
                }
            }
            //加入购物车
            this.buy.click(function(){
                that.setDate();
            })
        }
        setDate(){
            let storage = window.localStorage;
            let gm = storage.getItem('lecart') ? JSON.parse(storage.getItem('lecart')) : [];
            if(gm.length === 0){
                gm = [{
                    goodsId:this.id,
                    num:this.num.val(),
                    msg:this.data
                }];
            }else{
                // 先判断，这次点的，在老数据中有没有
                var zhuangtai = 0;
                for(var i=0;i<gm.length;i++){
                    // 1-2-1.有：数量+1
                    if(gm[i].goodsId === this.id){
                        gm[i].num = parseInt(gm[i].num) + parseInt(this.num.val());
                        zhuangtai = 1;
                        break;
                    }
                }
                if(zhuangtai == 0){
                    // 1-2-2.没有：给数组，新增一个数据
                    gm.push({
                        goodsId:this.id,
                        num:this.num.val(),
                        msg:this.data
                    })
                }
            }
            storage.setItem("lecart",JSON.stringify(gm));
        }
    }

    $(".category a").each(function () {
        this.href = 'list.html';
      })
    new Detail();
})();