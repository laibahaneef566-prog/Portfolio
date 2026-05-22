import { motion, useMotionValue, useSpring } from "motion/react";
import React, { useRef } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "send" | "download";
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, variant = "primary", className = "", onClick }: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.35);
    y.set((e.clientY - centerY) * 0.35);
  };

  const styles = {
    primary: "bg-[#10b981] text-black shadow-[0_4px_15px_rgba(16,185,129,0.25)] border border-transparent hover:bg-[#20e098]",
    secondary: "bg-transparent text-[#10b981] border border-[#10b981]/30 hover:bg-[#10b981]/10 hover:border-[#10b981]",
    send: "bg-[#10b981] text-black shadow-[0_4px_15px_rgba(16,185,129,0.25)] border border-transparent hover:bg-[#20e098]",
    download: "bg-transparent text-white border border-white/20 hover:border-[#10b981] hover:text-[#10b981]"
  };

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={`
        relative px-10 py-5 rounded-full font-mono text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer
        ${styles[variant]}
        ${className}
      `}
    >
      <span className="relative z-10 flex items-center justify-center gap-3">
        {children}
      </span>
    </motion.button>
  );
}
