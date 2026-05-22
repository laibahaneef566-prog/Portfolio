import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { name: "Home", id: "home" },
  { name: "Projects", id: "projects" },
  { name: "Skills & Tools", id: "skills" },
  { name: "Certifications", id: "certifications" },
  { name: "About Me", id: "about" },
  { name: "Contact", id: "contact" }
];

const Logo = () => {
  return (
    <div className="flex flex-col items-start justify-center cursor-pointer group">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-2"
      >
        <motion.div 
          animate={{ 
            y: [0, -2, 0],
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#10b981] to-[#020c08] border border-[#10b981]/30 flex items-center justify-center font-bold text-white text-sm shadow-[0_0_12px_rgba(16,185,129,0.3)]"
        >
          <span>L</span>
        </motion.div>
        <span className="font-sans font-black text-sm sm:text-base tracking-[0.22em] text-white group-hover:text-[#10b981] transition-colors duration-300 pl-1">
          Laiba Hanif
        </span>
      </motion.div>
      {/* Pinpoint dot + "Available for new opportunities" directly below the logo text */}
      <div className="flex items-center gap-2 justify-center mt-1.5 pl-10 select-none">
        <span 
          className="rounded-full bg-[#10b981] animate-pulse shadow-[0_0_6px_#10b981]"
          style={{ width: '5px', height: '5px' }}
        />
        <span className="font-mono text-[9px] tracking-wider text-white/50 group-hover:text-white/80 transition-colors duration-300">
          Available for new opportunities
        </span>
      </div>
    </div>
  );
};

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* HEADER FIX: Changed from fixed to relative to ensure it is in normal block flow as requested */}
      <header 
        className="relative w-full z-50 flex items-center justify-between px-6 sm:px-12 py-6 bg-black border-b border-[#10b981]/15 shadow-2xl" 
      >
        <Logo />

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item, i) => (
            <motion.li 
              key={item.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 + 0.2 }}
            >
              <button
                onClick={() => {
                  setActive(item.name);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`relative px-1 py-2 text-[11px] font-mono uppercase tracking-[0.22em] group cursor-pointer font-bold transition-all duration-300 ${
                  active === item.name || (active === "Home" && item.name === "Home")
                    ? "text-[#10b981]" 
                    : "text-white/70 hover:text-white"
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                
                {/* Slim Green Underline/Accent matching design */}
                {(active === item.name || (active === "Home" && item.name === "Home")) ? (
                  <motion.div 
                    layoutId="navbar-active-bar"
                    className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                ) : (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#10b981] group-hover:w-full transition-all duration-300" />
                )}
              </button>
            </motion.li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <motion.button 
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "#20e098",
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: "#10b981",
              color: "#000000",
              fontWeight: 800,
              fontSize: "11px",
              letterSpacing: "0.15em",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="uppercase font-mono px-5 py-2.5 rounded-[10px] hidden sm:block font-bold"
          >
            Resume
          </motion.button>

          {/* Hamburger Menu Toggle on Mobile */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-[#10b981]/20 bg-[#020c08]/60 text-white hover:bg-[#10b981]/20 transition-colors duration-300"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-black text-white flex flex-col justify-center items-center py-20 px-6 backdrop-blur-2xl overflow-hidden"
          >
            {/* Background glowing particles mapping screenshot color */}
            <div className="absolute top-1/4 left-1/4 w-[75vw] h-[75vw] bg-[#10b981]/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />

            <nav className="relative z-10 w-full text-center">
              <motion.ul 
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.06 } },
                }}
                className="flex flex-col gap-8 text-xl"
              >
                {NAV_ITEMS.map((item) => (
                  <motion.li 
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                    }}
                  >
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setActive(item.name);
                        setTimeout(() => {
                          document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className={`font-mono font-bold uppercase tracking-[0.2em] text-center text-lg hover:text-[#10b981] transition-all duration-300 ${
                        active === item.name ? "text-[#10b981] drop-shadow-md" : "text-white/70"
                      }`}
                    >
                      {item.name}
                    </button>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-12 flex justify-center"
              >
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="py-3 px-8 rounded-lg bg-[#10b981] text-black font-mono font-black tracking-widest uppercase hover:bg-[#20e098] hover:shadow-lg transition-all duration-300"
                >
                  Resume
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
