import { Building2, Factory, Home, Hospital, Landmark, Server } from "lucide-react";
import { Link } from "react-router-dom";

import imgResidential from "../assets/applications/residential.png";
import imgCommercial from "../assets/applications/commercial.png";
import imgIndustrial from "../assets/applications/industrial.png";
import imgHospitals from "../assets/applications/hospitals.png";
import imgInfrastructure from "../assets/applications/infrastructure.png";
import imgDataCenters from "../assets/applications/data-centers.png";

const APPLICATIONS = [
  { id: "residential", label: "Residential", icon: Home, image: imgResidential, alt: "Residential wiring and home safety" },
  { id: "commercial", label: "Commercial", icon: Building2, image: imgCommercial, alt: "Commercial buildings and wiring" },
  { id: "industrial", label: "Industrial", icon: Factory, image: imgIndustrial, alt: "Industrial power and storm protection" },
  { id: "hospitals", label: "Hospitals", icon: Hospital, image: imgHospitals, alt: "Hospital fire-safe wiring and protection" },
  { id: "infrastructure", label: "Infrastructure", icon: Landmark, image: imgInfrastructure, alt: "Infrastructure cable heat resistance comparison" },
  { id: "data-centers", label: "Data Centers", icon: Server, image: imgDataCenters, alt: "Data center cabling and performance features" },
];

function ApplicationCard({ label, icon: Icon, image, alt = "" }) {
  return (
    <Link
      to="/applications"
      tabIndex={0}
      className="group relative block overflow-hidden rounded-xl border-2 border-[#d4af37]/55 bg-black no-underline outline-none transition-all duration-300 hover:border-[#e01921] hover:shadow-[0_0_44px_rgba(224,25,33,0.38),inset_0_0_24px_rgba(224,25,33,0.06)] focus-visible:border-[#e01921] focus-visible:shadow-[0_0_44px_rgba(224,25,33,0.42),0_0_0_2px_rgba(224,25,33,0.35)]"
      aria-label={`Explore ${label} applications`}
    >
      <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/3]">
        <img
          src={image}
          alt={alt}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110 group-focus-visible:scale-110"
          decoding="async"
          loading="lazy"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25 transition-opacity duration-300 group-hover:via-black/70 group-focus-visible:via-black/70"
          aria-hidden
        />
      </div>

      <div className="flex items-center justify-center gap-3 border-t-2 border-[#d4af37]/35 bg-black px-5 py-5 transition-colors duration-300 group-hover:border-[#e01921]/70 group-focus-visible:border-[#e01921]/70 sm:gap-3.5 sm:py-6 lg:py-7">
        <Icon
          className="size-7 shrink-0 text-[#e01921] transition-transform duration-300 group-hover:scale-110 sm:size-8 lg:size-9"
          strokeWidth={2.25}
          aria-hidden
        />
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-white sm:text-base lg:text-lg">
          {label}
        </span>
      </div>
    </Link>
  );
}

export default function ApplicationsSection() {
  return (
    <section
      id="applications"
      className="relative overflow-hidden bg-black px-5 py-16 font-sans sm:px-10 sm:py-20 lg:px-14 lg:py-24 xl:px-16"
      aria-labelledby="applications-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(224,25,33,0.08),transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1920px]">
        <header className="mx-auto mb-12 max-w-6xl text-center sm:mb-14 lg:mb-16">
          <h2
            id="applications-heading"
            className="site-section-title site-section-title--lg mx-auto whitespace-nowrap text-[clamp(0.95rem,3.6vw,3rem)]"
          >
            POWERING WHAT{" "}
            <span className="text-[#e01921] drop-shadow-[0_0_20px_rgba(224,25,33,0.35)]">MATTERS MOST</span>
          </h2>
          <p className="site-section-desc site-section-desc--center">
            Trusted by industries and institutions across India.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6 xl:gap-7">
          {APPLICATIONS.map((app) => (
            <ApplicationCard key={app.id} {...app} />
          ))}
        </div>
      </div>
    </section>
  );
}
