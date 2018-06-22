(function(){
    'use strict';

    $(document).ready(function(){
        carregaOrdenacao();
    });

    function carregaOrdenacao(){
        $('[data-table-sort]').each(function(){
            $(this).append('<div class="icon-sort"></div>').on("click", function() {clicarOrdenacao($(this))});   
        });
    }

    function clicarOrdenacao($this) {
        sinalizarOrdenacao($this);

        const   colPrimaria = $('th[class^="sort-primary"]')[0].cellIndex,
                colSecundaria = $('th[class^="sort-secondary"]')[0].cellIndex,
                table = $this.closest('table').find('tbody'),
                linhas = table.find('tr').toArray().sort(ordenar(colPrimaria, colSecundaria, $this));
        
        $this.closest('table').find('tbody tr').remove();
        
        $(linhas).each(function(){
            table.append(this);
        });

    }

    function ordenar(colPrimaria, colSecundaria, $this) {  
        console.log($this);
        return function(a, b) {
            if (a.children[colPrimaria].innerText === b.children[colPrimaria].innerText) {
                if(a.children[colSecundaria].innerText === b.children[colSecundaria].innerText) {
                    return 0;
                }
                if ($this.closest('table').find('.sort-secondary-desc').length > 0){
                    return (a.children[colSecundaria].innerText < b.children[colSecundaria].innerText) ? -1 : 1;
                } else{
                    return (a.children[colSecundaria].innerText < b.children[colSecundaria].innerText) ? 1 : -1;
                }
            }
            if ($this.hasClass('sort-primary-desc')){
                return (a.children[colPrimaria].innerText < b.children[colPrimaria].innerText) ? -1 : 1;
            } else{
                return (a.children[colPrimaria].innerText < b.children[colPrimaria].innerText) ? 1 : -1;
            }
        }
    }

    function sinalizarOrdenacao($this){
        if ($this.hasClass('sort-primary-desc') || $this.hasClass('sort-primary-asce')){
            $this.toggleClass('sort-primary-desc sort-primary-asce');
        } else{
            $('.sort-secondary-desc, .sort-secondary-asce').removeClass();
            if ($('.sort-primary-desc').length > 0){
                $('.sort-primary-desc').toggleClass('sort-primary-desc sort-secondary-desc');
            } else{
                if ($('.sort-primary-asce').length > 0){
                    $('.sort-primary-asce').toggleClass('sort-primary-asce sort-secondary-asce');
                } 
            }
            $this.addClass('sort-primary-desc');
        }
    }

})();

