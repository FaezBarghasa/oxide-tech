import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { t } from '../lib/i18n';
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip, XAxis } from 'recharts';
import { Box, Sparkles, Zap, Search } from 'lucide-react';
import { telemetry } from '../lib/analytics';

interface InventoryProps {
  lang: 'fa' | 'en';
  activeProductIndex: number;
  setActiveProductIndex: (idx: number) => void;
  onSelectProductFor3D?: (idx: number) => void;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#161210] border border-[#c1552c]/40 p-1.5 rounded-sm font-mono text-[10px] text-[#fbfbfb]">
        <span>{payload[0].value} W</span>
      </div>
    );
  }
  return null;
};

const Inventory: React.FC<InventoryProps> = ({
  lang,
  activeProductIndex,
  setActiveProductIndex,
  onSelectProductFor3D,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Real-time fluctuating power telemetry for each product
  const [liveData, setLiveData] = useState<{ cycle: number; watt: number }[][]>(() => {
    return Array.from({ length: 9 }, (_, prodIdx) => {
      const baseWatt = [3.2, 12.5, 45.0, 1.8, 85.0, 120.0, 8.4, 2.1, 15.0][prodIdx];
      return Array.from({ length: 12 }, (_, i) => ({
        cycle: i,
        watt: Number((baseWatt + Math.sin(i + prodIdx) * (baseWatt * 0.15)).toFixed(1)),
      }));
    });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prevData => {
        return prevData.map((stream, pIdx) => {
          const baseWatt = [3.2, 12.5, 45.0, 1.8, 85.0, 120.0, 8.4, 2.1, 15.0][pIdx];
          const lastCycle = stream[stream.length - 1].cycle;
          const nextCycle = lastCycle + 1;
          const noise = (Math.random() - 0.5) * (baseWatt * 0.2);
          const nextWatt = Math.max(0.5, Number((baseWatt + noise).toFixed(1)));
          const updated = [...stream.slice(1), { cycle: nextCycle, watt: nextWatt }];
          return updated;
        });
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const products = [
    {
      id: "MODULE_01",
      name: t("MOD_01_NAME", lang),
      desc: t("MOD_01_DESC", lang),
      specs: t("MOD_01_SPECS", lang),
      stack: t("MOD_01_STACK", lang),
      badge: "RTIC v2 / NO_STD",
      color: "#c1552c"
    },
    {
      id: "MODULE_02",
      name: t("MOD_02_NAME", lang),
      desc: t("MOD_02_DESC", lang),
      specs: t("MOD_02_SPECS", lang),
      stack: t("MOD_02_STACK", lang),
      badge: "CAN-BUS 2.0B",
      color: "#ff7f41"
    },
    {
      id: "MODULE_03",
      name: t("MOD_03_NAME", lang),
      desc: t("MOD_03_DESC", lang),
      specs: t("MOD_03_SPECS", lang),
      stack: t("MOD_03_STACK", lang),
      badge: "STATE-SPACE MPC",
      color: "#eab308"
    },
    {
      id: "MODULE_04",
      name: t("MOD_04_NAME", lang),
      desc: t("MOD_04_DESC", lang),
      specs: t("MOD_04_SPECS", lang),
      stack: t("MOD_04_STACK", lang),
      badge: "SLINT EMBEDDED",
      color: "#ff7f41"
    },
    {
      id: "MODULE_05",
      name: t("MOD_05_NAME", lang),
      desc: t("MOD_05_DESC", lang),
      specs: t("MOD_05_SPECS", lang),
      stack: t("MOD_05_STACK", lang),
      badge: "ZERO-CROSSING PID",
      color: "#d9531e"
    },
    {
      id: "MODULE_06",
      name: t("MOD_06_NAME", lang),
      desc: t("MOD_06_DESC", lang),
      specs: t("MOD_06_SPECS", lang),
      stack: t("MOD_06_STACK", lang),
      badge: "SAFETY CLASS 3",
      color: "#c1552c"
    },
    {
      id: "MODULE_07",
      name: t("MOD_07_NAME", lang),
      desc: t("MOD_07_DESC", lang),
      specs: t("MOD_07_SPECS", lang),
      stack: t("MOD_07_STACK", lang),
      badge: "EDGE VISION / 6 TOPS",
      color: "#ff7f41"
    },
    {
      id: "MODULE_08",
      name: t("MOD_08_NAME", lang),
      desc: t("MOD_08_DESC", lang),
      specs: t("MOD_08_SPECS", lang),
      stack: t("MOD_08_STACK", lang),
      badge: "EMBASSY / HEAP-FREE",
      color: "#eab308"
    },
    {
      id: "MODULE_09",
      name: t("MOD_09_NAME", lang),
      desc: t("MOD_09_DESC", lang),
      specs: t("MOD_09_SPECS", lang),
      stack: t("MOD_09_STACK", lang),
      badge: "ON-DEVICE SLM",
      color: "#ff7f41"
    },
  ];

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.stack.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="products" className="mb-32 scroll-mt-24">
      {/* Section Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <motion.div 
          className="text-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-mono tracking-widest text-[#ff7f41] uppercase block mb-3 font-bold">
            {t("INV_SUB", lang)}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#fbfbfb] font-bold tracking-tight">
            {t("INV_TITLE", lang)}
          </h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-[#c1552c] to-[#ff7f41] mt-4 rounded-full"></div>
        </motion.div>

        {/* Search Bar */}
        <div className="w-full md:w-80 relative">
          <Search className="w-4 h-4 text-[#85746a] absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("INV_SEARCH", lang)}
            className="w-full bg-[#161210]/90 border border-[#c1552c]/30 ps-9 pe-4 py-2.5 rounded-sm text-xs font-mono text-[#fbfbfb] placeholder-[#85746a] focus:border-[#ff7f41] focus:outline-none transition-colors"
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
              className={`bg-[#161210]/80 backdrop-blur-xl border p-6 rounded-sm flex flex-col justify-between transition-all duration-300 relative overflow-hidden group text-start ${
                isSelected 
                  ? 'border-[#ff7f41] shadow-[0_0_30px_rgba(193,85,44,0.3)] bg-[#1b1714]' 
                  : 'border-[#ff7f41]/15 hover:border-[#c1552c]/60 hover:-translate-y-1'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
            >
              {/* Top Accent Line */}
              <div className={`absolute top-0 left-0 w-full h-[2px] ${isSelected ? 'bg-[#ff7f41]' : 'bg-transparent group-hover:bg-[#c1552c]'} transition-colors`} />

              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[10px] font-bold text-[#ff7f41] tracking-wider">
                    {prod.id}
                  </span>
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded-xs bg-[#c1552c]/10 text-[#ff7f41] border border-[#c1552c]/30 font-semibold">
                    {prod.badge}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-base sm:text-lg font-bold text-[#fbfbfb] mb-3 group-hover:text-[#ff7f41] transition-colors leading-snug">
                  {prod.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#c2b5ad] leading-relaxed mb-4 font-light">
                  {prod.desc}
                </p>

                {/* Technical Specs Callout */}
                <div className="p-2.5 rounded-xs bg-[#0b0908]/90 border border-[#c1552c]/20 font-mono text-[10px] text-[#fbfbfb] mb-4">
                  <span className="text-[#ff7f41] font-bold block mb-1">SPECIFICATIONS:</span>
                  {prod.specs}
                </div>
              </div>

              <div>
                {/* Real-time Telemetry Power Chart */}
                <div className="mb-4 pt-2 border-t border-white/5">
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#85746a] mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-[#ff7f41]" />
                      <span>POWER PROFILE (W)</span>
                    </span>
                    <span className="text-[#eab308] font-bold">
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
                  <span className="font-mono text-[9px] text-[#85746a] truncate max-w-[170px]">
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
                        ? 'bg-[#c1552c] text-white shadow-[0_0_15px_rgba(193,85,44,0.6)]'
                        : 'border border-[#c1552c]/40 hover:border-[#ff7f41] text-[#ff7f41] hover:bg-[#c1552c]/15'
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
