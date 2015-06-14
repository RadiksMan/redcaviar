var scroller=jQuery.browser.webkit ? "body": "html";

/* modernize */
function modernize() {
	// placeholder
	if(!Modernizr.input.placeholder){
		$('[placeholder]').each(function() {
			$(this).watermark($(this).attr('placeholder'));
		});
	}
}



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

    $(document).on('click','.header-menu-button a',function(e){
        e.preventDefault();
        $('.header-menu-main').slideToggle();
        normalHeight = $('.header-menu-main-wrap>ul').height();
        $('.header-menu-main-wrap>ul').height(normalHeight);
        console.log('123');
    });

    $(document).on('click','.header-menu-main-wrap>ul>li.has-submenu>a',function(e){
            e.preventDefault();
            $(this).parent().find('.sub-menu').addClass('active');
            $('.header-menu-main-wrap>ul').addClass('active');

            var thisHeight = $('.sub-menu.active').height();
            $('.header-menu-main-wrap>ul').height(thisHeight);

            $('.sub-menu.active').find('li:first-child').prepend( "<span class='button-back'>Назад</span>");

            $(document).on('click','.button-back',function(){
                $('.header-menu-main-wrap>ul').height(normalHeight);
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
        $('.social-item-wrap').slideToggle();
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

/* DOCUMENT READY  */
$(document).ready(function() {
    headerMenu();
	modernize();
	// $('.footer_placeholder').height($('.footer').outerHeight());
    scrollUp($('.footer-last-button-up a'),$('.header-full-version'));
    socialBooton();
    itemRank();
    visitedTovarsSlider();
});

$(window).resize(function() {


});






