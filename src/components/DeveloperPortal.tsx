import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Code2, Terminal, Copy, Check, Cpu, Layers } from 'lucide-react';
import { t } from '../lib/i18n';
import { telemetry } from '../lib/analytics';

interface DeveloperPortalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'fa' | 'en';
}

const DeveloperPortal: React.FC<DeveloperPortalProps> = ({ isOpen, onClose, lang }) => {
  const [activeTab, setActiveTab] = useState<'slint' | 'mqtt' | 'embassy'>('slint');
  const [copied, setCopied] = useState(false);

  const snippets = {
    slint: `// Slint HMI Declarative Blueprint (no_std friendly)
import { Button, Slider, LineEdit } from "std-widgets.slint";

export component ThermalControllerHMI inherits Window {
    in-out property <float> target_temp: 37.0;
    in-out property <float> current_temp: 36.98;
    in-out property <string> mpc_status: "KALMAN_STABLE";
    callback temp_adjusted(float);

    width: 800px;
    height: 480px;
    background: #0B1120;

    VerticalLayout {
        padding: 24px;
        spacing: 16px;

        Text {
            text: "OXIDE // MODULE_03 STATE-SPACE MPC";
            font-size: 16px;
            font-family: "JetBrains Mono";
            color: #3B82F6;
        }

        Rectangle {
            background: #1E293B;
            border-width: 1px;
            border-color: #3B82F6;
            border-radius: 4px;
            height: 120px;

            Text {
                text: "PV: " + root.current_temp + " °C | SP: " + root.target_temp + " °C";
                font-size: 28px;
                color: #F8FAFC;
                x: 20px;
                y: 40px;
            }
        }
    }
}`,
    mqtt: `// Heap-Free MQTT 5.0 Stack-based State Machine (embassy-net)
#![no_std]
use embassy_net::tcp::TcpSocket;
use oxide_mqtt::{MqttClient, QoS, PacketBuffer};

pub async fn telemetry_task(mut socket: TcpSocket<'_>) -> Result<(), MqttError> {
    // 100% Stack Allocated - Zero Dynamic Heap Allocations
    let mut rx_buf = [0u8; 1024];
    let mut tx_buf = [0u8; 1024];
    let mut client = MqttClient::new(&mut socket, &mut rx_buf, &mut tx_buf);

    client.connect("oxide-node-08", QoS::AtLeastOnce).await?;

    loop {
        let telemetry_payload = br#"{"temp": 74.2, "dma_state": "OK", "heap_allocs": 0}"#;
        client.publish("oxide/telemetry/v2", telemetry_payload, QoS::AtLeastOnce).await?;
        embassy_time::Timer::after_millis(500).await;
    }
}`,
    embassy: `// Zero-Copy DMA Pipeline with Embassy & STM32F4
#![no_std]
#![no_main]

use embassy_stm32::dma::NoDma;
use embassy_stm32::usart::{Config, Uart};
use embassy_executor::Spawner;

#[embassy_executor::main]
async fn main(_spawner: Spawner) {
    let p = embassy_stm32::init(Default::default());

    // Hardware DMA Stream setup with zero buffer copies
    let mut uart = Uart::new(p.USART1, p.PA10, p.PA9, p.DMA2_CH7, p.DMA2_CH2, Config::default()).unwrap();

    let mut rx_dma_buffer = [0u8; 256];
    loop {
        // Read full frame into DMA ring buffer directly from peripheral FIFO
        uart.read_exact(&mut rx_dma_buffer).await.unwrap();
        // Dispatched with zero software latency
    }
}`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    telemetry.track(`copy_code_${activeTab}`, 'portal_view');
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-[#070b14]/85 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          className="relative z-10 w-full max-w-4xl bg-[#0f172a] border border-[#3b82f6]/40 rounded-sm shadow-[0_0_50px_rgba(59,130,246,0.3)] p-6 sm:p-8 text-start overflow-hidden max-h-[90vh] flex flex-col"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
        >
          {/* Top Line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#3b82f6] via-[#06b6d4] to-[#10b981]" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 end-5 text-[#64748b] hover:text-white p-1 rounded-sm cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-sm bg-[#3b82f6]/10 text-[#3b82f6]">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#f8fafc]">
                {t("DEV_MODAL_TITLE", lang)}
              </h3>
              <p className="text-xs text-[#94a3b8] font-light">
                {t("DEV_MODAL_DESC", lang)}
              </p>
            </div>
          </div>

          {/* Tabs & Copy Button */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 mb-4">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('slint')}
                className={`text-xs font-mono px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
                  activeTab === 'slint'
                    ? 'bg-[#3b82f6] text-white font-bold'
                    : 'text-[#94a3b8] hover:text-white bg-[#1e293b]'
                }`}
              >
                {t("DEV_TAB_SLINT", lang)}
              </button>

              <button
                onClick={() => setActiveTab('mqtt')}
                className={`text-xs font-mono px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
                  activeTab === 'mqtt'
                    ? 'bg-[#3b82f6] text-white font-bold'
                    : 'text-[#94a3b8] hover:text-white bg-[#1e293b]'
                }`}
              >
                {t("DEV_TAB_MQTT", lang)}
              </button>

              <button
                onClick={() => setActiveTab('embassy')}
                className={`text-xs font-mono px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
                  activeTab === 'embassy'
                    ? 'bg-[#3b82f6] text-white font-bold'
                    : 'text-[#94a3b8] hover:text-white bg-[#1e293b]'
                }`}
              >
                {t("DEV_TAB_EMBASSY", lang)}
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-mono text-[#93c5fd] hover:text-white bg-[#1e293b] hover:bg-[#3b82f6] px-3 py-1.5 rounded-sm transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "COPIED" : "COPY CODE"}</span>
            </button>
          </div>

          {/* Code Viewer Container */}
          <div className="flex-1 overflow-auto bg-[#0b1120] border border-white/5 p-4 rounded-sm font-mono text-xs text-[#cbd5e1] leading-relaxed dir-ltr">
            <pre tabIndex={0}>
              <code>{snippets[activeTab]}</code>
            </pre>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DeveloperPortal;
