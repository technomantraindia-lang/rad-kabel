import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Check,
  ChevronRight,
  Download,
  FileText,
  Flame,
  Headphones,
  Leaf,
  Shield,
  Sparkles,
  Truck,
  Waves,
  Zap,
  Settings,
  Factory,
  Building2,
  Wind,
  Cpu,
  Cog,
} from "lucide-react";

import productHero from "../assets/product-landing/product-4.png";
import productThumb1 from "../assets/product-landing/product-1.png";
import productThumb2 from "../assets/product-landing/product-2.png";
import productThumb3 from "../assets/product-landing/product-3.png";
import productThumb4 from "../assets/product-landing/product-4.png";
import imgIndustrial from "../assets/applications/industrial.png";
import imgInfrastructure from "../assets/applications/infrastructure.png";
import imgCommercial from "../assets/applications/commercial.png";
import imgDataCenters from "../assets/applications/data-centers.png";
import imgResidential from "../assets/applications/residential.png";
import imgHospitals from "../assets/applications/hospitals.png";

import "./ProductLanding.css";

const GALLERY = [
  { id: 0, src: productHero, alt: "Multi core control cable — main view" },
  { id: 1, src: productThumb1, alt: "Cable cross-section view" },
  { id: 2, src: productThumb2, alt: "House wire variant" },
  { id: 3, src: productThumb3, alt: "Industrial cable variant" },
  { id: 4, src: productThumb4, alt: "Control cable detail" },
];

const HERO_DESCRIPTION = [
  "High-performance multi-core control cable engineered for industrial automation, process control, and instrumentation applications where signal integrity and long-term reliability are critical.",
  "Built with tinned copper conductors and precision EMI shielding, this cable delivers stable transmission in demanding environments — from factory floors and power plants to HVAC systems and building management networks.",
  "Flame retardant, oil and chemical resistant, and RoHS compliant, RAD Kabel control cable is designed for fixed installation in dry and damp locations, offering high flexibility for easier routing in tight panels and conduits.",
];

const FEATURES = [
  { icon: Waves, label: "High Flexibility" },
  { icon: Shield, label: "Oil & Chemical Resistant" },
  { icon: Zap, label: "EMI Shielded" },
  { icon: Flame, label: "Flame Retardant" },
  { icon: Leaf, label: "RoHS Compliant" },
];

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "construction", label: "Construction" },
  { id: "specifications", label: "Technical Specifications" },
  { id: "standards", label: "Standards" },
  { id: "applications", label: "Applications" },
  { id: "documents", label: "Documents" },
];

const OVERVIEW_POINTS = [
  "Multi-core design for complex control circuits",
  "Tinned copper conductors for corrosion resistance",
  "PVC / XLPE insulation for electrical safety",
  "Overall PVC sheath for mechanical protection",
  "Suitable for fixed installation in dry & damp locations",
  "Ideal for industrial automation & process control",
];

const CONSTRUCTION = [
  ["Conductor", "Tinned Copper, Class 5"],
  ["Insulation", "PVC / XLPE"],
  ["Inner Sheath", "PVC (Optional)"],
  ["Shielding", "Aluminium Mylar / Braided Copper"],
  ["Outer Sheath", "PVC"],
  ["Core Identification", "Color Coded / Numbered"],
];

const KEY_FEATURES = [
  "Reliable performance in harsh industrial conditions",
  "Excellent signal integrity with EMI shielding",
  "Flexible design for easy routing in tight spaces",
  "Long service life with premium materials",
  "Compliant with international safety standards",
];

const APPLICATIONS = [
  { label: "Process Control", icon: Settings, image: imgIndustrial },
  { label: "Industrial Automation", icon: Factory, image: imgDataCenters },
  { label: "Power Plants", icon: Zap, image: imgInfrastructure },
  { label: "HVAC Systems", icon: Wind, image: imgCommercial },
  { label: "Building Mgmt", icon: Building2, image: imgResidential },
  { label: "Machinery Control", icon: Cog, image: imgHospitals },
];

const SPECS = [
  ["Voltage Rating", "450 / 750 V"],
  ["Conductor Size", "0.5 – 2.5 sq mm"],
  ["No. of Cores", "2 – 24 Core"],
  ["Insulation", "PVC / XLPE"],
  ["Temperature Range", "-15°C to +70°C"],
  ["Bending Radius", "8 × Cable Diameter"],
  ["Flame Test", "IEC 60332-1"],
  ["Standard", "IS 7098 (Part 1)"],
];

const DOWNLOADS = [
  { title: "Technical Datasheet", type: "PDF", size: "1.2 MB", href: "/brochure.pdf" },
  { title: "Installation Guide", type: "PDF", size: "850 KB", href: "/brochure.pdf" },
  { title: "Test Certificates", type: "ZIP", size: "3.4 MB", href: "/brochure.pdf" },
  { title: "CAD Drawings", type: "ZIP", size: "2.1 MB", href: "/brochure.pdf" },
];

const TRUST = [
  { icon: Award, title: "Quality Assured", desc: "ISO certified manufacturing" },
  { icon: Shield, title: "Tested & Certified", desc: "Rigorous quality control" },
  { icon: Truck, title: "On Time Delivery", desc: "Pan-India logistics network" },
  { icon: Headphones, title: "Customer Satisfaction", desc: "Dedicated support team" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

function ScrollSection({ id, children, className = "" }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={stagger}
    >
      {children}
    </motion.section>
  );
}

export default function ProductLandingPage() {
  const [activeThumb, setActiveThumb] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const sections = TABS.map((t) => document.getElementById(t.id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveTab(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="product-landing font-sans">
      <div className="pl-hero-band">
        <nav className="pl-breadcrumb pl-container" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="pl-breadcrumb-sep">›</span>
          <Link to="/#products">Products</Link>
          <span className="pl-breadcrumb-sep">›</span>
          <span>Control Cables</span>
          <span className="pl-breadcrumb-sep">›</span>
          <span className="pl-breadcrumb-current">Multi Core Control Cable</span>
        </nav>

        <div className="pl-hero pl-container">
          <div className="pl-thumbs" role="tablist" aria-label="Product gallery">
            {GALLERY.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeThumb === index}
                className={`pl-thumb${activeThumb === index ? " is-active" : ""}`}
                onClick={() => setActiveThumb(index)}
              >
                <img src={item.src} alt="" loading="lazy" decoding="async" draggable={false} />
              </button>
            ))}
          </div>

          <div className="pl-main-image-wrap">
            <span className="pl-glow-ring" style={{ width: "70%", height: "70%", top: "15%", left: "15%" }} aria-hidden />
            <motion.div
              className="pl-engineered-badge"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Sparkles size={16} strokeWidth={2.5} aria-hidden />
              Engineered to Perform · Built to Last
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeThumb}
                src={GALLERY[activeThumb].src}
                alt={GALLERY[activeThumb].alt}
                className="pl-main-image"
                width={1200}
                height={1200}
                decoding="sync"
                fetchPriority="high"
                draggable={false}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            </AnimatePresence>
          </div>

          <motion.div
            className="pl-info"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.h1 className="pl-hero-title" variants={fadeUp}>
              <span className="pl-hero-line">Multi Core</span>
              <span className="pl-hero-line">Control Cable</span>
            </motion.h1>
            <motion.p className="pl-hero-voltage" variants={fadeUp}>
              450 / 750 V
            </motion.p>
            <div className="pl-hero-desc-block">
              {HERO_DESCRIPTION.map((paragraph) => (
                <motion.p key={paragraph.slice(0, 40)} className="pl-hero-desc" variants={fadeUp}>
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.div className="pl-feature-row" variants={stagger}>
              {FEATURES.map(({ icon: Icon, label }, i) => (
                <motion.div key={label} className="pl-feature-item" variants={fadeUp} custom={i}>
                  <span className="pl-feature-icon">
                    <Icon size={24} strokeWidth={2.25} aria-hidden />
                  </span>
                  <span className="pl-feature-label">{label}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="pl-cta-row" variants={fadeUp}>
              <a href="tel:18001237070" className="pl-btn-primary">
                <FileText size={20} strokeWidth={2.5} aria-hidden />
                Enquire Now
              </a>
              <a href="/brochure.pdf" download className="pl-btn-outline">
                <Download size={20} strokeWidth={2.5} aria-hidden />
                Download Datasheet
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="pl-tabs-wrap">
        <div className="pl-container">
          <div className="pl-tabs" role="tablist" aria-label="Product sections">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`pl-tab${activeTab === tab.id ? " is-active" : ""}`}
                onClick={() => scrollTo(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pl-container">
        <ScrollSection id="overview" className="pl-info-grid">
          <motion.div variants={fadeUp}>
            <h2 className="pl-section-heading">Overview</h2>
            <p className="mb-4 text-sm leading-relaxed text-white/75">
              RAD Kabel Multi Core Control Cable is engineered for precision signal and control
              circuits in industrial environments. The tinned copper conductors ensure excellent
              conductivity and corrosion resistance, while the EMI shielding protects against
              electromagnetic interference.
            </p>
            <ul className="pl-check-list">
              {OVERVIEW_POINTS.map((point) => (
                <li key={point}>
                  <Check size={16} strokeWidth={3} aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div id="construction" variants={fadeUp}>
            <h2 className="pl-section-heading">Construction</h2>
            <table className="pl-construction-table">
              <tbody>
                {CONSTRUCTION.map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h2 className="pl-section-heading">Key Features</h2>
            {KEY_FEATURES.map((text, i) => (
              <div key={text} className="pl-key-feature">
                <span className="pl-key-feature-icon">{i + 1}</span>
                <p>{text}</p>
              </div>
            ))}
          </motion.div>
        </ScrollSection>

        <ScrollSection id="applications" className="pl-applications">
          <motion.h2 className="pl-section-heading" variants={fadeUp}>
            Applications
          </motion.h2>
          <div className="pl-app-grid">
            {APPLICATIONS.map(({ label, icon: Icon, image }, i) => (
              <motion.article
                key={label}
                className="pl-app-card"
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <img src={image} alt="" loading="lazy" />
                <div className="pl-app-overlay" aria-hidden />
                <Icon className="pl-app-icon" size={32} strokeWidth={2} aria-hidden />
                <span className="pl-app-label">{label}</span>
              </motion.article>
            ))}
          </div>
        </ScrollSection>

        <ScrollSection id="specifications" className="pl-bottom-grid">
          <motion.div variants={fadeUp}>
            <h2 className="pl-section-heading">Technical Specifications</h2>
            <table className="pl-spec-table">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Specification</th>
                </tr>
              </thead>
              <tbody>
                {SPECS.map(([param, spec]) => (
                  <tr key={param}>
                    <td>{param}</td>
                    <td>{spec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div id="documents" variants={fadeUp}>
            <h2 className="pl-section-heading">Downloads</h2>
            <div className="pl-download-list">
              {DOWNLOADS.map((file) => (
                <a key={file.title} href={file.href} download className="pl-download-item">
                  <div className="pl-download-meta">
                    <strong>{file.title}</strong>
                    <span>
                      {file.type} · {file.size}
                    </span>
                  </div>
                  <span className="pl-download-btn" aria-hidden>
                    <Download size={16} strokeWidth={2.5} />
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div id="standards" variants={fadeUp}>
            <div className="pl-help-card">
              <div className="pl-help-inner">
                <div className="pl-help-copy">
                  <h3>
                    Need Help?
                    <br />
                    Choosing the Right Cable?
                  </h3>
                  <p>
                    Our technical experts can help you select the perfect cable for your
                    application.
                  </p>
                  <ul className="pl-check-list mb-4">
                    <li>
                      <Check size={14} strokeWidth={3} aria-hidden />
                      Free technical consultation
                    </li>
                    <li>
                      <Check size={14} strokeWidth={3} aria-hidden />
                      Custom cable solutions
                    </li>
                    <li>
                      <Check size={14} strokeWidth={3} aria-hidden />
                      Bulk order discounts
                    </li>
                  </ul>
                  <a href="tel:18001237070" className="pl-btn-primary">
                    <Headphones size={16} strokeWidth={2.5} aria-hidden />
                    Talk to an Expert
                  </a>
                </div>
                <div className="pl-help-visual">
                  <div className="pl-help-avatar">
                    <Headphones size={48} strokeWidth={1.5} aria-hidden />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </ScrollSection>

        <ScrollSection className="pl-trust">
          {TRUST.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={title} className="pl-trust-item" variants={fadeUp} custom={i}>
              <span className="pl-trust-icon">
                <Icon size={22} strokeWidth={2} aria-hidden />
              </span>
              <strong>{title}</strong>
              <span>{desc}</span>
            </motion.div>
          ))}
        </ScrollSection>
      </div>
    </main>
  );
}
