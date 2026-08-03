import { Fragment } from "react";
import stepCopperRod from "../../assets/infrastructure/process/step-1-copper-rod.png";
import stepCopper from "../../assets/manufacturing-steps/step-1-copper-drawing.png";
import stepInsulation from "../../assets/manufacturing-steps/step-3-insulation.png";
import stepTesting from "../../assets/ebeam-testing.png";
import stepPackaging from "../../assets/manufacturing-steps/step-5-packaging.png";
import stepDispatch from "../../assets/manufacturing-steps/step-6-dispatch.png";

const STEPS = [
  {
    title: "Copper Rod",
    description: ["Electrolytic copper", "raw material stage"],
    image: stepCopperRod,
    alt: "Copper rod bundles",
  },
  {
    title: "Copper Drawing",
    description: ["High-precision drawing", "for uniform strands"],
    image: stepCopper,
    alt: "Copper drawing process",
  },
  {
    title: "Insulation",
    description: ["Advanced insulation", "extrusion system"],
    image: stepInsulation,
    alt: "Cable insulation extrusion",
  },
  {
    title: "E-BEAM testing",
    description: ["Multi-level quality", "verification"],
    image: stepTesting,
    alt: "E-BEAM testing",
  },
  {
    title: "Packaging",
    description: ["Automated coiling", "and packing"],
    image: stepPackaging,
    alt: "Cable packaging and coiling",
  },
  {
    title: "Dispatch",
    description: ["Safe and on-time", "delivery"],
    image: stepDispatch,
    alt: "Dispatch and delivery",
  },
];

function FlowArrow() {
  return (
    <span className="tech-flow__arrow-btn">
      <svg className="tech-flow__arrow" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="currentColor"
          d="M3.25 9.75 H9.6 V6.35 L20.75 12 L9.6 17.65 V14.25 H3.25 Z"
        />
      </svg>
    </span>
  );
}

export default function TechnologyManufacturingFlow() {
  return (
    <section className="tech-flow" aria-labelledby="tech-flow-heading">
      <div className="tech-flow__container">
        <header className="tech-section-head tech-section-head--center">
          <h2 id="tech-flow-heading" className="tech-section-title">
            Manufacturing <span className="tech-accent">Technology</span>
          </h2>
        </header>

        <div className="tech-flow__track">
          <div className="tech-flow__visuals">
            {STEPS.map((step, index) => (
              <Fragment key={`visual-${step.title}`}>
                <div className="tech-flow__media">
                  <img src={step.image} alt={step.alt} decoding="async" loading="lazy" />
                </div>
                {index < STEPS.length - 1 ? (
                  <div className="tech-flow__connector" aria-hidden>
                    <span className="tech-flow__connector-line" />
                    <FlowArrow />
                  </div>
                ) : null}
              </Fragment>
            ))}
          </div>

          <div className="tech-flow__details">
            {STEPS.map((step, index) => (
              <article key={step.title} className="tech-flow__step">
                <div className="tech-flow__meta">
                  <span className="tech-flow__num">{index + 1}</span>
                  <h3 className="tech-flow__title">{step.title}</h3>
                </div>
                <p className="tech-flow__desc">
                  <span className="tech-flow__desc-line">{step.description[0]}</span>
                  <span className="tech-flow__desc-line">{step.description[1]}</span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
