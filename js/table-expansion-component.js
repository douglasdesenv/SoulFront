(function(modTabela){
    'use strict';

    $(document).ready(function(){
        carregaExpansao();
    });

    function carregaExpansao(){
        $('[data-table-expansion]').each(function(){
            criarExpansao($(this));   
        });
        modTabela.carregaTabela();
    }

    function criarExpansao(table){
        const   rows = table.find('tbody tr'),
                colExpansion = table.find('tr th[data-table-expansion-content]'),
                tableExpansion = table.find('tbody tr').map(function(){
                    const row = $(this); 
                    return colExpansion.map(function(){
                        return row.find('td')[this.cellIndex];
                    })
                });


        rows.each(function(i){
            let contentExpansion = "";

            if (table.data('table-expansion') === 'subtable'){
                contentExpansion = "<table class='subtable-content'><tr>" + 
                colExpansion.map(function(){
                    return this.outerHTML;
                }).get().join("") + "</tr><tr>" + 
                tableExpansion.eq(i).map(function(){
                    return $(this).map(function(){
                        return this.outerHTML;
                    }).get();
                }).get().join("") + "</tr></table>";
            } 
            
            $(this).after( "<tr><td colspan=" + table.find('th').length + ">" + contentExpansion + "</td></tr>");
            
        });

        colExpansion.each(function(){
           // $(this).closest('table:not(.subtable-content)').find('td:nth-child('+ (this.cellIndex + 1) +'), th:nth-child('+ (this.cellIndex + 1) +')').hide();
           //$(this).closest('table').find(('td:nth-child('+ (this.cellIndex + 1) +')').closest('.subtable-content')).hide();
        });

    }



})(modTabela);

