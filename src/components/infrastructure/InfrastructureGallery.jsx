import img1 from "../../assets/infrastructure/gallery/gallery-1.png";
import img2 from "../../assets/infrastructure/gallery/gallery-2.jpg";
import img3 from "../../assets/infrastructure/gallery/gallery-3.jpg";
import img4 from "../../assets/infrastructure/gallery/gallery-4.png";
import img5 from "../../assets/infrastructure/gallery/gallery-5.jpg";
import { IconArrowCircle } from "./InfrastructureIcons.jsx";

const IMAGES = [
  { src: img1, alt: "RAD Kabel factory exterior" },
  { src: img2, alt: "Factory production area" },
  { src: img3, alt: "Cable manufacturing facility" },
  { src: img4, alt: "Factory interior workspace" },
  { src: img5, alt: "Factory quality lab testing" },
];

export default function InfrastructureGallery() {
  return (
    <section className="infra-gallery" aria-labelledby="infra-gallery-heading">
      <div className="infra-container infra-gallery__layout">
        <div className="infra-gallery__copy">
          <h2 id="infra-gallery-heading" className="infra-gallery__title">
            <span className="infra-gallery__title-line infra-gallery__title-line--white">
              OUR FACTORY
            </span>
            <span className="infra-gallery__title-row">
              <span className="infra-gallery__title-line infra-gallery__title-line--accent">
                GALLERY
              </span>
              <IconArrowCircle className="infra-gallery__arrow" aria-hidden />
            </span>
          </h2>
        </div>

        <ul className="infra-gallery__grid">
          {IMAGES.map(({ src, alt }) => (
            <li key={alt} className="infra-gallery__item">
              <img src={src} alt={alt} decoding="async" loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
