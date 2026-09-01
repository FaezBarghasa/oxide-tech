import React from 'react';
import { Cpu, Eye, Network, Monitor, Zap, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { t } from '../lib/i18n';

interface TechStackProps {
  lang: 'fa' | 'en';
}

const TechStack: React.FC<TechStackProps> = ({ lang }) => {
  const stats = [
    { name: 'CORE_TEMP', val: '41.2°C' },
    { name: 'RTIC_DISPATCH', val: '120ns', highlight: true },
    { name: 'ZERO_COPY_DMA', val: 'ACTIVE' },
    { name: 'MQTT_HEAP_ALLOCS', val: '0 BYTES', highlight: true },
    { name: 'SLINT_FPS', val: '60.0 FPS' },
    { name: 'UPTIME', val: '482:19:02' },
    { name: 'BUS_STATE', val: 'NOMINAL' },
    { name: 'SYS_AUTH', val: 'VERIFIED', highlight: true }
  ];

  const layers = [
    {
      icon: Cpu,
      layerNum: '01',
      title: t("LAYER_1_TITLE", lang),
      desc: t("LAYER_1_DESC", lang),
      chips: ['STM32 (CORTEX-M4/M7)', 'ORANGE PI 5', 'ESP32-S3', 'ALTIUM CAD']
    },
    {
      icon: Eye,
      layerNum: '02',
      title: t("LAYER_2_TITLE", lang),
      desc: t("LAYER_2_DESC", lang),
      chips: ['YOLOv8 VISION', 'REDOX-IPC STUDY', 'ON-DEVICE SLM', 'LLAMA-CPP']
    },
    {
      icon: Network,
      layerNum: '03',
      title: t("LAYER_3_TITLE", lang),
      desc: t("LAYER_3_DESC", lang),
      chips: ['HEAP-FREE MQTT 5.0', 'EMBASSY-NET', 'ZERO-COPY DMA', 'ACTIX / SURREALDB']
    },
    {
      icon: Monitor,
      layerNum: '04',
      title: t("LAYER_4_TITLE", lang),
      desc: t("LAYER_4_DESC", lang),
      chips: ['SLINT DECLARATIVE GUI', 'NO-STD RENDERING', 'EMBEDDED TOUCH', '60 FPS HMI']
    }
  ];

  const techBadges = [
    'RUST', 'RTIC v2', 'EMBASSY', 'SLINT', 'STM32', 'ESP32-S3', 'RPI-5', 'ALTIUM DESIGNER', 'SURREALDB', 'ACTIX-WEB'
  ];

  return (
    <section id="tech" className="mb-32">
      {/* Section Header */}
      <motion.div 
        className="mb-14 text-start"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <span className="text-xs font-mono tracking-widest text-[#3b82f6] uppercase block mb-3">
          {t("TECH_SUB", lang)}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#f8fafc] font-bold tracking-tight">
          {t("TECH_TITLE", lang)}
        </h2>
        <div className="h-[2px] w-20 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] mt-4 rounded-full"></div>
      </motion.div>

      {/* Vertical Integration 4-Layer Architecture Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {layers.map((layer, idx) => {
          const Icon = layer.icon;
          return (
            <motion.div
              key={idx}
              className="bg-[#0f172a]/70 backdrop-blur-xl border border-white/5 p-7 rounded-sm flex flex-col justify-between hover:border-[#3b82f6]/40 transition-all duration-400 relative overflow-hidden group shadow-lg text-start"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
            >
              {/* Layer Top Number Badge */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-2xl font-black text-[#3b82f6]/40 group-hover:text-[#3b82f6] transition-colors">
                  LAYER {layer.layerNum}
                </span>
                <div className="p-2 rounded-sm bg-[#3b82f6]/10 text-[#3b82f6] group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#f8fafc] mb-3 leading-snug">
                  {layer.title}
                </h3>
                <p className="text-xs text-[#94a3b8] leading-relaxed mb-6 font-light">
                  {layer.desc}
                </p>
              </div>

              {/* Chips / Badges */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {layer.chips.map((chip, cIdx) => (
                  <span 
                    key={cIdx}
                    className="text-[9px] font-mono text-[#93c5fd] bg-[#3b82f6]/10 border border-[#3b82f6]/20 px-2 py-0.5 rounded-xs"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tech Stack Visual Grid Badges */}
      <motion.div
        className="p-5 rounded-sm bg-[#0f172a]/50 border border-white/5 backdrop-blur-md mb-8 flex flex-wrap gap-2.5 items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <span className="text-xs font-mono text-[#64748b] me-2 uppercase">STACK PREREQUISITES:</span>
        {techBadges.map((badge, bIdx) => (
          <span
            key={bIdx}
            className="text-xs font-mono font-bold text-[#f8fafc] bg-[#1e293b] hover:bg-[#3b82f6] hover:text-white border border-white/10 px-3 py-1 rounded-sm transition-all duration-200 cursor-default"
          >
            [ {badge} ]
          </span>
        ))}
      </motion.div>

      {/* Infinite Scrolling Real-time Telemetry Bar */}
      <motion.div 
        className="bg-[#0f172a]/80 backdrop-blur-md border border-[#3b82f6]/20 h-16 flex items-center px-4 sm:px-8 relative overflow-hidden select-none rounded-sm shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Live Signal Indicator Badge */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 font-mono text-xs text-[#10b981] border border-[#10b981]/30 px-3 py-1 bg-[#10b981]/10 z-20 backdrop-blur-md">
          <span className="w-2 h-2 bg-[#10b981] rounded-full animate-ping" />
          <span className="hidden sm:inline font-bold">LIVE TELEMETRY BUS</span>
          <span className="sm:hidden font-bold">LIVE</span>
        </div>

        {/* Carousel Loop */}
        <div className="w-full overflow-hidden pl-36 sm:pl-56 relative">
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0f172a] to-transparent z-10 pointer-events-none" />
          
          <motion.div 
            className="flex gap-12 whitespace-nowrap min-w-max"
            animate={{ x: [0, -400] }}
            transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
          >
            {[...stats, ...stats].map((stat, idx) => (
              <div key={idx} className="flex gap-2 items-center font-mono text-xs uppercase">
                <span className="text-[#64748b]">{stat.name}:</span>
                <span className={stat.highlight ? 'text-[#34d399] font-bold' : 'text-[#f8fafc]'}>
                  {stat.val}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default TechStack;
