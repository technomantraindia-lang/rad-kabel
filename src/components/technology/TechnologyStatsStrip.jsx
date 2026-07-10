import iconCopper from "../../assets/why-choose-icons/premium-copper.png";
import iconQuality from "../../assets/why-choose-icons/quality-control.png";
import iconManufacturing from "../../assets/why-choose-icons/manufacturing.png";
import iconSafety from "../../assets/why-choose-icons/safety.png";
import iconPerformance from "../../assets/why-choose-icons/performance.png";
import iconPartnerships from "../../assets/why-choose-icons/partnerships.png";

const STATS = [
  { icon: iconCopper, label: "100% Electrolytic Copper" },
  { icon: iconQuality, label: "25+ Quality Checks" },
  { icon: iconManufacturing, label: "Advanced Manufacturing" },
  { icon: iconSafety, label: "Fire Safe Performance" },
  { icon: iconPerformance, label: "Engineered for Performance" },
  { icon: iconPartnerships, label: "Trusted by Professionals" },
];

export default function TechnologyStatsStrip() {
  return (
    <section className="tech-stats" aria-label="Technology highlights">
      <div className="tech-container">
        <ul className="tech-stats__grid">
          {STATS.map(({ icon, label }) => (
            <li key={label} className="tech-stats__item">
              <img src={icon} alt="" className="tech-stats__icon" decoding="async" />
              <span className="tech-stats__label">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
