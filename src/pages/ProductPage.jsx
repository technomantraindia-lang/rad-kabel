import { Link } from "react-router-dom";
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
import "./ProductPage.css";

import productBanner from "../assets/product-page/product-banner.png";
import zeroCables from "../assets/product-page/zero-cables.png";
import ctaSectionProduct from "../assets/product-page/cta-section-product.png";

import {
  IconStripConductivity,
  IconStripFireResistant,
  IconStripLongLife,
  IconStripPremiumCopper,
  IconStripThermal,
} from "../components/ProductHeroFeatureIcons";
import uniqueIconFire from "../assets/product-page/unique-feature-icons/high_fire_resistance.svg";
import uniqueIconNoMelt from "../assets/product-page/unique-feature-icons/no_melt_no_drip.svg";
import uniqueIconLowSmoke from "../assets/product-page/unique-feature-icons/low_smoke_emission.svg";
import uniqueIconAntiRodent from "../assets/product-page/unique-feature-icons/anti_rodent_anti_termite.svg";
import uniqueIconCopper from "../assets/product-page/unique-feature-icons/premium_copper.svg";
import uniqueIconLongLife from "../assets/product-page/unique-feature-icons/long_service_life.svg";
import uniqueIconSelfExtinguish from "../assets/product-page/unique-feature-icons/self_extinguishing.svg";
import uniqueIconPowerEfficiency from "../assets/product-page/unique-feature-icons/better_power_efficiency.svg";

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

import certIsi from "../assets/product-page/cert-dl-icons/isi_certified.svg";
import certRohs from "../assets/product-page/cert-dl-icons/rohs_compliant.svg";
import certReach from "../assets/product-page/cert-dl-icons/reach_compliant.svg";
import certCe from "../assets/product-page/cert-dl-icons/ce_certified.svg";
import certQuality from "../assets/product-page/cert-dl-icons/quality_tested.svg";
import dlBrochure from "../assets/product-page/cert-dl-icons/product_brochure_pdf.svg";
import dlDatasheet from "../assets/product-page/cert-dl-icons/technical_datasheet_pdf.svg";
import dlInstall from "../assets/product-page/cert-dl-icons/installation_guide_pdf.svg";
import dlCerts from "../assets/product-page/cert-dl-icons/certifications_pdf.svg";

import relatedPower from "../assets/product-page/related/rad-power.png";
import relatedFlex from "../assets/product-page/related/rad-flex.png";

import whyIconFire from "../assets/product-page/rad-zero-icons/fire_protection.svg";
import whyIconThermal from "../assets/product-page/rad-zero-icons/better_thermal_stability.svg";
import whyIconConductivity from "../assets/product-page/rad-zero-icons/high_conductivity.svg";
import whyIconLongLife from "../assets/product-page/rad-zero-icons/long_service_life.svg";

const BROCHURE_URL = "/brochure.pdf";

const HERO_FEATURES = [
  { Icon: IconStripFireResistant, label: "Fire Resistant" },
  { Icon: IconStripThermal, label: "Better Thermal Stability" },
  { Icon: IconStripLongLife, label: "Long Life" },
  { Icon: IconStripPremiumCopper, label: "Premium Copper" },
  { Icon: IconStripConductivity, label: "High Conductivity" },
];

const WHY_RAD_ZERO = [
  {
    icon: whyIconFire,
    title: "Fire Protection",
    desc: "Enhanced resistance against flame propagation for greater safety.",
  },
  {
    icon: whyIconThermal,
    title: "Better Thermal Stability",
    desc: "Insulation designed to withstand high temperatures without performance loss.",
  },
  {
    icon: whyIconConductivity,
    title: "High Conductivity",
    desc: "Premium electrolytic copper ensures efficient power transmission.",
  },
  {
    icon: whyIconLongLife,
    title: "Long Service Life",
    desc: "Engineered for long-lasting performance and peace of mind.",
  },
];

const FEATURE_CHECKS = [
  "Thermal Stability",
  "Mechanical Strength",
  "Fire Resistance",
  "Extended Insulation Life",
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
  { icon: Layers, label: "Insulation", value: "Premium FR Grade" },
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
    feature: "High Fire Resistance",
    rad: "High fire-resistance due to E-Beam cross-linked insulation.",
    competitor: "Standard PVC, lower fire resistance.",
  },
  {
    feature: "No Melt No Drip",
    rad: "Insulation does not melt or drip when exposed to flame.",
    competitor: "PVC insulation melts, drips, and can spread fire.",
  },
  {
    feature: "Smoke Emission",
    rad: "Produces negligible, transparent, non-toxic smoke.",
    competitor: "Thick black toxic smoke common in PVC wires.",
  },
  {
    feature: "Self Extinguishing",
    rad: "Insulation is self-extinguishing and flame-retardant.",
    competitor: "Many wires continue burning after ignition.",
  },
  {
    feature: "Safety for Fire Victims",
    rad: "Low smoke + non-toxicity reduces suffocation risk.",
    competitor: "High smoke + toxic gases create escape difficulty.",
  },
  {
    feature: "Copper Quality",
    rad: "100% electrolytic copper with high conductivity.",
    competitor: "Often mixed or lower grade copper causing conductivity.",
  },
  {
    feature: "Power Savings",
    rad: "Higher conductivity = lower power loss = energy saving.",
    competitor: "Higher resistivity = more power loss and heating.",
  },
  {
    feature: "Service Life",
    rad: "Extended life due to E-Beam cross-linking.",
    competitor: "Shorter lifespan due to PVC degradation over years.",
  },
  {
    feature: "Thermal Stability",
    rad: "Stable under high temperatures without degradation.",
    competitor: "PVC softens and deteriorates under heat.",
  },
];

const CERTIFICATIONS = [
  { icon: certIsi, line1: "ISI", line2: "Certified" },
  { icon: certRohs, line1: "RoHS", line2: "Compliant" },
  { icon: certReach, line1: "REACH", line2: "Compliant" },
  { icon: certCe, line1: "CE", line2: "Certified" },
  { icon: certQuality, line1: "Quality", line2: "Tested" },
];

const DOWNLOADS = [
  { icon: dlBrochure, line1: "Product", line2: "Brochure" },
  { icon: dlDatasheet, line1: "Technical", line2: "Datasheet" },
  { icon: dlInstall, line1: "Installation", line2: "Guide" },
  { icon: dlCerts, line1: "Certifications", line2: "" },
];

const RELATED = [
  {
    image: relatedPower,
    suffix: "POWER",
    subtitle: "Premium House Wire",
    href: "/products/multi-core-control-cable",
  },
  {
    image: relatedFlex,
    suffix: "FLEX",
    subtitle: "Industrial Flexible Cable",
    href: "/products/multi-core-control-cable",
  },
];

function CompareYes() {
  return (
    <span className="pp-compare__mark pp-compare__mark--yes" aria-hidden>
      <svg viewBox="0 0 24 24" width="22" height="22">
        <circle cx="12" cy="12" r="11" fill="currentColor" />
        <path
          d="M7.4 12.1 L10.4 15.1 L16.7 8.7"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function CompareNo() {
  return (
    <span className="pp-compare__mark pp-compare__mark--no" aria-hidden>
      <svg viewBox="0 0 24 24" width="22" height="22">
        <circle cx="12" cy="12" r="11" fill="currentColor" />
        <path
          d="M9.1 9.1 L14.9 14.9 M14.9 9.1 L9.1 14.9"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export default function ProductPage() {
  return (
    <main className="pp-page">
      {/* Hero */}
      <section className="pp-hero" aria-labelledby="pp-hero-heading">
        <div className="pp-hero__bg" aria-hidden>
          <img src={productBanner} alt="" decoding="async" fetchPriority="high" />
        </div>
        <div className="pp-hero__shade" aria-hidden />

        <div className="pp-container">
          <nav className="pp-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="pp-breadcrumb-sep">›</span>
            <Link to="/#products">Products</Link>
            <span className="pp-breadcrumb-sep">›</span>
            <span className="pp-breadcrumb-current">RAD ZERO (E-BEAM)</span>
          </nav>

          <div className="pp-hero__inner">
            <div className="pp-hero__copy">
              <p className="pp-hero__eyebrow">
                <span className="pp-accent">RAD ZERO</span>{" "}
                <span className="pp-hero__eyebrow-sub">(E-BEAM)</span>
              </p>
              <h1 id="pp-hero-heading" className="pp-hero__title">
                <span className="pp-hero__title-line">
                  <span className="pp-accent">ZERO</span> SMOKE.
                </span>
                <span className="pp-hero__title-line">
                  <span className="pp-accent">ZERO</span> FIRE.
                </span>
                <span className="pp-hero__title-line">
                  <span className="pp-accent">ZERO</span> COMPROMISE.
                </span>
              </h1>
              <p className="pp-hero__desc">
                Premium fire-safe wire engineered for maximum protection, exceptional conductivity
                and long-term performance.
              </p>
              <div className="pp-hero__actions">
                <a href={BROCHURE_URL} download className="pp-btn pp-btn--primary">
                  Download Datasheet <FileText size={16} aria-hidden />
                </a>
                <a href="/#contact" className="pp-btn pp-btn--outline">
                  Request Quote <ArrowRight size={16} aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pp-hero__strip">
          <ul className="pp-hero__strip-list">
            {HERO_FEATURES.map(({ Icon, label }) => (
              <li key={label} className="pp-hero__strip-item">
                <span className="pp-hero__strip-icon">
                  <Icon />
                </span>
                <span className="pp-hero__strip-label">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why RAD ZERO */}
      <section className="pp-why" aria-labelledby="pp-why-heading">
        <div className="pp-container">
          <h2 id="pp-why-heading" className="pp-section-title pp-section-title--center">
            WHY <span className="pp-accent">RAD ZERO</span>?
          </h2>
          <ul className="pp-why__grid">
            {WHY_RAD_ZERO.map(({ icon, title, desc }) => (
              <li key={title} className="pp-why__card">
                <div className="pp-why__icon">
                  <img src={icon} alt="" decoding="async" loading="lazy" />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Features + Unique */}
      <section className="pp-features" aria-labelledby="pp-features-heading">
        <div className="pp-features__layout">
          <div className="pp-features__visual-wrap">
            <img
              src={zeroCables}
              alt="RAD ZERO multi-core copper cables"
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
              <h3 className="pp-datasheet__compare-title">
                Comparison, Why <span className="pp-accent">RAD KABEL</span> Is a Better Choice?
              </h3>
              <table className="pp-datasheet__table pp-compare__table">
                <thead>
                  <tr>
                    <th>Features</th>
                    <th className="pp-compare__head-rad">RAD ZERO (E-BEAM)</th>
                    <th className="pp-compare__head-other">Other Competitors</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map(({ feature, rad, competitor }) => (
                    <tr key={feature}>
                      <td className="pp-compare__feature">{feature}</td>
                      <td>
                        <div className="pp-compare__cell">
                          <CompareYes />
                          <span>{rad}</span>
                        </div>
                      </td>
                      <td>
                        <div className="pp-compare__cell">
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
      </section>

      {/* Certifications + Downloads */}
      <section className="pp-cert-dl" aria-label="Certifications and downloads">
        <div className="pp-container pp-cert-dl__layout">
          <div className="pp-cert-dl__panel">
            <h2 className="pp-cert-dl__heading">Certifications</h2>
            <ul className="pp-cert__list">
              {CERTIFICATIONS.map(({ icon, line1, line2 }) => (
                <li key={`${line1}-${line2}`} className="pp-cert__item">
                  <span className="pp-cert__icon">
                    <img src={icon} alt="" decoding="async" loading="lazy" />
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
                    download
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
              <a href="/#contact" className="pp-btn pp-btn--outline">
                Contact Sales <ArrowRight size={16} aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="pp-related" aria-labelledby="pp-related-heading">
        <div className="pp-container">
          <h2 id="pp-related-heading" className="pp-related__title">
            <span className="pp-accent">R</span>ELATED PRODUCTS
          </h2>
          <ul className="pp-related__grid">
            {RELATED.map(({ image, suffix, subtitle, href }) => (
              <li key={suffix} className="pp-related__card">
                <div className="pp-related__image">
                  <img src={image} alt={`RAD ${suffix}`} decoding="async" loading="lazy" />
                </div>
                <div className="pp-related__body">
                  <h3 className="pp-related__name">
                    R<span className="pp-accent">AD</span> {suffix}
                  </h3>
                  <p className="pp-related__subtitle">{subtitle}</p>
                  <Link to={href} className="pp-related__link">
                    View Product <ArrowRight size={14} aria-hidden />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
