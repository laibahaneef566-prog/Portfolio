import React from "react";
import { motion } from "motion/react";

interface CosmicButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  variant?: "solid" | "outline";
}

const CosmicButton: React.FC<CosmicButtonProps> = ({ 
  label, 
  onClick, 
  className = "", 
  variant = "solid" 
}) => {
  const isSolid = variant === "solid";

  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`relative font-mono font-bold text-xs uppercase tracking-[0.2em] px-8 py-4.5 rounded-[10px] cursor-pointer transition-all duration-300 select-none ${
        isSolid 
          ? "bg-[#10b981] text-[#000000] shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.5)] hover:bg-[#20e098]" 
          : "bg-transparent text-white border border-white/25 hover:border-[#10b981] hover:text-[#10b981] shadow-md"
      } ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {label}
      </span>
      {isSolid && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_3.5s_infinite_linear] pointer-events-none rounded-[10px]" />
      )}
    </motion.button>
  );
};

export default CosmicButton;
