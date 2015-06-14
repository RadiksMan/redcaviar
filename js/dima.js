
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
        console.log(val);
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

$(document).ready(function() {

    carouselInit();
    acordion();
    hardTabs();
    ratingScript();
});






