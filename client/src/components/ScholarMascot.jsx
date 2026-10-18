export default function ScholarMascot({ mood = "idle" }) {
  const shy = mood === "shy";
  const cheer = mood === "thumbsup";

  return (
    <div className="relative flex flex-col items-center">
      <svg
        viewBox="0 0 220 280"
        className="w-[240px] h-auto drop-shadow-2xl"
        role="img"
        aria-label="Graduate scholar illustration"
      >
        <defs>
          <linearGradient id="sSkin" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="#f6d0b0" />
            <stop offset="55%" stopColor="#e6b48c" />
            <stop offset="100%" stopColor="#c98f66" />
          </linearGradient>
          <radialGradient id="sForehead" cx="42%" cy="30%" r="55%">
            <stop offset="0%" stopColor="#fbe0c8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fbe0c8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sHair" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#4a3423" />
            <stop offset="60%" stopColor="#2a1d12" />
            <stop offset="100%" stopColor="#150f09" />
          </linearGradient>
          <linearGradient id="sGown" x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0%" stopColor="#2b3444" />
            <stop offset="45%" stopColor="#161c26" />
            <stop offset="100%" stopColor="#070a0f" />
          </linearGradient>
          <linearGradient id="sGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="sBark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7a5230" />
            <stop offset="100%" stopColor="#412714" />
          </linearGradient>
          <linearGradient id="sShoe" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a2f39" />
            <stop offset="100%" stopColor="#0a0d12" />
          </linearGradient>
          <filter id="sSoft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <filter id="sGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ground shadow */}
        <ellipse cx="110" cy="266" rx="82" ry="10" fill="#000" opacity="0.32" />

        {/* wooden bark */}
        <path d="M26 246 Q110 235 194 246 L194 261 Q110 272 26 261 Z" fill="url(#sBark)" />
        <path d="M26 246 Q110 235 194 246 L194 250 Q110 239 26 250 Z" fill="#8a5c33" />
        <path d="M42 249 q30 -4 60 -2" stroke="#301d0e" strokeWidth="1.4" fill="none" opacity="0.6" />
        <path d="M118 248 q28 -2 56 2" stroke="#301d0e" strokeWidth="1.4" fill="none" opacity="0.6" />

        {/* legs / trousers */}
        <path d="M97 168 L108 168 L107 244 Q102 247 97 244 Z" fill="#0d1016" />
        <path d="M112 168 L123 168 L123 244 Q118 247 113 244 Z" fill="#0d1016" />
        <path d="M97 168 L108 168 L107 205 L97 205 Z" fill="#000" opacity="0.25" />
        <path d="M112 168 L123 168 L123 205 L113 205 Z" fill="#000" opacity="0.25" />

        {/* shoes */}
        <path d="M94 242 Q94 236 100 236 L108 236 Q110 236 110 240 L110 250 Q110 254 105 254 L96 254 Q90 254 94 242 Z" fill="url(#sShoe)" />
        <path d="M112 242 Q112 236 118 236 L126 236 Q130 236 130 242 Q134 254 128 254 L119 254 Q114 254 114 250 Z" fill="url(#sShoe)" />
        <path d="M95 240 L109 240" stroke="#5b6472" strokeWidth="1" opacity="0.5" />
        <path d="M113 240 L129 240" stroke="#5b6472" strokeWidth="1" opacity="0.5" />

        {/* gown */}
        <path d="M90 96 Q110 88 130 96 L140 178 Q110 186 80 178 Z" fill="url(#sGown)" />
        {/* gown shading folds */}
        <path d="M90 96 Q104 104 108 178 L80 178 Q86 120 90 96 Z" fill="#000" opacity="0.22" />
        <path d="M130 96 Q116 104 112 178 L140 178 Q134 120 130 96 Z" fill="#000" opacity="0.22" />
        {/* front gold trim */}
        <path d="M110 132 L108 180" stroke="url(#sGold)" strokeWidth="2.4" fill="none" opacity="0.9" />
        {/* collar */}
        <path d="M96 96 L110 118 L124 96 Q110 90 96 96 Z" fill="#0a0d12" stroke="#c99a2e" strokeWidth="1.6" />
        {/* chest chevron trim */}
        <path d="M96 116 Q110 126 124 116" stroke="url(#sGold)" strokeWidth="1.6" fill="none" opacity="0.75" />
        {/* CDC badge */}
        <rect x="99" y="150" width="22" height="14" rx="4" fill="#0a0d12" stroke="url(#sGold)" strokeWidth="1.4" />
        <text x="110" y="160.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#eab308" letterSpacing="0.5">CDC</text>

        {/* left arm */}
        <g
          style={{
            transformOrigin: "92px 104px",
            transition: "transform .5s cubic-bezier(.34,1.4,.64,1)",
            transform: shy ? "rotate(14deg)" : "none",
          }}
        >
          <path d="M94 102 Q82 122 80 158" stroke="url(#sGown)" strokeWidth="15" strokeLinecap="round" fill="none" />
          <path d="M94 102 Q82 122 80 158" stroke="#000" strokeWidth="15" strokeLinecap="round" fill="none" opacity="0.18" />
          <ellipse cx="79" cy="164" rx="7.5" ry="9" fill="url(#sSkin)" transform="rotate(8 79 164)" />
        </g>

        {/* right arm — raises for thumbs up */}
        <g
          style={{
            transformOrigin: "128px 104px",
            transition: "transform .5s cubic-bezier(.34,1.4,.64,1)",
            transform: cheer ? "rotate(-64deg)" : "none",
          }}
        >
          <path d="M126 102 Q138 122 140 158" stroke="url(#sGown)" strokeWidth="15" strokeLinecap="round" fill="none" />
          <path d="M126 102 Q138 122 140 158" stroke="#000" strokeWidth="15" strokeLinecap="round" fill="none" opacity="0.12" />
          <ellipse cx="141" cy="164" rx="7.5" ry="9" fill="url(#sSkin)" transform="rotate(-8 141 164)" />
        </g>

        {/* neck */}
        <path d="M103 84 L117 84 L117 100 Q110 104 103 100 Z" fill="#d29b73" />
        <path d="M103 84 L117 84 L117 90 Q110 94 103 90 Z" fill="#000" opacity="0.22" />

        {/* head group */}
        <g
          style={{
            transformOrigin: "110px 66px",
            transition: "transform .5s ease",
            transform: shy ? "rotate(-5deg)" : "none",
          }}
        >
          {/* ears */}
          <ellipse cx="94" cy="68" rx="4" ry="6" fill="url(#sSkin)" />
          <ellipse cx="126" cy="68" rx="4" ry="6" fill="url(#sSkin)" />

          {/* face */}
          <path d="M110 40 Q128 40 131 60 Q133 78 120 86 Q110 91 100 86 Q87 78 89 60 Q92 40 110 40 Z" fill="url(#sSkin)" />
          {/* jaw shading */}
          <path d="M100 86 Q110 91 120 86 Q112 90 110 90 Q108 90 100 86 Z" fill="#000" opacity="0.15" />
          {/* forehead light */}
          <ellipse cx="106" cy="54" rx="16" ry="12" fill="url(#sForehead)" />
          {/* cheek/nose shadow */}
          <path d="M110 66 Q112 76 110 80" stroke="#000" strokeWidth="1.2" opacity="0.15" fill="none" />

          {/* hair */}
          <path d="M88 66 Q85 40 110 38 Q135 40 132 66 Q130 50 118 46 Q126 56 124 64 Q118 52 110 52 Q102 52 96 64 Q94 56 102 46 Q90 50 88 66 Z" fill="url(#sHair)" />
          <path d="M97 47 Q108 42 121 47" stroke="#5a4130" strokeWidth="1.2" fill="none" opacity="0.6" />

          {/* brows */}
          <path d="M97 61 Q102 58 107 60" stroke="#2a1d12" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M113 60 Q118 58 123 61" stroke="#2a1d12" strokeWidth="1.8" fill="none" strokeLinecap="round" />

          {/* eyes */}
          {cheer ? (
            <g stroke="#2a1d12" strokeWidth="1.8" fill="none" strokeLinecap="round">
              <path d="M97 68 q4 -4 8 0" />
              <path d="M115 68 q4 -4 8 0" />
            </g>
          ) : (
            <g
              style={{
                transition: "transform .45s cubic-bezier(.34,1.4,.64,1)",
                transform: shy ? "translateX(-4px)" : "translateX(0px)",
              }}
            >
              {/* sclera */}
              <ellipse cx="101" cy="68" rx="4.2" ry="3" fill="#fbf7f2" />
              <ellipse cx="119" cy="68" rx="4.2" ry="3" fill="#fbf7f2" />
              {/* iris */}
              <circle cx="101" cy="68" r="2.5" fill="#5b3a21" />
              <circle cx="119" cy="68" r="2.5" fill="#5b3a21" />
              {/* pupil */}
              <circle cx="101" cy="68" r="1.2" fill="#150f09" />
              <circle cx="119" cy="68" r="1.2" fill="#150f09" />
              {/* highlight */}
              <circle cx="102" cy="66.6" r="0.7" fill="#ffffff" />
              <circle cx="120" cy="66.6" r="0.7" fill="#ffffff" />
              {/* upper lash line */}
              <path d="M96.8 67 Q101 64 105.2 67" stroke="#2a1d12" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <path d="M114.8 67 Q119 64 123.2 67" stroke="#2a1d12" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </g>
          )}

          {/* nose */}
          <path d="M109 70 Q111 76 109 78" stroke="#b07850" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.7" />

          {/* mouth */}
          {cheer ? (
            <path d="M104 83 Q110 88 116 83" stroke="#8a4a3d" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          ) : (
            <path d="M105 83 Q110 85 115 83" stroke="#8a4a3d" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          )}

          {/* graduation cap */}
          <g>
            {/* cap base (skull cap) */}
            <path d="M92 46 Q110 38 128 46 L128 52 Q110 46 92 52 Z" fill="#0a0d12" />
            {/* board */}
            <path d="M110 30 L150 42 Q110 56 70 42 Z" fill="#11161f" stroke="#c99a2e" strokeWidth="1.4" />
            {/* board top highlight */}
            <path d="M110 32 L144 42 Q110 53 76 42 Z" fill="#1b222e" opacity="0.6" />
            {/* button */}
            <circle cx="110" cy="41" r="2.4" fill="url(#sGold)" />
            {/* tassel */}
            <g
              style={{
                transformOrigin: "146px 43px",
                transition: "transform .6s ease",
                transform: cheer ? "rotate(20deg)" : shy ? "rotate(-8deg)" : "none",
              }}
            >
              <path d="M110 41 Q130 42 146 46" stroke="url(#sGold)" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M146 46 q5 14 -2 26" stroke="url(#sGold)" strokeWidth="4" fill="none" strokeLinecap="round" />
              <circle cx="144" cy="74" r="4.5" fill="#facc15" filter="url(#sGlow)" />
            </g>
          </g>
        </g>

        {/* thumbs-up hand */}
        {cheer && (
          <g transform="translate(150 96)" className="animate-bounce">
            <ellipse cx="0" cy="4" rx="7.5" ry="9" fill="url(#sSkin)" />
            <rect x="-3.5" y="-12" width="7" height="14" rx="3.5" fill="url(#sSkin)" />
          </g>
        )}
      </svg>

      <p className="mt-3 text-[11px] font-semibold uppercase tracking-widest text-blue-200/50">
        {cheer ? "Welcome back!" : shy ? "Shielding your data..." : "Who's signing in?"}
      </p>
    </div>
  );
}
