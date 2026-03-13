const scrollbutton = document.querySelector(".scroll-to-top");

/**
 * Verifica se o botão de scroll to top deve ser visivel ou nao
 * Se tiver a uma distancia inferir a 150 do top, o botão nao aparece
 * Caso contrário o botão será visivel para o utilizador
 */
const refreshbuttonVisibility = () => {
  if (document.documentElement.scrollTop <= 150) {
    scrollbutton.style.display = "none";
  } else {
    scrollbutton.style.display = "block";
  }
};

refreshbuttonVisibility();

/*Volta para o topo da janela quando o utilizador clicar no botão*/
scrollbutton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/** Irá chamar a funçao "refreshbuttonVisibility() quando o
 *  utilizador fizer a funcao de scroll" */
document.addEventListener("scroll", () => {
  refreshbuttonVisibility();
});