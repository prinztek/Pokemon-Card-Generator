import toUpperCase from "./toUpperCase.js";
import fetchPokemonData from "./fetchPokemonData.js";
import changePokemonImage from "./changePokemonImage.js";
import changePokemonType from "./changePokemonType.js";
import changePokemonStats from "./changePokemonStats.js";

const paginationCardsSection = document.querySelector(".pagination-cards");
const paginationBtnSection = document.querySelector(".pagination-btn");

/* function that accept an array pokemonDataArray => returns template string of card */
const createPokemonCard = (name, type1, type2) => {
  return `
  <div class="card">
  <div class="card-inner">
    <!-- card__face -->
    <div class="pokemon-card pokemon-card--front">
      <div class="pokemon-image-container">
        <img class="pokemon-img" src="../Images/6.png" alt="pokemon" />
        <div class="spinner" id="spinner"></div>
      </div>
      <div class="pokemon-info">
        <h3 class="pokemon-name">${name}</h3>
        <p class="pokemon-types">
        <span class="pokemon-type">${toUpperCase(type1)}</span>
        ${
          type2
            ? `<span class="pokemon-type2">${toUpperCase(type2)}</span>`
            : ""
        }
        </p>
      </div>
    </div>
    <!-- card__back -->
    <div class="pokemon-card pokemon-card--back">
      <h3>Stats</h3>
      <ul class="pokemon-stats">
        <li>Hp 78</li>
        <li>Attack 84</li>
        <li>Defense 78</li>
        <li>Sp. Atk 109</li>
        <li>Sp. Def 85</li>
        <li>Speed 100</li>
      </ul>
    </div>
  </div>
</div>`;
};

const populatePokemonCards = async () => {
  let pokemonDataCount = 10;
  const pokemonDataArray = [];
  /* Get Pokemon Data */
  for (let i = 1; i <= pokemonDataCount; i++) {
    const pokemonDataawait = await fetchPokemonData(i);
    pokemonDataArray.push(pokemonDataawait);
  }
  /* Update elements */
  for (let i = 0; i < pokemonDataArray.length; i++) {
    const pokemonData = pokemonDataArray[i];
    /* update the pokemon name */
    const pokemonName = toUpperCase(pokemonData.name);
    /* update the pokemon types */
    const type = pokemonData.types[0].type.name;
    const type2 = pokemonData.types[1] ? pokemonData.types[1].type.name : null;
    paginationCardsSection.innerHTML += createPokemonCard(
      pokemonName,
      type,
      type2
    );
    /* update the pokemon image */
    const pokemonImage = document.querySelectorAll(".pokemon-img")[i];
    const newPokemonImage =
      pokemonData.sprites.other["official-artwork"].front_default;
    const updatePokemonImage = changePokemonImage(
      pokemonImage,
      newPokemonImage
    );
    /* update color and type */
    const pokemonCard = document.querySelectorAll(".pokemon-card--front")[i];
    const pokemonCardBack = document.querySelectorAll(".pokemon-card--back")[i];
    const pokemonTypeParagraph = document.querySelectorAll(".pokemon-types")[i];
    const pokemonTypeArray = pokemonData.types;
    changePokemonType(
      pokemonTypeArray,
      pokemonTypeParagraph,
      pokemonCard,
      pokemonCardBack
    );
    // if (type2 != null) {
    //   pokemonCard.style.backgroundImage = `linear-gradient(to bottom, #333333, ${changePokemonBackgroundColor(
    //     type
    //   )})`;
    //   pokemonCardBack.style.backgroundImage = `linear-gradient(to bottom, #333333, ${changePokemonBackgroundColor(
    //     type
    //   )})`;
    // } else {
    //   /* Change Color */
    //   pokemonCard.style.backgroundImage = "none";
    //   pokemonCard.style.backgroundColor = `${changePokemonBackgroundColor(
    //     type
    //   )}`;
    //   pokemonCardBack.style.backgroundImage = "none";
    //   pokemonCardBack.style.backgroundColor = `${changePokemonBackgroundColor(
    //     type
    //   )}`;
    // }
    /* update Stats */
    const pokemonCardStats = document.querySelectorAll(".pokemon-stats")[i];
    const pokemonStatsArray = pokemonData.stats;
    changePokemonStats(pokemonStatsArray, pokemonCardStats);
  }
  /* Card Flip to view stats */
  const cardList = document.querySelectorAll(".card-inner");
  cardList.forEach((card) => {
    card.addEventListener("click", function (e) {
      card.classList.toggle("is-flipped");
    });
  });
};

populatePokemonCards();
/* TO DO LIST */

/* add working pagination */

/* update Stats */

/* 
fucntion that creates a pokemon Card (using a template string)
accepts parameter of (pokemon name, type, stats, official-artwork(pokemon image))
*/

/* wrapper function decide how many times the create pokemon Card is called */
