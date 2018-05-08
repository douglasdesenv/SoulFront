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
                    
                    checkboxGroup.each(function(){
                        $(this).on('click', function(){
                            if (checkboxList.is(':hidden')) {
                                checkboxList.css('display','grid');  
                            } else {
                                checkboxList.hide();
                            }
                        });

                        const checkboxList = $(this).children('.checkbox-list');

                        let colIndex1 = i+1;
                        const tdsColuna1 = tabela.find('tbody td:nth-child('+ colIndex1 +')');
                        
                        let textosColuna1 = tdsColuna1.map(function(){
                            return $(this).text();
                        }).get();

                        $.unique(textosColuna1).map(function(el){
                            checkboxList.append('<input id="id'+ el +'" type="checkbox"><label for="id'+ el + '">' + el + '</label>');
                        });
  
                    })
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