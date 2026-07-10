import { useState, useEffect, useRef } from "react";
import useMarketingPageAnimations from "../hooks/useMarketingPageAnimations.js";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Download,
  Check,
  Search,
  Building2,
  Home,
  Handshake,
  HardHat,
  ChevronRight,
  Users,
  ShieldCheck,
  ClipboardCheck,
  Layers,
  FileText,
  Loader2,
  CheckCircle2
} from "lucide-react";
import "./CertificationsPage.css";
import "../styles/marketing-pages-animations.css";

// Assets
import isiCertifiedLogo from "../assets/certifications/isi-certified.svg";
import imgRohs from "../assets/certifications/rohs-compliant.svg";
import imgReach from "../assets/certifications/reach-compliant.svg";
import imgCpr from "../assets/certifications/cpr-compliant.svg";
import imgQualityTested from "../assets/certifications/quality-tested.svg";
import imgMadeInIndia from "../assets/certifications/made-in-india.png";
import imgYearsOfTrust from "../assets/certifications/years-of-trust.png";
import iconAdvManufacturing from "../assets/about-icons/who-advanced-manufacturing.png";
import iconQualityControl from "../assets/about-icons/who-raw-materials.png";
import iconTestedSafety from "../assets/about-icons/who-quality-control.png";
import iconCertifiedReliability from "../assets/about-icons/premium-quality.png";
import iconTrustedPros from "../assets/about-icons/who-customer-focused.png";

// Quality Testing Panel Images
import panel1Conductor from "../assets/infrastructure/quality-lab/panel-1-conductor-resistance.png";
import panel2Spark from "../assets/infrastructure/quality-lab/panel-2-spark-test.png";
import panel3Voltage from "../assets/infrastructure/quality-lab/panel-3-high-voltage.png";
import panel5Heat from "../assets/infrastructure/quality-lab/panel-5-heat-resistance.png";
import panel6Mechanical from "../assets/infrastructure/quality-lab/panel-6-mechanical-strength.png";
import panel4Insulation from "../assets/infrastructure/quality-lab/panel-4-insulation.png";
// Lab Gallery Images
import gallery7 from "../assets/infrastructure/gallery/gallery-7.png";
import gallery8 from "../assets/infrastructure/gallery/gallery-8.png";
import gallery9 from "../assets/infrastructure/gallery/gallery-9.png";
import qualityControlLabImg from "../assets/infrastructure/inside/quality-control-lab.png";

// Journey Background & SVGs
import journeyBg from "../assets/journey-background.png";
import rawMaterialIcon from "../assets/journey/raw-material.svg";
import manufacturingIcon from "../assets/journey/manufacturing.svg";
import testingIcon from "../assets/journey/testing.svg";
import inspectionIcon from "../assets/journey/inspection.svg";
import certificationIcon from "../assets/journey/certification.svg";
import dispatchIcon from "../assets/journey/dispatch.svg";

import CertificationsHero from "../components/CertificationsHero.jsx";
import certBottomCtaBg from "../assets/cert-bottom-cta-bg.png";

const OUR_CERTIFICATIONS = [
  {
    logo: isiCertifiedLogo,
    title: "ISI CERTIFIED",
    desc: "Compliance with Indian Standards.",
    wide: false
  },
  {
    logo: imgRohs,
    title: "RoHS COMPLIANT",
    desc: "Restriction of hazardous substances.",
    wide: false
  },
  {
    logo: imgReach,
    title: "REACH COMPLIANT",
    desc: "Safe material compliance standards.",
    wide: false
  },
  {
    logo: imgCpr,
    title: "CPR COMPLIANT",
    desc: "Construction Product Regulation compliance.",
    wide: false
  },
  {
    logo: imgQualityTested,
    title: "QUALITY TESTED",
    desc: "Internal quality assurance verification.",
    wide: false
  }
];

const JOURNEY_STEPS = [
  {
    num: "01",
    title: "RAW MATERIAL",
    icon: rawMaterialIcon,
    desc: "Premium grade copper and compounding materials are received."
  },
  {
    num: "02",
    title: "MANUFACTURING",
    icon: manufacturingIcon,
    desc: "Precise drawing, annealing, extrusion, and laying process."
  },
  {
    num: "03",
    title: "TESTING",
    icon: testingIcon,
    desc: "Online spark testing and in-house laboratory trials."
  },
  {
    num: "04",
    title: "INSPECTION",
    icon: inspectionIcon,
    desc: "Rigorous optical, dimensional, and mechanical verification."
  },
  {
    num: "05",
    title: "CERTIFICATION",
    icon: certificationIcon,
    desc: "Compliance confirmation and stamp of standard approvals."
  },
  {
    num: "06",
    title: "DISPATCH",
    icon: dispatchIcon,
    desc: "Secure packaging, labeling, and shipping to distribution networks."
  }
];

const TESTING_PROCESSES = [
  {
    img: panel1Conductor,
    title: "Conductor Resistance Test",
    desc: "Ensures proper conductivity."
  },
  {
    img: panel2Spark,
    title: "Spark Test",
    desc: "Detects insulation defects."
  },
  {
    img: panel3Voltage,
    title: "High Voltage Test",
    desc: "Verifies insulation integrity."
  },
  {
    img: panel5Heat,
    title: "Heat Resistance Test",
    desc: "Evaluates thermal stability."
  },
  {
    img: panel6Mechanical,
    title: "Mechanical Strength Test",
    desc: "Checks durability and performance."
  },
  {
    img: panel4Insulation,
    title: "Dimensional Verification",
    desc: "Maintains manufacturing accuracy."
  }
];

const LAB_SLIDES = [
  { id: "testing-equipment", label: "TESTING EQUIPMENT", img: gallery7 },
  { id: "inspection-systems", label: "INSPECTION SYSTEMS", img: gallery8 },
  { id: "electrical-testing", label: "ELECTRICAL TESTING", img: gallery9 },
  { id: "thermal-testing", label: "THERMAL TESTING", img: qualityControlLabImg }
];

const AUDIENCE_ITEMS = [
  { title: "FOR DEALERS", desc: "Confidence in every sale.", icon: Handshake },
  { title: "FOR ELECTRICIANS", desc: "Reliable installation performance.", icon: HardHat },
  { title: "FOR BUILDERS", desc: "Compliance with project requirements.", icon: Building2 },
  { title: "FOR HOMEOWNERS", desc: "Enhanced safety and peace of mind.", icon: Home }
];

const DOWNLOADS = [
  { id: "isi", title: "ISI Certificate", size: "1.2 MB", date: "10 May 2024" },
  { id: "rohs", title: "RoHS Declaration", size: "721 KB", date: "10 May 2024" },
  { id: "reach", title: "REACH Declaration", size: "891 KB", date: "10 May 2024" },
  { id: "brochure", title: "Product Brochure", size: "2.4 MB", date: "10 May 2024" },
  { id: "datasheets", title: "Technical Datasheets", size: "1.4 MB", date: "10 May 2024" },
  { id: "reports", title: "Test Reports", size: "2.1 MB", date: "10 May 2024" }
];

export default function CertificationsPage() {
  const pageRef = useRef(null);
  useMarketingPageAnimations(pageRef);

  const [labSlideIndex, setLabSlideIndex] = useState(0);
  const [batchNumber, setBatchNumber] = useState("");
  const [productCode, setProductCode] = useState("");
  const [verificationState, setVerificationState] = useState("idle"); // idle, loading, verified, error
  const [downloadingId, setDownloadingId] = useState(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!batchNumber.trim() || !productCode.trim()) {
      alert("Please enter both Batch Number and Product Code.");
      return;
    }
    setVerificationState("loading");
    setTimeout(() => {
      setVerificationState("verified");
    }, 1200);
  };

  const handleDownload = (id, title) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      // Simulate file download
      const link = document.createElement("a");
      link.href = "/brochure.pdf";
      link.download = `${title.replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1500);
  };

  const handleLabNext = () => {
    setLabSlideIndex((prev) => (prev + 1) % LAB_SLIDES.length);
  };

  return (
    <main ref={pageRef} className="cert-page font-sans text-white bg-black min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-white/10 px-6 py-4 lg:px-16 lg:py-6 relative z-10">
        <nav className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
          <Link to="/" className="hover:text-red-600 transition">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">Certifications</span>
        </nav>
      </div>

      <CertificationsHero />

      {/* Our Certifications Section */}
      <section className="cert-our-section" aria-labelledby="cert-our-heading">
        <div className="cert-our-section__layout">
          <div className="cert-our-section__feature">
            <img
              src={qualityControlLabImg}
              alt="Quality control laboratory"
              className="cert-our-section__feature-img"
              decoding="async"
            />
            <div className="cert-our-section__feature-shade" aria-hidden />
            <div className="cert-our-section__feature-copy">
              <span className="cert-our-section__eyebrow">QUALITY COMES FIRST</span>
              <h3 className="cert-our-section__feature-title">
                EVERY METER.
                <br />
                EVERY TEST.
                <br />
                EVERY TIME.
              </h3>
            </div>
          </div>

          <div className="cert-our-section__divider" aria-hidden />

          <div className="cert-our-section__certs">
            <header className="cert-our-section__head">
              <h2 id="cert-our-heading" className="cert-our-section__title">
                <span className="cert-our-section__title-our">
                  OUR
                  <span className="cert-our-section__title-rule" aria-hidden />
                </span>{" "}
                <span className="cert-our-section__title-accent">CERTIFICATIONS</span>
              </h2>
            </header>

            <div className="cert-our-section__grid">
              {OUR_CERTIFICATIONS.map((cert) => (
                <article key={cert.title} className="cert-our-section__card">
                  <div className="cert-our-section__icon">
                    <img src={cert.logo} alt="" decoding="async" />
                  </div>
                  <h4 className="cert-our-section__card-title">{cert.title}</h4>
                  <p className="cert-our-section__card-desc">{cert.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certification Journey Section */}
      <section className="cert-journey" aria-labelledby="cert-journey-heading">
        <img
          src={journeyBg}
          alt=""
          className="cert-journey__bg"
          decoding="async"
          aria-hidden
        />
        <div className="cert-journey__shade" aria-hidden />

        <div className="cert-journey__inner">
          <header className="cert-journey__head">
            <h2 id="cert-journey-heading" className="cert-journey__title">
              CERTIFICATION <span className="cert-journey__title-accent">JOURNEY</span>
            </h2>
            <span className="cert-journey__title-rule" aria-hidden />
          </header>

          <div className="cert-journey__track">
            {JOURNEY_STEPS.map((step, idx) => (
              <div key={step.num} className="cert-journey__item">
                <div className="cert-journey__step">
                  <div className="cert-journey__circle">
                    <img
                      src={step.icon}
                      alt=""
                      className="cert-journey__icon"
                      decoding="async"
                    />
                  </div>
                  <span className="cert-journey__num">{step.num}</span>
                  <h3 className="cert-journey__label">{step.title}</h3>
                </div>

                {idx < JOURNEY_STEPS.length - 1 && (
                  <span className="cert-journey__arrow cert-journey__arrow--desktop" aria-hidden>
                    <svg viewBox="0 0 56 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1 7H44M38 2L52 7L38 12"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}

                {idx < JOURNEY_STEPS.length - 1 && (
                  <span className="cert-journey__arrow cert-journey__arrow--mobile" aria-hidden>
                    <svg viewBox="0 0 14 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7 1V44M2 38L7 52L12 38"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Testing Process Section */}
      <section className="cert-testing" aria-labelledby="cert-testing-heading">
        <div className="cert-testing__inner">
          <header className="cert-testing__head">
            <h2 id="cert-testing-heading" className="cert-testing__title">
              <span className="cert-testing__title-main">
                QUALITY
                <span className="cert-testing__title-rule" aria-hidden />
              </span>{" "}
              <span className="cert-testing__title-accent">TESTING PROCESS</span>
            </h2>
          </header>

          <div className="cert-testing__grid">
            {TESTING_PROCESSES.map((proc) => (
              <article key={proc.title} className="cert-testing__card">
                <div className="cert-testing__media">
                  <img
                    src={proc.img}
                    alt={proc.title}
                    className="cert-testing__img"
                    decoding="async"
                  />
                </div>
                <div className="cert-testing__body">
                  <h3 className="cert-testing__card-title">{proc.title}</h3>
                  <p className="cert-testing__card-desc">{proc.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What These Certifications Mean & Quality Control Lab */}
      <section className="cert-split" aria-label="Certifications meaning and quality control lab">
        <div className="cert-split__layout">
          <div className="cert-meanings">
            <header className="cert-meanings__head">
              <h2 className="cert-meanings__title">
                WHAT THESE
                <br />
                <span className="cert-meanings__title-accent">
                  CERTIFICATIONS
                  <span className="cert-meanings__title-rule" aria-hidden />
                </span>{" "}
                MEAN
              </h2>
            </header>

            <div className="cert-meanings__grid">
              {AUDIENCE_ITEMS.map((item) => {
                const IconComp = item.icon;
                return (
                  <div key={item.title} className="cert-meanings__col">
                    <div className="cert-meanings__icon" aria-hidden>
                      <IconComp strokeWidth={1.75} />
                    </div>
                    <h3 className="cert-meanings__label">{item.title}</h3>
                    <p className="cert-meanings__desc">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="cert-lab">
            <header className="cert-lab__head">
              <h3 className="cert-lab__title">QUALITY CONTROL LAB</h3>
            </header>

            <div className="cert-lab__carousel">
              <div
                className="cert-lab__track"
                style={{ "--lab-slide-index": labSlideIndex }}
              >
                {LAB_SLIDES.map((slide) => (
                  <article key={slide.id} className="cert-lab__card">
                    <div className="cert-lab__media">
                      <img
                        src={slide.img}
                        alt={slide.label}
                        className="cert-lab__img"
                        decoding="async"
                      />
                    </div>
                    <p className="cert-lab__caption">{slide.label}</p>
                  </article>
                ))}
              </div>

              <button
                type="button"
                className="cert-lab__nav"
                onClick={handleLabNext}
                aria-label="Next lab preview"
              >
                <ChevronRight size={22} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Strip */}
      <section className="cert-stats" aria-label="Quality statistics">
        <div className="cert-stats__inner">
          <div className="cert-stats__grid">
            {[
              { num: "100%", sub: "QUALITY COMMITMENT", icon: ShieldCheck },
              { num: "25+", sub: "QUALITY CHECKS", icon: ClipboardCheck },
              { num: "99.97%", sub: "COPPER PURITY", icon: Layers },
              { num: "1000+", sub: "SATISFIED CUSTOMERS", icon: Users }
            ].map((stat) => {
              const IconComp = stat.icon;
              return (
                <div key={stat.sub} className="cert-stats__item">
                  <div className="cert-stats__icon" aria-hidden>
                    <IconComp strokeWidth={1.6} />
                  </div>
                  <div className="cert-stats__copy">
                    <span className="cert-stats__num">{stat.num}</span>
                    <span className="cert-stats__label">{stat.sub}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Split Section: Downloads & Authenticity Verification */}
      <section id="download-center" className="cert-download" aria-label="Download center and product verification">
        <div className="cert-download__layout">
          <div className="cert-download__left">
            <header className="cert-download__head">
              <h2 className="cert-download__title">DOWNLOAD CENTER</h2>
              <p className="cert-download__desc">
                Access official certificate approvals, safety declarations, compliance files, and technical
                product catalogs.
              </p>
            </header>

            <div className="cert-download__grid">
              {DOWNLOADS.map((doc) => (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => handleDownload(doc.id, doc.title)}
                  className="cert-download__card"
                >
                  <div className="cert-download__card-icon" aria-hidden>
                    <FileText strokeWidth={1.6} />
                  </div>
                  <div className="cert-download__card-copy">
                    <h3 className="cert-download__card-title">{doc.title}</h3>
                    <p className="cert-download__card-meta">PDF • {doc.size}</p>
                    <p className="cert-download__card-date">Updated: {doc.date}</p>
                  </div>
                  <span className="cert-download__card-action" aria-hidden>
                    {downloadingId === doc.id ? (
                      <Loader2 size={18} className="cert-download__card-spinner" />
                    ) : (
                      <Download size={18} strokeWidth={2.25} />
                    )}
                  </span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleDownload("all", "All_Certifications")}
              className="cert-download__all-btn"
            >
              VIEW ALL DOCUMENTS
              <ArrowRight size={16} strokeWidth={2.25} />
            </button>
          </div>

          <div className="cert-verify">
            <header className="cert-verify__head">
              <h2 className="cert-verify__title">
                VERIFY PRODUCT <span className="cert-verify__title-accent">AUTHENTICITY</span>
              </h2>
              <p className="cert-verify__desc">
                Enter product details to verify authenticity and ensure you are using genuine RAD KABEL
                products.
              </p>
            </header>

            <div className="cert-verify__body">
              <div className="cert-verify__form-wrap">
                {verificationState === "verified" ? (
                  <div className="cert-verify__success">
                    <CheckCircle2 size={40} className="cert-verify__success-icon" />
                    <h3 className="cert-verify__success-title">VERIFIED GENUINE</h3>
                    <p className="cert-verify__success-desc">
                      This batch has been certified by our quality team. You are using an authentic RAD KABEL
                      product.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setVerificationState("idle");
                        setBatchNumber("");
                        setProductCode("");
                      }}
                      className="cert-verify__success-reset"
                    >
                      VERIFY ANOTHER BATCH
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleVerify} className="cert-verify__form">
                    <div className="cert-verify__fields">
                      <div className="cert-verify__field">
                        <label htmlFor="batch-number">BATCH NUMBER</label>
                        <input
                          id="batch-number"
                          type="text"
                          required
                          value={batchNumber}
                          onChange={(e) => setBatchNumber(e.target.value)}
                          placeholder="Enter Batch Number"
                        />
                      </div>
                      <div className="cert-verify__field">
                        <label htmlFor="product-code">PRODUCT CODE</label>
                        <input
                          id="product-code"
                          type="text"
                          required
                          value={productCode}
                          onChange={(e) => setProductCode(e.target.value)}
                          placeholder="Enter Product Code"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={verificationState === "loading"}
                      className="cert-verify__submit"
                    >
                      {verificationState === "loading" ? (
                        <>
                          <Loader2 size={16} className="animate-spin" /> VERIFYING...
                        </>
                      ) : (
                        <>
                          VERIFY NOW <ArrowRight size={16} strokeWidth={2.5} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              <div
                className={`cert-verify__badge ${verificationState === "verified" ? "cert-verify__badge--active" : ""}`}
                aria-hidden
              >
                <div className="cert-verify__badge-glow" />
                <div className="cert-verify__badge-inner">
                  <ShieldCheck size={42} strokeWidth={1.75} />
                  <span className="cert-verify__badge-verified">✓ VERIFIED</span>
                  <span className="cert-verify__badge-text">Genuine RAD KABEL Product</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="cert-bottom-cta" aria-labelledby="cert-bottom-cta-heading">
        <div className="cert-bottom-cta__frame">
          <img
            src={certBottomCtaBg}
            alt=""
            className="cert-bottom-cta__bg"
            decoding="async"
            aria-hidden
          />
          <div className="cert-bottom-cta__inner">
            <div className="cert-bottom-cta__icon" aria-hidden>
              <ShieldCheck size={28} strokeWidth={1.75} />
            </div>
            <h2 id="cert-bottom-cta-heading" className="cert-bottom-cta__title">
              QUALITY YOU CAN <span className="cert-bottom-cta__title-accent">VERIFY.</span>
            </h2>
            <p className="cert-bottom-cta__desc">
              Every RAD KABEL product is backed by rigorous testing and verified quality standards.
            </p>
            <div className="cert-bottom-cta__actions">
              <a href="#download-center" className="cert-bottom-cta__btn cert-bottom-cta__btn--primary">
                <Download size={15} aria-hidden />
                DOWNLOAD CERTIFICATES
              </a>
              <a href="#contact" className="cert-bottom-cta__btn cert-bottom-cta__btn--outline">
                CONTACT TECHNICAL TEAM
                <ArrowRight size={15} aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom trust bar */}
      <section className="cert-trust" aria-label="RAD Kabel commitments">
        <div className="cert-trust__inner">
          <ul className="cert-trust__grid">
            {[
              { icon: iconAdvManufacturing, line1: "Advanced", line2: "Manufacturing" },
              { icon: iconQualityControl, line1: "Stringent", line2: "Quality Control" },
              { icon: iconTestedSafety, line1: "Tested for", line2: "Safety" },
              { icon: iconCertifiedReliability, line1: "Certified for", line2: "Reliability" },
              { icon: iconTrustedPros, line1: "Trusted by", line2: "Professionals" },
              { icon: iconTestedSafety, line1: "Committed to", line2: "Better Tomorrow" }
            ].map((item) => (
              <li key={`${item.line1}-${item.line2}`} className="cert-trust__item">
                <img
                  src={item.icon}
                  alt=""
                  className="cert-trust__icon"
                  decoding="async"
                  loading="lazy"
                  aria-hidden
                />
                <span className="cert-trust__copy">
                  <strong>{item.line1}</strong>
                  <span>{item.line2}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
