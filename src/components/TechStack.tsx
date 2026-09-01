import React from 'react';
import { motion } from 'motion/react';
import { t } from '../lib/i18n';
import { Cpu, Eye, Radio, MonitorCheck, Server } from 'lucide-react';

interface TechStackProps {
  lang: 'fa' | 'en';
}

const TechStack: React.FC<TechStackProps> = ({ lang }) => {
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
    "Rust 2024",
    "RTIC v2",
    "Embassy Async",
    "Slint HMI",
    "YOLOv8 Edge",
    "Redox OS IPC",
    "STM32 Bare-Metal",
    "Zero-Copy DMA",
    "MQTT v5",
    "State-Space MPC",
  ];

  return (
    <section id="tech" className="mb-32 relative scroll-mt-24">
      {/* Section Header */}
      <motion.div 
        className="mb-14 text-start"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <span className="text-xs font-mono tracking-widest text-[#ff7f41] uppercase block mb-3 font-bold">
          {t("TECH_SUB", lang)}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#fbfbfb] font-bold tracking-tight">
          {t("TECH_TITLE", lang)}
        </h2>
        <div className="h-[2px] w-20 bg-gradient-to-r from-[#c1552c] to-[#ff7f41] mt-4 rounded-full"></div>
      </motion.div>

      {/* Vertical Integration 4-Layer Architecture Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {layers.map((layer, idx) => {
          const Icon = layer.icon;
          return (
            <motion.div
              key={idx}
              className="bg-[#161210]/80 backdrop-blur-xl border border-[#ff7f41]/15 p-7 rounded-sm flex flex-col justify-between hover:border-[#c1552c]/60 transition-all duration-400 relative overflow-hidden group shadow-lg text-start"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
            >
              {/* Layer Top Number Badge */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-2xl font-black text-[#c1552c]/50 group-hover:text-[#ff7f41] transition-colors">
                  LAYER {layer.layerNum}
                </span>
                <div className="p-2 rounded-sm bg-[#c1552c]/10 text-[#ff7f41] group-hover:bg-[#c1552c]/20 group-hover:scale-110 transition-all">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#fbfbfb] mb-3 leading-snug">
                  {layer.title}
                </h3>
                <p className="text-xs text-[#c2b5ad] leading-relaxed mb-6 font-light">
                  {layer.desc}
                </p>
              </div>

              {/* Chips / Badges */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {layer.chips.map((chip, cIdx) => (
                  <span 
                    key={cIdx}
                    className="text-[9px] font-mono text-[#ff7f41] bg-[#c1552c]/10 border border-[#c1552c]/20 px-2 py-0.5 rounded-xs"
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
        className="p-5 rounded-sm bg-[#161210]/90 border border-[#c1552c]/30 backdrop-blur-md mb-8 flex flex-wrap gap-2.5 items-center justify-center shadow-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <span className="text-xs font-mono text-[#85746a] me-2 uppercase font-bold">STACK PREREQUISITES:</span>
        {techBadges.map((badge, bIdx) => (
          <span
            key={bIdx}
            className="text-xs font-mono font-bold text-[#fbfbfb] bg-[#1b1714] hover:bg-[#c1552c] hover:text-white border border-[#c1552c]/30 px-3 py-1 rounded-sm transition-all duration-200 cursor-default shadow-sm"
          >
            [ {badge} ]
          </span>
        ))}
      </motion.div>

      {/* Live Hardware Telemetry Ticker */}
      <div className="w-full bg-[#0b0908] border-y border-[#c1552c]/20 py-3 overflow-hidden font-mono text-[11px] text-[#85746a]">
        <div className="flex whitespace-nowrap gap-8 animate-pulse">
          <span className="text-[#ff7f41]">● TELEMETRY_STREAM_LIVE</span>
          <span>MCU_CLOCK: <strong className="text-[#fbfbfb]">168.00 MHz</strong></span>
          <span>HEAP_ALLOCS: <strong className="text-[#eab308]">0 BYTES (STATIC_MEM)</strong></span>
          <span>INTERRUPT_LATENCY: <strong className="text-[#fbfbfb]">12 CYCLES</strong></span>
          <span>MQTT_PING: <strong className="text-[#ff7f41]">18ms</strong></span>
          <span>EDGE_VISION_NPU: <strong className="text-[#fbfbfb]">6.0 TOPS ACTIVE</strong></span>
          <span>CAN_BUS_LOAD: <strong className="text-[#fbfbfb]">14.2%</strong></span>
          <span>REDOX_KERNEL_IPC: <strong className="text-[#ff7f41]">ONLINE</strong></span>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
