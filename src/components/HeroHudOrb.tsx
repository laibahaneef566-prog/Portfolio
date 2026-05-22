import React, { useRef, useEffect } from "react";

const HeroHudOrb: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999, active: false };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Green Cyber Palette
    const colors = {
      primary: "#10b981",    // Luminous mint-green
      secondary: "#10b981",  // Active bright green
      deepGreen: "#01160e",  // Faint dark green shadow
      softGreen1: "#10b981",
      softGreen2: "rgba(16, 185, 129, 0.9)",
    };

    const drawGrid = (width: number, height: number) => {
      ctx.strokeStyle = "rgba(16, 185, 129, 0.04)";
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x <= width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const drawRing = (
      centerX: number,
      centerY: number,
      radius: number,
      rotation: number,
      dash: number[],
      color: string,
      pulseSpeed: number,
      glowIntensity: number
    ) => {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.setLineDash(dash);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.2;
      
      const pulse = 0.5 + Math.sin(time * pulseSpeed) * 0.25;
      ctx.globalAlpha = pulse;

      ctx.shadowBlur = glowIntensity;
      ctx.shadowColor = color;
      
      ctx.stroke();
      ctx.restore();
    };

    const drawDots = (
      centerX: number,
      centerY: number,
      radius: number,
      count: number,
      rotation: number,
      color: string
    ) => {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        const pulse = 0.4 + Math.sin(time * 2 + i) * 0.4;
        ctx.globalAlpha = pulse;
        ctx.shadowBlur = 4;
        ctx.shadowColor = color;
        ctx.fill();
      }
      ctx.restore();
    };

    const drawMarkers = (centerX: number, centerY: number, radius: number) => {
      const markerSize = 6;
      ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        ctx.beginPath();
        ctx.moveTo(x - markerSize, y);
        ctx.lineTo(x + markerSize, y);
        ctx.moveTo(x, y - markerSize);
        ctx.lineTo(x, y + markerSize);
        ctx.stroke();
      }
    };

    const drawScanLine = (centerX: number, centerY: number, radius: number) => {
      const angle = time * 0.5;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle);
      
      // Sweep fill
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      gradient.addColorStop(0, "rgba(16, 185, 129, 0.08)");
      gradient.addColorStop(0.5, "rgba(16, 185, 129, 0.03)");
      gradient.addColorStop(1, "rgba(16, 185, 129, 0)");
      
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, -0.6, 0);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Scanning Sweep Leading Line
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(radius, 0);
      ctx.strokeStyle = "rgba(16, 185, 129, 0.85)";
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 12;
      ctx.shadowColor = colors.primary;
      ctx.stroke();
      
      ctx.restore();
    };

    const particles: { r: number; angle: number; speed: number; size: number }[] = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        r: Math.random(),
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() - 0.5) * 0.015,
        size: Math.random() * 1.5,
      });
    }

    const drawParticles = (centerX: number, centerY: number, maxRadius: number) => {
      ctx.fillStyle = "rgba(16, 185, 129, 0.6)";
      ctx.shadowBlur = 3;
      ctx.shadowColor = colors.primary;
      particles.forEach((p) => {
        p.angle += p.speed;
        const r = p.r * maxRadius;
        const x = centerX + Math.cos(p.angle) * r;
        const y = centerY + Math.sin(p.angle) * r;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.globalAlpha = 0.2 + Math.sin(time + p.angle) * 0.2;
        ctx.fill();
      });
    };

    const drawMouseReaction = (centerX: number, centerY: number) => {
      if (!mouseRef.current.active) return;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
      ctx.strokeStyle = "rgba(16, 185, 129, 0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const drawCore = (centerX: number, centerY: number) => {
      const pulse = 0.7 + Math.sin(time * 3.5) * 0.25;
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 20);
      gradient.addColorStop(0, `rgba(16, 185, 129, ${0.9 * pulse})`);
      gradient.addColorStop(0.4, `rgba(16, 185, 129, ${0.4 * pulse})`);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      
      ctx.save();
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.restore();
    };

    // Draw active labeled HUD nodes matching screenshot precisely
    const drawHudNodes = (centerX: number, centerY: number, maxR: number) => {
      ctx.shadowBlur = 0;

      // 1. NODE_01:ACTIVE (Top Left / Up Quadrant)
      const angle1 = -Math.PI / 4.5 + Math.sin(time * 0.2) * 0.01;
      const r1 = maxR * 0.58;
      const x1 = centerX + Math.cos(angle1) * r1;
      const y1 = centerY + Math.sin(angle1) * r1;

      ctx.fillStyle = "#10b981";
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#10b981";
      ctx.fillRect(x1 - 3, y1 - 3, 6, 6);
      ctx.shadowBlur = 0;

      ctx.font = "bold 9px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(16, 185, 129, 0.8)";
      ctx.fillText("NODE_01:ACTIVE", x1 + 10, y1 + 3);

      // 2. ARCH:STABLE (Bottom Left Quadrant)
      const angle2 = Math.PI - 0.55 + Math.cos(time * 0.1) * 0.01;
      const r2 = maxR * 0.48;
      const x2 = centerX + Math.cos(angle2) * r2;
      const y2 = centerY + Math.sin(angle2) * r2;

      ctx.fillStyle = "#10b981";
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#10b981";
      ctx.fillRect(x2 - 3, y2 - 3, 6, 6);
      ctx.shadowBlur = 0;

      ctx.font = "bold 9px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(16, 185, 129, 0.8)";
      ctx.fillText("ARCH:STABLE", x2 + 10, y2 + 3);

      // 3. DATA_STREAM:SYNC (Bottom Right Quadrant)
      const angle3 = 0.45 + Math.sin(time * 0.15) * 0.01;
      const r3 = maxR * 0.58;
      const x3 = centerX + Math.cos(angle3) * r3;
      const y3 = centerY + Math.sin(angle3) * r3;

      ctx.fillStyle = "#10b981";
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#10b981";
      ctx.fillRect(x3 - 3, y3 - 3, 6, 6);
      ctx.shadowBlur = 0;

      ctx.font = "bold 9px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(16, 185, 129, 0.8)";
      ctx.fillText("DATA_STREAM:SYNC", x3 + 10, y3 + 4);
    };

    const render = () => {
      time += 0.012;
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const centerX = width / 2;
      const centerY = height / 2;
      const maxR = Math.min(centerX, centerY) * 0.85;

      ctx.clearRect(0, 0, width, height);

      drawGrid(width, height);
      drawMouseReaction(centerX, centerY);

      // Concentric Rings Map
      const ringConfigs = [
        { r: 0.95, s: 0.08, d: [6, 18], c: "rgba(16, 185, 129, 0.15)", g: 4 },
        { r: 0.82, s: -0.12, d: [4, 6], c: "rgba(16, 185, 129, 0.25)", g: 6 },
        { r: 0.70, s: 0.06, d: [20, 15], c: "rgba(16, 185, 129, 0.35)", g: 8 },
        { r: 0.58, s: -0.1, d: [15, 8], c: "rgba(16, 185, 129, 0.45)", g: 10 },
        { r: 0.44, s: 0.15, d: [8, 20], c: "rgba(16, 185, 129, 0.55)", g: 6 },
        { r: 0.31, s: -0.05, d: [2, 4], c: "rgba(16, 185, 129, 0.65)", g: 4 },
      ];

      ringConfigs.forEach((cfg) => {
        drawRing(centerX, centerY, maxR * cfg.r, time * cfg.s, cfg.d, cfg.c, 1.2, cfg.g);
      });

      // Dot Rings
      drawDots(centerX, centerY, maxR * 0.82, 18, time * 0.1, "rgba(16, 185, 129, 0.35)");
      drawDots(centerX, centerY, maxR * 0.58, 12, -time * 0.15, "rgba(16, 185, 129, 0.45)");
      drawDots(centerX, centerY, maxR * 0.31, 8, time * 0.2, "rgba(16, 185, 129, 0.55)");

      drawMarkers(centerX, centerY, maxR * 0.95);
      drawScanLine(centerX, centerY, maxR * 0.95);
      drawParticles(centerX, centerY, maxR);
      drawCore(centerX, centerY);
      
      // Draw actual interactive active-sensing nodes
      drawHudNodes(centerX, centerY, maxR);

      // 1. Top Right [SCANNING_SEC_74] Label
      ctx.font = "bold 9px 'JetBrains Mono', Courier New, monospace";
      ctx.fillStyle = "rgba(16, 185, 129, 0.5)";
      ctx.fillText("[SCANNING_SEC_74]", centerX + 110, centerY - 140);

      // 2. Bottom Center [FREQ_2.4GHZ] Label
      ctx.font = "bold 9px 'JetBrains Mono', Courier New, monospace";
      ctx.fillStyle = "rgba(16, 185, 129, 0.5)";
      ctx.fillText("[FREQ_2.4GHZ]", centerX - 35, centerY + 160);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      style={{ background: "transparent" }}
    />
  );
};

export default HeroHudOrb;
