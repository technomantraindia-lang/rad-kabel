import iconQualityCommitment from "../../assets/infrastructure/stats-icons/quality-commitment.png";
import iconQualityChecks from "../../assets/infrastructure/stats-icons/quality-checks.png";
import iconElectrolyticCopper from "../../assets/infrastructure/stats-icons/electrolytic-copper.png";
import iconOperationalCapability from "../../assets/infrastructure/stats-icons/operational-capability.png";
import iconPanIndiaSupply from "../../assets/infrastructure/stats-icons/pan-india-supply-network.png";

const STATS = [
  { value: "100%", label: "Quality Commitment", icon: iconQualityCommitment, iconScale: 1.08 },
  { value: "25+", label: "Quality Checks", icon: iconQualityChecks, iconScale: 1.56 },
  { value: "99.97%", label: "Electrolytic Copper", icon: iconElectrolyticCopper, iconScale: 1.85 },
  { value: "24/7", label: "Operational Capability", icon: iconOperationalCapability, iconScale: 0.9 },
  { value: "PAN INDIA", label: "Supply Network", icon: iconPanIndiaSupply, iconScale: 1.12 },
];

export default function InfrastructureStatsStrip() {
  return (
    <section className="infra-stats" aria-label="Infrastructure highlights">
      <div className="infra-container">
        <div className="infra-stats__panel">
          <ul className="infra-stats__grid">
            {STATS.map(({ value, label, icon, iconScale = 1 }) => (
              <li key={label} className="infra-stats__item">
                <span className="infra-stats__icon-wrap" aria-hidden>
                  <img
                    src={icon}
                    alt=""
                    className="infra-stats__icon"
                    style={{ "--icon-scale": iconScale }}
                    decoding="async"
                  />
                </span>
                <div className="infra-stats__copy">
                  <strong className="infra-stats__value">{value}</strong>
                  <span className="infra-stats__label">{label}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
