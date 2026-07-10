const ROWS = [
  {
    feature: "Copper Purity",
    rad: "100% Electrolytic Copper",
    standard: "Mixed / Recycled Copper",
  },
  {
    feature: "Fire Safety",
    rad: "High Fire Resistance, Low Smoke, Self Extinguishing",
    standard: "Limited Fire Resistance",
  },
  {
    feature: "Conductivity",
    rad: "Better Conductivity, Lower Power Loss",
    standard: "Standard Conductivity",
  },
  {
    feature: "Insulation Quality",
    rad: "Premium FR Grade Insulation",
    standard: "Basic PVC Insulation",
  },
  {
    feature: "Thermal Stability",
    rad: "High Heat Resistance, Stable Performance",
    standard: "Lower Heat Resistance",
  },
  {
    feature: "Quality Testing",
    rad: "Multi-Level Precision Testing",
    standard: "Testing Varies",
  },
  {
    feature: "Service Life",
    rad: "Longer Life, Better Durability",
    standard: "Shorter Life",
  },
];

function CheckMark() {
  return (
    <span className="tech-compare-table__mark is-yes" aria-hidden>
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="currentColor" />
        <path
          d="M7.4 12.1 L10.4 15.1 L16.7 8.7"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function CrossMark() {
  return (
    <span className="tech-compare-table__mark is-no" aria-hidden>
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M9.1 9.1 L14.9 14.9 M14.9 9.1 L9.1 14.9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export default function TechnologyComparison() {
  return (
    <section className="tech-compare-table" aria-labelledby="tech-compare-heading">
      <div className="tech-compare-table__container">
        <header className="tech-section-head tech-section-head--center">
          <h2 id="tech-compare-heading" className="tech-section-title">
            Technology <span className="tech-accent">Comparison</span>
          </h2>
        </header>

        <div className="tech-compare-table__wrap">
          <table className="tech-compare-table__table">
            <thead>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col" className="tech-compare-table__rad">
                  RAD Kabel Wires
                </th>
                <th scope="col">Standard Wires</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(({ feature, rad, standard }) => (
                <tr key={feature}>
                  <th scope="row">{feature}</th>
                  <td className="tech-compare-table__rad">
                    <div className="tech-compare-table__cell">
                      <CheckMark />
                      <span className="tech-compare-table__cell-text">{rad}</span>
                    </div>
                  </td>
                  <td>
                    <div className="tech-compare-table__cell">
                      <CrossMark />
                      <span className="tech-compare-table__cell-text">{standard}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
