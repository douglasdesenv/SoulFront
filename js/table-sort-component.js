(function(){
    'use strict';

    $(document).ready(function(){
        carregaOrdenacao();
    });

    function carregaOrdenacao(){
        $('[data-table-sort]').each(criarOrdenacao);
        criarOrdenacao();
    }

    function criarOrdenacao(){
        const el = $(this);
        el.append('<div class="icon-sort"></div>')
    }
})();

