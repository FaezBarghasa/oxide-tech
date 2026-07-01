import React from 'react';
import { Link, Mail, User } from 'lucide-react';
import { motion } from 'motion/react';
import { t } from '../lib/i18n';

interface LeadershipProps {
  lang: 'fa' | 'en';
}

const Leadership: React.FC<LeadershipProps> = ({ lang }) => {
  const leaders = [
    { 
      name: 'Monib Mokhtari', 
      title: t("CEO_TITLE", lang), 
      desc: t("CEO_DESC", lang), 
    },
    { 
      name: 'Faez Barghasa', 
      title: t("CTO_TITLE", lang), 
      desc: t("CTO_DESC", lang), 
    },
  ];

  return (
    <section id="team" className="mb-32">
      <motion.div 
        className="mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className={`${lang === 'fa' ? 'font-sans' : 'font-mono tracking-[0.2em]'} text-[10px] sm:text-xs text-[#ff7f41] uppercase block mb-3`}>{t("LEAD_SUB", lang)}</span>
        <h2 className="text-4xl md:text-5xl text-[#fbfbfb] font-display font-medium tracking-tight">{t("LEAD_TITLE", lang)}</h2>
        <div className="h-[2px] w-24 bg-gradient-to-r from-[#ff7f41] to-[#d9531e] mt-5"></div>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {leaders.map((l, i) => (
          <motion.div 
            key={i} 
            className="flex flex-col md:flex-row gap-8 bg-[#161210]/80 backdrop-blur-md border border-[#fbfbfb]/5 p-8 hover:border-[#ff7f41]/30 hover:shadow-[0_0_30px_rgba(255,127,65,0.05)] transition-all duration-500 rounded-sm relative overflow-hidden group text-start"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Structural top line highlight */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#ff7f41] to-[#d9531e]" />
            <div className="absolute top-1/2 right-0 w-32 h-32 bg-[#ff7f41]/5 blur-[50px] rounded-full group-hover:bg-[#d9531e]/10 transition-colors duration-500 pointer-events-none"></div>

            <div className="w-full md:w-48 h-64 md:h-auto flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-700 overflow-hidden border border-[#fbfbfb]/5 rounded-sm bg-[#0b0908] flex items-center justify-center">
              <User className="w-16 h-16 text-gray-500" />
            </div>
            <div className="flex flex-col justify-between py-2 relative z-10 w-full">
              <div>
                <div className={`text-[#d9531e] ${lang === 'fa' ? 'font-sans' : 'font-mono tracking-[0.2em]'} text-[10px] mb-3 uppercase font-medium`}>{l.title}</div>
                <h3 className="text-3xl text-[#fbfbfb] mb-4 font-display font-medium tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">{l.name}</h3>
                <p className="font-sans text-sm text-[#c2b5ad] leading-relaxed mb-6 font-light">{l.desc}</p>
              </div>
              <div className="flex gap-4 pt-4 border-t border-[#fbfbfb]/5">
                <a href="#" className="p-2 border border-[#fbfbfb]/5 rounded-sm hover:border-[#ff7f41]/40 text-[#85746a] hover:text-[#ff7f41] hover:bg-[#ff7f41]/5 transition-all duration-300">
                  <Link className="cursor-pointer w-4 h-4" />
                </a>
                <a href="#" className="p-2 border border-[#fbfbfb]/5 rounded-sm hover:border-[#d9531e]/40 text-[#85746a] hover:text-[#d9531e] hover:bg-[#d9531e]/5 transition-all duration-300">
                  <Mail className="cursor-pointer w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Leadership;