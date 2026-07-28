import iconFounded from "../assets/journey-icons/founded.png";
import iconProduct from "../assets/journey-icons/product-development.png";
import iconManufacturing from "../assets/journey-icons/manufacturing.png";
import iconDealerNetwork from "../assets/journey-icons/dealer-network.png";
import iconFuture from "../assets/journey-icons/future.png";
import journeyBg from "../assets/journey-background.png";
import "./OurJourneySection.css";

const MILESTONES = [
  {
    icon: iconFounded,
    year: "2025",
    brand: "RAD KABEL",
    title: null,
    desc: "Founded",
    alt: "Founded",
  },
  {
    icon: iconProduct,
    year: null,
    brand: null,
    title: "Product Development",
    desc: "Creating advanced wire solutions",
    alt: "Product development",
  },
  {
    icon: iconManufacturing,
    year: null,
    brand: null,
    title: "Manufacturing Expansion",
    desc: "Modern production infrastructure",
    alt: "Manufacturing expansion",
  },
  {
    icon: iconDealerNetwork,
    year: null,
    brand: null,
    title: "Dealer Network Growth",
    desc: "Expanding market presence",
    alt: "Dealer network growth",
  },
  {
    icon: iconFuture,
    year: null,
    brand: null,
    title: "Future",
    desc: "Building a nationally trusted brand",
    alt: "Future",
  },
];

function JourneyArrow({ flip = false, index }) {
  const markerId = `journey-arrow-${index}`;
  const path = flip
    ? "M 6 30 C 34 6, 66 54, 94 30"
    : "M 6 30 C 34 54, 66 6, 94 30";

  return (
    <svg className="our-journey__arrow" viewBox="0 0 100 60" aria-hidden>
      <defs>
        <marker
          id={markerId}
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="5"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path d="M0 0 L10 5 L0 10 Z" fill="#e01921" />
        </marker>
      </defs>
      <path
        className="our-journey__arrow-path"
        d={path}
        markerEnd={`url(#${markerId})`}
      />
    </svg>
  );
}

export default function OurJourneySection() {
  return (
    <section className="our-journey" aria-labelledby="our-journey-heading">
      <img
        src={journeyBg}
        alt=""
        className="our-journey__bg"
        decoding="async"
        loading="lazy"
      />
      <div className="our-journey__overlay" aria-hidden />

      <div className="our-journey__inner">
        <h2 id="our-journey-heading" className="our-journey__heading">
          Our Journey
        </h2>

        <div className="our-journey__timeline">
          <div className="our-journey__track">
            {MILESTONES.map(({ icon, year, brand, title, desc, alt }, index) => (
              <div key={desc} className="our-journey__track-group">
                <article className="our-journey__milestone">
                  <div className="our-journey__icon-wrap">
                    <img src={icon} alt={alt} className="our-journey__icon" decoding="async" />
                  </div>

                  <div className="our-journey__copy">
                    {year && <p className="our-journey__year">{year}</p>}
                    {brand && <p className="our-journey__brand">{brand}</p>}
                    {title && <h3 className="our-journey__title">{title}</h3>}
                    <p className="our-journey__desc">{desc}</p>
                  </div>
                </article>

                {index < MILESTONES.length - 1 && (
                  <div className="our-journey__connector" aria-hidden>
                    <JourneyArrow flip={index % 2 === 1} index={index} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
