import { useRef } from "react";
import { Link } from "react-router-dom";
import useMarketingPageAnimations from "../hooks/useMarketingPageAnimations.js";
import InfrastructureHero from "../components/infrastructure/InfrastructureHero.jsx";
import InfrastructureEcosystem from "../components/infrastructure/InfrastructureEcosystem.jsx";
import InfrastructureInside from "../components/infrastructure/InfrastructureInside.jsx";
import InfrastructureProcessFlow from "../components/infrastructure/InfrastructureProcessFlow.jsx";
import InfrastructureStatsStrip from "../components/infrastructure/InfrastructureStatsStrip.jsx";
import InfrastructureQualityLab from "../components/infrastructure/InfrastructureQualityLab.jsx";
import InfrastructureGallery from "../components/infrastructure/InfrastructureGallery.jsx";
import InfrastructureDualSection from "../components/infrastructure/InfrastructureDualSection.jsx";
import InfrastructureBottomCTA from "../components/infrastructure/InfrastructureBottomCTA.jsx";
import "./InfrastructurePage.css";
import "../styles/marketing-pages-animations.css";

export default function InfrastructurePage() {
  const pageRef = useRef(null);
  useMarketingPageAnimations(pageRef);

  return (
    <main ref={pageRef} className="infrastructure-page site-main relative z-0 font-sans">
      <div className="infra-page__top">
        <div className="infra-container">
          <nav className="infra-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="infra-breadcrumb__sep" aria-hidden>
              /
            </span>
            <span className="infra-breadcrumb__current">Infrastructure</span>
          </nav>
        </div>
      </div>

      <InfrastructureHero />
      <InfrastructureEcosystem />
      <InfrastructureInside />
      <InfrastructureProcessFlow />
      <InfrastructureStatsStrip />
      <InfrastructureQualityLab />
      <InfrastructureGallery />
      <InfrastructureDualSection />
      <InfrastructureBottomCTA />
    </main>
  );
}
