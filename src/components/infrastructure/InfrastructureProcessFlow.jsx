import { Fragment } from "react";
import step1 from "../../assets/infrastructure/process/step-1-copper-rod.png";
import step2 from "../../assets/infrastructure/process/step-2-wire-drawing.png";
import step4 from "../../assets/ebeam-testing.png";
import step5 from "../../assets/infrastructure/process/step-5-testing.png";
import step6 from "../../assets/infrastructure/process/step-6-packaging.png";
import step7 from "../../assets/infrastructure/process/step-7-dispatch.png";

const STEPS = [
  { num: "01", title: "Copper Rod", image: step1 },
  { num: "02", title: "Wire Drawing", image: step2 },
  { num: "03", title: "E-BEAM testing", image: step4 },
  { num: "04", title: "Testing", image: step5 },
  { num: "05", title: "Packaging", image: step6 },
  { num: "06", title: "Dispatch", image: step7 },
];

function FlowArrow() {
  return (
    <span className="infra-process__arrow" aria-hidden>
      <svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M3.25 9.75 H9.6 V6.35 L20.75 12 L9.6 17.65 V14.25 H3.25 Z" />
      </svg>
    </span>
  );
}

export default function InfrastructureProcessFlow() {
  return (
    <section className="infra-process" aria-labelledby="infra-process-heading">
      <div className="infra-process__container">
        <header className="infra-section-head infra-section-head--center">
          <h2 id="infra-process-heading" className="infra-section-title">
            From <span className="infra-accent">Raw Material</span> to{" "}
            <span className="infra-accent">Finished Product</span>
          </h2>
        </header>

        <div className="infra-process__track">
          <div className="infra-process__visuals">
            {STEPS.map((step, index) => (
              <Fragment key={`visual-${step.title}`}>
                <div className="infra-process__media">
                  <span className="infra-process__num">{step.num}</span>
                  <img src={step.image} alt="" decoding="async" loading="lazy" aria-hidden />
                </div>
                {index < STEPS.length - 1 ? <FlowArrow /> : null}
              </Fragment>
            ))}
          </div>

          <div className="infra-process__labels">
            {STEPS.map((step) => (
              <h3 key={step.title} className="infra-process__title">
                {step.title}
              </h3>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
