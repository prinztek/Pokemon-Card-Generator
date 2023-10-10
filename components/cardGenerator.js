import changePokemonBackgroundColor from "./changePokemonBackgroundColor.js";
import toUpperCase from "./toUpperCase.js";

const btnGenerate = document.querySelector("#generate-btn");
const btnSave = document.querySelector("#save-img-btn");

const defaultPokemonCard = document.querySelector(".pokemon-card--front");
const defaultPokemonCardImageSection = defaultPokemonCard.children[0];
const defaultPokemonCardInfoSection = defaultPokemonCard.children[1];

const defaultPokemonCardBack = document.querySelector(".pokemon-card--back");

const randomNumberGenerator = () => {
  let randomNumber = Math.floor(Math.random() * 1001);
  return randomNumber;
};

const fetchPokemonData = async (number) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
  const pokemonData = await response.json();
  return pokemonData;
};

const changePokemonImage = async (pokemonData) => {
  const pokemonImageSrc =
    pokemonData.sprites.other["official-artwork"].front_default;
  defaultPokemonCardImageSection.firstElementChild.src = `${pokemonImageSrc}`;
};

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
  const pokemonNameH3 = defaultPokemonCardInfoSection.firstElementChild;
  pokemonNameH3.textContent = toUpperCase(pokemonData.name);
  // Change the pokemon card's backgroun color and type span
  const pokemonType = changePokemontype(pokemonData);
  const pokemonStats = changePokemonStats(pokemonData);
};

const changePokemontype = (pokemonData) => {
  const typeParagraph = defaultPokemonCardInfoSection.lastElementChild;
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
    defaultPokemonCard.style.backgroundImage = "";
    defaultPokemonCard.style.backgroundColor = `${changePokemonBackgroundColor(
      type
    )}`;
    defaultPokemonCardBack.style.backgroundImage = "";
    defaultPokemonCardBack.style.backgroundColor = `${changePokemonBackgroundColor(
      type
    )}`;
  }
};

const changeDefaultPokemonCard = async () => {
  const number = randomNumberGenerator();
  const pokemonData = await fetchPokemonData(number);
  const pokemonImage = await changePokemonImage(pokemonData);
  const pokemonInfo = changePokemonInfo(pokemonData);

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

// TODO LIST
// change background color for pokemon-card--back
// change default stats to current pokemon for pokemon-card--back
