import { useEffect, useRef } from 'react';

interface PCBTrace {
  points: { x: number; y: number }[];
  color: string;
  width: number;
  pulseProgress: number;
  parallaxFactor: number; // Multi-layer depth factor, e.g. 0.15, 0.35, 0.6
}

export default function PCBBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let staticTraces: PCBTrace[] = [];

    // Interactive mouse tracking closed states
    const mouse = { x: -1000, y: -1000, px: -1000, py: -1000, active: false };
    const ripples: { x: number; y: number; r: number; maxR: number; opacity: number; color: string }[] = [];
    const interactiveTraces: { points: { x: number; y: number }[]; color: string; progress: number; width: number; parallaxFactor: number }[] = [];

    // Telemetry label elements and floating packets
    const labels = ["0x3F", "0xFF", "TX", "RX", "BUS", "GATE", "SYS", "CLK", "PID", "DMA", "ISO5", "CJS", "RST", "VCC", "GND", "STM32"];
    const dataPackets: {
      x: number;
      y: number;
      text: string;
      speedY: number;
      speedX: number;
      opacity: number;
      color: string;
      size: number;
      parallaxFactor: number;
      angleOffset: number;
    }[] = [];

    // Smooth scroll position state tracking
    const scrollState = {
      targetY: 0,
      currentY: 0,
      progress: 0, // 0 to 1 scroll position
    };

    const compilePCBLayout = () => {
      staticTraces = [];
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;

      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      const adjustX = (xVal: number) => isRtl ? (w - xVal) : xVal;

      function addParallelBus(startX: number, startY: number, count: number, spacing: number, directions: any[], color = '#00ff9f', depth = 0.25) {
        // Compute master path
        const masterPts: { x: number; y: number }[] = [];
        let curX = startX;
        let curY = startY;
        masterPts.push({ x: curX, y: curY });
        
        for (const seg of directions) {
          const rad = (seg.angle * Math.PI) / 180;
          curX += seg.length * Math.cos(rad);
          curY += seg.length * Math.sin(rad);
          masterPts.push({ x: curX, y: curY });
        }

        // Generate parallel traces 
        for (let i = 0; i < count; i++) {
          const offset = (i - (count - 1) / 2) * spacing; // Centered
          const pts: { x: number; y: number }[] = [];
          
          for (let j = 0; j < masterPts.length; j++) {
             // For start point
             if (j === 0) {
                 const dx = masterPts[1].x - masterPts[0].x;
                 const dy = masterPts[1].y - masterPts[0].y;
                 const len = Math.hypot(dx, dy);
                 const nx = -dy / len;
                 const ny = dx / len;
                 pts.push({ x: masterPts[0].x + nx * offset, y: masterPts[0].y + ny * offset });
             } 
             // For end point
             else if (j === masterPts.length - 1) {
                 const dx = masterPts[j].x - masterPts[j-1].x;
                 const dy = masterPts[j].y - masterPts[j-1].y;
                 const len = Math.hypot(dx, dy);
                 const nx = -dy / len;
                 const ny = dx / len;
                 pts.push({ x: masterPts[j].x + nx * offset, y: masterPts[j].y + ny * offset });
             } 
             // For intermediate points (calculate miter joint)
             else {
                 const dx1 = masterPts[j].x - masterPts[j-1].x;
                 const dy1 = masterPts[j].y - masterPts[j-1].y;
                 const len1 = Math.hypot(dx1, dy1);
                 const n1x = -dy1 / len1;
                 const n1y = dx1 / len1;

                 const dx2 = masterPts[j+1].x - masterPts[j].x;
                 const dy2 = masterPts[j+1].y - masterPts[j].y;
                 const len2 = Math.hypot(dx2, dy2);
                 const n2x = -dy2 / len2;
                 const n2y = dx2 / len2;

                 let mix = n1x + n2x;
                 let miy = n1y + n2y;
                 const mLen = Math.hypot(mix, miy);
                 
                 if (mLen < 0.00001) {
                     pts.push({ x: masterPts[j].x + n1x * offset, y: masterPts[j].y + n1y * offset });
                 } else {
                     mix /= mLen;
                     miy /= mLen;
                     const dot = mix * n1x + miy * n1y;
                     const miterLen = offset / dot;
                     pts.push({ x: masterPts[j].x + mix * miterLen, y: masterPts[j].y + miy * miterLen });
                 }
             }
          }
          
          const adjustedPts = pts.map(p => ({ x: adjustX(p.x), y: p.y }));

          staticTraces.push({
            points: adjustedPts,
            color: color, 
            width: 1.2,
            pulseProgress: Math.random(),
            parallaxFactor: depth + (i * 0.008) // Slight depth curving across the bus
          });
        }
      }

      // Distribute cohesive bus grids and random tracks across the entire scrollable page height
      const virtualH = Math.max(document.documentElement?.scrollHeight || h * 4, 4000);
      const tierCount = Math.ceil(virtualH / 400); // Create a new systematic PCB cluster tier every 400px of height
      const gridUnit = 40; // 40px grid spacing for professional PCB routing channels

      for (let t = 0; t < tierCount; t++) {
        const tierY = t * 400;
        const shiftX = (t % 3) * 40; // Snapped offset increments

        // 1. Procedural Left Multi-lane Data Bus - snapped to 40px grid!
        const bus1Count = 4; // Consistent bus widths (always 4 lanes)
        const bus1StartX = Math.round((w * 0.08) / gridUnit) * gridUnit;
        const bus1StartY = Math.round((tierY + 40) / gridUnit) * gridUnit;
        const bus1DiagLen = gridUnit * Math.sqrt(2); 

        addParallelBus(
          bus1StartX + shiftX,
          bus1StartY,
          bus1Count,
          10, // Close neat trace spacing
          [
            { angle: 90, length: gridUnit * 3 },
            { angle: 135, length: bus1DiagLen },
            { angle: 90, length: gridUnit * 4 }
          ],
          t % 3 === 0 ? '#ff7f41' : t % 3 === 1 ? '#d9531e' : '#eab308',
          0.15 + (t % 3) * 0.15
        );

        // 2. Procedural Right High-Speed Differential Bus Lanes - snapped to 40px grid!
        const bus2StartX = Math.round((w * 0.82) / gridUnit) * gridUnit;
        const bus2StartY = Math.round((tierY + 160) / gridUnit) * gridUnit;
        const bus2DiagLen = gridUnit * Math.sqrt(2);

        addParallelBus(
          bus2StartX - shiftX,
          bus2StartY,
          2, // Strictly differential pairs (2 matched lanes)
          12, // High-performance matched pair trace spacing
          [
            { angle: 90, length: gridUnit * 2 },
            { angle: 135, length: bus2DiagLen },
            { angle: 90, length: gridUnit * 3 }
          ],
          t % 2 === 0 ? '#d9531e' : '#ff7f41',
          0.15 + (t % 2) * 0.15
        );

        // 3. Central horizontal/lateral interconnect buses - snapped!
        const intStartX = Math.round((w * (t % 2 === 0 ? 0.32 : 0.6)) / gridUnit) * gridUnit;
        const intStartY = Math.round((tierY + 240) / gridUnit) * gridUnit;
        const intDiagLen = gridUnit * Math.sqrt(2);
        
        if (t % 2 === 0) {
          addParallelBus(
            intStartX,
            intStartY,
            3, // Clean 3-lane group
            10,
            [
              { angle: 0, length: gridUnit * 2 },
              { angle: 45, length: intDiagLen },
              { angle: 0, length: gridUnit * 2 }
            ],
            '#ff7f41',
            0.30
          );
        } else {
          addParallelBus(
            intStartX,
            intStartY,
            3, // Clean 3-lane group
            10,
            [
              { angle: 180, length: gridUnit * 2 },
              { angle: 135, length: intDiagLen },
              { angle: 180, length: gridUnit * 2 }
            ],
            '#eab308',
            0.30
          );
        }
      }

      // 4. Procedural Organic, Grid-aligned PCB tracks (extremely ordered EDA/CAD routing)
      const scatterCount = 18 + Math.floor(w / 100);

      for (let s = 0; s < scatterCount; s++) {
        // Find a random coordinate and snap coordinates to the 40px grid spacing bounds
        const rawSx = Math.random() * w;
        const rawSy = Math.random() * (virtualH - 200) + 100;
        
        const sx = Math.round(rawSx / gridUnit) * gridUnit;
        const sy = Math.round(rawSy / gridUnit) * gridUnit;

        const colors = ['#ff7f41', '#d9531e', '#eab308'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        // Strict PCB Rules: start orthogonal, 45 degree chamfer, resume orthogonal
        const isHorizontal = Math.random() > 0.5;
        const initialAngle = isHorizontal ? (Math.random() > 0.5 ? 0 : 180) : (Math.random() > 0.5 ? 90 : 270);
        
        // 45 degree chamfer direction (either +45 or -45)
        const turnRight = Math.random() > 0.5;
        const chamferAngle = (initialAngle + (turnRight ? 45 : 315)) % 360;
        
        // Final direction must be orthogonal
        // If it turned +45, it can continue to +90. If it turned -45, it can continue to -90 (-90 is 270)
        // Or it could return back to initial Angle (e.g. 0 -> 45 -> 0)
        const returnToInitial = Math.random() > 0.5;
        const finalAngle = returnToInitial 
           ? initialAngle 
           : (initialAngle + (turnRight ? 90 : 270)) % 360;

        // Diagonal length must be a multiple of gridUnit * Math.sqrt(2) to snap correctly on both coordinates
        const diagonalMultiplier = 1 + Math.floor(Math.random() * 2); // 1 or 2 grid units diagonal sweep
        const diagLen = diagonalMultiplier * gridUnit * Math.sqrt(2);
        
        const orthoMultiplier1 = 1 + Math.floor(Math.random() * 3);
        const l1 = orthoMultiplier1 * gridUnit;

        const orthoMultiplier2 = 1 + Math.floor(Math.random() * 3);
        const l2 = orthoMultiplier2 * gridUnit;

        const segmentDirections = [
          { angle: initialAngle, length: l1 },
          { angle: chamferAngle, length: diagLen },
          { angle: finalAngle, length: l2 }
        ];

        const depth = 0.15 + (s % 3) * 0.15; // Structured parallax depth layers: 0.15, 0.30, 0.45

        const pts: { x: number; y: number }[] = [];
        let curX = sx;
        let curY = sy;
        pts.push({ x: adjustX(curX), y: curY });

        for (const seg of segmentDirections) {
          let angle = seg.angle;
          if (isRtl) {
            angle = (180 - angle + 360) % 360;
          }
          const rad = (angle * Math.PI) / 180;
          // Apply high precision grid rounding
          curX = Math.round((curX + seg.length * Math.cos(rad)) / 5) * 5;
          curY = Math.round((curY + seg.length * Math.sin(rad)) / 5) * 5;
          pts.push({ x: adjustX(curX), y: curY });
        }

        staticTraces.push({
          points: pts,
          color: color,
          width: 1.2, // Clean, uniform line density
          pulseProgress: Math.random(),
          parallaxFactor: depth
        });
      }
    };

    // Scroll listener updates
    const handleScroll = () => {
      scrollState.targetY = window.scrollY;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      scrollState.progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    };

    // User Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!mouse.active) {
        mouse.px = e.clientX;
        mouse.py = e.clientY;
        mouse.active = true;
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleWindowClick = (e: MouseEvent) => {
      // Create expand wave ripple effect
      const colors = ['#ff7f41', '#d9531e', '#eab308'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        r: 0,
        maxR: 120,
        opacity: 0.8,
        color: randomColor
      });

      // Spawn 3 branched coordinates connecting 90-degree lines
      const angles = [0, 90, 180, 270];
      const selectedAngles = angles.sort(() => 0.5 - Math.random()).slice(0, 3);
      
      selectedAngles.forEach((angle) => {
        const rad = (angle * Math.PI) / 180;
        const len1 = 40 + Math.random() * 40;
        const len2 = 50 + Math.random() * 60;
        const branchAngle = angle + (Math.random() > 0.5 ? 90 : -90);
        const radBranch = (branchAngle * Math.PI) / 180;

        const pt1 = { x: e.clientX, y: e.clientY };
        const pt2 = { x: e.clientX + len1 * Math.cos(rad), y: e.clientY + len1 * Math.sin(rad) };
        const pt3 = { x: pt2.x + len2 * Math.cos(radBranch), y: pt2.y + len2 * Math.sin(radBranch) };

        interactiveTraces.push({
          points: [pt1, pt2, pt3],
          color: randomColor,
          progress: 0,
          width: 1.5,
          parallaxFactor: 0.35 // Exist in comfortable mid-board space
        });
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth scroll interpolation (Lerp)
      scrollState.currentY += (scrollState.targetY - scrollState.currentY) * 0.08;

      // Apply dynamic CSS filter properties to the canvas based on scroll depth
      if (canvasRef.current) {
        const hueShift = scrollState.progress * 25; // Shift colors slightly in copper/amber spectrum
        const saturateBoost = 100 + scrollState.progress * 45; // Boost saturation lower down
        const brightnessBoost = 100 + scrollState.progress * 10; // Moderately brighten the traces deep down
        canvasRef.current.style.filter = `hue-rotate(${hueShift}deg) saturate(${saturateBoost}%) brightness(${brightnessBoost}%)`;
      }

      // 1. Draw Scroll-reactive Ambient Atmosphere radial backlight glow
      const pct = scrollState.progress;
      const glowX = canvas.width * (0.3 + pct * 0.4);
      const glowY = canvas.height * (0.2 + (1 - pct) * 0.6);
      
      let glowR = 255;
      let glowG = 127;
      let glowB = 65;
      // Ambient morphing transitions depending on active screen view level
      if (pct < 0.5) {
        const factor = pct * 2;
        glowR = Math.floor(255 * (1 - factor) + 217 * factor); 
        glowG = Math.floor(127 * (1 - factor) + 83 * factor);
        glowB = Math.floor(65 * (1 - factor) + 30 * factor);
      } else {
        const factor = (pct - 0.5) * 2;
        glowR = Math.floor(217 * (1 - factor) + 234 * factor);
        glowG = Math.floor(83 * (1 - factor) + 179 * factor);
        glowB = Math.floor(30 * (1 - factor) + 8 * factor);
      }
      
      const ambientGlow = ctx.createRadialGradient(glowX, glowY, 40, glowX, glowY, 450 + pct * 150);
      ambientGlow.addColorStop(0, `rgba(${glowR}, ${glowG}, ${glowB}, 0.05)`);
      ambientGlow.addColorStop(0.5, `rgba(${glowR}, ${glowG}, ${glowB}, 0.015)`);
      ambientGlow.addColorStop(1, 'rgba(11, 9, 8, 0)');
      
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Dual-Layer Technical blueprint grid overlay - Scrolls vertically with varied parallax multipliers!
      
      // Layer A: Deep grid (extremely faint, crawls slowly for distant perspective)
      const stepDeep = 90;
      const gridDeepOffset = (scrollState.currentY * 0.05) % stepDeep;
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.007)';
      ctx.lineWidth = 0.5;

      for (let x = 0; x < canvas.width; x += stepDeep) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = -stepDeep; y < canvas.height + stepDeep; y += stepDeep) {
        const displacedY = y - gridDeepOffset;
        ctx.beginPath();
        ctx.moveTo(0, displacedY);
        ctx.lineTo(canvas.width, displacedY);
        ctx.stroke();
      }

      // Layer B: Midgrid (higher frequency grid lines, scrolls slightly faster to pop foreground)
      const stepMid = 45;
      const gridMidOffset = (scrollState.currentY * 0.12) % stepMid;
      ctx.strokeStyle = 'rgba(0, 255, 159, 0.011)';
      ctx.lineWidth = 0.5;

      for (let x = 0; x < canvas.width; x += stepMid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = -stepMid; y < canvas.height + stepMid; y += stepMid) {
        const displacedY = y - gridMidOffset;
        ctx.beginPath();
        ctx.moveTo(0, displacedY);
        ctx.lineTo(canvas.width, displacedY);
        ctx.stroke();
      }

      // 1.5 Periodically spawn floating digital coordinate telemetry packets
      if (Math.random() > 0.94 && dataPackets.length < 35) {
        const colors = ['#ff7f41', '#d9531e', '#eab308'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        dataPackets.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 40,
          text: labels[Math.floor(Math.random() * labels.length)],
          speedY: 0.5 + Math.random() * 0.8,
          speedX: (Math.random() - 0.5) * 0.4,
          opacity: 0.15 + Math.random() * 0.35,
          color: randomColor,
          size: 7 + Math.random() * 4,
          parallaxFactor: 0.1 + Math.random() * 0.45,
          angleOffset: Math.random() * Math.PI * 2
        });
      }

      // Render floating digital telemetry packets
      for (let i = dataPackets.length - 1; i >= 0; i--) {
        const p = dataPackets[i];
        
        // Displaced coordinate factoring in vertical parallax scroll
        const dy = p.y - (scrollState.currentY * p.parallaxFactor);
        
        // Move upward and wobble
        p.y -= p.speedY;
        p.x += Math.sin(p.angleOffset) * 0.25;
        p.angleOffset += 0.015;

        // If off the top of screen with displacement, or faded, or off screen sides
        if (dy < -50 || p.x < -50 || p.x > canvas.width + 50) {
          dataPackets.splice(i, 1);
          continue;
        }

        // Proximity flare check with mouse cursor
        let forceX = 0;
        let forceY = 0;
        let proximityGlow = 0;
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const mdy = mouse.y - dy;
          const dist = Math.sqrt(dx * dx + mdy * mdy);
          if (dist < 100) {
            const force = (100 - dist) / 100;
            // Push away
            forceX = -(dx / dist) * force * 3;
            forceY = -(mdy / dist) * force * 3;
            proximityGlow = force * 0.5;
          }
        }

        // Interpolate smooth movement adjustments from mouse interaction force
        p.x += forceX;
        p.y += forceY;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity + proximityGlow;
        ctx.font = `${p.size}px "JetBrains Mono", monospace`;
        
        // Add a micro leader dot/via next to the text
        ctx.beginPath();
        ctx.arc(p.x - 6, dy - p.size / 2.5, 1.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillText(p.text, p.x, dy);
        
        // If hovered closely, draw a sub-coordinate address
        if (proximityGlow > 0.2) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.font = '6px "JetBrains Mono", monospace';
          ctx.fillText(`ADDR:${p.x.toFixed(0)}`, p.x, dy + 8);
        }

        ctx.globalAlpha = 1.0;
      }

      // Render ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.r += 2.5; 
        r.opacity -= 0.015; 

        if (r.opacity <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = r.color;
        ctx.globalAlpha = r.opacity;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(r.x, r.y - (scrollState.currentY * 0.35), r.r, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(r.x, r.y - (scrollState.currentY * 0.35), r.r * 0.7, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1.0;
      }

      // Render interactive traces spawned from clicks (with scroll tracking)
      for (let i = interactiveTraces.length - 1; i >= 0; i--) {
        const trace = interactiveTraces[i];
        trace.progress += 0.012; 

        if (trace.progress >= 1) {
          interactiveTraces.splice(i, 1);
          continue;
        }

        const pts = trace.points;
        const segmentCount = pts.length - 1;
        const drawLen = segmentCount * trace.progress;
        
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y - (scrollState.currentY * trace.parallaxFactor));
        
        let lastX = pts[0].x;
        let lastY = pts[0].y - (scrollState.currentY * trace.parallaxFactor);

        for (let j = 0; j < segmentCount; j++) {
          const ptA = pts[j];
          const ptB = pts[j + 1];
          const segProgress = drawLen - j;

          const displacedAY = ptA.y - (scrollState.currentY * trace.parallaxFactor);
          const displacedBY = ptB.y - (scrollState.currentY * trace.parallaxFactor);

          if (segProgress >= 1) {
            ctx.lineTo(ptB.x, displacedBY);
            lastX = ptB.x;
            lastY = displacedBY;
          } else if (segProgress > 0) {
            const x = ptA.x + (ptB.x - ptA.x) * segProgress;
            const y = displacedAY + (displacedBY - displacedAY) * segProgress;
            ctx.lineTo(x, y);
            lastX = x;
            lastY = y;
            break;
          } else {
            break;
          }
        }

        ctx.strokeStyle = trace.color;
        ctx.lineWidth = trace.width;
        ctx.stroke();

        // Glowing pulse head
        ctx.beginPath();
        ctx.arc(lastX, lastY, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#f8fafc';
        ctx.shadowColor = trace.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Render native static traces with vertical parallax layering
      staticTraces.forEach(trace => {
        if (trace.points.length === 0) return;

        // Apply scroll-displace layer offset to tracing points
        const scrolledPts = trace.points.map(pt => ({
          x: pt.x,
          y: pt.y - (scrollState.currentY * trace.parallaxFactor)
        }));

        // Check if trace exists on screen bounds currently
        const onscreen = scrolledPts.some(pt => pt.y >= -150 && pt.y <= canvas.height + 150);
        if (!onscreen) return;

        // Calculate analog proximity of trace to current mouse pointer coordinate (smooth fade 0.0 to 1.0)
        let minDist = 99999;
        if (mouse.active) {
          scrolledPts.forEach(pt => {
            const dx = pt.x - mouse.x;
            const dy = pt.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < minDist) {
              minDist = dist;
            }
          });
        }
        
        // Define a smooth proximity hover bubble with active bounds of 160px
        const proximityFactor = mouse.active ? Math.max(0, 1 - minDist / 160) : 0;

        ctx.beginPath();
        ctx.moveTo(scrolledPts[0].x, scrolledPts[0].y);
        for (let j = 1; j < scrolledPts.length; j++) {
          ctx.lineTo(scrolledPts[j].x, scrolledPts[j].y);
        }
        
        // Deep copper glow shadow pipeline
        ctx.strokeStyle = 'rgba(7, 7, 10, 0.5)';
        ctx.lineWidth = 6;
        ctx.stroke();

        // Dynamic trace glow styling based both on scroll progress and mouse distance factor
        const coreTraceColor = trace.color;
        const glowAlpha = 0.08 + (scrollState.progress * 0.06) + (proximityFactor * 0.22);
        
        ctx.strokeStyle = coreTraceColor === '#d9531e' 
          ? `rgba(217, 83, 30, ${glowAlpha})` 
          : coreTraceColor === '#eab308' 
          ? `rgba(234, 179, 8, ${glowAlpha})` 
          : `rgba(255, 127, 65, ${glowAlpha})`;

        ctx.lineWidth = 3 + proximityFactor * 3.5 + scrollState.progress * 1.5;
        ctx.stroke();

        ctx.strokeStyle = coreTraceColor;
        ctx.lineWidth = trace.width * (1 + proximityFactor * 0.5 + scrollState.progress * 0.3);
        ctx.stroke();

        // Terminal Via Nodes/Pads
        const lastPoint = scrolledPts[scrolledPts.length - 1];
        const padRadius = 5.5 + proximityFactor * 2.5 + scrollState.progress * 1.5;

        ctx.beginPath();
        ctx.arc(lastPoint.x, lastPoint.y, padRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#0b0908'; 
        ctx.strokeStyle = coreTraceColor; 
        ctx.lineWidth = 2 + proximityFactor * 1.5 + scrollState.progress * 0.8; 
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(lastPoint.x, lastPoint.y, 1.8 + proximityFactor * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = coreTraceColor;
        ctx.fill();

        // Signal Pulse logic
        // As you scroll or approach with mouse cursors, speed up impulses
        const scrollDelta = Math.abs(scrollState.targetY - scrollState.currentY);
        const pulseIncrement = 0.001 
          + (proximityFactor * 0.002) 
          + Math.min(scrollDelta * 0.0001, 0.002) 
          + (scrollState.progress * 0.0015);
        
        trace.pulseProgress += pulseIncrement;
        if (trace.pulseProgress >= 1) trace.pulseProgress = 0;

        const segmentCount = scrolledPts.length - 1;
        const progressPerSegment = 1 / segmentCount;
        const currentSegment = Math.min(
            Math.floor(trace.pulseProgress / progressPerSegment),
            segmentCount - 1
        );
        const segmentProgress = (trace.pulseProgress % progressPerSegment) / progressPerSegment;

        const ptA = scrolledPts[currentSegment];
        const ptB = scrolledPts[currentSegment + 1];

        if (ptA && ptB) {
          const pulseX = ptA.x + (ptB.x - ptA.x) * segmentProgress;
          const pulseY = ptA.y + (ptB.y - ptA.y) * segmentProgress;

          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 2.0 + proximityFactor * 1.2 + scrollState.progress * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = '#f8fafc'; 
          ctx.shadowColor = coreTraceColor;
          ctx.shadowBlur = 5 + proximityFactor * 7 + scrollState.progress * 4;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Render modern technical HUD Scope target centered at current mouse pointer
      if (mouse.active) {
        // Smooth positioning transition via lerp
        mouse.px += (mouse.x - mouse.px) * 0.12;
        mouse.py += (mouse.y - mouse.py) * 0.12;
        
        const mx = mouse.px;
        const my = mouse.py;

        // Circular sweep reticles
        ctx.strokeStyle = 'rgba(255, 127, 65, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mx, my, 18, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(255, 127, 65, 0.05)';
        ctx.beginPath();
        ctx.arc(mx, my, 40, 0, Math.PI * 2);
        ctx.stroke();

        // Horizontal and vertical scope cross ticks
        ctx.strokeStyle = 'rgba(217, 83, 30, 0.3)';
        ctx.beginPath();
        // Top tick
        ctx.moveTo(mx, my - 28); ctx.lineTo(mx, my - 18);
        // Bottom tick
        ctx.moveTo(mx, my + 18); ctx.lineTo(mx, my + 28);
        // Left tick
        ctx.moveTo(mx - 28, my); ctx.lineTo(mx - 18, my);
        // Right tick
        ctx.moveTo(mx + 18, my); ctx.lineTo(mx + 28, my);
        ctx.stroke();

        // Technical coordinate readouts tag overlay
        ctx.fillStyle = 'rgba(255, 127, 65, 0.5)';
        ctx.font = '8px "JetBrains Mono", monospace';
        ctx.fillText(`SYS_COORD: [ ${mx.toFixed(0)}X , ${my.toFixed(0)}Y ]`, mx + 24, my + 4);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    compilePCBLayout();
    render();

    window.addEventListener('resize', compilePCBLayout);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('resize', compilePCBLayout);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleWindowClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      id="pcbBackgroundCanvas" 
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-45"
    />
  );
}
