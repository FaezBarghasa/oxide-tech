import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Inventory from './components/Inventory';
import TechStack from './components/TechStack';
import Leadership from './components/Leadership';
import Footer from './components/Footer';
import PCBBackground from './components/PCBBackground';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { t } from './lib/i18n';

export default function App() {
  const [lang, setLang] = useState<'fa' | 'en'>('fa');
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [contactData, setContactData] = useState({
    name: '',
    company: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  }, [lang]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactData.name && contactData.email) {
      setFormSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0908] text-[#fbfbfb] font-sans selection:bg-[#ff7f41] selection:text-[#07070a] relative overflow-hidden">
      {/* Structural Overlays */}
      <PCBBackground />
      <div className="scanline"></div>

      <Navigation lang={lang} setLang={setLang} />

      <main className="max-w-[1440px] mx-auto px-6 md:px-20 pt-32 pb-20 relative z-10 animate-fade-in">
        <Hero
          lang={lang}
          activeProductIndex={activeProductIndex}
          setActiveProductIndex={setActiveProductIndex}
        />
        <Manifesto lang={lang} />
        <Inventory
          lang={lang}
          activeProductIndex={activeProductIndex}
          setActiveProductIndex={setActiveProductIndex}
        />
        <TechStack lang={lang} />
        <Leadership lang={lang} />

        {/* Interactive CTA Section */}
        <motion.section
          id="contact"
          className="mb-32 relative py-24 px-6 md:px-12 border border-[#fbfbfb]/10 bg-[#161210]/60 backdrop-blur-xl rounded-sm text-center max-w-[1100px] mx-auto overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Neon top border line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#ff7f41] via-[#c2410c] to-[#d9531e]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-[#ff7f41]/10 blur-[80px] pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-[#d9531e] uppercase block mb-4">
              {t("CTA_SUB", lang)}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#fbfbfb] mb-6 font-display font-medium tracking-tight leading-tight">
              {t("CTA_TITLE", lang)}
            </h2>
            <p className="font-sans text-sm md:text-base text-[#c2b5ad] mb-12 leading-relaxed font-light">
              {t("CTA_DESC", lang)}
            </p>

            <AnimatePresence mode="wait">
              {!showContactForm ? (
                <motion.div
                  key="cta-buttons"
                  className="flex flex-col sm:flex-row gap-5 justify-center items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="w-full sm:w-auto bg-[#ff7f41] text-[#07070a] px-10 py-4 font-mono text-xs font-bold tracking-[0.1em] hover:shadow-[0_0_30px_#ff7f41] hover:-translate-y-1 transition-all duration-300 uppercase cursor-pointer rounded-sm"
                  >
                    {t("CTA_ESTABLISH", lang)}
                  </button>
                  <a
                    href="#products"
                    className="w-full sm:w-auto border border-[#ff7f41]/50 text-[#ff7f41] px-10 py-4 font-mono text-xs font-bold tracking-[0.11em] hover:bg-[#ff7f41]/10 hover:-translate-y-1 transition-all duration-300 uppercase cursor-pointer rounded-sm text-center"
                  >
                    {t("CTA_DEV_PORTAL", lang)}
                  </a>
                </motion.div>
              ) : !formSubmitted ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleContactSubmit}
                  className="bg-[#0b0908]/90 backdrop-blur-md border border-[#fbfbfb]/10 p-8 md:p-10 text-start space-y-6 rounded-sm max-w-lg mx-auto shadow-2xl relative"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Form decorative corner */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#ff7f41]/30 -mt-1 -mr-1"></div>

                  <div className="flex justify-between items-center pb-4 border-b border-[#fbfbfb]/10 mb-4">
                    <span className="font-mono text-[10px] text-[#ff7f41] tracking-widest uppercase">{t("FORM_SESSION", lang)}</span>
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className="font-mono text-[10px] text-[#85746a] hover:text-[#fbfbfb] transition-colors cursor-pointer"
                    >
                      {t("FORM_CLOSE", lang)}
                    </button>
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-[#85746a] tracking-[0.15em] uppercase mb-2">{t("FORM_NAME", lang)}</label>
                    <input
                      type="text"
                      required
                      value={contactData.name}
                      onChange={(e) => setContactData({...contactData, name: e.target.value})}
                      className="w-full bg-[#161210]/80 border border-[#fbfbfb]/10 p-3.5 text-sm text-[#fbfbfb] focus:border-[#ff7f41] outline-none rounded-sm transition-colors"
                      placeholder={lang === 'fa' ? "نام کامل خود را وارد کنید" : "Enter full name"}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-mono text-[10px] text-[#85746a] tracking-[0.15em] uppercase mb-2">{t("FORM_COMPANY", lang)}</label>
                      <input
                        type="text"
                        value={contactData.company}
                        onChange={(e) => setContactData({...contactData, company: e.target.value})}
                        className="w-full bg-[#161210]/80 border border-[#fbfbfb]/10 p-3.5 text-sm text-[#fbfbfb] focus:border-[#ff7f41] outline-none rounded-sm transition-colors"
                        placeholder={lang === 'fa' ? "نام شرکت" : "Company name"}
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] text-[#85746a] tracking-[0.15em] uppercase mb-2">{t("FORM_EMAIL", lang)}</label>
                      <input
                        type="email"
                        required
                        value={contactData.email}
                        onChange={(e) => setContactData({...contactData, email: e.target.value})}
                        className="w-full bg-[#161210]/80 border border-[#fbfbfb]/10 p-3.5 text-sm text-[#fbfbfb] focus:border-[#ff7f41] outline-none rounded-sm transition-colors"
                        placeholder="email@domain.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-[#85746a] tracking-[0.15em] uppercase mb-2">{t("FORM_MSG", lang)}</label>
                    <textarea
                      rows={4}
                      value={contactData.message}
                      onChange={(e) => setContactData({...contactData, message: e.target.value})}
                      className="w-full bg-[#161210]/80 border border-[#fbfbfb]/10 p-3.5 text-sm text-[#fbfbfb] focus:border-[#ff7f41] outline-none rounded-sm resize-none transition-colors"
                      placeholder={lang === 'fa' ? "شرح نیازمندی‌های سخت‌افزاری..." : "Describe hardware requirements..."}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#ff7f41] text-[#07070a] hover:text-[#fbfbfb] hover:bg-[#d9531e] py-4 font-mono text-xs font-bold tracking-[0.1em] hover:shadow-[0_0_20px_#ff7f41] hover:-translate-y-0.5 transition-all cursor-pointer rounded-sm uppercase mt-4"
                  >
                    {t("FORM_TRANSMIT", lang)}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className="bg-[#ff7f41]/5 border border-[#ff7f41]/20 p-10 text-center max-w-md mx-auto space-y-5 rounded-sm backdrop-blur-md"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Sparkles className="w-12 h-12 text-[#ff7f41] mx-auto animate-pulse" />
                  <div className="font-mono text-sm font-bold text-[#ff7f41] tracking-widest">
                    {t("FORM_SUCCESS", lang)}
                  </div>
                  <p className="font-sans text-xs text-[#c2b5ad] leading-relaxed">
                    {t("FORM_SUCCESS_DESC", lang)} <br/>
                    <code className="text-[#fbfbfb] font-mono mt-2 inline-block bg-[#0b0908] px-2 py-1 rounded-sm border border-[#fbfbfb]/10">0x7F9A2 {contactData.company ? `(${contactData.company})` : ''}</code><br/>
                    {t("FORM_SUCCESS_DESC_2", lang)}
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setShowContactForm(false);
                      setContactData({ name: '', company: '', email: '', message: '' });
                    }}
                    className="mt-6 font-mono text-[10px] text-[#ff7f41] hover:text-[#fbfbfb] transition-colors cursor-pointer uppercase tracking-[0.15em] border border-[#ff7f41]/30 px-4 py-2 hover:bg-[#ff7f41]/10"
                  >
                    {t("FORM_RETURN", lang)}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
