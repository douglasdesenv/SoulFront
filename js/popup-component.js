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
        $('body').css('overflow-y','hidden').prepend('<div id="mask"></div>');
        $('#mask').fadeIn('fast').off('click').on('click', fecharPopup);
    }

    function fecharPopup(){
        $('.popup').hide();
        fecharMascara();
    }
    
    function fecharMascara(){
        $('#mask').fadeOut('fast', function() { 
            $(this).remove(); 
        });
        $('body').css('overflow-y','auto');
    }
         
})();