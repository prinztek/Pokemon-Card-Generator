const hideSection = document.querySelector(".home-section");
const aboutSection = document.querySelector(".about-section");
const btnAbout = document.querySelector(".about-nav-link");

const hidePokemonCardGeneratorSection = () => {
  hideSection.style.display = "none";
  aboutSection.style.display = "block";
};

btnAbout.addEventListener("click", hidePokemonCardGeneratorSection);
