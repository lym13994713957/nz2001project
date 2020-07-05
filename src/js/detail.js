;(function(){
    class Large{
        constructor(imgData){
            this.sBox = $('.small-pic').get(0);
            this.sImg = $(".small-pic img").get(0);
            this.sSpan = $(".small-pic span").get(0);
            this.bBox = $(".big-pic").get(0);
            this.bImg = $(".big-pic img").get(0);
            this.li = $(".img-list li");
            this.imgData = imgData;
            
            this.addEvent();
        }
        addEvent(){
            var that = this;
            this.sBox.onmouseover = function(){
                that.over();
            }
            this.sBox.onmousemove = function(eve){
                var e = eve || window.event;
                that.move(e);
            }
            this.sBox.onmouseout = function(){
                that.out();
            }
            for(let i=0;i<this.li.length;i++){
                this.li[i].onclick = function(){
                    that.sImg.src = that.imgData.imgSrc[i];
                    that.bImg.src = that.imgData.imgSrc[i];
                }
            }
        }
        over(){
            this.sSpan.style.display = "block";
            this.bBox.style.display = "block";
        }
        move(e){
            // 因为页面结构日渐复杂，所以将pageX改回offsetX，但是灰色小滑块会抖，解决方式，纯布局结局
            var l = e.offsetX - this.sSpan.offsetWidth/2;
            var t = e.offsetY - this.sSpan.offsetHeight/2;
            if(l<0) l=0;
            if(t<0) t=0;
            if(l > this.sBox.offsetWidth - this.sSpan.offsetWidth){
                l = this.sBox.offsetWidth - this.sSpan.offsetWidth;
            }
            if(t > this.sBox.offsetHeight - this.sSpan.offsetHeight){
                t = this.sBox.offsetHeight - this.sSpan.offsetHeight;
            }
            this.sSpan.style.left = l + "px";
            this.sSpan.style.top = t + "px";
            var x = l / (this.sBox.offsetWidth - this.sSpan.offsetWidth);
            var y = t / (this.sBox.offsetHeight - this.sSpan.offsetHeight);
            this.bImg.style.left = (this.bBox.offsetWidth - this.bImg.offsetWidth) * x + "px";
            this.bImg.style.top = (this.bBox.offsetHeight - this.bImg.offsetHeight) * y + "px";
        }
        out(){
            this.sSpan.style.display = "none";
            this.bBox.style.display = "none";
        }
    }

    new Large({
        imgSrc:["../img/list/list1-1.png","../img/list/list1-2.png","../img/list/list1-3.png","../img/list/list1-4.png"]
    });

})();