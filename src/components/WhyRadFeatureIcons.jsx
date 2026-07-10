const RED = "#e50914";
const BLACK = "#0a0a0a";
const DARK = "#1a1a1a";

function SvgIcon({ className, children }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

/** E-BEAM TECHNOLOGY — molecular / atom */
export function IconEbeam({ className }) {
  return (
    <SvgIcon className={className}>
      <circle cx="12" cy="12" r="2.25" fill={RED} stroke={BLACK} strokeWidth="0.75" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke={RED} strokeWidth="1.75" fill="none" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke={BLACK} strokeWidth="1.25" fill="none" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke={RED} strokeWidth="1.75" fill="none" transform="rotate(120 12 12)" />
    </SvgIcon>
  );
}

/** 101% CONDUCTIVITY — electric bolt */
export function IconConductivity({ className }) {
  return (
    <SvgIcon className={className}>
      <path
        d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"
        fill={RED}
        stroke={BLACK}
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

/** NO MELT NO DRIP — droplet blocked */
export function IconNoMeltDrip({ className }) {
  return (
    <SvgIcon className={className}>
      <path
        d="M12 2.5c-3.5 4.5-5.5 7.5-5.5 10a5.5 5.5 0 0 0 11 0c0-2.5-2-5.5-5.5-10z"
        fill={RED}
        stroke={BLACK}
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path d="m4 4 16 16" stroke={BLACK} strokeWidth="2" strokeLinecap="round" />
    </SvgIcon>
  );
}

/** HIGH FIRE RESISTANCE — flame */
export function IconFireResistance({ className }) {
  return (
    <SvgIcon className={className}>
      <path
        d="M12 3c1.5 2.5 4 4.5 4 7.5a4 4 0 0 1-8 0c0-1.5.5-2.5 1.5-4C8.5 8 9 6.5 10 5c.5 1 1 1.5 2 2 0-2 0-3.5-.5-4z"
        fill={RED}
        stroke={BLACK}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M12 22c2.5 0 4.5-2 4.5-4.5S14 14 12 11s-4.5 1.5-4.5 4.5S9.5 22 12 22z"
        fill={DARK}
        stroke={BLACK}
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

/** LOW SMOKE ZERO HALOGEN — low smoke cloud */
export function IconLowSmoke({ className }) {
  return (
    <SvgIcon className={className}>
      <path
        d="M18 16H6a4 4 0 0 1 0-8 5.5 5.5 0 0 1 10.6-1.8A4.5 4.5 0 0 1 18 16z"
        fill={RED}
        stroke={BLACK}
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path d="M8 19h8" stroke={BLACK} strokeWidth="1.75" strokeLinecap="round" />
    </SvgIcon>
  );
}

/** 50 YEARS LIFE SPAN — clock / longevity */
export function IconLifeSpan({ className }) {
  return (
    <SvgIcon className={className}>
      <circle cx="12" cy="12" r="9" fill={RED} stroke={BLACK} strokeWidth="1.5" />
      <circle cx="12" cy="12" r="6.5" fill={BLACK} />
      <path d="M12 7v5l3 2" stroke={RED} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 3v3M20 7h-3" stroke={BLACK} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  );
}
