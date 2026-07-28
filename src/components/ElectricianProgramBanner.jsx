import { Link } from "react-router-dom";
import bannerImg from "../assets/electrician-banner.png";

export default function ElectricianProgramBanner() {
  return (
    <section
      id="electrician-program"
      className="bg-black py-16 font-sans sm:py-20 lg:py-24"
      aria-labelledby="electrician-program-heading"
    >
      <div className="mx-auto w-full max-w-none">
        <div
          className="relative w-full overflow-hidden rounded-2xl border border-zinc-700/50 bg-zinc-950 shadow-[0_28px_100px_rgba(0,0,0,0.85)] lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-stretch"
        >
          <div className="relative flex min-h-[320px] items-center justify-start overflow-hidden bg-[linear-gradient(135deg,rgba(0,0,0,0.98)_0%,rgba(6,6,6,0.94)_52%,rgba(15,15,15,0.9)_100%)] sm:min-h-[380px] md:min-h-[430px] lg:min-h-[500px]">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(224,25,33,0.08),transparent_34%),linear-gradient(90deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.18)_100%)]"
              aria-hidden
            />
            <div className="relative z-10 w-full max-w-3xl px-6 py-14 text-left sm:px-10 sm:py-16 md:px-12 md:py-20 lg:max-w-4xl lg:px-16 lg:py-24 xl:px-20">
              <h2
                id="electrician-program-heading"
                className="site-section-title text-left text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.5rem]"
              >
                ELECTRICIAN KA
              </h2>
              <p className="site-section-title mt-1 text-left text-4xl text-[#e01921] sm:mt-1.5 sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.5rem]">
                TRUSTED WIRE
              </p>
              <p className="site-section-desc mt-6 max-w-2xl text-left sm:mt-7 lg:mt-8">
                Stable performance under every load condition.
              </p>
              <Link
                to="/electrician-program"
                className="mt-9 inline-block rounded-md border border-[#e01921] bg-[#e01921] px-10 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-white no-underline shadow-[0_8px_32px_rgba(224,25,33,0.35)] transition-all duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#e01921] sm:mt-10 sm:px-12 sm:py-5 sm:text-base md:mt-12"
              >
                Join RAD Partner Network
              </Link>
            </div>
          </div>

          <div className="relative min-h-[300px] overflow-hidden bg-[#050505] sm:min-h-[340px] md:min-h-[380px] lg:min-h-[500px]">
            <img
              src={bannerImg}
              alt="RAD Kabel electrician in a factory setting"
              className="absolute inset-0 h-full w-full object-cover object-[center_28%]"
              decoding="async"
              fetchPriority="high"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.16)_34%,rgba(0,0,0,0.35)_100%),linear-gradient(180deg,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.42)_100%)]"
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/55 to-transparent" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
