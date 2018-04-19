(function(){
    'use strict';

    $(document).ready(function(){
        $('.select-chk').on('click', criaSelectCheck);
        $('.filter-row select, .dropdown-situacao-content').each(function(){
            criaFiltros(this);
            $(this).on('change', filtrar);
        });
        $('.filtro-pedido, .filtro-cupom').on('keyup', filtrar);
    
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

    function criaFiltros(el){
        if (el.tagName == 'SELECT') {
            $('.col-' + el.className).map(function(){
                const txtColuna = $(this).text();
                if ($(el).children('option:contains('+ txtColuna +')').length === 0){
                    $(el).append("<option value='" + txtColuna + "'>" + txtColuna + "</option>");
                }     
            });
        } 
        if ($(el).hasClass('dropdown-situacao-content')) {
            $('.col-filtro-situacao').map(function(){
                const txtColuna = $(this).text();
                
                if ($(el).find(':contains(' + txtColuna + ')').length === 0){
                    $(el).append("<span class='filtro-situacao'><input id='id"+ txtColuna +"' type='checkbox'><label for='id"+ txtColuna +"'>"+ txtColuna +"</label></span>");
                }   
            });
        }
    }

    function filtrar(){
        let filtrosAtivos = [];
        
        $('.filter-row select').each(function(){
            if ($(this).children('option:selected').val() != $(this).children('option').eq(0).val()){
                filtrosAtivos.push($(this));
            }
        });
        
        $('.filter-row input[type="text"]').each(function(){
            if ($(this).val() !== ''){
                filtrosAtivos.push($(this));
            }
        });
        
        $('.dropdown-situacao-content').each(function(){
            if ($(this).find('input[type="checkbox"]:checked').length > 0){
                filtrosAtivos.push($(this));
            }
        });
        
        $('tbody tr').show();
        
        $(filtrosAtivos).each(function(){
            
            if ($(this).prop('type') == 'select-one') {
            $('.col-' + $(this).prop('className') + ':not(:contains(' + $(this).val() + '))').parent('tr').hide();
            }
            
            if ($(this).hasClass('dropdown-situacao-content')) {
                let filtros = '';
                $(this).find('input[type="checkbox"]:checked').each(function(){
                    filtros +=  ':not(:contains(' + $(this).parent().text() + '))';
                }); 
                $('.col-filtro-situacao'+  filtros).parent('tr').hide();
            }
            
            if ($(this).prop('type') == 'text') {
            $('.col-' + $(this).prop('className') + ':not(:contains(' + $(this).val() + '))').parent('tr').hide();
            }
        
        }); 
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
            
            $([$('.col-compra'), $('.col-frete'), $('.col-desconto'), $('.col-subtotal')]).each(function(){
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

})();