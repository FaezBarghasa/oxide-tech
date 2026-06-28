import React, { useState, useEffect } from 'react';
import { ArrowRight, Cpu, Zap, Activity, Search, AlertTriangle, Thermometer } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { t } from '../lib/i18n';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface InventoryProps {
  lang: 'fa' | 'en';
  activeProductIndex: number;
  setActiveProductIndex: (idx: number) => void;
}

// Initial mock data for power telemetry
const initialTelemetryData: Record<number, { cycle: string; watt: number }[]> = {
  0: [
    { cycle: '00', watt: 42 },
    { cycle: '04', watt: 45 },
    { cycle: '08', watt: 43 },
    { cycle: '12', watt: 48 },
    { cycle: '16', watt: 46 },
    { cycle: '20', watt: 44 },
    { cycle: '24', watt: 47 },
  ],
  1: [
    { cycle: '00', watt: 135 },
    { cycle: '04', watt: 152 },
    { cycle: '08', watt: 140 },
    { cycle: '12', watt: 165 },
    { cycle: '16', watt: 158 },
    { cycle: '20', watt: 172 },
    { cycle: '24', watt: 160 },
  ],
  2: [
    { cycle: '00', watt: 88 },
    { cycle: '04', watt: 92 },
    { cycle: '08', watt: 95 },
    { cycle: '12', watt: 89 },
    { cycle: '16', watt: 104 },
    { cycle: '20', watt: 98 },
    { cycle: '24', watt: 102 },
  ],
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#161210]/95 backdrop-blur-md border border-[#ff7f41]/30 px-3 py-1.5 rounded-sm shadow-xl font-mono text-[9px] uppercase tracking-wider text-[#fbfbfb]">
        <span className="text-[#ff7f41] font-semibold">{payload[0].value} W</span>
        <span className="text-[#85746a] ml-2">Cycle {payload[0].payload.cycle}</span>
      </div>
    );
  }
  return null;
};

const Inventory: React.FC<InventoryProps> = ({ lang, activeProductIndex, setActiveProductIndex }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [liveData, setLiveData] = useState(initialTelemetryData);
  const [liveTemp, setLiveTemp] = useState(74.2);
  const [liveVolt, setLiveVolt] = useState(4.65);

  // Real-time telemetry simulation
  useEffect(() => {
    const dataInterval = setInterval(() => {
      setLiveData(prev => {
        const next = { ...prev };
        (Object.keys(next) as unknown as Array<keyof typeof initialTelemetryData>).forEach(key => {
          const numKey = Number(key);
          const arr = [...next[numKey]];
          const lastVal = arr[arr.length - 1].watt;
          const change = (Math.random() - 0.5) * 8; // change up or down by 4
          
          let newVal = Math.round(lastVal + change);
          if (numKey === 0) newVal = Math.max(35, Math.min(60, newVal));
          if (numKey === 1) newVal = Math.max(120, Math.min(190, newVal));
          if (numKey === 2) newVal = Math.max(75, Math.min(125, newVal));
          
          arr.shift();
          const nextCycle = (parseInt(arr[arr.length - 1].cycle) + 4) % 100;
          const padCycle = nextCycle.toString().padStart(2, '0');
          arr.push({ cycle: padCycle, watt: newVal });
          next[numKey] = arr;
        });
        return next;
      });
    }, 2500);

    const warnInterval = setInterval(() => {
      setLiveTemp(Number((74.0 + Math.random() * 0.6).toFixed(1)));
      setLiveVolt(Number((4.62 + Math.random() * 0.08).toFixed(2)));
    }, 1000);

    return () => {
      clearInterval(dataInterval);
      clearInterval(warnInterval);
    };
  }, []);

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

  const filteredItems = items.map((item, i) => ({ ...item, originalIndex: i })).filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.specs.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <section id="products" className="mb-32 relative">
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className={`text-[10px] sm:text-xs ${lang === 'fa' ? 'font-sans' : 'font-mono tracking-[0.2em]'} text-[#ff7f41] uppercase block mb-3`}>{t("INV_SUB", lang)}</span>
        <h2 className="text-4xl md:text-5xl text-[#fbfbfb] font-display font-medium tracking-tight">{t("INV_TITLE", lang)}</h2>
        <div className="h-[2px] w-24 bg-gradient-to-r from-[#ff7f41] to-[#d9531e] mt-5"></div>
      </motion.div>

      {/* Critical Status Dashboard Section */}
      <motion.div
        className="mb-12 border border-red-500/25 bg-red-950/5 backdrop-blur-md p-6 rounded-sm text-start relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[repeating-linear-gradient(45deg,#000,#000_10px,#fff_10px,#fff_20px)]"></div>
        
        <div className="flex items-center justify-between mb-6 border-b border-[#fbfbfb]/5 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
            <h3 className="text-sm font-mono tracking-widest text-red-400 font-bold uppercase">{t("CRITICAL_STATUS", lang)}</h3>
          </div>
          <span className="text-[10px] font-mono text-red-500/70 tracking-widest uppercase">STATUS // ACTIVE_INCIDENT_REPORT</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Thermal Warning */}
          <motion.div
            onClick={() => handleSelect(2)}
            className="border border-red-500/30 hover:border-red-500 bg-[#161210]/95 p-5 rounded-sm flex items-start gap-4 cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)] group"
            whileHover={{ scale: 1.01 }}
          >
            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-sm text-red-500 group-hover:scale-110 transition-transform duration-300 animate-pulse">
              <Thermometer className="w-6 h-6" />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-mono tracking-wider font-bold text-red-400 uppercase">{t("THERMAL_WARN", lang)}</span>
                <span className="text-[9px] font-mono text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full uppercase">CRITICAL</span>
              </div>
              <p className="text-xs text-[#c2b5ad] font-sans leading-relaxed">{t("THERMAL_WARN_DESC", lang)}</p>
              <div className="mt-3 flex items-center justify-between text-[8px] font-mono text-[#85746a] tracking-wider">
                <span>ADDR // 0x03 (PID_CTRL)</span>
                <span className="text-red-400 animate-pulse">{liveTemp}°C</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Voltage Fluctuation */}
          <motion.div
            onClick={() => handleSelect(0)}
            className="border border-amber-500/30 hover:border-amber-500 bg-[#161210]/95 p-5 rounded-sm flex items-start gap-4 cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] group"
            whileHover={{ scale: 1.01 }}
          >
            <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-sm text-amber-500 group-hover:scale-110 transition-transform duration-300 animate-pulse">
              <Zap className="w-6 h-6" />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-mono tracking-wider font-bold text-amber-400 uppercase">{t("VOLTAGE_FLUC", lang)}</span>
                <span className="text-[9px] font-mono text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full uppercase">WARNING</span>
              </div>
              <p className="text-xs text-[#c2b5ad] font-sans leading-relaxed">{t("VOLTAGE_FLUC_DESC", lang)}</p>
              <div className="mt-3 flex items-center justify-between text-[8px] font-mono text-[#85746a] tracking-wider">
                <span>ADDR // 0x01 (LAM_HOOD)</span>
                <span className="text-amber-400 animate-pulse">{liveVolt} V</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Search Bar */}
      <div className="sticky top-20 z-40 bg-[#0b0908]/90 backdrop-blur-md py-4 border-b border-[#fbfbfb]/5 mb-12 -mx-6 px-6 md:-mx-20 md:px-20 transition-all duration-300">
        <div className="max-w-md mx-auto relative group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("SEARCH_PLACEHOLDER", lang)}
            className={`w-full bg-[#161210]/95 border border-[#fbfbfb]/10 focus:border-[#ff7f41] text-[#fbfbfb] placeholder-[#85746a] py-3.5 ${lang === 'fa' ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-xs font-mono rounded-sm outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(255,127,65,0.1)]`}
          />
          <Search className={`absolute ${lang === 'fa' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-4 h-4 text-[#85746a] group-focus-within:text-[#ff7f41] transition-colors`} />
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <motion.div 
          className="text-center py-20 border border-dashed border-[#fbfbfb]/10 rounded-sm bg-[#161210]/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <AlertTriangle className="w-10 h-10 text-[#85746a] mx-auto mb-4 animate-pulse" />
          <p className="font-mono text-xs text-[#85746a] uppercase tracking-widest">
            {lang === 'fa' ? '[خطای سیستم]: هیچ مدل سخت‌افزاری یافت نشد' : '[SYSTEM ALERT]: NO COMPATIBLE HARDWARE REGISTERS MATCHED QUERY'}
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const i = item.originalIndex;
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
                    <p className="font-sans text-sm text-[#c2b5ad] leading-relaxed mb-6 font-light">{item.desc}</p>
                    
                    {/* Live Power Consumption Chart Module */}
                    <div className="mt-6 mb-6 bg-[#0b0908]/90 border border-[#fbfbfb]/5 p-4 rounded-sm">
                      <div className="flex justify-between items-center mb-3">
                        <span className={`text-[10px] ${lang === 'fa' ? 'font-sans' : 'font-mono'} text-[#85746a] uppercase tracking-wider`}>
                          {t("POWER_USAGE", lang)}
                        </span>
                        <span className="text-xs font-mono text-[#ff7f41] font-semibold animate-pulse">
                          {liveData[i]?.[liveData[i].length - 1]?.watt} W
                        </span>
                      </div>
                      <div className="h-[100px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={liveData[i]}>
                            <XAxis dataKey="cycle" hide />
                            <YAxis domain={i === 0 ? [30, 60] : i === 1 ? [110, 200] : [70, 130]} hide />
                            <Tooltip
                              content={<CustomTooltip />}
                              cursor={{ stroke: 'rgba(255, 127, 65, 0.1)', strokeWidth: 1 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="watt"
                              stroke="#ff7f41"
                              strokeWidth={1.5}
                              dot={false}
                              activeDot={{ r: 4, stroke: '#d9531e', strokeWidth: 1, fill: '#ff7f41' }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
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
      )}
    </section>
  );
};

export default Inventory;
