import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import TechStack from './components/TechStack';
import Inventory from './components/Inventory';
import Architects from './components/Architects';
import OpenSource from './components/OpenSource';
import FloatingContact from './components/FloatingContact';
import Footer from './components/Footer';
import PCBBackground from './components/PCBBackground';
import { motion } from 'motion/react';
import { Phone, Mail, Copy, Check, PhoneCall, ExternalLink, ShieldCheck, MapPin } from 'lucide-react';
import { t } from './lib/i18n';
import { telemetry } from './lib/analytics';

export default function App() {
  const [lang, setLang] = useState<'fa' | 'en'>('fa');
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  }, [lang]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    telemetry.track(`direct_copy_${id}`, 'cta');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSelectProductFor3D = (idx: number) => {
    setActiveProductIndex(idx);
    const heroEl = document.getElementById('hero');
    heroEl?.scrollIntoView({ behavior: 'smooth' });
  };

  const directContacts = [
    {
      id: "monib",
      name: lang === 'fa' ? "منیب مختاری" : "Monib Mokhtari",
      role: lang === 'fa' ? "مدیرعامل و معمار سیستم‌های نهفته" : "CEO & Embedded Systems Architect",
      focus: lang === 'fa' ? "طراحی سخت‌افزار، معماری بردهای صنعتی و قراردادهای ایمنی" : "Hardware Co-Design, Industrial PCB & Safety Architecture",
      phone: "+989123617481",
      phoneDisplay: "+98 912 361 7481",
      email: "monib.mokhtari85@gmail.com",
      accent: "#c1552c",
      initials: "MM"
    },
    {
      id: "faez",
      name: lang === 'fa' ? "فائز برق‌آسا" : "Faez Barghasa",
      role: lang === 'fa' ? "مدیر ارشد فناوری (CTO) و مهندس سیستم" : "CTO & Lead Systems Engineer",
      focus: lang === 'fa' ? "توسعه هسته Rust no_std، پایپلاین‌های Zero-Copy و هوش لبه‌ای" : "Rust no_std, Zero-Copy DMA & Edge AI Deployment",
      phone: "+989359180154",
      phoneDisplay: "+98 935 918 0154",
      email: "faez.barghasa.org@gmail.com",
      accent: "#ff7f41",
      initials: "FB"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0b0908] text-[#fbfbfb] font-sans selection:bg-[#c1552c] selection:text-white relative overflow-hidden">
      {/* Structural Overlays */}
      <PCBBackground />
      <div className="scanline"></div>

      {/* Dynamic Navigation */}
      <Navigation 
        lang={lang} 
        setLang={setLang}
        onOpenContact={() => {
          const contactEl = document.getElementById('contact');
          contactEl?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 relative z-10">
        {/* Hero Section */}
        <Hero
          lang={lang}
          activeProductIndex={activeProductIndex}
          setActiveProductIndex={setActiveProductIndex}
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

        {/* Direct Phone & Gmail Contact Section (No Forms, Pure Direct Access) */}
        <motion.section
          id="contact"
          className="mb-32 relative py-16 px-6 sm:px-12 border border-[#c1552c]/40 bg-[#161210]/90 backdrop-blur-xl rounded-sm max-w-5xl mx-auto overflow-hidden shadow-2xl scroll-mt-24 text-start"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Top Border Gradient */}
          <div className="absolute top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-[#c1552c] via-[#ff7f41] to-[#eab308]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-[#c1552c]/10 blur-[80px] pointer-events-none"></div>

          {/* Section Header */}
          <div className="mb-10 text-start">
            <span className="font-mono text-xs tracking-widest text-[#ff7f41] uppercase block mb-3 font-bold">
              {t("CONTACT_SUB", lang)}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#fbfbfb] font-bold tracking-tight">
              {t("CONTACT_TITLE", lang)}
            </h2>
            <p className="text-xs sm:text-sm text-[#c2b5ad] mt-2 font-light leading-relaxed max-w-3xl">
              {t("CONTACT_DESC", lang)}
            </p>
          </div>

          {/* Direct Founders Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {directContacts.map((c) => (
              <div
                key={c.id}
                className="p-6 bg-[#0b0908]/90 border border-[#c1552c]/30 rounded-sm hover:border-[#ff7f41]/60 transition-all duration-300 relative group flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-sm flex items-center justify-center font-mono text-base font-bold text-white shadow-md border border-[#c1552c]/40"
                        style={{ backgroundColor: `${c.accent}25` }}
                      >
                        {c.initials}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-[#fbfbfb]">{c.name}</h3>
                        <div className="text-[11px] font-mono text-[#ff7f41] font-medium">{c.role}</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#85746a] leading-relaxed mb-5 font-light">
                    {c.focus}
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-white/5 font-mono text-xs">
                  {/* Phone Call */}
                  <div className="flex items-center justify-between p-2.5 rounded bg-[#161210] border border-white/5">
                    <div className="flex items-center gap-2" dir="ltr">
                      <Phone className="w-4 h-4 text-[#ff7f41] flex-shrink-0" />
                      <a 
                        href={`tel:${c.phone}`}
                        onClick={() => telemetry.track(`call_card_${c.id}`, 'cta')}
                        className="text-[#fbfbfb] hover:text-[#ff7f41] text-xs font-bold font-mono tracking-wider dir-ltr"
                        dir="ltr"
                      >
                        {c.phoneDisplay}
                      </a>
                    </div>
                    <button
                      onClick={() => handleCopy(c.phoneDisplay, `${c.id}_phone`)}
                      className="text-[10px] text-[#85746a] hover:text-white px-2 py-1 bg-[#1b1714] rounded cursor-pointer transition-colors"
                      title="Copy Phone Number"
                    >
                      {copiedId === `${c.id}_phone` ? (
                        <span className="text-[#ff7f41] flex items-center gap-1"><Check className="w-3 h-3" /> COPIED</span>
                      ) : (
                        <span>COPY</span>
                      )}
                    </button>
                  </div>

                  {/* Gmail Mailto */}
                  <div className="flex items-center justify-between p-2.5 rounded bg-[#161210] border border-white/5">
                    <div className="flex items-center gap-2 truncate max-w-[240px] sm:max-w-[280px]" dir="ltr">
                      <Mail className="w-4 h-4 text-[#ff7f41] flex-shrink-0" />
                      <a 
                        href={`mailto:${c.email}`}
                        onClick={() => telemetry.track(`email_card_${c.id}`, 'cta')}
                        className="text-[#c2b5ad] hover:text-white text-xs truncate font-mono dir-ltr"
                        dir="ltr"
                      >
                        {c.email}
                      </a>
                    </div>
                    <button
                      onClick={() => handleCopy(c.email, `${c.id}_email`)}
                      className="text-[10px] text-[#85746a] hover:text-white px-2 py-1 bg-[#1b1714] rounded cursor-pointer transition-colors"
                      title="Copy Gmail"
                    >
                      {copiedId === `${c.id}_email` ? (
                        <span className="text-[#ff7f41] flex items-center gap-1"><Check className="w-3 h-3" /> COPIED</span>
                      ) : (
                        <span>COPY</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Central Lab & Office Inquiries */}
          <div className="p-4 bg-[#0b0908] border border-[#c1552c]/25 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-2.5 text-[#c2b5ad]">
              <MapPin className="w-4 h-4 text-[#ff7f41] flex-shrink-0" />
              <span>{lang === 'fa' ? "دفتر مرکزی و آزمایشگاه سیستم‌های نهفته: تهران / کرج" : "HQ & Embedded Systems Lab: Tehran / Karaj, Iran"}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[#85746a]">{lang === 'fa' ? "جیمیل سازمانی:" : "Corporate Gmail:"}</span>
              <a 
                href="mailto:oxide.embedded@gmail.com" 
                className="text-[#ff7f41] font-bold hover:underline font-mono dir-ltr"
                dir="ltr"
              >
                oxide.embedded@gmail.com
              </a>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Floating Quick Direct Dial Tooling */}
      <FloatingContact lang={lang} />

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
}
