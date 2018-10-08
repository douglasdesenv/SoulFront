(function(){
    'use strict';

    $(document).ready(function(){
        carregaExpansao();
    });

    function carregaExpansao(){
        $('[data-table-expansion]').each(function(){
            criarExpansao($(this));   
        });
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

        
        table.find('thead tr, tfoot tr').append('<th></th>').find('tfoot tr').append('<td></td>');

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

            $(this).append('<td class="col-btn-expansion"><span class="btn-expansion"></span></td>')
            $(this).after( "<tr class='row-expansion'><td colspan=" + (table.children('thead').children('tr').children('th').length - colExpansion.length)  + ">" + contentExpansion + "</td></tr>");

        }); 

        $('.btn-expansion').off('click').on('click', function(e){
            $(e.target).closest('tr').next('.row-expansion').toggle();
            $(e.target).toggleClass('btn-expansion-active');
        });

        $('.row-expansion').toggle();

        colExpansion.each(function(){
            let colIndice = this.cellIndex + 1;
            table.children('tbody, thead, tfoot').children('tr').children('td:nth-child('+ colIndice + '), th:nth-child('+ colIndice + ') ').hide();
        });

    }

})();

