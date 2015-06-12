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
                    $(this).parent().parent().removeClass('active');
                },300);
                $('.header-menu-main-wrap>ul').removeClass('active');
                $(this).remove();
            });
    });
}

/* DOCUMENT READY  */
$(document).ready(function() {
    headerMenu();
	modernize();
	// $('.footer_placeholder').height($('.footer').outerHeight());
    scrollUp($('.footer-last-button-up a'),$('.header-full-version'));

});

$(window).resize(function() {


});






