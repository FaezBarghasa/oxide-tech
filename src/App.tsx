import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import TechStack from './components/TechStack';
import Inventory from './components/Inventory';
import Architects from './components/Architects';
import OpenSource from './components/OpenSource';
import WhitepaperModal from './components/WhitepaperModal';
import DeveloperPortal from './components/DeveloperPortal';
import FloatingContact from './components/FloatingContact';
import Footer from './components/Footer';
import PCBBackground from './components/PCBBackground';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, FileText, Send, CheckCircle2, Lock } from 'lucide-react';
import { t } from './lib/i18n';
import { telemetry } from './lib/analytics';

export default function App() {
  const [lang, setLang] = useState<'fa' | 'en'>('fa');
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [whitepaperOpen, setWhitepaperOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);

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
      telemetry.track('contact_form_submit', 'cta', contactData.company, contactData.email);
      setFormSubmitted(true);
    }
  };

  const handleSelectProductFor3D = (idx: number) => {
    setActiveProductIndex(idx);
    const heroEl = document.getElementById('hero');
    heroEl?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0b0908] text-[#fbfbfb] font-sans selection:bg-[#c1552c] selection:text-white relative overflow-hidden">
      {/* Structural Overlays */}
      <PCBBackground />
      <div className="scanline"></div>

      {/* Dynamic Navigation */}
      <Navigation 
        lang={lang} 
        setLang={setLang}
        onOpenWhitepaper={() => setWhitepaperOpen(true)}
        onOpenPortal={() => setPortalOpen(true)}
        onOpenContact={() => {
          const contactEl = document.getElementById('contact');
          contactEl?.scrollIntoView({ behavior: 'smooth' });
          setShowContactForm(true);
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 relative z-10">
        {/* Hero Section */}
        <Hero
          lang={lang}
          activeProductIndex={activeProductIndex}
          setActiveProductIndex={setActiveProductIndex}
          onConsultationClick={() => {
            const contactEl = document.getElementById('contact');
            contactEl?.scrollIntoView({ behavior: 'smooth' });
            setShowContactForm(true);
          }}
        />

        {/* 6 Core Pillars Manifesto */}
        <Manifesto lang={lang} />

        {/* 4-Layer Vertical Integration Tech Stack */}
        <TechStack lang={lang} />

        {/* 9-Module Industrial Inventory */}
        <Inventory
          lang={lang}
          activeProductIndex={activeProductIndex}
          setActiveProductIndex={setActiveProductIndex}
          onSelectProductFor3D={handleSelectProductFor3D}
        />

        {/* Meet the Architects (Leadership) */}
        <Architects lang={lang} />

        {/* Open Source Showcase */}
        <OpenSource lang={lang} />

        {/* Industrial Whitepaper Lead Magnet Banner */}
        <motion.section
          className="mb-32 relative py-12 px-6 sm:px-12 border border-[#c1552c]/40 bg-[#161210]/90 backdrop-blur-xl rounded-sm text-start max-w-5xl mx-auto overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          {/* Top Orange Accent */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#c1552c] via-[#ff7f41] to-[#eab308]" />
          
          <div className="max-w-2xl">
            <span className="font-mono text-xs text-[#ff7f41] font-bold uppercase tracking-wider block mb-2">
              {t("WP_SUB", lang)}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#fbfbfb] mb-3 leading-snug">
              {t("WP_TITLE", lang)}
            </h3>
            <p className="text-xs sm:text-sm text-[#c2b5ad] font-light leading-relaxed">
              {t("WP_DESC", lang)}
            </p>
          </div>

          <button
            onClick={() => {
              telemetry.track('open_whitepaper_banner', 'whitepaper');
              setWhitepaperOpen(true);
            }}
            className="flex-shrink-0 bg-[#c1552c] hover:bg-[#d9531e] text-white px-6 py-3.5 rounded-sm font-bold text-xs tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(193,85,44,0.4)] hover:shadow-[0_0_25px_rgba(255,127,65,0.6)] flex items-center gap-2 cursor-pointer uppercase"
          >
            <FileText className="w-4 h-4" />
            <span>{t("WP_BUTTON", lang)}</span>
          </button>
        </motion.section>

        {/* Interactive Consultation / Contact Section */}
        <motion.section
          id="contact"
          className="mb-32 relative py-20 px-6 sm:px-12 border border-[#c1552c]/30 bg-[#161210]/80 backdrop-blur-xl rounded-sm text-center max-w-4xl mx-auto overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Top border line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#c1552c] via-[#ff7f41] to-[#eab308]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-[#c1552c]/10 blur-[80px] pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="font-mono text-xs tracking-widest text-[#ff7f41] uppercase block mb-3 font-bold">
              // TECHNICAL INQUIRY
            </span>
            <h2 className="text-3xl sm:text-4xl text-[#fbfbfb] mb-4 font-bold tracking-tight">
              {lang === 'fa' ? "مشاوره و استقرار راهکارهای صنعتی" : "Enterprise System Architecture Consultation"}
            </h2>
            <p className="text-xs sm:text-sm text-[#c2b5ad] mb-10 leading-relaxed font-light">
              {lang === 'fa' 
                ? "برای مشاوره فنی در زمینه طراحی همزمان سخت‌افزار، هوش مصنوعی لبه (Edge AI) و پشته‌های بدون هیپ MQTT، با معماران فنی ما در ارتباط باشید."
                : "Initiate technical dialogue regarding sovereign STM32 hardware-software co-design, deterministic Edge AI, and heap-free IIoT stacks."}
            </p>

            <AnimatePresence mode="wait">
              {!showContactForm ? (
                <motion.div
                  key="cta-buttons"
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="w-full sm:w-auto bg-[#c1552c] hover:bg-[#d9531e] text-white px-8 py-3.5 text-xs font-bold tracking-wider hover:shadow-[0_0_25px_rgba(255,127,65,0.6)] transition-all cursor-pointer rounded-sm uppercase"
                  >
                    {lang === 'fa' ? "درخواست مشاوره تخصصی" : "REQUEST CONSULTATION"}
                  </button>
                  <button
                    onClick={() => setPortalOpen(true)}
                    className="w-full sm:w-auto border border-[#c1552c]/40 text-[#ff7f41] hover:text-white hover:bg-[#c1552c]/15 px-8 py-3.5 text-xs font-mono font-semibold tracking-wider transition-all cursor-pointer rounded-sm uppercase"
                  >
                    {t("NAV_PORTAL", lang)}
                  </button>
                </motion.div>
              ) : !formSubmitted ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleContactSubmit}
                  className="bg-[#0b0908]/95 backdrop-blur-md border border-[#c1552c]/30 p-6 sm:p-8 text-start space-y-4 rounded-sm max-w-lg mx-auto shadow-2xl relative"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                >
                  <div className="flex justify-between items-center pb-3 border-b border-[#c1552c]/20 mb-2">
                    <span className="font-mono text-[10px] text-[#ff7f41] tracking-widest uppercase font-bold">
                      SECURE_SESSION // TLS_v1.3
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className="font-mono text-[10px] text-[#85746a] hover:text-white transition-colors cursor-pointer"
                    >
                      [ CLOSE ]
                    </button>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] text-[#c2b5ad] uppercase mb-1">
                      {lang === 'fa' ? "نام و نام خانوادگی" : "Full Name"} *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactData.name}
                      onChange={(e) => setContactData({...contactData, name: e.target.value})}
                      className="w-full bg-[#1b1714] border border-[#c1552c]/30 p-2.5 text-xs text-[#fbfbfb] focus:border-[#ff7f41] outline-none rounded-sm"
                      placeholder={lang === 'fa' ? "مهندس علوی" : "Eng. Name"}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[10px] text-[#c2b5ad] uppercase mb-1">
                        {lang === 'fa' ? "سازمان / شرکت" : "Company"}
                      </label>
                      <input
                        type="text"
                        value={contactData.company}
                        onChange={(e) => setContactData({...contactData, company: e.target.value})}
                        className="w-full bg-[#1b1714] border border-[#c1552c]/30 p-2.5 text-xs text-[#fbfbfb] focus:border-[#ff7f41] outline-none rounded-sm"
                        placeholder={lang === 'fa' ? "شرکت صنعتی" : "Company Name"}
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] text-[#c2b5ad] uppercase mb-1">
                        {lang === 'fa' ? "ایمیل سازمانی" : "Corporate Email"} *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactData.email}
                        onChange={(e) => setContactData({...contactData, email: e.target.value})}
                        className="w-full bg-[#1b1714] border border-[#c1552c]/30 p-2.5 text-xs font-mono text-[#fbfbfb] focus:border-[#ff7f41] outline-none rounded-sm dir-ltr text-start"
                        placeholder="cto@domain.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] text-[#c2b5ad] uppercase mb-1">
                      {lang === 'fa' ? "شرح نیازمندی‌های مهندسی" : "Technical Scope"}
                    </label>
                    <textarea
                      rows={3}
                      value={contactData.message}
                      onChange={(e) => setContactData({...contactData, message: e.target.value})}
                      className="w-full bg-[#1b1714] border border-[#c1552c]/30 p-2.5 text-xs text-[#fbfbfb] focus:border-[#ff7f41] outline-none rounded-sm resize-none"
                      placeholder={lang === 'fa' ? "شرح پروژه، معماری سخت‌افزار یا پروتکل مورد نظر..." : "Describe MCU targets, protocols, or Edge AI specs..."}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#c1552c] hover:bg-[#d9531e] text-white py-3 font-mono text-xs font-bold tracking-wider hover:shadow-[0_0_20px_rgba(193,85,44,0.6)] transition-all cursor-pointer rounded-sm uppercase mt-2 flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{lang === 'fa' ? "ارسال درخواست مهندسی" : "DISPATCH INQUIRY"}</span>
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className="bg-[#c1552c]/10 border border-[#c1552c]/40 p-8 text-center max-w-md mx-auto space-y-3 rounded-sm backdrop-blur-md"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle2 className="w-10 h-10 text-[#ff7f41] mx-auto animate-bounce" />
                  <div className="font-mono text-sm font-bold text-[#ff7f41] tracking-wider">
                    {lang === 'fa' ? "پیام شما دریافت گردید" : "TRANSMISSION CONFIRMED"}
                  </div>
                  <p className="text-xs text-[#c2b5ad] leading-relaxed">
                    {lang === 'fa'
                      ? "درخواست فنی شما ثبت گردید. معماران ارشد سیستم در اسرع وقت با شما تماس خواهند گرفت."
                      : "Your technical request has been logged. Senior system architects will review the requirements shortly."}
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setShowContactForm(false);
                      setContactData({ name: '', company: '', email: '', message: '' });
                    }}
                    className="mt-4 font-mono text-[10px] text-[#ff7f41] hover:text-white transition-colors cursor-pointer uppercase border border-[#c1552c]/30 px-3 py-1.5 rounded-sm hover:bg-[#c1552c]/15"
                  >
                    {lang === 'fa' ? "بازگشت" : "RETURN"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
      </main>

      {/* Modals & Floating Tooling */}
      <WhitepaperModal
        isOpen={whitepaperOpen}
        onClose={() => setWhitepaperOpen(false)}
        lang={lang}
      />

      <DeveloperPortal
        isOpen={portalOpen}
        onClose={() => setPortalOpen(false)}
        lang={lang}
      />

      <FloatingContact lang={lang} />

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
}
