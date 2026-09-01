import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import OxideLogo from './OxideLogo';
import { t } from '../lib/i18n';
import { PhoneCall, Menu, X } from 'lucide-react';
import { telemetry } from '../lib/analytics';

interface NavigationProps {
  lang: 'fa' | 'en';
  setLang: (lang: 'fa' | 'en') => void;
  onOpenContact?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  lang, 
  setLang, 
  onOpenContact 
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);
      setIsScrolled(scrollTop > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#manifesto', labelKey: 'NAV_MANIFESTO' },
    { href: '#tech', labelKey: 'NAV_TECH' },
    { href: '#products', labelKey: 'NAV_PRODUCTS' },
    { href: '#architects', labelKey: 'NAV_ARCHITECTS' },
    { href: '#opensource', labelKey: 'NAV_OPENSOURCE' },
    { href: '#contact', labelKey: 'NAV_CONTACT' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#0b0908]/90 backdrop-blur-2xl border-b border-[#c1552c]/25 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.6)]' 
        : 'bg-[#0b0908]/60 backdrop-blur-md border-b border-[#ff7f41]/10 py-4'
    }`}>
      {/* Scroll Progress Bar */}
      <div 
        className="absolute top-0 left-0 h-[2.5px] bg-gradient-to-r from-[#d9531e] via-[#ff7f41] to-[#eab308] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo Lockup */}
        <a 
          href="#" 
          className="flex items-center gap-3 group focus:outline-none"
          onClick={() => telemetry.track('logo_click', 'navigation')}
        >
          <motion.div 
            className="w-9 h-9 sm:w-10 sm:h-10 relative flex items-center justify-center cursor-pointer"
            whileHover={{ rotate: 90, scale: 1.05 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <OxideLogo className="w-full h-full drop-shadow-[0_0_12px_rgba(193,85,44,0.55)]" />
          </motion.div>

          {/* Wordmark */}
          <div className="font-mono text-lg sm:text-xl font-bold tracking-tight">
            <span className="text-[#fbfbfb]">oxide</span>
            <span className="text-[#85746a]">-</span>
            <span className="text-[#ff7f41] group-hover:text-[#d9531e] transition-colors">tech</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-xs font-medium text-[#c2b5ad] hover:text-[#ff7f41] transition-colors duration-200 py-1 hover:border-b-2 hover:border-[#ff7f41]`}
              onClick={() => telemetry.track(`nav_${link.labelKey}`, 'navigation')}
            >
              {t(link.labelKey, lang)}
            </a>
          ))}
        </div>

        {/* Action Group */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Toggle */}
          <button 
            onClick={() => {
              const next = lang === 'en' ? 'fa' : 'en';
              setLang(next);
              telemetry.track(`toggle_lang_${next}`, 'navigation');
            }}
            className="border border-[#c1552c]/40 hover:border-[#ff7f41] text-[#ff7f41] hover:text-[#fbfbfb] hover:bg-[#c1552c]/15 font-mono text-xs font-semibold px-3 py-1.5 transition-all duration-200 cursor-pointer rounded-sm"
            title="Toggle Language (Farsi / English)"
          >
            {lang === 'fa' ? "EN" : "فا"}
          </button>

          {/* Direct Phone / Contact Button */}
          <a 
            href="#contact"
            onClick={() => {
              telemetry.track('contact_nav_click', 'cta');
              if (onOpenContact) {
                onOpenContact();
              }
            }}
            className="bg-[#c1552c] hover:bg-[#d9531e] text-[#fbfbfb] text-xs font-semibold px-5 py-2 transition-all duration-300 shadow-[0_0_20px_rgba(193,85,44,0.4)] hover:shadow-[0_0_25px_rgba(255,127,65,0.65)] cursor-pointer rounded-sm flex items-center gap-2"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{t("NAV_GET_LICENSE", lang)}</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button 
            onClick={() => setLang(lang === 'en' ? 'fa' : 'en')}
            className="border border-[#c1552c]/40 text-[#ff7f41] font-mono text-xs px-2.5 py-1 rounded-sm"
          >
            {lang === 'fa' ? "EN" : "فا"}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#c2b5ad] hover:text-white p-2 rounded-sm"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-[#14110f] border-b border-[#c1552c]/20 px-6 py-5 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-[#c2b5ad] hover:text-[#ff7f41] py-1"
            >
              {t(link.labelKey, lang)}
            </a>
          ))}

          <a 
            href="#contact"
            onClick={() => {
              setMobileMenuOpen(false);
              if (onOpenContact) {
                onOpenContact();
              }
            }}
            className="w-full bg-[#c1552c] text-[#fbfbfb] text-xs font-semibold py-2.5 rounded-sm text-center mt-2 shadow-[0_0_15px_rgba(193,85,44,0.5)] flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{t("NAV_GET_LICENSE", lang)}</span>
          </a>
        </motion.div>
      )}
    </nav>
  );
};

export default Navigation;
