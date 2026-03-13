const btnInvestigacao = document.querySelectorAll('button[name="investigacaoBotao"]');

/***
 * Altera o botao de "saber mais" para mostra ou esconder texto
 */
btnInvestigacao.forEach((btn) => {
    btn.addEventListener("click", function() {
        const contentor = this.closest('.investigacao-contentor');
        const saberMaisTexto = contentor.querySelector(".saberTexto");
        if (saberMaisTexto.style.display === "block") {
            saberMaisTexto.style.display = "none";
            this.textContent = "Saber Mais";
        } else {
            saberMaisTexto.style.display = "block";
            this.textContent = "Fechar";
        }
    });
});