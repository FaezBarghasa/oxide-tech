import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import OxideLogo from './OxideLogo';
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
            whileHover={{ rotate: 90, scale: 1.05 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <OxideLogo className="w-full h-full drop-shadow-[0_0_8px_rgba(200,90,40,0.35)]" animated />
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
