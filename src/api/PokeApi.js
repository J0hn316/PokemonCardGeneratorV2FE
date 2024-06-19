import axios from 'axios';

// Target API pokemon api link.
const pokemon_API = 'https://pokeapi.co/api/v2/';

// export async function getPokemonById(id) {
//   try {
//     const res = await axios.get(`${pokemon_API}pokemon/${id}`);
//     return res.data;
//   } catch (error) {
//     console.error('Error fetching Pokémon by ID:', error);
//     throw error;
//   }
// }

export async function getPokemonByName(name) {
  try {
    const res = await axios.get(`${pokemon_API}pokemon/${name}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching Pokémon by name:', error);
    throw error;
  }
}

export async function getTheTypeOfPokemon(name) {
  try {
    const res = await axios.get(`${pokemon_API}pokemon/${name}`);
    return res.data.types[0].type.name;
  } catch (error) {
    console.error('Error fetching Pokémon by type:', error);
    throw error;
  }
}
