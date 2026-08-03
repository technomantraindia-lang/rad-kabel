import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Download,
  MapPin,
  Phone,
  Mail,
  User,
  Building2,
  Briefcase,
  MessageSquare,
  ChevronDown,
  Plus,
  Minus,
  Star,
  Lock,
  Quote,
  TrendingUp,
  IndianRupee,
  Truck,
  Megaphone,
  GraduationCap,
  Headset,
  ClipboardList,
  Search,
  Users,
  Handshake,
  Check,
  ShieldCheck,
  Clock,
  Globe2,
  Link2,
  Warehouse,
  Store,
  HardHat,
  Zap,
} from "lucide-react";
import "./DealerNetworkPage.css";
import useDealerPageAnimations from "../hooks/useDealerPageAnimations.js";
import { sendFormEmails } from "../lib/sendFormEmails.js";
import { handleDownloadBrochure } from "../utils/downloadBrochure.js";

import heroBg from "../assets/dealer-network/dealer-hero-bg.png";
import whoBgWholesalers from "../assets/dealer-network/who-bg-wholesalers.png";
import whoBgRetailers from "../assets/dealer-network/who-bg-retailers.png";
import whoBgSuppliers from "../assets/dealer-network/who-bg-suppliers.png";
import whoBgDistributors from "../assets/dealer-network/who-bg-distributors.png";
import mapIndia from "../assets/dealer-network/indian-map.png";
import benefitsHandshake from "../assets/dealer-network/benefits-handshake.png";
import supportLocator from "../assets/dealer-network/support-locator.png";
import supportLogin from "../assets/dealer-network/support-login.png";
import supportSupport from "../assets/dealer-network/support-support.png";
import bottomCtaBg from "../assets/dealer-network/bottom-cta-bg.png";
import avatar1 from "../assets/dealer-network/avatar-1.png";
import avatar2 from "../assets/dealer-network/avatar-2.png";
import avatar3 from "../assets/dealer-network/avatar-3.png";

const WHY_PARTNER = [
  {
    Icon: TrendingUp,
    title: "GROWING BRAND",
    desc: "Build your business with a fast-growing cable brand.",
  },
  {
    Icon: IndianRupee,
    title: "ATTRACTIVE BUSINESS OPPORTUNITY",
    desc: "Competitive products and strong market potential.",
  },
  {
    Icon: Truck,
    title: "RELIABLE SUPPLY",
    desc: "Consistent production and timely dispatch.",
  },
  {
    Icon: Megaphone,
    title: "MARKETING SUPPORT",
    desc: "Catalogues, branding material, displays and promotional support.",
  },
  {
    Icon: GraduationCap,
    title: "PRODUCT TRAINING",
    desc: "Technical guidance and training for your sales team.",
  },
  {
    Icon: Headset,
    title: "DEDICATED SUPPORT",
    desc: "Quick assistance from our dealer support team.",
  },
];

const WHO_DEALERS = [
  { bg: whoBgWholesalers, Icon: Warehouse, label: ["ELECTRICAL", "WHOLESALERS"] },
  { bg: whoBgRetailers, Icon: Store, label: ["ELECTRICAL", "RETAILERS"] },
  { bg: whoBgSuppliers, Icon: HardHat, label: ["BUILDING MATERIAL", "SUPPLIERS"] },
  { bg: whoBgDistributors, Icon: Zap, label: ["ELECTRICAL", "DISTRIBUTORS"] },
];

const STATES = [
  "Gujarat",
  "Maharashtra",
  "Rajasthan",
  "Delhi",
  "Karnataka",
  "Tamil Nadu",
  "Madhya Pradesh",
  "Uttar Pradesh",
  "West Bengal",
  "Andhra Pradesh",
  "Telangana",
];

const BENEFITS = [
  "Marketing Material & Branding Support",
  "Product Catalogue & Brochures",
  "Technical Support & Product Training",
  "Business Growth Opportunities",
  "Dedicated Sales Assistance",
  "Strong & Trusted Brand Identity",
];

const STEPS = [
  {
    n: 1,
    Icon: ClipboardList,
    title: "SUBMIT INQUIRY",
    desc: "Fill out the dealer registration form.",
  },
  {
    n: 2,
    Icon: Search,
    title: "BUSINESS VERIFICATION",
    desc: "Our team will verify your business details.",
  },
  {
    n: 3,
    Icon: Users,
    title: "DISCUSSION WITH SALES TEAM",
    desc: "We will connect with you to discuss opportunities.",
  },
  {
    n: 4,
    Icon: Handshake,
    title: "START SELLING RAD KABEL",
    desc: "Get onboarded and start growing with us.",
  },
];

const STORIES = [
  {
    quote:
      "RAD KABEL products have helped us build customer trust through quality and reliable support. Our business has grown steadily since we partnered with them.",
    name: "Rajesh M.",
    role: "Electrical Wholesaler, Pune",
    avatar: avatar1,
  },
  {
    quote:
      "The product quality, timely delivery, and marketing support from RAD KABEL are excellent. Highly recommended for electrical businesses.",
    name: "Suresh K.",
    role: "Retailer, Ahmedabad",
    avatar: avatar2,
  },
  {
    quote:
      "Excellent brand with strong market demand. RAD KABEL has become our top-selling cable brand.",
    name: "Amit P.",
    role: "Distributor, Hyderabad",
    avatar: avatar3,
  },
];

const FAQS = [
  {
    q: "What is the minimum order quantity?",
    a: "Minimum order quantities vary by product range. Our sales team will share MOQ details based on your region and business type during onboarding.",
  },
  {
    q: "How long does the dealer approval process take?",
    a: "Most applications are reviewed within 7–10 business days after complete documentation is received.",
  },
  {
    q: "Do you provide marketing and branding support?",
    a: "Yes. Authorized dealers receive catalogues, branding kits, display materials and promotional support.",
  },
  {
    q: "Can I apply to become a dealer from any state?",
    a: "Yes. We are expanding pan-India and welcome applications from all states, subject to territory availability.",
  },
  {
    q: "Is there any security deposit required?",
    a: "Security deposit requirements depend on dealership category and territory. Details are shared during the discussion stage.",
  },
];

const TRUST = [
  { Icon: ShieldCheck, line1: "Premium Quality", line2: "Products" },
  { Icon: Clock, line1: "Timely Delivery", line2: "Across India" },
  { Icon: Users, line1: "Trusted By", line2: "Professionals" },
  { Icon: Globe2, line1: "Growing Network", line2: "Pan India" },
  { Icon: Handshake, line1: "Long Term", line2: "Partnerships" },
  { Icon: Link2, line1: "Committed to", line2: "Your Growth" },
];

const emptyForm = {
  fullName: "",
  company: "",
  city: "",
  state: "",
  phone: "",
  email: "",
  businessType: "",
  years: "",
  monthly: "",
  message: "",
};

const BUSINESS_TYPE_OPTIONS = [
  "Wholesaler",
  "Retailer",
  "Distributor",
  "Building Material Supplier",
];

const YEARS_OPTIONS = ["0–2 years", "2–5 years", "5–10 years", "10+ years"];

const MONTHLY_OPTIONS = ["Under ₹2 Lakh", "₹2–5 Lakh", "₹5–10 Lakh", "Above ₹10 Lakh"];

function DnSelect({
  Icon,
  value,
  onChange,
  placeholder,
  options,
  required = false,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const label = value || placeholder;

  return (
    <div
      ref={rootRef}
      className={`dn-field dn-field--select ${className}`.trim()}
      data-open={open ? "true" : "false"}
    >
      <Icon size={16} aria-hidden />
      <button
        type="button"
        className={`dn-select__trigger${value ? "" : " dn-select__trigger--placeholder"}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
      </button>
      <ChevronDown size={16} className="dn-field__chevron" aria-hidden />
      {open ? (
        <ul className="dn-select__menu" role="listbox" aria-label={placeholder.replace(/\*$/, "")}>
          {options.map((option) => (
            <li key={option} role="option" aria-selected={value === option}>
              <button
                type="button"
                className={`dn-select__option${value === option ? " is-active" : ""}`}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {/* Keep native select for form required validation / progressive enhancement */}
      <select
        className="dn-select__native"
        required={required}
        tabIndex={-1}
        aria-hidden
        value={value}
        onChange={() => {}}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function DealerNetworkPage() {
  const pageRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [storyIndex, setStoryIndex] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useDealerPageAnimations(pageRef);

  const onField = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (status === "error" || status === "success") {
      setStatus("idle");
      setErrorMessage("");
      setSuccessMessage("");
    }
  };

  const onSelectField = (key) => (value) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (status === "error" || status === "success") {
      setStatus("idle");
      setErrorMessage("");
      setSuccessMessage("");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.businessType || !form.years || !form.monthly) {
      setStatus("error");
      setErrorMessage("Please complete Business Type, Years in Business, and Monthly Purchase Requirement.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const result = await sendFormEmails({
        formName: "Dealer Registration",
        customerEmail: form.email,
        customerName: form.fullName,
        fields: {
          "Full Name": form.fullName,
          "Company / Shop Name": form.company,
          City: form.city,
          State: form.state,
          "Mobile Number": form.phone,
          "Email Address": form.email,
          "Business Type": form.businessType,
          "Years in Business": form.years,
          "Monthly Purchase Requirement": form.monthly,
          "Message / Additional Information": form.message || "—",
        },
      });
      setStatus("success");
      setSuccessMessage(
        result?.delivery === "formsubmit"
          ? "Thank you. Your dealer registration has been submitted successfully. We will contact you shortly."
          : "Thank you. Your dealer registration has been received. We will contact you shortly."
      );
      setForm(emptyForm);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err?.text || err?.message || "Unable to submit registration. Please try again."
      );
    }
  };

  const visibleStories = [
    STORIES[storyIndex % STORIES.length],
    STORIES[(storyIndex + 1) % STORIES.length],
    STORIES[(storyIndex + 2) % STORIES.length],
  ];

  return (
    <main ref={pageRef} className="dn-page">
      <div className="dn-breadcrumb">
        <nav className="dn-breadcrumb__nav" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span className="dn-breadcrumb__current">Dealer Network</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="dn-hero" aria-labelledby="dn-hero-heading">
        <div className="dn-hero__frame">
          <img
            src={heroBg}
            alt=""
            className="dn-hero__bg"
            decoding="async"
            fetchPriority="high"
            aria-hidden
          />
          <div className="dn-hero__shade" aria-hidden />
          <div className="dn-hero__inner">
            <div className="dn-hero__copy">
              <h1 id="dn-hero-heading" className="dn-hero__title">
                <span className="dn-hero__title-line">GROW YOUR BUSINESS</span>
                <span className="dn-hero__title-line">
                  WITH <span className="dn-accent">RAD KABEL</span>
                </span>
              </h1>
              <p className="dn-hero__desc">
                Join our growing network of trusted dealers and become part of a brand committed to
                quality, innovation and long-term business growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="dn-why" aria-labelledby="dn-why-heading">
        <div className="dn-container">
          <h2 id="dn-why-heading" className="dn-section-title dn-section-title--center">
            WHY PARTNER WITH <span className="dn-accent">RAD KABEL?</span>
          </h2>
          <ul className="dn-why__grid">
            {WHY_PARTNER.map(({ Icon, title, desc }) => (
              <li key={title} className="dn-why__card">
                <span className="dn-why__icon" aria-hidden>
                  <Icon className="dn-why__icon-svg" size={46} strokeWidth={1.5} />
                </span>
                <h3>{title}</h3>
                <p>{desc}</p>
                <span className="dn-why__rule" aria-hidden />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who + Network */}
      <section className="dn-who-net" aria-label="Who can become a dealer and our network">
        <div className="dn-container dn-who-net__layout">
          <div className="dn-who">
            <h2 className="dn-section-title">
              WHO CAN BECOME A <span className="dn-accent">DEALER?</span>
            </h2>
            <ul className="dn-who__grid">
              {WHO_DEALERS.map(({ bg, Icon, label }) => (
                <li key={label.join(" ")} className="dn-who__card" aria-label={label.join(" ")}>
                  <div className="dn-who__media">
                    <img
                      src={bg}
                      alt=""
                      className="dn-who__bg"
                      loading="eager"
                      decoding="async"
                      aria-hidden
                    />
                    <div className="dn-who__media-shade" aria-hidden />
                  </div>
                  <span className="dn-who__badge" aria-hidden>
                    <Icon className="dn-who__badge-icon" size={22} strokeWidth={1.75} />
                  </span>
                  <div className="dn-who__label">
                    {label.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="dn-network">
            <h2 className="dn-section-title">
              OUR <span className="dn-accent">DEALER NETWORK</span>
            </h2>
            <div className="dn-network__panel">
              <div className="dn-network__map-col">
                <img
                  src={mapIndia}
                  alt="Map of India showing RAD KABEL dealer locations"
                  className="dn-network__map"
                  decoding="async"
                  loading="eager"
                />
              </div>
              <ul className="dn-network__states">
                {STATES.map((state) => (
                  <li key={state}>
                    <MapPin size={14} aria-hidden />
                    {state}
                  </li>
                ))}
                <li className="dn-network__more">… and many more</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="dn-benefits" aria-labelledby="dn-benefits-heading">
        <div className="dn-container dn-benefits__layout">
          <div className="dn-benefits__media">
            <img
              src={benefitsHandshake}
              alt="Business partnership handshake"
              decoding="async"
              loading="lazy"
            />
            <div className="dn-benefits__caption">
              <span>STRONG PARTNERSHIP.</span>
              <span className="dn-accent">STRONGER GROWTH.</span>
            </div>
          </div>
          <div className="dn-benefits__panel">
            <h2 id="dn-benefits-heading" className="dn-section-title">
              DEALER <span className="dn-accent">BENEFITS</span>
            </h2>
            <ul className="dn-benefits__list">
              {BENEFITS.map((item) => (
                <li key={item}>
                  <span className="dn-benefits__check" aria-hidden>
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Dealer hub: process, stories, support | registration, FAQ */}
      <section className="dn-dealer-hub" aria-label="Dealer onboarding and support">
        <div className="dn-container dn-dealer-hub__grid">
          <div className="dn-dealer-hub__left">
            <div className="dn-process">
              <h2 className="dn-section-title">
                HOW TO BECOME A <span className="dn-accent">DEALER?</span>
              </h2>
              <ol className="dn-process__track">
                {STEPS.map(({ n, Icon, title, desc }, i) => (
                  <li key={title} className="dn-process__step">
                    <div className="dn-process__icon-wrap">
                      <span className="dn-process__num">{n}</span>
                      <span className="dn-process__icon" aria-hidden>
                        <Icon size={32} strokeWidth={1.6} />
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <span className="dn-process__connector" aria-hidden>
                        STEP »
                      </span>
                    )}
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="dn-stories" aria-labelledby="dn-stories-heading">
              <h2 id="dn-stories-heading" className="dn-section-title">
                SUCCESS STORIES FROM <span className="dn-accent">OUR DEALERS</span>
              </h2>
              <div className="dn-stories__grid">
                {visibleStories.map((story) => (
                  <article key={story.name + story.role} className="dn-story">
                    <Quote className="dn-story__quote" size={28} aria-hidden />
                    <p>{story.quote}</p>
                    <div className="dn-story__footer">
                      <div className="dn-story__stars" aria-label="5 star rating">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={14} fill="#f5c518" color="#f5c518" aria-hidden />
                        ))}
                      </div>
                      <div className="dn-story__person">
                        <img src={story.avatar} alt="" className="dn-story__avatar" />
                        <div>
                          <strong>— {story.name}</strong>
                          <span>{story.role}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="dn-stories__dots" role="tablist" aria-label="Testimonial pages">
                {STORIES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={i === storyIndex ? "is-active" : undefined}
                    aria-label={`Show stories starting at ${i + 1}`}
                    onClick={() => setStoryIndex(i)}
                  />
                ))}
              </div>
            </div>

            <div className="dn-support" id="dealer-locator">
              {[
                {
                  img: supportLocator,
                  title: "DEALER LOCATOR",
                  desc: "Find the nearest authorized RAD KABEL dealer in your area.",
                },
                {
                  img: supportLogin,
                  title: "DEALER LOGIN",
                  desc: "Access price lists, brochures, invoices, offers and product updates.",
                },
                {
                  img: supportSupport,
                  title: "DEALER SUPPORT",
                  desc: "Need help? Our dealer support team is here to assist you.",
                  cta: "CONTACT SUPPORT",
                  CtaIcon: Headset,
                  href: "/contact-us",
                },
              ].map(({ img, title, desc, cta, CtaIcon, href }, i) => (
                <article
                  key={title}
                  className={`dn-support__card dn-support__card--${i + 1}`}
                >
                  <img src={img} alt="" className="dn-support__bg" decoding="async" loading="lazy" />
                  <div className="dn-support__body">
                    <div className="dn-support__copy">
                      <h3>{title}</h3>
                      <p>{desc}</p>
                    </div>
                    {cta && CtaIcon && href ? (
                      <a href={href} className="dn-btn dn-btn--outline dn-support__btn">
                        {cta} <CtaIcon size={14} aria-hidden />
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="dn-dealer-hub__right">
            <div className="dn-form-wrap" id="dealer-registration">
              <h2 className="dn-section-title">
                DEALER <span className="dn-accent">REGISTRATION</span>
              </h2>
              <form className="dn-form" onSubmit={onSubmit}>
                <div className="dn-form__row">
                  <label className="dn-field">
                    <User size={16} aria-hidden />
                    <input
                      required
                      placeholder="Full Name*"
                      value={form.fullName}
                      onChange={onField("fullName")}
                    />
                  </label>
                  <label className="dn-field">
                    <Building2 size={16} aria-hidden />
                    <input
                      required
                      placeholder="Company / Shop Name*"
                      value={form.company}
                      onChange={onField("company")}
                    />
                  </label>
                </div>
                <div className="dn-form__row">
                  <label className="dn-field">
                    <MapPin size={16} aria-hidden />
                    <input required placeholder="City*" value={form.city} onChange={onField("city")} />
                  </label>
                  <label className="dn-field">
                    <MapPin size={16} aria-hidden />
                    <input
                      required
                      placeholder="State*"
                      value={form.state}
                      onChange={onField("state")}
                    />
                  </label>
                </div>
                <div className="dn-form__row">
                  <label className="dn-field">
                    <Phone size={16} aria-hidden />
                    <input
                      required
                      type="tel"
                      placeholder="Mobile Number*"
                      value={form.phone}
                      onChange={onField("phone")}
                    />
                  </label>
                  <label className="dn-field">
                    <Mail size={16} aria-hidden />
                    <input
                      required
                      type="email"
                      placeholder="Email Address*"
                      value={form.email}
                      onChange={onField("email")}
                    />
                  </label>
                </div>
                <div className="dn-form__row">
                  <DnSelect
                    Icon={Briefcase}
                    required
                    value={form.businessType}
                    onChange={onSelectField("businessType")}
                    placeholder="Business Type*"
                    options={BUSINESS_TYPE_OPTIONS}
                  />
                  <DnSelect
                    Icon={Briefcase}
                    required
                    value={form.years}
                    onChange={onSelectField("years")}
                    placeholder="Years in Business*"
                    options={YEARS_OPTIONS}
                  />
                </div>
                <DnSelect
                  Icon={Building2}
                  required
                  className="dn-field--full"
                  value={form.monthly}
                  onChange={onSelectField("monthly")}
                  placeholder="Monthly Purchase Requirement*"
                  options={MONTHLY_OPTIONS}
                />
                <label className="dn-field dn-field--full dn-field--textarea">
                  <MessageSquare size={16} aria-hidden />
                  <textarea
                    rows={3}
                    placeholder="Message / Additional Information"
                    value={form.message}
                    onChange={onField("message")}
                  />
                </label>
                <button
                  type="submit"
                  className="dn-btn dn-btn--primary dn-form__submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "SUBMITTING…" : "BECOME AN AUTHORIZED DEALER"}{" "}
                  <ArrowRight size={16} aria-hidden />
                </button>
                {status === "success" ? (
                  <p className="dn-form__success" role="status">
                    {successMessage}
                  </p>
                ) : null}
                {status === "error" ? (
                  <p className="dn-form__error" role="alert">
                    {errorMessage}
                  </p>
                ) : null}
                <p className="dn-form__secure">
                  <Lock size={14} aria-hidden />
                  Your information is secure and will not be shared.
                </p>
              </form>
            </div>

            <div className="dn-faq">
              <h2 className="dn-section-title">
                FREQUENTLY ASKED <span className="dn-accent">QUESTIONS</span>
              </h2>
              <ul className="dn-faq__list">
                {FAQS.map((item, i) => {
                  const open = openFaq === i;
                  return (
                    <li key={item.q} className={open ? "is-open" : undefined}>
                      <button
                        type="button"
                        className="dn-faq__q"
                        aria-expanded={open}
                        onClick={() => setOpenFaq(open ? null : i)}
                      >
                        <span>{item.q}</span>
                        {open ? <Minus size={18} aria-hidden /> : <Plus size={18} aria-hidden />}
                      </button>
                      {open && <p className="dn-faq__a">{item.a}</p>}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="dn-cta" aria-labelledby="dn-cta-heading">
        <div className="dn-cta__frame">
          <img src={bottomCtaBg} alt="" className="dn-cta__bg" decoding="async" aria-hidden />
          <div className="dn-cta__shade" aria-hidden />
          <div className="dn-cta__inner">
            <h2 id="dn-cta-heading" className="dn-cta__title">
              <span className="dn-cta__title-line">LET&apos;S GROW</span>{" "}
              <span className="dn-cta__title-line">
                <span className="dn-accent dn-cta__accent">TOGETHER.</span>
              </span>
            </h2>
            <p>
              Partner with RAD KABEL and become part of a growing network delivering quality electrical
              solutions across India.
            </p>
            <div className="dn-cta__actions">
              <a href="#dealer-registration" className="dn-btn dn-btn--primary">
                APPLY NOW <ArrowRight size={16} aria-hidden />
              </a>
              <a href="tel:18001237070" className="dn-btn dn-btn--outline">
                CONTACT SALES <Phone size={16} aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust ribbon */}
      <section className="dn-trust" aria-label="RAD Kabel commitments">
        <div className="dn-trust__inner">
          <ul className="dn-trust__grid">
            {TRUST.map(({ Icon, line1, line2 }) => (
              <li key={line1 + line2} className="dn-trust__item">
                <Icon className="dn-trust__icon" size={40} strokeWidth={1.75} aria-hidden />
                <span className="dn-trust__copy">
                  <strong>{line1}</strong>
                  <span>{line2}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
