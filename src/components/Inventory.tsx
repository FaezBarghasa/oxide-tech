import React, { useState, useEffect } from 'react';
import { Cpu, Zap, Activity, Search, Thermometer, ShieldCheck, Box, ExternalLink, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { t } from '../lib/i18n';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { telemetry } from '../lib/analytics';

interface InventoryProps {
  lang: 'fa' | 'en';
  activeProductIndex: number;
  setActiveProductIndex: (idx: number) => void;
  onSelectProductFor3D?: (idx: number) => void;
}

const initialTelemetryData: Record<number, { cycle: string; watt: number }[]> = {
  0: [{ cycle: '00', watt: 42 }, { cycle: '04', watt: 45 }, { cycle: '08', watt: 43 }, { cycle: '12', watt: 48 }, { cycle: '16', watt: 46 }, { cycle: '20', watt: 44 }, { cycle: '24', watt: 47 }],
  1: [{ cycle: '00', watt: 135 }, { cycle: '04', watt: 152 }, { cycle: '08', watt: 140 }, { cycle: '12', watt: 165 }, { cycle: '16', watt: 158 }, { cycle: '20', watt: 172 }, { cycle: '24', watt: 160 }],
  2: [{ cycle: '00', watt: 88 }, { cycle: '04', watt: 92 }, { cycle: '08', watt: 95 }, { cycle: '12', watt: 89 }, { cycle: '16', watt: 104 }, { cycle: '20', watt: 98 }, { cycle: '24', watt: 102 }],
  3: [{ cycle: '00', watt: 310 }, { cycle: '04', watt: 325 }, { cycle: '08', watt: 318 }, { cycle: '12', watt: 340 }, { cycle: '16', watt: 330 }, { cycle: '20', watt: 345 }, { cycle: '24', watt: 338 }],
  4: [{ cycle: '00', watt: 215 }, { cycle: '04', watt: 230 }, { cycle: '08', watt: 220 }, { cycle: '12', watt: 245 }, { cycle: '16', watt: 235 }, { cycle: '20', watt: 250 }, { cycle: '24', watt: 240 }],
  5: [{ cycle: '00', watt: 780 }, { cycle: '04', watt: 810 }, { cycle: '08', watt: 795 }, { cycle: '12', watt: 830 }, { cycle: '16', watt: 815 }, { cycle: '20', watt: 850 }, { cycle: '24', watt: 840 }],
  6: [{ cycle: '00', watt: 18 }, { cycle: '04', watt: 24 }, { cycle: '08', watt: 22 }, { cycle: '12', watt: 29 }, { cycle: '16', watt: 26 }, { cycle: '20', watt: 31 }, { cycle: '24', watt: 25 }],
  7: [{ cycle: '00', watt: 3.5 }, { cycle: '04', watt: 4.8 }, { cycle: '08', watt: 3.9 }, { cycle: '12', watt: 5.2 }, { cycle: '16', watt: 4.1 }, { cycle: '20', watt: 4.9 }, { cycle: '24', watt: 4.2 }],
  8: [{ cycle: '00', watt: 12 }, { cycle: '04', watt: 22 }, { cycle: '08', watt: 19 }, { cycle: '12', watt: 27 }, { cycle: '16', watt: 24 }, { cycle: '20', watt: 28 }, { cycle: '24', watt: 23 }],
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f172a]/95 backdrop-blur-md border border-[#3b82f6]/40 px-3 py-1.5 rounded-sm shadow-xl font-mono text-[10px] uppercase text-[#f8fafc]">
        <span className="text-[#3b82f6] font-bold">{payload[0].value} W</span>
        <span className="text-[#64748b] ms-2">Cycle {payload[0].payload.cycle}</span>
      </div>
    );
  }
  return null;
};

const Inventory: React.FC<InventoryProps> = ({ 
  lang, 
  activeProductIndex, 
  setActiveProductIndex,
  onSelectProductFor3D 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [liveData, setLiveData] = useState(initialTelemetryData);

  useEffect(() => {
    const dataInterval = setInterval(() => {
      setLiveData(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(key => {
          const numKey = Number(key);
          const points = [...next[numKey]];
          const lastPoint = points[points.length - 1];
          const variance = (Math.random() - 0.5) * (lastPoint.watt * 0.08);
          const newWatt = Math.max(1, Math.round((lastPoint.watt + variance) * 10) / 10);
          
          points.shift();
          const nextCycle = (parseInt(lastPoint.cycle, 10) + 4) % 100;
          points.push({
            cycle: nextCycle < 10 ? `0${nextCycle}` : `${nextCycle}`,
            watt: newWatt
          });
          next[numKey] = points;
        });
        return next;
      });
    }, 2800);

    return () => clearInterval(dataInterval);
  }, []);

  const products = [
    {
      id: t("MOD_01_ID", lang),
      name: t("MOD_01_NAME", lang),
      desc: t("MOD_01_DESC", lang),
      specs: t("MOD_01_SPECS", lang),
      stack: t("MOD_01_STACK", lang),
      badge: "ISO-5 / CLEANROOM",
      color: "#3b82f6"
    },
    {
      id: t("MOD_02_ID", lang),
      name: t("MOD_02_NAME", lang),
      desc: t("MOD_02_DESC", lang),
      specs: t("MOD_02_SPECS", lang),
      stack: t("MOD_02_STACK", lang),
      badge: "SLINT / BLDC",
      color: "#06b6d4"
    },
    {
      id: t("MOD_03_ID", lang),
      name: t("MOD_03_NAME", lang),
      desc: t("MOD_03_DESC", lang),
      specs: t("MOD_03_SPECS", lang),
      stack: t("MOD_03_STACK", lang),
      badge: "STATE-SPACE MPC",
      color: "#3b82f6"
    },
    {
      id: t("MOD_04_ID", lang),
      name: t("MOD_04_NAME", lang),
      desc: t("MOD_04_DESC", lang),
      specs: t("MOD_04_SPECS", lang),
      stack: t("MOD_04_STACK", lang),
      badge: "DUAL PT1000",
      color: "#f59e0b"
    },
    {
      id: t("MOD_05_ID", lang),
      name: t("MOD_05_NAME", lang),
      desc: t("MOD_05_DESC", lang),
      specs: t("MOD_05_SPECS", lang),
      stack: t("MOD_05_STACK", lang),
      badge: "CASCADE CRYO",
      color: "#06b6d4"
    },
    {
      id: t("MOD_06_ID", lang),
      name: t("MOD_06_NAME", lang),
      desc: t("MOD_06_DESC", lang),
      specs: t("MOD_06_SPECS", lang),
      stack: t("MOD_06_STACK", lang),
      badge: "SIL-2 / ISO-13485",
      color: "#ef4444"
    },
    {
      id: t("MOD_07_ID", lang),
      name: t("MOD_07_NAME", lang),
      desc: t("MOD_07_DESC", lang),
      specs: t("MOD_07_SPECS", lang),
      stack: t("MOD_07_STACK", lang),
      badge: "EDGE AI / YOLOv8",
      color: "#3b82f6"
    },
    {
      id: t("MOD_08_ID", lang),
      name: t("MOD_08_NAME", lang),
      desc: t("MOD_08_DESC", lang),
      specs: t("MOD_08_SPECS", lang),
      stack: t("MOD_08_STACK", lang),
      badge: "HEAP-FREE MQTT",
      color: "#10b981"
    },
    {
      id: t("MOD_09_ID", lang),
      name: t("MOD_09_NAME", lang),
      desc: t("MOD_09_DESC", lang),
      specs: t("MOD_09_SPECS", lang),
      stack: t("MOD_09_STACK", lang),
      badge: "ON-DEVICE SLM",
      color: "#8b5cf6"
    },
  ];

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.stack.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="products" className="mb-32">
      {/* Section Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <motion.div 
          className="text-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-mono tracking-widest text-[#3b82f6] uppercase block mb-3">
            {t("INV_SUB", lang)}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#f8fafc] font-bold tracking-tight">
            {t("INV_TITLE", lang)}
          </h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] mt-4 rounded-full"></div>
        </motion.div>

        {/* Search Bar */}
        <div className="w-full md:w-80 relative">
          <Search className="w-4 h-4 text-[#64748b] absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("INV_SEARCH", lang)}
            className="w-full bg-[#0f172a]/80 border border-white/10 ps-9 pe-4 py-2.5 rounded-sm text-xs font-mono text-[#f8fafc] placeholder-[#64748b] focus:border-[#3b82f6] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Product Catalog Grid (3 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod, idx) => {
          const originalIdx = products.findIndex(p => p.id === prod.id);
          const isSelected = activeProductIndex === originalIdx;
          const chartData = liveData[originalIdx] || liveData[0];

          return (
            <motion.div
              key={prod.id}
              className={`bg-[#0f172a]/70 backdrop-blur-xl border p-6 rounded-sm flex flex-col justify-between transition-all duration-300 relative overflow-hidden group text-start ${
                isSelected 
                  ? 'border-[#3b82f6] shadow-[0_0_30px_rgba(59,130,246,0.2)] bg-[#1e293b]/50' 
                  : 'border-white/5 hover:border-[#3b82f6]/40 hover:-translate-y-1'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
            >
              {/* Top Accent Line */}
              <div className={`absolute top-0 left-0 w-full h-[2px] ${isSelected ? 'bg-[#3b82f6]' : 'bg-transparent group-hover:bg-[#3b82f6]/50'} transition-colors`} />

              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[10px] font-bold text-[#60a5fa] tracking-wider">
                    {prod.id}
                  </span>
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded-xs bg-[#3b82f6]/10 text-[#93c5fd] border border-[#3b82f6]/20">
                    {prod.badge}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-base sm:text-lg font-bold text-[#f8fafc] mb-3 group-hover:text-[#93c5fd] transition-colors leading-snug">
                  {prod.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#94a3b8] leading-relaxed mb-4 font-light">
                  {prod.desc}
                </p>

                {/* Technical Specs Callout */}
                <div className="p-2.5 rounded-xs bg-[#0b1120]/70 border border-white/5 font-mono text-[10px] text-[#cbd5e1] mb-4">
                  <span className="text-[#3b82f6] font-bold block mb-1">SPECIFICATIONS:</span>
                  {prod.specs}
                </div>
              </div>

              <div>
                {/* Real-time Telemetry Power Chart */}
                <div className="mb-4 pt-2 border-t border-white/5">
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#64748b] mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-[#3b82f6]" />
                      <span>POWER PROFILE (W)</span>
                    </span>
                    <span className="text-[#34d399] font-bold">
                      {chartData[chartData.length - 1]?.watt} W
                    </span>
                  </div>

                  <div className="h-16 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <XAxis dataKey="cycle" hide />
                        <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="watt"
                          stroke={prod.color}
                          strokeWidth={1.75}
                          dot={false}
                          isAnimationActive={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/5">
                  <span className="font-mono text-[9px] text-[#64748b] truncate max-w-[170px]">
                    {prod.stack}
                  </span>

                  <button
                    onClick={() => {
                      setActiveProductIndex(originalIdx);
                      telemetry.track(`project_3d_${prod.id}`, '3d_interaction');
                      if (onSelectProductFor3D) {
                        onSelectProductFor3D(originalIdx);
                      } else {
                        const heroEl = document.getElementById('hero');
                        heroEl?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className={`font-mono text-[10px] font-bold px-3 py-1.5 rounded-sm transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#3b82f6] text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                        : 'border border-[#3b82f6]/30 hover:border-[#3b82f6] text-[#93c5fd] hover:bg-[#3b82f6]/10'
                    }`}
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>{t("INV_PROJECT_3D", lang)}</span>
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
