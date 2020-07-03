;(function(){
    let o_back = $('.back')[0];
    window.onscroll = function () {
      //获取当前的滚动距离
      var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      //判断滚动距离大于等于4000的时候，回到顶部的按钮显示出来
      if (scrollTop >= 500) {
        o_back.style.display = 'block';
      } else {
        o_back.style.display = 'none';
      }
    }
    o_back.onclick = function () {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    }
})();