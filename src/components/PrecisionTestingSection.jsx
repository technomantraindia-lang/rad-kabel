import { useEffect, useRef, useState } from "react";

import builtFacilityBg from "../assets/precision-built.png";
import imgHeat from "../assets/tests/fire.png";
import imgFlame from "../assets/tests/flame-retardant.png";
import imgConductivity from "../assets/tests/conductivity.png";
import imgSmoke from "../assets/tests/smoke-density.png";
import imgVoltage from "../assets/tests/voltage-withstand.png";
import "./PrecisionTestingSection.css";

const STATS = [
  { value: "50+", label: "Dealer Network" },
  { value: "1,00,000+", label: "Sq. Ft. Facility" },
  { value: "25+", label: "Quality Checks" },
  { value: "99.97%", label: "Copper Purity" },
];

const TESTS = [
  { title: "Heat Resistance Test", image: imgHeat, alt: "Heat resistance testing for RAD Kabel wire" },
  { title: "Flame Retardant Test", image: imgFlame, alt: "Flame retardant RAD ZERO wire" },
  { title: "Conductivity Test", image: imgConductivity, alt: "Pure copper conductivity testing" },
  { title: "Smoke Density Test", image: imgSmoke, alt: "RAD Kabel product quality testing" },
  { title: "Voltage Withstand Test", image: imgVoltage, alt: "E-Beam vs traditional wire comparison" },
];

function useInViewOnce(threshold = 0.08) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(node);

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setInView(true);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function StatCard({ value, label, index, animate }) {
  return (
    <article
      className={`flex min-h-[96px] flex-col items-center justify-center rounded-md border border-zinc-500/50 bg-black/72 px-3 py-4 text-center backdrop-blur-[2px] sm:min-h-[104px] sm:px-4 sm:py-5 lg:min-h-[112px] ${
        animate ? "animate-fade-up" : "opacity-0"
      }`}
      style={animate ? { animationDelay: `${index * 0.08}s`, animationFillMode: "forwards" } : undefined}
    >
      <p className="text-[1.7rem] font-bold leading-none tabular-nums text-[#e01921] sm:text-[2.35rem] lg:text-[2.7rem]">
        {value}
      </p>
      <p className="mt-2.5 text-[0.64rem] font-semibold uppercase leading-snug tracking-[0.18em] text-white sm:mt-3 sm:text-xs lg:text-sm lg:tracking-[0.2em]">
        {label}
      </p>
    </article>
  );
}

function TestCard({ title, image, alt, index, animate }) {
  return (
    <article
      tabIndex={0}
      className={`precision-test-card group flex h-full flex-col overflow-hidden bg-black outline-none transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(224,25,33,0.28)] focus-visible:shadow-[0_0_32px_rgba(224,25,33,0.35),0_0_0_2px_rgba(224,25,33,0.25)] ${
        animate ? "animate-fade-up" : "opacity-0"
      }`}
      style={animate ? { animationDelay: `${0.1 + index * 0.07}s`, animationFillMode: "forwards" } : undefined}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-black sm:aspect-[5/4] lg:aspect-[4/3]">
        <img
          src={image}
          alt={alt}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
          decoding="async"
          loading="lazy"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden
        />
      </div>
      <div className="mt-auto border-t border-white/10 bg-black px-2 py-3 sm:py-3.5">
        <p className="text-center text-[0.68rem] font-bold uppercase leading-snug tracking-[0.12em] text-white sm:text-xs lg:text-[14px]">
          {title}
        </p>
      </div>
    </article>
  );
}

export default function PrecisionTestingSection() {
  const factoryBlock = useInViewOnce(0.06);
  const testingBlock = useInViewOnce(0.06);

  return (
    <section
      id="precision-testing"
      className="bg-black py-14 font-sans sm:py-16 lg:py-20"
      aria-labelledby="precision-built-heading"
    >
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-8 lg:px-10">
        <header className="mx-auto max-w-4xl text-center">
          <h2
            id="precision-built-heading"
            className="site-section-title site-section-title--md"
          >
            Built with Precision
          </h2>
          <p className="site-section-desc site-section-desc--center">
            State-of-the-art manufacturing for superior quality.
          </p>
        </header>
      </div>

      <div ref={factoryBlock.ref} className="precision-factory-bleed mt-8 sm:mt-10">
        <div
          className="precision-factory relative h-[clamp(360px,56vw,620px)] min-h-[360px] w-full overflow-hidden"
          style={{ backgroundImage: `url(${builtFacilityBg})` }}
          role="img"
          aria-label="RAD Kabel manufacturing facility"
        >
          <div className="relative z-10 flex h-full items-end justify-center px-4 py-5 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
            <div className="grid w-full max-w-[1280px] grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
              {STATS.map((stat, index) => (
                <StatCard key={stat.label} {...stat} index={index} animate={factoryBlock.inView} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-8 lg:px-10">
        <div ref={testingBlock.ref} className="mt-14 sm:mt-16 lg:mt-20">
          <header className="mx-auto max-w-4xl text-center">
            <h2
              id="precision-tested-heading"
              className="site-section-title site-section-title--md"
            >
              Tested for Real-World Conditions
            </h2>
            <p className="site-section-desc site-section-desc--center max-w-3xl">
              Every RAD Kabel wire goes through rigorous testing to ensure unmatched safety.
            </p>
          </header>

          <div className="mx-auto mt-8 grid max-w-[1500px] grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-5 lg:gap-4">
            {TESTS.map((test, index) => (
              <TestCard key={test.title} {...test} index={index} animate={testingBlock.inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
