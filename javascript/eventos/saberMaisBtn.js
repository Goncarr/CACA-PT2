const btnInvestigacao = document.querySelectorAll('button[name="investigacaoBotao"]');

btnInvestigacao.forEach((btn) => {
    btn.addEventListener("click", function() {
        const contentor = this.closest('.investigacao-contentor');
        const saberMais = contentor.querySelector(".saberTexto");
        if (saberMais.style.display === "block") {
            saberMais.style.display = "none";
            this.textContent = "Saber Mais";
        } else {
            saberMais.style.display = "block";
            this.textContent = "Fechar";
        }
    });
});