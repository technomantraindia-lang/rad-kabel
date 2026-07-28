import { useEffect, useRef } from "react";

import CertificationBanner from "../components/CertificationBanner.jsx";
import RadIdentitySection from "../components/RadIdentitySection.jsx";
import WhyRadKabel from "../components/WhyRadKabel.jsx";
import ScienceOfSafety from "../components/ScienceOfSafety.jsx";
import EBeamTechnology from "../components/EBeamTechnology.jsx";
import ProductsSection from "../components/ProductsSection.jsx";
import ApplicationsSection from "../components/ApplicationsSection.jsx";
import ElectricianProgramBanner from "../components/ElectricianProgramBanner.jsx";
import PrecisionTestingSection from "../components/PrecisionTestingSection.jsx";
import SafeWiringCTA from "../components/SafeWiringCTA.jsx";

/** Hero background — served from `public/videos/` */
const HERO_BANNER_VIDEO = "banner.mp4";

/** Served from `public/videos/` — copy your files with these exact filenames. */
const cableVideos = [
  { filename: "wq.mp4", name: "Wire Testing" },
  { filename: "th.mp4", name: "Machine Testing" },
];

/** Muted autoplay + loop satisfies browser policies; viewers can enable sound via the player. */
function CableVideoTile({ filename, name }) {
  const src = `/videos/${encodeURIComponent(filename)}`;
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const kick = () => {
      void el.play().catch(() => {});
    };
    kick();
    el.addEventListener("loadeddata", kick);
    return () => el.removeEventListener("loadeddata", kick);
  }, [src]);

  return (
    <article className="cable-video-card">
      <div className="cable-video-wrap cable-video-wrap--clean">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          src={src}
        >
          Sorry — your browser can’t play this video.
        </video>
      </div>
      <p className="cable-video-caption">{name}</p>
    </article>
  );
}

function Hero() {
  const heroVideoRef = useRef(null);
  const heroSrc = `/videos/${encodeURIComponent(HERO_BANNER_VIDEO)}`;

  useEffect(() => {
    const el = heroVideoRef.current;
    if (!el) return;

    const play = () => {
      void el.play().catch(() => {});
    };

    play();
    el.addEventListener("loadeddata", play);

    /** Some browsers/devices skip `loop` on certain encodes — restart explicitly. */
    const onEnded = () => {
      el.currentTime = 0;
      play();
    };
    el.addEventListener("ended", onEnded);

    const onVisibility = () => {
      if (document.visibilityState === "visible") play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      el.removeEventListener("loadeddata", play);
      el.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [heroSrc]);

  return (
    <section className="hero-shell home-hero-shell" aria-label="RAD Kabel">
      <div className="hero-media">
        <video
          ref={heroVideoRef}
          className="hero-bg-video"
          src={heroSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
        >
          Your browser does not support HTML5 video.
        </video>
      </div>
    </section>
  );
}

const SHOWCASE_RINGS = [
  { scale: 0.28, opacity: 0.62, duration: 22 },
  { scale: 0.46, opacity: 0.78, duration: 26, reverse: true },
  { scale: 0.64, opacity: 0.95, hero: true, duration: 30 },
  { scale: 0.82, opacity: 0.72, duration: 34, reverse: true },
  { scale: 1, opacity: 0.58, duration: 38 },
  { scale: 1.18, opacity: 0.48, duration: 42, reverse: true },
];

function ShowcaseRings() {
  return (
    <div className="home-showcase-rings" aria-hidden="true">
      <div className="home-showcase-rings__stage">
        {SHOWCASE_RINGS.map((ring) => (
          <span
            key={ring.scale}
            className={`home-showcase-ring-orbit${ring.reverse ? " is-reverse" : ""}`}
            style={{
              "--ring-scale": ring.scale,
              "--orbit-duration": `${ring.duration}s`,
            }}
          >
            <span
              className={`home-showcase-ring${ring.hero ? " is-hero" : ""}`}
              style={{ "--ring-opacity": ring.opacity }}
            />
          </span>
        ))}
        <div className="home-showcase-router">
          <span className="home-showcase-router-soft" />
          <span className="home-showcase-router-ring" />
        </div>
      </div>
    </div>
  );
}

function FullWidthHomeImage() {
  return (
    <section className="home-full-width-image" aria-label="RAD Kabel product showcase">
      <div className="home-showcase-copy">
        <h2>
          <span className="home-showcase-line-nowrap">
            ZERO SMOKE. <span className="is-red">ZERO FIRE.</span>
          </span>
          <span className="home-showcase-line-nowrap">ZERO COMPROMISE.</span>
        </h2>
        <p>Advanced E-Beam technology wires engineered for modern electrical safety.</p>
      </div>
      <ShowcaseRings />
      <img src="/images/home-banner-followup.png" alt="RAD Kabel product showcase" />
    </section>
  );
}

function CableVideos() {
  return (
    <section className="section cable-videos-section bg-black px-5 py-16 font-sans sm:px-10 sm:py-20 lg:px-14 lg:py-24" id="cable-video">
      <div className="mx-auto max-w-[1920px] text-center">
        <p className="site-kicker">Cable in motion</p>
        <h2 className="site-section-title site-section-title--lg mt-4">
          SEE THE WIRE UP CLOSE.
        </h2>
      </div>
      <div className="cable-video-grid mx-auto mt-10 max-w-[1920px] sm:mt-12">
        {cableVideos.map(({ filename, name }) => (
          <CableVideoTile key={filename} filename={filename} name={name} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="site-main relative z-0 font-sans">
      <Hero />
      <FullWidthHomeImage />
      <CertificationBanner />
      <RadIdentitySection />
      <WhyRadKabel />
      <ScienceOfSafety />
      <EBeamTechnology />
      <ProductsSection />
      <ApplicationsSection />
      <PrecisionTestingSection />
      <ElectricianProgramBanner />
      <CableVideos />
      <SafeWiringCTA />
    </main>
  );
}
