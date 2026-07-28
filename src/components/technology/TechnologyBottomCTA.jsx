import { Link } from "react-router-dom";
import ctaBackground from "../../assets/tech-bottom-cta-bg.png";

export default function TechnologyBottomCTA() {
  return (
    <section className="tech-bottom-cta" aria-labelledby="tech-bottom-cta-heading">
      <img
        src={ctaBackground}
        alt=""
        className="tech-bottom-cta__bg"
        decoding="async"
        loading="lazy"
        aria-hidden
      />
      <div className="tech-bottom-cta__overlay" aria-hidden />

      <div className="tech-container tech-bottom-cta__grid">
        <div className="tech-bottom-cta__spacer" aria-hidden />

        <div className="tech-bottom-cta__copy">
          <h2 id="tech-bottom-cta-heading" className="tech-bottom-cta__title">
            Innovation in <span className="tech-accent">Every Connection.</span>
          </h2>
          <p className="tech-bottom-cta__desc">
            Experience advanced cable technology engineered for safety, performance, and trust in every
            project.
          </p>
          <div className="tech-bottom-cta__actions">
            <Link to="/products" className="tech-btn tech-btn--primary">
              Explore Products<span className="tech-btn__arrow" aria-hidden>&rarr;</span>
            </Link>
            <Link to="/dealer-network" className="tech-btn tech-btn--outline">
              Become a Dealer<span className="tech-btn__arrow" aria-hidden>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
