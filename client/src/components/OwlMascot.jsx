export default function OwlMascot({ mood = "idle" }) {
  const shy = mood === "shy";
  const cheer = mood === "thumbsup";

  return (
    <div className="relative flex flex-col items-center">
      <svg
        viewBox="0 0 220 264"
        className="w-[230px] h-auto drop-shadow-2xl"
        role="img"
        aria-label="Owl mascot"
      >
        <defs>
          <linearGradient id="owlBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8a5c33" />
            <stop offset="100%" stopColor="#5b3a21" />
          </linearGradient>
          <linearGradient id="owlBark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7a5230" />
            <stop offset="100%" stopColor="#4a2e18" />
          </linearGradient>
        </defs>

        {/* ground shadow */}
        <ellipse cx="110" cy="251" rx="86" ry="11" fill="#000" opacity="0.35" />

        {/* wooden bark */}
        <path d="M24 230 Q110 219 196 230 L196 246 Q110 257 24 246 Z" fill="url(#owlBark)" />
        <path d="M24 230 Q110 219 196 230 L196 235 Q110 224 24 235 Z" fill="#8a5c33" />
        <path d="M40 233 q30 -4 60 -2" stroke="#3a2413" strokeWidth="1.6" fill="none" opacity="0.7" />
        <path d="M118 232 q28 -2 58 2" stroke="#3a2413" strokeWidth="1.6" fill="none" opacity="0.7" />
        <ellipse cx="118" cy="236" rx="6" ry="3" fill="#3a2413" opacity="0.6" />

        {/* feet */}
        <g fill="#e8a13a" stroke="#c57f1d" strokeWidth="1.2">
          <path d="M78 226 l10 0 l-2 -10 l-6 0 z" />
          <path d="M92 226 l10 0 l-2 -10 l-6 0 z" />
          <path d="M118 226 l10 0 l-2 -10 l-6 0 z" />
          <path d="M132 226 l10 0 l-2 -10 l-6 0 z" />
        </g>

        {/* body */}
        <ellipse cx="110" cy="158" rx="70" ry="74" fill="url(#owlBody)" />
        <ellipse cx="110" cy="174" rx="46" ry="54" fill="#d9b483" />
        <g fill="#b58a55" opacity="0.7">
          <ellipse cx="96" cy="150" rx="4" ry="6" />
          <ellipse cx="124" cy="150" rx="4" ry="6" />
          <ellipse cx="110" cy="182" rx="4" ry="6" />
          <ellipse cx="96" cy="200" rx="4" ry="6" />
          <ellipse cx="124" cy="200" rx="4" ry="6" />
        </g>

        {/* left wing */}
        <g
          style={{
            transformOrigin: "56px 128px",
            transition: "transform .45s cubic-bezier(.34,1.56,.64,1)",
            transform: shy ? "rotate(26deg)" : "none",
          }}
        >
          <ellipse cx="52" cy="160" rx="21" ry="58" fill="#5b3a21" />
          <path d="M52 118 q10 26 0 52" stroke="#3a2413" strokeWidth="1.6" fill="none" opacity="0.5" />
        </g>

        {/* right wing — raises for thumbs up */}
        <g
          style={{
            transformOrigin: "164px 128px",
            transition: "transform .45s cubic-bezier(.34,1.56,.64,1)",
            transform: cheer ? "rotate(-58deg)" : "none",
          }}
        >
          <ellipse cx="168" cy="160" rx="21" ry="58" fill="#5b3a21" />
          <path d="M168 118 q-10 26 0 52" stroke="#3a2413" strokeWidth="1.6" fill="none" opacity="0.5" />
        </g>

        {/* head */}
        <g
          style={{
            transformOrigin: "110px 96px",
            transition: "transform .4s ease",
            transform: shy ? "rotate(-5deg)" : "none",
          }}
        >
          {/* ear tufts */}
          <path d="M74 52 L58 16 L96 44 Z" fill="#7a5230" />
          <path d="M146 52 L162 16 L124 44 Z" fill="#7a5230" />

          <ellipse cx="110" cy="90" rx="64" ry="57" fill="#7a5230" />

          {/* facial discs */}
          <ellipse cx="82" cy="92" rx="35" ry="37" fill="#e2c79b" />
          <ellipse cx="138" cy="92" rx="35" ry="37" fill="#e2c79b" />

          {/* eyes */}
          {cheer ? (
            <g stroke="#14213d" strokeWidth="5.5" fill="none" strokeLinecap="round">
              <path d="M66 94 q16 -16 32 0" />
              <path d="M122 94 q16 -16 32 0" />
            </g>
          ) : (
            <>
              <circle cx="82" cy="90" r="25" fill="#fff" />
              <circle cx="138" cy="90" r="25" fill="#fff" />
              <g
                style={{
                  transition: "transform .4s cubic-bezier(.34,1.56,.64,1)",
                  transform: shy ? "translateX(-14px)" : "translateX(0px)",
                }}
              >
                <circle cx="82" cy="90" r="12" fill="#14213d" />
                <circle cx="138" cy="90" r="12" fill="#14213d" />
                <circle cx="86" cy="86" r="3.5" fill="#fff" />
                <circle cx="142" cy="86" r="3.5" fill="#fff" />
              </g>
            </>
          )}

          {/* beak */}
          <path d="M110 100 L100 122 L120 122 Z" fill="#e8a13a" stroke="#c57f1d" strokeWidth="1.2" />
        </g>

        {/* thumbs-up hand */}
        {cheer && (
          <g transform="translate(186 64)" className="animate-bounce">
            <rect x="-8" y="-3" width="16" height="20" rx="6" fill="#f2b134" stroke="#c57f1d" strokeWidth="1.5" />
            <rect x="-4" y="-24" width="8" height="22" rx="4" fill="#f2b134" stroke="#c57f1d" strokeWidth="1.5" />
          </g>
        )}
      </svg>

      <p className="mt-3 text-[11px] font-semibold uppercase tracking-widest text-blue-200/50">
        {cheer ? "Welcome back!" : shy ? "Your secret is safe..." : "Who's signing in?"}
      </p>
    </div>
  );
}
