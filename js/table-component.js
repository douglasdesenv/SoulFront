(function(){
    'use strict';

    $(document).ready(function(){
        $('[data-table-filter]').each(criaFiltros);
        atualizarGrid();
    });

    function criaFiltros(){
        const tabela = $(this),
        rowFiltros = tabela.find('.filter-row th');
    
        rowFiltros.each(function(i){
            const colFiltro = $(this),
                   inputText = colFiltro.children('input[type="text"]'),
                   select = colFiltro.children('select'),
                   checkboxGroup = colFiltro.children('.checkbox-group');

            if (colFiltro.html() !== ""){
                let cIndex = i+1;
                const filtro = {
                    nome : tabela, 
                    coluna : tabela.find('tbody td:nth-child('+ cIndex +')')
                }
                
                if (inputText.length > 0){
                    inputText.on('keyup', filtro, verificarFiltros);
                } else{

                    let textosColuna = filtro.coluna.map(function(){
                        return $(this).text();
                    }).get();

                    if (select.length > 0){
                        select.on('change', filtro, verificarFiltros);
                        
                        $.unique(textosColuna).map(function(el){
                            select.append("<option value='" + el + "'>" + el + "</option>");
                        });

                    } else {
                        if (checkboxGroup.length > 0){                                
                            checkboxGroup.each(function(){
                                const checkboxList = $(this).children('.checkbox-list');
                                
                                $(this).on('click', function(){
                                    if (checkboxList.is(':hidden')) {
                                        checkboxList.css('display','grid');  
                                    } else {
                                        checkboxList.hide();
                                    }
                                });
    
                                $.unique(textosColuna).map(function(el){
                                    checkboxList.append('<input id="id'+ el +'" type="checkbox"><label for="id'+ el + '">' + el + '</label>');
                                });
                                checkboxList.on('change', filtro, verificarFiltros);
                            })
                        };
                    }
                }          
            }
        });
    };   

    function verificarFiltros(filtro){
        const el = $(this),
        tbl = filtro.data.nome,
        col = filtro.data.coluna;

        tbl.children('tbody').children('tr').show();

        if ((el.prop('type') == 'select-one' && el.children('option:selected').index() != 0)
        || (el.hasClass('checkbox-list') && el.find('input[type="checkbox"]:checked').length > 0)
        || (el.prop('type') == 'text' && el.val() !== '')) {
            el.addClass('filtered');
        } else {
            el.removeClass('filtered');
        }
     
        filtrar();     
    }

    function filtrar(){

        $('.filtered').each(function(){
            const el = $(this);
            let filtros = '';
            if (el.hasClass('checkbox-list')){
                el.find('input[type="checkbox"]:checked').each(function(){
                    filtros +=  ':not(:contains("' + this.nextSibling.innerText + '"))';
                });
            } else {
                filtros =  ':not(:contains(' + el.val() + '))';  
            }
            localizarCol(el).filter(filtros).parent('tr').hide();
        });

        criaFiltros();
        atualizarGrid();
    }

    function atualizarGrid(){
        const   colIndex = $('[data-table-col="index"]'),
                colTotal = $('[data-table-col="total"]');
        let     i = 1;
        
        if (colIndex.length > 0){
            localizarCol(colIndex).each(function(){
                $(this).text(i++);
            });
        };

        if (colTotal.length > 0){
            let total = 0;
            colTotal.each(function(){ 
                localizarCol($(this)).each(function(){
                    total = total + parseFloat($(this).text().replace(",", "."));
                });

            });
            console.log(total.toFixed(2).replace(".", ","));
            //$('.' + this[0].className + '-total').text(j.toFixed(2).replace(".", ","));
        };
    }

    function localizarCol(el){
        if (el.not('th')){
            el = el.closest('th');
        }
        return (el.closest('table').find('tbody td:nth-child('+ (el[0].cellIndex + 1) +')').filter(':visible'));
    }

})();

