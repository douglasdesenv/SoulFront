(function(){
    'use strict';

    $(document).ready(function(){
        $('[data-table-filter]').each(criaFiltros);
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
                if (inputText.length > 0){
                    inputText.on('keyup', filtrar);

                } else{
                    let colIndex = i+1;
                    const tdsColuna = tabela.find('tbody td:nth-child('+ colIndex +')');

                    let textosColuna = tdsColuna.map(function(){
                        return $(this).text();
                    }).get();

                    if (select.length > 0){
                        select.on('change', filtrar);
                        
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
                                checkboxList.children('input[type="checkbox"]').on('change', filtrar);
                            })
                        };
                    }
                }          
            }
        });
    };   

    function filtrar(){
        const el = $(this);
        console.log(el);
        if (el.prop('type') == "text"){
            console.log(tdsColuna);
            //$(':not(:contains(' + $(this).val() + '))').parent('tr').hide();
        } else{
            if (el.prop('type') == "select-one"){
                console.log('é select')
            } else {
                if (el.prop('type') == "checkbox"){
                    console.log('é checkbox')
                };
            }
        };  
    }

})();