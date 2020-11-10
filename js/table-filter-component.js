(function(modTabela){
    'use strict';

    $(document).ready(function(){
        carregaFiltro();
    });

    function carregaFiltro(){
        $('[data-table-filter]').each(criarFiltros);
        modTabela.carregaTabela();
    }

    function criarFiltros(){
        const tabela = $(this),
        filtros = tabela.find('.filter-row th').children(':not(.filtered)');
    
        filtros.each(function(){
            const filtro = $(this);
    
            if (filtro.prop('type') == 'text'){
                filtro.off().on('keyup', verificarFiltros);
            } else{

                let textosColuna = $.unique(modTabela.localizarCol(filtro).map(function(){
                    if ($(this).text() != ''){
                        return $(this).text();
                    }
                }).sort()).get();

                if (filtro.prop('type') == 'select-one'){
                    
                    filtro.off().on('change', verificarFiltros);
                    filtro.empty().append("<option value='Todos'>All</option>");
                    
                    textosColuna.map(function(el){
                        filtro.append("<option value='" + el + "'>" + el + "</option>");
                    });

                } else {
                    if (filtro.hasClass('checkbox-group')){                                
                       
                        const checkboxList = filtro.children('.checkbox-list');
                        
                        $('.select-style').off('click').on('click', function(){
                            if (checkboxList.is(':hidden')) {
                                checkboxList.css('display','grid');
                                $(document).off('click').on('click', function(e){
                                    if ((checkboxList.is(':visible')) && ($(e.target).closest('.checkbox-group').length == 0)) {
                                        checkboxList.hide();
                                    }
                                });
                            } else {
                                checkboxList.hide();
                            }
                        });

                        checkboxList.parent(':not(.filtered)').children(checkboxList).empty();

                        textosColuna.map(function(el){
                            checkboxList.append('<input id="id'+ el +'" type="checkbox"><label for="id'+ el + '">' + el + '</label>');
                        });

                        checkboxList.off().on('change', verificarFiltros);
                    };
                }
            }          
        });
    };   

    function verificarFiltros(){
        const filtro = $(this),
        tabela = filtro.closest('table');

        tabela.children('tbody').children('tr').show();

        if(filtro.prop('type') == 'select-one' || filtro.prop('type') == 'text'){
            if(filtro.children('option:selected').index() != 0 || (filtro.prop('type') == 'text' && filtro.val() !== '')){
                filtro.addClass('filtered');
            } else{
                filtro.removeClass('filtered');
            }
        } else{
            if (filtro.parent().hasClass('checkbox-group')){
                if(filtro.find('input[type="checkbox"]:checked').length > 0){
                    filtro.parent().addClass('filtered');
                } else{
                    filtro.parent().removeClass('filtered');
                }
            } 
        }

        filtrar(tabela);     
    }

    function filtrar(tabela){

        $('.filtered').each(function(){
            const filtro = $(this);
            var filtros = [];
            if (filtro.children('.checkbox-list').length > 0){
                filtro.find('input[type="checkbox"]:checked').each(function(){
                    filtros.push(this.nextSibling.innerText );
                });
            } else {
                filtros.push(filtro.val());  
            }

            modTabela.localizarCol(filtro).filter(function() {
                var textCell = $(this).text();
                var termosEncontrados = filtros.filter(function(termoFiltrado){
                    var reg = new RegExp(termoFiltrado.trim(), "i");
                    return reg.test(textCell);
                });
                return termosEncontrados.length == 0;
            }).parent('tr').hide();
        });
        
        if (tabela.find('tbody tr:visible').length <= 0){
            tabela.append('<div class="tbl-empty">Nenhum resultado encontrado.</>').find('tfoot').hide();
        } else{
            tabela.each(criarFiltros).find('tfoot').show();
            $('.tbl-empty').remove();
            modTabela.carregaTabela();
        }    
    }

})(modTabela);

