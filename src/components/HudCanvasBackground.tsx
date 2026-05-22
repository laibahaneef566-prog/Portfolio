import { useEffect, useRef } from "react";

export default function HudCanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Line configuration
    const lineSpacing = 80;
    const lines: { x: number; glowY: number; speed: number; color: string }[] = [];

    // Particle configuration
    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];
    const particleCount = 25;

    const initLines = () => {
      lines.length = 0;
      for (let x = 0; x <= width; x += lineSpacing) {
        lines.push({
          x,
          glowY: Math.random() * height,
          speed: 0.3 + Math.random() * 0.8,
          color: Math.random() > 0.4 ? "#10b981" : "#05f3a0",
        });
      }

      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.4,
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initLines();
    };

    window.addEventListener("resize", resize);
    resize();

    const draw = (time: number) => {
      const gridColor = "rgba(16, 185, 129, 0.045)"; // Very subtle, precise green-tint grid
      const lineColor = "rgba(16, 185, 129, 0.05)";
      const particleColor = "rgba(16, 185, 129,";

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Faint Horizontal Grid Lines
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      for (let y = 0; y <= height; y += 80) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw Particles
      particles.forEach((p) => {
        ctx.fillStyle = `${particleColor} ${p.opacity * 0.5})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      });

      // 3. Draw Vertical Lines & Scanning Glow
      lines.forEach((line) => {
        ctx.strokeStyle = lineColor;
        ctx.beginPath();
        ctx.moveTo(line.x, 0);
        ctx.lineTo(line.x, height);
        ctx.stroke();

        const glowHeight = 160;
        const gradient = ctx.createLinearGradient(0, line.glowY - glowHeight, 0, line.glowY + glowHeight);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.5, "rgba(16, 185, 129, 0.12)");
        gradient.addColorStop(1, "transparent");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(line.x, line.glowY - glowHeight);
        ctx.lineTo(line.x, line.glowY + glowHeight);
        ctx.stroke();

        line.glowY += line.speed;
        if (line.glowY > height + glowHeight) {
          line.glowY = -glowHeight;
          line.speed = 0.3 + Math.random() * 0.8;
        }
      });

      // 4. Subtle Ambient Corner Pulse Glowing
      const pulse = 0.08 + Math.sin(time / 2200) * 0.03;
      const drawCornerGlow = (x: number, y: number) => {
        const radius = Math.min(width, height) * 0.5;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grad.addColorStop(0, `rgba(16, 185, 129, ${pulse * 1.2})`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.globalCompositeOperation = "screen";
        ctx.fillRect(x === 0 ? 0 : x - radius, y === 0 ? 0 : y - radius, radius, radius);
        ctx.globalCompositeOperation = "source-over";
      };

      drawCornerGlow(0, 0);
      drawCornerGlow(width, 0);
      drawCornerGlow(0, height);
      drawCornerGlow(width, height);

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1] bg-black pointer-events-none transition-colors duration-700"
      style={{ display: "block" }}
    />
  );
}
