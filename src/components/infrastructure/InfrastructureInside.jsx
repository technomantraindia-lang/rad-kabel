import imgFloor from "../../assets/infrastructure/inside/manufacturing-floor.png";
import imgLines from "../../assets/infrastructure/inside/production-lines.png";
import imgLab from "../../assets/infrastructure/inside/quality-control-lab.png";
import imgPackaging from "../../assets/infrastructure/inside/packaging-unit.png";
import imgDispatch from "../../assets/infrastructure/inside/dispatch-area.png";
import imgAdmin from "../../assets/infrastructure/inside/administration.png";
import iconFloor from "../../assets/infrastructure/inside-icons/manufacturing-floor.svg";
import iconLines from "../../assets/infrastructure/inside-icons/production-lines.svg";
import iconLab from "../../assets/infrastructure/inside-icons/quality-control-lab.svg";
import iconPackaging from "../../assets/infrastructure/inside-icons/packaging-unit.svg";
import iconDispatch from "../../assets/infrastructure/inside-icons/dispatch-area.svg";
import iconAdmin from "../../assets/infrastructure/inside-icons/administration.svg";

const ITEMS = [
  { label: "Manufacturing Floor", image: imgFloor, icon: iconFloor },
  { label: "Production Lines", image: imgLines, icon: iconLines },
  { label: "Quality Control Lab", image: imgLab, icon: iconLab },
  { label: "Packaging Unit", image: imgPackaging, icon: iconPackaging },
  { label: "Dispatch Area", image: imgDispatch, icon: iconDispatch },
  { label: "Administration", image: imgAdmin, icon: iconAdmin },
];

export default function InfrastructureInside() {
  return (
    <section className="infra-inside" aria-labelledby="infra-inside-heading">
      <div className="infra-container">
        <header className="infra-section-head infra-inside__head">
          <h2 id="infra-inside-heading" className="infra-section-title infra-inside__title-main">
            Inside <span className="infra-accent">RAD Kabel</span>
          </h2>
        </header>

        <ul className="infra-inside__grid">
          {ITEMS.map(({ label, image, icon }) => (
            <li key={label} className="infra-inside__card">
              <img src={image} alt="" className="infra-inside__bg" decoding="async" loading="lazy" aria-hidden />
              <div className="infra-inside__overlay" aria-hidden />
              <div className="infra-inside__content">
                <span className="infra-inside__icon-wrap" aria-hidden>
                  <img src={icon} alt="" className="infra-inside__icon" decoding="async" />
                </span>
                <span className="infra-inside__label">{label}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
