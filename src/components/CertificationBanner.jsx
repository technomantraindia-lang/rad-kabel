import isiCertifiedLogo from "../assets/isi-certified.png";
import imgRohs from "../assets/certifications/rohs-white.png";
import imgReach from "../assets/certifications/reach.png";
import imgCpr from "../assets/certifications/cpr.png";
import imgMadeInIndia from "../assets/certifications/made-in-india.png";
import imgYearsOfTrust from "../assets/certifications/years-of-trust.png";
import "./CertificationBanner.css";

/** Vertical divider — inset from top/bottom */
function SectionDivider() {
  return (
    <div
      className="w-px shrink-0 self-center bg-[#d4af37]/20"
      style={{ height: "72%", minHeight: "52px", marginBlock: "auto" }}
      aria-hidden
    />
  );
}

function CertMarkCell({ src, alt, wide = false, rohs = false }) {
  return (
    <div
      className={`cert-banner-cell cert-banner-cell--mark flex-1 md:min-w-0 ${wide ? "cert-banner-cell--mark-wide" : ""}`}
      tabIndex={0}
    >
      <img
        src={src}
        alt={alt}
        className={`isi-cert-logo ${wide ? "isi-cert-logo--wide" : ""}${rohs ? " isi-cert-logo--rohs" : ""}`}
        decoding="async"
        loading="lazy"
      />
    </div>
  );
}

export default function CertificationBanner() {
  return (
    <section
      className="relative z-[2] w-full border-y border-zinc-800/80 bg-black py-6 font-sans sm:py-8"
      aria-label="Certifications and trust"
    >
      <div className="cert-banner-shell mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-8">
        <div className="cert-banner-row flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:flex-nowrap md:justify-between md:gap-2">
          <div className="cert-banner-cell cert-banner-cell--tagline flex min-w-[130px] items-center justify-center px-3 py-2 text-center md:max-w-[14%]">
            <p className="font-heading text-sm font-black uppercase leading-[1.2] tracking-[0.1em] text-[#e01921] sm:text-base lg:text-lg">
              Certified.
              <br />
              Tested.
              <br />
              Trusted.
            </p>
          </div>

          <SectionDivider />
          <CertMarkCell src={isiCertifiedLogo} alt="ISI Certified" />
          <SectionDivider />
          <CertMarkCell src={imgRohs} alt="RoHS Compliant" rohs />
          <SectionDivider />
          <CertMarkCell src={imgReach} alt="REACH Compliant" />
          <SectionDivider />
          <CertMarkCell src={imgMadeInIndia} alt="Make in India" />
          <SectionDivider />
          <CertMarkCell src={imgCpr} alt="CPR Compliant" />
          <SectionDivider />
          <CertMarkCell src={imgYearsOfTrust} alt="50+ Years of Experience" wide />
        </div>
      </div>
    </section>
  );
}
