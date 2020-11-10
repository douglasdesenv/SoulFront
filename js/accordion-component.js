(function(){
    'use strict';

    $(document).ready(function(){
        carregaAccordion();
    });

    function carregaAccordion(){   
        $('[data-accordion]').each(criarAccordion);
    }
    
    function criarAccordion(){
        const el = $(this);
        el.find('.accordion-title').each(function(i){
            $(this).on('click', function(){
                openAccordion(el,i)
            });
        });
        openAccordion(el,el.data('accordion')-1);
    }

    function openAccordion(el,i){
        el.find('.accordion-content').slideUp();
        el.find('.accordion-title').removeClass('arrow-down');
        
        if (el.find('.accordion-content').eq(i).is(':hidden')){ 
            el.find('.accordion-content').eq(i).slideDown();
            el.find('.accordion-title').eq(i).addClass('arrow-down');
        } 
    }

})();