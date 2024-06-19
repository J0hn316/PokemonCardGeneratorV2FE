import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemonByName } from '../../api/PokeApi';
import { showCardById } from '../../api/CardApi';
import Info from '../../components/Info/Info';
import Graph from '../../components/Graph/Graph';
import './show.css';

export default function ShowPage() {
  const [pokemon, setPokemon] = useState();
  const [card, setCard] = useState({});
  const [pokemonStats, setPokemonStats] = useState();
  const [pokemonInfo, setPokemonInfo] = useState();
  const nav = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const pokeCard = await showCardById(id);
        setCard(pokeCard.data, pokeCard.data.img);

        const res = await getPokemonByName(pokeCard.data.name);
        updatePokemon(res);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };
    fetchPokemon();
  }, [id]);

  const updatePokemon = (pokemon) => {
    setPokemon(pokemon);
    const stats = pokemon.stats.map((stat) => {
      return { name: stat.stat.name, val: stat.base_stat };
    });
    setPokemonStats(stats);
    const details = {
      name: pokemon.name,
      abilities: pokemon.abilities,
      type: pokemon.types,
      games: pokemon.game_indices,
      moves: pokemon.moves,
    };
    setPokemonInfo(details);
  };
  return (
    <div className="ShowPage">
      <div className="show-container">
        <h1>{card.name}</h1>
        <button
          onClick={() => {
            nav(`/cards/edit/${card._id}`);
          }}
        >
          Edit Card
        </button>
        {pokemon ? (
          <img
            src={`${pokemon.sprites.other.showdown.front_default}`}
            alt={card.name}
          />
        ) : (
          <div>
            <p>Backup Image</p>
            <img src={card.img} alt={card.name} />
          </div>
        )}
        {pokemonStats ? <Graph details={pokemonStats} /> : <div></div>}
      </div>
      <div className="show-stat-container">
        {pokemonInfo ? <Info details={pokemonInfo} /> : <div></div>}
      </div>
    </div>
  );
}
