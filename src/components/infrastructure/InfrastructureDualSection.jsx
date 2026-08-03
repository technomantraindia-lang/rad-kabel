import imgWarehouse from "../../assets/infrastructure/warehousing-logistics-bg.png";
import imgSustainability from "../../assets/infrastructure/safety-sustainability-bg.png";
import iconInventory from "../../assets/infrastructure/warehousing-icons/large-inventory.png";
import iconDispatch from "../../assets/infrastructure/warehousing-icons/fast-dispatch.png";
import iconPanIndia from "../../assets/infrastructure/warehousing-icons/pan-india-delivery.png";
import iconDealer from "../../assets/infrastructure/warehousing-icons/reliable-dealer-network.png";
import iconWorkerSafety from "../../assets/infrastructure/sustainability-icons/worker-safety.png";
import iconEfficient from "../../assets/infrastructure/sustainability-icons/efficient-manufacturing.png";
import iconWaste from "../../assets/infrastructure/sustainability-icons/waste-reduction.png";
import iconEnvironment from "../../assets/infrastructure/sustainability-icons/environmental-responsibility.png";

const WAREHOUSING = [
  { label: "Large Inventory Availability", icon: iconInventory, iconScale: 1.56 },
  { label: "Fast & Safe Dispatch", icon: iconDispatch, iconScale: 0.9 },
  { label: "PAN India Delivery", icon: iconPanIndia, iconScale: 0.8 },
  { label: "Reliable Dealer Network", icon: iconDealer, iconScale: 1.28 },
];

const SUSTAINABILITY = [
  { label: "Worker Safety Our Priority", icon: iconWorkerSafety, iconScale: 0.9 },
  { label: "Efficient Manufacturing", icon: iconEfficient, iconScale: 1 },
  { label: "Waste Reduction", icon: iconWaste, iconScale: 0.8 },
  { label: "Environmental Responsibility", icon: iconEnvironment, iconScale: 0.8 },
];

function DualBannerPanel({ title, image, imagePosition, items }) {
  return (
    <article className="infra-dual__panel infra-dual__panel--banner">
      <img
        src={image}
        alt=""
        className="infra-dual__panel-bg"
        style={imagePosition ? { objectPosition: imagePosition } : undefined}
        decoding="async"
        loading="lazy"
        aria-hidden
      />
      <div className="infra-dual__panel-shade" aria-hidden />
      <div className="infra-dual__panel-body">
        <h2 className="infra-dual__title">{title}</h2>
        <ul className="infra-dual__features infra-dual__features--banner">
          {items.map(({ label, icon, iconScale = 1 }) => (
            <li key={label} className="infra-dual__feature infra-dual__feature--stacked">
              <span className="infra-dual__feature-icon-wrap" aria-hidden>
                <img
                  src={icon}
                  alt=""
                  className="infra-dual__feature-icon"
                  style={{ "--icon-scale": iconScale }}
                  decoding="async"
                />
              </span>
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function InfrastructureDualSection() {
  return (
    <section className="infra-dual" aria-label="Warehousing and sustainability">
      <div className="infra-container infra-dual__grid">
        <DualBannerPanel
          title="Warehousing & Logistics"
          image={imgWarehouse}
          imagePosition="right center"
          items={WAREHOUSING}
        />
        <DualBannerPanel
          title="Safety & Sustainability"
          image={imgSustainability}
          imagePosition="right center"
          items={SUSTAINABILITY}
        />
      </div>
    </section>
  );
}
