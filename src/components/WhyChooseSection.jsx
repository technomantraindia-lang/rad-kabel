import iconPremiumCopper from "../assets/why-choose-icons/premium-copper.png";
import iconQualityControl from "../assets/why-choose-icons/quality-control.png";
import iconManufacturing from "../assets/why-choose-icons/manufacturing.png";
import iconSafety from "../assets/why-choose-icons/safety.png";
import iconPerformance from "../assets/why-choose-icons/performance.png";
import iconPartnerships from "../assets/why-choose-icons/partnerships.png";
import "./WhyChooseSection.css";

export const WHY_CHOOSE_ITEMS = [
  {
    icon: iconPremiumCopper,
    title: "Premium Copper",
    desc: "High-quality copper conductors for efficient and dependable power transmission.",
    alt: "Premium copper",
    iconScale: 1.18,
  },
  {
    icon: iconQualityControl,
    title: "Stringent Quality Control",
    desc: "Multiple rigorous testing stages at every step to ensure lasting reliability.",
    alt: "Stringent quality control",
    iconScale: 1.12,
  },
  {
    icon: iconManufacturing,
    title: "Manufacturing Excellence",
    desc: "Precision-driven production systems built for consistent manufacturing quality.",
    alt: "Manufacturing excellence",
    iconScale: 1.08,
  },
  {
    icon: iconSafety,
    title: "Safety Focused",
    desc: "Engineered and designed with uncompromising electrical safety at every stage.",
    alt: "Safety focused",
    iconScale: 0.78,
  },
  {
    icon: iconPerformance,
    title: "Consistent Performance",
    desc: "Stable and dependable operation you can trust across every installation.",
    alt: "Consistent performance",
    iconScale: 0.7,
  },
  {
    icon: iconPartnerships,
    title: "Trusted Partnerships",
    desc: "A growing network of trusted dealers and professional partners nationwide.",
    alt: "Trusted partnerships",
    iconScale: 1.16,
  },
];

export default function WhyChooseSection() {
  return (
    <section className="why-choose" data-au-section="why-choose" aria-labelledby="why-choose-heading">
      <div className="why-choose__inner">
        <header className="why-choose__header">
          <p className="why-choose__eyebrow">Why Choose RAD Kabel?</p>
          <h2 id="why-choose-heading" className="why-choose__title">
            Built Different. Built Better.
          </h2>
          <span className="au-energy-line" aria-hidden />
        </header>

        <ul className="why-choose__cards">
          {WHY_CHOOSE_ITEMS.map(({ icon, title, desc, alt, iconScale = 1 }) => (
            <li key={title} className="why-choose__card">
              <span className="why-choose__card-icon-wrap">
                <img
                  src={icon}
                  alt={alt}
                  className="why-choose__card-icon"
                  style={{ "--icon-scale": iconScale }}
                  decoding="async"
                />
              </span>
              <div className="why-choose__card-copy">
                <h3 className="why-choose__card-title">{title}</h3>
                <p className="why-choose__card-desc">{desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
