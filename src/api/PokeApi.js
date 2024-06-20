import axios from 'axios';

// Target API pokemon api link.
const pokemon_API = 'https://pokeapi.co/api/v2/';

export async function getPokemonByName(name) {
  try {
    const res = await axios.get(`${pokemon_API}pokemon/${name}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching Pokémon by name:', error);
    throw error;
  }
}

export async function checkPokemonName(name) {
  try {
    const res = await fetch(`${pokemon_API}pokemon/${name}`);
    if (!res.ok) {
      alert('Pokémon not found');
      window.location.reload();
    }
  } catch (error) {
    console.error('Error checking Pokémon name:', error);
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
