const PILLARS = [
  {
    letter: "R",
    label: "Reliable",
    lead: "Reliability",
    body: (
      <>
        is the foundation of the RAD Kabel identity. We build cables that perform with absolute consistency in homes,
        commercial spaces, and heavy-duty installations, so every connection feels dependable.
      </>
    ),
  },
  {
    letter: "A",
    label: "Advanced",
    lead: "Being Advanced",
    body: (
      <>
        is at the heart of RAD Kabel&apos;s commitment to progress. Precise engineering, modern materials, and
        continuous innovation keep our cables future-ready, efficient, and safer to use.
      </>
    ),
  },
  {
    letter: "D",
    label: "Durable",
    lead: "Durability",
    body: (
      <>
        defines the lasting strength and resilience of RAD Kabel. Our cables are engineered to resist heat, stress,
        bending, and long-term wear so they stay strong, stable, and safe for years to come.
      </>
    ),
  },
];

function PillarCopy({ lead, body }) {
  return (
    <p className="rad-identity-copy text-left font-sans text-[0.92rem] font-normal text-white/90 sm:text-[15px] lg:text-[1rem]">
      <strong className="font-bold text-white">{lead}</strong> {body}
    </p>
  );
}

function PillarCard({ letter, label, lead, body }) {
  return (
    <article
      className="rad-identity-pillar group flex min-w-0 flex-1 flex-row items-stretch overflow-hidden rounded-xl border border-zinc-800/90 bg-black transition-[border-color,box-shadow] duration-300 hover:border-[#e01921]/45 hover:shadow-[0_0_24px_rgba(224,25,33,0.12)]"
      aria-labelledby={`pillar-${letter}`}
    >
      <div className="flex w-[36%] min-w-[6.25rem] shrink-0 flex-col items-center justify-center border-r border-zinc-800/80 px-3 py-5 text-center sm:w-[38%] sm:min-w-[7rem] sm:px-4 sm:py-7 lg:w-[36%] lg:px-5 lg:py-8">
        <span
          className="rad-identity-letter font-sans font-black leading-none text-[#e01921]"
          style={{ fontSize: "clamp(3.25rem, 7.5vw, 7.25rem)" }}
          aria-hidden
        >
          {letter}
        </span>
        <h3
          id={`pillar-${letter}`}
          className="mt-2 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-white sm:mt-3 sm:text-xs lg:mt-4 lg:text-sm xl:text-base"
        >
          {label}
        </h3>
      </div>

      <div className="flex min-w-0 flex-1 items-center px-3 py-4 sm:px-4 sm:py-5 lg:px-5 lg:py-6">
        <PillarCopy lead={lead} body={body} />
      </div>
    </article>
  );
}

export default function RadIdentitySection() {
  return (
    <section
      className="rad-identity-section relative z-0 bg-black px-4 py-14 font-sans sm:px-8 sm:py-16 lg:px-10 lg:py-20 xl:px-14"
      aria-labelledby="rad-identity-heading"
    >
      <div className="mx-auto max-w-[1600px]">
        <header className="rad-identity-header mx-auto mb-12 max-w-4xl text-center sm:mb-14 lg:mb-16">
          <p className="site-kicker tracking-[0.38em]">Every Connection Matters</p>

          <h2 id="rad-identity-heading" className="site-section-title site-section-title--lg mt-5">
            <span className="text-[#e01921]">RAD</span> KABEL IDENTITY
          </h2>

          <p className="site-section-desc site-section-desc--center">
            Three pillars define how we engineer cable — reliability you can trust, technology that moves ahead, and
            durability that lasts.
          </p>

          <div className="mx-auto mt-8 h-px w-20 bg-white/20 sm:w-28" aria-hidden />
        </header>

        <div
          className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-stretch lg:gap-6 xl:gap-8"
          role="list"
          aria-label="RAD brand pillars"
        >
          {PILLARS.map((pillar) => (
            <div key={pillar.letter} role="listitem" className="flex min-w-0 flex-1">
              <PillarCard {...pillar} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
