import { Link } from "react-router-dom";
import { useRef } from "react";
import TechnologyHero from "../components/technology/TechnologyHero.jsx";
import TechnologyCableInside from "../components/technology/TechnologyCableInside.jsx";
import EBeamTechnology from "../components/EBeamTechnology.jsx";
import TechnologyScienceGrid from "../components/technology/TechnologyScienceGrid.jsx";
import TechnologyManufacturingFlow from "../components/technology/TechnologyManufacturingFlow.jsx";
import TechnologyPrecisionTesting from "../components/technology/TechnologyPrecisionTesting.jsx";
import TechnologyWhyMatters from "../components/technology/TechnologyWhyMatters.jsx";
import TechnologyComparison from "../components/technology/TechnologyComparison.jsx";
import TechnologyBottomCTA from "../components/technology/TechnologyBottomCTA.jsx";
import useTechnologyPageAnimations from "../hooks/useTechnologyPageAnimations.js";
import "./TechnologyPage.css";
import "../styles/technology-animations.css";

export default function TechnologyPage() {
  const pageRef = useRef(null);
  useTechnologyPageAnimations(pageRef);

  return (
    <main ref={pageRef} className="technology-page site-main relative z-0 font-sans">
      <div className="tech-page__top">
        <div className="tech-container">
          <nav className="tech-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="tech-breadcrumb__sep" aria-hidden>
              /
            </span>
            <span className="tech-breadcrumb__current">Technology</span>
          </nav>
        </div>
      </div>

      <TechnologyHero />
      <TechnologyCableInside />
      <EBeamTechnology
        sectionId="tech-ebeam"
        headingId="tech-ebeam-heading"
      />
      <TechnologyScienceGrid />
      <TechnologyManufacturingFlow />
      <TechnologyPrecisionTesting />
      <TechnologyWhyMatters />
      <TechnologyComparison />
      <TechnologyBottomCTA />
    </main>
  );
}
