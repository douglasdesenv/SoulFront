(function(){
    'use strict';

    $(document).ready(function(){
        $('[data-popup]').each(criarPopups);
        $('[data-popup-close]').each(function(){
            $(this).on('click', fecharPopup);
        });
    });
    
    function criarPopups(){
        $(this).off('click').on('click', function(e) { 
            abrirPopup($(this).data('popup')); 
            e.preventDefault();
        });
    }

    function abrirPopup(target){
        $(target).show();
        abrirMascara();
    }
    
    function fecharPopup(){
        $('.popup').hide();
        fecharMascara();
    }
    
    function abrirMascara(){
        $('#mask').show().css('top', 0);
        $('#mask').off('click').on('click', fecharPopup);
        $('body').css('overflow-y','hidden');
    }
    
    function fecharMascara(){
        $('#mask').hide();
        $('body').css('overflow-y','auto');
    }
         
})();

