import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import React, { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface FuturisticCtaButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export default function FuturisticCtaButton({ text, onClick, className = "" }: FuturisticCtaButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  // Magnetic effect values
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
    // Magnetic pull
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setRipples((prev) => [...prev, { x, y, id: Date.now() }]);
    }
    if (onClick) onClick();
  };

  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ x: springX, y: springY }}
      className={`
        relative group px-14 py-6 rounded-full font-sans font-bold text-white 
        tracking-wide text-lg overflow-hidden transition-all duration-300
        ${className}
      `}
    >
      {/* 1. Background - Futuristic Glassmorphism/Gradient */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-colors duration-500" />
      <motion.div 
        animate={{ 
          background: isHovered 
            ? "linear-gradient(135deg, #412D15 0%, #E1DCC9 100%)" 
            : "linear-gradient(135deg, #1F150C 0%, #000000 100%)"
        }}
        className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* 2. Border Glow & Animated Sweep */}
      <div className="absolute inset-0 rounded-full border border-[#412D15]/60 group-hover:border-[#E1DCC9]/40 transition-colors duration-500" />
      <motion.div 
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0%,rgba(65,45,21,0.3)_25%,transparent_50%,rgba(225,220,201,0.3)_75%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />

      {/* 3. Shimmer Light Sweep */}
      <motion.div
        animate={{ x: ['-200%', '200%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-[#E1DCC9]/10 to-transparent skew-x-[-25deg] pointer-events-none"
      />

      {/* 4. Particle Sparks (Micro-particles) */}
      <AnimatePresence>
        {isHovered && Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 0], 
              scale: [0, 1, 0],
              x: (Math.random() - 0.5) * 100,
              y: (Math.random() - 0.5) * 80
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1 + Math.random(), 
              repeat: Infinity, 
              delay: Math.random() * i * 0.2 
            }}
            className="absolute left-1/2 top-1/2 w-1 h-1 bg-[#E1DCC9] rounded-full blur-[1px] pointer-events-none"
          />
        ))}
      </AnimatePresence>

      {/* 5. Ripple Effect on Click */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bg-[#E1DCC9]/30 rounded-full pointer-events-none"
            style={{ 
              left: ripple.x, 
              top: ripple.y, 
              width: 20, 
              height: 20, 
              marginLeft: -10, 
              marginTop: -10 
            }}
          />
        ))}
      </AnimatePresence>

      {/* 6. Content */}
      <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-black transition-colors">
        <span className="relative">
          {text}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-[#E1DCC9] origin-left"
          />
        </span>
        <motion.div
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <ArrowRight size={22} className="group-hover:text-black transition-colors" />
        </motion.div>
      </span>

      {/* 7. Hover Glow Shadow */}
      <div className="absolute inset-0 rounded-full group-hover:shadow-[0_0_40px_rgba(225,220,201,0.4)] transition-all duration-500 -z-10" />
      
      {/* 8. Pulsing Ambient Glow */}
      <motion.div 
        animate={{ 
          opacity: isHovered ? 0.3 : [0.1, 0.2, 0.1],
          scale: [0.95, 1.05, 0.95]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[#412D15]/20 blur-2xl rounded-full -z-20 pointer-events-none"
      />
    </motion.button>
  );
}
