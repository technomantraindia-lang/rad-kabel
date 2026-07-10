import imgCopper from "../../assets/infrastructure/ecosystem/copper-processing.png";
import imgInsulation from "../../assets/infrastructure/ecosystem/insulation-systems.png";
import imgQuality from "../../assets/infrastructure/ecosystem/quality-laboratories.png";
import imgPackaging from "../../assets/infrastructure/ecosystem/automated-packaging.png";
import iconCopper from "../../assets/infrastructure/ecosystem-icons/copper-processing.svg";
import iconInsulation from "../../assets/infrastructure/ecosystem-icons/insulation-systems.svg";
import iconQuality from "../../assets/infrastructure/ecosystem-icons/quality-laboratories.svg";
import iconPackaging from "../../assets/infrastructure/ecosystem-icons/automated-packaging.svg";

const ITEMS = [
  {
    title: "Copper Processing",
    description: "High precision conductor manufacturing",
    image: imgCopper,
    icon: iconCopper,
  },
  {
    title: "Insulation Systems",
    description: "Advanced insulation processing",
    image: imgInsulation,
    icon: iconInsulation,
  },
  {
    title: "Quality Laboratories",
    description: "Multi-stage testing facilities",
    image: imgQuality,
    icon: iconQuality,
  },
  {
    title: "Automated Packaging",
    description: "Consistent and secure packaging",
    image: imgPackaging,
    icon: iconPackaging,
  },
];

export default function InfrastructureEcosystem() {
  return (
    <section className="infra-ecosystem" aria-labelledby="infra-ecosystem-heading">
      <div className="infra-container">
        <header className="infra-section-head infra-ecosystem__head">
          <h2 id="infra-ecosystem-heading" className="infra-section-title infra-ecosystem__title-main">
            Our Manufacturing <span className="infra-accent">Ecosystem</span>
          </h2>
        </header>

        <ul className="infra-ecosystem__grid">
          {ITEMS.map(({ title, description, image, icon }) => (
            <li key={title} className="infra-ecosystem__card">
              <div className="infra-ecosystem__media">
                <img src={image} alt="" decoding="async" loading="lazy" aria-hidden />
              </div>
              <div className="infra-ecosystem__body">
                <span className="infra-ecosystem__icon-badge" aria-hidden>
                  <img src={icon} alt="" className="infra-ecosystem__icon" decoding="async" />
                </span>
                <div className="infra-ecosystem__copy">
                  <h3 className="infra-ecosystem__title">{title}</h3>
                  <p className="infra-ecosystem__desc">{description}</p>
                  <span className="infra-ecosystem__accent" aria-hidden />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
