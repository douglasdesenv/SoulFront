(function(modTabela){
    'use strict';

    $(document).ready(function(){
        carregaOrdenacao();
    });

    function carregaOrdenacao(){
        $('[data-table-sort]').each(function(){
            $(this).append('<div class="icon-sort"><span></span></div>').on("click", function() {clicarOrdenacao($(this))});   
        });
        modTabela.carregaTabela();
    }

    function clicarOrdenacao($this) {
        sinalizarOrdenacao($this);

        const   colPrimaria = $('.sort-primary-desc, .sort-primary-asce')[0].cellIndex,
                colSecundaria = $('.sort-secondary-desc, .sort-secondary-asce')[0].cellIndex,
                table = $this.closest('table').find('tbody'),
                linhas = table.find('tr').toArray().sort(ordenar(colPrimaria, colSecundaria, $this));
        
        $this.closest('table').find('tbody tr').remove();
        
        $(linhas).each(function(){
            table.append(this);
        });

        modTabela.carregaTabela();

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

    function ordenar(colPrimaria, colSecundaria, $this) {  
        return function(a, b) {
            let aPrimaria = a.children[colPrimaria].innerText,
                bPrimaria = b.children[colPrimaria].innerText, 
                aSecundaria = a.children[colSecundaria].innerText, 
                bSecundaria = b.children[colSecundaria].innerText;

            if(!isNaN(parseFloat(aPrimaria)) && !isNaN(parseFloat(bPrimaria))){
                aPrimaria = convert(aPrimaria);
                bPrimaria = convert(bPrimaria);
            }
            if(!isNaN(parseFloat(aSecundaria)) && !isNaN(parseFloat(bSecundaria))){
                aSecundaria = convert(aSecundaria);
                bSecundaria = convert(bSecundaria);
            }
            if (aPrimaria === bPrimaria) {
                if(aSecundaria === bSecundaria) {
                    return 0;
                }
                if ($this.closest('table').find('.sort-secondary-desc').length > 0){
                    return (aSecundaria < bSecundaria) ? -1 : 1;
                } 
                return (aSecundaria < bSecundaria) ? 1 : -1;
            }
            if ($this.hasClass('sort-primary-desc')){
                return (aPrimaria < bPrimaria) ? -1 : 1;
            } 
            return (aPrimaria < bPrimaria) ? 1 : -1;
        }
    }

    function convert(valor){
        return parseFloat(valor.replace('.', '').replace(',', '.'));
    }
    
})(modTabela);

