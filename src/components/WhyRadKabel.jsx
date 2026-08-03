import whyChooseWireImage from "../assets/home-page-why-choose-image.png";
import { WHY_CHOOSE_ITEMS } from "./WhyChooseSection.jsx";

const WHY_RAD_ORBIT_RINGS = [
  { scale: 0.17, opacity: 0.72, duration: 20 },
  { scale: 0.44, opacity: 0.84, duration: 24, reverse: true },
  { scale: 0.71, opacity: 1, hero: true, duration: 28 },
  { scale: 0.98, opacity: 0.88, duration: 32, reverse: true },
  { scale: 1.25, opacity: 0.76, duration: 36 },
];

function CableOrbitRings({ variant = "mobile" }) {
  return (
    <div
      className={`why-rad-orbit-rings pointer-events-none absolute ${
        variant === "fixed" ? "why-rad-orbit-rings--fixed" : "why-rad-orbit-rings--mobile"
      }`}
      aria-hidden
    >
      {WHY_RAD_ORBIT_RINGS.map((ring) => (
        <span
          key={ring.scale}
          className={`why-rad-orbit-track${ring.reverse ? " is-reverse" : ""}`}
          style={{
            "--ring-scale": ring.scale,
            "--orbit-duration": `${ring.duration}s`,
          }}
        >
          <span
            className={`why-rad-orbit-ring${ring.hero ? " is-hero" : ""}`}
            style={{ "--ring-opacity": ring.opacity }}
          />
        </span>
      ))}
    </div>
  );
}

function CableVisual({ fixed = false }) {
  return (
    <div
      className={
        fixed
          ? "why-rad-cable-bleed why-rad-cable-stack relative h-full w-full overflow-visible"
          : "why-rad-cable-stack relative mx-auto w-full max-w-[520px] overflow-visible"
      }
    >
      <div className="why-rad-cable-bg" aria-hidden />
      <div className="why-rad-cable-rings-layer absolute inset-0 overflow-visible">
        <CableOrbitRings variant={fixed ? "fixed" : "mobile"} />
      </div>
      <img
        src={whyChooseWireImage}
        alt="RAD cable visual with the conductor extending toward the edge"
        width={1284}
        height={1140}
        className={
          fixed
            ? "why-rad-cable-img--desktop why-rad-wire-img relative z-[2] drop-shadow-[0_28px_56px_rgba(0,0,0,0.9)]"
            : "why-rad-cable-img--mobile why-rad-wire-img relative z-[2] drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
        }
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
}

function FeatureCard({ icon, title, desc, alt, iconScale = 1 }) {
  return (
    <article
      tabIndex={0}
      className="why-rad-feature-card group"
      aria-label={`${title}. ${desc}`}
    >
      <span className="why-rad-icon-wrap">
        <img
          src={icon}
          alt={alt}
          className="why-rad-card-icon"
          style={{ "--icon-scale": iconScale }}
          decoding="async"
        />
      </span>
      <div className="why-rad-card-copy">
        <h3 className="why-rad-card-heading">{title}</h3>
        <p className="why-rad-card-desc">{desc}</p>
      </div>
    </article>
  );
}

export default function WhyRadKabel() {
  return (
    <section
      className="why-rad-section relative w-full overflow-x-visible overflow-y-visible bg-black px-5 py-16 font-sans sm:px-10 sm:py-20 lg:px-14 lg:py-24 xl:px-16 2xl:px-20"
      aria-labelledby="why-rad-kabel-heading"
    >
      <div className="why-rad-cable-fixed pointer-events-none absolute z-0 hidden xl:block">
        <CableVisual fixed />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1920px]">
        <header className="why-rad-header mb-10 sm:mb-12 lg:mb-14 xl:mb-16">
          <h2
            id="why-rad-kabel-heading"
            className="site-section-title site-section-title--lg"
          >
            <span className="text-white">WHY </span>
            <span className="text-[#e01921]">RAD KABEL?</span>
          </h2>
          <p className="site-section-desc why-rad-header-desc">
            Engineered with advanced technology to deliver unmatched safety and performance.
          </p>
        </header>

        <div className="why-rad-cards-desktop hidden grid-cols-3 items-stretch gap-3 xl:grid 2xl:gap-4">
          {WHY_CHOOSE_ITEMS.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>

        <div className="flex flex-col gap-8 lg:gap-10 xl:hidden">
          <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-4">
            {WHY_CHOOSE_ITEMS.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
          <div className="relative flex min-h-[280px] items-center justify-center py-2 sm:min-h-[340px] sm:py-4">
            <CableVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
