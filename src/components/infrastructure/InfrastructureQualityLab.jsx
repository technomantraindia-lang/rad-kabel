import panel1 from "../../assets/infrastructure/quality-lab/panel-1-conductor-resistance.png";
import panel2 from "../../assets/infrastructure/quality-lab/panel-2-spark-test.png";
import panel3 from "../../assets/infrastructure/quality-lab/panel-3-high-voltage.png";
import panel4 from "../../assets/infrastructure/quality-lab/panel-4-insulation.png";
import panel5 from "../../assets/infrastructure/quality-lab/panel-5-heat-resistance.png";
import panel6 from "../../assets/infrastructure/quality-lab/panel-6-mechanical-strength.png";

const TESTS = [
  { title: "Conductor Resistance Test", image: panel1 },
  { title: "Spark Test", image: panel2 },
  { title: "High Voltage Test", image: panel3 },
  { title: "Insulation Test", image: panel4 },
  { title: "Heat Resistance Test", image: panel5 },
  { title: "Dimensional Verification", image: panel6 },
];

export default function InfrastructureQualityLab() {
  return (
    <section className="infra-quality" aria-labelledby="infra-quality-heading">
      <div className="infra-container infra-quality__layout">
        <div className="infra-quality__copy">
          <h2 id="infra-quality-heading" className="infra-quality__title">
            <span className="infra-quality__title-line infra-quality__title-line--white">QUALITY</span>
            <span className="infra-quality__title-line infra-quality__title-line--accent">
              CONTROL LAB
            </span>
          </h2>
          <p className="infra-quality__subtitle">
            <span>Every meter is tested.</span>
            <span>Every time.</span>
          </p>
          <span className="infra-quality__rule" aria-hidden />
        </div>

        <ul className="infra-quality__grid">
          {TESTS.map(({ title, image }) => (
            <li key={title} className="infra-quality__card">
              <div className="infra-quality__media">
                <img src={image} alt="" decoding="async" loading="lazy" aria-hidden />
              </div>
              <p className="infra-quality__label">{title}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
