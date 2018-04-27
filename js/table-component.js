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
                };
                if (select.length > 0){
                    select.on('change', filtrar);
                    
                    let colIndex = i+1;
                    const tdsColuna = tabela.find('tbody td:nth-child('+ colIndex +')');

                    let textosColuna = tdsColuna.map(function(){
                        return $(this).text();
                    }).get();

                    $.unique(textosColuna).map(function(el){
                        select.append("<option value='" + el + "'>" + el + "</option>");
                    });

                };
                if (checkboxGroup.length > 0){
                    //console.log(colFiltro.parent().children().index());
                };
            }
        });
        
    };
    
    function filtrar(){
        const el = $(this);

        if (el.prop('tagName') == "INPUT"){
            console.log('é input')
        };
        if (el.prop('tagName') == "SELECT"){
            console.log(el)
            const opcaoFiltro = el.val();
            
        };
        if (el.hasClass('checkbox-group')){
            console.log('é checkbox-group')
        };
    }

})();