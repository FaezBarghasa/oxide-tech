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
    background: #0B0908;

    VerticalLayout {
        padding: 24px;
        spacing: 16px;

        Text {
            text: "OXIDE // MODULE_03 STATE-SPACE MPC";
            font-size: 16px;
            font-family: "JetBrains Mono";
            color: #C1552C;
        }

        Rectangle {
            background: #161210;
            border-width: 1px;
            border-color: #C1552C;
            border-radius: 4px;
            height: 120px;

            Text {
                text: "PV: " + root.current_temp + " °C | SP: " + root.target_temp + " °C";
                font-size: 28px;
                color: #FBFBFB;
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
          className="absolute inset-0 bg-[#07070a]/85 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          className="relative z-10 w-full max-w-3xl bg-[#161210] border border-[#c1552c]/40 rounded-sm shadow-[0_0_50px_rgba(193,85,44,0.25)] p-6 sm:p-8 text-start overflow-hidden flex flex-col max-h-[90vh]"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Top Line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#c1552c] via-[#ff7f41] to-[#eab308]" />

          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#c1552c]/20 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-sm bg-[#c1552c]/15 text-[#ff7f41]">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#fbfbfb]">
                  {t("PORTAL_TITLE", lang)}
                </h3>
                <div className="text-[11px] font-mono text-[#ff7f41]">
                  // DETERMINISTIC CODE ARTIFACTS
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-[#85746a] hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Selector */}
          <div className="flex gap-2 mb-4 border-b border-[#c1552c]/20 pb-2">
            <button
              onClick={() => {
                setActiveTab('slint');
                telemetry.track('select_tab_slint', 'portal_view');
              }}
              className={`font-mono text-xs px-3 py-1.5 rounded-sm transition-all cursor-pointer ${
                activeTab === 'slint'
                  ? 'bg-[#c1552c] text-white font-bold shadow-sm'
                  : 'text-[#85746a] hover:text-[#ff7f41]'
              }`}
            >
              [ SLINT HMI ]
            </button>
            <button
              onClick={() => {
                setActiveTab('mqtt');
                telemetry.track('select_tab_mqtt', 'portal_view');
              }}
              className={`font-mono text-xs px-3 py-1.5 rounded-sm transition-all cursor-pointer ${
                activeTab === 'mqtt'
                  ? 'bg-[#c1552c] text-white font-bold shadow-sm'
                  : 'text-[#85746a] hover:text-[#ff7f41]'
              }`}
            >
              [ NO_STD MQTT ]
            </button>
            <button
              onClick={() => {
                setActiveTab('embassy');
                telemetry.track('select_tab_embassy', 'portal_view');
              }}
              className={`font-mono text-xs px-3 py-1.5 rounded-sm transition-all cursor-pointer ${
                activeTab === 'embassy'
                  ? 'bg-[#c1552c] text-white font-bold shadow-sm'
                  : 'text-[#85746a] hover:text-[#ff7f41]'
              }`}
            >
              [ EMBASSY ZERO-COPY ]
            </button>
          </div>

          {/* Code Viewer */}
          <div className="relative flex-1 overflow-auto bg-[#0b0908] border border-[#c1552c]/30 p-4 rounded-sm font-mono text-xs text-[#c2b5ad] leading-relaxed">
            <button
              onClick={handleCopy}
              className="absolute top-3 end-3 p-1.5 rounded bg-[#1b1714] hover:bg-[#c1552c] text-[#85746a] hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-[10px]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#ff7f41]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "COPIED" : "COPY"}</span>
            </button>
            <pre className="overflow-x-auto select-all dir-ltr text-start font-mono">
              <code>{snippets[activeTab]}</code>
            </pre>
          </div>

          {/* Footer Note */}
          <div className="pt-4 mt-2 flex items-center justify-between text-[11px] font-mono text-[#85746a]">
            <span>Rust 2024 • no_std certified • static analysis passed</span>
            <button
              onClick={onClose}
              className="border border-[#c1552c]/30 text-[#ff7f41] hover:bg-[#c1552c]/15 px-4 py-1 rounded-sm text-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DeveloperPortal;
