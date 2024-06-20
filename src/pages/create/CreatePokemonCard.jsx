import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCard } from '../../api/CardApi';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import './createPage.css';
import { checkPokemonName } from '../../api/PokeApi';

export default function CreatePokemonCard() {
  const [loading, setLoading] = useState('');
  const nav = useNavigate();

  const createTheCard = (event) => {
    event.preventDefault();
    const card = { name: event.target.name.value };
    if (!checkPokemonName(card.name)) {
      return;
    }
    setLoading('active');
    createCard(card).then(() => nav('/cards/show-all'));
  };

  return (
    <div className="CreateCardPage">
      <h1>Enter Pokemon Name</h1>
      {loading && <LoadingIcon active={loading} />}
      <form onSubmit={createTheCard}>
        <input type="text" name="name" id="name" />
        <button type="submit">Find Pokemon</button>
      </form>
    </div>
  );
}
