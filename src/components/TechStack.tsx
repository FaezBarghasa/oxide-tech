import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { t } from '../lib/i18n';
import { Cpu, Eye, Radio, MonitorCheck } from 'lucide-react';

interface TechStackProps {
  lang: 'fa' | 'en';
}

// Live ticker data — two values cycle per slot for ambient feel
const TICKER_LIVE = {
  mcu_clock:  ['168.00 MHz', '216.00 MHz'],
  heap_allocs:['0 BYTES (STATIC_MEM)', '0 BYTES (ZERO_ALLOC)'],
  irq_latency:['12 CYCLES', '11 CYCLES'],
  mqtt_ping:  ['18ms', '22ms', '14ms', '19ms'],
  npu_tops:   ['6.0 TOPS ACTIVE', '5.8 TOPS ACTIVE'],
  can_load:   ['14.2%', '12.8%', '15.1%'],
  redox:      ['ONLINE', 'ONLINE', 'IPC_ACTIVE'],
};

const TechStack: React.FC<TechStackProps> = ({ lang }) => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  const lv = (arr: string[]) => arr[tick % arr.length];

  const layers = [
    {
      layerNum: "01",
      icon: Cpu,
      title: t("TECH_L1_TITLE", lang),
      desc: t("TECH_L1_DESC", lang),
      chips: ["STM32F4/M7", "ESP32-S3", "RTIC v2", "Embassy", "no_std", "PAC/HAL"],
    },
    {
      layerNum: "02",
      icon: Eye,
      title: t("TECH_L2_TITLE", lang),
      desc: t("TECH_L2_DESC", lang),
      chips: ["Orange Pi 5", "YOLOv8", "6 TOPS NPU", "ONNX Runtime", "C-FFI", "Zero-Copy"],
    },
    {
      layerNum: "03",
      icon: Radio,
      title: t("TECH_L3_TITLE", lang),
      desc: t("TECH_L3_DESC", lang),
      chips: ["MQTT (Heap-Free)", "CAN-Bus", "RS-485", "Modbus", "Wi-Fi Mesh", "TLS 1.3"],
    },
    {
      layerNum: "04",
      icon: MonitorCheck,
      title: t("TECH_L4_TITLE", lang),
      desc: t("TECH_L4_DESC", lang),
      chips: ["Slint UI", "WebAssembly", "Tauri v2", "Direct Framebuffer", "Hardware Accel"],
    },
  ];

  const techBadges = [
    "Rust 2024", "RTIC v2", "Embassy Async", "Slint HMI", "YOLOv8 Edge",
    "Redox OS IPC", "STM32 Bare-Metal", "Zero-Copy DMA", "MQTT v5", "State-Space MPC",
  ];

  // Build ticker items — duplicated for seamless loop
  const tickerItems = [
    { label: 'MCU_CLOCK',         value: lv(TICKER_LIVE.mcu_clock),   color: '#fbfbfb' },
    { label: 'HEAP_ALLOCS',       value: lv(TICKER_LIVE.heap_allocs), color: '#eab308' },
    { label: 'IRQ_LATENCY',       value: lv(TICKER_LIVE.irq_latency), color: '#fbfbfb' },
    { label: 'MQTT_PING',         value: lv(TICKER_LIVE.mqtt_ping),   color: '#ff7f41' },
    { label: 'EDGE_VISION_NPU',   value: lv(TICKER_LIVE.npu_tops),   color: '#fbfbfb' },
    { label: 'CAN_BUS_LOAD',      value: lv(TICKER_LIVE.can_load),   color: '#fbfbfb' },
    { label: 'REDOX_KERNEL_IPC',  value: lv(TICKER_LIVE.redox),      color: '#ff7f41' },
  ];

  return (
    <section id="tech" className="mb-32 relative scroll-mt-24">
      {/* Section Header */}
      <motion.div
        className="mb-14 text-start"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="font-display text-xs font-mono tracking-widest text-[#ff7f41] uppercase block mb-3 font-bold">
          {t("TECH_SUB", lang)}
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#fbfbfb] font-bold tracking-tight">
          {t("TECH_TITLE", lang)}
        </h2>
        <div className="h-[2px] w-20 bg-gradient-to-r from-[#c1552c] to-[#ff7f41] mt-4 rounded-full" />
      </motion.div>

      {/* 4-Layer Architecture Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {layers.map((layer, idx) => {
          const Icon = layer.icon;
          return (
            <motion.div
              key={idx}
              className="surface-card p-7 rounded-sm flex flex-col justify-between relative overflow-hidden group text-start"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 380, damping: 26 } }}
            >
              {/* Top glow on hover */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#c1552c] to-[#ff7f41] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Layer Number & Icon */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-2xl font-black text-[#c1552c]/50 group-hover:text-[#ff7f41] transition-colors duration-200">
                  LAYER {layer.layerNum}
                </span>
                <motion.div
                  className="p-2 rounded-sm bg-[#c1552c]/10 text-[#ff7f41] group-hover:bg-[#c1552c]/20"
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#fbfbfb] mb-3 leading-snug">{layer.title}</h3>
                <p className="text-xs text-[#c2b5ad] leading-relaxed mb-6 font-light">{layer.desc}</p>
              </div>

              {/* Chip Badges */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {layer.chips.map((chip, cIdx) => (
                  <motion.span
                    key={cIdx}
                    whileHover={{ scale: 1.08, transition: { type: 'spring', stiffness: 500 } }}
                    className="text-[9px] font-mono text-[#ff7f41] bg-[#c1552c]/10 border border-[#c1552c]/20 px-2 py-0.5 rounded-xs cursor-default"
                  >
                    {chip}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Stack Prerequisites Badges */}
      <motion.div
        className="surface-card p-5 rounded-sm mb-8 flex flex-wrap gap-2.5 items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-xs font-mono text-[#85746a] me-2 uppercase font-bold">STACK PREREQUISITES:</span>
        {techBadges.map((badge, bIdx) => (
          <motion.span
            key={bIdx}
            whileHover={{ scale: 1.06, backgroundColor: '#c1552c', color: '#fff', transition: { type: 'spring', stiffness: 500 } }}
            className="text-xs font-mono font-bold text-[#fbfbfb] bg-[#1b1714] border border-[#c1552c]/30 px-3 py-1 rounded-sm transition-colors duration-200 cursor-default"
          >
            [ {badge} ]
          </motion.span>
        ))}
      </motion.div>

      {/* Live Hardware Telemetry Ticker — CSS infinite scroll */}
      <div className="w-full bg-[#0b0908] border-y border-[#c1552c]/20 py-3 overflow-hidden font-mono text-[11px] text-[#85746a] relative">
        {/* Left fade mask */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0b0908] to-transparent z-10 pointer-events-none" />
        {/* Right fade mask */}
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0b0908] to-transparent z-10 pointer-events-none" />

        {/* Ticker track — duplicated for seamless loop */}
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="flex items-center gap-1.5 px-6">
              <span className="text-[#ff7f41]">●</span>
              <span className="text-[#85746a]">{item.label}:</span>
              <strong style={{ color: item.color }}>{item.value}</strong>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
