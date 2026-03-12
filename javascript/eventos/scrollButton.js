const scrollbutton = document.querySelector(".scroll-to-top");

const refreshbuttonVisibility = () => {
  if (document.documentElement.scrollTop <= 150) {
    scrollbutton.style.display = "none";
  } else {
    scrollbutton.style.display = "block";
  }
};

refreshbuttonVisibility();

scrollbutton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

document.addEventListener("scroll", () => {
  refreshbuttonVisibility();
});