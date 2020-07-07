; (function () {
    class Register {
        constructor() {
            //获取元素
            this.user = $('#user');
            this.pwd = $("#pwd");
            this.qrpwd = $("#qrpwd");
            this.sub = $("#register");
            this.agr =  $("#agr");
            this.userOn = this.pwdOn = this.qrpwdOn = false;
            //添加事件
            this.addEvent();
        }
        addEvent() {
            let that = this;
            let storage = window.localStorage;
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
            this.qrpwd.blur(function () {
                if (that.qrpwd.val() !== "") {
                    if (this.value === that.pwd.val()) {
                        $(this).parent().next().html('符合要求');
                        that.qrpwdOn = true;
                    } else {
                        $(this).parent().next().html('请和注册密码输入一致');
                        that.qrpwdOn = false;
                        $(this).val('');
                    }
                }else{
                    $(this).parent().next().html('确认密码不能为空！');
                        that.qrpwdOn = false;
                        $(this).val('');
                }
            })
            $("#mpan").codeVerify({
                type:1,
                width:"190px",
                height:"30px",
                fontSize:"20px",
                codeLength:6,
                btnId : "register",
                ready :function(){
                },
                success:function(){
                    if (that.userOn && that.pwdOn && that.qrpwdOn) {
                        if(!that.agr[0].checked){
                            alert("请先同意协议");
                            return;
                        }
                        let storStr = storage.getItem('register') ? storage.getItem('register') : '';
                        let storObj = storStr ? JSON.parse(storStr) : {};
                        if (that.user.val() in storObj) {
                            alert('用户名已经被注册！')
                            return;
                        } else {
                            storObj[that.user.val()] = that.pwd.val();
                            storage.setItem('register', JSON.stringify(storObj));
                            // console.log(this);
                            that.sub.next().html("注册成功，3秒后跳转到登录页面");
                            setTimeout(() => {
                                location.href = 'login.html';
                            }, 3000);
                        }
                    }else{
                        alert("你还没有注册！");
                    }
                },
                error : function(){
                    alert("验证码不正确！");
                }
            })
        }
    }

    new Register();
})();