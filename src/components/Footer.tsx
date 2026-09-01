import React, { useState } from 'react';
import { MapPin, Mail, Phone, ExternalLink, Copy, Check } from 'lucide-react';
import OxideLogo from './OxideLogo';
import { t } from '../lib/i18n';
import { telemetry } from '../lib/analytics';

interface FooterProps {
  lang: 'fa' | 'en';
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    telemetry.track(`footer_copy_${id}`, 'cta');
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <footer className="border-t border-[#c1552c]/20 bg-[#07070a] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-start">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Col 1: Brand & Mission */}
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <OxideLogo className="w-8 h-8" />
              <div className="text-xl text-[#fbfbfb] font-mono font-bold tracking-tight">
                {t("FOOT_TITLE", lang)}
              </div>
            </div>
            <p className="text-xs text-[#c2b5ad] max-w-sm leading-relaxed mb-6 font-light">
              {t("FOOT_DESC", lang)}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#c1552c]/10 border border-[#c1552c]/30 font-mono text-[10px] text-[#ff7f41]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff7f41] animate-pulse" />
              <span>{t("FOOT_ORIGIN", lang)}</span>
            </div>
          </div>
          
          {/* Col 2: Quick Links */}
          <div className="col-span-6 md:col-span-3">
            <div className="text-[#ff7f41] mb-4 uppercase text-xs font-mono font-bold tracking-wider">
              {t("FOOT_RESOURCES", lang)}
            </div>
            <ul className="flex flex-col gap-2.5 text-xs text-[#c2b5ad]">
              <li><a href="#manifesto" className="hover:text-[#ff7f41] transition-colors">{t("NAV_MANIFESTO", lang)}</a></li>
              <li><a href="#tech" className="hover:text-[#ff7f41] transition-colors">{t("NAV_TECH", lang)}</a></li>
              <li><a href="#products" className="hover:text-[#ff7f41] transition-colors">{t("NAV_PRODUCTS", lang)}</a></li>
              <li><a href="#architects" className="hover:text-[#ff7f41] transition-colors">{t("NAV_ARCHITECTS", lang)}</a></li>
              <li><a href="#opensource" className="hover:text-[#ff7f41] transition-colors">{t("NAV_OPENSOURCE", lang)}</a></li>
            </ul>
          </div>
          
          {/* Col 3: Direct Phone Numbers */}
          <div className="col-span-6 md:col-span-5">
            <div className="text-[#ff7f41] mb-4 uppercase text-xs font-mono font-bold tracking-wider">
              {lang === 'fa' ? "راه‌های ارتباط مستقیم تلفنی و جیمیل" : "Direct Phone & Gmail Contacts"}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Monib */}
              <div className="p-3 bg-[#14110f] border border-[#c1552c]/25 rounded-sm space-y-1.5">
                <div className="font-bold text-[#fbfbfb]">
                  {lang === 'fa' ? "منیب مختاری (مدیرعامل)" : "Monib Mokhtari (CEO)"}
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono" dir="ltr">
                  <a href="tel:+989123617481" className="text-[#ff7f41] hover:underline dir-ltr text-xs font-bold" dir="ltr">+98 912 361 7481</a>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#c2b5ad]">
                  <a href="mailto:monib.mokhtari85@gmail.com" className="hover:text-white truncate font-mono dir-ltr" dir="ltr">monib.mokhtari85@gmail.com</a>
                  <button 
                    onClick={() => handleCopy("monib.mokhtari85@gmail.com", "monib_f")}
                    className="text-[#85746a] hover:text-[#ff7f41] cursor-pointer"
                  >
                    {copiedItem === "monib_f" ? <Check className="w-3 h-3 text-[#ff7f41]" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              {/* Faez */}
              <div className="p-3 bg-[#14110f] border border-[#c1552c]/25 rounded-sm space-y-1.5">
                <div className="font-bold text-[#fbfbfb]">
                  {lang === 'fa' ? "فائز برق‌آسا (مدیر فنی)" : "Faez Barghasa (CTO)"}
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono" dir="ltr">
                  <a href="tel:+989359180154" className="text-[#ff7f41] hover:underline dir-ltr text-xs font-bold" dir="ltr">+98 935 918 0154</a>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#c2b5ad]">
                  <a href="mailto:faez.barghasa.org@gmail.com" className="hover:text-white truncate font-mono dir-ltr" dir="ltr">faez.barghasa.org@gmail.com</a>
                  <button 
                    onClick={() => handleCopy("faez.barghasa.org@gmail.com", "faez_f")}
                    className="text-[#85746a] hover:text-[#ff7f41] cursor-pointer"
                  >
                    {copiedItem === "faez_f" ? <Check className="w-3 h-3 text-[#ff7f41]" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>

            {/* General Inquiries */}
            <div className="mt-3 flex items-center justify-between p-2.5 bg-[#14110f] border border-white/5 rounded-sm text-xs font-mono">
              <span className="text-[#85746a]">{lang === 'fa' ? "جیمیل سازمانی:" : "Corporate Gmail:"}</span>
              <div className="flex items-center gap-2" dir="ltr">
                <a href="mailto:oxide.embedded@gmail.com" className="text-[#ff7f41] hover:underline font-mono dir-ltr" dir="ltr">oxide.embedded@gmail.com</a>
                <button 
                  onClick={() => handleCopy("oxide.embedded@gmail.com", "office_f")}
                  className="text-[#85746a] hover:text-white cursor-pointer"
                >
                  {copiedItem === "office_f" ? <Check className="w-3 h-3 text-[#ff7f41]" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-[#85746a]">
          <div>{t("FOOT_COPYRIGHT", lang)}</div>
          <div className="flex items-center gap-6">
            <span className="text-[#ff7f41]">RUST 1.85+ // NO_STD</span>
            <span className="text-[#eab308]">SYSTEM: ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
