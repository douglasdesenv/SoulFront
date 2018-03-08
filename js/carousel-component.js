(function(){
    'use strict'

    $(document).ready(function() {
        $('[data-carousel]').each(criarCarousel);
    });

    function criarCarousel(){
        const el = $(this),
        slide = el.find('.slide');

        slide.first().addClass('active');
        el.wrapInner('<div class="wrap-carousel"></div>');
        
        criarNavBotoes(el, slide);
        criarNavSetas(el);
        autoPlay(el);
    }

    function autoPlay(el) {
        let autoplay = 0;

        if (el.data('carousel') > 0) {
            autoplay = el.data('carousel');
        }    
        setInterval(function() {
            if (!el.is(':hover')) {
                navProximo(el, 1);
            }
        }, autoplay);
    }

    function criarNavBotoes(el, slide) {
        if (el.data('carousel-nav') === true) {
            el.append('<div class="nav-bar"></div>');
            slide.each(function(i) {
                el.find('.nav-bar').append('<div class="btn-slide-carousel"></div>');
                el.find('.btn-slide-carousel').eq(i).on("click", function() {
                    const index = i - el.find('.slide.active').index();
                    navProximo(el, index);
                });
            });
        }
    }

    function criarNavSetas(el) {
        if (el.data('carousel-nav') === true) {
            el.append('<div class="btn-arrow-left"></div><div class="btn-arrow-right"></div>');
            el.find('.btn-arrow-left').on("click", function() {
                navProximo(el, -1);
            });
            el.find('.btn-arrow-right').on("click", function() {
                navProximo(el, 1);
            });
        }
    }

    function navProximo(el, index) {
        const cWrap = el.find('.wrap-carousel'),
            slide = el.find('.slide'),
            iAtivo = el.find('.slide.active').index();
        let iAlvo = iAtivo + index,
            sWidth = el.width(),
            wWrap = 0,
            j = 0;

        if ((!cWrap.is(":animated")) && (index !== 0)) {

            slide.css({ 'z-index': 0, 'left': 0 });

            if (index > 0) {
                j = iAtivo;
                wWrap = index * -sWidth;
                cWrap.css('left', 0);
            }
            if (index < 0) {
                j = iAlvo;
                cWrap.css('left', index * sWidth);
            }

            for (let i = 0; i <= Math.abs(index); i++) {
                slide.eq(j).css({ 'left': sWidth * i, 'z-index': 1 });
                if (iAlvo <= slide.last().index()) {
                    j++;
                } else {
                    j = 0;
                    iAlvo = 0;  
                } 
            }

            cWrap.animate({ left: wWrap }, {
                duration: 500,
                complete: function() {
                    slide.removeClass('active');
                    slide.eq(iAlvo).addClass('active');
                }
            });
        }
    }

})();