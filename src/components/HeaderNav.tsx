import { playHardwareTone } from '../lib/audio';
import { t } from '../lib/i18n';
import { TechBox } from './TechBox';

export function Header({ lang, setLang, audioMuted, setAudioMuted }: any) {
  return (
    <TechBox className="flex-none" innerClassName="p-5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 overflow-hidden">
      <div className="absolute left-0 top-1/4 bottom-1/4 w-[6px] opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, #ff7f41 0px, #ff7f41 3px, transparent 3px, transparent 10px)' }}></div>
      <div className="absolute top-2 right-2 text-[10px] font-bold tracking-[0.2em] text-[#d9531e] font-mono uppercase">⊕ {t("FIDUCIAL_A", "en")}</div>

      {/* Master Hybrid Logo Lockup */}
      <div className="flex items-center gap-5 relative z-10 cursor-pointer group" onClick={() => playHardwareTone(880, 0.08, audioMuted)}>
        <div className="flex-none transition-transform duration-700 group-hover:scale-105">
          <svg viewBox="0 0 520 120" width="260" height="60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="oxide_grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff7f41" />
                <stop offset="50%" stopColor="#d9531e" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Abstract Symbol: Rusted Gear & Traces (based on abstract_logo_symbol.svg) */}
            <g id="abstract_symbol" transform="translate(10, 0) scale(0.6)">
              {/* Outer Gear Ring — 6-tooth gear referencing Rust */}
              <polygon
                points="35,24 42.2,21 40.9,7 59.1,7 57.8,21 65,24 71.2,28.8 82.7,20.6 91.9,36.4 79,42.2 80,50 79,57.8 91.9,63.6 82.7,79.4 71.2,71.2 65,76 57.8,79 59.1,93 40.9,93 42.2,79 35,76 28.8,71.2 17.3,79.4 8.1,63.6 21,57.8 20,50 21,42.2 8.1,36.4 17.3,20.6 28.8,28.8"
                fill="none"
                stroke="#ff7f41"
                strokeWidth="1.8"
                strokeOpacity="0.7"
                strokeLinejoin="round"
                className="origin-[50px_50px] animate-[spin_20s_linear_infinite]"
              />

              {/* Inner Hexagon — SiO₂ crystal lattice */}
              <polygon
                points="50,30 67.3,40 67.3,60 50,70 32.7,60 32.7,40"
                fill="none"
                stroke="#d9531e"
                strokeWidth="1.5"
                strokeOpacity="0.8"
                className="origin-[50px_50px] animate-[spin_10s_linear_infinite_reverse]"
              />

              {/* Lattice cross-lines (crystal structure) */}
              <g className="origin-[50px_50px] animate-[spin_10s_linear_infinite_reverse]">
                <line x1="50" y1="30" x2="50" y2="70" stroke="#d9531e" strokeWidth="0.8" strokeOpacity="0.3" />
                <line x1="67.3" y1="40" x2="32.7" y2="60" stroke="#d9531e" strokeWidth="0.8" strokeOpacity="0.3" />
                <line x1="67.3" y1="60" x2="32.7" y2="40" stroke="#d9531e" strokeWidth="0.8" strokeOpacity="0.3" />
                
                {/* Hexagon vertex nodes */}
                <circle cx="50" cy="30" r="1.2" fill="#d9531e" fillOpacity="0.8" />
                <circle cx="67.3" cy="40" r="1.2" fill="#d9531e" fillOpacity="0.8" />
                <circle cx="67.3" cy="60" r="1.2" fill="#d9531e" fillOpacity="0.8" />
                <circle cx="50" cy="70" r="1.2" fill="#d9531e" fillOpacity="0.8" />
                <circle cx="32.7" cy="60" r="1.2" fill="#d9531e" fillOpacity="0.8" />
                <circle cx="32.7" cy="40" r="1.2" fill="#d9531e" fillOpacity="0.8" />
              </g>

              {/* Gear tooth tip nodes (IC pin / connection nodes) */}
              <g className="origin-[50px_50px] animate-[spin_20s_linear_infinite]">
                <circle cx="50" cy="4.5" r="1.5" fill="#ff7f41" fillOpacity="0.8" />
                <circle cx="89.5" cy="27.3" r="1.5" fill="#ff7f41" fillOpacity="0.8" />
                <circle cx="89.5" cy="72.7" r="1.5" fill="#ff7f41" fillOpacity="0.8" />
                <circle cx="50" cy="95.5" r="1.5" fill="#ff7f41" fillOpacity="0.8" />
                <circle cx="10.5" cy="72.7" r="1.5" fill="#ff7f41" fillOpacity="0.8" />
                <circle cx="10.5" cy="27.3" r="1.5" fill="#ff7f41" fillOpacity="0.8" />
              </g>

              {/* Central Core */}
              <circle cx="50" cy="50" r="8" fill="#ff7f41" fillOpacity="0.95" />
              <circle cx="50" cy="50" r="4" fill="#07070a" />
              <circle cx="50" cy="50" r="2" fill="#eab308" className="animate-pulse" />
            </g>

            {/* Wordmark */}
            <g transform="translate(110, 72)">
              {/* Main Wordmark */}
              <text x="0" y="0" style={{ fontFamily: "'IBM Plex Mono', 'Courier Prime', 'Courier New', monospace", fontWeight: 900, fontSize: "36px", fill: "url(#oxide_grad)", letterSpacing: "-0.05em" }} filter="url(#glow)">oxide</text>
              <text x="116" y="0" style={{ fontFamily: "'IBM Plex Mono', 'Courier Prime', 'Courier New', monospace", fontWeight: 500, fontSize: "36px", fill: "#c2b5ad", letterSpacing: "-0.05em" }}>-tech</text>
              
              {/* Vertical Divider */}
              <line x1="240" y1="-26" x2="240" y2="4" stroke="#d9531e" strokeWidth="2" opacity="0.5" />
              
              {/* Subtitle Stack */}
              <text x="255" y="-14" style={{ fontFamily: "'IBM Plex Sans', -apple-system, sans-serif", fontWeight: 700, fontSize: "9.5px", fill: "#ff7f41", letterSpacing: "0.28em" }}>EMBEDDED RUST</text>
              <text x="255" y="2" style={{ fontFamily: "'IBM Plex Sans', -apple-system, sans-serif", fontWeight: 700, fontSize: "9.5px", fill: "#ff7f41", letterSpacing: "0.28em" }}>ARCHITECTURE</text>
            </g>
          </svg>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-8 text-[10px] font-bold tracking-[0.2em] font-mono w-full lg:w-auto lg:border-l border-[#2e211b] lg:pl-8 uppercase">
        <div className="flex flex-col">
          <span className="text-[#d9531e] block mb-1">{t("LANG_JUMPER", "en")}</span>
          <button onClick={() => setLang(lang === 'en' ? 'fa' : 'en')} className="text-[#fbfbfb] hover:text-[#ff7f41] transition-colors border border-[#2e211b] hover:border-[#ff7f41] bg-[#161210] px-2 py-1">
            {lang === 'fa' ? t("[ JUMPER: EN ]", "en") : t("[ JUMPER: FA ]", "en")}
          </button>
        </div>
        <div>
          <span className="text-[#d9531e] block mb-1">{t("SYS_BUS_LINK", "en")}</span>
          <div className="flex items-center gap-2 mt-1 px-2 py-1 bg-transparent border border-transparent">
            <span className="w-2 h-2 bg-[#ff7f41] rounded-full inline-block animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
            <span className="text-[#ff7f41]">{t("IMPEDANCE_MATCHED", "en")}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-[#d9531e] block mb-1">{t("SOUND_ENGINE", "en")}</span>
          <button onClick={() => setAudioMuted(!audioMuted)} className="text-[#fbfbfb] hover:text-[#ff7f41] transition-colors border border-[#2e211b] hover:border-[#ff7f41] bg-[#161210] px-2 py-1">
            {audioMuted ? t("AUDIO_MUTED", "en") : t("AUDIO_ACTIVE", "en")}
          </button>
        </div>
        <div className="flex flex-col">
          <span className="text-[#d9531e] block mb-1">{t("ACTIVE_TELEMETRY", "en")}</span>
          <span className="text-[#eab308] mt-1 px-2 py-1 bg-transparent border border-transparent">{t("LINKING_SECURE... // STABLE", "en")}</span>
        </div>
      </div>
    </TechBox>
  );
}

export function Nav({ currentView, setView, audioMuted, lang }: any) {
  const navigate = (target: string) => {
    playHardwareTone(440, 0.06, audioMuted);
    setTimeout(() => playHardwareTone(880, 0.06, audioMuted), 60);
    setView(target);
  };

  const getBtnInnerClass = (viewName: string) => {
    const base = "font-mono text-[11px] font-bold tracking-[0.2em] transition-all text-start group uppercase min-w-[160px] py-3 px-4 h-full flex items-center justify-start ";
    if (viewName === currentView) {
      return base + "bg-[#d9531e]/20 text-[#fbfbfb]";
    }
    return base + "text-[#d9531e] group-hover:text-[#fbfbfb]";
  };
  
  const getBtnOuterClass = (viewName: string) => {
    const base = "w-full text-left ";
    if (viewName === currentView) {
      return base + "bg-[#ff7f41]";
    }
    return base;
  }

  return (
    <nav className="flex-none grid grid-cols-1 md:grid-cols-4 gap-3 relative z-10">
      <div className="md:col-span-4 flex items-center gap-4 mb-1">
        <span className="text-[10px] text-[#d9531e] font-bold tracking-[0.25em] font-mono uppercase">{t("Interface Controller Bus // ADR_0x00", lang)}</span>
        <div className="flex-grow h-[1px] bg-[#2e211b]"></div>
      </div>

      <TechBox variant={currentView === 'gateway' ? 'accent' : 'button'} interactive onClick={() => navigate('gateway')} className={getBtnOuterClass('gateway')} innerClassName={getBtnInnerClass('gateway')}>
        <span>{lang === 'fa' ? '[۰x۰۰] درگاه اصلی' : '[0x00] Core Gateway'}</span>
      </TechBox>
      <TechBox variant={currentView === 'identity' ? 'accent' : 'button'} interactive onClick={() => navigate('identity')} className={getBtnOuterClass('identity')} innerClassName={getBtnInnerClass('identity')}>
        <span>{lang === 'fa' ? '[۰x۰۱] درباره ما' : '[0x01] About Us'}</span>
      </TechBox>
      <TechBox variant={currentView === 'directory' ? 'accent' : 'button'} interactive onClick={() => navigate('directory')} className={getBtnOuterClass('directory')} innerClassName={getBtnInnerClass('directory')}>
        <span>{lang === 'fa' ? '[۰x۰۲] محصولات' : '[0x02] Products'}</span>
      </TechBox>
      <TechBox variant={currentView === 'uplink' ? 'accent' : 'button'} interactive onClick={() => navigate('uplink')} className={getBtnOuterClass('uplink')} innerClassName={getBtnInnerClass('uplink')}>
        <span>{lang === 'fa' ? '[۰x۰۳] تماس و همکاری' : '[0x03] Contact & Partnership'}</span>
      </TechBox>
    </nav>
  );
}