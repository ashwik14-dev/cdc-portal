export default function RobotMascot({ mood = "idle" }) {
  const shy = mood === "shy";
  const cheer = mood === "thumbsup";

  return (
    <div className="relative flex flex-col items-center">
      <svg
        viewBox="0 0 220 264"
        className="w-[230px] h-auto drop-shadow-2xl"
        role="img"
        aria-label="Robot mascot"
      >
        <defs>
          <linearGradient id="robotBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
          <linearGradient id="robotArm" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8296ac" />
            <stop offset="100%" stopColor="#556377" />
          </linearGradient>
          <linearGradient id="robotBark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7a5230" />
            <stop offset="100%" stopColor="#4a2e18" />
          </linearGradient>
          <radialGradient id="visorGlow" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#0e7490" />
          </radialGradient>
          <filter id="cyanGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ground shadow */}
        <ellipse cx="110" cy="251" rx="86" ry="11" fill="#000" opacity="0.35" />

        {/* wooden bark */}
        <path d="M24 230 Q110 219 196 230 L196 246 Q110 257 24 246 Z" fill="url(#robotBark)" />
        <path d="M24 230 Q110 219 196 230 L196 235 Q110 224 24 235 Z" fill="#8a5c33" />
        <path d="M40 233 q30 -4 60 -2" stroke="#3a2413" strokeWidth="1.6" fill="none" opacity="0.7" />
        <path d="M118 232 q28 -2 58 2" stroke="#3a2413" strokeWidth="1.6" fill="none" opacity="0.7" />
        <ellipse cx="118" cy="236" rx="6" ry="3" fill="#3a2413" opacity="0.6" />

        {/* antenna */}
        <line x1="110" y1="46" x2="110" y2="26" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
        <circle cx="110" cy="22" r="6" fill="#22d3ee" filter="url(#cyanGlow)" className="animate-pulse" />

        {/* legs + feet */}
        <g>
          <rect x="86" y="206" width="14" height="22" rx="6" fill="#556377" />
          <rect x="120" y="206" width="14" height="22" rx="6" fill="#556377" />
          <rect x="78" y="224" width="30" height="14" rx="7" fill="#475569" />
          <rect x="112" y="224" width="30" height="14" rx="7" fill="#475569" />
          <rect x="78" y="232" width="30" height="5" rx="2.5" fill="#22d3ee" opacity="0.7" />
          <rect x="112" y="232" width="30" height="5" rx="2.5" fill="#22d3ee" opacity="0.7" />
        </g>

        {/* left arm */}
        <g
          style={{
            transformOrigin: "58px 132px",
            transition: "transform .45s cubic-bezier(.34,1.56,.64,1)",
            transform: shy ? "rotate(22deg)" : "none",
          }}
        >
          <rect x="44" y="118" width="24" height="78" rx="12" fill="url(#robotArm)" />
          <circle cx="56" cy="198" r="11" fill="#475569" />
        </g>

        {/* body */}
        <rect x="52" y="120" width="116" height="96" rx="26" fill="url(#robotBody)" />
        <rect x="52" y="120" width="116" height="96" rx="26" fill="none" stroke="#475569" strokeWidth="2" />

        {/* chest panel */}
        <rect x="82" y="140" width="56" height="46" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="2" />
        <g fill="#22d3ee" filter="url(#cyanGlow)">
          <circle cx="96" cy="156" r="4" />
          <rect x="108" y="152" width="20" height="8" rx="4" opacity="0.9" />
          <rect x="92" y="168" width="36" height="6" rx="3" opacity="0.7" />
        </g>

        {/* right arm — raises for thumbs up */}
        <g
          style={{
            transformOrigin: "162px 132px",
            transition: "transform .45s cubic-bezier(.34,1.56,.64,1)",
            transform: cheer ? "rotate(-62deg)" : "none",
          }}
        >
          <rect x="152" y="118" width="24" height="78" rx="12" fill="url(#robotArm)" />
          <circle cx="164" cy="198" r="11" fill="#475569" />
        </g>

        {/* head */}
        <g
          style={{
            transformOrigin: "110px 92px",
            transition: "transform .4s ease",
            transform: shy ? "rotate(-5deg)" : "none",
          }}
        >
          <rect x="54" y="46" width="112" height="92" rx="28" fill="url(#robotBody)" />
          <rect x="54" y="46" width="112" height="92" rx="28" fill="none" stroke="#475569" strokeWidth="2" />

          {/* visor */}
          <rect
            x="70"
            y="70"
            width="80"
            height="46"
            rx="20"
            fill="url(#visorGlow)"
            stroke="#164e63"
            strokeWidth="2"
            style={{ opacity: shy ? 0.55 : 1, transition: "opacity .4s ease" }}
          />

          {/* eyes */}
          {cheer ? (
            <g stroke="#0b0f19" strokeWidth="5" fill="none" strokeLinecap="round">
              <path d="M84 96 q14 -16 28 0" />
              <path d="M108 96 q14 -16 28 0" />
            </g>
          ) : (
            <g
              style={{
                transition: "transform .4s cubic-bezier(.34,1.56,.64,1)",
                transform: shy ? "translateX(-15px)" : "translateX(0px)",
              }}
            >
              <circle cx="94" cy="93" r="9" fill="#0b0f19" />
              <circle cx="126" cy="93" r="9" fill="#0b0f19" />
              <circle cx="97" cy="90" r="3" fill="#67e8f9" />
              <circle cx="129" cy="90" r="3" fill="#67e8f9" />
            </g>
          )}

          {/* mouth */}
          <rect x="100" y="122" width="20" height="5" rx="2.5" fill="#334155" />
        </g>

        {/* mechanical thumbs-up hand */}
        {cheer && (
          <g transform="translate(184 66)" className="animate-bounce">
            <rect x="-11" y="-4" width="22" height="22" rx="8" fill="#475569" stroke="#334155" strokeWidth="2" />
            <rect x="-6" y="-26" width="10" height="24" rx="5" fill="#64748b" stroke="#334155" strokeWidth="2" />
            <circle cx="0" cy="7" r="4" fill="#22d3ee" filter="url(#cyanGlow)" />
          </g>
        )}
      </svg>

      <p className="mt-3 text-[11px] font-semibold uppercase tracking-widest text-blue-200/50">
        {cheer ? "Welcome back!" : shy ? "Shielding your data..." : "Who's signing in?"}
      </p>
    </div>
  );
}
