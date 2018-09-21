(function(modTabela){
    'use strict';

    $(document).ready(function(){
        carregaCustomizacao();
    });

    function carregaCustomizacao(){
        $('[data-table-custom]').each(function(){
            $(this).on("click", function() {clicarMenuColunas($(this))});   
        });
        modTabela.carregaTabela();
    }

    function clicarMenuColunas(el){
        const   tabela = el.closest('table'),
                titleRow = tabela.find('.title-row th');
                console.log(titleRow);

                titleRow.each(function(){
                    let $this = $(this);
                    $('.menu-column').append('<input id="id'+ $this.text() +'" type="checkbox"><label for="id'+ $this.text() + '">' + $this.text() + '</label>');
                });
        
        console.log(titleRow);
        console.log(tabela);
    }

})(modTabela);

