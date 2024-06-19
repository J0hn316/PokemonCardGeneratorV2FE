import CustomLinks from '../CustomLinks/CustomLinks';
import './navbar.css';

export default function Navbar() {
  return (
    <nav className="Navbar">
      <ul>
        <h3>Pokémon Cards App</h3>
        <CustomLinks href="/" name="Home" />
        <CustomLinks href="/cards/show-all" name="All Pokemon Cards" />
        <CustomLinks href="/cards/create" name="Create Pokemon Card" />
      </ul>
    </nav>
  );
}
