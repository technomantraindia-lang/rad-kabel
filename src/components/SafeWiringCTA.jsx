import ctaImg from "../assets/safe-wiring-cta.png";
import { Link } from "react-router-dom";
import { handleDownloadBrochure } from "../utils/downloadBrochure";

const BROCHURE_URL = "/brochure.pdf";

export default function SafeWiringCTA() {
  return (
    <section className="bg-black font-sans">
      <div className="safe-wiring-cta__stage relative isolate w-full overflow-hidden border-y border-white/10 bg-black">
        <div className="safe-wiring-cta__wire-glow pointer-events-none absolute inset-0 z-0" aria-hidden />
        <img
          src={ctaImg}
          alt="RAD Kabel safe wiring hero visual"
          className="safe-wiring-cta__wire-img pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover object-[72%_center] sm:object-[78%_center] lg:object-[80%_center]"
          decoding="async"
          aria-hidden
        />
        <div className="safe-wiring-cta__text-shade pointer-events-none absolute inset-0 z-[2]" aria-hidden />

        <div className="relative z-[3] mx-auto flex min-h-[clamp(340px,46vw,540px)] w-full max-w-[1920px] items-center px-6 py-9 sm:px-10 sm:py-10 lg:px-14 lg:py-12 xl:px-20">
          <div className="max-w-xl">
            <p className="site-kicker">Safe wiring. Safe future.</p>
            <h2 className="site-section-title site-section-title--lg mt-4">
              SAFE WIRING.
            </h2>
            <h3 className="site-section-title site-section-title--lg mt-2 text-[#e01921]">
              SAFE FUTURE.
            </h3>
            <p className="site-section-desc max-w-lg">
              Choose RAD Kabel. Choose safety first.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                to="/contact-us"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-[#e01921] bg-[#e01921] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e01921]"
              >
                CONTACT US
              </Link>
              <a
                href={BROCHURE_URL}
                download="RAD_KABEL_BROCHURE.pdf"
                onClick={handleDownloadBrochure}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/30 bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:scale-[1.03] hover:border-[#e01921] hover:bg-[#e01921] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e01921]"
              >
                DOWNLOAD BROCHURE
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
