; (function () {
  var mySwiper = new Swiper('.swiper-container', {
    autoplay: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
    spaceBetween: 30,
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
  $('.swiper-slide').hover(function () {
    mySwiper.autoplay.stop();
  }, function () {
    mySwiper.autoplay.start();
  })
  $.getJSON('./data/floor.json', function (data) {
    for (let i = 0; i < data.length; i++) {
      // console.log(data[i]);
      if (data[i].type === 'area') {
        let Blist = data[i].mess;
        for (let j = 0; j < Blist.length; j++) {
          let area = document.createElement('div');
          area.className = 'area';
          let areaH = document.createElement('div');
          areaH.className = 'area-header';
          $(areaH).append(`<div class="area-head-tit">
          <h3>${Blist[j].title} <span>|</span><small> ${Blist[j].smalltit}</small></h3></div>`);
          let areaHr = document.createElement('div');
          areaHr.className = 'area-head-more';
          for (let k = 0; k < Blist[j].titri.length; k++) {
            $(areaHr).append(`<a href='#'>${Blist[j].titri[k]}</a>`)
          }
          $(areaH).append(areaHr);
          $(area).append(areaH);
          let areaC = document.createElement('div');
          areaC.className = 'area-con';
          $(areaC).append(` <a href="#">
          <img class="area-con-le" src="${Blist[j].listleImg}" alt=""></a>`);
          let ul = document.createElement('ul');
          ul.className = 'area-con-ri fr';
          for (let o = 0; o < Blist[j].listriImg.length; o++) {
            $(ul).append(`<li><div class="list-tit">
            <span class="g">超划算</span>
        </div>
        <a href="#"><img src="${Blist[j].listriImg[o]}" alt=""></a>
        <h5>${Blist[j].name}</h5>
        <i>${Blist[j].sm}</i>
        <p><b>￥${Blist[j].Nprice}</b> <strong>￥${Blist[j].Yprice}</strong></p>
        <div class="list-bot">
            <a class="r" href="#">立即购买</a>
        </div>
    </li>`);
          }
          $(areaC).append(ul);
          $(area).append(areaC);
          $(area).insertAfter(".classif");
        }
      } else {
        let Blist = data[i].mess;
        let area = document.createElement('div');
        area.className = 'area';
        let areaH = document.createElement('div');
        areaH.className = 'area-header';
        $(areaH).append(`<div class="area-head-tit">
          <h3>${Blist.title} <span>|</span><small> ${Blist.smalltit}</small></h3></div>`);
        let areaHr = document.createElement('div');
        areaHr.className = 'area-head-more';
        for (let k = 0; k < Blist.titri.length; k++) {
          $(areaHr).append(`<a href='#'>${Blist.titri[k]}</a>`)
        }
        $(areaH).append(areaHr);
        $(area).append(areaH);
        let ul = document.createElement('ul');
        ul.className = 'area-second-list';
        $(ul).append(`<a href="#">
          <img src="${Blist.listBigImg}" alt="">
      </a>`);
        for (let o = 0; o < Blist.listliImg.length; o++) {
          $(ul).append(`<li>
        <div class="list-tit">
            <span class="g">超划算</span> <span class="y">热卖</span>
        </div>
        <a href="#">
            <img src="${Blist.listliImg[o]}" alt="">
        </a>
        <h5>${Blist.name}</h5>
        <i>${Blist.sm}</i>
        <p><b>￥${Blist.Nprice}</b> <strong>￥${Blist.Yprice}</strong></p>
        <div class="list-bot">
            <a href="#" class="b">了解详情</a>
            <a class="r" href="#">立即购买</a>
        </div>
    </li>`);
        }
        $(area).append(ul);
        $(area).insertAfter(".area:eq(1)");
      }
    }
    $('.area:eq(1)').find('.area-con-ri span').html('618均价').removeClass('g').addClass('r');
    $('.area:eq(0)').find('.area-con-ri span').html('9.9包邮');
  })
  $(".category a").each(function () {
    this.href = 'pages/list.html';
  })

  if(localStorage.getItem("lecart")){
    let num = 0;
    let buyArr = JSON.parse(localStorage.getItem("lecart"));
    buyArr.forEach(val => {
        // console.log(val);
        num += Number(val.num);
    });
    $(".buynum").html(num);
  }
})();