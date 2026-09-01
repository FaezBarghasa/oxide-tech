import React, { useRef, useEffect, useState } from 'react';

export interface HoloVertex {
  x: number;
  y: number;
  z: number;
}

export interface HoloModel {
  vertices: HoloVertex[];
  lines: number[][]; // array of [index1, index2]
}

const MODELS: Record<string, HoloModel> = (() => {
  const models: Record<string, HoloModel> = {};

  // Helper: cylinder
  const createCylinder = (cx: number, cy: number, cz: number, r: number, h: number, segments: number) => {
    const vertices: HoloVertex[] = [];
    const lines: number[][] = [];
    const startIdx = 0;
    for (let i = 0; i < segments; i++) {
      const theta = (Math.PI * 2 * i) / segments;
      const px = cx + Math.cos(theta) * r;
      const pz = cz + Math.sin(theta) * r;
      vertices.push({ x: px, y: cy, z: pz });
      vertices.push({ x: px, y: cy + h, z: pz });

      const next = (i + 1) % segments;
      lines.push([startIdx + i * 2, startIdx + next * 2]);
      lines.push([startIdx + i * 2 + 1, startIdx + next * 2 + 1]);
      if (i % 2 === 0) lines.push([startIdx + i * 2, startIdx + i * 2 + 1]);
    }
    return { vertices, lines };
  };

  // Helper: box
  const createBox = (x: number, y: number, z: number, sx: number, sy: number, sz: number) => {
    const vertices: HoloVertex[] = [
      { x: x - sx, y: y - sy, z: z - sz },
      { x: x + sx, y: y - sy, z: z - sz },
      { x: x + sx, y: y - sy, z: z + sz },
      { x: x - sx, y: y - sy, z: z + sz },
      { x: x - sx, y: y + sy, z: z - sz },
      { x: x + sx, y: y + sy, z: z - sz },
      { x: x + sx, y: y + sy, z: z + sz },
      { x: x - sx, y: y + sy, z: z + sz },
    ];
    const lines: number[][] = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ];
    return { vertices, lines };
  };

  // -- 1. BLUE-PILL (STM32 Board)
  const bpVertices: HoloVertex[] = [];
  const bpLines: number[][] = [];
  const pcbW = 34;
  const pcbL = 80;
  bpVertices.push(
    { x: -pcbW, y: -2, z: -pcbL }, { x: pcbW, y: -2, z: -pcbL },
    { x: pcbW, y: -2, z: pcbL }, { x: -pcbW, y: -2, z: pcbL },
    { x: -pcbW, y: 2, z: -pcbL }, { x: pcbW, y: 2, z: -pcbL },
    { x: pcbW, y: 2, z: pcbL }, { x: -pcbW, y: 2, z: pcbL }
  );
  bpLines.push([0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]);

  // Headers (20 pins per side)
  let vIdx = bpVertices.length;
  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i < 18; i++) {
      const z = -pcbL + 8 + i * 4.2;
      const x = side * (pcbW - 3);
      bpVertices.push({ x: x, y: 2, z: z }, { x: x, y: -9, z: z });
      bpLines.push([vIdx, vIdx + 1]);
      if (i > 0) bpLines.push([vIdx, vIdx - 2]);
      vIdx += 2;
    }
  }

  // MCU (Square rotated 45 deg, center)
  const mcuW = 14;
  const mIdx = bpVertices.length;
  bpVertices.push(
    { x: 0, y: 2, z: -mcuW }, { x: mcuW, y: 2, z: 0 },
    { x: 0, y: 2, z: mcuW }, { x: -mcuW, y: 2, z: 0 },
    { x: 0, y: 6, z: -mcuW }, { x: mcuW, y: 6, z: 0 },
    { x: 0, y: 6, z: mcuW }, { x: -mcuW, y: 6, z: 0 }
  );
  bpLines.push(
    [mIdx, mIdx + 1], [mIdx + 1, mIdx + 2], [mIdx + 2, mIdx + 3], [mIdx + 3, mIdx],
    [mIdx + 4, mIdx + 5], [mIdx + 5, mIdx + 6], [mIdx + 6, mIdx + 7], [mIdx + 7, mIdx + 4],
    [mIdx, mIdx + 4], [mIdx + 1, mIdx + 5], [mIdx + 2, mIdx + 6], [mIdx + 3, mIdx + 7]
  );
  models['blue-pill'] = { vertices: bpVertices, lines: bpLines };

  // -- 2. HIGH-RPM MIXER
  const mx = createCylinder(0, -50, 0, 32, 12, 16);
  const mxMotor = createCylinder(0, 15, 0, 22, 35, 12);
  const offset = mx.vertices.length;
  mx.vertices.push(...mxMotor.vertices);
  mxMotor.lines.forEach(([a, b]) => mx.lines.push([a + offset, b + offset]));
  models['mixer'] = mx;

  // -- 3. BAIN-MARIE & PID CONTROLLER
  const bm = createBox(0, -5, 0, 55, 25, 38);
  const bmTub = createBox(0, 2, 0, 44, 18, 28);
  const offsetBm = bm.vertices.length;
  bm.vertices.push(...bmTub.vertices);
  bmTub.lines.forEach(([a, b]) => bm.lines.push([a + offsetBm, b + offsetBm]));
  models['bain-marie'] = bm;

  // -- 4. EDGE-VISION (NPU Camera Module)
  const evBox = createBox(0, 0, 0, 40, 40, 25);
  const evLens = createCylinder(0, 0, 25, 18, 16, 16);
  const offsetEv = evBox.vertices.length;
  evBox.vertices.push(...evLens.vertices);
  evLens.lines.forEach(([a, b]) => evBox.lines.push([a + offsetEv, b + offsetEv]));
  models['edge-vision'] = evBox;

  // -- 5. IOT-MESH (Antenna & S3 Module)
  const iotBox = createBox(0, -10, 0, 35, 15, 30);
  const iotAntenna = createCylinder(25, 5, -15, 3, 50, 8);
  const offsetIot = iotBox.vertices.length;
  iotBox.vertices.push(...iotAntenna.vertices);
  iotAntenna.lines.forEach(([a, b]) => iotBox.lines.push([a + offsetIot, b + offsetIot]));
  models['iot-mesh'] = iotBox;

  // -- 6. COGNITIVE-CORE (Multi-core NPU Server Block)
  const ccBox = createBox(0, 0, 0, 45, 30, 45);
  const ccHeatsink = createBox(0, 32, 0, 38, 6, 38);
  const offsetCc = ccBox.vertices.length;
  ccBox.vertices.push(...ccHeatsink.vertices);
  ccHeatsink.lines.forEach(([a, b]) => ccBox.lines.push([a + offsetCc, b + offsetCc]));
  models['cognitive-core'] = ccBox;

  return models;
})();

interface HologramViewerProps {
  activeProductIndex: number;
  isPaused?: boolean;
}

const productMetadata = [
  {
    modelKey: 'blue-pill',
    name: "Laminar Hood Board",
    category: "MODULE_01 // LAMINAR-CTRL",
    stats: {
      tl: "FREQ: 168.0 MHz",
      tr: "NODE: 0x4B12",
      bl: "ISO: CLASS-5",
      br: "LATENCY: 98μs"
    }
  },
  {
    modelKey: 'mixer',
    name: "Lab Mixer Rotator",
    category: "MODULE_02 // ROTATOR-BLDC",
    stats: {
      tl: "CAN-BUS: 1Mbps",
      tr: "NODE: 0x82DC",
      bl: "SLINT GRAPHICS",
      br: "JITTER: ZERO"
    }
  },
  {
    modelKey: 'bain-marie',
    name: "State-Space MPC Thermal Controller",
    category: "MODULE_03 // MPC-THERMAL",
    stats: {
      tl: "MPC: STATE-SPACE",
      tr: "NODE: 0x51E2",
      bl: "KALMAN: ACTIVE",
      br: "STABILITY: ±0.01°C"
    }
  },
  {
    modelKey: 'bain-marie',
    name: "Industrial Incubator Oven",
    category: "MODULE_04 // OVEN-CHAMBER",
    stats: {
      tl: "TEMP: 250.0°C",
      tr: "NODE: 0x9A44",
      bl: "DUAL PT1000",
      br: "STABILITY: ±0.1°C"
    }
  },
  {
    modelKey: 'mixer',
    name: "Refrigerated Cooler Incubator",
    category: "MODULE_05 // REFRIG-INCUB",
    stats: {
      tl: "COOLING: CASCADE",
      tr: "NODE: 0x3F18",
      bl: "RANGE: -10..+60°C",
      br: "VIBRATION: LOW"
    }
  },
  {
    modelKey: 'blue-pill',
    name: "Laboratory Autoclave Controller",
    category: "MODULE_06-B // AUTOCLAVE-SAFE",
    stats: {
      tl: "PRESSURE: 4.5 BAR",
      tr: "NODE: 0x7E01",
      bl: "SAFETY: SIL-2",
      br: "CYCLE: 134°C"
    }
  },
  {
    modelKey: 'edge-vision',
    name: "Edge AI Vision Node",
    category: "MODULE_07 // EDGE-VISION",
    stats: {
      tl: "NPU: 6 TOPS",
      tr: "NODE: 0x91A0",
      bl: "YOLOv8: 12ms",
      br: "IPC: ZERO-COPY"
    }
  },
  {
    modelKey: 'iot-mesh',
    name: "Wireless IoT Mesh Node",
    category: "MODULE_08 // IOT-MESH",
    stats: {
      tl: "MQTT: HEAP-FREE",
      tr: "NODE: 0x22EF",
      bl: "EMBASSY-NET",
      br: "LATENCY: <20ms"
    }
  },
  {
    modelKey: 'cognitive-core',
    name: "Cognitive SLM Diagnostic Core",
    category: "MODULE_09 // COGNITIVE-CORE",
    stats: {
      tl: "SLM: 7B QUANT",
      tr: "NODE: 0xC099",
      bl: "LLAMA-CPP RUST",
      br: "STATUS: NOMINAL"
    }
  }
];

const HologramViewer: React.FC<HologramViewerProps> = ({ activeProductIndex, isPaused = false }) => {
  const currentMetadata = productMetadata[activeProductIndex] || productMetadata[0];
  const modelKey = currentMetadata.modelKey;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [yaw, setYaw] = useState(0.8);
  const [pitch, setPitch] = useState(0.35);
  const [autoRot, setAutoRot] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [prevMouse, setPrevMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        width = entry.contentRect.width;
        height = entry.contentRect.height;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const project = (x: number, y: number, z: number, w: number, h: number) => {
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const x1 = x * cosY - z * sinY;
      const z1 = z * cosY + x * sinY;

      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);
      const y2 = y * cosP - z1 * sinP;
      const z2 = z1 * cosP + y * sinP;

      const fov = 340;
      const distance = 200;
      const scale = fov / (fov + z2 + distance);
      const projX = x1 * scale + w / 2;
      const projY = -y2 * scale + h / 2;

      return { x: projX, y: projY, scale, z: z2 };
    };

    const render = () => {
      if (width === 0 || height === 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      if (autoRot && !isDragging && !isPaused) {
        setYaw(y => y + 0.007);
      }

      ctx.clearRect(0, 0, width, height);

      const activeModel = MODELS[modelKey] || MODELS['blue-pill'];

      if (activeModel) {
        // Draw lines
        activeModel.lines.forEach(([i1, i2]) => {
          const v1 = activeModel.vertices[i1];
          const v2 = activeModel.vertices[i2];
          if (!v1 || !v2) return;

          const p1 = project(v1.x, v1.y, v1.z, width, height);
          const p2 = project(v2.x, v2.y, v2.z, width, height);

          if (p1.scale > 0 && p2.scale > 0) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            const alpha = Math.min(1.0, 0.25 + p1.scale * 0.75);
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha * 0.85})`;
            ctx.lineWidth = 1.4;
            ctx.stroke();
          }
        });

        // Draw vertices
        activeModel.vertices.forEach((v) => {
          const p = project(v.x, v.y, v.z, width, height);
          ctx.fillStyle = '#06b6d4';
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(1, 2.0 * p.scale), 0, Math.PI * 2);
          ctx.fill();
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, [modelKey, autoRot, isDragging, isPaused, yaw, pitch]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setAutoRot(false);
    setPrevMouse({ x: e.clientX, y: e.clientY });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - prevMouse.x;
    const deltaY = e.clientY - prevMouse.y;
    
    setYaw(y => y + deltaX * 0.012);
    setPitch(p => {
      const newPitch = p + deltaY * 0.012;
      return Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, newPitch));
    });

    setPrevMouse({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[440px] border border-[#3b82f6]/20 bg-[#0b1120]/80 rounded-lg overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing group select-none shadow-[inset_0_0_40px_rgba(59,130,246,0.08)]"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#3b82f6]/5 pointer-events-none z-10" />

      {/* Technical Corner Metric Badges */}
      <div className="absolute top-3 left-3 font-mono text-[10px] text-[#38bdf8] z-20 bg-[#0f172a]/70 px-2 py-0.5 rounded border border-white/5">
        {currentMetadata.stats.tl}
      </div>
      <div className="absolute top-3 right-3 font-mono text-[10px] text-[#38bdf8] z-20 bg-[#0f172a]/70 px-2 py-0.5 rounded border border-white/5">
        {currentMetadata.stats.tr}
      </div>
      <div className="absolute bottom-3 left-3 font-mono text-[10px] text-[#94a3b8] z-20 bg-[#0f172a]/70 px-2 py-0.5 rounded border border-white/5">
        {currentMetadata.stats.bl}
      </div>
      <div className="absolute bottom-3 right-3 font-mono text-[10px] text-[#10b981] font-bold z-20 bg-[#0f172a]/70 px-2 py-0.5 rounded border border-[#10b981]/30 animate-pulse">
        {currentMetadata.stats.br}
      </div>

      {/* Controls */}
      <div className="absolute top-10 left-3 flex gap-2 z-30">
        <button
          onClick={() => setAutoRot(prev => !prev)}
          className={`px-2 py-0.5 border text-[9px] font-mono tracking-wider uppercase cursor-pointer rounded-sm transition-colors ${
            autoRot 
              ? 'border-[#10b981]/50 bg-[#10b981]/10 text-[#34d399]' 
              : 'border-[#64748b]/30 bg-transparent text-[#94a3b8]'
          }`}
        >
          {autoRot ? 'AutoRotate: ON' : 'AutoRotate: OFF'}
        </button>
        <button
          onClick={() => {
            setYaw(0.8);
            setPitch(0.35);
          }}
          className="px-2 py-0.5 border border-[#3b82f6]/30 hover:bg-[#3b82f6]/10 text-[#93c5fd] text-[9px] font-mono tracking-wider uppercase cursor-pointer rounded-sm transition-colors"
        >
          Reset View
        </button>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="block w-full h-full touch-none z-10"
        style={{ filter: 'drop-shadow(0 0 15px rgba(59,130,246,0.35))' }}
      />

      {/* Drag Hint */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 font-mono text-[9px] tracking-widest text-[#64748b] opacity-70 pointer-events-none group-hover:opacity-100 transition-opacity">
        DRAG TO ROTATE 3D SYSTEM
      </div>
    </div>
  );
};

export default HologramViewer;
