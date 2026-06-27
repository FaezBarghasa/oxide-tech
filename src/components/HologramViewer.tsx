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

  // -- 1. BLUE-PILL (STM32 Board)
  const bpVertices: HoloVertex[] = [];
  const bpLines: number[][] = [];
  
  // PCB (length 53mm, width 22mm scale by 1.5) -> L=80, W=33
  const pcbW = 33;
  const pcbL = 80;
  bpVertices.push(
    {x: -pcbW, y: -2, z: -pcbL}, {x: pcbW, y: -2, z: -pcbL}, 
    {x: pcbW, y: -2, z: pcbL}, {x: -pcbW, y: -2, z: pcbL},
    {x: -pcbW, y: 2, z: -pcbL}, {x: pcbW, y: 2, z: -pcbL}, 
    {x: pcbW, y: 2, z: pcbL}, {x: -pcbW, y: 2, z: pcbL}
  );
  bpLines.push([0,1],[1,2],[2,3],[3,0], [4,5],[5,6],[6,7],[7,4], [0,4],[1,5],[2,6],[3,7]);

  // Headers (20 pins per side)
  let vIdx = bpVertices.length;
  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i < 20; i++) {
      const z = -pcbL + 8 + i * 3.8;
      const x = side * (pcbW - 2);
      bpVertices.push({x: x, y: 2, z: z}, {x: x, y: -8, z: z});
      bpLines.push([vIdx, vIdx + 1]);
      if (i > 0) {
        bpLines.push([vIdx, vIdx - 2]); 
      }
      vIdx += 2;
    }
  }

  // MCU (Square rotated 45 deg, center)
  const mcuW = 12;
  const mIdx = bpVertices.length;
  bpVertices.push(
    {x: 0, y: 2, z: -mcuW}, {x: mcuW, y: 2, z: 0},
    {x: 0, y: 2, z: mcuW}, {x: -mcuW, y: 2, z: 0},
    {x: 0, y: 5, z: -mcuW}, {x: mcuW, y: 5, z: 0},
    {x: 0, y: 5, z: mcuW}, {x: -mcuW, y: 5, z: 0}
  );
  bpLines.push(
    [mIdx,  mIdx+1],   [mIdx+1,mIdx+2], [mIdx+2,mIdx+3], [mIdx+3,mIdx],
    [mIdx+4,mIdx+5], [mIdx+5,mIdx+6], [mIdx+6,mIdx+7], [mIdx+7,mIdx+4],
    [mIdx,mIdx+4], [mIdx+1,mIdx+5], [mIdx+2,mIdx+6], [mIdx+3,mIdx+7]
  );
  
  // USB Port (top edge)
  const uIdx = bpVertices.length;
  bpVertices.push(
    {x:-6, y:2, z:-pcbL}, {x:6, y:2, z:-pcbL}, {x:6, y:2, z:-pcbL-6}, {x:-6, y:2, z:-pcbL-6},
    {x:-6, y:7, z:-pcbL}, {x:6, y:7, z:-pcbL}, {x:6, y:7, z:-pcbL-6}, {x:-6, y:7, z:-pcbL-6}
  );
  bpLines.push(
    [uIdx,uIdx+1],[uIdx+1,uIdx+2],[uIdx+2,uIdx+3],[uIdx+3,uIdx],
    [uIdx+4,uIdx+5],[uIdx+5,uIdx+6],[uIdx+6,uIdx+7],[uIdx+7,uIdx+4],
    [uIdx,uIdx+4],[uIdx+1,uIdx+5],[uIdx+2,uIdx+6],[uIdx+3,uIdx+7]
  );

  models['blue-pill'] = { vertices: bpVertices, lines: bpLines };

  // -- 2. HIGH-RPM MIXER
  const mxVertices: HoloVertex[] = [];
  const mxLines: number[][] = [];
  
  // Circle generator
  const addCylinder = (cx: number, cy: number, cz: number, r: number, h: number, segments: number) => {
    const startIdx = mxVertices.length;
    for (let i = 0; i < segments; i++) {
       const theta = (Math.PI * 2 * i) / segments;
       const px = cx + Math.cos(theta) * r;
       const pz = cz + Math.sin(theta) * r;
       mxVertices.push({x: px, y: cy, z: pz});
       mxVertices.push({x: px, y: cy + h, z: pz});
       
       const next = (i + 1) % segments;
       mxLines.push([startIdx + i * 2, startIdx + next * 2]);
       mxLines.push([startIdx + i * 2 + 1, startIdx + next * 2 + 1]);
       if (i % 2 === 0) mxLines.push([startIdx + i * 2, startIdx + i * 2 + 1]); // vertical struts
    }
  };

  // Base
  addCylinder(0, -60, 0, 30, 10, 16);
  // Column
  const cIdx = mxVertices.length;
  mxVertices.push({x:0, y:-50, z:-20}, {x:0, y:20, z:-20});
  mxLines.push([cIdx, cIdx+1]);
  // Motor Head
  addCylinder(0, 20, 0, 20, 40, 12);
  // Shaft
  const sIdx = mxVertices.length;
  mxVertices.push({x:0, y:-30, z:0}, {x:0, y:20, z:0});
  mxLines.push([sIdx, sIdx+1]);
  
  // Whisk impellor
  const wIdx = mxVertices.length;
  for (let i = 0; i < 4; i++) {
     const theta = (Math.PI / 2) * i;
     mxVertices.push({x: Math.cos(theta)*15, y:-45, z: Math.sin(theta)*15});
     mxLines.push([sIdx, wIdx + i]); // Shaft to whisk
     mxLines.push([wIdx+i, wIdx + ((i+1)%4)]); // Whisk ring
  }

  models['mixer'] = { vertices: mxVertices, lines: mxLines };

  // -- 3. BAIN-MARIE CONTROL
  const bmVertices: HoloVertex[] = [];
  const bmLines: number[][] = [];
  
  const addBox = (x:number, y:number, z:number, sx:number, sy:number, sz:number) => {
    const idx = bmVertices.length;
    bmVertices.push(
      {x:x-sx, y:y-sy, z:z-sz}, {x:x+sx, y:y-sy, z:z-sz}, {x:x+sx, y:y-sy, z:z+sz}, {x:x-sx, y:y-sy, z:z+sz},
      {x:x-sx, y:y+sy, z:z-sz}, {x:x+sx, y:y+sy, z:z-sz}, {x:x+sx, y:y+sy, z:z+sz}, {x:x-sx, y:y+sy, z:z+sz}
    );
    bmLines.push(
      [idx,idx+1],[idx+1,idx+2],[idx+2,idx+3],[idx+3,idx],
      [idx+4,idx+5],[idx+5,idx+6],[idx+6,idx+7],[idx+7,idx+4],
      [idx,idx+4],[idx+1,idx+5],[idx+2,idx+6],[idx+3,idx+7]
    );
  };

  // Outer shell
  addBox(0, -10, 0, 60, 30, 40);
  // Inner Tub
  addBox(0, 0, 0, 50, 20, 30);
  // Control Panel slope
  const cpIdx = bmVertices.length;
  bmVertices.push(
    {x:-60, y:20, z:40}, {x:60, y:20, z:40},
    {x:-60, y:10, z:50}, {x:60, y:10, z:50}
  );
  bmLines.push([cpIdx, cpIdx+1], [cpIdx+2, cpIdx+3], [cpIdx, cpIdx+2], [cpIdx+1, cpIdx+3]);
  
  // Heating tubes (U-shaped element)
  const hIdx = bmVertices.length;
  bmVertices.push(
    {x:-30, y:-15, z:-20}, {x:-30, y:-15, z:20},
    {x:-10, y:-15, z:20}, {x:-10, y:-15, z:-20},
    {x:10, y:-15, z:-20}, {x:10, y:-15, z:20},
    {x:30, y:-15, z:20}, {x:30, y:-15, z:-20}
  );
  bmLines.push([hIdx, hIdx+1], [hIdx+1, hIdx+2], [hIdx+2, hIdx+3], [hIdx+3, hIdx+4], [hIdx+4, hIdx+5], [hIdx+5, hIdx+6], [hIdx+6, hIdx+7]);

  models['bain-marie'] = { vertices: bmVertices, lines: bmLines };

  return models;
})();

interface HologramViewerProps {
  activeProductIndex: number;
}

const productMetadata = [
  {
    modelKey: 'blue-pill',
    name: "Laminar Hood Board",
    category: "HARDWARE // MODULE_01",
    stats: {
      tl: "FREQ: 72.0 MHz",
      tr: "NODE: 0x4B12",
      bl: "ISO: CLASS-5",
      br: "LATENCY: 98μs"
    }
  },
  {
    modelKey: 'mixer',
    name: "Lab Mixer Rotator",
    category: "KINETICS // MODULE_02",
    stats: {
      tl: "CAN-BUS: 1Mbps",
      tr: "NODE: 0x82DC",
      bl: "SLINT GRAPHICS",
      br: "JITTER: ZERO"
    }
  },
  {
    modelKey: 'bain-marie',
    name: "PID Controller",
    category: "CONTROL // MODULE_03",
    stats: {
      tl: "INTEGRATION: CJS",
      tr: "NODE: 0x51E2",
      bl: "BUS TYPE: ETH",
      br: "RESPONSE: <1ms"
    }
  }
];

const HologramViewer: React.FC<HologramViewerProps> = ({ activeProductIndex }) => {
  const currentMetadata = productMetadata[activeProductIndex] || productMetadata[0];
  const modelKey = currentMetadata.modelKey;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Real 3D control states
  const [yaw, setYaw] = useState(0.8);
  const [pitch, setPitch] = useState(0.35);
  const [autoRot, setAutoRot] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [prevMouse, setPrevMouse] = useState({ x: 0, y: 0 });

  const yawRef = useRef(yaw);
  const pitchRef = useRef(pitch);
  const autoRotRef = useRef(autoRot);
  
  useEffect(() => {
    yawRef.current = yaw;
    pitchRef.current = pitch;
    autoRotRef.current = autoRot;
  }, [yaw, pitch, autoRot]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animId: number;
    let width = container.clientWidth;
    let height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeObserver = new ResizeObserver(() => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
    });
    resizeObserver.observe(container);

    const scaleFactor = 1.35;

    const project = (x: number, y: number, z: number, w: number, h: number) => {
      const currentYaw = yawRef.current;
      const currentPitch = pitchRef.current;

      const cosY = Math.cos(currentYaw);
      const sinY = Math.sin(currentYaw);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;

      const cosP = Math.cos(currentPitch);
      const sinP = Math.sin(currentPitch);
      const y2 = y * cosP - z1 * sinP;
      const z2 = y * sinP + z1 * cosP;

      const dist = 320;
      const scale = dist / (dist + z2);

      return {
        // Shift a bit down for nice perspective alignment
        x: (w / 2) + x1 * scale * scaleFactor,
        y: (h / 2 + 10) + y2 * scale * scaleFactor,
        scale: scale
      };
    };

    const render = () => {
      if (autoRotRef.current) {
        setYaw((prev) => prev + 0.006);
      }

      ctx.clearRect(0, 0, width, height);

      // Render concentric hologram rings
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let r = 50; r <= 220; r += 55) {
        ctx.beginPath();
        ctx.arc(width / 2, height / 2 + 60, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      const activeModel = MODELS[modelKey];
      if (activeModel) {
        // Projection Lines
        activeModel.lines.forEach((pair) => {
          const v1 = activeModel.vertices[pair[0]];
          const v2 = activeModel.vertices[pair[1]];

          if (v1 && v2) {
            const p1 = project(v1.x, v1.y, v1.z, width, height);
            const p2 = project(v2.x, v2.y, v2.z, width, height);

            ctx.beginPath();
            
            // Random glitch system offset
            let glitchOffsetX = 0;
            if (Math.random() > 0.985) {
              glitchOffsetX = (Math.random() - 0.5) * 12;
              ctx.strokeStyle = `rgba(0, 255, 159, ${Math.random() * 0.8})`;
            }

            ctx.moveTo(p1.x + glitchOffsetX, p1.y);
            ctx.lineTo(p2.x + glitchOffsetX, p2.y);

            if (glitchOffsetX === 0) {
              // High contrast aesthetic colors (Silicon Cyan and Verdigris Green)
              const coeff = Math.min(1.0, 0.2 + p1.scale * 0.8);
              ctx.strokeStyle = `rgba(0, 212, 255, ${coeff * 0.75})`;
            }
            
            ctx.lineWidth = 1.3;
            ctx.stroke();
          }
        });

        // Projection Vertices/Points
        activeModel.vertices.forEach((v) => {
          const p = project(v.x, v.y, v.z, width, height);
          
          let glitchR = 0;
          if (Math.random() > 0.99) {
             glitchR = Math.random() * 3;
          }

          ctx.fillStyle = '#00ff9f'; // Verdigris green spots
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(1, (2.2 * p.scale + glitchR)), 0, Math.PI * 2);
          ctx.fill();
        });
        
        // Scanline effect integration
        ctx.fillStyle = 'rgba(0, 212, 255, 0.025)';
        for (let i = 0; i < height; i += 4) {
          ctx.fillRect(0, i, width, 1);
        }
        
        // CRT Chromatic shift & flicker emulator
        if (Math.random() > 0.985) {
           ctx.fillStyle = 'rgba(0, 212, 255, 0.04)';
           ctx.fillRect(0, 0, width, height);
           
           ctx.globalCompositeOperation = 'screen';
           ctx.fillStyle = 'rgba(255, 0, 0, 0.06)';
           ctx.fillRect(-2, 0, width, height);
           ctx.fillStyle = 'rgba(0, 0, 255, 0.06)';
           ctx.fillRect(2, 0, width, height);
           ctx.globalCompositeOperation = 'source-over';
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, [modelKey]);

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
      let newPitch = p + deltaY * 0.012;
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
      className="relative w-full h-[450px] border border-[#00d4ff]/20 bg-[#111118] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing group select-none"
    >
      {/* Scope Lines Background Grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#00d4ff]/4 pointer-events-none z-10" />
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Technical Metric Overlays - Corner Text */}
      <div className="absolute top-4 left-4 font-mono text-[10px] tracking-wider text-[#00d4ff]/80 z-20">
        [ {currentMetadata.stats.tl} ]
      </div>
      <div className="absolute top-4 right-4 font-mono text-[10px] tracking-wider text-[#00d4ff]/80 z-20">
        [ {currentMetadata.stats.tr} ]
      </div>
      <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-wider text-[#00d4ff]/80 z-20">
        [ {currentMetadata.stats.bl} ]
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[10px] tracking-wider text-[#00ff9f]/90 z-20 animate-pulse">
        [ {currentMetadata.stats.br} ]
      </div>

      {/* Manual Controls Toolbar */}
      <div className="absolute top-12 left-4 flex gap-2 z-30">
        <button
          onClick={() => setAutoRot(prev => !prev)}
          className={`px-2 py-0.5 border text-[8px] font-mono tracking-widest uppercase cursor-pointer transition-colors ${
            autoRot 
              ? 'border-[#00ff9f]/50 bg-[#00ff9f]/10 text-[#00ff9f]' 
              : 'border-[#64748b]/30 bg-transparent text-[#64748b] hover:text-[#f8fafc]'
          }`}
        >
          {autoRot ? 'AutoRotate: ON' : 'AutoRotate: OFF'}
        </button>
        <button
          onClick={() => {
            setYaw(0.8);
            setPitch(0.35);
          }}
          className="px-2 py-0.5 border border-[#00d4ff]/30 bg-transparent hover:bg-[#00d4ff]/10 text-[#00d4ff] text-[8px] font-mono tracking-widest uppercase cursor-pointer transition-colors"
        >
          Reset View
        </button>
      </div>

      {/* Interactive 3D Canvas element */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="block w-full h-full touch-none z-10"
        style={{ filter: 'drop-shadow(0 0 12px rgba(0,212,255,0.4))' }}
      />

      {/* Drag Tutorial Highlight Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 font-mono text-[8px] tracking-[0.25em] text-[#64748b] opacity-60 pointer-events-none group-hover:opacity-100 transition-opacity duration-300">
        DRAG TO ROTATE 3D SYSTEM
      </div>

      {/* Hologram Stage Platform visual backplane */}
      <div className="absolute bottom-6 w-72 h-12 bg-gradient-to-t from-[#00d4ff]/15 to-transparent border-t border-[#00d4ff]/20 transform -rotate-x-60 rounded-full blur-[1px] z-0 opacity-60" />

      {/* Viewer Label footer */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 font-mono text-[9px] tracking-[0.2em] text-[#94a3b8]/75 uppercase pointer-events-none">
        VECTOR MODEL // ROT-{yaw.toFixed(2)}_PITCH-{pitch.toFixed(2)}
      </div>
    </div>
  );
};

export default HologramViewer;
