(function(){
	'use strict'

	$(document).ready(function() {
		carregaTootip();
	});

	function carregaTootip(){
		$('[data-tootip-direction]').on('mouseover', tootip);
		
		$(window).scroll(function() {
			fecharTootip();
		});
	}

	function tootip(){
		const el = $(this),
			direction = el.data('tootip-direction'),
			position = el.data('tootip-position'),
			text = el.data('tootip-text'),
			dataText = tootipText(el, text);

		if (dataText != undefined) {
			
			el.after('<div class="tootip">' + dataText + '</div>');
			const tp = $('.tootip');
			tp.hide().fadeIn();
			el.removeAttr('title');
			
			el.mouseleave(function () {
				fecharTootip();
				el.attr('title', dataText);
			});

			tootipDirection(el, tp, direction);
			tootipPosition(el, tp, direction, position);
		}
	}

	function tootipText(el, text){
		let dataText;
		if (text != undefined){
			dataText = text;
		} else{
			if (el.attr('title') && el.attr('title') != '') {
				dataText = el.attr('title');	
			} 
		}
		return dataText;
	}

	function fecharTootip(){
		$(".tootip").remove();
	}

	function tootipDirection(el, tp, direction, position){
		switch(direction) {
			case 'bottom':
				tp.addClass('tip-top').css('top', el.offset().top - $(window).scrollTop() + el.outerHeight() + 10);
				break;
			case 'right':
				tp.addClass('tip-left').css('left', el.offset().left + el.outerWidth() + 10);
				break;
			case 'left':
				tp.addClass('tip-right').css('left', el.offset().left - tp.outerWidth() - 10);
				break;
			default:
				tp.addClass('tip-bottom').css('top', el.offset().top - $(window).scrollTop() - tp.outerHeight() - 10);
		}
	}

	function tootipPosition(el, tp, direction, position){
		if (direction === 'top' || direction === 'bottom'){
			switch(position) {
				case 'start':
					tp.css('left', el.offset().left - (tp.outerWidth()/2));
					break;
				case 'end':
					tp.css('left', el.offset().left + el.outerWidth() - (tp.outerWidth()/2));
					break;
				default:
				tp.css('left', el.offset().left + (el.outerWidth()/2) - (tp.outerWidth()/2));     
			}
		} else {
			const tpH = el.offset().top - $(window).scrollTop();
			switch(position) {
				case 'start':
					tp.css('top', tpH);
					break;
				case 'middle':
					tp.css('top', tpH + (el.outerHeight()/2) - (tp.outerHeight()/2));
					break;
				default:
				tp.css('top', tpH + el.outerHeight() - (tp.outerHeight()));
			}
		}
	}

})();