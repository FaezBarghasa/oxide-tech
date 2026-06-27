import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { t } from '../lib/i18n';

interface FooterProps {
  lang: 'fa' | 'en';
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="border-t border-[#ff7f41]/10 bg-[#14110f]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 px-6 md:px-20 py-20 max-w-[1440px] mx-auto text-start">
        <div className="col-span-12 md:col-span-4">
          <div className="text-xl text-[#fbfbfb] mb-6 font-display font-semibold tracking-tight">{t("FOOT_TITLE", lang)}</div>
          <p className="font-sans text-sm text-[#c2b5ad] max-w-sm leading-relaxed font-light">
            {t("FOOT_DESC", lang)}
          </p>
        </div>
        
        <div className="col-span-6 md:col-span-2">
          <div className={`text-[#ff7f41] mb-6 uppercase text-xs ${lang === 'fa' ? 'font-sans' : 'font-mono tracking-[0.15em]'} font-bold`}>{t("FOOT_RESOURCES", lang)}</div>
          <ul className={`flex flex-col gap-3 ${lang === 'fa' ? 'font-sans' : 'font-mono'} text-[10px] text-[#c2b5ad]`}>
            <li className="hover:text-[#d9531e] transition-colors cursor-pointer">{t("NAV_PRODUCTS", lang)}</li>
            <li className="hover:text-[#d9531e] transition-colors cursor-pointer">{t("TECH_TITLE", lang)}</li>
            <li className="hover:text-[#d9531e] transition-colors cursor-pointer">{t("NAV_PHILOSOPHY", lang)}</li>
          </ul>
        </div>
        
        <div className="col-span-6 md:col-span-2">
          <div className={`text-[#ff7f41] mb-6 uppercase text-xs ${lang === 'fa' ? 'font-sans' : 'font-mono tracking-[0.15em]'} font-bold`}>{t("FOOT_COMPLIANCE", lang)}</div>
          <ul className={`flex flex-col gap-3 ${lang === 'fa' ? 'font-sans' : 'font-mono'} text-[10px] text-[#c2b5ad]`}>
            <li className="hover:text-[#d9531e] transition-colors cursor-pointer">{lang === 'fa' ? "حقوقی" : "Legal"}</li>
            <li className="hover:text-[#d9531e] transition-colors cursor-pointer">{lang === 'fa' ? "حریم خصوصی" : "Privacy"}</li>
            <li className="hover:text-[#d9531e] transition-colors cursor-pointer">{lang === 'fa' ? "امنیت" : "Security"}</li>
          </ul>
        </div>
        
        <div className="col-span-12 md:col-span-4">
          <div className={`text-[#ff7f41] mb-6 uppercase text-xs ${lang === 'fa' ? 'font-sans' : 'font-mono tracking-[0.15em]'} font-bold`}>{t("FOOT_UPDATES", lang)}</div>
          <AnimatePresence mode="wait">
            {!subscribed ? (
              <motion.form 
                key="subscribe"
                onSubmit={handleSubmit} 
                className="flex rounded-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#161210] border border-[#ff7f41]/15 p-3 w-full font-mono text-xs text-[#fbfbfb] placeholder-[#85746a] focus:border-[#ff7f41] focus:outline-none rounded-none" 
                  placeholder="terminal@oxide.tech"
                />
                <button 
                  type="submit" 
                  className="bg-[#ff7f41] hover:bg-[#d9531e] text-[#07070a] hover:text-[#fbfbfb] px-4 transition-colors rounded-none flex items-center justify-center cursor-pointer"
                >
                  <Send className="w-4 h-4"/>
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="subscribed"
                className={`flex items-center gap-2 border border-[#d9531e]/30 bg-[#d9531e]/5 p-3 ${lang === 'fa' ? 'font-sans' : 'font-mono'} text-xs text-[#ff7f41]`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle2 className="w-4 h-4 text-[#ff7f41] flex-shrink-0 animate-bounce" />
                <span>{lang === 'fa' ? "اتصال برقرار شد: وضعیت عادی" : "CONNECTION ESTABLISHED: STATUS OK"}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="col-span-12 mt-12 pt-8 border-t border-[#ff7f41]/10 flex flex-col md:flex-row justify-between items-center opacity-80 gap-4">
          <div className={`${lang === 'fa' ? 'font-sans' : 'font-mono'} text-[10px] text-[#85746a]`}>{t("FOOT_COPYRIGHT", lang)}</div>
          <div className={`flex gap-8 mt-4 md:mt-0 ${lang === 'fa' ? 'font-sans' : 'font-mono'} text-[10px]`}>
            <span className="text-[#d9531e]">{t("FOOT_REGION", lang)}</span>
            <span className="text-[#85746a]">{t("FOOT_STATUS", lang)}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
