import toUpperCase from "./toUpperCase.js";
import changePokemonBackgroundColor from "./changePokemonBackgroundColor.js";
const changePokemonType = (
  pokemonTypeArray,
  pokemonTypeParagraph,
  pokemonCard,
  pokemonCardBack
) => {
  if (pokemonTypeArray.length > 1) {
    const type = pokemonTypeArray[0].type.name;
    const type2 = pokemonTypeArray[1].type.name;
    pokemonTypeParagraph.innerHTML = `<span class="pokemon-type">${toUpperCase(
      type
    )}</span> 
    <span class="pokemon-type2">${toUpperCase(type2)}</span>`;
    /* Change Color */
    pokemonCard.style.backgroundImage = `linear-gradient(to bottom, #505050, ${changePokemonBackgroundColor(
      type
    )})`;
    pokemonCardBack.style.backgroundImage = `linear-gradient(to bottom, #505050, ${changePokemonBackgroundColor(
      type
    )})`;
  } else if (pokemonTypeArray.length === 1) {
    const type = pokemonTypeArray[0].type.name;

    pokemonTypeParagraph.innerHTML = `<span class="pokemon-type">${toUpperCase(
      type
    )}</span>`;
    /* Change Color */
    pokemonCard.style.backgroundImage = "none";
    pokemonCard.style.backgroundColor = `${changePokemonBackgroundColor(type)}`;
    pokemonCardBack.style.backgroundImage = "none";
    pokemonCardBack.style.backgroundColor = `${changePokemonBackgroundColor(
      type
    )}`;
  }
};

export default changePokemonType;
