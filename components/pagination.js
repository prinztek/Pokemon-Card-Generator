import toUpperCase from "./toUpperCase.js";
import fetchPokemonData from "./fetchPokemonData.js";
import changePokemonImage from "./changePokemonImage.js";
import changePokemonType from "./changePokemonType.js";
import changePokemonStats from "./changePokemonStats.js";
import changePokemonBackgroundColor from "./changePokemonBackgroundColor.js";

const paginationCardsSection = document.querySelector(".pagination-cards");

const pokemonDataArray = [];
let itemsPerPage = 10;
let currentPage = 1;

const getPokemonData = async () => {
  let pokemonDataCount = 50;
  /* Get Pokemon Data */
  for (let i = 1; i <= pokemonDataCount; i++) {
    const pokemonData = await fetchPokemonData(i);
    pokemonDataArray.push(pokemonData);
  }
};

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

const updatePokemonCard = () => {
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

const populatePokemonCards = async () => {
  await getPokemonData();

  // pagination
  const indexOfLastPage = currentPage * itemsPerPage;
  const indexOfFirstPage = indexOfLastPage - itemsPerPage;
  const currentItmes = pokemonDataArray.slice(
    indexOfFirstPage,
    indexOfLastPage
  );

  let cardHTML = "";
  for (let i = 0; i < currentItmes.length; i++) {
    const pokemon = currentItmes[i];
    /* update pokemon name */
    const name = toUpperCase(pokemon.name);
    /* update pokemon types */
    const type = pokemon.types[0].type.name;
    const type2 = pokemon.types[1] ? pokemon.types[1].type.name : null;
    const type2HTML = type2
      ? `<span class="pokemon-type2">${toUpperCase(
          pokemon.types[1].type.name
        )}</span>`
      : "";
    /* update pokemon card color */
    const typeArray = pokemon.types;
    let backgroundImage;
    let backgroundColor;
    if (typeArray.length > 1) {
      // change background-image: gradient(dark-color, color-according-type)
      // `linear-gradient(to bottom, #505050, ${changePokemonBackgroundColor(type)})`;
      backgroundImage = `linear-gradient(to bottom, #505050, ${changePokemonBackgroundColor(
        type
      )})`;
      backgroundColor = "none";
    } else {
      backgroundImage = "none";
      backgroundColor = `${changePokemonBackgroundColor(type)}`;
    }
    /* update pokemon card image */
    const newPokemonImage =
      pokemon.sprites.other["official-artwork"].front_default;
    /* update pokemon card stats */
    let statsHTML = "";
    const pokemonStats = pokemon.stats;
    for (let i = 0; i < pokemonStats.length; i++) {
      if (pokemonStats[i].stat.name === "special-attack") {
        statsHTML += `<li>Sp. Atk ${pokemonStats[i].base_stat}</li>`;
      } else if (pokemonStats[i].stat.name === "special-defense") {
        statsHTML += `<li>Sp. Def ${pokemonStats[i].base_stat}</li>`;
      } else {
        statsHTML += `<li>${toUpperCase(pokemonStats[i].stat.name)} ${
          pokemonStats[i].base_stat
        }</li>`;
      }
    }
    const pokemonCardHTML = `
      <div class="card">
        <div class="card-inner">
          <!-- card__face -->
          <div class="pokemon-card pokemon-card--front" style="background-image: ${backgroundImage}; background-color: ${backgroundColor};">
            <div class="pokemon-image-container">
              <img class="pokemon-img" src=${newPokemonImage} alt="pokemon" />
              <div class="spinner" id="spinner"></div>
            </div>
            <div class="pokemon-info">
              <h3 class="pokemon-name">${name}</h3>
              <p class="pokemon-types">
              <span class="pokemon-type">${toUpperCase(type)}</span>
              ${type2HTML}
              </p>
            </div>
          </div>
          <!-- card__back -->
          <div class="pokemon-card pokemon-card--back" style="background-image: ${backgroundImage}; background-color: ${backgroundColor};">
            <h3>Stats</h3>
            <ul class="pokemon-stats">
              ${statsHTML}
            </ul>
          </div>
        </div>
      </div>`;
    cardHTML += pokemonCardHTML;
  }
  paginationCardsSection.innerHTML = cardHTML;
  /* change color */
  /* flip card */
  const cardList = document.querySelectorAll(".card-inner");
  cardList.forEach((card) => {
    card.addEventListener("click", function (e) {
      card.classList.toggle("is-flipped");
    });
  });
};

populatePokemonCards();

const prevBtn = () => {
  if ((currentPage - 1) * itemsPerPage) {
    currentPage--;
    populatePokemonCards();
  }
};

const nextBtn = () => {
  if (
    (currentPage * itemsPerPage) / pokemonDataArray.length &&
    currentPage != 5
  ) {
    currentPage++;
    populatePokemonCards();
  }
};

const prevButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");

prevButton.addEventListener("click", prevBtn, false);
nextButton.addEventListener("click", nextBtn, false);
/* TO DO LIST */

/* add working pagination */

/* 
const body = document.getElementById("app");
const pokemonDataArray = [];

let itemsPerPage = 8;
let currentPage = 1;

async function getPokemonData() {
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
  for (let i = 1; i <= 40; i++) {
    const response = await fetch(`${apiUrl}${i}`);
    const pokemonData = await response.json();
    pokemonDataArray.push(pokemonData);
  }
}

async function displayCards() {
  await getPokemonData();
  // console.log(pokemonDataArray);

  // pagination
  const pages = [];
  for (let i = 0; i <= Math.ceil(pokemonDataArray.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastPage = currentPage * itemsPerPage;
  const indexOfFirstPage = indexOfLastPage - itemsPerPage;
  const currentItmes = pokemonDataArray.slice(
    indexOfFirstPage,
    indexOfLastPage
  );

  const pokemonCardContainer = document.createElement("div"); // store pokemon cards inside a grid
  pokemonCardContainer.classList.add("grid");

  document.getElementById("app").innerHTML = currentItmes
    .map(
      (pokemon) =>
        `<div class="center-vertical grid">
        <div class="pokemon-card center-vertical">
        <p>${pokemon.forms[0].name}</p>
        <img src=${
          pokemon.sprites.other["official-artwork"].front_default
        } style="width: 300px;">
        <ul class="list-center">
          ${displayPokemonType(pokemon.types)}
          </ul>
        </div>
        </div>`
    )
    .join("");

  function displayPokemonType(array) {
    if (array.length > 1) {
      const firstType = `<li>${array[0].type.name}</li>`;
      const secondType = `<li>${array[1].type.name}</li>`;
      return `${firstType}${secondType}`;
    } else {
      const firstType = `<li>${array[0].type.name}</li>`;
      return `${firstType}`;
    }
  }
}

displayCards();

const prevBtn = () => {
  if ((currentPage - 1) * itemsPerPage) {
    currentPage--;
    displayCards();
  }
};

const nextBtn = () => {
  if ((currentPage * itemsPerPage) / pokemonDataArray.length) {
    currentPage++;
    displayCards();
  }
};

document.getElementById("prev-btn").addEventListener("click", prevBtn, false);
document.getElementById("next-btn").addEventListener("click", nextBtn, false);

*/
