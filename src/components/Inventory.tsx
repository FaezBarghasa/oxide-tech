import React, { useState } from 'react';
import { ArrowRight, Cpu, Zap, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { t } from '../lib/i18n';

interface InventoryProps {
  lang: 'fa' | 'en';
  activeProductIndex: number;
  setActiveProductIndex: (idx: number) => void;
}

const Inventory: React.FC<InventoryProps> = ({ lang, activeProductIndex, setActiveProductIndex }) => {
  const items = [
    { 
      name: t("INV_PROD_1_NAME", lang), 
      desc: t("INV_PROD_1_DESC", lang), 
      tag: 'READY', 
      img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80', 
      category: 'HARDWARE // MODULE_01', 
      specs: 'ST-M4 / RUST',
      pins: [
        { id: 'p1', x: '25%', y: '35%', label: 'CAN_TX_0', type: 'comm' },
        { id: 'p2', x: '25%', y: '45%', label: 'CAN_RX_0', type: 'comm' },
        { id: 'p3', x: '65%', y: '25%', label: '+5V_SYS', type: 'power' },
        { id: 'p4', x: '75%', y: '65%', label: 'PWM_FAN_1', type: 'io' },
        { id: 'p5', x: '75%', y: '75%', label: 'PWM_FAN_2', type: 'io' },
      ]
    },
    { 
      name: t("INV_PROD_2_NAME", lang), 
      desc: t("INV_PROD_2_DESC", lang), 
      tag: 'READY', 
      img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80', 
      category: 'KINETICS // MODULE_02', 
      specs: 'CAN-BUS / SLINT',
      pins: [
        { id: 'p1', x: '40%', y: '30%', label: 'PHA_HIGH', type: 'power' },
        { id: 'p2', x: '40%', y: '40%', label: 'PHB_HIGH', type: 'power' },
        { id: 'p3', x: '40%', y: '50%', label: 'PHC_HIGH', type: 'power' },
        { id: 'p4', x: '80%', y: '60%', label: 'HALL_A', type: 'io' },
        { id: 'p5', x: '80%', y: '70%', label: 'HALL_B', type: 'io' },
      ]
    },
    { 
      name: t("INV_PROD_3_NAME", lang), 
      desc: t("INV_PROD_3_DESC", lang), 
      tag: 'PRODUCTION', 
      img: 'https://images.unsplash.com/photo-1631553127988-372074e44dc3?auto=format&fit=crop&w=800&q=80', 
      category: 'CONTROL // MODULE_03', 
      specs: 'ETHERNET / NO-STD',
      pins: [
        { id: 'p1', x: '25%', y: '80%', label: 'ETH_TX_P', type: 'comm' },
        { id: 'p2', x: '25%', y: '65%', label: 'ETH_TX_N', type: 'comm' },
        { id: 'p3', x: '60%', y: '30%', label: 'PT100_IN', type: 'io' },
        { id: 'p4', x: '80%', y: '40%', label: 'HEATER_PWM', type: 'power' },
      ]
    },
  ];

  const handleSelect = (idx: number) => {
    setActiveProductIndex(idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPinColor = (type: string) => {
    switch (type) {
      case 'power': return '#d9531e';
      case 'comm': return '#ff7f41';
      case 'io': return '#eab308';
      default: return '#fbfbfb';
    }
  };

  return (
    <section id="products" className="mb-32">
      <motion.div 
        className="mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className={`text-[10px] sm:text-xs ${lang === 'fa' ? 'font-sans' : 'font-mono tracking-[0.2em]'} text-[#ff7f41] uppercase block mb-3`}>{t("INV_SUB", lang)}</span>
        <h2 className="text-4xl md:text-5xl text-[#fbfbfb] font-display font-medium tracking-tight">{t("INV_TITLE", lang)}</h2>
        <div className="h-[2px] w-24 bg-gradient-to-r from-[#ff7f41] to-[#d9531e] mt-5"></div>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, i) => {
          const isProjected = activeProductIndex === i;
          return (
            <motion.div 
              key={i} 
              className={`bg-[#161210]/80 backdrop-blur-md border transition-all duration-500 rounded-sm flex flex-col group relative overflow-hidden ${
                isProjected ? 'border-[#ff7f41]/45 shadow-[0_0_30px_rgba(255,127,65,0.15)]' : 'border-[#fbfbfb]/5 hover:border-[#ff7f41]/30 hover:shadow-[0_0_30px_rgba(255,127,65,0.05)]'
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Premium top hover border indicator */}
              <div className={`absolute top-0 left-0 w-full h-[2px] transition-all duration-500 z-20 ${isProjected ? 'bg-[#ff7f41]' : 'bg-gradient-to-r from-[#ff7f41] to-[#d9531e] opacity-0 group-hover:opacity-100'}`} />

              <div className="h-[280px] relative bg-[#0b0908] border-b border-[#fbfbfb]/5 overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 ease-out mix-blend-screen" 
                />
                
                {/* Hardware Pinout Overlay */}
                <div className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {item.pins.map(pin => {
                    const pinColor = getPinColor(pin.type);
                    
                    return (
                      <div 
                        key={pin.id}
                        className="absolute pointer-events-auto cursor-crosshair group/pin"
                        style={{ left: pin.x, top: pin.y, transform: 'translate(-50%, -50%)' }}
                      >
                        {/* Pin Visual */}
                        <div className="relative flex items-center justify-center w-8 h-8">
                           <div className="absolute w-3 h-3 border-[1.5px] rounded-full transition-all duration-300 group-hover/pin:scale-150 group-hover/pin:border-[2px]" style={{ borderColor: pinColor, backgroundColor: '#0b0908' }}></div>
                           <div className="absolute w-1 h-1 rounded-full group-hover/pin:shadow-[0_0_8px_currentColor] transition-all duration-300" style={{ backgroundColor: pinColor, color: pinColor }}></div>
                        </div>

                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-max opacity-0 scale-95 group-hover/pin:opacity-100 group-hover/pin:scale-100 transition-all duration-300 pointer-events-none origin-bottom translate-y-2 group-hover/pin:translate-y-0 z-50">
                          <div className="bg-[#161210]/95 backdrop-blur-md border border-[#fbfbfb]/10 px-3 py-1.5 rounded-sm shadow-xl flex items-center gap-2">
                             {pin.type === 'power' && <Zap className="w-3 h-3" style={{ color: pinColor }} />}
                             {pin.type === 'comm' && <Activity className="w-3 h-3" style={{ color: pinColor }} />}
                             {pin.type === 'io' && <Cpu className="w-3 h-3" style={{ color: pinColor }} />}
                             <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#fbfbfb] font-medium uppercase mt-px">{pin.label}</span>
                          </div>
                          {/* Tooltip Arrow */}
                          <div className="w-2 h-2 border-r border-b border-[#fbfbfb]/10 bg-[#161210]/95 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className={`absolute top-5 right-5 px-3 py-1 text-[9px] font-mono tracking-[0.2em] font-medium select-none z-20 shadow-lg backdrop-blur-md transition-opacity duration-500 group-hover:opacity-0 ${
                  item.tag === 'PRODUCTION' ? 'bg-[#d9531e] text-[#fbfbfb]' : 'bg-[#ff7f41] text-[#07070a]'
                }`}>
                  {item.tag}
                </div>
                {isProjected && (
                  <div className={`absolute top-5 left-5 bg-[#ff7f41]/10 border border-[#ff7f41]/30 px-3 py-1.5 text-[9px] ${lang === 'fa' ? 'font-sans' : 'font-mono tracking-[0.15em]'} text-[#ff7f41] uppercase flex items-center gap-2 backdrop-blur-md shadow-[0_0_15px_rgba(255,127,65,0.2)] z-20 transition-opacity duration-500 group-hover:opacity-0`}>
                    <span className="w-1.5 h-1.5 bg-[#ff7f41] rounded-full animate-pulse shadow-[0_0_8px_#ff7f41]" />
                    <span>{t("INV_PROJECTED_ACTIVE", lang)}</span>
                  </div>
                )}
                
                {/* Subtle gradient overlay to blend image nicely */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#161210]/80 via-transparent to-transparent z-10 pointer-events-none"></div>
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between relative z-20 text-start">
                <div>
                  <div className={`text-[#ff7f41] ${lang === 'fa' ? 'font-sans' : 'font-mono tracking-[0.2em]'} text-[10px] mb-4 uppercase font-medium`}>{item.category}</div>
                  <h3 className="text-2xl text-[#fbfbfb] group-hover:text-[#ff7f41] transition-colors duration-300 mb-4 font-display font-medium tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text group-hover:from-[#ff7f41] group-hover:to-white group-hover:text-transparent">{item.name}</h3>
                  <p className="font-sans text-sm text-[#c2b5ad] leading-relaxed mb-8 font-light">{item.desc}</p>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-[#fbfbfb]/10">
                  <span className="text-[#85746a] font-mono text-[10px] tracking-[0.2em] uppercase">{item.specs}</span>
                  <button 
                    onClick={() => handleSelect(i)}
                    className={`flex items-center gap-2 ${lang === 'fa' ? 'font-sans' : 'font-mono tracking-widest'} text-xs text-[#ff7f41] hover:text-[#d9531e] font-medium transition-colors uppercase w-fit cursor-pointer`}
                  >
                    <span>{isProjected ? t("INV_ACTIVE", lang) : t("INV_PROJECT_3D", lang)}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Inventory;
