import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download, Home, Building2, Factory, Stethoscope, GraduationCap, Map, Activity, Zap, Users, Check } from "lucide-react";
import "./ApplicationsPage.css";
import useApplicationsPageAnimations from "../hooks/useApplicationsPageAnimations.js";

// Assets
import bannerImg from "../assets/application-banner-new.png";
import heroBg from "../assets/technology-page-reference.png";
import appCtaBg from "../assets/applications-cta-bg.png";
import residentialImg from "../assets/applications/residential.png";
import commercialImg from "../assets/applications/commercial.png";
import industrialImg from "../assets/applications/industrial.png";
import infrastructureImg from "../assets/applications/infrastructure.png";
import hospitalsImg from "../assets/applications/hospitals.png";
import dataCentersImg from "../assets/applications/data-centers.png";
import hospitalImg from "../assets/applications/hospitals.png";
import infraImg from "../assets/applications/infrastructure.png";
import dataCenterImg from "../assets/applications/data-centers.png";

import radZero from "../assets/product-boxes/box-face.png";
import radFlex from "../assets/product-boxes/box-front.png";
import radFire from "../assets/product-boxes/box-angle.png";
import homeSelectorIcon from "../assets/perfect-cable-icons-white-svg/home.svg";
import commercialSelectorIcon from "../assets/perfect-cable-icons-white-svg/commercial.svg";
import industrialSelectorIcon from "../assets/perfect-cable-icons-white-svg/industrial.svg";
import hospitalSelectorIcon from "../assets/perfect-cable-icons-white-svg/hospital.svg";
import schoolSelectorIcon from "../assets/perfect-cable-icons-white-svg/school.svg";
import infrastructureSelectorIcon from "../assets/perfect-cable-icons-white-svg/infrastructure.svg";
import cableCrossSection from "../assets/cable-cross-section.png";
import radKabelLogo from "../assets/rad-kabel-logo.png";

const APPLICATIONS = [
  {
    id: "01",
    title: "RESIDENTIAL",
    subtitle: "SAFE HOMES START WITH SAFE WIRING.",
    img: residentialImg,
    points: ["House Wiring", "Apartments", "Villas", "Residential Complexes"],
    products: [radZero, radFire]
  },
  {
    id: "02",
    title: "COMMERCIAL BUILDINGS",
    subtitle: "POWERING BUSINESS WITHOUT INTERRUPTION.",
    img: commercialImg,
    points: ["Offices", "Shopping Malls", "Hotels", "IT Parks", "Commercial Complexes"],
    products: [radZero, radFire, radFlex]
  },
  {
    id: "03",
    title: "HEALTHCARE FACILITIES",
    subtitle: "WHEN RELIABILITY IS CRITICAL.",
    img: hospitalImg,
    points: ["Hospitals", "Clinics", "Diagnostic Centers", "Medical Facilities"],
    products: [radZero]
  },
  {
    id: "04",
    title: "EDUCATIONAL INSTITUTIONS",
    subtitle: "POWERING THE FUTURE THROUGH EDUCATION.",
    img: dataCenterImg, // Placeholder for education
    points: ["Schools", "Colleges", "Universities", "Training Centers"],
    products: [radZero, radFlex]
  },
  {
    id: "05",
    title: "INDUSTRIAL APPLICATIONS",
    subtitle: "BUILT FOR DEMANDING ENVIRONMENTS.",
    img: industrialImg,
    points: ["Manufacturing Plants", "Production Lines", "Machine Wiring", "Control Panels", "Warehouses"],
    products: [radFlex, radFire]
  },
  {
    id: "06",
    title: "INFRASTRUCTURE PROJECTS",
    subtitle: "POWERING MODERN INFRASTRUCTURE.",
    img: infraImg,
    points: ["Airports", "Railways", "Metro Systems", "Stadiums", "Government Buildings"],
    products: [radZero, radFire, radFlex]
  },
  {
    id: "07",
    title: "WATER & UTILITIES",
    subtitle: "POWERING ESSENTIAL SERVICES.",
    img: infraImg, // Placeholder for utilities
    points: ["Water Plants", "Pumping Stations", "Utility Networks", "Municipal Projects"],
    products: [radZero, radFlex]
  }
];

const APPLICATION_SELECTOR_ITEMS = [
  {
    id: "home",
    label: "Home",
    icon: homeSelectorIcon,
    recommendation: "RECOMMENDED FOR HOME PROJECTS",
    products: [
      { image: radFire, name: "RAD FIRE", description: "Enhanced Fire Safety", accent: "text-[#ffb14a]" }
    ],
    specs: ["High Fire Resistance", "Low Smoke Emission", "High Conductivity", "Long Service Life"]
  },
  {
    id: "commercial",
    label: "Commercial",
    icon: commercialSelectorIcon,
    recommendation: "RECOMMENDED FOR COMMERCIAL PROJECTS",
    products: [
      { image: radFlex, name: "RAD FLEX", description: "Flexible Commercial Cable", accent: "text-[#ffb14a]" }
    ],
    specs: ["High Fire Resistance", "Stable Power Delivery", "Low Smoke Emission", "Long Service Life"]
  },
  {
    id: "industrial",
    label: "Industrial",
    icon: industrialSelectorIcon,
    recommendation: "RECOMMENDED FOR INDUSTRIAL PROJECTS",
    products: [
      { image: radFlex, name: "RAD FLEX", description: "Industrial Cable", accent: "text-[#ffb14a]" },
      { image: radFire, name: "RAD FIRE", description: "Heat Resistant Cable", accent: "text-[#ff5a36]" }
    ],
    specs: ["High Fire Resistance", "Mechanical Strength", "High Conductivity", "Long Service Life"]
  },
  {
    id: "hospital",
    label: "Hospital",
    icon: hospitalSelectorIcon,
    recommendation: "RECOMMENDED FOR HOSPITAL PROJECTS",
    products: [
      { image: radFire, name: "RAD FIRE", description: "Low Smoke Safety Cable", accent: "text-[#ffb14a]" }
    ],
    specs: ["High Fire Resistance", "Low Smoke Emission", "High Conductivity", "Long Service Life"]
  },
  {
    id: "school",
    label: "School",
    icon: schoolSelectorIcon,
    recommendation: "RECOMMENDED FOR SCHOOL PROJECTS",
    products: [
      { image: radFlex, name: "RAD FLEX", description: "Flexible Installation Cable", accent: "text-[#ffb14a]" }
    ],
    specs: ["High Fire Resistance", "Low Smoke Emission", "Easy Installation", "Long Service Life"]
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    icon: infrastructureSelectorIcon,
    recommendation: "RECOMMENDED FOR INFRASTRUCTURE PROJECTS",
    products: [
      { image: radFlex, name: "RAD FLEX", description: "Industrial Cable", accent: "text-[#ffb14a]" }
    ],
    specs: ["High Fire Resistance", "Low Smoke Emission", "High Conductivity", "Long Service Life"]
  }
];

export default function ApplicationsPage() {
  const pageRef = useRef(null);
  const [activeApplicationId, setActiveApplicationId] = useState("infrastructure");
  useApplicationsPageAnimations(pageRef);

  const activeApplication =
    APPLICATION_SELECTOR_ITEMS.find((item) => item.id === activeApplicationId) ??
    APPLICATION_SELECTOR_ITEMS[0];

  return (
    <main ref={pageRef} className="app-page font-sans text-white bg-black">
      {/* Breadcrumb */}
      <div className="app-breadcrumb-container px-6 py-4 lg:px-16 lg:py-6 relative z-10">
        <nav className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
          <Link to="/" className="hover:text-red-600 transition">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-white">Applications</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="app-hero relative overflow-hidden py-16 lg:py-40 px-6 lg:px-16">
        <div className="absolute inset-0 z-0">
          <img src={bannerImg} alt="RAD KABEL Applications" className="app-hero__bg w-full h-full object-cover object-[80%_center] opacity-100" />
        </div>
        <div className="relative z-10 w-full flex flex-col items-start gap-12">
          <div className="app-hero__copy lg:w-2/3 xl:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight mb-6 drop-shadow-md">
              <span className="app-hero__title-line block">POWERING EVERY</span>
              <span className="app-hero__title-line block">
                <span className="app-hero__accent text-red-600">CONNECTION</span> THAT
              </span>
              <span className="app-hero__title-line block">MATTERS.</span>
            </h1>
            <p className="app-hero__desc text-gray-300 text-base md:text-lg mb-8 leading-relaxed max-w-xl">
              From homes and hospitals to factories and infrastructure projects, RAD KABEL solutions are engineered for every environment.
            </p>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="app-ecosystem py-20 px-4 lg:px-8 xl:px-12 w-full">
        <div className="w-full max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
            {/* Exact Circular Diagram */}
            <div className="app-ecosystem__diagram xl:col-span-4 2xl:col-span-4 flex items-center justify-center border border-white/10 rounded-xl p-6 bg-black relative min-h-[500px] overflow-hidden">
              <div className="absolute top-8 left-8 z-30 pointer-events-none">
                <h2 className="text-2xl md:text-3xl font-bold uppercase mb-1 text-white tracking-wide">APPLICATION <span className="text-red-600">ECOSYSTEM</span></h2>
                <p className="text-gray-400 text-sm tracking-wide">One solution. Endless applications.</p>
              </div>
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at center, red 0%, transparent 60%)" }} />
              
              <div className="app-ecosystem__diagram-inner relative w-[400px] h-[400px] flex items-center justify-center mt-12">
                {/* Connecting Lines */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                  <div 
                    key={`line-${i}`} 
                    className="absolute w-full h-[1px] bg-red-600/50" 
                    style={{ transform: `rotate(${angle}deg)` }} 
                  />
                ))}

                {/* Main Outer Circle Line */}
                <div className="absolute w-[340px] h-[340px] rounded-full border border-red-600/80 z-0 shadow-[0_0_20px_rgba(224,25,33,0.4)]">
                  {/* Orbiting Dots */}
                  <div className="absolute inset-0 animate-orbit flex items-center justify-center">
                    <div className="absolute -top-1.5 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_12px_rgba(239,68,68,1)]"></div>
                  </div>
                  <div className="absolute inset-0 animate-orbit flex items-center justify-center" style={{ animationDelay: '-3.33s' }}>
                    <div className="absolute -top-1.5 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_12px_rgba(239,68,68,1)]"></div>
                  </div>
                  <div className="absolute inset-0 animate-orbit flex items-center justify-center" style={{ animationDelay: '-6.66s' }}>
                    <div className="absolute -top-1.5 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_12px_rgba(239,68,68,1)]"></div>
                  </div>
                </div>

                {/* Center Circle — real company logo */}
                <div className="app-ecosystem__center relative z-20 w-40 h-40 rounded-full border-[3px] border-red-600 flex items-center justify-center bg-black shadow-[0_0_40px_rgba(224,25,33,0.8)] overflow-hidden">
                   <div className="w-36 h-36 rounded-full border-2 border-red-600/50 absolute pointer-events-none" aria-hidden="true" />
                   <img
                     src={radKabelLogo}
                     alt="RAD KABEL"
                     className="relative z-10 w-[78%] h-auto object-contain select-none"
                     draggable={false}
                   />
                </div>

                {/* The 8 Nodes */}
                {[
                  { angle: -90, icon: <Building2 size={36} strokeWidth={1.5} />, label: "Residential" },
                  { angle: -45, icon: <Factory size={36} strokeWidth={1.5} />, label: "Commercial" },
                  { angle: 0, icon: <Activity size={36} strokeWidth={1.5} />, label: "Industrial" },
                  { angle: 45, icon: <Stethoscope size={36} strokeWidth={1.5} />, label: "Healthcare" },
                  { angle: 90, icon: <Users size={36} strokeWidth={1.5} />, label: "Interaction" },
                  { angle: 135, icon: <GraduationCap size={36} strokeWidth={1.5} />, label: "Education" },
                  { angle: 180, icon: <Zap size={36} strokeWidth={1.5} />, label: "Utilities" },
                  { angle: 225, icon: <Building2 size={36} strokeWidth={1.5} />, label: "Smart Cities" },
                ].map((node, i) => {
                  const radius = 170; // matches half of w-[340px]
                  const rad = (node.angle * Math.PI) / 180;
                  const x = Math.cos(rad) * radius;
                  const y = Math.sin(rad) * radius;

                  return (
                    <div 
                      key={i} 
                      className="app-ecosystem__node absolute z-10 flex flex-col items-center"
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                    >
                      {/* Node Circle */}
                      <div className="w-20 h-20 rounded-full border-2 border-red-600 bg-black flex items-center justify-center text-white relative shadow-lg hover:bg-red-600/20 transition-colors">
                        {/* Red Dot on border */}
                        <div className="absolute w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,1)]" style={{
                           top: '50%', left: '50%',
                           transform: `translate(-50%, -50%) translate(${Math.cos(rad + Math.PI) * 39}px, ${Math.sin(rad + Math.PI) * 39}px)`
                        }}></div>
                        {node.icon}
                      </div>
                      <span className="text-[13px] font-bold mt-2 text-gray-100 tracking-wide text-center absolute top-full whitespace-nowrap drop-shadow-md">{node.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Image Cards Grid */}
            <div className="app-ecosystem__cards xl:col-span-8 2xl:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { img: residentialImg, icon: <Home size={26}/>, label: "RESIDENTIAL", desc: "Safe wiring for modern homes and living spaces." },
                { img: commercialImg, icon: <Building2 size={26}/>, label: "COMMERCIAL", desc: "Reliable power for businesses and commercial spaces." },
                { img: industrialImg, icon: <Factory size={26}/>, label: "INDUSTRIAL", desc: "Engineered for machines, plants and heavy operations." },
                { img: hospitalsImg, icon: <Stethoscope size={26}/>, label: "HEALTHCARE", desc: "Critical power for hospitals and medical facilities." },
                { img: infrastructureImg, icon: <GraduationCap size={26}/>, label: "EDUCATION", desc: "Powering schools, colleges and learning environments." },
                { img: infrastructureImg, icon: <Map size={26}/>, label: "INFRASTRUCTURE", desc: "Building the backbone of modern infrastructure." },
                { img: dataCentersImg, icon: <Zap size={26}/>, label: "UTILITIES", desc: "Power distribution, water plants and utility networks." },
                { img: commercialImg, icon: <Building2 size={26}/>, label: "SMART CITIES", desc: "Enabling connected sustainable future." },
              ].map((item, i) => (
                <div key={i} className="app-ecosystem__card bg-[#0f0f0f] border border-white/10 rounded-lg overflow-hidden flex flex-col h-full group hover:border-white/30 transition-colors cursor-pointer">
                  {/* Image Header */}
                  <div className="app-ecosystem__card-media h-32 w-full overflow-hidden">
                    <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-4 2xl:p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="app-ecosystem__card-icon text-white">
                        {item.icon}
                      </div>
                      <h3 className="text-[14px] 2xl:text-base font-extrabold uppercase tracking-widest text-white mt-1">{item.label}</h3>
                    </div>
                    
                    <p className="text-gray-400 text-xs 2xl:text-[13px] leading-relaxed flex-grow">
                      {item.desc}
                    </p>
                    
                    {/* Red Accent Line */}
                    <div className="app-ecosystem__card-accent w-8 h-[2px] bg-red-600 mt-5"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Details Sections Grid */}
      <section className="app-details py-10 px-6 lg:px-16 w-full max-w-[1920px] mx-auto">
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-4">
          {APPLICATIONS.map((app, index) => {
            const colClass = index < 4 ? "md:col-span-6 lg:col-span-3" : "md:col-span-4 lg:col-span-4";
            return (
              <div key={index} className={`app-detail-card relative overflow-hidden group border border-white/10 rounded-lg ${colClass} bg-black`}>
              <div className="app-detail-card__media absolute inset-0 z-0">
                <img src={app.img} alt={app.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition duration-700 transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
              </div>
              <div className="relative z-10 p-5 md:p-6 flex flex-col h-full justify-between min-h-[350px]">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="app-detail-card__badge w-7 h-7 shrink-0 rounded-full bg-red-600 flex items-center justify-center text-sm font-bold shadow-[0_0_8px_rgba(239,68,68,0.6)]">{app.id}</span>
                    <h3 className="app-detail-card__title text-lg xl:text-xl font-extrabold uppercase tracking-widest leading-tight">{app.title}</h3>
                  </div>
                  <p className="text-gray-100 font-bold text-[13px] tracking-wide uppercase mb-5 leading-relaxed pr-4">{app.subtitle}</p>
                  
                  <ul className="space-y-2 mb-8">
                    {app.points.map((pt, i) => (
                      <li key={i} className="app-detail-card__bullet flex items-center gap-2.5 text-[13px] font-medium text-gray-200 tracking-wide">
                        <div className="app-detail-card__bullet-icon w-4 h-4 rounded-full bg-red-900 flex items-center justify-center shrink-0 shadow-[0_0_5px_rgba(220,38,38,0.3)]">
                          <Check size={10} className="text-white" strokeWidth={4} />
                        </div>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-auto">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 pt-3">RECOMMENDED PRODUCTS</p>
                  <div className="flex gap-2">
                    {app.products.map((prod, i) => (
                      <img key={i} src={prod} alt="product" className="app-detail-card__product h-9 object-contain hover:scale-110 transition cursor-pointer drop-shadow-md" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Selection Section */}
      <section className="app-cable-finder py-10 px-6 lg:px-16 bg-[#050505]">
        <div className="w-full max-w-[1920px] mx-auto">
          <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] xl:gap-10">
            <div>
              <h2 className="app-cable-finder__title text-[1.65rem] md:text-[2rem] font-black uppercase tracking-tight leading-none">
                FIND YOUR <span className="text-red-600">PERFECT CABLE*</span>
              </h2>
              <p className="mt-3 text-sm text-white/75">
                What type of project are you working on?
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
                {APPLICATION_SELECTOR_ITEMS.map(({ id, label, icon }) => {
                  const isActive = id === activeApplication.id;

                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setActiveApplicationId(id)}
                      aria-pressed={isActive}
                      data-app-selector={id}
                      className={`app-cable-finder__btn group flex min-h-[114px] flex-col items-center justify-center gap-3.5 rounded-xl border px-3 py-5 text-center transition-all duration-300 ${
                        isActive
                          ? "border-white bg-[radial-gradient(circle_at_top,rgba(224,25,33,0.18),rgba(224,25,33,0.04)_45%,rgba(255,255,255,0.01)_100%)] shadow-[0_0_28px_rgba(224,25,33,0.12)] hover:border-red-600 hover:shadow-[0_0_32px_rgba(224,25,33,0.25)]"
                          : "border-white/12 bg-white/[0.02] hover:border-red-600/60 hover:bg-red-600/[0.03] hover:shadow-[0_0_20px_rgba(224,25,33,0.15)]"
                      }`}
                    >
                      <img
                        src={icon}
                        alt=""
                        aria-hidden="true"
                        className="h-[38px] w-[38px] object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                      <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-white/95 transition-colors duration-300">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="app-recommended xl:border-l xl:border-white/10 xl:pl-10">
              <h3 className="app-recommended__heading text-xl md:text-[1.65rem] font-extrabold uppercase tracking-wide leading-tight">
                {activeApplication.recommendation}
              </h3>

              <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.9fr)] xl:grid-cols-[minmax(0,1.02fr)_minmax(0,0.88fr)_auto] xl:items-start">
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-red-600 uppercase tracking-[0.22em] mb-4">
                    Recommended Products
                  </p>
                  <div className="space-y-4">
                    {activeApplication.products.map((product) => (
                      <div key={product.name} className="app-recommended__product flex items-center gap-3">
                        <div className="flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden">
                          <img src={product.image} alt={product.name} className="max-h-full w-auto object-contain" />
                        </div>
                        <div className="min-w-0">
                          <p className={`text-sm font-black uppercase tracking-[0.08em] ${product.accent}`}>
                            {product.name}
                          </p>
                          <p className="text-xs text-white/60">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="min-w-0 lg:border-l lg:border-white/10 lg:pl-6 xl:pl-7">
                  <p className="text-[11px] font-bold text-red-600 uppercase tracking-[0.22em] mb-4">
                    Key Specifications
                  </p>
                  <ul className="space-y-3">
                    {activeApplication.specs.map((spec) => (
                      <li key={spec} className="app-recommended__spec flex items-center gap-2.5 text-sm text-white/80">
                        <Check size={14} strokeWidth={2.4} className="shrink-0 text-white" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="/brochure.pdf"
                  download="RAD_KABEL_BROCHURE.pdf"
                  className="app-recommended__datasheet app-btn inline-flex h-12 items-center justify-center gap-2 self-start rounded-md bg-red-600 px-5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-red-700 xl:mt-[2.05rem]"
                >
                  Download Datasheet <Download size={14} className="app-btn__icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="app-bottom-cta relative w-full overflow-hidden bg-black">
        {/* background image layer - full visibility, no overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src={appCtaBg}
            alt=""
            className="app-bottom-cta__bg h-full w-full object-cover"
          />
        </div>

        {/* content container */}
        <div className="relative z-10 mx-auto w-full max-w-[1920px]">
          {/* text positioned on the left */}
          <div className="flex min-h-[450px] lg:min-h-[500px] items-center justify-start px-5 py-16 sm:px-8 lg:px-14 lg:py-20">
            <div className="app-bottom-cta__copy max-w-2xl text-left">
              <h2
                className="text-[clamp(1.75rem,4vw,3.25rem)] font-black uppercase leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.7)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="app-bottom-cta__title-line block">WHATEVER YOU BUILD,</span>
                <span className="app-bottom-cta__title-line block">
                  BUILD IT WITH{" "}
                  <span className="app-bottom-cta__accent text-[#e01921]">CONFIDENCE.</span>
                </span>
              </h2>

              <p className="app-bottom-cta__desc mt-4 text-sm leading-relaxed text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] sm:text-base lg:mt-5">
                RAD KABEL delivers safety, performance and reliability in every
                connection that powers your world.
              </p>

              <div className="app-bottom-cta__actions mt-6 flex flex-wrap justify-start gap-3 sm:gap-4 lg:mt-8">
                <Link
                  to="/dealer-network"
                  className="app-btn inline-flex h-12 items-center justify-center gap-2 bg-[#e01921] px-6 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#c0151c] sm:h-14 sm:px-8 sm:text-xs"
                >
                  BECOME A DEALER <ArrowRight size={16} className="app-btn__icon" />
                </Link>

                <Link
                  to="/contact-us"
                  className="app-btn inline-flex h-12 items-center justify-center gap-2 border border-white/60 bg-transparent px-6 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:border-white hover:bg-white/10 sm:h-14 sm:px-8 sm:text-xs"
                >
                  CONTACT EXPERT <ArrowRight size={16} className="app-btn__icon" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
