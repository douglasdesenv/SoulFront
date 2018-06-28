const modTabela = (function(){
    'use strict';

    function carregaTabela(){
        criarIndice();
        criarTotal();
    }

    function criarIndice(){
        const   colIndex = $('[data-table-col="index"]');
        let     i = 1;
        
        if (colIndex.length > 0){
            localizarCol(colIndex).each(function(){
                $(this).text(i++);
            });
        };
    }

    function criarTotal(){
        const   colTotal = $('[data-table-col="total"]');

        if (colTotal.length > 0){
            let total = 0;
            colTotal.each(function(){ 
                localizarCol($(this)).each(function(){
                    total = total + parseFloat($(this).text().replace(",", "."));
                });
                $(this).closest('table').find('tfoot td:nth-child('+ (this.cellIndex + 1) +')').text(total.toFixed(2).replace(".", ","));
            });
        };
    }

    function localizarCol(el){
        if (el.not('th')){
            el = el.closest('th');
        }
        return (el.closest('table').find('tbody td:nth-child('+ (el[0].cellIndex + 1) +')').filter(':visible'));
    }

    return {carregaTabela, localizarCol};

})();

