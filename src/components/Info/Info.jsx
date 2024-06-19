import './info.css';

export default function Info(props) {
  return (
    <div className="Info">
      <h3>Ability List</h3> <br />
      <div>
        {props.details.abilities.map((move) => (
          <p key={move.ability.name}>{move.ability.name}</p>
        ))}
      </div>
      <h3>{props.details.name} can learn</h3> <br />
      <div className="move-list">
        {props.details.moves.map((move) => (
          <p key={move.move.name}>{move.move.name}</p>
        ))}
      </div>
    </div>
  );
}
