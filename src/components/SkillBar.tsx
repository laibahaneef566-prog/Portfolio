import { motion } from "motion/react";
import { useState } from "react";

export default function SkillBar({ name, percentage }: { name: string; percentage: number }) {
  const [count, setCount] = useState(0);

  return (
    <div className="mb-8 group select-none">
      <div className="flex justify-between items-end mb-3">
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-white/70 uppercase font-bold group-hover:text-[#10b981] transition-colors duration-300">
          {name}
        </span>
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          onViewportEnter={() => {
            let current = 0;
            const timer = setInterval(() => {
              if (current >= percentage) {
                clearInterval(timer);
              } else {
                current += 1;
                setCount(current);
              }
            }, 10);
          }}
          className="font-mono text-[10px] text-[#10b981] font-bold"
        >
          {count}%
        </motion.span>
      </div>
      <div className="h-[3px] w-full bg-[#020c08] rounded-full overflow-hidden border border-[#10b981]/10">
        <motion.div
           initial={{ width: 0 }}
           whileInView={{ width: `${percentage}%` }}
           viewport={{ once: true }}
           transition={{ duration: 1.2, ease: "easeOut" }}
           className="h-full bg-[#10b981] relative shadow-[0_0_8px_rgba(16,185,129,0.5)]"
        >
          <motion.div 
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </motion.div>
      </div>
    </div>
  );
}
