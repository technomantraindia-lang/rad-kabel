import { Link, useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";
import { ArrowRight, Download, ExternalLink, Check, Star } from "lucide-react";

import "./ProductsPage.css";
import useProductsPageAnimations from "../hooks/useProductsPageAnimations.js";
import tapeBanner from "../assets/products-page/product-banner-section.png";
import visualZero from "../assets/rad-tape-pro/rad-box-both-glow.png";
import visualPower from "../assets/rad-tape-pro/visual-power.png";
import visualFlex from "../assets/rad-tape-pro/visual-flex.png";
import visualTape from "../assets/rad-tape-pro/red-tape-without-background.png";
import ctaBg from "../assets/rad-tape-pro/cta-bg.png";
import iconReliable from "../assets/why-choose-premium/reliable.png";
import iconAdvanced from "../assets/why-choose-premium/advanced.png";
import iconDurable from "../assets/why-choose-premium/durable.png";
import iconSafe from "../assets/why-choose-premium/safe.png";
import iconNoFire from "../assets/product-card-icons/3.png";
import iconFireShield from "../assets/product-card-icons/5.png";
import iconElectricWarning from "../assets/product-card-icons/6.png";
import iconPanelMeter from "../assets/product-card-icons/12.png";
import iconBuildingChecklist from "../assets/product-card-icons/15.png";
import iconFactoryPlant from "../assets/product-card-icons/16.png";
import iconPowerFlow from "../assets/product-card-icons/17.png";
import iconDurabilityBar from "../assets/product-card-icons/18.png";
import iconQualityLab from "../assets/product-card-icons/24.png";
import iconWorkerShield from "../assets/product-card-icons/29.png";
import iconShieldCheck from "../assets/product-card-icons/31.png";
import iconExtinguisher from "../assets/product-card-icons/32.png";
import iconSpool from "../assets/product-card-icons/38.png";
import iconFistShield from "../assets/product-card-icons/50.png";
import iconGearClock from "../assets/product-card-icons/51.png";
import iconServiceGrowth from "../assets/product-card-icons/52.png";
import iconPerformanceGear from "../assets/product-card-icons/53.png";
import { handleDownloadBrochure } from "../utils/downloadBrochure";

const BROCHURE_URL = "/brochure.pdf";

const WHY_CHOOSE = [
  {
    icon: iconReliable,
    title: "Reliable",
    desc: "Consistent performance you can trust.",
  },
  {
    icon: iconAdvanced,
    title: "Advanced",
    desc: "Modern technology for better safety and efficiency.",
  },
  {
    icon: iconDurable,
    title: "Durable",
    desc: "Built for long service life under all conditions.",
  },
  {
    icon: iconSafe,
    title: "Safe",
    desc: "Enhanced protection for you and your loved ones.",
  },
];

const COMPARE_PRODUCTS = ["RAD ZERO", "RAD POWER", "RAD FLEX", "RAD TAPE PRO"];

const COMPARE_ROWS = [
  {
    feature: "Fire Safety",
    ratings: [5, 4, 5, 3],
  },
  {
    feature: "Flexibility",
    ratings: [5, 4, 5, null],
  },
  {
    feature: "Industrial Use",
    ratings: [5, 3, 5, 3],
  },
  {
    feature: "Residential Use",
    ratings: [5, 5, 4, 5],
  },
];

function StarRating({ value }) {
  if (value == null) {
    return <span className="rtp-compare__na">N/A</span>;
  }

  return (
    <span className="rtp-compare__stars" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < value;
        return (
          <Star
            key={i}
            size={18}
            strokeWidth={1.6}
            className={filled ? "is-on" : "is-off"}
            fill={filled ? "currentColor" : "none"}
            aria-hidden
          />
        );
      })}
    </span>
  );
}

const PRODUCT_CARDS = [
  {
    id: "zero",
    index: "01",
    brand: "RAD",
    name: "ZERO",
    subtitle: "Premium Fire Safe Wire",
    tagline: "Zero Smoke. Zero Compromise.",
    image: visualZero,
    imageAlt: "RAD ZERO red cable coil",
    href: "/products/rad-zero",
    highlights: [
      { iconSrc: iconFireShield, label: "Fire Resistant" },
      { iconSrc: iconNoFire, label: "Low Smoke" },
      { iconSrc: iconShieldCheck, label: "High Safety" },
      { iconSrc: iconGearClock, label: "Long Life Durability" },
    ],
    features: [
      "Enhanced Fire Resistance",
      "Better Thermal Stability",
      "High Conductivity",
      "Long Service Life",
    ],
    apps: [
      { iconSrc: iconBuildingChecklist, label: "Homes" },
      { iconSrc: iconQualityLab, label: "Hospitals" },
      { iconSrc: iconWorkerShield, label: "Schools" },
      { iconSrc: iconFactoryPlant, label: "Commercial Buildings" },
    ],
  },
  {
    id: "power",
    index: "02",
    brand: "RAD",
    name: "POWER",
    subtitle: "High Performance House Wire",
    tagline: "Built For Everyday Power.",
    image: visualPower,
    imageAlt: "RAD POWER yellow cable coil",
    href: "/products/rad-power",
    highlights: [
      { iconSrc: iconPowerFlow, label: "High Current Capacity" },
      { iconSrc: iconSpool, label: "Smooth Pulling" },
      { iconSrc: iconElectricWarning, label: "Flexible Conductor" },
      { iconSrc: iconShieldCheck, label: "Stable Performance" },
    ],
    features: [
      "High Current Capacity",
      "Smooth Pulling",
      "Flexible Conductor",
      "Stable Performance",
    ],
    apps: [
      { iconSrc: iconBuildingChecklist, label: "Residential" },
      { iconSrc: iconFactoryPlant, label: "Commercial" },
      { iconSrc: iconWorkerShield, label: "Builders" },
    ],
    comingSoon: true,
  },
  {
    id: "flex",
    index: "03",
    brand: "RAD",
    name: "FLEX",
    subtitle: "Industrial Flexible Cable",
    tagline: "Flexibility Without Limits.",
    image: visualFlex,
    imageAlt: "RAD FLEX black cable coil",
    href: "/products/rad-flex",
    highlights: [
      { iconSrc: iconFistShield, label: "Heavy Duty Usage" },
      { iconSrc: iconFactoryPlant, label: "Industrial Grade" },
      { iconSrc: iconServiceGrowth, label: "Easy Installation" },
      { iconSrc: iconDurabilityBar, label: "Durable Construction" },
    ],
    features: [
      "Heavy Duty Usage",
      "Industrial Grade",
      "Easy Installation",
      "Durable Construction",
    ],
    apps: [
      { iconSrc: iconPerformanceGear, label: "Machines" },
      { iconSrc: iconFactoryPlant, label: "Factories" },
      { iconSrc: iconPanelMeter, label: "Panels" },
    ],
    comingSoon: true,
  },
  {
    id: "tape-pro",
    index: "04",
    brand: "RAD",
    name: "TAPE PRO",
    subtitle: "Professional Insulation Tape",
    tagline: "The Final Layer Of Protection.",
    image: visualTape,
    imageAlt: "RAD TAPE PRO premium insulation tape",
    href: "/products/rad-tape-pro",
    highlights: [
      { iconSrc: iconFistShield, label: "Strong Adhesion" },
      { iconSrc: iconExtinguisher, label: "Flame Retardant" },
      { iconSrc: iconShieldCheck, label: "Excellent Insulation" },
      { iconSrc: iconGearClock, label: "Long Lasting Performance" },
    ],
    features: [
      "Strong Adhesion",
      "Flame Retardant",
      "Excellent Insulation",
      "Long Lasting Performance",
    ],
    apps: [
      { iconSrc: iconElectricWarning, label: "Electrical Installation" },
      { iconSrc: iconServiceGrowth, label: "Maintenance" },
      { iconSrc: iconPerformanceGear, label: "Repairs" },
    ],
  },
];

function ProductCard({
  index,
  brand,
  name,
  subtitle,
  tagline,
  image,
  imageAlt,
  href,
  highlights,
  features,
  apps,
  comingSoon = false,
}) {
  const cta = comingSoon ? (
    <>Common Soon</>
  ) : (
    <>
      View Product <ArrowRight size={18} strokeWidth={2.2} aria-hidden />
    </>
  );

  return (
    <article className={`rtp-pcard${comingSoon ? " rtp-pcard--coming-soon" : ""}`}>
      {comingSoon ? (
        <div className="rtp-pcard__soon-badge" aria-label={`${brand} ${name} common soon`}>
          Common Soon
        </div>
      ) : null}
      <header className="rtp-pcard__head">
        <span className="rtp-pcard__index" aria-hidden>
          {index}
        </span>
        <div className="rtp-pcard__titles">
          <h3 className="rtp-pcard__name">
            <span className="rtp-pcard__brand">{brand}</span>{" "}
            <span className="rtp-accent">{name}</span>
          </h3>
          <p className="rtp-pcard__subtitle">{subtitle}</p>
          <p className="rtp-pcard__tagline">{tagline}</p>
        </div>
      </header>

      <div className="rtp-pcard__visual">
        <img src={image} alt={imageAlt} decoding="async" loading="lazy" />
      </div>

      <ul className="rtp-pcard__highlights">
        {highlights.map(({ iconSrc, label }) => (
          <li key={label}>
            <span className="rtp-pcard__h-icon" aria-hidden>
              <img src={iconSrc} alt="" loading="lazy" decoding="async" />
            </span>
            <span>{label}</span>
          </li>
        ))}
      </ul>

      <div className="rtp-pcard__block">
        <p className="rtp-pcard__label">Key Features</p>
        <ul className="rtp-pcard__features">
          {features.map((item) => (
            <li key={item}>
              <span className="rtp-pcard__check" aria-hidden>
                <Check size={12} strokeWidth={3} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="rtp-pcard__block">
        <p className="rtp-pcard__label">Applications</p>
        <ul className="rtp-pcard__apps">
          {apps.map(({ iconSrc, label }) => (
            <li key={label}>
              <span className="rtp-pcard__a-icon" aria-hidden>
                <img src={iconSrc} alt="" loading="lazy" decoding="async" />
              </span>
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>

      {comingSoon ? (
        <span className="rtp-pcard__cta rtp-pcard__cta--disabled" aria-disabled="true">
          {cta}
        </span>
      ) : href.startsWith("#") ? (
        <a href={href} className="rtp-pcard__cta">
          {cta}
        </a>
      ) : (
        <Link to={href} className="rtp-pcard__cta">
          {cta}
        </Link>
      )}
    </article>
  );
}

export default function ProductsPage() {
  const pageRef = useRef(null);
  const location = useLocation();
  useProductsPageAnimations(pageRef);

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        setTimeout(() => {
          elem.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 150);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.hash, location.pathname]);

  return (
    <main ref={pageRef} className="rtp-page products-page">
      {/* Banner */}
      <section className="rtp-hero" aria-labelledby="rtp-hero-heading">
        <div className="rtp-hero__bg" aria-hidden>
          <img src={tapeBanner} alt="" decoding="async" fetchPriority="high" />
        </div>
        <div className="rtp-hero__shade" aria-hidden />

        <div className="rtp-container">
          <nav className="rtp-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="rtp-breadcrumb-sep">›</span>
            <span className="rtp-breadcrumb-current">Products</span>
          </nav>

          <div className="rtp-hero__inner">
            <div className="rtp-hero__copy">
              <h1 id="rtp-hero-heading" className="rtp-hero__title">
                <span className="rtp-hero__title-line">ONE BRAND. COMPLETE</span>
                <span className="rtp-hero__title-line">
                  <span className="rtp-accent">WIRING</span> SOLUTIONS.
                </span>
              </h1>
              <p className="rtp-hero__desc">
                From premium fire-safe house wires to industrial flexible cables and professional
                insulation tapes, RAD KABEL delivers solutions engineered for performance, safety,
                and reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product cards — coded to match design */}
      <section id="rtp-cards" className="rtp-cards" aria-labelledby="rtp-cards-heading">
        <div className="rtp-container">
          <header className="rtp-cards__header">
            <h2 id="rtp-cards-heading" className="rtp-section-title">
              OUR <span className="rtp-accent">PRODUCTS</span>
            </h2>
            <p className="rtp-cards__desc">
              Complete wiring solutions engineered for performance, safety, and reliability.
            </p>
          </header>

          <ul className="rtp-cards__grid">
            {PRODUCT_CARDS.map((card) => (
              <li key={card.id} id={card.id} className="rtp-cards__item">
                <ProductCard {...card} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why Choose RAD Kabel — single-row strip */}
      <section className="rtp-choose" aria-labelledby="rtp-choose-heading">
        <div className="rtp-container">
          <h2 id="rtp-choose-heading" className="rtp-choose__title">
            WHY CHOOSE <span className="rtp-accent">RAD KABEL?</span>
          </h2>
          <ul className="rtp-choose__row">
            {WHY_CHOOSE.map(({ icon, title, desc }) => (
              <li key={title} className="rtp-choose__item">
                <span className="rtp-choose__icon" aria-hidden>
                  <img src={icon} alt="" decoding="async" />
                </span>
                <div className="rtp-choose__copy">
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Product Comparison */}
      <section className="rtp-compare" aria-labelledby="rtp-compare-heading">
        <div className="rtp-container">
          <h2 id="rtp-compare-heading" className="rtp-compare__title">
            PRODUCT <span className="rtp-accent">COMPARISON</span>
          </h2>

          <div className="rtp-compare__frame">
            <table className="rtp-compare__table">
              <thead>
                <tr>
                  <th scope="col">Features</th>
                  {COMPARE_PRODUCTS.map((name) => (
                    <th key={name} scope="col">
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map(({ feature, ratings }) => (
                  <tr key={feature}>
                    <th scope="row">{feature}</th>
                    {ratings.map((value, idx) => (
                      <td key={`${feature}-${COMPARE_PRODUCTS[idx]}`}>
                        <StarRating value={value} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="rtp-cta" className="rtp-cta" aria-labelledby="rtp-cta-heading">
        <div className="rtp-cta__bg" aria-hidden>
          <img src={ctaBg} alt="" decoding="async" loading="lazy" />
        </div>
        <div className="rtp-cta__shade" aria-hidden />

        <div className="rtp-container rtp-cta__layout">
          <div className="rtp-cta__content">
            <h2 id="rtp-cta-heading" className="rtp-cta__title">
              <span className="rtp-cta__title-line">ENGINEERED FOR</span>
              <span className="rtp-cta__title-line rtp-accent">EVERY CONNECTION.</span>
            </h2>

            <p className="rtp-cta__desc">
              Discover the complete RAD KABEL product portfolio and find the right solution for every
              project. Quality, safety and performance – that&apos;s our promise.
            </p>

            <div className="rtp-cta__actions">
              <Link to="/contact-us" className="rtp-btn rtp-btn--primary">
                Contact Sales <ArrowRight size={16} aria-hidden />
              </Link>
              <Link to="/dealer-network" className="rtp-btn rtp-btn--outline">
                Become a Dealer <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
