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
        }
    }

    window.onload = function(){
        new List();
    }
    
})();