$(document).ready(function() {
	$(window).scroll(function() {
		fecharTootip();
	});

	$('[data-tootip-direction]').on('mouseover', tootip);
});

function tootip(){
	var el = $(this);
		direction = el.data('tootip-direction'),
		position = el.data('tootip-position'),
		text = el.data('tootip-text'),
		dataText = tootipText(el, text);

	if (dataText != undefined) {
		
		el.after('<div class="tootip">' + dataText + '</div>');
		var tp = $('.tootip');
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
	var dataText;
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
		}
	} else {
		var tpH = el.offset().top - $(window).scrollTop();
		switch(position) {
		    case 'start':
		       	tp.css('top', tpH);
		        break;
		    case 'center':
				tp.css('top', tpH + (el.outerHeight()/2) - (tp.outerHeight()/2));
		        break;
		    default:
		       tp.css('top', tpH + el.outerHeight() - (tp.outerHeight()));
		}
	}
}