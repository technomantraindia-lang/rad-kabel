import cableCrossSection from "../../assets/cable-cross-section.png";

const HOTSPOTS = [
  { top: "28%", left: "58%" },
  { top: "42%", left: "52%" },
  { top: "56%", left: "48%" },
  { top: "70%", left: "44%" },
];

const LAYERS = [
  {
    title: "Copper Conductor",
    subtitle: "High purity electrolytic copper.",
    icon: "copper",
    points: ["Better conductivity", "Lower resistance", "Stable current flow"],
  },
  {
    title: "Insulation System",
    subtitle: "Premium insulation compound.",
    icon: "insulation",
    points: ["Electrical protection", "Thermal stability", "Long life"],
  },
  {
    title: "Protective Shield",
    subtitle: "Additional safety layer.",
    icon: "shield",
    points: ["Mechanical strength", "Durability", "Environmental protection"],
  },
  {
    title: "Outer Sheath",
    subtitle: "Engineered protection.",
    icon: "sheath",
    points: ["Abrasion resistance", "Flexibility", "Long-term reliability"],
  },
];

function CheckIcon() {
  return (
    <svg className="tech-cable__check" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7.5 12.2 L10.5 15.2 L16.8 8.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LayerIcon({ type }) {
  return (
    <div className="tech-cable__icon-stage">
      <span className="tech-cable__icon-rail" aria-hidden />
      <div className="tech-cable__icon-ring">
        <span className="tech-cable__icon-cross tech-cable__icon-cross--h" aria-hidden />
        <span className="tech-cable__icon-cross tech-cable__icon-cross--v" aria-hidden />
        <span className="tech-cable__icon-slash" aria-hidden />
        <span className="tech-cable__icon-antenna tech-cable__icon-antenna--top" aria-hidden />
        <span className="tech-cable__icon-antenna tech-cable__icon-antenna--bottom" aria-hidden />
        <span className="tech-cable__icon-antenna tech-cable__icon-antenna--left" aria-hidden />
        <span className="tech-cable__icon-antenna tech-cable__icon-antenna--right" aria-hidden />
        {type === "copper" && (
          <svg className="tech-cable__svg-icon" viewBox="0 0 64 64" aria-hidden>
            <circle cx="32" cy="34" r="7" fill="currentColor" />
            <circle cx="22" cy="28" r="5.5" fill="currentColor" />
            <circle cx="42" cy="28" r="5.5" fill="currentColor" />
            <circle cx="26" cy="42" r="5" fill="currentColor" />
            <circle cx="38" cy="42" r="5" fill="currentColor" />
            <circle cx="32" cy="22" r="4.5" fill="currentColor" />
          </svg>
        )}
        {type === "insulation" && (
          <svg className="tech-cable__svg-icon" viewBox="0 0 64 64" aria-hidden>
            <path
              d="M32 10 L52 20 V34 C52 46 32 54 32 54 C32 54 12 46 12 34 V20 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <path d="M32 24 V40 M26 32 H38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        )}
        {type === "shield" && (
          <svg className="tech-cable__svg-icon" viewBox="0 0 64 64" aria-hidden>
            <path
              d="M32 10 L52 20 V34 C52 46 32 54 32 54 C32 54 12 46 12 34 V20 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <path
              d="M32 22 L35 28 L42 29 L37 34 L38 41 L32 37 L26 41 L27 34 L22 29 L29 28 Z"
              fill="currentColor"
            />
          </svg>
        )}
        {type === "sheath" && (
          <svg className="tech-cable__svg-icon" viewBox="0 0 64 64" aria-hidden>
            <ellipse cx="32" cy="22" rx="18" ry="6" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <ellipse cx="32" cy="32" rx="18" ry="6" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <ellipse cx="32" cy="42" rx="18" ry="6" fill="none" stroke="currentColor" strokeWidth="2.5" />
          </svg>
        )}
      </div>
    </div>
  );
}

export default function TechnologyCableInside() {
  return (
    <section className="tech-cable" aria-labelledby="tech-cable-heading">
      <header className="tech-cable__head">
        <h2 id="tech-cable-heading" className="tech-cable__title-main">
          Inside a <span className="tech-accent">RAD Kabel</span> Cable
        </h2>
      </header>

      <div className="tech-cable__body">
        <div className="tech-cable__visual">
          <img
            src={cableCrossSection}
            alt="RAD Kabel cable cross-section showing copper conductor, insulation, shield, and outer sheath layers"
            className="tech-cable__visual-img"
            decoding="async"
            loading="lazy"
          />
          <svg className="tech-cable__connectors" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            <path className="tech-cable__connector-line" d="M58 28 H88" />
            <path className="tech-cable__connector-line" d="M52 42 H88" />
            <path className="tech-cable__connector-line" d="M48 56 H88" />
            <path className="tech-cable__connector-line" d="M44 70 H88" />
          </svg>
          {HOTSPOTS.map(({ top, left }, index) => (
            <span
              key={`hotspot-${index}`}
              className="tech-cable__hotspot"
              style={{ top, left }}
              aria-hidden
            />
          ))}
        </div>

        <div className="tech-cable__columns">
          {LAYERS.map(({ title, subtitle, icon, points }) => (
            <article key={title} className="tech-cable__col">
              <LayerIcon type={icon} />
              <h3 className="tech-cable__title">{title}</h3>
              <p className="tech-cable__subtitle">{subtitle}</p>
              <ul className="tech-cable__points">
                {points.map((point) => (
                  <li key={point}>
                    <CheckIcon />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
