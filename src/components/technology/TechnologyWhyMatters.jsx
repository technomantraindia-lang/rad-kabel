import iconSafety from "../../assets/why-matters-icons/safety.svg";
import iconEfficiency from "../../assets/why-matters-icons/efficiency.svg";
import iconReliability from "../../assets/why-matters-icons/reliability.svg";
import iconDurability from "../../assets/why-matters-icons/durability.svg";
import panelSafety from "../../assets/why-matters-panels/panel-safety.png";
import panelEfficiency from "../../assets/why-matters-panels/panel-efficiency.png";
import panelReliability from "../../assets/why-matters-panels/panel-reliability.png";
import panelDurability from "../../assets/why-matters-panels/panel-durability.png";

const ITEMS = [
  {
    icon: iconSafety,
    panel: panelSafety,
    title: "Safety",
    description: ["Protecting lives and", "property with advanced", "technology."],
  },
  {
    icon: iconEfficiency,
    panel: panelEfficiency,
    title: "Efficiency",
    description: ["Optimized electrical", "performance for maximum", "efficiency."],
  },
  {
    icon: iconReliability,
    panel: panelReliability,
    title: "Reliability",
    description: ["Consistent operation", "you can depend on,", "every time."],
  },
  {
    icon: iconDurability,
    panel: panelDurability,
    title: "Durability",
    description: ["Built to last with", "high-quality materials", "and engineering."],
  },
];

export default function TechnologyWhyMatters() {
  return (
    <section className="tech-matters" aria-labelledby="tech-matters-heading">
      <div className="tech-matters__wave" aria-hidden />
      <div className="tech-matters__container">
        <header className="tech-section-head tech-section-head--center">
          <h2 id="tech-matters-heading" className="tech-section-title">
            Why <span className="tech-accent">Technology</span> Matters
          </h2>
        </header>

        <ul className="tech-matters__grid">
          {ITEMS.map(({ icon, panel, title, description }) => (
            <li
              key={title}
              className="tech-matters__card"
              style={{ "--tech-matters-panel": `url(${panel})` }}
            >
              <div className="tech-matters__card-body">
                <img src={icon} alt="" className="tech-matters__icon" decoding="async" aria-hidden />
                <div className="tech-matters__copy">
                  <h3 className="tech-matters__title">{title}</h3>
                  <p className="tech-matters__desc">
                    {description.map((line) => (
                      <span key={line} className="tech-matters__desc-line">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
