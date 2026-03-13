const sections = document.querySelectorAll('.missao, .objetivo, .investigacao-main, .slideshow-container, .conquistas');

//
gsap.registerPlugin(ScrollTrigger);

//Cada secção fica com alpha zero, ficando invisiveis
gsap.set(sections, { autoAlpha: 0 });

/**
 * O alpha é alterado para 1 quando chega à secção, ficando visivel para o utilizador
 * Caso seja feito scroll para cima, volta a desaparecer
 */
sections.forEach((section) => {
  gsap.to(section, {autoAlpha: 1,
    scrollTrigger: {
      trigger: section,
      start: 'top bottom-=100',
      toggleActions: 'play none none reverse',
    }
  });

})