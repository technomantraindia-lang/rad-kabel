import isiCertifiedLogo from "../assets/isi-certified.png";
import imgRohs from "../assets/certifications/rohs.png";
import imgReach from "../assets/certifications/reach.png";
import imgCpr from "../assets/certifications/cpr.png";
import imgMadeInIndia from "../assets/certifications/made-in-india.png";
import imgYearsOfTrust from "../assets/certifications/years-of-trust.png";

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

/** Same gold treatment + dimensions as ISI for every mark */
function CertMarkCell({ src, alt, wide = false }) {
  return (
    <div
      className={`cert-banner-cell cert-banner-cell--mark flex-1 md:min-w-0 ${wide ? "cert-banner-cell--mark-wide" : ""}`}
      tabIndex={0}
    >
      <img
        src={src}
        alt={alt}
        className={`isi-cert-logo ${wide ? "isi-cert-logo--wide" : ""}`}
        decoding="async"
      />
    </div>
  );
}

export default function CertificationBanner() {
  return (
    <section className="relative z-[2] w-full bg-black py-5 font-sans sm:py-6" aria-label="Certifications and trust">
      <div className="cert-banner-shell w-full">
        <div className="relative flex w-full items-stretch overflow-x-auto overscroll-x-contain bg-black md:overflow-visible">
          {/* 1 — Certified / Tested / Trusted (brand red) */}
          <div
            className="cert-banner-cell cert-banner-cell--tagline flex min-w-[130px] shrink-0 items-center justify-center md:max-w-[12%]"
            tabIndex={0}
          >
            <p className="font-heading text-base font-black uppercase leading-[1.18] tracking-[0.1em] lg:text-lg">
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
          <CertMarkCell src={imgRohs} alt="RoHS Compliant" />
          <SectionDivider />
          <CertMarkCell src={imgReach} alt="REACH Compliant" />
          <SectionDivider />
          <CertMarkCell src={imgMadeInIndia} alt="Make in India" />
          <SectionDivider />
          <CertMarkCell src={imgCpr} alt="CPR Compliant" />
          <SectionDivider />
          <CertMarkCell src={imgYearsOfTrust} alt="50+ Years of Trust" wide />
        </div>
      </div>
    </section>
  );
}
