import React, { useState, useEffect } from 'react';
import HologramViewer from './HologramViewer';
import { motion } from 'motion/react';
import { t } from '../lib/i18n';
import { ShieldCheck, Cpu, Activity, ArrowRight, ArrowLeft, Terminal, Sparkles, MessageSquareQuote } from 'lucide-react';
import { telemetry } from '../lib/analytics';

interface HeroProps {
  lang: 'fa' | 'en';
  activeProductIndex: number;
  setActiveProductIndex: (idx: number) => void;
  onConsultationClick?: () => void;
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15
    }
  }
};

const Hero: React.FC<HeroProps> = ({ 
  lang, 
  activeProductIndex, 
  setActiveProductIndex,
  onConsultationClick 
}) => {
  const words = [
    t("Rust", lang),
    t("Silicon", lang),
    t("Safety", lang),
    t("Reliability", lang)
  ];

  // Typewriter effect
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [is3DHovered, setIs3DHovered] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const activeWord = words[wordIndex % words.length];
    
    const tick = () => {
      if (!isDeleting) {
        setCurrentText(activeWord.substring(0, currentText.length + 1));
        if (currentText.length + 1 === activeWord.length) {
          timer = setTimeout(() => setIsDeleting(true), 2600);
          return;
        }
      } else {
        setCurrentText(activeWord.substring(0, currentText.length - 1));
        if (currentText.length - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => prev + 1);
        }
      }
      
      const speed = isDeleting ? 60 : 110;
      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, isDeleting ? 60 : 110);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, lang, words]);

  useEffect(() => {
    setCurrentText('');
    setIsDeleting(false);
    setWordIndex(0);
  }, [lang]);

  return (
    <section id="hero" className="min-h-[85vh] flex flex-col justify-center relative mb-28 pt-24 lg:pt-20 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Pitch & Technical Copy */}
        <motion.div 
          className="lg:col-span-7 z-10 flex flex-col items-start text-start"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* System Status Eyebrow Badge */}
          <motion.div 
            variants={fadeInUp} 
            className="backdrop-blur-md bg-[#c1552c]/10 border border-[#c1552c]/35 px-3.5 py-1.5 rounded-full text-[#ff7f41] mb-6 flex items-center gap-2.5 uppercase text-[10px] sm:text-xs font-mono tracking-wider shadow-[0_0_20px_rgba(193,85,44,0.2)]"
          >
            <span className="w-2 h-2 rounded-full bg-[#ff7f41] shadow-[0_0_10px_#ff7f41] animate-pulse"></span>
            <span>{t("HERO_STATUS", lang)}</span>
          </motion.div>
          
          {/* Main H1 Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#fbfbfb] mb-6 font-bold tracking-tight leading-[1.2]">
            <span>{t("HERO_TITLE_H1", lang)}</span><br />
            <span className="text-[#ff7f41] font-extrabold">{t("HERO_TITLE_H1_CONT", lang)}</span>
            <div className="text-2xl sm:text-3xl md:text-4xl text-[#ff7f41] blinking-cursor block mt-2 bg-gradient-to-r from-[#ff7f41] via-[#d9531e] to-[#eab308] text-transparent bg-clip-text font-mono">
              {currentText}
            </div>
          </h1>
          
          {/* Sub-text */}
          <p className="text-sm md:text-base text-[#c2b5ad] mb-8 leading-relaxed max-w-2xl font-light">
            {t("HERO_SUBTEXT", lang)}
          </p>

          {/* CEO Philosophical Quote Blockquote */}
          <motion.div
            variants={fadeInUp}
            className="mb-8 p-4 rounded-sm bg-[#161210]/90 border-s-4 border-[#c1552c] border border-white/5 backdrop-blur-md max-w-2xl text-start relative group shadow-lg"
          >
            <MessageSquareQuote className="w-5 h-5 text-[#c1552c]/60 mb-2" />
            <p className="text-xs sm:text-sm text-[#fbfbfb] italic leading-relaxed mb-2 font-medium">
              {t("HERO_QUOTE_CEO", lang)}
            </p>
            <div className="text-[11px] font-mono text-[#ff7f41] font-semibold">
              — {t("HERO_QUOTE_CEO_AUTHOR", lang)}
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap gap-4 items-center w-full sm:w-auto"
          >
            <a
              href="#tech"
              onClick={() => telemetry.track('explore_architecture_hero', 'cta')}
              className="w-full sm:w-auto bg-[#c1552c] hover:bg-[#d9531e] text-[#fbfbfb] px-8 py-3.5 text-xs font-bold tracking-wider hover:shadow-[0_0_25px_rgba(255,127,65,0.6)] hover:-translate-y-0.5 transition-all duration-300 uppercase rounded-sm flex items-center justify-center gap-2 group"
            >
              <span>{t("HERO_CTA_PRIMARY", lang)}</span>
              {lang === 'fa' ? (
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              ) : (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              )}
            </a>
            
            <a
              href="#contact"
              onClick={() => telemetry.track('contact_hero_click', 'cta')}
              className="w-full sm:w-auto border border-[#c1552c]/50 hover:border-[#ff7f41] text-[#ff7f41] hover:text-[#fbfbfb] hover:bg-[#c1552c]/15 px-8 py-3.5 text-xs font-mono font-semibold tracking-wider transition-all duration-300 uppercase rounded-sm text-center"
            >
              {t("HERO_CTA_SECONDARY", lang)}
            </a>
          </motion.div>
        </motion.div>

        {/* Right 3D Interactive Telemetry Model */}
        <motion.div 
          className="lg:col-span-5 relative flex flex-col items-center justify-center min-h-[460px]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          onMouseEnter={() => setIs3DHovered(true)}
          onMouseLeave={() => setIs3DHovered(false)}
        >
          {/* Outer Cyber Glow Ambient */}
          <div className="absolute inset-0 bg-[#c1552c]/15 blur-[90px] rounded-full pointer-events-none" />

          {/* Floating Live Telemetry Cards */}
          <div className="absolute -top-4 right-2 sm:right-4 z-20 bg-[#161210]/95 backdrop-blur-md border border-[#c1552c]/40 px-3 py-2 rounded-sm shadow-xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#eab308] animate-ping" />
            <span className="font-mono text-[10px] text-[#eab308] font-bold">YOLO_INFERENCE: 12ms</span>
          </div>

          <div className="absolute top-1/3 -left-4 sm:-left-6 z-20 bg-[#161210]/95 backdrop-blur-md border border-[#ff7f41]/40 px-3 py-2 rounded-sm shadow-xl flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-[#ff7f41]" />
            <span className="font-mono text-[10px] text-[#ff7f41] font-bold">ZERO_COPY_DMA: OK</span>
          </div>

          <div className="absolute -bottom-4 left-4 z-20 bg-[#161210]/95 backdrop-blur-md border border-[#c1552c]/40 px-3 py-2 rounded-sm shadow-xl flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-[#c1552c]" />
            <span className="font-mono text-[10px] text-[#c2b5ad] font-bold">MQTT_HEAP_FREE: 100%</span>
          </div>

          {/* Core Hologram / 3D Canvas */}
          <div className="relative z-10 w-full h-[440px] flex items-center justify-center rounded-xl bg-[#14110f]/60 border border-[#ff7f41]/15 backdrop-blur-sm p-4">
            <HologramViewer 
              activeProductIndex={activeProductIndex} 
              isPaused={is3DHovered} 
            />
            
            {/* Viewport Control Label */}
            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#85746a] bg-[#0b0908]/90 px-2 py-1 rounded border border-white/5">
              {is3DHovered ? "⏸ PAUSED" : "⟳ AUTO-ROTATING"}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
