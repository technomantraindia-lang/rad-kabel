import iconQualityCommitment from "../../assets/infrastructure/stats-icons/quality-commitment.svg";
import iconQualityChecks from "../../assets/infrastructure/stats-icons/quality-checks.svg";
import iconElectrolyticCopper from "../../assets/infrastructure/stats-icons/electrolytic-copper.svg";
import iconOperationalCapability from "../../assets/infrastructure/stats-icons/operational-capability.svg";
import iconPanIndiaSupply from "../../assets/infrastructure/stats-icons/pan-india-supply-network.svg";

const STATS = [
  { value: "100%", label: "Quality Commitment", icon: iconQualityCommitment },
  { value: "25+", label: "Quality Checks", icon: iconQualityChecks },
  { value: "99.97%", label: "Electrolytic Copper", icon: iconElectrolyticCopper },
  { value: "24/7", label: "Operational Capability", icon: iconOperationalCapability },
  { value: "PAN INDIA", label: "Supply Network", icon: iconPanIndiaSupply },
];

export default function InfrastructureStatsStrip() {
  return (
    <section className="infra-stats" aria-label="Infrastructure highlights">
      <div className="infra-container">
        <div className="infra-stats__panel">
          <ul className="infra-stats__grid">
            {STATS.map(({ value, label, icon }) => (
              <li key={label} className="infra-stats__item">
                <img src={icon} alt="" className="infra-stats__icon" decoding="async" aria-hidden />
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
