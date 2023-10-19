import toUpperCase from "./toUpperCase.js";

const changePokemonStats = (pokemonStats, defaultPokemonCardStats) => {
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
export default changePokemonStats;
