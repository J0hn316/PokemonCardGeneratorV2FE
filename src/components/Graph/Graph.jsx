import './graph.css';

export default function Graph({ details }) {
  if (!details || details.length === 0) {
    return <div className="Graph">No data available</div>;
  }
  const highNum = Math.max(...details.map((detail) => detail.val));

  const processedDetails = details.map((detail) => ({
    ...detail,
    per: (detail.val / highNum) * 100,
  }));
  function GraphBar({ name, val, per }) {
    return (
      <div key={val} className="graph-bar" style={{ height: `${per}%` }}>
        <span>
          <p>{name}</p>
        </span>
        <span></span>
        <span>
          <p>{val}</p>
        </span>
      </div>
    );
  }
  return (
    <div className="Graph">
      {processedDetails.map((detail) => (
        <GraphBar
          key={detail.val}
          name={detail.name}
          val={detail.val}
          per={detail.per}
        />
      ))}
    </div>
  );
}
