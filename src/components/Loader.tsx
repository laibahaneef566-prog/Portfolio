import { motion } from "motion/react";
import { useState, useEffect } from "react";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-6 animate-pulse-slow"
    >
      <div className="w-full max-w-[240px]">
        <div className="flex justify-between items-end mb-4 font-mono text-[10px] uppercase tracking-[0.25em]">
          <span className="text-[#10b981]/65 font-medium">Booting System</span>
          <span className="text-[#10b981] font-bold">{Math.floor(progress)}%</span>
        </div>
        
        <div className="h-[2.5px] w-full bg-[#020c08] relative rounded-full overflow-hidden border border-[#10b981]/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-[#10b981] absolute top-0 left-0 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
          />
        </div>

        <div className="mt-8 flex justify-center">
           <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}
