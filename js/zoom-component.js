(function(){	
	
	$(document).ready(function() {
		$('[data-zoom]').on('mouseenter touchstart', imgZoom);
		$('[data-zoom-gallery]').children('img').on('click', zoomGallery);
		criarWrap();
		criarTag();
	});

	function criarWrap(){
		var el = $('[data-zoom]');
		el.wrap("<div class='wrap-zoom' style='width: " + el.width() + "px; height: " + el.height() + "px'></div>");
	}

	function imgZoom(e){
		var el = $(this);	
			wrapW = el.width(),
			wrapH = el.height(),
			natW = el.prop('naturalWidth'),
			natH = el.prop('naturalHeight'),
			wrap = $('.wrap-zoom');

		function coordX(e){
			var pageX;
			if (e.type.indexOf('touch') >= 0){
				pageX = e.originalEvent.touches[0].pageX;
			} else {
				pageX = e.pageX;
			}
			el.css('left', (pageX - $(wrap).offset().left) * -((natW - wrapW) / wrapW));
		}

		function coordY(e){
			var pageY;
			if (e.type.indexOf('touch') >= 0){
				pageY = e.originalEvent.touches[0].pageY;
			} else {
				pageY = e.pageY;
			}
			el.css('top', (pageY - $(wrap).offset().top) * -((natH - wrapH) / wrapH));
		}
		
		el.css({
			'opacity': '0',
			'position':'absolute',
			'width': natW, 
			'height': natH
		});

		el.animate({
			opacity: 1,
			left: coordX(e),
			top : coordY(e)
		},500);

		$(wrap).off('mousemove touchmove').on('mousemove touchmove', function (e) {
			el.css({
				'left': coordX(e),
				'top': coordY(e)
			});
			e.preventDefault();
		});

		$('.tag-zoom').hide();

		$('.wrap-zoom').off('mouseleave touchend').on('mouseleave touchend', function() {
			el.removeAttr('style');
			$('.tag-zoom').css('display','flex');
		});

		e.preventDefault();
		e.stopPropagation();
	}

	function criarTag(){
		var el = $('[data-zoom]'),
			tagZoom = "Arraste para dar zoom";
		if (el.data('tag-zoom') != undefined){
			tagZoom = el.data('tag-zoom');
		} 
	$('.wrap-zoom').append('<div class="tag-zoom icon-drag-mobile">' + tagZoom + '</div>');
	}

	function zoomGallery(){
		$('[data-zoom]').attr('src', $(this).attr('src'));
	}

})();