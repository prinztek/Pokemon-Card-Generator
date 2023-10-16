const fetchPokemonData = async (number) => {
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
};

export default fetchPokemonData;
