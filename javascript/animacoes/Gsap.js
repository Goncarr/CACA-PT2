const sections = document.querySelectorAll('.missao, .objetivo, .investigacao-main, .slideshow-container, .conquistas');

gsap.registerPlugin(ScrollTrigger);

gsap.set(sections, { autoAlpha: 0 });

sections.forEach((section, index) => {
  gsap.to(section, {autoAlpha: 1,
    scrollTrigger: {
      trigger: section,
      start: 'top bottom-=100',
      toggleActions: 'play none none reverse',
    }
  });
  
  ScrollTrigger.create({
    trigger: section,
    id: index+1,
    start: 'top center',
    end: () => `+=${section.clientHeight + 30}`,
    toggleActions: 'play reverse none reverse',
    toggleClass: {targets: section, className: "is-active"},
  })
})