import {
  showCardById,
  editByIdAndUpdateCard,
  deleteCardById,
} from '../../api/CardApi';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemonByName } from '../../api/PokeApi';
import './editPage.css';

export default function EditPage() {
  const [pokemon, setPokemon] = useState();
  const [card, setCard] = useState({});
  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const pokeCard = await showCardById(id);
        setCard(pokeCard.data, pokeCard.data.img);
        const response = await getPokemonByName(pokeCard.data.name);
        setPokemon(response);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };
    fetchPokemon();
  }, [id]);

  const editCard = async (event) => {
    event.preventDefault();
    const updateCard = {
      name: event.target.name.value,
      img: event.target.img,
    };
    try {
      await editByIdAndUpdateCard(id, updateCard);
      nav('/cards/show-all');
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  const deleteCard = async (event) => {
    event.preventDefault();

    try {
      await deleteCardById(id);
      nav('/cards/show-all');
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };
  return (
    <div className="EditPage">
      <div className="form-container">
        <form onSubmit={editCard}>
          Name:{' '}
          <input
            type="text"
            name="name"
            placeholder="Enter new pokemon name"
            defaultValue={card.name}
          />
          <input className="input2" type="submit" value="Change Pokemon" />
          <button onClick={deleteCard}>Delete Card</button>
        </form>
      </div>
      <div>
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
      </div>
    </div>
  );
}
