import iconConductor from "../../assets/precision-testing-icons/01_conductor_resistance_test.svg";
import iconSpark from "../../assets/precision-testing-icons/02_spark_test.svg";
import iconHighVoltage from "../../assets/precision-testing-icons/03_high_voltage_test.svg";
import iconInsulation from "../../assets/precision-testing-icons/04_insulation_test.svg";
import iconHeat from "../../assets/precision-testing-icons/05_heat_resistance_test.svg";
import iconMechanical from "../../assets/precision-testing-icons/06_mechanical_strength_test.svg";
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
  },
  {
    title: "Spark Test",
    description: ["Detects weak points", "in insulation"],
    image: panelSpark,
    icon: iconSpark,
    alt: "Spark testing on cable insulation",
  },
  {
    title: "High Voltage Test",
    description: ["Verifies insulation", "strength"],
    image: panelHighVoltage,
    icon: iconHighVoltage,
    alt: "High voltage withstand test",
  },
  {
    title: "Insulation Test",
    description: ["Ensures superior", "electrical insulation"],
    image: panelInsulation,
    icon: iconInsulation,
    alt: "Insulation quality testing",
  },
  {
    title: "Heat Resistance Test",
    description: ["Checks performance", "under high temperature"],
    image: panelHeat,
    icon: iconHeat,
    alt: "Heat resistance testing chamber",
  },
  {
    title: "Mechanical Strength Test",
    description: ["Ensures durability", "and reliability"],
    image: panelMechanical,
    icon: iconMechanical,
    alt: "Mechanical strength testing rig",
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
          {TESTS.map(({ title, description, image, icon, alt }) => (
            <li key={title} className="tech-testing__card">
              <div className="tech-testing__media">
                <img src={image} alt={alt} decoding="async" loading="lazy" />
              </div>
              <div className="tech-testing__meta">
                <img src={icon} alt="" className="tech-testing__icon" aria-hidden decoding="async" />
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
