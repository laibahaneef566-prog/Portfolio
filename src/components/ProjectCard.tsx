import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  key?: React.Key;
  title: string;
  desc: string;
  tags: string[];
  cta: string;
  gradient: string;
  avatars: string[];
  index: number;
}

export default function ProjectCard({ 
  title, 
  desc, 
  tags, 
  cta, 
  avatars, 
  index 
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-4, 4]), { stiffness: 300, damping: 30 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.93, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -10, 
        scale: 1.015,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.6, 
        ease: "easeOut" 
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="rotating-border-card relative cursor-pointer group shadow-2xl shadow-black"
    >
      <div className="relative h-[370px] w-full p-8 transition-all duration-300 bg-[#020c08]/85 backdrop-blur-md rounded-2xl">
        {/* Subtle matrix-like green radial glow overlay */}
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#10b981]/5 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-white/[0.01] rounded-full blur-2xl opacity-30 pointer-events-none" />
        
        {/* Glass effect */}
        <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />
 
        <div className="relative z-10 flex flex-col h-full w-full bg-transparent">
          {/* Header info */}
          <div className="flex justify-between items-start mb-6 w-full">
            <div className="flex flex-col flex-1 pl-1">
              <h3 className="text-2xl sm:text-3xl font-sans font-black bg-gradient-to-r from-white via-[#10b981] to-white bg-clip-text text-transparent mb-2 tracking-tight">
                {title}
              </h3>
              <p className="text-white/70 text-xs sm:text-sm font-normal max-w-[90%] leading-relaxed">
                {desc}
              </p>
            </div>
            <motion.div 
              whileHover={{ rotate: 45, scale: 1.05 }}
              className="w-10 h-10 rounded-full bg-[#10b981] border border-[#10b981]/25 flex items-center justify-center text-black shadow-lg hover:bg-white transition-colors duration-300 shrink-0"
            >
              <ArrowUpRight size={20} strokeWidth={2.5} />
            </motion.div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-auto pl-1">
            {tags.map((tag, tid) => (
              <span key={tid} className="px-3 py-1.5 bg-[#10b981]/10 border border-[#10b981]/20 rounded-full font-mono text-[9px] uppercase tracking-wider text-[#10b981] shadow-sm font-bold transition-all duration-300 hover:border-[#10b981]/60 hover:bg-[#10b981]/20">
                {tag}
              </span>
            ))}
          </div>
          
          {/* Bottom section */}
          <div className="flex items-center justify-between mt-auto pt-5 border-t border-[#10b981]/15 pl-1">
            <div className="flex items-center -space-x-2.5">
              {avatars.map((avatar, aid) => (
                <div key={aid} className="w-9 h-9 rounded-full border border-[#10b981]/20 bg-[#020c08] flex items-center justify-center text-xs shadow-sm overflow-hidden text-[#10b981] font-extrabold">
                  {avatar === "UI" ? (
                    <span className="text-[10px] font-bold text-white">UI</span>
                  ) : (
                    avatar
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-2 group/cta pr-1 select-none">
              <span className="text-white group-hover:text-[#10b981] font-bold font-mono text-[11px] uppercase tracking-widest transition-colors duration-300">{cta}</span>
              <motion.div 
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-[#10b981]"
              />
            </div>
          </div>
        </div>
  
        {/* Subtle ambient lighting edge shines */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#10b981]/5 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
}
