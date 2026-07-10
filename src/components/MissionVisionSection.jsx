import iconSafety from "../assets/mission-icons/safety.png";
import iconQuality from "../assets/mission-icons/quality.png";
import iconInnovation from "../assets/mission-icons/innovation.png";
import visionBg from "../assets/vision.png";
import AuIconRing from "./AuIconRing.jsx";
import "./MissionVisionSection.css";

const MISSION_PILLARS = [
  {
    icon: iconSafety,
    title: "Safety",
    desc: "Design electrical wiring solutions that protect lives, property, and infrastructure through maximum safety and dependable performance.",
    alt: "Safety",
  },
  {
    icon: iconQuality,
    title: "Quality",
    desc: "Manufacture every cable to the highest industry standards, delivering consistent quality for industrial, commercial, and residential applications.",
    alt: "Quality",
  },
  {
    icon: iconInnovation,
    title: "Innovation",
    desc: "Continuously advance conductor and cable technologies to build reliable, future-ready electrical solutions that customers can trust.",
    alt: "Innovation",
  },
];

export default function MissionVisionSection() {
  return (
    <section className="mission-vision" data-au-section="mission-vision" aria-labelledby="our-vision-heading">
      <div className="mission-vision__grid">
        <article className="mission-vision__panel mission-vision__panel--vision">
          <img
            src={visionBg}
            alt=""
            className="mission-vision__vision-bg"
            decoding="async"
            loading="lazy"
          />
          <div className="mission-vision__vision-overlay" aria-hidden />
          <div className="mission-vision__vision-copy">
            <h2 id="our-vision-heading" className="mission-vision__heading">
              Our Vision
            </h2>
            <div className="mission-vision__rule" aria-hidden />
            <p className="mission-vision__text">
              To become a globally trusted wire and cable brand known for world-class safety, reliable
              performance, and continuous innovation in every electrical installation.
            </p>
          </div>
        </article>

        <article className="mission-vision__panel mission-vision__panel--mission" aria-labelledby="our-mission-heading">
          <h2 id="our-mission-heading" className="mission-vision__heading">
            Our Mission
          </h2>
          <div className="mission-vision__rule" aria-hidden />

          <ul className="mission-vision__cards">
            {MISSION_PILLARS.map(({ icon, title, desc, alt }) => (
              <li key={title} className="mission-vision__card">
                <span className="mission-vision__card-icon-wrap">
                  <AuIconRing />
                  <img src={icon} alt={alt} className="mission-vision__card-icon" decoding="async" />
                </span>
                <h3 className="mission-vision__card-title">{title}</h3>
                <p className="mission-vision__card-desc">{desc}</p>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
