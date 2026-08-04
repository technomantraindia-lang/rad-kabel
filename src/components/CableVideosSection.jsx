import { useEffect, useRef } from "react";

/** Served from `public/videos/` — copy your files with these exact filenames. */
const CABLE_VIDEOS = [
  { filename: "fire-testing.MOV", name: "Fire Testing" },
  { filename: "machine-testing.MOV", name: "Machine Testing" },
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
          preload="metadata"
          controls
          src={src}
        >
          <source src={src} type="video/quicktime" />
          <source src={src} type="video/mp4" />
          Sorry — your browser can’t play this video.
        </video>
      </div>
      <p className="cable-video-caption">{name}</p>
    </article>
  );
}

export default function CableVideosSection({ id = "cable-video" }) {
  return (
    <section
      className="section cable-videos-section bg-black px-5 py-16 font-sans sm:px-10 sm:py-20 lg:px-14 lg:py-24"
      id={id}
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto max-w-[1920px] text-center">
        <p className="site-kicker">Cable in motion</p>
        <h2 id={`${id}-heading`} className="site-section-title site-section-title--lg mt-4">
          SEE THE WIRE UP CLOSE.
        </h2>
      </div>
      <div className="cable-video-grid mx-auto mt-10 max-w-[1920px] sm:mt-12">
        {CABLE_VIDEOS.map(({ filename, name }) => (
          <CableVideoTile key={filename} filename={filename} name={name} />
        ))}
      </div>
    </section>
  );
}
