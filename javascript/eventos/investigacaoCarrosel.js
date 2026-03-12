let currentIndex = 0;

/**
 * Retorna se o ecrã está no formato mobile, tablet ou desktop
 * Se retorna 1 indicando que a plataforma é mobile
 * se retornar 2 indicando que a plataforma é o tablet
 * se retornar 3 indica que a plataforma é desktop
 * @returns 
 */
function getVisibleCount() {
  if (window.innerWidth <= 980) return 1;
  if (window.innerWidth <= 1350) return 2;
  return 3;
}

function updateSlider() {
  const track = document.getElementById('track');
  if (!track) return;

  const cards = track.querySelectorAll('.investigacao-contentor');
  const total = cards.length;
  const visible = getVisibleCount();
  const maxIndex = total - visible;

  if (currentIndex < 0) currentIndex = maxIndex;
  if (currentIndex > maxIndex) currentIndex = 0;

  // Calcula deslocamento com base na largura real do card (inclui margens)
  const card = cards[0];
  const style = window.getComputedStyle(card);
  const cardWidth = card.offsetWidth
    + parseInt(style.marginLeft)
    + parseInt(style.marginRight);

  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

function moveSlide(direction) {
  currentIndex += direction;
  updateSlider();
}

// Recalcula posição ao redimensionar para não ficar desalinhado
window.addEventListener('resize', updateSlider);
 
loadData('utils/data2025.json');
