import imgConductivity from "../../assets/science-conductivity-visual.png";
import imgHeatCompare from "../../assets/science-heat-comparison.png";
import imgFlame from "../../assets/science-fire-safety.png";
import iconPowerTransmission from "../../assets/tech-science-icons/power-transmission.png";
import iconEnergyLoss from "../../assets/tech-science-icons/energy-loss.png";
import iconPerformance from "../../assets/tech-science-icons/performance.png";
import iconFireResistance from "../../assets/tech-science-icons/fire-resistance.png";
import iconSelfExtinguishing from "../../assets/tech-science-icons/self-extinguishing.png";
import iconLowSmoke from "../../assets/tech-science-icons/low-smoke.png";
import iconNoMeltDrip from "../../assets/tech-science-icons/no-melt-no-drip.png";

const CONDUCTIVITY_STATS = [
  {
    icon: iconPowerTransmission,
    line1: "Better Power",
    line2: "Transmission",
    alt: "Better power transmission",
  },
  {
    icon: iconEnergyLoss,
    line1: "Lower",
    line2: "Energy Loss",
    alt: "Lower energy loss",
  },
  {
    icon: iconPerformance,
    line1: "Stable",
    line2: "Performance",
    alt: "Stable performance",
  },
];

const FIRE_FEATURES = [
  { icon: iconFireResistance, label: "Fire Resistance", alt: "Fire resistance" },
  { icon: iconSelfExtinguishing, label: "Self Extinguishing", alt: "Self extinguishing" },
  { icon: iconLowSmoke, label: "Low Smoke Emission", alt: "Low smoke emission" },
  { icon: iconNoMeltDrip, label: "No Melt No Drip Design", labelLines: ["No Melt No", "Drip Design"], alt: "No melt no drip design" },
];

const HEAT_FEATURES = [
  "Better heat resistance",
  "Stable insulation",
  "Long-term reliability",
  "Consistent performance",
];

function HeatCheckIcon() {
  return (
    <svg className="tech-science__heat-check" viewBox="0 0 24 24" aria-hidden>
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

export default function TechnologyScienceGrid() {
  return (
    <section id="tech-science" className="tech-science" aria-label="Technology feature highlights">
      <div className="tech-container tech-science__grid">
        <article className="tech-science__panel tech-science__panel--copper">
          <div className="tech-science__copper-hero">
            <img
              src={imgConductivity}
              alt=""
              className="tech-science__copper-hero-img"
              decoding="async"
              loading="lazy"
              aria-hidden
            />
            <div className="tech-science__copper-hero-content">
              <h2 className="tech-science__title tech-science__title--copper">
                The Science of Conductivity
              </h2>
              <div className="tech-science__copper-badge">
                <span className="tech-science__copper-badge-value">100%</span>
                <span className="tech-science__copper-badge-label">Electrolytic Copper</span>
              </div>
            </div>
          </div>
          <div className="tech-science__copper-foot">
            <ul className="tech-science__mini-icons">
              {CONDUCTIVITY_STATS.map(({ icon, line1, line2, alt }) => (
                <li key={`${line1}-${line2}`}>
                  <img src={icon} alt={alt} className="tech-science__mini-icon" decoding="async" loading="lazy" />
                  <span className="tech-science__mini-copy">
                    <span>{line1}</span>
                    <span>{line2}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className="tech-science__panel tech-science__panel--heat">
          <div className="tech-science__media">
            <img
              src={imgHeatCompare}
              alt=""
              decoding="async"
              loading="lazy"
              aria-hidden
            />
          </div>
          <div className="tech-science__overlay tech-science__overlay--heat">
            <h2 className="tech-science__title tech-science__title--heat">
              Built to Handle Demanding Conditions
            </h2>
            <div className="tech-science__heat-wire tech-science__heat-wire--rad">
              <span className="tech-science__heat-wire-name">RAD Kabel Wire</span>
              <span className="tech-science__heat-wire-temp">98&deg;C</span>
            </div>
            <div className="tech-science__heat-wire tech-science__heat-wire--standard">
              <span className="tech-science__heat-wire-name">Standard Wire</span>
              <span className="tech-science__heat-wire-temp">68&deg;C</span>
            </div>
            <ul className="tech-science__heat-checks">
              {HEAT_FEATURES.map((feature) => (
                <li key={feature}>
                  <HeatCheckIcon />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className="tech-science__panel tech-science__panel--fire">
          <div className="tech-science__fire-hero">
            <img
              src={imgFlame}
              alt=""
              className="tech-science__fire-hero-img"
              decoding="async"
              loading="lazy"
              aria-hidden
            />
            <div className="tech-science__fire-hero-content">
              <h2 className="tech-science__title tech-science__title--fire">
                <span className="tech-science__title-accent">F</span>ire Safety Technology
              </h2>
              <p className="tech-science__fire-desc">
                Our insulation systems are engineered to help limit flame propagation and improve
                overall electrical safety.
              </p>
              <ul className="tech-science__fire-grid">
                {FIRE_FEATURES.map(({ icon, label, labelLines, alt }) => (
                  <li key={label} className="tech-science__fire-card">
                    <img src={icon} alt={alt} className="tech-science__fire-card-icon" decoding="async" loading="lazy" />
                    {labelLines ? (
                      <span className="tech-science__fire-card-label">
                        <span>{labelLines[0]}</span>
                        <span>{labelLines[1]}</span>
                      </span>
                    ) : (
                      <span className="tech-science__fire-card-label">{label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
