import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import OxideLogo from './OxideLogo';
import { t } from '../lib/i18n';
import { PhoneCall, Menu, X } from 'lucide-react';
import { telemetry } from '../lib/analytics';

interface NavigationProps {
  lang: 'fa' | 'en';
  setLang: (lang: 'fa' | 'en') => void;
  onOpenContact?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ lang, setLang, onOpenContact }) => {
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
    { href: '#tech',      labelKey: 'NAV_TECH'      },
    { href: '#products',  labelKey: 'NAV_PRODUCTS'  },
    { href: '#architects',labelKey: 'NAV_ARCHITECTS'},
    { href: '#opensource',labelKey: 'NAV_OPENSOURCE'},
    { href: '#contact',   labelKey: 'NAV_CONTACT'   },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-[#0b0908]/92 backdrop-blur-2xl border-b border-[#c1552c]/25 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
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
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7f41] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0908] rounded-sm"
          onClick={() => telemetry.track('logo_click', 'navigation')}
        >
          <motion.div
            className="w-9 h-9 sm:w-10 sm:h-10 relative flex items-center justify-center cursor-pointer"
            whileHover={{ rotate: 180, scale: 1.08 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <OxideLogo className="w-full h-full drop-shadow-[0_0_12px_rgba(193,85,44,0.55)]" />
          </motion.div>

          <div className="font-mono text-lg sm:text-xl font-bold tracking-tight">
            <span className="text-[#fbfbfb]">oxide</span>
            <span className="text-[#85746a]">-</span>
            <span className="text-[#ff7f41] group-hover:text-[#d9531e] transition-colors duration-200">tech</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-xs font-medium text-[#c2b5ad] hover:text-[#ff7f41] py-1 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7f41] rounded-sm"
              onClick={() => telemetry.track(`nav_${link.labelKey}`, 'navigation')}
            >
              {t(link.labelKey, lang)}
            </a>
          ))}
        </div>

        {/* Action Group */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Toggle */}
          <motion.button
            onClick={() => {
              const next = lang === 'en' ? 'fa' : 'en';
              setLang(next);
              telemetry.track(`toggle_lang_${next}`, 'navigation');
            }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.1 }}
            className="border border-[#c1552c]/40 hover:border-[#ff7f41] text-[#ff7f41] hover:text-[#fbfbfb] hover:bg-[#c1552c]/15 font-mono text-xs font-semibold px-3 py-1.5 transition-all duration-200 cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7f41]"
            title="Toggle Language (Farsi / English)"
          >
            {lang === 'fa' ? "EN" : "فا"}
          </motion.button>

          {/* Direct Phone / Contact Button */}
          <motion.a
            href="#contact"
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.1 }}
            onClick={() => {
              telemetry.track('contact_nav_click', 'cta');
              if (onOpenContact) onOpenContact();
            }}
            className="bg-[#c1552c] hover:bg-[#d9531e] text-[#fbfbfb] text-xs font-semibold px-5 py-2 transition-all duration-300 shadow-[0_0_20px_rgba(193,85,44,0.4)] hover:shadow-[0_0_25px_rgba(255,127,65,0.65)] cursor-pointer rounded-sm flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7f41]"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{t("NAV_GET_LICENSE", lang)}</span>
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setLang(lang === 'en' ? 'fa' : 'en')}
            className="border border-[#c1552c]/40 text-[#ff7f41] font-mono text-xs px-2.5 py-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7f41]"
          >
            {lang === 'fa' ? "EN" : "فا"}
          </button>
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.92 }}
            className="text-[#c2b5ad] hover:text-white p-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7f41]"
            aria-label="Toggle Navigation Menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="w-6 h-6" />
                </motion.span>
              ) : (
                <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="w-6 h-6" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer — AnimatePresence for proper unmount */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden surface-elevated border-t-0 px-6 py-5 flex flex-col gap-4 overflow-hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, x: lang === 'fa' ? 12 : -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#c2b5ad] hover:text-[#ff7f41] py-1 transition-colors"
              >
                {t(link.labelKey, lang)}
              </motion.a>
            ))}

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.04, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenContact) onOpenContact();
              }}
              className="w-full bg-[#c1552c] hover:bg-[#d9531e] text-[#fbfbfb] text-xs font-semibold py-2.5 rounded-sm text-center mt-2 shadow-[0_0_15px_rgba(193,85,44,0.5)] flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t("NAV_GET_LICENSE", lang)}</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
