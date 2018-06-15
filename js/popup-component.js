(function(){
    'use strict';

    $(document).ready(function(){
        carregaPopup();
    });

    function carregaPopup(){
        $('[data-popup]').each(criarPopups);
        $('[data-popup-close]').each(function(){
            $(this).on('click', fecharPopup);
        });
    }
    
    function criarPopups(){
        $(this).off('click').on('click', function(e) { 
            abrirPopup($(this).data('popup')); 
            e.preventDefault();
        });
    }

    function abrirPopup(target){
        $(target).css('display', 'flex').fadeIn('fast');
        abrirMascara();
    }
    
    function abrirMascara(){
        $('#mask').fadeIn('fast').off('click').on('click', fecharPopup);
        $('body').css('overflow-y','hidden');
    }

    function fecharPopup(){
        $('.popup').hide();
        fecharMascara();
    }
    
    function fecharMascara(){
        $('#mask').fadeOut('fast');
        $('body').css('overflow-y','auto');
    }
         
})();