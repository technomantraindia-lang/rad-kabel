import { useState } from "react";

import homeIcon        from "../assets/perfect-cable-icons-white-svg/home.svg";
import commercialIcon  from "../assets/perfect-cable-icons-white-svg/commercial.svg";
import industrialIcon  from "../assets/perfect-cable-icons-white-svg/industrial.svg";
import hospitalIcon    from "../assets/perfect-cable-icons-white-svg/hospital.svg";
import schoolIcon      from "../assets/perfect-cable-icons-white-svg/school.svg";
import infraIcon       from "../assets/perfect-cable-icons-white-svg/infrastructure.svg";

const CATEGORIES = [
  { id: "home",           label: "Home",           icon: homeIcon },
  { id: "commercial",     label: "Commercial",      icon: commercialIcon },
  { id: "industrial",     label: "Industrial",      icon: industrialIcon },
  { id: "hospital",       label: "Hospital",        icon: hospitalIcon },
  { id: "school",         label: "School",          icon: schoolIcon },
  { id: "infrastructure", label: "Infrastructure",  icon: infraIcon },
];

function CategoryCard({ id, label, icon, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      aria-pressed={isActive}
      aria-label={label}
      className={[
        // base layout
        "group flex flex-col items-center justify-center gap-4",
        "rounded-2xl border-2 px-4 py-7 sm:py-8",
        "w-full cursor-pointer outline-none",
        "transition-all duration-300 ease-out",
        "focus-visible:ring-2 focus-visible:ring-[#e01921] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        // active vs idle state
        isActive
          ? "border-[#e01921] bg-[#1a0204] shadow-[0_0_32px_rgba(224,25,33,0.45),inset_0_0_20px_rgba(224,25,33,0.08)]"
          : "border-zinc-700 bg-zinc-900/60 hover:border-[#e01921] hover:bg-[#140103] hover:shadow-[0_0_28px_rgba(224,25,33,0.35),inset_0_0_16px_rgba(224,25,33,0.06)]",
      ].join(" ")}
    >
      {/* icon */}
      <span
        className={[
          "flex h-12 w-12 items-center justify-center transition-transform duration-300",
          "group-hover:scale-110",
          isActive ? "scale-110" : "",
        ].join(" ")}
        aria-hidden="true"
      >
        <img
          src={icon}
          alt=""
          className="h-full w-full object-contain"
          draggable={false}
        />
      </span>

      {/* label */}
      <span
        className={[
          "text-sm font-bold uppercase tracking-[0.18em] transition-colors duration-300",
          "word-spacing-wide",
          isActive ? "text-white" : "text-zinc-300 group-hover:text-white",
        ].join(" ")}
      >
        {label}
      </span>
    </button>
  );
}

export default function FindYourPerfectCable() {
  const [active, setActive] = useState("infrastructure");

  const toggle = (id) => setActive((prev) => (prev === id ? null : id));

  return (
    <section
      id="find-your-cable"
      className="relative w-full overflow-hidden bg-[#0d0d0d] px-5 py-16 font-sans sm:px-10 sm:py-20 lg:px-14 lg:py-24 xl:px-16"
      aria-labelledby="find-cable-heading"
    >
      {/* subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(224,25,33,0.07),transparent_60%)]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1920px]">
        {/* ── Heading ── */}
        <header className="mb-10 sm:mb-12 lg:mb-14">
          <h2
            id="find-cable-heading"
            className="font-display text-[clamp(1.6rem,4.2vw,3.5rem)] font-black uppercase leading-tight tracking-wide text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            FIND YOUR{" "}
            <span
              className="text-[#e01921] drop-shadow-[0_0_18px_rgba(224,25,33,0.4)]"
            >
              PERFECT CABLE*
            </span>
          </h2>
          <p className="mt-3 text-sm font-medium tracking-[0.06em] text-zinc-400 sm:text-base">
            What type of project are you working on?
          </p>
        </header>

        {/* ── Category grid ── */}
        <div
          role="group"
          aria-label="Project type selector"
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6 lg:gap-5 xl:gap-6"
        >
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.id}
              {...cat}
              isActive={active === cat.id}
              onClick={toggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
