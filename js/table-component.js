(function(){
    'use strict';

    $(document).ready(function(){
        $('[data-table-filter]').each(criaFiltros);
    });

    function criaFiltros(){
        const   el = $(this),
                coluna = el.find('.filter-row th');
        
        coluna.each(function(){
            console.log(this);
        });
        

    };


})();