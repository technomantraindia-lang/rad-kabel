import iconConductor from "../../assets/precision-testing-icons/conductor-resistance.png";
import iconSpark from "../../assets/precision-testing-icons/spark-test.png";
import iconHighVoltage from "../../assets/precision-testing-icons/high-voltage.png";
import iconInsulation from "../../assets/precision-testing-icons/insulation.png";
import iconHeat from "../../assets/precision-testing-icons/heat-resistance.png";
import iconMechanical from "../../assets/precision-testing-icons/mechanical-strength.png";
import panelConductor from "../../assets/precision-testing-panels/panel-1-conductor-resistance.png";
import panelSpark from "../../assets/precision-testing-panels/panel-2-spark-test.png";
import panelHighVoltage from "../../assets/precision-testing-panels/panel-3-high-voltage.png";
import panelInsulation from "../../assets/precision-testing-panels/panel-4-insulation.png";
import panelHeat from "../../assets/precision-testing-panels/panel-5-heat-resistance.png";
import panelMechanical from "../../assets/precision-testing-panels/panel-6-mechanical-strength.png";

const TESTS = [
  {
    title: "Conductor Resistance Test",
    description: ["Ensures low resistance", "and better conductivity"],
    image: panelConductor,
    icon: iconConductor,
    alt: "Conductor resistance testing equipment",
    iconScale: 1.05,
  },
  {
    title: "Spark Test",
    description: ["Detects weak points", "in insulation"],
    image: panelSpark,
    icon: iconSpark,
    alt: "Spark testing on cable insulation",
    iconScale: 0.82,
  },
  {
    title: "High Voltage Test",
    description: ["Verifies insulation", "strength"],
    image: panelHighVoltage,
    icon: iconHighVoltage,
    alt: "High voltage withstand test",
    iconScale: 0.78,
  },
  {
    title: "Insulation Test",
    description: ["Ensures superior", "electrical insulation"],
    image: panelInsulation,
    icon: iconInsulation,
    alt: "Insulation quality testing",
    iconScale: 1.08,
  },
  {
    title: "Heat Resistance Test",
    description: ["Checks performance", "under high temperature"],
    image: panelHeat,
    icon: iconHeat,
    alt: "Heat resistance testing chamber",
    iconScale: 1.22,
  },
  {
    title: "Mechanical Strength Test",
    description: ["Ensures durability", "and reliability"],
    image: panelMechanical,
    icon: iconMechanical,
    alt: "Mechanical strength testing rig",
    iconScale: 1.18,
  },
];

export default function TechnologyPrecisionTesting() {
  return (
    <section className="tech-testing" aria-labelledby="tech-testing-heading">
      <div className="tech-testing__container">
        <header className="tech-section-head tech-section-head--center">
          <h2 id="tech-testing-heading" className="tech-section-title">
            Precision <span className="tech-accent">Testing.</span> Uncompromised Quality.
          </h2>
        </header>

        <ul className="tech-testing__grid">
          {TESTS.map(({ title, description, image, icon, alt, iconScale = 1 }) => (
            <li key={title} className="tech-testing__card">
              <div className="tech-testing__media">
                <img src={image} alt={alt} decoding="async" loading="lazy" />
              </div>
              <div className="tech-testing__meta">
                <span className="tech-testing__icon-wrap">
                  <img
                    src={icon}
                    alt=""
                    className="tech-testing__icon"
                    style={{ "--icon-scale": iconScale }}
                    aria-hidden
                    decoding="async"
                  />
                </span>
                <h3 className="tech-testing__title">{title}</h3>
              </div>
              <p className="tech-testing__desc">
                <span className="tech-testing__desc-line">{description[0]}</span>
                <span className="tech-testing__desc-line">{description[1]}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
