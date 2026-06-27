import React from 'react';
import { motion } from 'motion/react';
import { t } from '../lib/i18n';

interface ManifestoProps {
  lang: 'fa' | 'en';
}

const Manifesto: React.FC<ManifestoProps> = ({ lang }) => {
  const principles = [
    { title: t("Zero Deviations", lang), desc: t("Zero Deviations Desc", lang), cat: t("Correctness", lang) },
    { title: t("Bare Metal", lang), desc: t("Bare Metal Desc", lang), cat: t("Mastery", lang) },
    { title: t("Sovereign Code", lang), desc: t("Sovereign Code Desc", lang), cat: t("Independence", lang) },
    { title: t("Iron Memory", lang), desc: t("Iron Memory Desc", lang), cat: t("Safety_principle", lang) },
    { title: t("Generational", lang), desc: t("Generational Desc", lang), cat: t("Legacy", lang) },
  ];

  return (
    <section id="philosophy" className="mb-32">
      <motion.div 
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className={`text-[10px] sm:text-xs ${lang === 'fa' ? 'font-sans' : 'font-mono tracking-[0.2em]'} text-[#ff7f41] uppercase block mb-3`}>{t("MAN_SUB", lang)}</span>
        <h2 className="text-4xl md:text-5xl text-[#fbfbfb] font-display font-medium tracking-tight">{t("MAN_TITLE", lang)}</h2>
        <div className="h-[2px] w-24 bg-gradient-to-r from-[#ff7f41] to-[#d9531e] mt-5"></div>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {principles.map((p, i) => (
          <motion.div 
            key={i} 
            className="bg-[#161210]/80 backdrop-blur-sm border border-[#fbfbfb]/5 p-8 group hover:border-[#ff7f41]/30 transition-all duration-500 rounded-sm relative overflow-hidden text-start"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Elegant top color accent border line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#ff7f41] to-[#d9531e] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#ff7f41]/5 blur-[50px] rounded-full group-hover:bg-[#d9531e]/10 transition-colors duration-500"></div>

            <div className={`text-[10px] ${lang === 'fa' ? 'font-sans' : 'font-mono tracking-[0.15em]'} text-[#85746a] mb-6 group-hover:text-[#ff7f41] transition-colors duration-500 uppercase`}>// {p.cat}</div>
            <div className="text-xl text-[#fbfbfb] mb-4 font-display font-medium tracking-tight relative z-10">{p.title}</div>
            <p className="font-sans text-sm text-[#c2b5ad] leading-relaxed relative z-10 font-light">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Manifesto;
