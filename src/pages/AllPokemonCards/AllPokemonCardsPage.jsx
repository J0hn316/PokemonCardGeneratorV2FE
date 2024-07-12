import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { showAllCards } from '../../api/CardApi';
import { getPokemonByName, getTheTypeOfPokemon } from '../../api/PokeApi';
import './allPokemonCards.css';

const typeColor = {
  bug: '#26de81',
  dragon: '#ffeaa7',
  electric: '#fed330',
  fairy: '#FF0069',
  fighting: '#30336b',
  fire: '#f0932b',
  flying: '#81ecec',
  grass: '#00b894',
  ground: '#EFB549',
  ghost: '#a55eea',
  ice: '#74b9ff',
  normal: '#95afc0',
  poison: '#6c5ce7',
  psychic: '#a29bfe',
  rock: '#2d3436',
  water: '#0190FF',
  dark: '#31363F',
  steel: '#B4B4B8',
};

export default function AllPokemonCards() {
  const [cards, setCards] = useState([]);
  const [types, setTypes] = useState({});
  const [pokemonStats, setPokemonStats] = useState({});

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const allPokeCard = await showAllCards();
        setCards(allPokeCard.data);

        const typesData = {};
        const statsData = {};
        for (let card of allPokeCard.data) {
          const type = await getTheTypeOfPokemon(card.name);
          const pokemon = await getPokemonByName(card.name);

          typesData[card.name] = type;

          const stats = pokemon.stats.reduce((acc, stat) => {
            acc[stat.stat.name] = stat.base_stat;
            return acc;
          }, {});

          statsData[card.name] = stats;
        }
        setTypes(typesData);
        setPokemonStats(statsData);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };
    fetchPokemon();
  }, []);

  const handleMouseEnter = async (name) => {
    try {
      const pokemon = await getPokemonByName(name);
      const audio = new Audio(pokemon.cries.latest);
      audio.volume = 0.5;
      audio.play();
    } catch (error) {
      console.error('Error fetching Pokemon Sound:', error);
    }
  };

  const handleMouseLeave = (event) => {
    event.target.classList.remove('shake');
  };

  const handleMouseOver = (event) => {
    event.target.classList.add('shake');
  };

  return (
    <div className="ShowAllPage">
      <div className="container">
        {cards.map((card, id) => {
          const type = types[card.name];
          const backgroundColor = typeColor[type] || 'transparent';
          const stats = pokemonStats[card.name];
          return (
            <div
              key={id}
              className="card-container"
              onMouseEnter={() => handleMouseEnter(card?.name)}
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            >
              <Link to={`/cards/show/${card._id}`}>
                <div className="card" style={{ backgroundColor }}>
                  <img src={card.img} alt={card?.name} />
                  <h3 className="poke-name">{`${card?.name}`}</h3>
                  <div className="poke-type">
                    <p style={{ backgroundColor }}>{type || 'Loading...'}</p>
                    <span>
                      {stats ? (
                        <div className="poke-stats">
                          <p>HP: {stats.hp}</p>
                          <p>ATK: {stats.attack}</p>
                          <p>DEF: {stats.defense}</p>
                          <p>SPD: {stats.speed}</p>
                        </div>
                      ) : (
                        'Loading stats...'
                      )}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
