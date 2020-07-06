;(function(){
    class Login{
        constructor(){
            this.user = $("#user");
            this.pwd = $("#pwd");
            this.sub = $("#login");
            this.rem =  $("#rember");
            this.userOn = this.pwdOn = false;
            //添加事件
            this.addEvent();
        }
        addEvent(){
            let that = this;
            // 注册表
            let reObj  = localStorage.getItem('register') ? JSON.parse(localStorage.getItem('register')) : {};
            this.user.blur(function () {
                if (this.value !== "") {
                    let reg = /^[\w\-]{4,20}$/;
                    if (reg.test(this.value)) {
                        $(this).parent().next().html('符合要求');
                        that.userOn = true;
                    } else {
                        $(this).parent().next().html('请输入4~20位，包含_,字母，数字这类特殊字符');
                        that.userOn = false;
                        $(this).val("");
                    }
                } else {
                    $(this).parent().next().html('用户名不能为空');
                    that.userOn = false;
                }
            })
            this.pwd.blur(function () {
                if (this.value !== "") {
                    let reg = /^[\w\-]{4,20}$/;
                    if (reg.test(this.value)) {
                        $(this).parent().next().html('符合要求');
                        that.pwdOn = true;
                    } else {
                        $(this).parent().next().html('请输入4~20位，包含_,字母，数字这类特殊字符');
                        that.pwdOn = false;
                        $(this).val("");
                    }
                }else{
                    $(this).parent().next().html('密码不能为空');
                        that.pwdOn = false;
                }
            })

            this.sub.click(function () {
                if (that.userOn && that.pwdOn) {
                    if(that.user.val() in reObj){
                        if(reObj[that.user.val()] === that.pwd.val()){
                            let Obj = {
                                user:that.user.val()
                            }
                            if(that.rem[0].checked){
                                // console.log(1);
                                $.cookie("login",JSON.stringify(Obj),{expires : 7,path : '/'})
                            }else{
                                $.cookie("login",JSON.stringify(Obj),{path:"/"})
                            }
                            $(this).next().html("登录成功！3秒钟后跳转到首页")
                            setTimeout(()=>{
                                location.href ="../index.html"
                            },3000)
                        }else{
                            alert("密码错误！");
                            that.pwd.val("");
                        }
                    }else{
                        alert("用户名错误！");
                        that.user.val("");
                    }
                }
            })
        }
    }

    new Login();
})();