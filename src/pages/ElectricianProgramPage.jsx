import { Link } from "react-router-dom";
import { useRef } from "react";
import useMarketingPageAnimations from "../hooks/useMarketingPageAnimations.js";
import {
  ArrowRight,
  Download,
  Check,
  Quote,
  Headset,
  HardHat,
} from "lucide-react";
import "./ElectricianProgramPage.css";
import "../styles/marketing-pages-animations.css";

import heroBanner from "../assets/electrician-program/hero-banner.png";
import whoCanJoinBg from "../assets/electrician-program/who-can-join-bg.png";
import joinProduct from "../assets/electrician-program/join-product.png";
import ctaSectionBg from "../assets/electrician-program/cta-section-bg.png";
import rewardToolkit from "../assets/electrician-program/rewards/reward-toolkit.png";
import rewardTools from "../assets/electrician-program/rewards/reward-tools.png";
import rewardMultimeter from "../assets/electrician-program/rewards/reward-multimeter.png";
import rewardWatch from "../assets/electrician-program/rewards/reward-watch.png";
import rewardAppliance from "../assets/electrician-program/rewards/reward-appliance.png";
import rewardMore from "../assets/electrician-program/rewards/rewards-more.png";
import avatar1 from "../assets/electrician-program/avatar-1.png";
import avatar2 from "../assets/electrician-program/avatar-2.png";
import avatar3 from "../assets/electrician-program/avatar-3.png";
import iconExcitingRewards from "../assets/electrician-program/why-join-icons/01-exciting-rewards.svg";
import iconCertifiedExpert from "../assets/electrician-program/why-join-icons/02-certified-expert.svg";
import iconTechnicalTraining from "../assets/electrician-program/why-join-icons/03-technical-training.svg";
import iconSpecialOffers from "../assets/electrician-program/why-join-icons/04-special-offers.svg";
import iconPrioritySupport from "../assets/electrician-program/why-join-icons/05-priority-support.svg";
import iconGrowBusiness from "../assets/electrician-program/why-join-icons/06-grow-your-business.svg";
import ElectricianHowStepIcon from "../components/ElectricianHowStepIcon";
import certifiedElectricianVisual from "../assets/electrician-program/support/certified-electrician-visual.png";
import supportIcon1 from "../assets/electrician-program/support/support-icon-1.png";
import supportIcon2 from "../assets/electrician-program/support/support-icon-2.png";
import supportIcon3 from "../assets/electrician-program/support/support-icon-3.png";
import supportIcon4 from "../assets/electrician-program/support/support-icon-4.png";
import supportIcon5 from "../assets/electrician-program/support/support-icon-5.png";
import supportIcon6 from "../assets/electrician-program/support/support-icon-6.png";
import supportIcon7 from "../assets/electrician-program/support/support-icon-7.png";
import supportIcon8 from "../assets/electrician-program/support/support-icon-8.png";

const WHY_JOIN = [
  {
    icon: iconExcitingRewards,
    title: "EXCITING REWARDS",
    lines: ["Earn points on every purchase and", "redeem attractive gifts."],
  },
  {
    icon: iconCertifiedExpert,
    title: "CERTIFIED EXPERT",
    lines: ["Get recognized as a RAD KABEL", "Certified Electrician."],
  },
  {
    icon: iconTechnicalTraining,
    title: "TECHNICAL TRAINING",
    lines: ["Enhance your skills with expert training", "and technical guidance."],
  },
  {
    icon: iconSpecialOffers,
    title: "SPECIAL OFFERS",
    lines: ["Enjoy exclusive discounts and", "seasonal offers."],
  },
  {
    icon: iconPrioritySupport,
    title: "PRIORITY SUPPORT",
    lines: ["Get priority support for all your", "product and technical queries."],
  },
  {
    icon: iconGrowBusiness,
    title: "GROW YOUR BUSINESS",
    lines: ["Access tools and benefits that help", "you grow your business."],
  },
];

const STEPS = [
  {
    step: 1,
    title: "REGISTER",
    lines: ["Sign up easily with your", "basic details."],
  },
  {
    step: 2,
    title: "BUY RAD KABEL",
    lines: ["Purchase RAD KABEL products", "from your distributor."],
  },
  {
    step: 3,
    title: "EARN POINTS",
    lines: ["Earn points on every", "eligible purchase."],
  },
  {
    step: 4,
    title: "REDEEM REWARDS",
    lines: ["Redeem your points for exciting", "gifts and benefits."],
  },
  {
    step: 5,
    title: "GET RECOGNIZED",
    lines: ["Become a RAD KABEL Certified", "Electrician and grow with us."],
  },
];

const WHO_JOIN = [
  "Electricians",
  "Contractors",
  "Technical Professionals",
  "Self Employed Professionals",
];

const REWARDS = [
  { img: rewardToolkit, lines: ["TOOL KITS"], imagePosition: "center center" },
  { img: rewardTools, lines: ["POWER TOOLS"], imagePosition: "center center" },
  { img: rewardMultimeter, lines: ["MEASURING", "INSTRUMENTS"], imagePosition: "center center" },
  { img: rewardWatch, lines: ["SMART WATCHES"], imagePosition: "center center" },
  { img: rewardAppliance, lines: ["HOME APPLIANCES"], imagePosition: "left center" },
  { img: rewardMore, lines: ["& MORE"], imagePosition: "right center" },
];

const TRAINING = [
  { icon: supportIcon1, label: "Product Training" },
  { icon: supportIcon2, label: "Installation Guidance" },
  { icon: supportIcon3, label: "Technical Videos" },
  { icon: supportIcon4, label: "Expert Support" },
];

const MARKETING = [
  { icon: supportIcon5, label: "Branding Materials" },
  { icon: supportIcon6, label: "Product Catalogues" },
  { icon: supportIcon7, label: "Panaflex & Posters" },
  { icon: supportIcon8, label: "Digital Support" },
];

const CTA_TRUST = [
  {
    title: "QUALITY YOU TRUST",
    desc: "Products built for safety and performance.",
  },
  {
    title: "PARTNER YOU RELY ON",
    desc: "Committed to your success every step of the way.",
  },
  {
    title: "TOGETHER WE GROW",
    desc: "Building a stronger India, together.",
  },
];

const STORIES = [
  {
    quote:
      "RAD KABEL's electrician program helped me earn rewards while building trust with my customers. The training support is excellent.",
    name: "Sandeep Yadav",
    role: "Electrician, Lucknow",
    avatar: avatar1,
  },
  {
    quote:
      "The certification and marketing materials gave my business a professional edge. My clients now ask for RAD KABEL by name.",
    name: "Ravi Sharma",
    role: "Electrical Contractor, Jaipur",
    avatar: avatar2,
  },
  {
    quote:
      "Redeeming points for tools has been a great bonus. It's a program that truly values electricians on the ground.",
    name: "Manoj Patel",
    role: "Freelance Technician, Ahmedabad",
    avatar: avatar3,
  },
];

export default function ElectricianProgramPage() {
  const pageRef = useRef(null);
  useMarketingPageAnimations(pageRef);

  return (
    <main ref={pageRef} className="ep-page">
      <div className="ep-page__top">
        <div className="ep-container">
          <nav className="ep-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="ep-breadcrumb__sep" aria-hidden>
              /
            </span>
            <span className="ep-breadcrumb__current">Electrician Program</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="ep-hero" aria-labelledby="ep-hero-heading">
        <div className="ep-hero__frame">
          <img src={heroBanner} alt="" className="ep-hero__bg" decoding="async" fetchPriority="high" aria-hidden />
          <div className="ep-hero__shade" aria-hidden />
          <div className="ep-container ep-hero__inner">
            <div className="ep-hero__copy">
              <h1 id="ep-hero-heading" className="ep-hero__title">
                THE POWER BEHIND EVERY CONNECTION IS <span className="ep-accent">YOU.</span>
              </h1>
              <p className="ep-hero__desc">
                The RAD KABEL Electrician Program is our way of recognizing, rewarding and empowering the electricians
                who power India every day.
              </p>
              <div className="ep-hero__actions">
                <a href="#ep-register" className="ep-btn ep-btn--primary">
                  JOIN THE PROGRAM <ArrowRight size={16} aria-hidden />
                </a>
                <a href="/brochure.pdf" download className="ep-btn ep-btn--outline">
                  DOWNLOAD BROCHURE <Download size={16} aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="ep-why" aria-labelledby="ep-why-heading">
        <div className="ep-container">
          <h2 id="ep-why-heading" className="ep-section-title ep-section-title--center">
            WHY JOIN THE <span className="ep-accent">RAD KABEL</span> ELECTRICIAN PROGRAM?
          </h2>
          <ul className="ep-why__grid">
            {WHY_JOIN.map(({ icon, title, lines }) => (
              <li key={title} className="ep-why__card">
                <img src={icon} alt="" className="ep-why__icon" decoding="async" aria-hidden />
                <h3>{title}</h3>
                <p>
                  {lines.map((line, i) => (
                    <span key={line}>
                      {i > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </p>
                <span className="ep-why__accent" aria-hidden />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How It Works */}
      <section className="ep-how" aria-labelledby="ep-how-heading">
        <div className="ep-container ep-how__layout">
          <div className="ep-how__main">
            <h2 id="ep-how-heading" className="ep-section-title">
              HOW IT <span className="ep-accent">WORKS?</span>
            </h2>
            <ol className="ep-how__track">
              {STEPS.map(({ step, title, lines }, i) => (
                <li key={title} className="ep-how__step">
                  <div className="ep-how__step-head">
                    <ElectricianHowStepIcon step={step} />
                    {i < STEPS.length - 1 && (
                      <span className="ep-how__arrow" aria-hidden>
                        <svg viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M1 6h20M15 1l6 5-6 5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                  <h3>{title}</h3>
                  <p>
                    {lines.map((line, lineIndex) => (
                      <span key={line}>
                        {lineIndex > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <aside className="ep-how__aside" aria-label="Who can join">
            <div className="ep-how__aside-panel">
              <img
                src={whoCanJoinBg}
                alt=""
                className="ep-how__aside-bg"
                decoding="async"
                loading="lazy"
                aria-hidden
              />
              <div className="ep-how__aside-copy">
                <h3>WHO CAN JOIN?</h3>
                <ul>
                  {WHO_JOIN.map((item) => (
                    <li key={item}>
                      <span className="ep-how__check" aria-hidden>
                        <Check size={10} strokeWidth={3} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Rewards */}
      <section className="ep-rewards" aria-labelledby="ep-rewards-heading">
        <div className="ep-container ep-rewards__layout">
          <div className="ep-rewards__intro">
            <h2 id="ep-rewards-heading" className="ep-section-title ep-rewards__title">
              EXCITING REWARDS
            </h2>
            <p>Redeem your points for amazing gifts.</p>
            <a href="#ep-register" className="ep-btn ep-btn--primary ep-rewards__cta">
              VIEW ALL REWARDS <ArrowRight size={16} aria-hidden />
            </a>
          </div>
          <div className="ep-rewards__carousel">
            <ul className="ep-rewards__grid">
              {REWARDS.map(({ img, lines, imagePosition }) => (
                <li key={lines.join(" ")} className="ep-rewards__card">
                  <div className="ep-rewards__media">
                    <img
                      src={img}
                      alt=""
                      className="ep-rewards__image"
                      style={{ objectPosition: imagePosition }}
                      decoding="async"
                      loading="lazy"
                      aria-hidden
                    />
                  </div>
                  <span>
                    {lines.map((line, lineIndex) => (
                      <span key={line}>
                        {lineIndex > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
            <div className="ep-rewards__dots" aria-hidden>
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </section>

      {/* Support grid */}
      <section className="ep-support" aria-label="Program support benefits">
        <div className="ep-container ep-support__grid">
          <article className="ep-support__panel ep-support__panel--cert">
            <h3>CERTIFIED ELECTRICIAN</h3>
            <p className="ep-support__lead">
              Get your digital certificate and ID card and showcase your expertise.
            </p>
            <div className="ep-support__cert-media">
              <img
                src={certifiedElectricianVisual}
                alt="RAD KABEL certified electrician certificate and ID card"
                className="ep-support__cert-image"
                decoding="async"
                loading="lazy"
              />
            </div>
          </article>
          <article className="ep-support__panel ep-support__panel--icons">
            <h3>TECHNICAL TRAINING &amp; SUPPORT</h3>
            <p className="ep-support__lead">
              Learn, grow and stay updated with the latest in electrical solutions.
            </p>
            <ul className="ep-support__list">
              {TRAINING.map(({ icon, label }) => (
                <li key={label}>
                  <span className="ep-support__list-icon" aria-hidden>
                    <img src={icon} alt="" decoding="async" loading="lazy" />
                  </span>
                  <span className="ep-support__list-label">{label}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="ep-support__panel ep-support__panel--icons">
            <h3>MARKETING SUPPORT</h3>
            <p className="ep-support__lead">
              We help you grow your business with the right support.
            </p>
            <ul className="ep-support__list">
              {MARKETING.map(({ icon, label }) => (
                <li key={label}>
                  <span className="ep-support__list-icon" aria-hidden>
                    <img src={icon} alt="" decoding="async" loading="lazy" />
                  </span>
                  <span className="ep-support__list-label">{label}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* Testimonials + Join band */}
      <section className="ep-stories-join" aria-labelledby="ep-stories-heading">
        <div className="ep-container ep-stories-join__layout">
          <div className="ep-stories">
            <h2 id="ep-stories-heading" className="ep-section-title">
              ELECTRICIAN <span className="ep-accent">TESTIMONIALS</span>
            </h2>
            <div className="ep-stories__grid">
              {STORIES.map((story) => (
                <article key={story.name} className="ep-story">
                  <Quote className="ep-story__quote" size={28} aria-hidden />
                  <p>{story.quote}</p>
                  <div className="ep-story__footer">
                    <div>
                      <strong>— {story.name}</strong>
                      <span>{story.role}</span>
                    </div>
                    <img src={story.avatar} alt="" className="ep-story__avatar" />
                  </div>
                </article>
              ))}
            </div>
          </div>
          <aside className="ep-join-band" id="ep-register" aria-labelledby="ep-join-heading">
            <div className="ep-join-band__copy">
              <h2 id="ep-join-heading">JOIN THE PROGRAM TODAY!</h2>
              <p>Be a part of India&apos;s most trusted electrician community.</p>
              <a href="#ep-register" className="ep-btn ep-btn--light">
                REGISTER NOW <ArrowRight size={16} aria-hidden />
              </a>
            </div>
            <img src={joinProduct} alt="" className="ep-join-band__product" decoding="async" loading="lazy" aria-hidden />
          </aside>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="ep-cta" aria-labelledby="ep-cta-heading">
        <div className="ep-cta__bg" aria-hidden>
          <img src={ctaSectionBg} alt="" className="ep-cta__bg-image" decoding="async" loading="lazy" />
        </div>
        <div className="ep-container ep-cta__grid">
          <div className="ep-cta__spacer" aria-hidden />
          <div className="ep-cta__copy">
            <h2 id="ep-cta-heading" className="ep-cta__title">
              <span>YOU POWER INDIA.</span>
              <span className="ep-accent">WE POWER YOUR GROWTH.</span>
            </h2>
            <p>
              Join the RAD KABEL Electrician Program today
              <br />
              and experience the power of recognition and rewards.
            </p>
          </div>
          <div className="ep-cta__actions">
            <a href="#ep-register" className="ep-btn ep-btn--primary">
              JOIN THE PROGRAM <ArrowRight size={16} aria-hidden />
            </a>
            <a href="tel:18001237070" className="ep-btn ep-btn--outline">
              CONTACT SUPPORT <Headset size={16} aria-hidden />
            </a>
          </div>
          <ul className="ep-cta__trust">
            {CTA_TRUST.map(({ title, desc }) => (
              <li key={title}>
                <span className="ep-cta__trust-icon" aria-hidden>
                  <HardHat size={30} strokeWidth={1.5} />
                </span>
                <span className="ep-cta__trust-text">
                  <strong>{title}</strong>
                  <em>{desc}</em>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
