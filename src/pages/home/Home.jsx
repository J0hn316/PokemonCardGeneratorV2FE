import { Link } from 'react-router-dom';
import './home.css';

export default function Home() {
  return (
    <div className="HomePage">
      <div>
        <h1>Pokémon Cards App</h1>
      </div>
      <div className="home-button-container">
        <Link to="/cards/create">Create pokemon card</Link>
        <Link to="/cards/show-all">Show all pokemon cards</Link>
      </div>
    </div>
  );
}
