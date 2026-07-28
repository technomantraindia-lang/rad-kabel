import { ArrowRight, Download } from "lucide-react";
import certHeroBg from "../assets/cert-hero-bg.png";

export default function CertificationsHero() {
  return (
    <section className="cert-hero" aria-labelledby="cert-hero-heading">
      <img
        src={certHeroBg}
        alt=""
        className="cert-hero__bg cert-hero__shield"
        decoding="async"
        fetchPriority="high"
        aria-hidden
      />
      <div className="cert-hero__shade" aria-hidden />

      <div className="cert-hero__inner">
        <div className="cert-hero__copy">
          <h1 id="cert-hero-heading" className="cert-hero__title">
            <span className="cert-hero__title-line">CERTIFIED FOR</span>
            <span className="cert-hero__title-line">
              <span className="cert-hero__title-accent cert-hero__accent">CONFIDENCE.</span>
            </span>
          </h1>
          <p className="cert-hero__desc">
            Every RAD KABEL product is manufactured and tested to meet stringent quality, safety and
            performance standards.
          </p>
        </div>
      </div>
    </section>
  );
}
