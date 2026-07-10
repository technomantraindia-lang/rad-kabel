import { ArrowRight, Check } from "lucide-react";

import withoutEbeamImg from "../assets/ebeam-without.png";
import withEbeamImg from "../assets/with-e-beam.png";

const WITHOUT_POINTS = ["Weak molecular bonding", "Low heat resistance", "Higher fire risk"];

const WITH_POINTS = [
  "Stronger molecular bonding",
  "Higher heat resistance",
  "Zero smoke & zero fire",
  "Maximum safety",
];

function ComparisonImage({ src, alt }) {
  return (
    <div className="mt-6 flex flex-1 items-center justify-center sm:mt-8">
      <div className="mx-auto w-full max-w-[600px] overflow-hidden rounded-lg bg-black">
        <div className="aspect-[16/9] w-full">
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover object-center"
            decoding="async"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

function ComparisonCard({ variant, title, points, withChecks }) {
  const isWith = variant === "with";

  return (
    <article
      className={`flex min-h-[320px] flex-1 flex-col rounded-xl border bg-zinc-950/80 p-5 transition-all duration-500 sm:min-h-[360px] sm:p-6 ${
        isWith
          ? "group/with-ebeam border-zinc-800/90 shadow-none group-hover/ebeam:border-[#e50914]/40 group-hover/ebeam:shadow-[inset_0_0_20px_rgba(229,9,20,0.06)]"
          : "border-zinc-800/90"
      }`}
    >
      <h3
        className={`text-center text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors duration-500 sm:text-base ${
          isWith ? "group-hover/with-ebeam:text-[#e50914]" : ""
        }`}
      >
        {title}
      </h3>

      {isWith ? (
        <ComparisonImage src={withEbeamImg} alt="Wire structure with E-Beam treatment" />
      ) : (
        <ComparisonImage src={withoutEbeamImg} alt="Wire structure without E-Beam treatment" />
      )}

      <ul className="mt-6 space-y-3 border-t border-zinc-800/80 pt-5 sm:mt-8 sm:pt-6">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-300 sm:text-[0.9375rem]">
            {withChecks ? (
              <Check
                className="mt-0.5 size-4 shrink-0 text-zinc-600 transition-colors duration-500 group-hover/ebeam:text-[#e50914]"
                strokeWidth={2.5}
                aria-hidden
              />
            ) : (
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-zinc-500" aria-hidden />
            )}
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}

function VsBadge() {
  return (
    <div
      className="relative z-10 flex shrink-0 items-center justify-center self-center lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
      aria-hidden
    >
      <div className="absolute hidden h-px w-[120%] bg-gradient-to-r from-transparent via-zinc-700 to-transparent transition-all duration-500 group-hover/ebeam:via-[#e50914]/70 lg:block" />
      <span className="relative flex size-14 items-center justify-center rounded-full border-2 border-zinc-700 bg-black text-lg font-black text-white shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover/ebeam:border-[#e50914] group-hover/ebeam:shadow-[0_0_16px_rgba(229,9,20,0.35)] sm:size-16 sm:text-xl">
        VS
      </span>
    </div>
  );
}

export default function EBeamTechnology() {
  return (
    <section
      id="technology"
      className="bg-black px-3 py-12 font-sans sm:px-5 sm:py-16 lg:px-6 lg:py-20"
      aria-labelledby="ebeam-technology-heading"
    >
      <div className="mx-auto w-full max-w-[1920px]">
        <div
          className="group/ebeam rounded-[1.75rem] border border-zinc-800/90 bg-black p-1 shadow-[0_12px_40px_rgba(0,0,0,0.7)] transition-[border-color,box-shadow] duration-500 ease-out hover:border-[#e50914]/45 hover:shadow-[0_0_20px_rgba(229,9,20,0.22),0_12px_40px_rgba(0,0,0,0.7),inset_0_0_24px_rgba(229,9,20,0.04)] focus-within:border-[#e50914]/45 focus-within:shadow-[0_0_20px_rgba(229,9,20,0.22),0_12px_40px_rgba(0,0,0,0.7),inset_0_0_24px_rgba(229,9,20,0.04)]"
        >
          <div className="overflow-hidden rounded-[1.6rem] border border-zinc-800/80 bg-black transition-[border-color,background-color] duration-500 ease-out group-hover/ebeam:border-zinc-800/80 group-hover/ebeam:bg-black group-focus-within/ebeam:bg-black">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,32%)_1fr]">
              {/* Left panel */}
              <div className="flex flex-col justify-center border-b border-zinc-800/80 px-6 py-10 sm:px-10 sm:py-12 lg:border-b-0 lg:border-r lg:px-10 lg:py-14 xl:px-12">
                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-white sm:text-xs">
                  The Science of Safety
                </p>
                <h2
                  id="ebeam-technology-heading"
                  className="site-section-title mt-3 text-2xl text-[#e50914] sm:text-3xl lg:text-4xl"
                >
                  E-Beam Technology
                </h2>
                <p className="site-section-desc max-w-md">
                  Our advanced Electron Beam technology creates a 3D cross-linked molecular structure that transforms
                  ordinary wires into fire safe, high-performance solutions.
                </p>
                <a
                  href="#technology"
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-md border border-[#e50914]/70 bg-transparent px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 ease-out focus-visible:outline-none sm:text-sm"
                >
                  Explore Technology
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              </div>

              {/* Comparison area */}
              <div className="relative px-5 py-8 sm:px-10 sm:py-10 lg:px-10 lg:py-12 xl:px-14">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-6 xl:gap-8">
                  <ComparisonCard variant="without" title="Without E-Beam" points={WITHOUT_POINTS} />
                  <VsBadge />
                  <ComparisonCard variant="with" title="With E-Beam" points={WITH_POINTS} withChecks />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
