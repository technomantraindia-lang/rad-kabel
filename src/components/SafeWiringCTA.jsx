import ctaImg from "../assets/safe-wiring-cta.png";

const BROCHURE_URL = "/brochure.pdf";

export default function SafeWiringCTA() {
  return (
    <section className="bg-black font-sans">
      <div className="safe-wiring-cta__stage relative min-h-[380px] w-full overflow-hidden bg-black sm:min-h-[440px] lg:min-h-[520px]">
        <div className="safe-wiring-cta__wire-glow pointer-events-none absolute inset-0 z-0" aria-hidden />
        <img
          src={ctaImg}
          alt=""
          className="safe-wiring-cta__wire-img pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover object-right"
          decoding="async"
          aria-hidden
        />
        <div className="safe-wiring-cta__text-shade pointer-events-none absolute inset-0 z-[2]" aria-hidden />

        <div className="relative z-[3] mx-auto flex min-h-[inherit] w-full max-w-[1920px] items-center px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16 xl:px-20">
          <div className="max-w-xl">
            <h2 className="site-section-title site-section-title--lg">
              SAFE WIRING.
            </h2>
            <h3 className="site-section-title site-section-title--lg mt-2">
              SAFE FUTURE.
            </h3>
            <p className="site-section-desc max-w-lg">
              Choose RAD Kabel. Choose safety that lasts.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="tel:18001237070"
                className="inline-flex items-center justify-center rounded-md border border-[#e50914] bg-[#e50914] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e50914]"
              >
                CONTACT US
              </a>
              <a
                href={BROCHURE_URL}
                download
                className="inline-flex items-center justify-center rounded-md border border-white/30 bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e50914]"
              >
                DOWNLOAD BROCHURE
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
