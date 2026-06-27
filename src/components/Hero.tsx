import React, { useState, useEffect } from 'react';
import HologramViewer from './HologramViewer';
import { motion } from 'motion/react';
import { t } from '../lib/i18n';

interface HeroProps {
  lang: 'fa' | 'en';
  activeProductIndex: number;
  setActiveProductIndex: (idx: number) => void;
}

// Premium animation variants
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
      delayChildren: 0.2
    }
  }
};

const Hero: React.FC<HeroProps> = ({ lang, activeProductIndex, setActiveProductIndex }) => {
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

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const activeWord = words[wordIndex % words.length];
    
    const tick = () => {
      if (!isDeleting) {
        // Typing characters
        setCurrentText(activeWord.substring(0, currentText.length + 1));
        if (currentText.length + 1 === activeWord.length) {
          // Pause at end of word
          timer = setTimeout(() => setIsDeleting(true), 2400); // slightly longer pause
          return;
        }
      } else {
        // Deleting characters
        setCurrentText(activeWord.substring(0, currentText.length - 1));
        if (currentText.length - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => prev + 1);
        }
      }
      
      const speed = isDeleting ? 70 : 120; // cleaner speed feeling
      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, isDeleting ? 70 : 120);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, lang, words]);

  // Reset typewriter when language toggles to prevent out-of-bounds substrings
  useEffect(() => {
    setCurrentText('');
    setIsDeleting(false);
    setWordIndex(0);
  }, [lang]);

  return (
    <section className="min-h-[70vh] flex flex-col justify-center relative mb-32 pt-28 lg:pt-16 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Pitch / Message Portion */}
        <motion.div 
          className="lg:col-span-7 z-10 flex flex-col items-start text-start"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp} className={`backdrop-blur-sm bg-[#ff7f41]/5 border border-[#ff7f41]/20 px-4 py-2 rounded-full text-[#ff7f41] mb-8 flex items-center gap-3 uppercase text-[10px] sm:text-xs ${lang === 'fa' ? 'font-sans' : 'font-mono tracking-[0.2em]'} shadow-[0_0_15px_rgba(255,127,65,0.05)]`}>
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#d9531e] shadow-[0_0_8px_#d9531e] animate-pulse"></span>
            {t("HERO_STATUS", lang)}
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#f8fafc] mb-8 font-display font-medium tracking-tight leading-[1.1]">
            {t("HERO_TITLE", lang)}<br />
            <span className="text-[#ff7f41] blinking-cursor inline-block min-w-[200px] mt-2 bg-gradient-to-r from-[#ff7f41] to-[#d9531e] text-transparent bg-clip-text">
              {currentText}
            </span>
          </h1>
          
          <motion.p variants={fadeInUp} className="font-sans text-base sm:text-lg md:text-xl text-[#94a3b8] mb-10 max-w-2xl leading-relaxed font-light">
            {t("HERO_DESC_NEW", lang)}
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5 mt-2 w-full sm:w-auto">
            <a 
              href="#products"
              className={`bg-[#f8fafc] text-[#07070a] px-8 py-4 font-sans text-xs md:text-sm font-semibold ${lang === 'fa' ? '' : 'tracking-wide'} hover:bg-[#ff7f41] transition-all duration-500 uppercase text-center flex items-center justify-center gap-3`}
            >
              {t("HERO_INIT_SEQ", lang)}
            </a>
            <a 
              href="#philosophy"
              className={`border border-[#f8fafc]/10 text-[#f8fafc] px-8 py-4 font-sans text-xs md:text-sm ${lang === 'fa' ? '' : 'tracking-wide'} hover:bg-[#f8fafc]/5 transition-all duration-500 uppercase flex items-center justify-center gap-3 text-center`}
            >
              {t("HERO_VIEW_DOCS", lang)}
            </a>
          </motion.div>
        </motion.div>

        {/* Dynamic Hologram Component */}
        <motion.div 
          className="lg:col-span-5 flex flex-col gap-6 mt-12 lg:mt-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        >
          <div className="relative">
            {/* Elegant glowing background behind the device */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#ff7f41]/10 blur-[100px] rounded-full pointer-events-none"></div>
            <HologramViewer activeProductIndex={activeProductIndex} />
          </div>
          
          {/* Hologram projection switcher */}
          <div className="flex flex-col sm:flex-row justify-between items-center bg-[#161210]/80 backdrop-blur-md border border-[#fbfbfb]/10 p-3 text-xs font-mono rounded-sm shadow-xl mt-4 max-w-[400px] mx-auto lg:mx-0 w-full gap-3 sm:gap-0">
            <span className={`text-[#85746a] ${lang === 'fa' ? 'font-sans' : 'font-mono tracking-widest'} text-[10px]`}>{t("HERO_HW_SELECT", lang)}</span>
            <div className="flex gap-2 w-full sm:w-auto justify-between sm:justify-start">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveProductIndex(idx)}
                  className={`px-4 py-2 text-[10px] tracking-widest transition-all duration-300 ${
                    activeProductIndex === idx
                      ? 'bg-[#ff7f41]/10 text-[#ff7f41] border border-[#ff7f41]/30'
                      : 'text-[#85746a] hover:text-[#fbfbfb] border border-transparent hover:bg-[#fbfbfb]/5'
                  }`}
                >
                  M_0{idx + 1}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
