import heroBg from "../../assets/infrastructure/hero-banner.png";
import { IconDownload, IconPlay } from "./InfrastructureIcons.jsx";

export default function InfrastructureHero() {
  return (
    <section className="infra-hero" aria-labelledby="infra-hero-heading">
      <img src={heroBg} alt="" className="infra-hero__bg" decoding="async" fetchPriority="high" aria-hidden />
      <div className="infra-hero__shade" aria-hidden />

      <div className="infra-container infra-hero__inner">
        <div className="infra-hero__copy">
          <h1 id="infra-hero-heading" className="infra-hero__title">
            Built to <span className="infra-accent">Deliver.</span>
            <span className="infra-hero__title-line">
              Engineered to <span className="infra-accent">Scale.</span>
            </span>
          </h1>
          <p className="infra-hero__desc">
            Modern manufacturing infrastructure designed to ensure quality, consistency and dependable
            production.
          </p>
          <div className="infra-hero__actions">
            <a href="/videos/wq.mp4" className="infra-btn infra-btn--primary">
              <IconPlay className="infra-hero__btn-icon" />
              Factory Tour
            </a>
            <a href="/brochure.pdf" download className="infra-btn infra-btn--outline">
              <IconDownload className="infra-hero__btn-icon" />
              Download Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
