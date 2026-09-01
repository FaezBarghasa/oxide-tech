import React from 'react';
import { Cpu, Terminal, Monitor, Cloud } from 'lucide-react';
import { motion } from 'motion/react';
import { t } from '../lib/i18n';

interface TechStackProps {
  lang: 'fa' | 'en';
}

const TechStack: React.FC<TechStackProps> = ({ lang }) => {
  const stats = [
    { name: t("Hash_Rate", lang), val: '450.2 TH/s' },
    { name: t("Temp_Core", lang), val: '42.5°C' },
    { name: t("Bus_State", lang), val: t("Nominal", lang) },
    { name: t("Memory_Usage", lang), val: '12%' },
    { name: t("Uptime", lang), val: '245:12:04' },
    { name: t("Sys_Auth", lang), val: t("Verified", lang), highlight: true }
  ];

  return (
    <section className="mb-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Silicon to Cloud Pitch Module */}
        <motion.div 
          className="lg:col-span-4 bg-[#161210]/80 backdrop-blur-md border border-[#fbfbfb]/5 p-10 flex flex-col justify-between rounded-sm relative overflow-hidden text-start"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Top color line indicator */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#ff7f41] to-[#d9531e]" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff7f41]/10 blur-[60px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10">
            <span className={`text-[10px] sm:text-xs ${lang === 'fa' ? 'font-sans' : 'font-mono tracking-[0.2em]'} text-[#ff7f41] uppercase block mb-3`}>{t("TECH_SUB", lang)}</span>
            <h2 className="text-4xl sm:text-5xl text-[#fbfbfb] font-display font-medium tracking-tight mb-6 leading-tight">{t("TECH_TITLE", lang)}</h2>
            <p className="font-sans text-sm text-[#c2b5ad] leading-relaxed mb-8 font-light">
              {t("TECH_DESC", lang)}
            </p>
          </div>
          
          <div className="flex flex-col gap-4 relative z-10">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className={`uppercase ${lang === 'fa' ? '' : 'tracking-widest'} text-[#85746a]`}>{t("TECH_LATENCY", lang)}</span>
              <span className="text-[#d9531e] font-medium dir-ltr">&lt; 100μs</span>
            </div>
            <div className="w-full bg-[#1b1714] h-[2px] rounded-full overflow-hidden">
              <motion.div 
                className="bg-gradient-to-r from-[#ff7f41] to-[#d9531e] h-full shadow-[0_0_10px_#d9531e]"
                initial={{ width: '0%' }}
                whileInView={{ width: '98%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Integration Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Cpu, title: 'STM32', subtitle: t("TECH_ITEM_1_SUB", lang), desc: t("TECH_ITEM_1_DESC", lang) },
            { icon: Terminal, title: 'Rust', subtitle: t("TECH_ITEM_2_SUB", lang), desc: t("TECH_ITEM_2_DESC", lang) },
            { icon: Monitor, title: 'Slint', subtitle: t("TECH_ITEM_3_SUB", lang), desc: t("TECH_ITEM_3_DESC", lang) },
            { icon: Cloud, title: 'Actix', subtitle: t("TECH_ITEM_4_SUB", lang), desc: t("TECH_ITEM_4_DESC", lang) },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              className="border border-[#fbfbfb]/5 p-8 flex flex-col justify-center items-center text-center bg-[#161210]/60 backdrop-blur-sm hover:bg-[#ff7f41]/5 hover:border-[#ff7f41]/30 transition-all duration-500 rounded-sm group cursor-pointer relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#ff7f41]/0 to-[#ff7f41]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <item.icon className="text-[#ff7f41] group-hover:text-[#d9531e] w-12 h-12 mb-5 transition-colors duration-500" strokeWidth={1} />
              <div className="text-xl text-[#fbfbfb] mb-2 font-display font-medium tracking-tight relative z-10">{item.title}</div>
              <div className={`text-[10px] ${lang === 'fa' ? 'font-sans' : 'font-mono tracking-[0.2em]'} text-[#85746a] mb-3 relative z-10`}>{item.subtitle}</div>
              <div className="text-xs text-[#c2b5ad] opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-light relative z-10">{item.desc}</div>
            </motion.div>
          ))}

          {/* Scrolling Real-time Telemetry Bar */}
          <motion.div 
            className="col-span-1 sm:col-span-2 lg:col-span-4 bg-[#161210]/80 backdrop-blur-md border border-[#fbfbfb]/5 h-20 flex items-center px-4 sm:px-8 relative overflow-hidden select-none rounded-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {/* Soft grid signal indicator */}
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 ${lang === 'fa' ? 'font-sans' : 'font-mono tracking-[0.2em]'} text-[#d9531e] border border-[#d9531e]/30 px-3 py-1 bg-[#d9531e]/5 z-10 backdrop-blur-md shadow-[0_0_15px_rgba(217,83,30,0.1)]`}>
              <span className="w-1.5 h-1.5 bg-[#d9531e] rounded-full animate-ping" />
              <span className="hidden sm:inline">{t("TECH_LIVE", lang)}</span>
              <span className="sm:hidden">{t("TECH_LIVE_SHORT", lang)}</span>
            </div>

            {/* Loop Slider */}
            <div className="w-full overflow-hidden pl-32 sm:pl-48 relative">
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#161210] to-transparent z-10 pointer-events-none" />
              <div className="absolute left-32 sm:left-48 top-0 bottom-0 w-12 bg-gradient-to-r from-[#161210] to-transparent z-10 pointer-events-none" />
              
              <motion.div 
                className="flex gap-16 whitespace-nowrap min-w-max"
                animate={{ x: [0, -350] }}
                transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
              >
                {/* Render double array for perfect infinite carousel looping slider */}
                {[...stats, ...stats].map((stat, idx) => (
                  <div key={idx} className={`flex gap-3 items-center ${lang === 'fa' ? 'font-sans' : 'font-mono tracking-widest'} text-xs font-medium uppercase items-center`}>
                    <span className="text-[#85746a]">{stat.name}:</span>
                    <span className={stat.highlight ? 'text-[#d9531e]' : 'text-[#fbfbfb]'}>
                      {stat.val}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
