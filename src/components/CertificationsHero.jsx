import { ArrowRight, Download } from "lucide-react";
import certHeroBg from "../assets/cert-hero-bg.png";

export default function CertificationsHero() {
  return (
    <section className="cert-hero" aria-labelledby="cert-hero-heading">
      <img
        src={certHeroBg}
        alt=""
        className="cert-hero__bg"
        decoding="async"
        fetchPriority="high"
        aria-hidden
      />
      <div className="cert-hero__shade" aria-hidden />

      <div className="cert-hero__inner">
        <div className="cert-hero__copy">
          <h1 id="cert-hero-heading" className="cert-hero__title">
            CERTIFIED FOR
            <span className="cert-hero__title-accent">CONFIDENCE.</span>
          </h1>
          <p className="cert-hero__desc">
            Every RAD KABEL product is manufactured and tested to meet stringent quality, safety and
            performance standards.
          </p>
          <div className="cert-hero__actions">
            <a href="#download-center" className="cert-hero__btn cert-hero__btn--primary">
              DOWNLOAD CERTIFICATES
              <Download size={15} aria-hidden />
            </a>
            <a href="#contact" className="cert-hero__btn cert-hero__btn--outline">
              CONTACT TECHNICAL TEAM
              <ArrowRight size={15} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
