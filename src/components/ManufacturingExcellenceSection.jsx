import { useState } from "react";
import factoryImage from "../assets/who-we-are-facility.png";
import "./ManufacturingExcellenceSection.css";

const STATS = [
  { value: "100%", label: "Commitment to Quality" },
  { value: "99.97%", label: "Copper Purity" },
  { value: "25+", label: "Quality Checks" },
  { value: "1000+", label: "Satisfied Customers" },
];

const FACTORY_TOUR_VIDEO = "/videos/wq.mp4";

export default function ManufacturingExcellenceSection() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="manufacturing-excellence" data-au-section="manufacturing" aria-labelledby="manufacturing-excellence-heading">
      <div className="manufacturing-excellence__panel">
        <div className="manufacturing-excellence__media">
          <img
            src={factoryImage}
            alt="RAD Kabel manufacturing facility"
            className="manufacturing-excellence__image"
            decoding="async"
            loading="lazy"
          />
          <button
            type="button"
            className="manufacturing-excellence__play"
            onClick={() => setVideoOpen(true)}
            aria-label="Watch our factory tour video"
          >
            <span className="manufacturing-excellence__play-icon" aria-hidden />
            <span className="manufacturing-excellence__play-label">Watch Our Factory Tour</span>
          </button>
        </div>

        <div className="manufacturing-excellence__copy">
          <p className="manufacturing-excellence__eyebrow">Manufacturing Excellence</p>
          <h2 id="manufacturing-excellence-heading" className="manufacturing-excellence__title">
            Precision at Every Step
          </h2>
          <p className="manufacturing-excellence__text">
            From conductor processing to final quality verification, every stage of manufacturing follows
            strict quality procedures to ensure dependable performance.
          </p>

          <ul className="manufacturing-excellence__stats">
            {STATS.map(({ value, label }) => (
              <li key={label} className="manufacturing-excellence__stat">
                <span className="manufacturing-excellence__stat-value" data-au-value={value}>
                  {value}
                </span>
                <span className="manufacturing-excellence__stat-label">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {videoOpen && (
        <div
          className="manufacturing-excellence__modal"
          role="dialog"
          aria-modal="true"
          aria-label="Factory tour video"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="manufacturing-excellence__modal-inner"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="manufacturing-excellence__modal-close"
              onClick={() => setVideoOpen(false)}
              aria-label="Close factory tour video"
            >
              ×
            </button>
            <video
              className="manufacturing-excellence__modal-video"
              src={FACTORY_TOUR_VIDEO}
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      )}
    </section>
  );
}
