'use strict';

$(document).ready(function(){
    $('.select-chk').on('click', criaSelectCheck);
    criaFiltros();
    $('.filter-row select, .dropdown-situacao-content').each(function(){
        $(this).on('change', filtrar);
    });
    $('.filtro-pedido, .filtro-cupom').on('keyup', filtrar);
    $('.filtro-pedido, .filtro-cupom').on('keypress', apenasNumeros);
   
    atualizaGrid();
});

$(document).click(function(e) {
    if ($(e.target).closest('.dropdown-situacao').length === 0) {
        $('.dropdown-situacao-content').hide();
    } 
});

function criaSelectCheck() {
    const menu = $('.dropdown-situacao-content');
    if (menu.is(':hidden')) {
        menu.show();  
    } else {
        menu.hide();
    }
}

function criaFiltros(){
    $('.filter-row select, .dropdown-situacao-content').not('.filtered').each(function(){
        const el = this;
        if (el.tagName == 'SELECT') {
            $(el).children('option').not(':first').remove();
            $('.col-' + el.className + ':visible').map(function(){
                const txtColuna = $(this).text().split(':')[0];
                if ($(el).children('option:contains('+ txtColuna +')').length === 0){
                    $(el).append("<option value='" + txtColuna + "'>" + txtColuna + "</option>");
                }     
            });
        } 
        if ($(el).hasClass('dropdown-situacao-content')) {
            $('.filtro-situacao').remove();
            $('.col-filtro-situacao:visible').map(function(){
                const txtColuna = $(this).text();
                
                if ($(el).find(':contains(' + txtColuna + ')').length === 0){
                    $(el).append("<span class='filtro-situacao'><input id='id"+ txtColuna +"' type='checkbox'><label for='id"+ txtColuna +"'>"+ txtColuna +"</label></span>");
                }   
            });
        }
    });
}

function filtrar(){
    if (($(this).prop('type') == 'select-one' && $(this).children('option:selected').val() != $(this).children('option').eq(0).val()) || 
        ($(this).hasClass('dropdown-situacao-content') && $(this).find('input[type="checkbox"]:checked').length > 0) || 
        ($(this).prop('type') == 'text' && $(this).val() !== '')) {
            $(this).addClass('filtered');
    }
    else {
        $(this).removeClass('filtered');
    }
    
    $('tbody tr').show();
     
     $('.filter-row select, .filter-row input[type="text"], .dropdown-situacao-content').each(function(){
        if($(this).hasClass('filtered')){
            if ($(this).prop('type') == 'select-one') {
               $('.col-' + $(this).prop('className').split(' ')[0] + ':not(:contains(' + $(this).val() + '))').parent('tr').hide();
            }
            
            if ($(this).hasClass('dropdown-situacao-content')) {
                let filtros = '';
                $(this).find('input[type="checkbox"]:checked').each(function(){
                    filtros +=  ':not(:contains(' + $(this).parent().text() + '))';
                }); 
                $('.col-filtro-situacao'+  filtros).parent('tr').hide();
            }
            
            if ($(this).prop('type') == 'text') {
               $('.col-' + $(this).prop('className').split(' ')[0] + ':not(:contains(' + $(this).val() + '))').parent('tr').hide();
            }
       }
    }); 
    criaFiltros();
    atualizaGrid();
}

function atualizaGrid(){    
    $('.tabela-vazia').hide();  
        
    if ($('.tbl-pedidos tbody tr').filter(':visible').length > 0){
       let i = 1; 
       
        $('tfoot').show();
        $('.tabela-vazia').hide();  
        
        $('.col-indice').filter(':visible').each(function(){
            $(this).text(i++);
        });
        
        $([$('.col-compra'), $('.col-frete'), $('.col-desconto'), $('.col-subtotal'), $('.col-valor-cupom')]).each(function(){
            let j = 0;
            this.filter(':visible').each(function(){
                j = j + parseFloat($(this).text().replace(",", "."));
            });
           $('.' + this[0].className + '-total').text(j.toFixed(2).replace(".", ","));
        });
    } else {
        $('.tabela-vazia').css('display','table-row');
        $('tfoot').hide();
    }
}