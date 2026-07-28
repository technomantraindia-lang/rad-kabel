/** Red line-art icons for Why RAD Kabel — matches circular outline style. */
const RED = "#e01921";

function SvgIcon({ className, children }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
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
      <circle cx="24" cy="24" r="3.2" fill={RED} />
      <ellipse cx="24" cy="24" rx="18" ry="7.5" stroke={RED} strokeWidth="2" />
      <ellipse
        cx="24"
        cy="24"
        rx="18"
        ry="7.5"
        stroke={RED}
        strokeWidth="2"
        transform="rotate(60 24 24)"
      />
      <ellipse
        cx="24"
        cy="24"
        rx="18"
        ry="7.5"
        stroke={RED}
        strokeWidth="2"
        transform="rotate(120 24 24)"
      />
    </SvgIcon>
  );
}

/** 101% CONDUCTIVITY — electric bolt */
export function IconConductivity({ className }) {
  return (
    <SvgIcon className={className}>
      <path
        d="M26 6 14 26h8l-2 16 14-22h-8l2-14z"
        stroke={RED}
        strokeWidth="2.25"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </SvgIcon>
  );
}

/** NO MELT NO DRIP — droplet blocked */
export function IconNoMeltDrip({ className }) {
  return (
    <SvgIcon className={className}>
      <path
        d="M24 6c-6.5 8-10.5 13.5-10.5 19a10.5 10.5 0 0 0 21 0c0-5.5-4-11-10.5-19z"
        stroke={RED}
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
      <path
        d="M12 12 36 36"
        stroke={RED}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </SvgIcon>
  );
}

/** HIGH FIRE RESISTANCE — flame */
export function IconFireResistance({ className }) {
  return (
    <SvgIcon className={className}>
      <path
        d="M24 6c2.5 4.5 7.5 8 7.5 14a7.5 7.5 0 0 1-15 0c0-2.8 1-5 3-7.5C21 15 22 12.5 24 10c1 2 2 3 3.5 4C27 10.5 26 8 24 6z"
        stroke={RED}
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
      <path
        d="M24 22c2.2 0 4 1.8 4 4.2 0 2.8-1.8 5-4 6.8-2.2-1.8-4-4-4-6.8 0-2.4 1.8-4.2 4-4.2z"
        stroke={RED}
        strokeWidth="2"
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
        d="M36 28H14a7 7 0 0 1 0-14 9.5 9.5 0 0 1 18.2-3.2A7.5 7.5 0 0 1 36 28z"
        stroke={RED}
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
      <path d="M16 34h16" stroke={RED} strokeWidth="2.25" strokeLinecap="round" />
      <path d="M20 38h8" stroke={RED} strokeWidth="2.25" strokeLinecap="round" />
    </SvgIcon>
  );
}

/** 50 YEARS LIFE SPAN — clock / longevity */
export function IconLifeSpan({ className }) {
  return (
    <SvgIcon className={className}>
      <circle cx="24" cy="25" r="14" stroke={RED} strokeWidth="2.25" />
      <path
        d="M24 17v9l6 3.5"
        stroke={RED}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 8h8M24 5v5"
        stroke={RED}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}
