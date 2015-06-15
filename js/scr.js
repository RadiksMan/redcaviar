var scroller=jQuery.browser.webkit ? "body": "html";

/* u_tabs */
function u_tabs(link, block) {
	$(link).click(function(e) {
		var $currentTab = $(this);
		var tabId = $currentTab.data('utab');

		$(link).removeClass('active');
		$currentTab.addClass('active');

		$(block).hide().removeClass('active');
		$(block+'[data-utab="' + tabId + '"]').show().addClass('active');
		if($(link).is('a')){
			e.preventDefault();
		}
	});
	$(link).eq(0).click();
}

/* scrollUp */
function scrollUp(block,targetBlock) {

	$(block).click(function(e){
		var target = $(targetBlock).offset().top;

		$(scroller).animate({scrollTop:target},400);
		return false;

		e.preventDefault();
	});
}
function headerMenu(){
    var normalHeight;
    var maybeHeight;
    $(document).on('click','.header-menu-button a',function(e){
        e.preventDefault();
        $('.header-menu-main').slideToggle();
        normalHeight = $('.header-menu-main-wrap>ul').height();
        maybeHeight = $('.header-menu-main-wrap>ul>li').outerHeight()*$('.header-menu-main-wrap>ul>li').length;

        $('.header-menu-main-wrap>ul').height(normalHeight);

        console.log(maybeHeight);
    });

    $(document).on('click','.header-menu-main-wrap>ul>li.has-submenu>a',function(e){
            e.preventDefault();
            $(this).parent().find('.sub-menu').addClass('active');
            $('.header-menu-main-wrap>ul').addClass('active');

            var thisHeight = $('.sub-menu.active').height();
            $('.header-menu-main-wrap>ul').height(thisHeight);

            $('.sub-menu.active').find('li:first-child').prepend( "<span class='button-back'>Назад</span>");

            $(document).on('click','.button-back',function(){
                $('.header-menu-main-wrap>ul').height(maybeHeight);
                //console.log(normalHeight);
                setTimeout(function(){
                    $('.sub-menu').removeClass('active');
                },300);
                $('.header-menu-main-wrap>ul').removeClass('active');
                $('.button-back').remove();
            });
    });
}
function socialBooton(){
    $(document).on('click','.social-share',function(){
        $(this).toggleClass('active');
        $(this).parent().find($('.social-item-wrap')).slideToggle();
    });
}
function itemRank(){
    $('.recept-item-complexity').each(function(){
        var rank=$(this).data('rank')*20;
        $(this).find('.item-complexity').css({'width':rank+'%'});
    });
};

function visitedTovarsSlider(){
    $('.visited-tovars-slider').slick({
        prevArrow:'<button type="button" class="slick-prev"></button>',
        nextArrow:'<button type="button" class="slick-next"></button>',
        autoplay:false,
        autoplaySpeed:4000,
        dots: false,
        arrows:true,
        centerPadding: '0px',
        respondTo:'window',
        slidesToShow: 2,
        responsive: [
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
              }
            }
          ]
    });
}

function add_favorite(a) {
  title=document.title;
  url=document.location;
  try {
    // Internet Explorer
    window.external.AddFavorite(url, title);
  }
  catch (e) {
    try {
      // Mozilla
      window.sidebar.addPanel(title, url, "");
    }
    catch (e) {
      // Opera и Firefox 23+
      if (typeof(opera)=="object" || window.sidebar) {
        a.rel="sidebar";
        a.title=title;
        a.url=url;
        a.href=url;
        return true;
      }
      else {
        // Unknown
        alert('Нажмите Ctrl-D чтобы добавить страницу в закладки');
      }
    }
  }
  return false;
}

function AddCart(){
        $(".numerical-input input").keydown(function (e) {
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
                (e.keyCode == 65 && e.ctrlKey === true) ||
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                     return;
            }
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });

        var nowValue = 0;
        $(document).on('click','.input-plus',function(){
            nowValue = parseInt($(this).parent().find('input').val());

            nowValue = nowValue+ 1;
            var maxValue = $(".numerical-input input").data('max');
            if(nowValue<maxValue){
                 $(this).parent().find('input').val(nowValue);
            }
            PriceCount();
        });
        $(document).on('click','.input-minus',function(){
            nowValue = parseInt($(this).parent().find('input').val());
            nowValue = nowValue- 1;
            if(nowValue<1){
                nowValue = 1;
            }
            $(this).parent().find('input').val(nowValue);
            PriceCount();
        });

        function PriceCount(){
            var userPrice = 0;
            var point = 0;
            $('.bucket-item').each(function(){
                var buketInput = parseInt($(this).find('.numerical-input input').val());
                var bucketPrice = parseInt($(this).find('.price-span').html());

                userPrice = buketInput * bucketPrice;
                $(this).find('.numerical-input input').attr('data-price',userPrice);
                point++;
                if($('.bucket-item').length==point){
                    countValue();
                }
            });
        }

        var dataPrice = 0;
        function countValue(){
            var valOuter = 0;
            $('.bucket-item').each(function(){
                dataPrice = parseInt($(this).find('.numerical-input input').attr('data-price'));
                valOuter = valOuter + dataPrice;
            });
           $('.purchase-sum-value').html(valOuter+" "+"руб");
        }
        $(document).on('click','.close-icon',function(){
            $(this).parents('.bucket-item').remove();
            PriceCount();
            if($('.bucket-item').length == 0){
                $('.purchase-sum-value').html(0+" "+"руб");
            }
        });

        $(".numerical-input input").keyup(function(){
            PriceCount();
        });

        PriceCount();
}
function carouselInit(){
    $('.carousel').each(function(){

        var itemsShow = $(this).data('show');
        var carouselDots = $(this).data('dots');

        $(this).slick({
          dots: carouselDots,
          infinite: true,
          speed: 300,
          respondTo:'window',
          slidesToShow: itemsShow,
          draggable:true,
          prevArrow:'<button type="button" class="slick-prev"></button>',
          nextArrow:'<button type="button" class="slick-next"></button>',
          slidesToScroll: itemsShow,
          responsive: [
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        });
    });
};
function hardTabs(){
    $(document).on('click','.hard-tabs-tab',function(){
        var index = ($('.hard-tabs-tab').length-1)-$(this).index();
        $('.hard-tabs-tab').removeClass('active');
        $(this).addClass('active');
        $('.hard-tabs-item').removeClass('active');
        $('.hard-tabs-item').eq(index).addClass('active');
    });
};
function ratingScript(){
    $('.rating-stars').each(function(){
        var val = $(this).find('span').data('value');
        $(this).find('span').css({'width':val + '%'});
    });
};

function acordion(){
    $(document).on('click','.acrodion-link',function(){

        var parent = $(this).parent();
        if(parent.is('.active')){
            $('.acordion-item').removeClass('active');

        }
        else{
            $('.acordion-item').removeClass('active');
            parent.addClass('active');
            parent.find('.acordion-content').slideDown(300);
        }
        $('.acordion-item:not(.active) .acordion-content').slideUp(300);
    });
}
/* DOCUMENT READY  */
$(document).ready(function() {
    headerMenu();
    scrollUp($('.footer-last-button-up a'),$('.header-full-version'));
    socialBooton();
    itemRank();
    AddCart();
    carouselInit();
    acordion();
    hardTabs();
    ratingScript();

});

$(window).resize(function() {


});






