import iconPremiumQuality from "../assets/about-icons/premium-quality.png";
import iconAdvancedTechnology from "../assets/about-icons/advanced-technology.png";
import iconTrustedPartner from "../assets/about-icons/trusted-partner.png";
import iconCustomerSupport from "../assets/about-icons/customer-support.png";
import AuIconRing from "./AuIconRing.jsx";
import "./AboutUsBanner.css";

const FEATURES = [
  {
    icon: iconPremiumQuality,
    iconAlt: "Premium quality",
    title: "Premium Quality",
    desc: "100% Tested & Certified",
  },
  {
    icon: iconAdvancedTechnology,
    iconAlt: "Advanced technology",
    title: "Advanced Technology",
    desc: "Superior Performance",
  },
  {
    icon: iconTrustedPartner,
    iconAlt: "Trusted partner",
    title: "Trusted Partner",
    desc: "Across The Globe",
  },
  {
    icon: iconCustomerSupport,
    iconAlt: "Customer support",
    title: "Customer Support",
    desc: "Always At Your Service",
  },
];

export default function AboutUsBanner() {
  return (
    <section className="about-us-hero hero-shell" data-au-section="hero" aria-label="About RAD Kabel">
      <div className="about-us-hero__media">
        <img
          src="/images/about-background.png"
          alt=""
          className="about-us-hero__bg"
          decoding="async"
          fetchPriority="high"
        />

        <div className="about-us-hero__shade" aria-hidden />

        <div className="about-us-hero__content">
          <div className="about-us-hero__copy">
            <h1 className="about-us-hero__title">
              <span>Engineering Trust.</span>
              <span className="about-us-hero__title-accent">Powering Tomorrow.</span>
            </h1>

            <div className="about-us-hero__divider" aria-hidden />

            <p className="about-us-hero__desc">
              RAD Kabel manufactures wide range of Wires &amp; Cables that live up to global quality
              standards and are trusted worldwide.
            </p>
            <div className="about-us-hero__actions">
              <a href="/#products" className="about-us-hero__btn about-us-hero__btn--primary">
                Explore Products<span className="about-us-hero__btn-arrow" aria-hidden>→</span>
              </a>
              <a href="/#contact" className="about-us-hero__btn about-us-hero__btn--outline">
                Contact Us<span className="about-us-hero__btn-arrow" aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="about-us-hero__features">
          <ul className="about-us-hero__feature-grid">
            {FEATURES.map(({ icon, iconAlt, title, desc }) => (
              <li key={title} className="about-us-hero__feature">
                <span className="about-us-hero__feature-icon">
                  <span className="au-icon-pulse" aria-hidden />
                  <AuIconRing />
                  <img src={icon} alt={iconAlt} className="about-us-hero__feature-icon-img" decoding="async" />
                </span>
                <span className="about-us-hero__feature-copy">
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
