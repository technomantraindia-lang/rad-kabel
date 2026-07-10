import iconAdvancedManufacturing from "../assets/about-icons/who-advanced-manufacturing.png";
import iconRawMaterials from "../assets/about-icons/who-raw-materials.png";
import iconQualityControl from "../assets/about-icons/who-quality-control.png";
import iconPanIndia from "../assets/about-icons/who-pan-india.png";
import iconCustomerFocused from "../assets/about-icons/who-customer-focused.png";
import whoWeAreFacility from "../assets/who-we-are-facility.png";
import "./WhoWeAreSection.css";

const HIGHLIGHTS = [
  {
    icon: iconAdvancedManufacturing,
    label: "Advanced Manufacturing",
    alt: "Advanced manufacturing",
  },
  {
    icon: iconRawMaterials,
    label: "Premium Raw Materials",
    alt: "Premium raw materials",
  },
  {
    icon: iconQualityControl,
    label: "Stringent Quality Control",
    alt: "Stringent quality control",
  },
  {
    icon: iconPanIndia,
    label: "Pan India Presence",
    alt: "Pan India presence",
  },
  {
    icon: iconCustomerFocused,
    label: "Customer Focused Approach",
    alt: "Customer focused approach",
  },
];

export default function WhoWeAreSection() {
  return (
    <section className="who-we-are" data-au-section="who-we-are" aria-labelledby="who-we-are-heading">
      <div className="who-we-are__grid">
        <div className="who-we-are__media">
          <img
            src={whoWeAreFacility}
            alt="RAD Kabel manufacturing facility"
            className="who-we-are__image"
            decoding="async"
            loading="lazy"
          />
        </div>

        <div className="who-we-are__copy">
          <p className="who-we-are__kicker">Who We Are</p>
          <h2 id="who-we-are-heading" className="who-we-are__title">
            <span>Committed to Quality.</span>
            <span>Driven by Innovation.</span>
          </h2>
          <div className="who-we-are__body">
            <p>
              RAD Kabel is a modern wire and cable manufacturing company committed to delivering
              high-performance electrical solutions built around safety, reliability and innovation.
            </p>
            <p>
              Driven by advanced manufacturing practices and stringent quality standards, we develop
              products designed to meet the evolving demands of homes, commercial spaces, industries
              and infrastructure projects.
            </p>
            <p>
              Every meter of RAD Kabel represents our commitment to quality, performance and
              long-term trust.
            </p>
          </div>
        </div>

        <ul className="who-we-are__highlights">
          {HIGHLIGHTS.map(({ icon, label, alt }, index) => (
            <li
              key={label}
              className={`who-we-are__highlight${index === 0 ? " who-we-are__highlight--first" : ""}`}
            >
              <span className="au-highlight-line" aria-hidden />
              <span className="who-we-are__highlight-icon">
                <img src={icon} alt={alt} className="who-we-are__highlight-icon-img" decoding="async" />
              </span>
              <span className="who-we-are__highlight-label">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
