import { useState } from 'react';
import { playHardwareTone } from '../lib/audio';
import { productData } from '../lib/datasheet';
import { t } from '../lib/i18n';

import HologramViewer from './HologramViewer';
import { TechBox } from './TechBox';

export function GatewayView({ audioMuted, setView, lang }: any) {
  const [capOpen, setCapOpen] = useState('');
  const [speed, setSpeed] = useState(480);
  const [yaw, setYaw] = useState(0.40);
  const [pitch, setPitch] = useState(-0.30);
  const [autoRot, setAutoRot] = useState(true);
  const [holoModel, setHoloModel] = useState('blue-pill');

  const renderVisualizerBars = () => {
    return Array.from({ length: 16 }).map((_, i) => (
      <div key={i} className="flex-1 bg-[#1A2830] relative overflow-hidden h-full">
         <div className="absolute bottom-0 w-full bg-[#00E5A0] opacity-80" style={{ height: `${Math.random() * 100}%`, transition: 'height 100ms' }}></div>
      </div>
    ));
  };

  return (
    <div className="view-panel flex-grow grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10 min-h-0">
      <TechBox className="col-span-1 md:col-span-8" innerClassName="p-8 overflow-hidden">
        <div className="absolute top-4 right-4 text-[10px] text-[#3A5048] font-bold tracking-[0.2em] font-mono uppercase">{t("U2 // MAIN_NODE", lang)}</div>

        <div className="flex flex-col flex-grow">
          <div className="flex items-center gap-3 mb-4 text-[#00E5A0] font-mono text-[11px] font-bold tracking-[0.2em] uppercase w-full">
            <div className="relative flex-none w-4 h-4">
              <div className="absolute inset-0 rounded-full border-[3.5px] border-[#00E5A0]"></div>
              <div className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-[#00E5A0]"></div>
            </div>
            <span>{t("HARDWARE VALIDATION MATRIX // ONLINE", lang)}</span>
          </div>

          <h2 className="font-sans text-[32px] md:text-[40px] font-bold leading-[1.1] mb-6 tracking-tight text-[#E8F4F0] whitespace-pre-wrap">
            {t("HERO_TITLE", lang)}
          </h2>

          <p className="font-sans text-sm leading-relaxed text-[#8AB0A0] max-w-2xl mb-8">
            {t("HERO_DESC", lang)}
          </p>

          <div className="border border-[#1A2830] bg-[#0A0E14] p-6 grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <span className="text-[12px] text-[#5BA3E8] font-mono font-medium tracking-[0.28em] uppercase block">// DYNAMIC CORE CLOCK</span>
              <div className="flex justify-between items-center text-[16px] font-mono text-[#E8F4F0]">
                <span>ARM Core Speed:</span>
                <span className="text-[#00E5A0] font-semibold">{speed} MHz</span>
              </div>
              <input type="range" min="100" max="480" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full accent-[#00E5A0] bg-[#1A2830] h-1" />
            </div>
            <div className="space-y-4">
              <span className="text-[12px] text-[#5BA3E8] font-mono font-medium tracking-[0.28em] uppercase block">// RTOS THREAD MONITOR</span>
              <div className="flex gap-1 h-12 items-end border-b border-[#1A2830] pb-2">
                {renderVisualizerBars()}
              </div>
            </div>
          </div>

          <div className="mt-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
            <TechBox variant="badge" className="cursor-pointer" innerClassName="px-4 py-4 hover:bg-[#1A2830] transition-colors" onClick={() => playHardwareTone(440, 0.05, audioMuted)}>
              <span className="block text-[9px] text-[#3A5048] font-bold tracking-widest font-mono uppercase mb-1">{t("LABEL_THERM", lang)}</span>
              <span className="block text-lg font-bold font-mono text-[#E8F4F0]">{t("VAL_THERM", lang)}</span>
              <span className="block text-[10px] text-[#5BA3E8] mt-1">{t("DESC_THERM", lang)}</span>
            </TechBox>
            <TechBox variant="badge" className="cursor-pointer" innerClassName="px-4 py-4 hover:bg-[#1A2830] transition-colors" onClick={() => playHardwareTone(554.37, 0.05, audioMuted)}>
              <span className="block text-[9px] text-[#3A5048] font-bold tracking-widest font-mono uppercase mb-1">{t("LABEL_VELOCITY", lang)}</span>
              <span className="block text-lg font-bold font-mono text-[#E8F4F0]">{t("VAL_VELOCITY", lang)}</span>
              <span className="block text-[10px] text-[#5BA3E8] mt-1">{t("DESC_VELOCITY", lang)}</span>
            </TechBox>
            <TechBox variant="badge" className="cursor-pointer" innerClassName="px-4 py-4 hover:bg-[#1A2830] transition-colors" onClick={() => playHardwareTone(659.25, 0.05, audioMuted)}>
              <span className="block text-[9px] text-[#3A5048] font-bold tracking-widest font-mono uppercase mb-1">{t("LABEL_ISO", lang)}</span>
              <span className="block text-lg font-bold font-mono text-[#E8F4F0]">{t("VAL_ISO", lang)}</span>
              <span className="block text-[10px] text-[#5BA3E8] mt-1">{t("DESC_ISO", lang)}</span>
            </TechBox>
          </div>
        </div>
      </TechBox>

      <TechBox className="col-span-1 md:col-span-4" innerClassName="p-6">
        <div className="absolute top-4 right-4 text-[10px] text-[#3A5048] tracking-[0.2em] font-bold font-mono">{t("U3 // STACK_QUERY", lang)}</div>

        <div className="flex flex-col pt-8 space-y-6">
          <h3 className="text-lg font-bold font-mono text-[#E8F4F0] flex items-center gap-3">
            <div className="w-3 h-3 rounded-full border-2 border-[#00E5A0] flex-none relative">
              <div className="absolute inset-0 m-auto w-1 h-1 rounded-full bg-[#00E5A0]"></div>
            </div>
            {t("HW_BLUEPRINTS", lang)}
          </h3>

          <div className="space-y-4">
            <TechBox variant="badge" innerClassName="p-4">
              <div className="flex justify-between items-center mb-1 cursor-pointer" onClick={() => setCapOpen(capOpen === '1' ? '' : '1')}>
                <span className="text-[10px] font-bold text-[#00E5A0] tracking-widest font-mono">{t("[REG_01] HARDWARE CO-DESIGN", lang)}</span>
                <span className="text-[10px] text-[#3A5048]">{capOpen === '1' ? t("▼ CLOSE", lang) : t("▲ PCB/EMC", lang)}</span>
              </div>
              <p className="text-[11px] text-[#8AB0A0] leading-normal pb-2">{t("End-to-end PCB design and multi-layer schematic capture.", lang)}</p>
              {capOpen === '1' && (
                <div className="mt-2 text-[#E8F4F0] text-[12px] leading-relaxed pt-2 border-t border-[#1A2830]">
                  <p>{t("Mixed-signal analog front-ends (PT100/1000) and stringent EMC/EMI compliance for harsh industrial environments.", lang)}</p>
                </div>
              )}
            </TechBox>

            <TechBox variant="badge" innerClassName="p-4">
              <div className="flex justify-between items-center mb-1 cursor-pointer" onClick={() => setCapOpen(capOpen === '2' ? '' : '2')}>
                <span className="text-[10px] font-bold text-[#00E5A0] tracking-widest font-mono">{t("[REG_02] BARE_METAL RUST", lang)}</span>
                <span className="text-[10px] text-[#3A5048]">{capOpen === '2' ? t("▼ CLOSE", lang) : t("▲ no_std", lang)}</span>
              </div>
              <p className="text-[11px] text-[#8AB0A0] leading-normal pb-2">{t("Foundational firmware guaranteeing memory safety and zero UB.", lang)}</p>
              {capOpen === '2' && (
                <div className="mt-2 text-[#E8F4F0] text-[12px] leading-relaxed pt-2 border-t border-[#1A2830]">
                  <p>{t("Real-Time Interrupt-driven Concurrency (RTIC) for deterministic, lock-free task scheduling and hardware-accelerated dispatchers.", lang)}</p>
                </div>
              )}
            </TechBox>

            <TechBox variant="badge" innerClassName="p-4">
              <div className="flex justify-between items-center mb-1 cursor-pointer" onClick={() => setCapOpen(capOpen === '3' ? '' : '3')}>
                <span className="text-[10px] font-bold text-[#00E5A0] tracking-widest font-mono">{t("[REG_03] SYSTEMS LOGIC", lang)}</span>
                <span className="text-[10px] text-[#3A5048]">{capOpen === '3' ? t("▼ CLOSE", lang) : t("▲ SLINT/MQTT", lang)}</span>
              </div>
              <p className="text-[11px] text-[#8AB0A0] leading-normal pb-2">{t("Full-stack Rust from bare-metal edge to cloud backends.", lang)}</p>
              {capOpen === '3' && (
                <div className="mt-2 text-[#E8F4F0] text-[12px] leading-relaxed pt-2 border-t border-[#1A2830]">
                  <p>{t("Unified Slint UI codebases scaling to Raspberry Pi 5. Actix-web backends and heap-free async MQTT clients for reliable telemetry.", lang)}</p>
                </div>
              )}
            </TechBox>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex justify-between text-[10px] text-[#3A5048] font-bold font-mono tracking-[0.2em] uppercase mt-8 pt-4 border-t border-[#1A2830]">
            <span>{t("SECURITY: CLR_A", lang)}</span>
            <span>{t("UPLINK: ACTIVE", lang)}</span>
          </div>
        </div>
      </TechBox>

      <TechBox className="col-span-1 md:col-span-8" innerClassName="p-6 overflow-hidden">
        <div className="mb-6 flex flex-col border-b border-[#1A2830] pb-4">
          <h3 className="text-lg font-bold font-mono text-[#E8F4F0] flex items-center gap-3">
            <div className="w-3 h-3 rounded-full border-2 border-[#00E5A0] flex-none relative">
              <div className="absolute inset-0 m-auto w-1 h-1 rounded-full bg-[#00E5A0]"></div>
            </div>
            3D_VOLUMETRIC_VIEWER
          </h3>
          <p className="text-[11px] text-[#8AB0A0] mt-1">// Select active visual buffer node</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-8 bg-[#0A0E14] border border-[#1A2830] aspect-video relative flex items-center justify-center p-8 overflow-hidden rounded-md">
             
            <div className="absolute inset-0">
               <HologramViewer 
                 modelKey={holoModel} 
                 yaw={yaw} 
                 pitch={pitch} 
                 autoRot={autoRot} 
                 setYaw={setYaw} 
                 setPitch={setPitch} 
                 setAutoRot={setAutoRot} 
               />
            </div>

            <div className="absolute bottom-4 start-4 p-2 text-[12px] font-mono text-[#5BA3E8] font-medium tracking-[0.05em]">
              <div>NODE_YAW: <span className="text-[#00E5A0]">{yaw.toFixed(2)}</span> rad</div>
              <div>NODE_PITCH: <span className="text-[#00E5A0]">{pitch.toFixed(2)}</span> rad</div>
            </div>
            
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,160,0.1)_1px,transparent_1px)] bg-[length:100%_4px] mix-blend-overlay pointer-events-none opacity-50"></div>
          </div>

          <div className="md:col-span-4 space-y-4">
            <TechBox variant="badge" innerClassName="p-4 flex flex-col items-center justify-center">
              <span className="text-[10px] text-[#3A5048] font-bold tracking-[0.2em] font-mono uppercase block mb-1">PROJECTED_NODE</span>
              <span className="text-[14px] font-bold text-[#00E5A0] font-mono block uppercase">{holoModel.replace('-', '_')}</span>
            </TechBox>

            <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto w-full">
              <TechBox variant={holoModel === 'bain-marie' ? 'accent' : 'button'} interactive className="w-full text-left" innerClassName={`py-3 px-4 text-[11px] font-bold tracking-[0.2em] font-mono uppercase transition-colors ${holoModel === 'bain-marie' ? 'bg-[#008C5F]/10 text-[#E8F4F0]' : 'bg-[#0A0E14] text-[#3A5048] hover:text-[#E8F4F0]'}`}>
                <button onClick={() => { setHoloModel('bain-marie'); playHardwareTone(784, 0.06, audioMuted); }} className="absolute inset-0 w-full h-full text-left"></button>
                <span className="relative pointer-events-none">[01] BAIN-MARIE CONTROL</span>
              </TechBox>
              <TechBox variant={holoModel === 'mixer' ? 'accent' : 'button'} interactive className="w-full text-left" innerClassName={`py-3 px-4 text-[11px] font-bold tracking-[0.2em] font-mono uppercase transition-colors ${holoModel === 'mixer' ? 'bg-[#008C5F]/10 text-[#E8F4F0]' : 'bg-[#0A0E14] text-[#3A5048] hover:text-[#E8F4F0]'}`}>
                <button onClick={() => { setHoloModel('mixer'); playHardwareTone(784, 0.06, audioMuted); }} className="absolute inset-0 w-full h-full text-left"></button>
                <span className="relative pointer-events-none">[02] HIGH-RPM MIXER</span>
              </TechBox>
              <TechBox variant={holoModel === 'blue-pill' ? 'accent' : 'button'} interactive className="w-full text-left" innerClassName={`py-3 px-4 text-[11px] font-bold tracking-[0.2em] font-mono uppercase transition-colors ${holoModel === 'blue-pill' ? 'bg-[#008C5F]/10 text-[#E8F4F0]' : 'bg-[#0A0E14] text-[#3A5048] hover:text-[#E8F4F0]'}`}>
                <button onClick={() => { setHoloModel('blue-pill'); playHardwareTone(784, 0.06, audioMuted); }} className="absolute inset-0 w-full h-full text-left"></button>
                <span className="relative pointer-events-none">[03] BLUE_PILL_STM32</span>
              </TechBox>
            </div>

            <TechBox variant="button" interactive className="w-full text-center" innerClassName="py-3 items-center bg-[#0A0E14] text-[#E8F4F0] font-mono text-[11px] font-bold tracking-[0.2em] uppercase">
              <button onClick={() => {
                setAutoRot(!autoRot);
                playHardwareTone(659.25, 0.05, audioMuted);
                if (!autoRot) {
                   setInterval(() => { setYaw(y => y + 0.1); setPitch(p => p - 0.05); }, 100);
                }
              }} className="absolute inset-0 w-full h-full flex items-center justify-center">
                <span className="relative pointer-events-none">AUTO_ROT: {autoRot ? 'ON' : 'OFF'}</span>
              </button>
              <span className="opacity-0">AUTO_ROT: {autoRot ? 'ON' : 'OFF'}</span>
            </TechBox>
          </div>
        </div>
      </TechBox>

      <TechBox className="col-span-1 md:col-span-4" innerClassName="p-6 overflow-hidden">
        <div className="mb-6 flex flex-col border-b border-[#1A2830] pb-4">
          <h3 className="text-lg font-bold font-mono text-[#E8F4F0] flex items-center gap-3">
            <div className="w-3 h-3 rounded-full border-2 border-[#00E5A0] flex-none relative">
              <div className="absolute inset-0 m-auto w-1 h-1 rounded-full bg-[#00E5A0]"></div>
            </div>
            {t("BUS_ARCHITECTURE", lang)}
          </h3>
          <p className="text-[11px] text-[#8AB0A0] mt-1">{t("// Toggle hardware nodes", lang)}</p>
        </div>

        <div className="flex flex-col gap-4 relative">
          <TechBox variant="button" interactive className="w-full text-center" innerClassName="py-3 px-4 bg-[#0A0E14] text-[#E8F4F0] font-mono text-[11px] font-bold tracking-[0.2em] uppercase items-center">
            <button onClick={() => setView('identity')} className="absolute inset-0 w-full h-full flex items-center justify-center"></button>
            <span className="relative pointer-events-none">{t("BTN_ABOUT", lang)}</span>
          </TechBox>

          <TechBox variant="button" interactive className="w-full text-center" innerClassName="py-3 px-4 bg-[#0A0E14] text-[#E8F4F0] font-mono text-[11px] font-bold tracking-[0.2em] uppercase items-center">
            <button onClick={() => setView('directory')} className="absolute inset-0 w-full h-full flex items-center justify-center"></button>
            <span className="relative pointer-events-none">{t("BTN_PROD", lang)}</span>
          </TechBox>
          
          <TechBox variant="button" interactive className="w-full text-center" innerClassName="py-3 px-4 bg-[#0A0E14] text-[#E8F4F0] font-mono text-[11px] font-bold tracking-[0.2em] uppercase items-center">
            <button onClick={() => setView('uplink')} className="absolute inset-0 w-full h-full flex items-center justify-center"></button>
            <span className="relative pointer-events-none">{t("BTN_CONT", lang)}</span>
          </TechBox>
        </div>
      </TechBox>
    </div>
  );
}

export function IdentityView({ lang }: any) {
  const [teamReadout, setTeamReadout] = useState(t("Select an organizational cell above to map team pipelines, technical credentials, and active system operations.", lang));

  return (
    <div className="view-panel flex-grow grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10 min-h-0">
      <TechBox className="col-span-1 md:col-span-6" innerClassName="p-8 overflow-hidden">
        <div className="space-y-6">
          <h3 className="text-lg font-bold font-mono text-[#E8F4F0] flex items-center gap-3">
            <div className="w-3 h-3 rounded-full border-2 border-[#00E5A0] flex-none relative">
              <div className="absolute inset-0 m-auto w-1 h-1 rounded-full bg-[#00E5A0]"></div>
            </div>
            {t("ABOUT_TITLE", lang)}
          </h3>

          <div className="border-l-2 border-l-[#00E5A0] pl-4 text-sm leading-relaxed text-[#8AB0A0] space-y-2">
            <p>{t("ABOUT_P1", lang)}</p>
            <p>{t("ABOUT_P2", lang)}</p>
            <p>{t("ABOUT_P3", lang)}</p>
          </div>

          <TechBox variant="badge" innerClassName="p-6 space-y-4">
            <div className="text-[10px] font-bold text-[#00E5A0] tracking-widest font-mono">{t("COMM_TITLE", lang)}</div>
            <div className="flex gap-4 items-center text-[11px] text-[#E8F4F0] leading-normal"><div className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] flex-none" /> {t("COMM_1", lang)}</div>
            <div className="flex gap-4 items-center text-[11px] text-[#E8F4F0] leading-normal"><div className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] flex-none" /> {t("COMM_2", lang)}</div>
            <div className="flex gap-4 items-center text-[11px] text-[#E8F4F0] leading-normal"><div className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] flex-none" /> {t("COMM_3", lang)}</div>
          </TechBox>
        </div>
      </TechBox>

      <TechBox className="col-span-1 md:col-span-6" innerClassName="p-8 overflow-hidden justify-between">
        <div className="space-y-6">
          <h3 className="text-lg font-bold font-mono text-[#E8F4F0] flex items-center gap-3">
            <div className="w-3 h-3 rounded-full border-2 border-[#00E5A0] flex-none relative">
              <div className="absolute inset-0 m-auto w-1 h-1 rounded-full bg-[#00E5A0]"></div>
            </div>
            {t("TEAM_TITLE", lang)}
          </h3>
          <p className="text-sm leading-relaxed text-[#8AB0A0]">
            {t("TEAM_DESC", lang)}
          </p>

          <div className="space-y-4 pt-4">
            <TechBox variant="button" interactive onClick={() => setTeamReadout(t("> MONIB MOKHTARI // CEO & Embedded Systems Architect: Domain encompasses analog/digital electronics, PCB layout, EMC/EMI compliance, and bare-metal real-time firmware. Philosophy: 'Build firmware so correct, the hardware never lies.'", lang))} className="w-full text-left" innerClassName="px-4 py-3 flex text-left justify-between items-center group font-mono text-[11px] font-bold tracking-[0.2em] uppercase">
              <span>{t("[MONIB_MOKHTARI]: CEO_HW_SYS_ARCHITECT", lang)}</span>
              <span className="text-[#3A5048] group-hover:text-[#00E5A0]">{t("READ SPECS ►", lang)}</span>
            </TechBox>
            <TechBox variant="button" interactive onClick={() => setTeamReadout(t("> FAEZ BARGHASA // CTO & Full-Stack Systems Engineer: Domain covers the digital ecosystem. Responsible for high-level system architecture, cloud infrastructure, Slint UI development, Actix-web backends, and ambitious system-level projects.", lang))} className="w-full text-left" innerClassName="px-4 py-3 flex text-left justify-between items-center group font-mono text-[11px] font-bold tracking-[0.2em] uppercase">
              <span>{t("[FAEZ_BARGHASA]: CTO_FULL_STACK_ENG", lang)}</span>
              <span className="text-[#3A5048] group-hover:text-[#00E5A0]">{t("READ SPECS ►", lang)}</span>
            </TechBox>
          </div>

          <TechBox variant="badge" innerClassName="p-6 text-[12px] font-sans leading-relaxed text-[#E8F4F0]" className="min-h-[140px]">
            <span className="text-[#3A5048] block text-[10px] font-bold font-mono tracking-[0.2em] uppercase mb-2">{t("U1_CELL_READOUT", lang)}</span>
            <p className="text-[#8AB0A0]">{teamReadout}</p>
          </TechBox>
        </div>
      </TechBox>
    </div>
  );
}

export function DirectoryView({ lang }: any) {
  const [selectedProduct, setSelectedProduct] = useState("MM-LAM-01");
  const p = productData[selectedProduct as keyof typeof productData];

  return (
    <div className="view-panel flex-grow grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10 min-h-0">
      <TechBox className="col-span-1 md:col-span-4" innerClassName="p-8 justify-between">
        <div className="space-y-6">
          <h3 className="text-lg font-bold font-mono text-[#E8F4F0] flex items-center gap-3 border-b border-[#1A2830] pb-4">
            <div className="w-3 h-3 rounded-full border-2 border-[#00E5A0] flex-none relative">
              <div className="absolute inset-0 m-auto w-1 h-1 rounded-full bg-[#00E5A0]"></div>
            </div>
            {t("DIR_TITLE", lang)}
          </h3>
          <p className="text-[12px] leading-relaxed text-[#8AB0A0]">
            {t("DIR_DESC", lang)}
          </p>

          <div className="space-y-3 font-mono text-[11px] font-bold tracking-[0.2em] uppercase pt-4">
            {Object.keys(productData).map((k) => (
              <TechBox 
                key={k} 
                variant={selectedProduct === k ? 'accent' : 'button'} 
                interactive 
                className="w-full text-left" 
                innerClassName={`flex justify-between items-center py-3 px-4 transition-all ${selectedProduct === k ? 'bg-[#008C5F]/10 text-[#E8F4F0]' : 'bg-[#0A0E14] text-[#3A5048] hover:text-[#E8F4F0]'}`}
              >
                <button onClick={() => setSelectedProduct(k)} className="absolute inset-0 w-full h-full text-left"></button>
                <span className="relative pointer-events-none">{k}</span>
                <span className="text-[#E8F4F0] text-[9px] relative pointer-events-none">{t("[ REG ]", lang)}</span>
              </TechBox>
            ))}
          </div>
        </div>
      </TechBox>

      <TechBox className="col-span-1 md:col-span-8" innerClassName="p-8 overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="mb-6 flex flex-col border-b border-[#1A2830] pb-4">
            <span className="text-[10px] text-[#3A5048] font-bold tracking-[0.2em] font-mono uppercase mb-2">{t("DS // ", lang)}{t(p.titleKey, lang)}</span>
            <h4 className="text-[28px] font-bold text-[#E8F4F0] tracking-tight font-mono">{t(p.titleKey, lang)}</h4>
          </div>
          <p className="text-sm leading-relaxed text-[#8AB0A0] max-w-2xl mb-8">{t(p.descKey, lang)}</p>
          <div className="grid grid-cols-2 gap-4 mt-auto">
            {p.specs.map(spec => (
               <TechBox variant="badge" key={spec.key} innerClassName="p-4">
                 <span className="block text-[9px] text-[#3A5048] font-bold tracking-widest font-mono uppercase mb-1">{t(spec.key, lang)}</span>
                 <span className="block text-sm font-bold font-mono text-[#E8F4F0]">{t(spec.value, lang)}</span>
              </TechBox>
            ))}
          </div>
        </div>
      </TechBox>
    </div>
  );
}

export function UplinkView({ lang }: any) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="view-panel flex-grow grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10 min-h-0">
      <TechBox className="col-span-1 md:col-span-5" innerClassName="p-8 justify-between">
        <div className="space-y-6">
          <h3 className="text-lg font-bold font-mono text-[#E8F4F0] flex items-center gap-3">
            <div className="w-3 h-3 rounded-full border-2 border-[#00E5A0] flex-none relative">
              <div className="absolute inset-0 m-auto w-1 h-1 rounded-full bg-[#00E5A0]"></div>
            </div>
            {t("CONT_TITLE", lang)}
          </h3>
          <p className="text-sm leading-relaxed text-[#8AB0A0]">
            {t("CONT_DESC", lang)}
          </p>
          <TechBox variant="badge" innerClassName="p-6 text-[11px] font-mono tracking-[0.05em] text-[#E8F4F0] space-y-4">
            <div className="text-[10px] text-[#00E5A0] font-bold tracking-widest block uppercase">{t("CONT_BEN_TITLE", lang)}</div>
            <div className="flex gap-4 items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] flex-none"></div> {t("CONT_BEN_1", lang)}</div>
            <div className="flex gap-4 items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] flex-none"></div> {t("CONT_BEN_2", lang)}</div>
            <div className="flex gap-4 items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] flex-none"></div> {t("CONT_BEN_3", lang)}</div>
            
            <div className="mt-4 pt-4 border-t border-[#1A2830] space-y-3">
               <div className="text-[10px] text-[#5BA3E8] font-bold tracking-widest block uppercase">{t("FAEZ BARGHASA (CTO):", lang)}</div>
               <div className="flex gap-4 items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#5BA3E8] flex-none"></div> <span className="text-[#8AB0A0]">{t("EMAIL:", lang)} faez.barghasa.org@gmail.com</span></div>
               <div className="flex gap-4 items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#5BA3E8] flex-none"></div> <span className="text-[#8AB0A0]" dir="ltr">{t("PHONE:", lang)} +98 9355085393</span></div>
               <div className="flex gap-4 items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#5BA3E8] flex-none"></div> <a href="https://github.com/faezbarghasa" target="_blank" rel="noopener noreferrer" className="text-[#8AB0A0] hover:text-[#E8F4F0]">GITHUB: github.com/faezbarghasa</a></div>

               <div className="text-[10px] text-[#5BA3E8] font-bold tracking-widest block uppercase mt-4">{t("MONIB MOKHTARI (CEO):", lang)}</div>
               <div className="flex gap-4 items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#5BA3E8] flex-none"></div> <span className="text-[#8AB0A0]">{t("EMAIL:", lang)} monib.mokhtari85@gmail.com</span></div>
               <div className="flex gap-4 items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#5BA3E8] flex-none"></div> <span className="text-[#8AB0A0]" dir="ltr">{t("PHONE:", lang)} +98 9123069848</span></div>
               <div className="flex gap-4 items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#5BA3E8] flex-none"></div> <a href="https://github.com/monibmo" target="_blank" rel="noopener noreferrer" className="text-[#8AB0A0] hover:text-[#E8F4F0]">GITHUB: github.com/monibmo</a></div>
            </div>
          </TechBox>
        </div>
      </TechBox>

      <TechBox className="col-span-1 md:col-span-7" innerClassName="p-8 overflow-hidden">
        <div className="h-full flex flex-col">
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div className="relative">
              <label className="block text-[10px] font-bold font-mono tracking-[0.2em] text-[#3A5048] uppercase mb-2">{t("LBL_COMP", lang)}</label>
              <TechBox variant="badge" className="w-full" innerClassName="w-full">
                <input type="text" placeholder={t("PLH_COMP", lang)} required className="w-full bg-transparent focus:outline-none px-4 py-3 text-[#E8F4F0] font-mono text-[12px]" />
              </TechBox>
            </div>
            <div className="relative">
              <label className="block text-[10px] font-bold font-mono tracking-[0.2em] text-[#3A5048] uppercase mb-2">{t("LBL_EML", lang)}</label>
              <TechBox variant="badge" className="w-full" innerClassName="w-full">
                <input type="email" placeholder={t("PLH_EML", lang)} required className="w-full bg-transparent focus:outline-none px-4 py-3 text-[#E8F4F0] font-mono text-[12px]" />
              </TechBox>
            </div>
            <div className="md:col-span-2 relative">
              <label className="block text-[10px] font-bold font-mono tracking-[0.2em] text-[#3A5048] uppercase mb-2">{t("LBL_SPEC", lang)}</label>
              <TechBox variant="badge" className="w-full" innerClassName="w-full h-full">
                <textarea rows={6} placeholder={t("PLH_SPEC", lang)} required className="w-full h-full bg-transparent focus:outline-none px-4 py-3 text-[#E8F4F0] font-mono text-[12px] resize-none"></textarea>
              </TechBox>
            </div>
            <div className="md:col-span-2 flex justify-end mt-4">
              <TechBox variant="button" className="w-full md:w-auto" interactive>
                <button type="submit" className="w-full h-full text-[#E8F4F0] font-mono font-bold text-[11px] tracking-[0.2em] px-8 py-3 uppercase">
                  {t("BTN_SUBMIT", lang)}
                </button>
              </TechBox>
            </div>
          </form>

          {submitted && (
             <div className="absolute inset-0 bg-[#0D1620] flex flex-col p-8 z-20">
              <div className="space-y-6">
                <span className="text-[#00E5A0] text-lg font-bold font-mono tracking-tight block flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full border-2 border-[#00E5A0] flex-none relative">
                    <div className="absolute inset-0 m-auto w-1 h-1 rounded-full bg-[#00E5A0]"></div>
                  </div>
                  {t("UPLINK PACKET DEPLOYED", lang)}
                </span>
                <TechBox variant="badge" innerClassName="p-6 text-[11px] font-mono tracking-[0.05em] space-y-3 text-[#E8F4F0]">
                  <div>{t("> Initiating RSA handshakes... SUCCESS", lang)}</div>
                  <div>{t("> Compiling specifications... COMPLETED", lang)}</div>
                  <div>{t("> Routing telemetry packets: IP_COM_SECURED", lang)}</div>
                </TechBox>
                <p className="text-sm leading-relaxed text-[#8AB0A0]">
                  {t("Hardware contracting packet received successfully. A systems engineering contractor stands notified to analyze physical parameters.", lang)}
                </p>
              </div>
              <button onClick={() => setSubmitted(false)} className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#00E5A0] hover:text-[#E8F4F0] uppercase self-start mt-auto pt-8">{t("[ CLEAR_LOG_REGISTERS ]", lang)}</button>
            </div>
          )}
        </div>
      </TechBox>
    </div>
  );
}