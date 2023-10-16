import toUpperCase from "./toUpperCase.js";
import fetchPokemonData from "./fetchPokemonData.js";
import changePokemonImage from "./changePokemonImage.js";
import changePokemonBackgroundColor from "./changePokemonBackgroundColor.js";

const btnGenerate = document.querySelector("#generate-btn");
const btnSave = document.querySelector("#save-img-btn");

const spinner = document.querySelector("#spinner");

const card = document.querySelector(".card-inner");
const image = document.querySelector(".pokemon-img");

const defaultPokemonCard = document.querySelector(".pokemon-card--front");
const defaultPokemonCardBack = document.querySelector(".pokemon-card--back");

const randomNumberGenerator = () => {
  let randomNumber = Math.floor(Math.random() * 1001);
  return randomNumber;
};

/* const fetchPokemonData = async (number) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for Pokémon #${number}`);
    }
    const pokemonData = await response.json();
    return pokemonData;
  } catch (error) {
    console.error("An error occurred while fetching Pokémon data:", error);
    throw error; // Re-throw the error to propagate it up the call stack, if needed.
  }
}; */

/* const changePokemonImage = (pokemonImage, pokemonImageSrc) => {
  pokemonImage.src = `${pokemonImageSrc}`;
}; */

const changePokemonStats = (pokemonData) => {
  const defaultPokemonCardStats = document.querySelector(".pokemon-stats");
  const pokemonStats = pokemonData.stats;
  let pokemonStatsHtml = "";
  for (let i = 0; i < pokemonStats.length; i++) {
    if (pokemonStats[i].stat.name === "special-attack") {
      pokemonStatsHtml += `<li>Sp. Atk ${pokemonStats[i].base_stat}</li>`;
    } else if (pokemonStats[i].stat.name === "special-defense") {
      pokemonStatsHtml += `<li>Sp. Def ${pokemonStats[i].base_stat}</li>`;
    } else {
      pokemonStatsHtml += `<li>${toUpperCase(pokemonStats[i].stat.name)} ${
        pokemonStats[i].base_stat
      }</li>`;
    }
  }
  defaultPokemonCardStats.innerHTML = pokemonStatsHtml;
};

const changePokemonInfo = (pokemonData) => {
  // Change the pokemon name to Sentence Case
  const pokemonNameH3 = document.querySelector(".pokemon-name");
  pokemonNameH3.textContent = toUpperCase(pokemonData.name);
  // Change the pokemon card's backgroun color and type span
  const pokemonType = changePokemontype(pokemonData);
  const pokemonStats = changePokemonStats(pokemonData);
};

const changePokemontype = (pokemonData) => {
  const typeParagraph = document.querySelector(".pokemon-types");
  const pokemonTypeArray = pokemonData.types;
  if (pokemonTypeArray.length > 1) {
    const type = pokemonData.types[0].type.name;
    const type2 = pokemonData.types[1].type.name;
    typeParagraph.innerHTML = `<span class="pokemon-type">${toUpperCase(
      type
    )}</span> 
    <span class="pokemon-type2">${toUpperCase(type2)}</span>`;
    /* Change Color */
    defaultPokemonCard.style.backgroundImage = `linear-gradient(to bottom, #333333, ${changePokemonBackgroundColor(
      type
    )})`;
    defaultPokemonCardBack.style.backgroundImage = `linear-gradient(to bottom, #333333, ${changePokemonBackgroundColor(
      type
    )})`;
  } else if (pokemonTypeArray.length === 1) {
    const type = pokemonData.types[0].type.name;

    typeParagraph.innerHTML = `<span class="pokemon-type">${toUpperCase(
      type
    )}</span>`;
    /* Change Color */
    defaultPokemonCard.style.backgroundImage = "none";
    defaultPokemonCard.style.backgroundColor = `${changePokemonBackgroundColor(
      type
    )}`;
    defaultPokemonCardBack.style.backgroundImage = "none";
    defaultPokemonCardBack.style.backgroundColor = `${changePokemonBackgroundColor(
      type
    )}`;
  }
};

/* const changePokemonBackgroundColor = (type) => {
  let color = "#FFFFFF";
  switch (type) {
    case "fire":
      color = "#EE8130";
      break;
    case "water":
      color = "#6390F0";
      break;
    case "electric":
      color = "#F7D02C";
      break;
    case "grass":
      color = "#7AC74C";
      break;
    case "ice":
      color = "#96D9D6";
      break;
    case "fighting":
      color = "#C22E28";
      break;
    case "poison":
      color = "#A33EA1";
      break;
    case "ground":
      color = "#E2BF65";
      break;
    case "flying":
      color = "#A98FF3";
      break;
    case "psychic":
      color = "#F95587";
      break;
    case "bug":
      color = "#A6B91A";
      break;
    case "rock":
      color = "#B6A136";
      break;
    case "ghost":
      color = "#735797";
      break;
    case "dragon":
      color = "#6F35FC";
      break;
    case "dark":
      color = "#705746";
      break;
    case "steel":
      color = "#B7B7CE";
      break;
    case "fairy":
      color = "#D685AD";
      break;
    default:
      color = "#A8A878";
  }
  return color;
}; */

const changeDefaultPokemonCard = async () => {
  image.style.display = "none";
  spinner.style.display = "flex";
  const number = randomNumberGenerator();
  const pokemonData = await fetchPokemonData(number);
  const pokemonImageSrc = document.querySelector(".pokemon-img");
  const newPokemonImage =
    pokemonData.sprites.other["official-artwork"].front_default;
  const pokemonImage = changePokemonImage(pokemonImageSrc, newPokemonImage);
  image.style.display = "block";
  spinner.style.display = "none";
  const pokemonInfo = changePokemonInfo(pokemonData);

  /* Flips card if it's facing backwards when user clicks on generate button  */
  const card = document.querySelector(".card-inner");
  const flipped = document
    .querySelector(".card-inner")
    .classList.contains("is-flipped");
  if (flipped) {
    card.classList.toggle("is-flipped");
  }
};

const savePokemonCard = () => {
  const poekmonCard = document.querySelector(".pokemon-card");
  html2canvas(poekmonCard).then((canvas) => {
    const base64Image = canvas.toDataURL();
    let a = document.createElement("a");
    a.setAttribute("href", base64Image);
    a.setAttribute("download", "pokemonCard.png");
    a.click();
    a.remove();
  });
};

/* Flips card to view Stats */
card.addEventListener("click", function (e) {
  card.classList.toggle("is-flipped");
});

btnGenerate.addEventListener("click", changeDefaultPokemonCard);
btnSave.addEventListener("click", savePokemonCard);

// TODO LIST => DONE

// Charizard Card as a default
/* 
name: Charizard
type: Fire, Flying => changePokemonBackgroundColor as well as => changePokemonType
stats: HP, Attack, Defense, Special Attack, Special Defense, and Speed => changePokemonStats
official-artwork: 
*/

/*
generatePokemonCard function or changeDefaultPokemonCard
a wrapper function that runs other small function
*/

/*
generateRandomNumber function =>
returns a number
*/

/*fethPokemonData function =>
accepts a number as a parameter
that fetch pokemon(name, type, official-artwork, stats)
calls toUpperCase function => on pokemon(name, type, stats) and returns it
*/

/*
changePokemonImage function =>
accepts a pokemon official-artwork to fetch
and returns them in an html tag
*/

/*
changePokemonBackgroundColor function =>
accepts a pokemon type as a parameter displays changes the background color according to
the type of the pokemon and if it has two types
*/

/* 
changePokemonInfo function =>
a wrapper function for other small functions
that makes some changes to the default Charizard Card 
*/

/*
changePokemontype function => 
accepts a pokemon type array
and returns them in an html tag
*/

/*
changePokemonStats function =>
accepts a pokemon stats object
and returns them in an html tag
*/

/* 
change background color for pokemon-card--back
*/

/*
change default stats to current pokemon for pokemon-card--back
*/

// TODO LIST
// you can just use flex-wrap/flex-direction: column for your responsive design, try to make it.
// fix bug of defautl background image affecting all cards with only one type => fixed by setting background image value to none instead of " "
