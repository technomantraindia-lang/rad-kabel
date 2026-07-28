const FRAME = {
  ring: "#5E5E5E",
  badge: "#e01921",
  icon: "#F2F2F2",
};

function StepFrame({ step, children }) {
  return (
    <svg
      className="ep-how__step-icon"
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="128" cy="128" r="86" stroke={FRAME.ring} strokeWidth="4" />
      <circle cx="52" cy="60" r="24" fill={FRAME.badge} />
      <text
        x="52"
        y="60"
        fill="#fff"
        fontSize="26"
        fontFamily="Montserrat, Arial, Helvetica, sans-serif"
        textAnchor="middle"
        dominantBaseline="central"
        fontWeight="700"
      >
        {step}
      </text>
      <g stroke={FRAME.icon} strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}

function RegisterIcon() {
  return (
    <StepFrame step={1}>
      <circle cx="125" cy="93" r="23" />
      <path d="M86 170c4-29 21-45 39-45 19 0 35 16 39 45" />
      <circle cx="172" cy="145" r="20" />
      <path d="M172 134v22" />
      <path d="M161 145h22" />
    </StepFrame>
  );
}

function BuyRadKabelIcon() {
  return (
    <StepFrame step={2}>
      <rect x="78" y="72" width="74" height="88" rx="6" />
      <path d="M103 93h37" />
      <path d="M103 110h29" />
      <path d="M103 127h22" />
      <path d="M84 87h12" />
      <path d="M84 104h12" />
      <path d="M84 121h12" />
      <circle cx="164" cy="138" r="22" />
      <path d="M180 154l18 18" />
      <path d="M154 138l7 7 13-15" />
    </StepFrame>
  );
}

function EarnPointsIcon() {
  return (
    <StepFrame step={3}>
      <path d="M74 150l22-11c8-4 15-4 24-1l17 5" />
      <path d="M137 143l17 4c8 2 13 10 11 18-2 8-10 13-18 11l-22-6" />
      <path d="M74 150v24h25l32 8c16 4 23 3 36-4l26-14c7-4 10-13 6-20-4-7-13-10-20-6l-22 11" />
      <path d="M157 80l8 16 18 3-13 12 3 18-16-8-16 8 3-18-13-12 18-3z" />
    </StepFrame>
  );
}

function RedeemRewardsIcon() {
  return (
    <StepFrame step={4}>
      <rect x="83" y="111" width="90" height="61" rx="4" />
      <path d="M78 95h100v20H78z" />
      <path d="M128 95v77" />
      <path d="M102 95c-11 0-19-7-19-17 0-10 7-17 17-17 17 0 28 22 28 22h-26z" />
      <path d="M154 95c11 0 19-7 19-17 0-10-7-17-17-17-17 0-28 22-28 22h26z" />
    </StepFrame>
  );
}

/** Clean geometric award seal — perfectly centered checkmark badge */
function GetRecognizedIcon() {
  return (
    <StepFrame step={5}>
      {/* Clean 16-lobe award seal, centered at 128,128 */}
      <path d="M128.00 80.00 Q139.32 71.11 146.37 83.65 Q160.22 79.77 161.94 94.06 Q176.23 95.78 172.35 109.63 Q184.89 116.68 176.00 128.00 Q184.89 139.32 172.35 146.37 Q176.23 160.22 161.94 161.94 Q160.22 176.23 146.37 172.35 Q139.32 184.89 128.00 176.00 Q116.68 184.89 109.63 172.35 Q95.78 176.23 94.06 161.94 Q79.77 160.22 83.65 146.37 Q71.11 139.32 80.00 128.00 Q71.11 116.68 83.65 109.63 Q79.77 95.78 94.06 94.06 Q95.78 79.77 109.63 83.65 Q116.68 71.11 128.00 80.00 Z" />
      <circle cx="128" cy="128" r="28" />
      <path d="M113 130l10.5 10.5 19.5-21" />
    </StepFrame>
  );
}

const STEP_ICONS = {
  1: RegisterIcon,
  2: BuyRadKabelIcon,
  3: EarnPointsIcon,
  4: RedeemRewardsIcon,
  5: GetRecognizedIcon,
};

export default function ElectricianHowStepIcon({ step }) {
  const Icon = STEP_ICONS[step];
  return Icon ? <Icon /> : null;
}
