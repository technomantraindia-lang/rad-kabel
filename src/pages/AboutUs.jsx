import { useRef } from "react";
import AboutUsBanner from "../components/AboutUsBanner.jsx";
import WhoWeAreSection from "../components/WhoWeAreSection.jsx";
import MissionVisionSection from "../components/MissionVisionSection.jsx";
import WhyChooseSection from "../components/WhyChooseSection.jsx";
import OurJourneySection from "../components/OurJourneySection.jsx";
import ManufacturingExcellenceSection from "../components/ManufacturingExcellenceSection.jsx";
import OurValuesSection from "../components/OurValuesSection.jsx";
import AboutUsCTASection from "../components/AboutUsCTASection.jsx";
import useAboutUsPageAnimations from "../hooks/useAboutUsPageAnimations.js";
import "../styles/about-us-animations.css";

export default function AboutUs() {
  const pageRef = useRef(null);
  useAboutUsPageAnimations(pageRef);

  return (
    <main ref={pageRef} className="about-us-page site-main relative z-0 font-sans">
      <AboutUsBanner />
      <WhoWeAreSection />
      <MissionVisionSection />
      <WhyChooseSection />
      <OurJourneySection />
      <ManufacturingExcellenceSection />
      <OurValuesSection />
      <AboutUsCTASection />
    </main>
  );
}
