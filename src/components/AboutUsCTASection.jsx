import { Link } from "react-router-dom";
import ctaBackground from "../assets/about-cta-background.png";
import "./AboutUsCTASection.css";

const CTA_TITLE = "Let's Build Safer Connections Together";

export default function AboutUsCTASection() {
  const titleWords = CTA_TITLE.split(" ");

  return (
    <section className="about-cta" data-au-section="cta" aria-labelledby="about-cta-heading">
      <img
        src={ctaBackground}
        alt=""
        className="about-cta__bg"
        decoding="async"
        loading="lazy"
        aria-hidden
      />
      <span className="au-cta-energy" aria-hidden />
      <div className="about-cta__overlay" aria-hidden />

      <div className="about-cta__inner">
        <div className="about-cta__spacer" aria-hidden />
        <div className="about-cta__copy">
          <h2 id="about-cta-heading" className="about-cta__title">
            {titleWords.map((word, index) => (
              <span key={`${word}-${index}`} className="au-mask-word">
                <span className="au-mask-word__inner">
                  {word}
                  {index < titleWords.length - 1 ? "\u00A0" : ""}
                </span>
              </span>
            ))}
          </h2>
          <p className="about-cta__text">
            Whether you are a dealer, contractor, builder or homeowner, RAD Kabel is committed to
            delivering dependable electrical solutions for every project.
          </p>

          <div className="about-cta__actions">
            <Link to="/dealer-network" className="about-cta__btn about-cta__btn--primary">
              Become a Dealer
              <span className="about-cta__btn-arrow" aria-hidden>
                →
              </span>
            </Link>
            <Link to="/contact-us" className="about-cta__btn about-cta__btn--outline">
              Contact Us
              <svg
                className="about-cta__btn-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
