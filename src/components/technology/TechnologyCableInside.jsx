import ScienceOfSafety from "../ScienceOfSafety.jsx";

/** Technology page — same cable layers section as homepage, without the CTA button. */
export default function TechnologyCableInside() {
  return (
    <ScienceOfSafety
      className="tech-cable"
      headingId="tech-cable-heading"
      title={
        <>
          Inside a <span className="science-of-safety-title-accent">RAD Kabel</span> Cable
        </>
      }
      description="Every layer is engineered for maximum protection and performance."
      showCta={false}
    />
  );
}
