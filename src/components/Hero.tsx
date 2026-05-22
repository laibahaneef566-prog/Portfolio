import { motion } from "motion/react";
import HeroHudOrb from "./HeroHudOrb";
import CosmicButton from "./CosmicButton";

// Container variants with staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

// Item reveal variant
const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black px-6 sm:px-12 lg:px-20 border-b border-[#10b981]/15">
      
      {/* 1. Tactical Sci-Fi HUD Corner Brackets framing the screen (matches image perfectly) */}
      <div className="absolute top-24 left-6 sm:left-12 w-12 h-12 border-t-[1.5px] border-l-[1.5px] border-[#10b981]/30 pointer-events-none" />
      <div className="absolute bottom-12 right-6 sm:right-12 w-12 h-12 border-b-[1.5px] border-r-[1.5px] border-[#10b981]/30 pointer-events-none" />

      {/* Ambient Grid Background - fine green dots */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{ 
            backgroundImage: `radial-gradient(#10b981 1.2px, transparent 1.2px)`,
            backgroundSize: '36px 36px'
          }}
        />
        {/* Soft emerald pulse glow on left side */}
        <div 
          className="absolute top-1/3 left-[-150px] w-[500px] h-[500px] rounded-full opacity-[0.12] blur-[120px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }}
        />
      </div>

      <div className="container mx-auto relative z-10 w-full pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[75vh]">
          
          {/* Left Column: Text Content & Status Blocks (7 cols) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 relative z-20 flex flex-col gap-6 text-left"
          >
            {/* 1. EXPERTISE & VISION Label (without the green status dot as requested) */}
            <motion.div variants={itemVariants} className="flex items-center gap-2.5">
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] font-extrabold uppercase text-[#10b981]">
                EXPERTISE & VISION
              </span>
            </motion.div>

            {/* 2. Primary Heading: Duo-tone "Laiba Hanif / Abbasi" (matches image perfectly) */}
            <motion.div variants={itemVariants} className="flex flex-col gap-1">
              <h1 className="text-5xl md:text-7xl font-sans font-black tracking-tight leading-none text-white pl-0.5">
                Laiba Hanif
              </h1>
              <h1 className="text-5xl md:text-7xl font-sans font-black tracking-tight leading-none text-white/30 pl-0.5 mt-1">
                Abbasi
              </h1>
            </motion.div>

            {/* 3. Minimal Description */}
            <motion.p 
              variants={itemVariants}
              className="text-white/65 text-base sm:text-lg max-w-lg leading-relaxed font-normal pl-0.5"
            >
              Crafting high-performance digital products with focus on{" "}
              <span className="text-white font-semibold">scalability</span>,{" "}
              precision engineering and minimal design aesthetics.
            </motion.p>

            {/* 4. Action buttons aligned in a flex row */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center pl-0.5 pt-4">
              <CosmicButton 
                label="View My Work" 
                variant="solid"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              />
              <CosmicButton 
                label="Contact Me" 
                variant="outline"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              />
            </motion.div>

          </motion.div>

          {/* Right Column: Custom Interactive Radar HUD Canvas (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="lg:col-span-5 relative hidden lg:flex items-center justify-center z-10 overflow-hidden"
            style={{
              height: "min(400px, 35vw)",
              width: "min(400px, 35vw)",
              margin: "0 auto",
            }}
          >
            {/* Deep dark forest-green radial lighting vignette */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(2,12,8,0.7) 0%, #000000 70%, rgba(0,0,0,0) 85%)",
              }}
            />

            {/* Outer green pulse framing */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, transparent 60%, rgba(16,185,129,0.06) 72%, transparent 85%)",
              }}
            />

            {/* Radar Canvas Component */}
            <div className="relative w-full h-full">
              <HeroHudOrb />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 right-6 sm:right-12 hidden sm:flex flex-col items-end gap-2 text-right opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-white">Scroll Projects</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#10b981] to-transparent mr-2.5" />
      </motion.div>

    </section>
  );
}
