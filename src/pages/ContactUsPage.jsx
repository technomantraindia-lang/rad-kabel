import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import {
  ArrowRight,
  Building2,
  Headset,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  PencilLine,
  ShieldCheck,
  Truck,
  User,
  Users,
} from "lucide-react";

import "./ContactUsPage.css";
import useContactUsPageAnimations from "../hooks/useContactUsPageAnimations.js";

import heroBg from "../assets/contact-us/contact-banner-new.png";
import networkMap from "../assets/contact-us/indian-map.png";
import headOfficeImage from "../assets/contact-us/our-offices-1.png";
import corporateOfficeImage from "../assets/contact-us/our-offices-2.png";
import warehouseImage from "../assets/contact-us/our-offices-3.png";

/** Award ribbon / seal — quality callout */
function IconQualitySeal({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M20 3.5 23.2 7.8l5.1-.7 1.6 4.9 4.6 2.3-2.1 4.7 2.1 4.7-4.6 2.3-1.6 4.9-5.1-.7L20 36.5l-3.2-4.3-5.1.7-1.6-4.9-4.6-2.3 2.1-4.7-2.1-4.7 4.6-2.3 1.6-4.9 5.1.7L20 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="20" r="7.2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M16.4 20.2 18.8 22.6 23.8 17.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Interlocking hex process marks — technical expertise */
function IconTechExpertise({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M14.5 8.2 20 5l5.5 3.2v6.4L20 17.8l-5.5-3.2V8.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 20.2 13 17l5.5 3.2v6.4L13 29.8 7.5 26.6v-6.4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M21.5 20.2 27 17l5.5 3.2v6.4L27 29.8l-5.5-3.2v-6.4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <text x="18.4" y="13.6" fill="currentColor" fontSize="5.2" fontWeight="700" fontFamily="system-ui,sans-serif">
        1
      </text>
      <text x="11.4" y="25.4" fill="currentColor" fontSize="5.2" fontWeight="700" fontFamily="system-ui,sans-serif">
        2
      </text>
      <text x="25.4" y="25.4" fill="currentColor" fontSize="5.2" fontWeight="700" fontFamily="system-ui,sans-serif">
        3
      </text>
    </svg>
  );
}

const CONTACT_CARDS = [
  {
    Icon: Phone,
    title: "Call Us",
    value: "1800 123 7070",
    detail: "Mon - Sat : 9AM - 7PM",
    href: "tel:18001237070",
  },
  {
    Icon: Mail,
    title: "Email Us",
    value: "info@radkabel.com",
    detail: "We reply within 24 hours",
    href: "mailto:info@radkabel.com",
  },
  {
    Icon: MessageCircle,
    title: "WhatsApp Us",
    value: "+91 98765 43210",
    detail: "Quick support on WhatsApp",
    href: "https://wa.me/919876543210",
  },
  {
    Icon: Headset,
    title: "Customer Support",
    value: "support@radkabel.com",
    detail: "For after-sales assistance",
    href: "mailto:support@radkabel.com",
  },
];

const TRUST_POINTS = [
  { Icon: ShieldCheck, label: "Premium Quality Products" },
  { Icon: Truck, label: "Timely Delivery" },
  { Icon: IconTechExpertise, label: "Technical Expertise" },
  { Icon: Users, label: "Customer Satisfaction" },
];

const OFFICE_CARDS = [
  {
    image: headOfficeImage,
    title: "Head Office",
    lines: [
      "RAD KABEL Private Limited",
      "Survey No. 123, Near GIDC,",
      "Phase 2, Dared, Jamnagar,",
      "Gujarat - 361004, India",
      "+91 288 359 7171",
    ],
  },
  {
    image: corporateOfficeImage,
    title: "Corporate Office",
    lines: [
      "B-201, Titanium City Center,",
      "100 Ft. Anand Nagar Road,",
      "Satellite, Ahmedabad,",
      "Gujarat - 380015, India",
      "+91 79 4005 7171",
    ],
  },
  {
    image: warehouseImage,
    title: "Warehouse",
    lines: [
      "Plot No. 45, Survey No. 67,",
      "Near Logistics Park,",
      "Bavla, Ahmedabad,",
      "Gujarat - 382220, India",
      "+91 79 4005 7172",
    ],
  },
];

const QUICK_LINKS = [
  { label: "Dealer Enquiry", href: "/dealer-network" },
  { label: "Product Enquiry", href: "/products" },
  { label: "Technical Support", href: "/technology" },
  { label: "Bulk Order Enquiry", href: "/products" },
  { label: "Partnership", href: "/dealer-network" },
  { label: "Feedback / Suggestions", href: "/contact-us" },
];

const INITIAL_FORM = {
  fullName: "",
  company: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
};

function FieldIcon({ icon: Icon }) {
  return (
    <span className="cu-field-icon" aria-hidden>
      <Icon size={17} strokeWidth={1.7} />
    </span>
  );
}

export default function ContactUsPage() {
  const pageRef = useRef(null);
  useContactUsPageAnimations(pageRef);

  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const onField = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm(INITIAL_FORM);
  };

  return (
    <main ref={pageRef} className="cu-page contact-us-page">
      <section className="cu-hero" aria-labelledby="cu-hero-heading">
        <div className="cu-hero__bg" aria-hidden>
          <img src={heroBg} alt="" decoding="async" fetchPriority="high" />
        </div>
        <div className="cu-hero__shade" aria-hidden />

        <div className="cu-container cu-hero__layout">
          <div className="cu-hero__copy">
            <h1 id="cu-hero-heading" className="cu-hero__title">
              <span className="cu-hero__title-line">WE ARE HERE</span>
              <span className="cu-hero__title-line">TO <span className="cu-accent">CONNECT.</span></span>
            </h1>
            <div className="cu-hero__underline" aria-hidden />
            <p className="cu-hero__desc">
              Have a question, need support, or want to partner with RAD KABEL? Our
              team is here to help you with the right solution.
            </p>
          </div>
        </div>
      </section>

      <section className="cu-utility" aria-label="Primary contact methods">
        <div className="cu-container">
          <div className="cu-utility__row">
            {CONTACT_CARDS.map(({ Icon, title, value, detail, href }) => (
              <a key={title} className="cu-utility-card cu-utility__item" href={href}>
                <span className="cu-utility-card__icon" aria-hidden>
                  <Icon size={28} strokeWidth={1.75} />
                </span>
                <span className="cu-utility-card__copy">
                  <span className="cu-utility-card__title">{title}</span>
                  <span className="cu-utility-card__value">{value}</span>
                  <span className="cu-utility-card__detail">{detail}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="cu-touch" aria-labelledby="cu-touch-heading">
        <div className="cu-container cu-touch__layout">
          <div className="cu-touch__left">
            <article className="cu-about-card">
              <div className="cu-about-card__top">
                <div className="cu-about-card__intro">
                  <h2 id="cu-touch-heading" className="cu-about-card__title">
                    <span className="cu-accent">RAD KABEL</span> PRIVATE LIMITED
                  </h2>
                  <p className="cu-about-card__desc">
                    We are committed to delivering quality products, timely service and
                    long-term value to our partners and customers across India.
                  </p>

                  <div className="cu-quality-box">
                    <IconQualitySeal className="cu-quality-box__icon" />
                    <p>
                      <strong>QUALITY YOU TRUST.</strong>
                      <span>SERVICE YOU DESERVE.</span>
                      <em>RAD KABEL</em>
                    </p>
                  </div>
                </div>

                <ul className="cu-trust-list">
                  {TRUST_POINTS.map(({ Icon, label }) => (
                    <li key={label} className="cu-trust-list__item">
                      <span className="cu-trust-list__icon" aria-hidden>
                        <Icon className="cu-trust-list__svg" size={30} strokeWidth={1.7} />
                      </span>
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <article className="cu-offices-panel">
              <h3 className="cu-section-title">OUR OFFICES</h3>
              <div className="cu-offices-grid">
                {OFFICE_CARDS.map(({ image, title, lines }) => (
                  <div key={title} className="cu-office-card">
                    <img src={image} alt={title} loading="lazy" decoding="async" />
                    <div className="cu-office-card__body">
                      <p className="cu-office-card__title">
                        <MapPin size={14} strokeWidth={1.9} aria-hidden />
                        <span>{title}</span>
                      </p>
                      <address className="cu-office-card__address">
                        {lines.map((line) => (
                          <span key={line}>{line}</span>
                        ))}
                      </address>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="cu-network">
              <div className="cu-network__copy">
                <h3 className="cu-section-title">WE ARE ACROSS INDIA</h3>
                <p className="cu-network__desc">
                  Our strong distribution network ensures that RAD KABEL is always
                  close to you.
                </p>
                <Link to="/dealer-network" className="cu-btn cu-btn--outline">
                  Find A Dealer Near You
                  <MapPin size={15} aria-hidden />
                </Link>
              </div>
              <div className="cu-network__map">
                <img
                  src={networkMap}
                  alt="Map of India showing RAD KABEL presence across the country"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>
          </div>

          <div className="cu-touch__right">
            <article className="cu-form-panel" id="cu-form">
              <h2 className="cu-form-panel__title">
                SEND US A <span className="cu-accent">MESSAGE</span>
              </h2>
              <p className="cu-form-panel__desc">
                Fill out the form below and our team will get back to you as soon as
                possible.
              </p>

              <form className="cu-form" onSubmit={onSubmit}>
                <label className="cu-field cu-field--full">
                  <span className="cu-visually-hidden">Full Name</span>
                  <FieldIcon icon={User} />
                  <input
                    required
                    name="fullName"
                    autoComplete="name"
                    placeholder="Full Name *"
                    value={form.fullName}
                    onChange={onField("fullName")}
                  />
                </label>

                <label className="cu-field cu-field--full">
                  <span className="cu-visually-hidden">Company / Organization</span>
                  <FieldIcon icon={Building2} />
                  <input
                    required
                    name="company"
                    autoComplete="organization"
                    placeholder="Company / Organization *"
                    value={form.company}
                    onChange={onField("company")}
                  />
                </label>

                <div className="cu-form__row">
                  <label className="cu-field">
                    <span className="cu-visually-hidden">Mobile Number</span>
                    <FieldIcon icon={Phone} />
                    <input
                      required
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      placeholder="Mobile Number *"
                      value={form.phone}
                      onChange={onField("phone")}
                    />
                  </label>

                  <label className="cu-field">
                    <span className="cu-visually-hidden">Email Address</span>
                    <FieldIcon icon={Mail} />
                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="Email Address *"
                      value={form.email}
                      onChange={onField("email")}
                    />
                  </label>
                </div>

                <label className="cu-field cu-field--full">
                  <span className="cu-visually-hidden">Subject</span>
                  <FieldIcon icon={PencilLine} />
                  <input
                    required
                    name="subject"
                    placeholder="Subject *"
                    value={form.subject}
                    onChange={onField("subject")}
                  />
                </label>

                <label className="cu-field cu-field--full cu-field--textarea">
                  <span className="cu-visually-hidden">Message</span>
                  <FieldIcon icon={MessageCircle} />
                  <textarea
                    required
                    name="message"
                    rows={6}
                    placeholder="Message *"
                    value={form.message}
                    onChange={onField("message")}
                  />
                </label>

                <button type="submit" className="cu-btn cu-btn--primary cu-form__submit">
                  Send Message
                  <ArrowRight size={16} aria-hidden />
                </button>

                {submitted ? (
                  <p className="cu-form__success" role="status">
                    Thank you. Your message has been received and our team will contact you shortly.
                  </p>
                ) : null}

                <p className="cu-form__secure">
                  <ShieldCheck size={15} aria-hidden />
                  Your information is secure and will not be shared.
                </p>
              </form>
            </article>

            <article className="cu-quick-links">
              <h3 className="cu-section-title">QUICK LINKS</h3>
              <div className="cu-quick-links__grid">
                {QUICK_LINKS.map(({ label, href }) => (
                  <Link key={label} to={href} className="cu-channel cu-quick-link">
                    <span className="cu-quick-link__icon" aria-hidden>
                      <Package size={18} strokeWidth={1.75} />
                    </span>
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
