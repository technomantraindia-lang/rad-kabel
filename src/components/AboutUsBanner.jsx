import iconPremiumQuality from "../assets/about-icons/premium-quality.png";
import iconAdvancedTechnology from "../assets/about-icons/advanced-technology.png";
import iconTrustedPartner from "../assets/about-icons/trusted-partner.png";
import iconCustomerSupport from "../assets/about-icons/customer-support.png";
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
    fit: true,
  },
  {
    icon: iconTrustedPartner,
    iconAlt: "Trusted partner",
    title: "Trusted Partner",
    desc: "Across The Globe",
    zoom: true,
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
          </div>
        </div>

        <div className="about-us-hero__features">
          <ul className="about-us-hero__feature-grid">
            {FEATURES.map(({ icon, iconAlt, title, desc, zoom, fit }) => (
              <li key={title} className="about-us-hero__feature">
                <span className="about-us-hero__feature-icon">
                  <img
                    src={icon}
                    alt={iconAlt}
                    className={[
                      "about-us-hero__feature-icon-img",
                      zoom ? "about-us-hero__feature-icon-img--zoom" : "",
                      fit ? "about-us-hero__feature-icon-img--fit" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    width={68}
                    height={68}
                    decoding="async"
                  />
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
