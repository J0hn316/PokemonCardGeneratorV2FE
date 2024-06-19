import { Link } from 'react-router-dom';
import './customLinks.css';

export default function CustomLinks({ href, name, selected = '' }) {
  return (
    <li className={`CustomLink ${selected}`}>
      <Link to={href}>{name}</Link>
    </li>
  );
}
