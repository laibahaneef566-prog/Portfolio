import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] w-12 h-12 rounded-full flex items-center justify-center bg-[#020c08]/80 border border-[#10b981]/30 shadow-[0_8px_32px_rgba(0,0,0,0.7)] backdrop-blur-md group hover:border-[#10b981] transition-all duration-300"
      aria-label="Toggle Theme"
    >
      <div className="relative w-6 h-6">
        <motion.div
          initial={false}
          animate={{
            rotate: theme === "dark" ? 0 : 180,
            opacity: theme === "dark" ? 1 : 0,
            scale: theme === "dark" ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center text-[#10b981]"
        >
          <Moon size={20} fill="currentColor" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            rotate: theme === "light" ? 0 : -180,
            opacity: theme === "light" ? 1 : 0,
            scale: theme === "light" ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center text-[#10b981]"
        >
          <Sun size={20} fill="currentColor" />
        </motion.div>
      </div>
    </motion.button>
  );
}
