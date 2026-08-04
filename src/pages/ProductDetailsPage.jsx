import { Link, useLocation } from "react-router-dom";
import { useRef } from "react";
import {
  ArrowRight,
  Cable,
  Check,
  FileText,
  Layers,
  Package,
  Palette,
  Stamp,
  Zap,
} from "lucide-react";
import "./ProductDetailsPage.css";
import useProductDetailsPageAnimations from "../hooks/useProductDetailsPageAnimations.js";

import zeroCables from "../assets/product-page/wire-single-so-make.png";
import ctaSectionProduct from "../assets/product-page/cta-section-product.png";
import ebeamWithout from "../assets/ebeam-without.png";
import ebeamWith from "../assets/with-e-beam.png";
import stripFireResistant from "../assets/product-page/hero-strip-icons/fire-resistant.png";
import stripThermal from "../assets/product-page/hero-strip-icons/thermal-stability.png";
import stripLongLife from "../assets/product-page/hero-strip-icons/long-life.png";
import stripPremiumCopper from "../assets/product-page/hero-strip-icons/premium-copper.png";
import stripConductivity from "../assets/product-page/hero-strip-icons/high-conductivity.png";
import uniqueIconFire from "../assets/product-page/unique-feature-icons/high-fire-resistance.png";
import uniqueIconNoMelt from "../assets/product-page/unique-feature-icons/no-melt-no-drip.png";
import uniqueIconLowSmoke from "../assets/product-page/unique-feature-icons/low-smoke-emission.png";
import uniqueIconAntiRodent from "../assets/product-page/unique-feature-icons/anti-rodent-protection.png";
import uniqueIconCopper from "../assets/product-page/unique-feature-icons/premium-copper.png";
import uniqueIconLongLife from "../assets/product-page/unique-feature-icons/long-service-life.png";
import uniqueIconSelfExtinguish from "../assets/product-page/unique-feature-icons/self-extinguishing.png";
import uniqueIconPowerEfficiency from "../assets/product-page/unique-feature-icons/better-power-efficiency.png";

import safetyImgHomes from "../assets/product-page/safety-matters/safety-1.png";
import safetyImgHospitals from "../assets/product-page/safety-matters/safety-2.png";
import safetyImgSchools from "../assets/product-page/safety-matters/safety-3.png";
import safetyImgHotels from "../assets/product-page/safety-matters/safety-4.png";
import safetyImgStadiums from "../assets/product-page/safety-matters/safety-5.png";
import safetyImgCommercial from "../assets/product-page/safety-matters/safety-6.png";

import safetyIconHomes from "../assets/product-page/safety-matters/icons/homes.svg";
import safetyIconHospitals from "../assets/product-page/safety-matters/icons/hospitals.svg";
import safetyIconSchools from "../assets/product-page/safety-matters/icons/schools.svg";
import safetyIconHotels from "../assets/product-page/safety-matters/icons/hotels.svg";
import safetyIconStadiums from "../assets/product-page/safety-matters/icons/stadiums.svg";
import safetyIconCommercial from "../assets/product-page/safety-matters/icons/commercial_buildings.svg";

import featureIconHeat from "../assets/product-page/feature-cards/heat-resistance.png";
import featureIconCopper from "../assets/product-page/feature-cards/pure-copper.png";
import featureIconFire from "../assets/product-page/feature-cards/fire-retardant.png";
import featureIconLongLife from "../assets/product-page/feature-cards/long-life.png";

import certIsi from "../assets/certifications/white-icons/isi-certified.png";
import certRohs from "../assets/certifications/white-icons/rohs-compliant.png";
import certReach from "../assets/certifications/reach.png";
import certCe from "../assets/certifications/white-icons/ce-certified.png";
import certQuality from "../assets/certifications/quality-tested.svg";
import dlBrochure from "../assets/product-page/cert-dl-icons/product_brochure_pdf.svg";
import dlDatasheet from "../assets/product-page/cert-dl-icons/technical_datasheet_pdf.svg";
import dlInstall from "../assets/product-page/cert-dl-icons/installation_guide_pdf.svg";
import dlCerts from "../assets/product-page/cert-dl-icons/certifications_pdf.svg";


import whyCardPremiumCopper from "../assets/product-page/why-rad-zero-cards/premium-copper.png";
import whyCardQualityControl from "../assets/product-page/why-rad-zero-cards/quality-control.png";
import whyCardManufacturing from "../assets/product-page/why-rad-zero-cards/manufacturing-excellence.png";
import whyCardSafety from "../assets/product-page/why-rad-zero-cards/safety-focused.png";
import whyCardPerformance from "../assets/product-page/why-rad-zero-cards/consistent-performance.png";
import whyCardPartnerships from "../assets/product-page/why-rad-zero-cards/trusted-partnerships.png";
import CableVideosSection from "../components/CableVideosSection.jsx";
import { handleDownloadBrochure } from "../utils/downloadBrochure";

const BROCHURE_URL = "/brochure.pdf";

const HERO_FEATURES = [
  { icon: stripFireResistant, label: "Fire Resistant" },
  { icon: stripThermal, label: "Better Thermal Stability" },
  { icon: stripLongLife, label: "Long Life" },
  { icon: stripPremiumCopper, label: "Premium Copper" },
  { icon: stripConductivity, label: "High Conductivity" },
];

const WHY_RAD_ZERO = [
  {
    icon: whyCardPremiumCopper,
    title: "PREMIUM COPPER",
    desc: "High-quality copper conductors for efficient and dependable power transmission.",
  },
  {
    icon: whyCardQualityControl,
    title: "STRINGENT QUALITY CONTROL",
    desc: "Multiple rigorous testing stages at every step to ensure lasting reliability.",
  },
  {
    icon: whyCardManufacturing,
    title: "MANUFACTURING EXCELLENCE",
    desc: "Precision-driven production systems built for consistent manufacturing quality.",
  },
  {
    icon: whyCardSafety,
    title: "SAFETY FOCUSED",
    desc: "Engineered and designed with uncompromising electrical safety at every stage.",
  },
  {
    icon: whyCardPerformance,
    title: "CONSISTENT PERFORMANCE",
    desc: "Stable and dependable operation you can trust across every installation.",
  },
  {
    icon: whyCardPartnerships,
    title: "TRUSTED PARTNERSHIPS",
    desc: "A growing network of trusted dealers and professional partners nationwide.",
  },
];

const FEATURE_CHECKS = [
  "Thermal Stability",
  "Mechanical Strength",
  "Fire Resistance",
  "Extended Insulation Life",
];

const FEATURE_CARDS = [
  {
    icon: featureIconHeat,
    value: "350°C",
    title: "DOES NOT MELT",
    desc: "Insulation does not melt upto 350°C",
  },
  {
    icon: featureIconCopper,
    value: "99.9%",
    title: "PURE COPPER",
    desc: "100% Electrolytic Copper for maximum conductivity",
  },
  {
    icon: featureIconFire,
    value: "120°C",
    title: "FIRE RETARDANT",
    desc: "High Temperature Safe upto 120°C",
  },
  {
    icon: featureIconLongLife,
    value: "LONG LIFE",
    title: "DURABILITY",
    desc: "50 Years of trusted performance",
  },
];

const UNIQUE_FEATURES = [
  { icon: uniqueIconFire, label: "High Fire Resistance" },
  { icon: uniqueIconNoMelt, label: "No Melt No Drip" },
  { icon: uniqueIconLowSmoke, label: "Low Smoke Emission" },
  { icon: uniqueIconAntiRodent, label: "Anti-Rodent & Anti-Termite" },
  { icon: uniqueIconCopper, label: "Premium Copper" },
  { icon: uniqueIconLongLife, label: "Long Service Life" },
  { icon: uniqueIconSelfExtinguish, label: "Self Extinguishing" },
  { icon: uniqueIconPowerEfficiency, label: "Better Power Efficiency" },
];

const SAFETY_PLACES = [
  { image: safetyImgHomes, icon: safetyIconHomes, label: "Homes" },
  { image: safetyImgHospitals, icon: safetyIconHospitals, label: "Hospitals" },
  { image: safetyImgSchools, icon: safetyIconSchools, label: "Schools" },
  { image: safetyImgHotels, icon: safetyIconHotels, label: "Hotels" },
  { image: safetyImgStadiums, icon: safetyIconStadiums, label: "Stadiums" },
  { image: safetyImgCommercial, icon: safetyIconCommercial, label: "Commercial Buildings" },
];

const TECH_SPECS = [
  { icon: Zap, label: "Voltage Grade", value: "Up to and including 1100V" },
  { icon: Cable, label: "Conductor", value: "Electrolytic Copper" },
  { icon: Layers, label: "Insulation", value: "ZHFR Grade" },
  {
    icon: Palette,
    label: "Colour Options",
    value: "Red, Yellow, Blue, Black, Green, Grey & White",
  },
  {
    icon: Stamp,
    label: "Marking",
    value: 'The cables are printed with marking of "RAD ZERO E-BEAM TECHNOLOGY".',
  },
  {
    icon: Package,
    label: "Packing",
    value:
      "90 mt. coil in packet in protective carton. 180 mt. project packing is also available.",
  },
];

const CAPACITY_ROWS = [
  ["1.00", "14/0.3", "2.6", "18", "23", "18.1"],
  ["1.50", "22/0.3", "3.0", "24", "30", "12.1"],
  ["2.50", "36/0.3", "3.7", "33", "41", "7.41"],
  ["4.00", "56/0.3", "4.1", "45", "55", "4.95"],
];

const COMPARE_ROWS = [
  {
    icon: uniqueIconFire,
    feature: "High Fire Resistance",
    rad: "High fire-resistance due to E-Beam cross-linked insulation.",
    competitor: "Standard PVC, lower fire resistance.",
  },
  {
    icon: uniqueIconNoMelt,
    feature: "No Melt No Drip",
    rad: "Insulation does not melt or drip when exposed to flame.",
    competitor: "PVC insulation melts, drips, and can spread fire.",
  },
  {
    icon: uniqueIconLowSmoke,
    feature: "Smoke Emission",
    rad: "Produces negligible, transparent, non-toxic smoke.",
    competitor: "Thick black toxic smoke common in PVC wires.",
  },
  {
    icon: uniqueIconSelfExtinguish,
    feature: "Self Extinguishing",
    rad: "Insulation is self-extinguishing and flame-retardant.",
    competitor: "Many wires continue burning after ignition.",
  },
  {
    icon: whyCardSafety,
    feature: "Safety for Fire Victims",
    rad: "Low smoke + non-toxicity reduces suffocation risk.",
    competitor: "High smoke + toxic gases create escape difficulty.",
  },
  {
    icon: uniqueIconCopper,
    feature: "Copper Quality",
    rad: "100% electrolytic copper with high conductivity.",
    competitor: "Often mixed or lower grade copper causing conductivity.",
  },
  {
    icon: uniqueIconPowerEfficiency,
    feature: "Power Savings",
    rad: "Higher conductivity = lower power loss = energy saving.",
    competitor: "Higher resistivity = more power loss and heating.",
  },
  {
    icon: uniqueIconLongLife,
    feature: "Service Life",
    rad: "Extended life due to E-Beam cross-linking.",
    competitor: "Shorter lifespan due to PVC degradation over years.",
  },
  {
    icon: stripThermal,
    feature: "Thermal Stability",
    rad: "Stable under high temperatures without degradation.",
    competitor: "PVC softens and deteriorates under heat.",
  },
];

const EBEAM_COMPARE = {
  kicker: "THE SCIENCE OF SAFETY",
  title: "E-BEAM TECHNOLOGY",
  desc:
    "Our advanced Electron Beam technology creates a 3D cross-linked molecular structure that transforms ordinary wires into fire safe, high-performance solutions.",
  without: {
    title: "WITHOUT E-BEAM",
    image: ebeamWithout,
    points: ["Weak molecular bonding", "Low heat resistance", "Higher fire risk"],
  },
  with: {
    title: "WITH E-BEAM",
    image: ebeamWith,
    points: [
      "Stronger molecular bonding",
      "Higher heat resistance",
      "Zero smoke & zero fire",
      "Maximum safety",
    ],
  },
};

const CERTIFICATIONS = [
  { icon: certIsi, line1: "ISI", line2: "Certified", alt: "ISI certification mark" },
  { icon: certRohs, line1: "RoHS", line2: "Compliant", alt: "RoHS compliance mark" },
  { icon: certReach, line1: "REACH", line2: "Compliant", alt: "REACH compliance mark" },
  { icon: certCe, line1: "CE", line2: "Certified", alt: "CE conformity mark" },
  { icon: certQuality, line1: "Quality", line2: "Tested", alt: "Quality tested mark" },
];

const DOWNLOADS = [
  { icon: dlBrochure, line1: "Product", line2: "Brochure" },
  { icon: dlDatasheet, line1: "Technical", line2: "Datasheet" },
  { icon: dlInstall, line1: "Installation", line2: "Guide" },
  { icon: dlCerts, line1: "Certifications", line2: "" },
];

function CompareYes() {
  return (
    <span className="pp-compare-table__mark pp-compare-table__mark--yes" aria-hidden>
      <svg viewBox="0 0 24 24" width="18" height="18">
        <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="2" />
        <path
          d="M7.2 12.2 10.3 15.2 16.8 8.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function CompareNo() {
  return (
    <span className="pp-compare-table__mark pp-compare-table__mark--no" aria-hidden>
      <svg viewBox="0 0 24 24" width="18" height="18">
        <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="2" />
        <path
          d="M8.5 8.5 15.5 15.5 M15.5 8.5 8.5 15.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

const PRODUCTS_CONFIG = {
  "rad-zero": {
    name: "RAD ZERO (E-BEAM)",
    eyebrow: "RAD ZERO",
    eyebrowSub: "(E-BEAM)",
    lines: [
      { accent: "ZERO", text: " SMOKE." },
      { accent: "ZERO", text: " FIRE." },
      { accent: "ZERO", text: " COMPROMISE." },
    ],
    desc: "Premium fire-safe wire engineered for maximum protection, exceptional conductivity and long-term performance.",
    whyTitle: "RAD ZERO",
  },
  "rad-power": {
    name: "RAD POWER",
    eyebrow: "RAD POWER",
    eyebrowSub: "(HOUSE WIRE)",
    lines: [
      { accent: "MAXIMUM", text: " POWER." },
      { accent: "SUPERIOR", text: " FLEXIBILITY." },
      { accent: "UNMATCHED", text: " DURABILITY." },
    ],
    desc: "High performance house wire engineered for smooth pulling, high current capacity, and everyday electrical reliability.",
    whyTitle: "RAD POWER",
  },
  "rad-flex": {
    name: "RAD FLEX",
    eyebrow: "RAD FLEX",
    eyebrowSub: "(FLEXIBLE CABLE)",
    lines: [
      { accent: "INDUSTRIAL", text: " GRADE." },
      { accent: "HEAVY", text: " DUTY." },
      { accent: "UNLIMITED", text: " FLEXIBILITY." },
    ],
    desc: "Industrial flexible cable engineered for heavy-duty machinery, control panels, and demanding industrial installations.",
    whyTitle: "RAD FLEX",
  },
  "rad-tape-pro": {
    name: "RAD TAPE PRO",
    eyebrow: "RAD TAPE PRO",
    eyebrowSub: "(INSULATION TAPE)",
    lines: [
      { accent: "STRONG", text: " ADHESION." },
      { accent: "FLAME", text: " RETARDANT." },
      { accent: "PERFECT", text: " PROTECTION." },
    ],
    desc: "Professional insulation tape engineered for strong hold, flame-retardant performance, and reliable electrical finishing.",
    whyTitle: "RAD TAPE PRO",
  },
};

export default function ProductDetailsPage() {
  const pageRef = useRef(null);
  const location = useLocation();
  useProductDetailsPageAnimations(pageRef);

  const pathKey = location.pathname.split("/").pop() || "rad-zero";
  const product = PRODUCTS_CONFIG[pathKey] || PRODUCTS_CONFIG["rad-zero"];

  return (
    <main ref={pageRef} className="pp-page product-details-page">
      {/* Hero */}
      <section className="pp-hero" aria-labelledby="pp-hero-heading">
        <div className="pp-hero__bg" aria-hidden>
          <video
            className="pp-hero__bg-video"
            src="/videos/ebeam-banner-section.mp4?v=20260803-1340"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
        <div className="pp-hero__shade" aria-hidden />

        <div className="pp-container">
          <nav className="pp-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="pp-breadcrumb-sep">›</span>
            <Link to="/products">Products</Link>
            <span className="pp-breadcrumb-sep">›</span>
            <span className="pp-breadcrumb-current">{product.name}</span>
          </nav>

          <div className="pp-hero__inner">
            <div className="pp-hero__copy">
              <p className="pp-hero__eyebrow">
                <span className="pp-accent">{product.eyebrow}</span>{" "}
                <span className="pp-hero__eyebrow-sub">{product.eyebrowSub}</span>
              </p>
              <h1 id="pp-hero-heading" className="pp-hero__title">
                {product.lines.map((item, idx) => (
                  <span key={idx} className="pp-hero__title-line">
                    <span className="pp-accent">{item.accent}</span>{item.text}
                  </span>
                ))}
              </h1>
              <p className="pp-hero__desc">
                {product.desc}
              </p>
            </div>
          </div>
        </div>

        <div className="pp-hero__strip">
          <ul className="pp-hero__strip-list">
            {HERO_FEATURES.map(({ icon, label }) => (
              <li key={label} className="pp-hero__strip-item">
                <span className="pp-hero__strip-icon">
                  <img src={icon} alt="" className="pp-hero__strip-img" loading="lazy" decoding="async" />
                </span>
                <span className="pp-hero__strip-label">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why RAD Section */}
      <section className="pp-why" aria-labelledby="pp-why-heading">
        <div className="pp-container">
          <h2 id="pp-why-heading" className="pp-section-title pp-section-title--center">
            WHY <span className="pp-accent">{product.whyTitle}</span>?
          </h2>
          <ul className="pp-why__grid">
            {WHY_RAD_ZERO.map(({ icon, title, desc }) => (
              <li key={title} className="pp-why__card">
                <div className="pp-why__icon">
                  <img src={icon} alt="" decoding="async" loading="lazy" />
                </div>
                <div className="pp-why__content">
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pp-ebeam-section" aria-labelledby="pp-ebeam-heading">
        <div className="pp-container">
          <h2 id="pp-ebeam-heading" className="pp-sr-only">
            E-Beam technology comparison
          </h2>
          <div className="pp-datasheet__panel">
            <div className="pp-datasheet__compare">
              <div className="pp-ebeam">
                <div className="pp-ebeam__intro">
                  <p className="pp-ebeam__kicker">{EBEAM_COMPARE.kicker}</p>
                  <h3 className="pp-ebeam__title">{EBEAM_COMPARE.title}</h3>
                  <p className="pp-ebeam__desc">{EBEAM_COMPARE.desc}</p>
                </div>

                <div className="pp-ebeam__compare">
                  <div className="pp-ebeam__panel">
                    <p className="pp-ebeam__panel-title">{EBEAM_COMPARE.without.title}</p>
                    <div className="pp-ebeam__image-frame">
                      <img
                        src={EBEAM_COMPARE.without.image}
                        alt="Molecular structure without E-Beam treatment"
                        className="pp-ebeam__image"
                        decoding="async"
                        loading="lazy"
                      />
                    </div>
                    <ul className="pp-ebeam__points">
                      {EBEAM_COMPARE.without.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pp-ebeam__vs" aria-hidden>
                    VS
                  </div>

                  <div className="pp-ebeam__panel">
                    <p className="pp-ebeam__panel-title">{EBEAM_COMPARE.with.title}</p>
                    <div className="pp-ebeam__image-frame">
                      <img
                        src={EBEAM_COMPARE.with.image}
                        alt="Cross-linked molecular structure with E-Beam treatment"
                        className="pp-ebeam__image"
                        decoding="async"
                        loading="lazy"
                      />
                    </div>
                    <ul className="pp-ebeam__points pp-ebeam__points--accent">
                      {EBEAM_COMPARE.with.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features + Unique */}
      <section className="pp-features" aria-labelledby="pp-features-heading">
        <div className="pp-features__layout">
          <div className="pp-features__visual-wrap">
            <img
              src={zeroCables}
              alt="RAD ZERO single cable"
              className="pp-features__visual"
              decoding="async"
              loading="lazy"
            />
          </div>

          <div className="pp-features__copy">
            <h2 id="pp-features-heading" className="pp-features__tagline">
              <span className="pp-features__tagline-phrase">
                <span className="pp-accent">ZERO</span> SMOKE.
              </span>
              <span className="pp-features__tagline-phrase">
                <span className="pp-accent">ZERO</span> FIRE.
              </span>
              <span className="pp-features__tagline-phrase">
                <span className="pp-accent">ZERO</span> COMPROMISE.
              </span>
            </h2>
            <p className="pp-features__body">
              RAD ZERO is more than a cable, it&apos;s a commitment to safety. Powered by E-Beam
              Technology, our cables undergo advanced electron beam cross linking that enhances:
            </p>
            <ul className="pp-features__checks">
              {FEATURE_CHECKS.map((item) => (
                <li key={item}>
                  <span className="pp-features__check-icon" aria-hidden>
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="pp-features__application">
              <strong>Application:</strong> These cables are ideal for domestic applications,
              conduit wiring and fixed, protected installations. Apart from residential and
              commercial properties, these cables are best suited for Auditoriums, Hospitals,
              Hotels, Schools, Stadiums and all constructions for Public use.
            </p>
            <p className="pp-features__closing">
              These cables are ideal for use in environments where high-performance, reliability
              and safety is a norm. Whether it&apos;s a home, office, or industrial setup, RAD ZERO
              ensures that when the unexpected happens, your wiring won&apos;t be the cause.
            </p>
          </div>

          <div className="pp-features__right">
            <h3 className="pp-unique__title">
              <span className="pp-accent">U</span>NIQUE FEATURES
            </h3>
            <ul className="pp-unique__grid">
              {UNIQUE_FEATURES.map(({ icon, label }) => (
                <li key={label} className="pp-unique__item">
                  <span className="pp-unique__icon">
                    <img src={icon} alt="" decoding="async" loading="lazy" />
                  </span>
                  <span className="pp-unique__label">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Product feature highlights — RAD ZERO */}
      {pathKey === "rad-zero" ? (
        <section className="pp-feature-cards" aria-labelledby="pp-feature-cards-heading">
          <h2 id="pp-feature-cards-heading" className="pp-feature-cards__title">
            FEATURES
          </h2>
          <ul className="pp-feature-cards__grid">
            {FEATURE_CARDS.map(({ icon, value, title, desc }) => (
              <li key={title} className="pp-feature-cards__card">
                <div className="pp-feature-cards__icon-wrap">
                  <img src={icon} alt="" decoding="async" loading="lazy" />
                </div>
                <p className="pp-feature-cards__value">{value}</p>
                <h3 className="pp-feature-cards__heading">{title}</h3>
                <p className="pp-feature-cards__desc">{desc}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Where Safety Matters */}
      <section className="pp-safety" aria-labelledby="pp-safety-heading">
        <h2 id="pp-safety-heading" className="pp-safety__title">
          WHERE SAFETY MATTERS MOST
        </h2>
        <ul className="pp-safety__grid">
          {SAFETY_PLACES.map(({ image, icon, label }) => (
            <li key={label} className="pp-safety__card">
              <img
                src={image}
                alt=""
                className="pp-safety__bg"
                decoding="async"
                loading="lazy"
              />
              <div className="pp-safety__overlay" aria-hidden />
              <div className="pp-safety__content">
                <span className="pp-safety__icon">
                  <img src={icon} alt="" decoding="async" loading="lazy" />
                </span>
                <span className="pp-safety__label">{label}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Technical Specifications + Capacity + Comparison */}
      <section className="pp-datasheet" aria-labelledby="pp-datasheet-heading">
        <div className="pp-container">
          <h2 id="pp-datasheet-heading" className="pp-sr-only">
            Technical specifications and product comparison
          </h2>

          <div className="pp-datasheet__panel">
            <div className="pp-datasheet__top">
              <div className="pp-datasheet__specs">
                <table className="pp-datasheet__table pp-tech-specs__table">
                  <thead>
                    <tr>
                      <th colSpan={3}>Technical Specifications</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TECH_SPECS.map(({ icon: Icon, label, value }) => (
                      <tr key={label}>
                        <td className="pp-tech-specs__icon">
                          <span className="pp-tech-specs__icon-wrap" aria-hidden>
                            <Icon size={14} strokeWidth={2.25} />
                          </span>
                        </td>
                        <td className="pp-tech-specs__label">{label}</td>
                        <td className="pp-tech-specs__value">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pp-datasheet__capacity">
                <table className="pp-datasheet__table pp-capacity__table">
                  <thead>
                    <tr>
                      <th colSpan={6} className="pp-capacity__title-row">
                        <span>Current Carrying Capacity - 2 Core Single Phase</span>
                        <span className="pp-capacity__note">
                          *As per conductor class 2 of IS 8130
                        </span>
                      </th>
                    </tr>
                    <tr>
                      <th colSpan={6} className="pp-capacity__brand-row">
                        RAD ZERO - EBEAM
                      </th>
                    </tr>
                    <tr>
                      <th>Nominal Area of Conductor (Sq.mm)</th>
                      <th>Number/ Nominal Dia. of Strands</th>
                      <th>Approx. Overall Dia. (mm)</th>
                      <th>In Conduit/ Trunking Amps</th>
                      <th>Clipped direct to a surface or on cable tray and unenclosed Amps</th>
                      <th>DC Conductor Resistance at 20°C Max.) Ω/Km</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CAPACITY_ROWS.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell) => (
                          <td key={`${row[0]}-${cell}`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pp-datasheet__compare">
              <div className="pp-compare-table">
                <h3 className="pp-compare-table__title">
                  COMPARISON, <span className="pp-accent">WHY RAD KABEL</span> IS A BETTER CHOICE?
                </h3>

                <div className="pp-compare-table__frame">
                  <table className="pp-compare-table__table">
                    <thead>
                      <tr>
                        <th className="pp-compare-table__head pp-compare-table__head--feature">
                          FEATURES
                        </th>
                        <th className="pp-compare-table__head pp-compare-table__head--rad">
                          <span className="pp-compare-table__head-inner">
                            <CompareYes />
                            <span>RAD ZERO (E-BEAM)</span>
                          </span>
                        </th>
                        <th className="pp-compare-table__head pp-compare-table__head--other">
                          <span className="pp-compare-table__head-inner">
                            <CompareNo />
                            <span>OTHER COMPETITORS</span>
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARE_ROWS.map(({ icon, feature, rad, competitor }) => (
                        <tr key={feature}>
                          <td className="pp-compare-table__feature">
                            <span className="pp-compare-table__feature-icon">
                              <img src={icon} alt="" decoding="async" loading="lazy" />
                            </span>
                            <span className="pp-compare-table__feature-text">{feature}</span>
                          </td>
                          <td className="pp-compare-table__value">
                            <div className="pp-compare-table__value-inner">
                              <CompareYes />
                              <span>{rad}</span>
                            </div>
                          </td>
                          <td className="pp-compare-table__value">
                            <div className="pp-compare-table__value-inner">
                              <CompareNo />
                              <span>{competitor}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications + Downloads */}
      <section className="pp-cert-dl" aria-label="Certifications and downloads">
        <div className="pp-container pp-cert-dl__layout">
          <div className="pp-cert-dl__panel">
            <h2 className="pp-cert-dl__heading">Certifications</h2>
            <ul className="pp-cert__list">
              {CERTIFICATIONS.map(({ icon, line1, line2, alt }) => (
                <li key={`${line1}-${line2}`} className="pp-cert__item">
                  <span className="pp-cert__icon">
                    <img src={icon} alt={alt} decoding="async" loading="lazy" />
                  </span>
                  <span className="pp-cert__label">
                    <span className="pp-cert__label-line">{line1}</span>
                    <span className="pp-cert__label-line">{line2}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pp-cert-dl__panel">
            <h2 className="pp-cert-dl__heading">Download Center</h2>
            <ul className="pp-dl__list">
              {DOWNLOADS.map(({ icon, line1, line2 }) => (
                <li key={line1}>
                  <a
                    href={BROCHURE_URL}
                    download="RAD_KABEL_BROCHURE.pdf"
                    onClick={handleDownloadBrochure}
                    className="pp-dl__card"
                    aria-label={`Download ${line1} ${line2}`.trim()}
                  >
                    <span className="pp-dl__card-text">
                      <span className="pp-dl__card-line">{line1}</span>
                      {line2 ? <span className="pp-dl__card-line">{line2}</span> : null}
                    </span>
                    <img
                      src={icon}
                      alt=""
                      className="pp-dl__card-art"
                      decoding="async"
                      loading="lazy"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {pathKey === "rad-zero" ? <CableVideosSection id="pp-cable-video" /> : null}

      {/* Bottom CTA */}
      <section className="pp-cta" aria-labelledby="pp-cta-heading">
        <div className="pp-cta__bg" aria-hidden>
          <img src={ctaSectionProduct} alt="" decoding="async" loading="lazy" />
        </div>
        <div className="pp-cta__shade" aria-hidden />
        <div className="pp-container pp-cta__inner">
          <div className="pp-cta__content">
            <h2 id="pp-cta-heading" className="pp-cta__title">
              <span className="pp-accent">PROTECT</span> WHAT MATTERS MOST.
            </h2>
            <p className="pp-cta__desc">
              Choose the premium wiring solution engineered for safety, reliability and performance.
            </p>
            <div className="pp-cta__actions">
              <Link to="/dealer-network" className="pp-btn pp-btn--primary">
                Become a Dealer <ArrowRight size={16} aria-hidden />
              </Link>
              <Link to="/contact-us" className="pp-btn pp-btn--outline">
                Contact Sales <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
