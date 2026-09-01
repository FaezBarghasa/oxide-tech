import React, { useState } from 'react';
import { Send, CheckCircle2, MapPin, Mail, Phone, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import OxideLogo from './OxideLogo';
import { t } from '../lib/i18n';
import { telemetry } from '../lib/analytics';

interface FooterProps {
  lang: 'fa' | 'en';
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      telemetry.track('newsletter_subscribe', 'cta', email);
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="border-t border-[#3b82f6]/20 bg-[#070b14] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-start">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Col 1: Brand & Mission */}
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <OxideLogo className="w-8 h-8" />
              <div className="text-xl text-[#f8fafc] font-mono font-bold tracking-tight">
                {t("FOOT_TITLE", lang)}
              </div>
            </div>
            <p className="text-xs text-[#94a3b8] max-w-sm leading-relaxed mb-6 font-light">
              {t("FOOT_DESC", lang)}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#10b981]/10 border border-[#10b981]/30 font-mono text-[10px] text-[#34d399]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              <span>{t("FOOT_ORIGIN", lang)}</span>
            </div>
          </div>
          
          {/* Col 2: Quick Links */}
          <div className="col-span-6 md:col-span-2">
            <div className="text-[#3b82f6] mb-4 uppercase text-xs font-mono font-bold tracking-wider">
              {t("FOOT_RESOURCES", lang)}
            </div>
            <ul className="flex flex-col gap-2.5 text-xs text-[#94a3b8]">
              <li><a href="#products" className="hover:text-[#3b82f6] transition-colors">{t("NAV_PRODUCTS", lang)}</a></li>
              <li><a href="#tech" className="hover:text-[#3b82f6] transition-colors">{t("NAV_TECH", lang)}</a></li>
              <li><a href="#manifesto" className="hover:text-[#3b82f6] transition-colors">{t("NAV_MANIFESTO", lang)}</a></li>
              <li><a href="#opensource" className="hover:text-[#3b82f6] transition-colors">{t("NAV_OPENSOURCE", lang)}</a></li>
            </ul>
          </div>
          
          {/* Col 3: Corporate Info */}
          <div className="col-span-6 md:col-span-3">
            <div className="text-[#3b82f6] mb-4 uppercase text-xs font-mono font-bold tracking-wider">
              {lang === 'fa' ? "اطلاعات سازمانی و ارتباط" : "Corporate & Contact"}
            </div>
            <ul className="flex flex-col gap-3 text-xs text-[#94a3b8]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                <span>{lang === 'fa' ? "تهران، پارک فناوری / منطقه اداری" : "Tehran HQ / Technology District"}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#3b82f6] flex-shrink-0" />
                <a href="mailto:info@oxide-tech.com" className="font-mono hover:text-[#3b82f6]">info@oxide-tech.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#3b82f6] flex-shrink-0" />
                <span className="font-mono dir-ltr">+98 21 8800 0000</span>
              </li>
            </ul>
          </div>
          
          {/* Col 4: Newsletter / Telemetry Dispatch */}
          <div className="col-span-12 md:col-span-3">
            <div className="text-[#3b82f6] mb-4 uppercase text-xs font-mono font-bold tracking-wider">
              {t("FOOT_UPDATES", lang)}
            </div>
            <p className="text-xs text-[#94a3b8] mb-3 font-light">
              {lang === 'fa' 
                ? "دریافت آخرین به‌روزرسانی‌های فنی و لاگ‌های انتشار فریمورک Slint و Embassy"
                : "Subscribe to Slint & Embassy embedded release dispatches."}
            </p>
            <AnimatePresence mode="wait">
              {!subscribed ? (
                <form onSubmit={handleSubmit} className="flex">
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#0b1120] border border-white/15 px-3 py-2 w-full font-mono text-xs text-[#f8fafc] placeholder-[#64748b] focus:border-[#3b82f6] focus:outline-none rounded-s-sm dir-ltr" 
                    placeholder="engineer@enterprise.ir"
                  />
                  <button 
                    type="submit" 
                    className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-4 transition-colors rounded-e-sm flex items-center justify-center cursor-pointer"
                  >
                    <Send className="w-4 h-4"/>
                  </button>
                </form>
              ) : (
                <motion.div 
                  className="flex items-center gap-2 border border-[#10b981]/30 bg-[#10b981]/10 p-2.5 rounded-sm font-mono text-xs text-[#34d399]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                  <span>DISPATCH_LINK: CONNECTED</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-[#64748b]">
          <div>{t("FOOT_COPYRIGHT", lang)}</div>
          <div className="flex items-center gap-6">
            <span className="text-[#3b82f6]">RUST 1.85+ // NO_STD</span>
            <span className="text-[#10b981]">SYSTEM: HEALTHY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
