(function(){
    'use strict';

    $(document).ready(function(){
        $('[data-table-filter]').each(criaFiltros);
    });

    function criaFiltros(){
        const tabela = $(this),
        rowFiltros = tabela.find('.filter-row th');
    
        rowFiltros.each(function(){
            const colFiltro = $(this),
                   inputText = colFiltro.children('input[type="text"]'),
                   select = colFiltro.children('input[type="text"]'),
                   checkboxGroup = colFiltro.children('input[type="text"]');

            if (colFiltro.html() !== ""){
                if (inputText.length > 0){
                    colFiltro.on('keyup', filtrar);
                    //console.log(colFiltro.parent().children().index());
                };
                if (select.length > 0){
                    select.on('change', filtrar);
                    // tabela.find('tbody tr').each(function(){
                    //     const dado = $(this).children('td').eq(select.parent()[0].cellIndex).text();
                    //     select.append("<option value='" + dado + "'>" + dado + "</option>");
                    // })
                    
                    // select.map(function(){
                    //     const txtColuna = $(this).children('td').eq(select.parent()[0].cellIndex).text();
                        
                    //     if (select.find(':contains(' + txtColuna + ')').length === 0){
                    //         select.append("<span class='filtro-situacao'><input id='id"+ txtColuna +"' type='checkbox'><label for='id"+ txtColuna +"'>"+ txtColuna +"</label></span>");
                    //     }   
                    // });

                };
                if (checkboxGroup.length > 0){
                    //console.log(colFiltro.parent().children().index());
                };
            }
        });
        
    };

    function filtrar(){
        console.log('filtrando!');
    }

})();