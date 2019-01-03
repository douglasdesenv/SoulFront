(function(modTabela){
    'use strict';

    $(document).ready(function(){
        carregaCustomizacao();
    });

    function carregaCustomizacao(){
        $('[data-table-custom]').each(function(){
            clicarMenuColunas($(this));   
        });
        modTabela.carregaTabela();
    }

    function clicarMenuColunas(el){
        const   table = $(el.data('table-custom')),
                menuColumn = el.next('.menu-column'),
                titleRow = table.find('tr th:not([data-table-custom-col="desindexed"])');
                

        titleRow.each(function(){
            const $this = $(this),
            index = $this[0].cellIndex + 1;
            
            $('.menu-column').append('<input id="idColumn'+ index +'" type="checkbox" checked><label for="idColumn'+ index + '">' + $this.text() + '</label>');
            
            const checkBox = $("#idColumn" + index);
            
            checkBox.on("change", function() { 
                $this.closest('table').find('td:nth-child('+ index +'), th:nth-child('+ index +')').toggle();      
            }); 

            if ($this.data('table-custom-col') === 'hidden'){
                checkBox.change().removeAttr('checked');
            }
        });

        if (table.is('[data-table-custom-fixed]')) {
            table.css('min-width', table.outerWidth());
        };

        $('.btn-column').off('click').on('click', function(){
            if (menuColumn.is(':hidden')) {
                menuColumn.css('display','grid');
                $(document).off('click').on('click', function(e){
                    if ((menuColumn.is(':visible')) && ($(e.target).closest('.column-choice-group').length == 0)) {
                        menuColumn.hide();
                    }
                });
            } else {
                menuColumn.hide();
            }
        });
    }

})(modTabela);

