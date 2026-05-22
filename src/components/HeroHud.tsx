import { motion } from "motion/react";

export default function HeroHud() {
  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none">
      {/* Outer Glow Ring - Enhanced Contrast */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-[98%] h-[98%] border border-accent/50 rounded-full shadow-[0_0_25px_rgba(25,181,255,0.25)]"
      />

      {/* Primary Tech Ring with Notch - Sharper Cyan */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-[82%] h-[82%] border-2 border-accent/30 rounded-full border-t-[#00f5ff] border-r-transparent shadow-[inset_0_0_20px_rgba(25,181,255,0.15)]"
      />

      {/* Dashed secondary ring - More visible */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute w-[76%] h-[76%] border-[1px] border-dashed border-accent/50 rounded-full opacity-70"
        style={{ borderDasharray: "12 24" }}
      />

      {/* Holographic Scanning Line - Enhanced Glow */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute w-[72%] h-[72%] rounded-full overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[4px] h-1/2 bg-gradient-to-t from-[#00f5ff] to-transparent shadow-[0_0_20px_rgba(25,181,255,1)]" />
      </motion.div>

      {/* Middle Sharp Segmented Ring - Better definition */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute w-[58%] h-[58%] border-t-4 border-[#00f5ff]/40 border-b-4 border-l-transparent border-r-transparent rounded-full shadow-[0_0_15px_rgba(25,181,255,0.2)]"
      />
      
      {/* Floating Orbiting Nodes - Brighter */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[52%] h-[52%]"
      >
        <div className="absolute -top-1.5 -left-1.5 w-4 h-4 bg-[#00f5ff] rounded-full shadow-[0_0_15px_rgba(0,245,255,1)]" />
        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#a855f7] rounded-full shadow-[0_0_12px_rgba(168,85,247,0.8)]" />
      </motion.div>

      {/* Inner Tech Core - More impact */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-[38%] h-[38%] border border-[#00f5ff]/70 rounded-full border-t-transparent border-b-transparent shadow-[0_0_15px_rgba(0,245,255,0.4)]"
      />

      {/* Central Core Reactor - Intense Heartbeat */}
      <div className="absolute w-14 h-14 rounded-full border border-accent/30 bg-accent/10 flex items-center justify-center backdrop-blur-xl">
        <motion.div
          animate={{ 
            scale: [1, 1.3, 0.9, 1.1, 1],
            opacity: [0.8, 1, 0.8, 0.9, 0.8],
            boxShadow: [
              "0 0 20px rgba(0,245,255,0.5)",
              "0 0 40px rgba(0,245,255,1)",
              "0 0 20px rgba(0,245,255,0.5)",
              "0 0 30px rgba(0,245,255,0.8)",
              "0 0 20px rgba(0,245,255,0.5)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-6 rounded-full bg-[#00f5ff]"
        />
      </div>

      {/* Geometric accents - Sharper and more distinct */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`geo-${i}`}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 35 + i * 12, repeat: Infinity, ease: "linear" }}
          className="absolute w-[68%] h-[68%] opacity-50"
        >
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#00f5ff] shadow-[0_0_12px_rgba(0,245,255,1)]"
            style={{ transform: `rotate(${i * 120}deg) translateY(-100%)` }}
          />
        </motion.div>
      ))}

      {/* Digital Particles/Dots - Saturated and visible */}
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            rotate: 360,
            opacity: [0.3, 0.9, 0.3],
          }}
          transition={{
            rotate: { duration: 12 + i * 4, repeat: Infinity, ease: "linear" },
            opacity: { duration: 2.5 + Math.random() * 2, repeat: Infinity, delay: i * 0.15 },
          }}
          className="absolute w-full h-full"
        >
          <div 
            className="absolute bg-[#00f5ff] w-1.5 h-1.5 rounded-full shadow-[0_0_10px_rgba(0,245,255,1)]"
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
          />
        </motion.div>
      ))}

      {/* Futuristic Labels - Sharper Contrast */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-[8%] right-[8%] flex flex-col items-end"
      >
        <span className="text-[9px] font-mono text-[#00f5ff] font-bold tracking-widest">SYS.CONNECTED</span>
        <div className="w-20 h-[1.5px] bg-[#00f5ff]/60 shadow-[0_0_8px_rgba(0,245,255,0.5)]" />
      </motion.div>
      
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        className="absolute bottom-[8%] left-[8%] flex flex-col items-start"
      >
        <div className="w-20 h-[1.5px] bg-[#00f5ff]/60 shadow-[0_0_8px_rgba(0,245,255,0.5)]" />
        <span className="text-[9px] font-mono text-[#a855f7] font-bold tracking-widest">PROTOCOL.0XF_EST</span>
      </motion.div>
    </div>
  );
}
