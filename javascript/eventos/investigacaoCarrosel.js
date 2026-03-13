let currentIndex = 0;

/**
 * Retorna o número de slides que devem ser visiveis
 *  retorna 1  se a plataforma é mobile
 *  retorna 2  se a plataforma é o tablet
 *  retorna 3  se a plataforma é desktop
 * @returns 
 */
function getVisibleCount() {
  if (window.innerWidth <= 980) return 1;
  if (window.innerWidth <= 1350) return 2;
  return 3;
}

/**
 * Atualiza os slides
 */
function updateSlider() {
  const track = document.getElementById('track');

  const cards = track.querySelectorAll('.investigacao-contentor');
  const total = cards.length;
  const visible = getVisibleCount();
  const maxIndex = total - visible;

  if (currentIndex < 0) currentIndex = maxIndex;
  if (currentIndex > maxIndex) currentIndex = 0;

  const card = cards[0];
  const style = window.getComputedStyle(card);
  const cardWidth = card.offsetWidth
    + parseInt(style.marginLeft)
    + parseInt(style.marginRight);

  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

/**
 * indica par mover para a esquerda ou direita
 * @param {} direction 
 */
function moveSlide(direction) {
  currentIndex += direction;
  updateSlider();
}

window.addEventListener('resize', updateSlider); 


