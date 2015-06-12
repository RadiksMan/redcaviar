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


/* input only Number  */
function inputNumber(block) {	
	$('input', block).keypress(function(e) {
		if (e.which >= 47 && e.which <= 57 ){}
		else return false;
	});
	
	$('input', block).keyup(function() {
		$inputNum = $(this);
		if ($inputNum.val == '' || $inputNum.val() == 0) {
			$inputNum.val('1'); 
		}
	});
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
		
		$(scroller).animate({scrollTop:target},800);
		return false;

		e.preventDefault();
	});
}

function initIosSlider() {
	$('.sliderBox').each(function() {
		var $sliderBox = $(this),
		slidesNum = $('.slide', $sliderBox).length;
		if (slidesNum > 1 ) {	
			var i = 0;
			while (i < slidesNum) {
				$('.sliderSelectors', $sliderBox).append('<div class="item" />');
				i++;
			}
			$('.sliderSelectors .item:eq(0)', $sliderBox).addClass('selected');
		}	
		
		$('.iosslider', $sliderBox).iosSlider({
			snapToChildren: true,
			scrollbar: false,
			scrollbarHide: true,
			responsiveSlideContainer: true,
			responsiveSlides: true,
			desktopClickDrag: true,
			navSlideSelector: $('.sliderSelectors .item', $sliderBox),
			navPrevSelector: $('.prev', $sliderBox),
			navNextSelector: $('.next', $sliderBox),
			infiniteSlider:  true,
			onSlideChange: slideChange,
			autoSlide: false
		});
		
		$('.iosslider', $sliderBox)
			.attr('unselectable', 'on')
			.select(function() {
				return false
			});
		
		
		function slideChange(args) {
			$('.sliderSelectors .item', $sliderBox).removeClass('selected');
			$('.sliderSelectors .item:eq(' + (args.currentSlideNumber - 1) + ')', $sliderBox).addClass('selected');
		}
	})
}

function anythingSlider(){
	$('#anythingSlider').anythingSlider({
		buildNavigation: false,    
		buildStartStop: false,
		mode:'fade',
		hashTags:false,
		autoPlay:true,
		delay:3000,    
		animationTime:600,  
	});
}

function initScrollpane(){
	$('.scroll-pane').jScrollPane();
}

function carouselsInit(){
  $('.carousel-wrap').each(function(){
    var parent=$(this);
    
    $('.carousel',parent).jcarousel({
        wrap: 'circular',
        animation: 500
    });

    $('.carousel-pagination',parent)
    	.on('jcarouselpagination:active', 'a', function() {
            $(this).addClass('active');
        })
        .on('jcarouselpagination:inactive', 'a', function() {
            $(this).removeClass('active');
        })
        .on('click', function(e) {
            e.preventDefault();
        })
        .jcarouselPagination({
            perPage: 2,
            item: function(page) {
                return '<a href="#' + page + '">' + page + '</a>';
            }
        });
   
    $('.carousel-prev',parent).jcarouselControl({target: '-=1'});
    $('.carousel-next',parent).jcarouselControl({target: '+=1'});

    var width=0;
    $('.carousel ul li', parent).each(function(){
      width+=parseFloat($(this).outerWidth(true));
    });
    
    if(width<= $('.carousel', parent).width()) {
      $('.carousel-next,.carousel-prev',parent).hide();
    }
    $('.carousel',parent).height($('.carousel ul',parent).height());
    /* caruselControlsDefault */ 
    $(this).height($('.carousel',parent).height());
  });
}

function oneHeightItems(){

	function oneHeight(block){
		var height=0;
		block.removeAttr('style');
		block.each(function(){
			if($(this).height()>height){
				height=$(this).height();
			}
		});
		block.css('height', height);
	}

	oneHeight($('.oneHeight'));
}

/* DOCUMENT READY  */
$(document).ready(function() {	
	modernize();
	$('.footer_placeholder').height($('.footer').outerHeight());
	initIosSlider();
	anythingSlider();
	carouselsInit();
	oneHeightItems();
});

$(window).resize(function() {

	
});

	


	
	
		