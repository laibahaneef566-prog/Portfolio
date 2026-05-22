import { motion } from "motion/react";

/**
 * LiquidWaveBackground Component
 * Creates a premium, futuristic, animated liquid aurora background.
 * Optimized for performance with GPU-accelerated motion layers.
 */
export default function LiquidWaveBackground() {
  return (
    <div className="fixed inset-0 z-[-1] bg-black overflow-hidden pointer-events-none select-none">
      {/* Base deep space gradient for foundations */}
      <div className="absolute inset-0 bg-[#000000] opacity-90" />

      {/* Primary Animation Canvas - Layered Motion Blobs */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen overflow-hidden">
        
        {/* Layer 1: Dark Brown Liquid Wave - Horizontal Float & Morph */}
        <motion.div
          animate={{
            x: ["-30%", "30%", "-30%"],
            y: ["-10%", "10%", "-10%"],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[15%] -left-[10%] w-[140%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(65,45,21,0.35)_0%,transparent_70%)] blur-[140px] will-change-transform"
        />

        {/* Layer 2: Deep Slate Bronze Aurora - Vertical Drift & Pulse */}
        <motion.div
          animate={{
            y: ["-40%", "40%", "-40%"],
            x: ["5%", "-5%", "5%"],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-0 w-[130%] h-[140%] bg-[radial-gradient(circle_at_center,rgba(31,21,12,0.5)_0%,transparent_70%)] blur-[140px] will-change-transform"
        />

        {/* Layer 3: Warm Gold Ethereal Glow Blobs - Multi-point Motion */}
        <motion.div
          animate={{
            x: [0, 200, -200, 0],
            y: [0, -150, 150, 0],
            scale: [1, 1.3, 0.8, 1],
            rotate: [0, 90, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/3 w-[60vw] h-[60vw] bg-[#cbb181]/8 rounded-full blur-[140px] will-change-transform"
        />

        {/* Layer 4: Bronze Liquid Smoke - Breathing & Scaling */}
        <motion.div
          animate={{
            opacity: [0.1, 0.4, 0.1],
            scale: [0.9, 1.2, 0.9],
            x: ["10%", "-10%", "10%"],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-[85vw] h-[85vw] bg-[#412D15]/25 rounded-full blur-[140px] will-change-transform"
        />

        {/* Layer 5: Soft Indigo Aurora - Continuous Rotation */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0%,rgba(197,160,103,0.015)_25%,transparent_50%,rgba(65,45,21,0.015)_75%,transparent_100%)] blur-[120px] pointer-events-none"
        />
      </div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-85 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50 z-[1]" />

      {/* Premium Micro-Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-[2]"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }}
      />
      
      {/* Bottom Horizontal Glow Reflection */}
      <div className="absolute bottom-0 left-0 right-0 h-[20vh] bg-gradient-to-t from-[#412D15]/10 to-transparent z-[1] pointer-events-none" />
    </div>
  );
}
