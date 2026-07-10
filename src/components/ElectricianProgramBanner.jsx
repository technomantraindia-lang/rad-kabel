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
          className="relative w-full overflow-hidden rounded-2xl border border-zinc-700/50 bg-zinc-950 shadow-[0_28px_100px_rgba(0,0,0,0.85)]"
        >
          {/* Background image (no crop) */}
          <img
            src={bannerImg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
            decoding="async"
            aria-hidden
          />

          <div className="relative flex aspect-[21/9] min-h-[320px] items-center justify-start sm:min-h-[380px] md:min-h-[420px] lg:min-h-[480px] xl:min-h-[520px]">
            <div className="w-full max-w-3xl px-6 py-14 text-left sm:px-10 sm:py-16 md:px-12 md:py-20 lg:max-w-4xl lg:px-16 lg:py-24 xl:px-20">
              <h2
                id="electrician-program-heading"
                className="site-section-title text-left text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.5rem]"
              >
                Electrician Ka
              </h2>
              <p className="site-section-title mt-1 text-left text-4xl text-[#e50914] sm:mt-1.5 sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.5rem]">
                Trusted Wire
              </p>
              <p className="site-section-desc mt-6 max-w-2xl text-left sm:mt-7 lg:mt-8">
                Stable performance under every load condition.
              </p>
              <Link
                to="/electrician-program"
                className="mt-9 inline-block rounded-md border border-[#e50914] bg-[#e50914] px-10 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-white no-underline shadow-[0_8px_32px_rgba(229,9,20,0.35)] transition-all duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#e50914] sm:mt-10 sm:px-12 sm:py-5 sm:text-base md:mt-12"
              >
                Join RAD Partner Network
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
