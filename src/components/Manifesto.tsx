import React from 'react';
import { motion } from 'motion/react';
import { t } from '../lib/i18n';
import { CheckCircle2, Eye, Network, ShieldAlert, MonitorCheck, ServerCog, Quote } from 'lucide-react';

interface ManifestoProps {
  lang: 'fa' | 'en';
}

const Manifesto: React.FC<ManifestoProps> = ({ lang }) => {
  const pillars = [
    {
      title: t("PIL_1_TITLE", lang),
      sub: t("PIL_1_SUB", lang),
      desc: t("PIL_1_DESC", lang),
      icon: CheckCircle2,
      tag: "CORRECTNESS // VERIFICATION"
    },
    {
      title: t("PIL_2_TITLE", lang),
      sub: t("PIL_2_SUB", lang),
      desc: t("PIL_2_DESC", lang),
      icon: Eye,
      tag: "EDGE AI // COMPUTER VISION"
    },
    {
      title: t("PIL_3_TITLE", lang),
      sub: t("PIL_3_SUB", lang),
      desc: t("PIL_3_DESC", lang),
      icon: Network,
      tag: "IIoT // HEAP-FREE MQTT"
    },
    {
      title: t("PIL_4_TITLE", lang),
      sub: t("PIL_4_SUB", lang),
      desc: t("PIL_4_DESC", lang),
      icon: ShieldAlert,
      tag: "SAFETY // RTIC v2 & RUST"
    },
    {
      title: t("PIL_5_TITLE", lang),
      sub: t("PIL_5_SUB", lang),
      desc: t("PIL_5_DESC", lang),
      icon: MonitorCheck,
      tag: "HMI // SLINT MULTI-PLATFORM"
    },
    {
      title: t("PIL_6_TITLE", lang),
      sub: t("PIL_6_SUB", lang),
      desc: t("PIL_6_DESC", lang),
      icon: ServerCog,
      tag: "SOVEREIGNTY // NO-STD TO CLOUD"
    },
  ];

  return (
    <section id="manifesto" className="mb-32 relative">
      {/* Section Header */}
      <motion.div 
        className="mb-14 text-start"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <span className="text-xs font-mono tracking-widest text-[#3b82f6] uppercase block mb-3">
          {t("MAN_SUB", lang)}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#f8fafc] font-bold tracking-tight">
          {t("MAN_TITLE", lang)}
        </h2>
        <div className="h-[2px] w-20 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] mt-4 rounded-full"></div>
      </motion.div>

      {/* 3x2 Grid of Glass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {pillars.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div 
              key={i} 
              className="bg-[#0f172a]/70 backdrop-blur-xl border border-white/5 p-8 group hover:border-[#3b82f6]/40 transition-all duration-400 rounded-sm relative overflow-hidden text-start shadow-lg hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)] hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#3b82f6] via-[#06b6d4] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              
              {/* Ambient Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3b82f6]/5 blur-[60px] rounded-full group-hover:bg-[#3b82f6]/15 transition-colors duration-400 pointer-events-none"></div>

              {/* Tag & Icon */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-mono tracking-wider text-[#64748b] group-hover:text-[#60a5fa] transition-colors uppercase">
                  // {p.tag}
                </span>
                <div className="p-2.5 rounded-sm bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[#3b82f6] group-hover:text-[#60a5fa] group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-lg sm:text-xl text-[#f8fafc] mb-1 font-bold tracking-tight group-hover:text-[#93c5fd] transition-colors">
                {p.title}
              </h3>
              <div className="text-xs font-mono text-[#38bdf8] mb-3">
                {p.sub}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed font-light">
                {p.desc}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* CTO Quote Callout */}
      <motion.div
        className="p-6 rounded-sm bg-[#0f172a]/60 border border-[#3b82f6]/20 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto text-center sm:text-start"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] flex-shrink-0">
            <Quote className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-semibold text-[#f8fafc] italic">
              {t("MAN_QUOTE_CTO", lang)}
            </div>
            <div className="text-xs font-mono text-[#60a5fa] mt-1">
              — {t("MAN_QUOTE_CTO_AUTHOR", lang)}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 font-mono text-[10px] text-[#34d399] bg-[#10b981]/10 border border-[#10b981]/30 px-3 py-1.5 rounded-sm">
          RTIC v2 // EMBASSY // NO_STD
        </div>
      </motion.div>
    </section>
  );
};

export default Manifesto;
