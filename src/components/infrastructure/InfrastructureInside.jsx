import imgFloor from "../../assets/infrastructure/inside/manufacturing-floor-new.jpeg";
import imgLines from "../../assets/infrastructure/inside/production-lines-new.jpeg";
import imgLab from "../../assets/infrastructure/inside/quality-control-lab-new.jpeg";
import imgPackaging from "../../assets/infrastructure/inside/packaging-unit-new.png";
import imgDispatch from "../../assets/infrastructure/inside/dispatch-area-new.png";
import imgAdmin from "../../assets/infrastructure/inside/administration-new.jpeg";
import iconFloor from "../../assets/infrastructure/inside-icons/manufacturing-floor.png";
import iconLines from "../../assets/infrastructure/inside-icons/production-lines.png";
import iconLab from "../../assets/infrastructure/inside-icons/quality-control-lab.png";
import iconPackaging from "../../assets/infrastructure/inside-icons/packaging-unit.png";
import iconDispatch from "../../assets/infrastructure/inside-icons/dispatch-area.png";
import iconAdmin from "../../assets/infrastructure/inside-icons/administration.png";

const ITEMS = [
  { label: "Manufacturing Floor", image: imgFloor, icon: iconFloor, iconScale: 0.85 },
  { label: "Production Lines", image: imgLines, icon: iconLines, iconScale: 0.82 },
  { label: "Quality Control Lab", image: imgLab, icon: iconLab, iconScale: 0.92 },
  { label: "Packaging Unit", image: imgPackaging, icon: iconPackaging, iconScale: 0.8 },
  { label: "Dispatch Area", image: imgDispatch, icon: iconDispatch, iconScale: 0.9 },
  { label: "Administration", image: imgAdmin, icon: iconAdmin, iconScale: 0.8 },
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
          {ITEMS.map(({ label, image, icon, iconScale = 1 }) => (
            <li key={label} className="infra-inside__card">
              <img src={image} alt="" className="infra-inside__bg" decoding="async" loading="lazy" aria-hidden />
              <div className="infra-inside__overlay" aria-hidden />
              <div className="infra-inside__content">
                <span className="infra-inside__icon-wrap" aria-hidden>
                  <img
                    src={icon}
                    alt=""
                    className="infra-inside__icon"
                    style={{ "--icon-scale": iconScale }}
                    decoding="async"
                  />
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
