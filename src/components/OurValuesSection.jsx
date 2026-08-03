import iconIntegrity from "../assets/values-icons/integrity.png";
import iconExcellence from "../assets/values-icons/excellence.png";
import iconInnovation from "../assets/values-icons/innovation.png";
import iconResponsibility from "../assets/values-icons/responsibility.png";
import "./OurValuesSection.css";

const VALUES = [
  {
    icon: iconIntegrity,
    title: "Integrity",
    desc: "We build trust through transparency.",
    alt: "Integrity",
  },
  {
    icon: iconExcellence,
    title: "Excellence",
    desc: "We never compromise on quality.",
    alt: "Excellence",
  },
  {
    icon: iconInnovation,
    title: "Innovation",
    desc: "We embrace continuous improvement.",
    alt: "Innovation",
  },
  {
    icon: iconResponsibility,
    title: "Responsibility",
    desc: "Safety and reliability guide every decision.",
    alt: "Responsibility",
  },
];

export default function OurValuesSection() {
  return (
    <section className="our-values" data-au-section="values" aria-labelledby="our-values-heading">
      <div className="our-values__inner">
        <header className="our-values__header">
          <h2 id="our-values-heading" className="our-values__heading">
            Our Values
          </h2>
          <div className="our-values__rule" aria-hidden />
        </header>

        <ul className="our-values__cards">
          {VALUES.map(({ icon, title, desc, alt }) => (
            <li key={title} className="our-values__card">
              <span className="our-values__card-icon-wrap">
                <img src={icon} alt={alt} className="our-values__card-icon" decoding="async" />
              </span>
              <div className="our-values__card-copy">
                <h3 className="our-values__card-title">{title}</h3>
                <p className="our-values__card-desc">{desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
