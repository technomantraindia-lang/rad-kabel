import { Link } from "react-router-dom";
import technologyBanner from "../../assets/technology-banner.png";

export default function TechnologyHero() {
  return (
    <section className="tech-hero" aria-labelledby="tech-hero-heading">
      <img
        src={technologyBanner}
        alt=""
        className="tech-hero__bg"
        decoding="async"
        fetchPriority="high"
        aria-hidden
      />
      <div className="tech-hero__shade" aria-hidden />
      <div className="tech-hero__energy" aria-hidden />

      <div className="tech-container tech-hero__inner">
        <div className="tech-hero__copy">
          <h1 id="tech-hero-heading" className="tech-hero__title">
            <span className="tech-hero__title-line">Engineering</span>
            <span className="tech-hero__title-line tech-hero__title-line--accent">Safety at</span>
            <span className="tech-hero__title-line">Every Layer.</span>
          </h1>
          <p className="tech-hero__desc">
            Advanced conductor design and precision manufacturing deliver reliable electrical performance
            engineered for safety, efficiency, and long-term durability in every installation.
          </p>
          <div className="tech-hero__actions">
            <Link to="/#products" className="tech-btn tech-btn--primary">
              Explore Products<span className="tech-btn__arrow" aria-hidden>&rarr;</span>
            </Link>
            <a href="/brochure.pdf" download className="tech-btn tech-btn--outline">
              Download Brochure
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
