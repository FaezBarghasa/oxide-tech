import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { t } from '../lib/i18n';

interface NavigationProps {
  lang: 'fa' | 'en';
  setLang: (lang: 'fa' | 'en') => void;
}

const Navigation: React.FC<NavigationProps> = ({ lang, setLang }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav dir="ltr" className="fixed top-0 left-0 w-full z-50 bg-[#07070a]/90 backdrop-blur-xl border-b border-[#ff7f41]/15">
      {/* Scroll Progress Bar */}
      <div 
        className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-[#d9531e] to-[#eab308] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-20 h-20 flex justify-between items-center">
        {/* Logo Lockup with Geometric Mark */}
        <a href="#" className="flex items-center gap-3 group">
          <motion.div 
            className="w-10 h-10 relative flex items-center justify-center cursor-pointer"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Rust Gear + Oxide Lattice Mark (based on abstract_logo_symbol.svg) */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Outer Gear Ring — 6-tooth gear referencing Rust */}
              <polygon
                points="35,24 42.2,21 40.9,7 59.1,7 57.8,21 65,24 71.2,28.8 82.7,20.6 91.9,36.4 79,42.2 80,50 79,57.8 91.9,63.6 82.7,79.4 71.2,71.2 65,76 57.8,79 59.1,93 40.9,93 42.2,79 35,76 28.8,71.2 17.3,79.4 8.1,63.6 21,57.8 20,50 21,42.2 8.1,36.4 17.3,20.6 28.8,28.8"
                fill="none"
                stroke="#ff7f41"
                strokeWidth="1.8"
                strokeOpacity="0.7"
                strokeLinejoin="round"
                className="origin-center animate-[spin_20s_linear_infinite]"
              />

              {/* Inner Hexagon — SiO₂ crystal lattice */}
              <polygon
                points="50,30 67.3,40 67.3,60 50,70 32.7,60 32.7,40"
                fill="none"
                stroke="#d9531e"
                strokeWidth="1.5"
                strokeOpacity="0.8"
                className="origin-center animate-[spin_10s_linear_infinite_reverse]"
              />

              {/* Lattice cross-lines (crystal structure) */}
              <g className="origin-center animate-[spin_10s_linear_infinite_reverse]">
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
              <g className="origin-center animate-[spin_20s_linear_infinite]">
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
            </svg>
          </motion.div>

          {/* Wordmark */}
          <div className="font-display text-xl font-semibold tracking-tight">
            <span className="text-[#f8fafc]">oxide</span>
            <span className="text-[#c2b5ad]">-</span>
            <span className="text-[#d9531e]">tech</span>
          </div>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-10">
          <a className={`${lang === 'fa' ? 'font-sans' : 'font-mono tracking-[0.15em]'} text-[12px] font-bold text-[#ff7f41] border-b border-[#ff7f41]/30 pb-1`} href="#philosophy">{t("NAV_PHILOSOPHY", lang)}</a>
          <a className={`${lang === 'fa' ? 'font-sans' : 'font-mono tracking-[0.15em]'} text-[12px] font-bold text-[#94a3b8] hover:text-[#d9531e] transition-colors`} href="#journey">{t("NAV_JOURNEY", lang)}</a>
          <a className={`${lang === 'fa' ? 'font-sans' : 'font-mono tracking-[0.15em]'} text-[12px] font-bold text-[#94a3b8] hover:text-[#d9531e] transition-colors`} href="#products">{t("NAV_PRODUCTS", lang)}</a>
          <a className={`${lang === 'fa' ? 'font-sans' : 'font-mono tracking-[0.15em]'} text-[12px] font-bold text-[#94a3b8] hover:text-[#d9531e] transition-colors`} href="#team">{t("NAV_TEAM", lang)}</a>
        </div>

        {/* Action Group */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLang(lang === 'en' ? 'fa' : 'en')}
            className="border border-[#ff7f41]/30 hover:border-[#ff7f41] text-[#ff7f41] hover:bg-[#ff7f41]/5 font-mono text-xs font-bold px-3 py-2 transition-all duration-300 cursor-pointer rounded-sm"
          >
            {lang === 'fa' ? "EN" : "فا"}
          </button>
          <button className={`bg-[#ff7f41] hover:bg-[#d9531e] text-[#07070a] hover:text-[#f8fafc] ${lang === 'fa' ? 'font-sans' : 'font-mono tracking-[0.15em]'} text-xs font-bold px-6 py-2.5 transition-all duration-300 transform active:translate-y-[1px] shadow-[0_0_15px_rgba(255,127,65,0.2)] hover:shadow-[0_0_20px_rgba(217,83,30,0.35)] cursor-pointer`}>
            {t("NAV_GET_LICENSE", lang)}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
