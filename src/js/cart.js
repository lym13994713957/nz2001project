; (function () {
    class Cart {
        constructor() {
            this.tab = $('.tab');
            this.tbody = $("tbody");
            this.tnum = $(".tonum");
            this.tmoney = $(".totalmoney");
            this.clean = $(".clean");
            this.toNum = this.toMoney = 0;
            this.getDate();
        }
        getDate() {
            if (localStorage.getItem("lecart")) {
                this.gm = JSON.parse(localStorage.getItem("lecart"));
            } else {
                this.gm = [];
            }
            this.createTbody();
        }
        createTbody() {
            if (!this.gm.length < 1) {
                this.clean.css("display", "none");
                this.tab.css("display", "block");
                for (let i = 0; i < this.gm.length; i++) {
                    this.tbody.append(`<tr data-good-id="${this.gm[i].id}">
                    <td>
                        <input type="checkbox" checked class="check">
                    </td>
                    <td class="showmsg">
                        <img src="${this.gm[i].msg.imgSrc[0]}" alt="">
                        <a class="title" href="detail.html?id=${this.gm[i].id}">
                        ${this.gm[i].msg.name}
                        </a>
                    </td>
                    <td class="price">${this.gm[i].msg.Nprice}</td>
                    <td class="numtd">
                        <div class="minus">-</div>
                        <input type="text" class="num" value="${this.gm[i].num}">
                        <div class="plus">+</div>
                    </td>
                    <td class="tot">${(this.gm[i].num * this.gm[i].msg.Nprice).toFixed(2)}</td>
                    <td class="del">删除</td>
                </tr>`);
                    this.toNum += Number(this.gm[i].num);
                    this.toMoney += this.gm[i].num * this.gm[i].msg.Nprice;
                }
                this.checkF();
                this.getEle();
            }
        }
        getEle() {
            this.minus = $(".minus");
            this.plus = $(".plus");
            this.num = $(".num");
            this.tot = $(".tot");
            this.check = $(".check");
            this.del = $(".del");
            this.checkAll = $("#checkAll");
            this.cleanAll = $(".cleanAll");
            this.addEvent();
        }
        addEvent() {
            let that = this;
            //数量增加，小计增加，总计根据选择情况确认
            this.plus.each((i, val) => {
                $(val).click(function () {
                    that.num[i].value++;
                    that.gm[i].num++;
                    $(that.tot[i]).html(function () {
                        return (parseFloat($(that.tot[i]).html()) + parseFloat(that.gm[i].msg.Nprice)).toFixed(2)
                    })
                    //判断是否选中
                    if (that.check[i].checked) {
                        that.toNum++;
                        that.checkF();
                        that.toMoney += parseFloat(that.gm[i].msg.Nprice)
                    }
                    //本地存储
                    localStorage.setItem('lecart', JSON.stringify(that.gm));
                })
            })
            //数量减少，先判断数量不能小于1，小计减少，总计根据选择情况确认
            this.minus.each((i, val) => {
                $(val).click(function () {
                    //判断数量不能小于1
                    if (that.num[i].value == 1) {
                        return;
                    } else {
                        that.num[i].value--;
                        that.gm[i].num--;
                        $(that.tot[i]).html(function () {
                            return (parseFloat($(that.tot[i]).html()) - parseFloat(that.gm[i].msg.Nprice)).toFixed(2)
                        })
                        //判断是否选中
                        if (that.check[i].checked) {
                            that.toNum--;
                            that.checkF();
                            that.toMoney -= parseFloat(that.gm[i].msg.Nprice);
                        }
                        //本地存储
                        localStorage.setItem('lecart', JSON.stringify(that.gm));
                    }
                })
            })
            //删除本行数据
            this.del.each((i, val) => {
                $(val).click(function () {
                    if (confirm("确认删除这个商品吗？")) {
                        $(this).parent().remove();
                        that.gm.splice(i, 1);
                        localStorage.setItem('lecart', JSON.stringify(that.gm));
                        that.toNum -= that.num[i].value;
                        that.checkF();
                        that.toMoney -= that.tot[i].innerHTML;
                        that.minus = $(".minus");
                        that.plus = $(".plus");
                        that.num = $(".num");
                        that.tot = $(".tot");
                        that.check = $(".check");
                        that.del = $(".del");
                    }
                })
            })
            // 清空整个购物车
            this.cleanAll.click(function () {
                if (confirm("确认要清空整个购物车吗？")) {
                    that.tab.css("display", "none").html("");
                    that.clean.css("display", "block");
                    localStorage.removeItem("lecart");
                }
            })
            // 全选框的逻辑
            this.checkAll.click(function () {
                that.check.each((i, val) => {
                    val.checked = that.checkAll[0].checked;
                })
                if (!that.checkAll[0].checked) {
                    that.toNum = that.toMoney = 0;
                    that.tnum.html("0");
                    that.tmoney.html("0");
                } else {
                    that.toNum = that.toMoney = 0;
                    for (let j = 0; j < that.gm.length; j++) {
                        that.toNum += Number(that.gm[j].num);
                        that.toMoney += parseFloat(that.gm[j].num * that.gm[j].msg.Nprice);
                    }
                    that.checkF();
                }
            })
            //单选框的逻辑
            this.check.each(function (i, val) {
                $(val).on("click", function () {
                    if (this.checked) {
                        let arr = $.makeArray(that.check);
                        //every必须所有都为true才返回true
                        let t = arr.every(function (value2) {
                            return value2.checked;
                        })
                        if (t) {
                            that.checkAll[0].checked = true;
                        }
                        that.toNum += Number(that.num[i].value);
                        that.toMoney += parseFloat(that.tot[i].innerHTML);
                        that.checkF();
                    } else {
                        that.checkAll[0].checked = false;
                        that.toNum -= that.num[i].value;
                        that.toMoney -= that.tot[i].innerHTML;
                        that.checkF();
                    }
                });
            })
            //输入框变化事件
            this.num.each((i,val)=>{
                $(val).change(function(){
                    if(isNaN(this.value) || this.value < 1){
                        this.value = 1;
                    }
                    //后面的小计一定变，本地存储一定变，总计根据是否选中变
                    $(that.tot[i]).html(function(){
                        return (that.gm[i].msg.Nprice * that.num[i].value).toFixed(2);
                    })
                    that.gm[i].num = this.value;
                    localStorage.setItem("lecart",JSON.stringify(that.gm));
                    //判断是否被选中
                    if(that.check[i].checked){
                        that.toNum = that.toMoney = 0;
                        that.check.each((j,value)=>{
                            if(that.check[j].checked){
                                that.toNum += Number(that.num[j].value);
                                that.toMoney += Number(that.tot[j].innerHTML);
                                that.checkF();
                            }
                        })
                    }
                })
            })
        }
        checkF() {
            this.tnum.html(this.toNum);
            this.tmoney.html(this.toMoney.toFixed(2));
        }
    }

    new Cart();
})();