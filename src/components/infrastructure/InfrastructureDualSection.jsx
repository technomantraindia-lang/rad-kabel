import imgWarehouse from "../../assets/infrastructure/warehousing-logistics-bg.png";
import imgSustainability from "../../assets/infrastructure/safety-sustainability-bg.png";
import iconInventory from "../../assets/infrastructure/warehousing-icons/large-inventory.svg";
import iconDispatch from "../../assets/infrastructure/warehousing-icons/fast-dispatch.svg";
import iconPanIndia from "../../assets/infrastructure/warehousing-icons/pan-india-delivery.svg";
import iconDealer from "../../assets/infrastructure/warehousing-icons/reliable-dealer-network.svg";
import iconWorkerSafety from "../../assets/infrastructure/sustainability-icons/worker-safety.svg";
import iconEfficient from "../../assets/infrastructure/sustainability-icons/efficient-manufacturing.svg";
import iconWaste from "../../assets/infrastructure/sustainability-icons/waste-reduction.svg";
import iconEnvironment from "../../assets/infrastructure/sustainability-icons/environmental-responsibility.svg";

const WAREHOUSING = [
  { label: "Large Inventory Availability", icon: iconInventory },
  { label: "Fast & Safe Dispatch", icon: iconDispatch },
  { label: "PAN India Delivery", icon: iconPanIndia },
  { label: "Reliable Dealer Network", icon: iconDealer },
];

const SUSTAINABILITY = [
  { label: "Worker Safety Our Priority", icon: iconWorkerSafety },
  { label: "Efficient Manufacturing", icon: iconEfficient },
  { label: "Waste Reduction", icon: iconWaste },
  { label: "Environmental Responsibility", icon: iconEnvironment },
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
          {items.map(({ label, icon }) => (
            <li key={label} className="infra-dual__feature infra-dual__feature--stacked">
              <img src={icon} alt="" className="infra-dual__feature-icon" aria-hidden />
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
