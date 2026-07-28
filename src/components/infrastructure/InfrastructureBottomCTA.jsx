import { Link } from "react-router-dom";
import ctaBg from "../../assets/infrastructure/bottom/cta-bg.png";

export default function InfrastructureBottomCTA() {
  return (
    <section className="infra-bottom-cta" aria-labelledby="infra-bottom-cta-heading">
      <img src={ctaBg} alt="" className="infra-bottom-cta__bg" decoding="async" loading="lazy" aria-hidden />
      <div className="infra-bottom-cta__overlay" aria-hidden />

      <div className="infra-container infra-bottom-cta__grid">
        <div className="infra-bottom-cta__copy">
          <h2 id="infra-bottom-cta-heading" className="infra-bottom-cta__title">
            <span className="infra-bottom-cta__title-line">Precision.</span>{" "}
            <span className="infra-bottom-cta__title-line">
              <span className="infra-accent">Quality.</span>
            </span>{" "}
            <span className="infra-bottom-cta__title-line">Trust.</span>
          </h2>
          <div className="infra-bottom-cta__actions">
            <Link to="/dealer-network" className="infra-btn infra-btn--primary">
              Become a Dealer<span className="infra-btn__arrow" aria-hidden>&rarr;</span>
            </Link>
            <Link to="/contact-us" className="infra-btn infra-btn--outline">
              Contact Us<span className="infra-btn__arrow" aria-hidden>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
