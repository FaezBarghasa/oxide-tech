import React from 'react';
import { motion } from 'motion/react';
import { t } from '../lib/i18n';
import { 
  ShieldCheck, 
  Cpu, 
  Network, 
  Terminal, 
  Layers, 
  HardDrive,
  Quote
} from 'lucide-react';

interface ManifestoProps {
  lang: 'fa' | 'en';
}

const Manifesto: React.FC<ManifestoProps> = ({ lang }) => {
  const pillars = [
    {
      icon: ShieldCheck,
      tag: "PILLAR_01",
      title: t("MAN_P1_TITLE", lang),
      sub: t("MAN_P1_SUB", lang),
      desc: t("MAN_P1_DESC", lang),
    },
    {
      icon: Cpu,
      tag: "PILLAR_02",
      title: t("MAN_P2_TITLE", lang),
      sub: t("MAN_P2_SUB", lang),
      desc: t("MAN_P2_DESC", lang),
    },
    {
      icon: Network,
      tag: "PILLAR_03",
      title: t("MAN_P3_TITLE", lang),
      sub: t("MAN_P3_SUB", lang),
      desc: t("MAN_P3_DESC", lang),
    },
    {
      icon: Terminal,
      tag: "PILLAR_04",
      title: t("MAN_P4_TITLE", lang),
      sub: t("MAN_P4_SUB", lang),
      desc: t("MAN_P4_DESC", lang),
    },
    {
      icon: Layers,
      tag: "PILLAR_05",
      title: t("MAN_P5_TITLE", lang),
      sub: t("MAN_P5_SUB", lang),
      desc: t("MAN_P5_DESC", lang),
    },
    {
      icon: HardDrive,
      tag: "PILLAR_06",
      title: t("MAN_P6_TITLE", lang),
      sub: t("MAN_P6_SUB", lang),
      desc: t("MAN_P6_DESC", lang),
    },
  ];

  return (
    <section id="manifesto" className="mb-32 relative scroll-mt-24">
      {/* Section Header */}
      <motion.div 
        className="mb-14 text-start"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <span className="text-xs font-mono tracking-widest text-[#ff7f41] uppercase block mb-3 font-bold">
          {t("MAN_SUB", lang)}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#fbfbfb] font-bold tracking-tight">
          {t("MAN_TITLE", lang)}
        </h2>
        <div className="h-[2px] w-20 bg-gradient-to-r from-[#c1552c] to-[#ff7f41] mt-4 rounded-full"></div>
      </motion.div>

      {/* 3x2 Grid of Glass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {pillars.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div 
              key={i} 
              className="bg-[#161210]/80 backdrop-blur-xl border border-[#ff7f41]/15 p-8 group hover:border-[#c1552c]/60 transition-all duration-400 rounded-sm relative overflow-hidden text-start shadow-lg hover:shadow-[0_10px_30px_rgba(193,85,44,0.2)] hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#c1552c] via-[#ff7f41] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              
              {/* Ambient Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c1552c]/5 blur-[60px] rounded-full group-hover:bg-[#ff7f41]/15 transition-colors duration-400 pointer-events-none"></div>

              {/* Tag & Icon */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-mono tracking-wider text-[#85746a] group-hover:text-[#ff7f41] transition-colors uppercase">
                  // {p.tag}
                </span>
                <div className="p-2.5 rounded-sm bg-[#c1552c]/10 border border-[#c1552c]/30 text-[#ff7f41] group-hover:bg-[#c1552c]/20 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-lg sm:text-xl text-[#fbfbfb] mb-1 font-bold tracking-tight group-hover:text-[#ff7f41] transition-colors">
                {p.title}
              </h3>
              <div className="text-xs font-mono text-[#eab308] mb-3">
                {p.sub}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#c2b5ad] leading-relaxed font-light">
                {p.desc}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* CTO Quote Callout */}
      <motion.div
        className="p-6 rounded-sm bg-[#161210]/90 border border-[#c1552c]/30 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto text-center sm:text-start shadow-xl"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-[#c1552c]/15 text-[#ff7f41] flex-shrink-0">
            <Quote className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-semibold text-[#fbfbfb] italic">
              {t("MAN_QUOTE_CTO", lang)}
            </div>
            <div className="text-xs font-mono text-[#ff7f41] mt-1 font-medium">
              — {t("MAN_QUOTE_CTO_AUTHOR", lang)}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Manifesto;
