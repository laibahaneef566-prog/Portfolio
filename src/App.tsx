import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Eye, Phone, Mail, Linkedin, Send, MapPin, ExternalLink, Calendar, Award } from "lucide-react";
import BackgroundEffect from "./components/BackgroundEffect";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Loader from "./components/Loader";
import ProjectCard from "./components/ProjectCard";
import ThemeToggle from "./components/ThemeToggle";
import CosmicButton from "./components/CosmicButton";
import CustomCursor from "./components/CustomCursor";
import CertificateMiniPreview from "./components/CertificateMiniPreview";
import CertificateModal from "./components/CertificateModal";

const PROJECTS = [
  { 
    title: "TeamProject", 
    desc: "Collaborative project management tool with real-time updates.", 
    tags: ["REACT.JS", "NODE.JS", "FIREBASE"],
    cta: "LIVE DEMO →",
    gradient: "from-[#10b981] via-[#05f3a0] to-white",
    avatars: ["👤", "UI"]
  },
  { 
    title: "UI/UX Design", 
    desc: "Creative design project focused on user experience and visual interface.", 
    tags: ["FIGMA", "ADOBE XD"],
    cta: "10 DESIGNS →",
    gradient: "from-[#10b981] via-[#05f3a0] to-white",
    avatars: ["🧠", "UI"]
  },
];

const SKILL_CATEGORIES = [
  {
    category: "MOBILE",
    techs: "Flutter, Dart, Riverpod",
  },
  {
    category: "WEB FRONTEND",
    techs: "React.js, Next.js, HTML5, CSS3, JavaScript, GraphQL",
  },
  {
    category: "BACKEND",
    techs: "Node.js, Express, REST APIs, GraphQL",
  },
  {
    category: "DATABASE",
    techs: "Firebase, Supabase, MongoDB",
  },
  {
    category: "DESIGN",
    techs: "Figma, Sketch, UX/UI, Prototyping",
  },
  {
    category: "TOOLS",
    techs: "Git, GitHub, VS Code, Docker",
  },
];

const CERTIFICATIONS = [
  {
    title: "BUILD & DEPLOY APPS WITH GOOGLE AI STUDIO & MULTILINGUAL AI SPEECH APP WITH VIBE CODING",
    issuer: "GUVI | HCL",
    date: "March 26, 2026",
    id: "u770495g7hW9cBlu4M",
    skills: ["Google AI Studio", "Vibe Coding", "React", "AI Integration", "Speech Synthesis"],
    gradient: "from-[#10b981] via-[#05f3a0] to-white",
    badgeType: "ai" as const,
    verifyUrl: "https://www.guvi.in/certificate?id=u770495g7hW9cBlu4M",
    signatories: [
      {
        name: "M. Arunprakash",
        title: "Founder and CEO, GUVI Geek Networks",
        signaturePath: "M 10 30 Q 30 10, 50 35 T 90 20 T 130 40 T 170 15"
      }
    ]
  },
  {
    title: "ADVANCED CLOUD DATA ANALYTICS WITH PYTHON & BIGQUERY WITH DATA INSIGHTS",
    issuer: "GUVI | HCL",
    date: "August 14, 2026",
    id: "x881523k3n02dEfa1N",
    skills: ["Cloud Data Analytics", "Python", "Google BigQuery", "Data Insights", "SQL"],
    gradient: "from-[#10b981] via-[#05f3a0] to-white",
    badgeType: "cloud" as const,
    verifyUrl: "https://www.guvi.in/certificate?id=x881523k3n02dEfa1N",
    signatories: [
      {
        name: "J. Srinivasan",
        title: "Co-Founder and CTO, GUVI Geek Networks",
        signaturePath: "M 10 25 Q 40 45, 80 15 T 120 35 T 150 10 T 180 30"
      }
    ]
  },
  {
    title: "WORKSHOP ON PROMPT ENGINEERING",
    issuer: "SKILLECTED",
    date: "February 19, 2026",
    id: "SGWRFPDD",
    skills: ["Prompt Tuning", "System Prompts", "LLMs", "In-Context Learning"],
    gradient: "from-[#10b981] via-[#05f3a0] to-white",
    badgeType: "prompt" as const,
    verifyUrl: "https://www.skillected.com/verify?id=SGWRFPDD",
    signatories: [
      {
        name: "SkillEcted Campus Program",
        title: "Digitally Signatured",
        signaturePath: "M 15 35 Q 45 10, 75 35 T 115 15 T 145 35 T 175 20"
      }
    ]
  },
  {
    title: "INTRODUCTION TO CRITICAL INFRASTRUCTURE PROTECTION",
    issuer: "OPSWAT ACADEMY",
    date: "03/08/2026",
    expires: "03/08/2027",
    cpe: "0.30",
    id: "Z0B4g_pPoA",
    skills: ["Infrastructure Security", "Risk Mitigation", "CIP Program"],
    gradient: "from-[#10b981] via-[#05f3a0] to-white",
    badgeType: "opswat" as const,
    verifyUrl: "https://learn.opswatacademy.com/certificate/Z0B4g_pPoA",
    signatories: [
      {
        name: "Banny Czarny",
        title: "CEO & Founder, OPSWAT",
        signaturePath: "M 10 20 Q 35 45, 60 15 T 110 35 T 150 15 T 180 25"
      },
      {
        name: "Irfan Shakael",
        title: "VP Training & Certification Services, OPSWAT",
        signaturePath: "M 15 35 Q 50 15, 85 40 T 120 15 T 155 30 T 185 10"
      }
    ]
  }
];

const contactContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const contactItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-black selection:bg-[#10b981]/30 selection:text-white text-white min-h-screen transition-all duration-700">
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative min-h-screen flex flex-col justify-between"
        >
          <CustomCursor />
          <BackgroundEffect />
          <Navbar />
          <ThemeToggle />
          
          <div className="relative flex-grow">
            <Hero />
            
            {/* Work Section */}
            <section id="projects" className="py-32 px-6 scroll-mt-24">
              <div className="container mx-auto">
                <div className="mb-20">
                  <motion.div 
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 mb-4 select-none"
                  >
                    <div className="h-[1px] w-8 bg-[#10b981]/30" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#10b981] font-bold">Selected Works</span>
                  </motion.div>
                  <motion.h2 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-7xl font-sans font-black tracking-tight text-white cyber-gradient-text"
                  >
                    Projects
                  </motion.h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                  {PROJECTS.map((project, i) => (
                    <ProjectCard 
                      key={i} 
                      index={i} 
                      title={project.title} 
                      desc={project.desc} 
                      tags={project.tags}
                      cta={project.cta}
                      gradient={project.gradient}
                      avatars={project.avatars}
                    />
                  ))}
                </div>

                {/* All Case Studies CTA */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="mt-20 flex justify-center"
                >
                  <CosmicButton 
                    label="View All Case Studies" 
                    variant="solid" 
                    onClick={() => {
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />
                </motion.div>
              </div>
            </section>

            {/* Skills & About Section */}
            <section id="skills" className="py-32 px-6 border-y border-[#10b981]/15 bg-[#020c08]/40 scroll-mt-24">
              <div className="container mx-auto flex flex-col items-center">
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 mb-4 select-none justify-center"
                >
                  <div className="h-[1px] w-8 bg-[#10b981]/30" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#10b981] font-bold">ABILITIES</span>
                  <div className="h-[1px] w-8 bg-[#10b981]/30" />
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl md:text-6xl font-sans font-black tracking-tight mb-16 text-center text-white"
                >
                  Skills and Tools
                </motion.h2>
                <div className="skills-grid">
                  {SKILL_CATEGORIES.map((cat, i) => (
                    <div className="card" key={i}>
                      <div className="card__content text-left">
                        <h3 className="text-base font-black tracking-wider text-[#10b981] mb-3 uppercase font-mono">
                          {cat.category}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/70 font-normal leading-relaxed">
                          {cat.techs}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Certifications Section */}
            <section id="certifications" className="relative py-32 px-6 scroll-mt-24">
              <div className="container mx-auto">
                <div className="mb-20 text-center">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center gap-3 mb-4 select-none"
                  >
                    <div className="h-[1px] w-8 bg-[#10b981]/30" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#10b981] font-bold">Credentials</span>
                    <div className="h-[1px] w-8 bg-[#10b981]/30" />
                  </motion.div>
                  <motion.h2 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-sans font-black tracking-tight text-white"
                  >
                    Certifications
                  </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {CERTIFICATIONS.map((cert, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="group flex flex-col h-full bg-[#030805]/45 border border-[#10b981]/15 hover:border-[#10b981]/40 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.06)]"
                    >
                      {/* Tactile grid overlay inside card */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.01)_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />

                      {/* Header containing Issuer & Date */}
                      <div className="relative z-10 flex justify-between items-center w-full mb-4">
                        <div className="flex items-center gap-2 bg-[#10b981]/10 border border-[#10b981]/25 px-3.5 py-1.5 rounded-full text-[#10b981]">
                          <Award className="w-3 h-3 shrink-0" />
                          <span className="font-mono text-[9px] tracking-[0.08em] font-extrabold uppercase text-[#10b981]">
                            {cert.issuer}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider text-white/50">
                          <Calendar className="w-3 h-3 text-[#10b981]/60" />
                          <span>{cert.date}</span>
                        </div>
                      </div>

                      {/* Certificate image/preview */}
                      <CertificateMiniPreview 
                        badgeType={cert.badgeType}
                        title={cert.title}
                        issuer={cert.issuer}
                        date={cert.date}
                      />

                      {/* Info Block */}
                      <div className="relative z-10 flex-grow flex flex-col justify-between space-y-4">
                        <div>
                          <h3 className="text-lg md:text-xl font-sans font-black text-white hover:text-[#10b981] transition-colors duration-300 tracking-tight leading-snug uppercase line-clamp-2">
                            {cert.title}
                          </h3>
                          <p className="font-mono text-[9px] text-[#10b981]/50 font-medium mt-1.5">
                            REF ID: <span className="text-[#10b981]/70 font-bold">{cert.id}</span>
                          </p>
                        </div>

                        {/* Overlaid skills tags */}
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#10b981]/10">
                          {cert.skills.map((skill, sid) => (
                            <span 
                              key={sid} 
                              className="text-[8px] font-mono font-bold tracking-wider text-[#10b981]/80 hover:text-white uppercase px-2 py-0.5 rounded bg-[#020c08] border border-[#10b981]/15 hover:border-[#10b981]/35 transition-all duration-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* View Certificate Button */}
                        <button
                          onClick={() => {
                            setSelectedCert(cert);
                            setIsModalOpen(true);
                          }}
                          className="w-full mt-4 flex items-center justify-center gap-2 bg-[#020c08] hover:bg-[#10b981] border border-[#10b981]/25 hover:border-transparent px-4 py-3 rounded-xl text-[10px] sm:text-xs font-mono tracking-widest font-black text-[#10b981] hover:text-black transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_20px_rgba(16,185,129,0.35)] cursor-pointer uppercase font-extrabold"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Certificate</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Secure Digital Certificate Modal */}
              <CertificateModal
                isOpen={isModalOpen}
                onClose={() => {
                  setIsModalOpen(false);
                  setSelectedCert(null);
                }}
                cert={selectedCert}
              />
            </section>

            {/* About Me Section */}
            <section id="about" className="py-32 px-6 border-t border-[#10b981]/15 bg-[#020c08]/20 scroll-mt-24">
              <div className="container mx-auto">
                <div className="max-w-5xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    
                    {/* Left Column (Biography) */}
                    <div className="lg:col-span-7 space-y-12 text-left">
                      <div>
                        <motion.div 
                          initial={{ opacity: 0, x: -15 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-3 mb-4 select-none"
                        >
                          <div className="h-[1px] w-8 bg-[#10b981]/30" />
                          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#10b981] font-bold">Biography</span>
                        </motion.div>
                        
                        <motion.h2 
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                          className="text-4xl md:text-5xl font-sans font-black tracking-tight text-white"
                        >
                          About Me
                        </motion.h2>
                      </div>

                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-4"
                      >
                        <p className="text-white/80 text-xl font-bold leading-relaxed">
                          I'm{" "}
                          <span className="text-[#10b981] font-black">
                            Laiba Hanif
                          </span>
                          , a Computer Science Student.
                        </p>
                        <p className="text-white/70 text-base leading-relaxed">
                          When I'm not coding, you'll find me capturing moody landscapes through my lens.
                        </p>
                      </motion.div>

                      {/* Education list */}
                      <div className="space-y-6">
                        <h3 className="text-xs font-mono text-[#10b981] font-extrabold uppercase tracking-[0.25em]">
                          // EDUCATION
                        </h3>
                        
                        <div className="relative border-l border-[#10b981]/15 pl-6 ml-3 space-y-8">
                          {/* GRADUATION */}
                          <div className="relative">
                            <div className="absolute -left-[32px] top-1 w-4 h-4 rounded-full bg-[#10b981] border-[3px] border-black shadow-[0_0_8px_#10b981]" />
                            <span className="text-[9px] font-mono font-bold text-[#10b981] tracking-widest uppercase block mb-1">
                              GRADUATION
                            </span>
                            <h4 className="text-lg font-sans font-extrabold text-white leading-tight">
                              BSCS Bachelor of Computer Science
                            </h4>
                            <p className="text-white/70 text-sm mt-0.5">
                              University of Punjab, Lahore
                            </p>
                          </div>

                          {/* INTERMEDIATE */}
                          <div className="relative">
                            <div className="absolute -left-[32px] top-1 w-4 h-4 rounded-full bg-[#10b981] border-[3px] border-black shadow-[0_0_8px_#10b981]" />
                            <span className="text-[9px] font-mono font-bold text-[#10b981] tracking-widest uppercase block mb-1">
                              INTERMEDIATE
                            </span>
                            <h4 className="text-lg font-sans font-extrabold text-white leading-tight">
                              ICS Physics
                            </h4>
                            <p className="text-white/70 text-sm mt-0.5">
                              BISE Rawalpindi
                            </p>
                          </div>

                          {/* MATRICULATION */}
                          <div className="relative">
                            <div className="absolute -left-[32px] top-1 w-4 h-4 rounded-full bg-[#10b981] border-[3px] border-black shadow-[0_0_8px_#10b981]" />
                            <span className="text-[9px] font-mono font-bold text-[#10b981] tracking-widest uppercase block mb-1">
                              MATRICULATION
                            </span>
                            <h4 className="text-lg font-sans font-extrabold text-white leading-tight">
                              Computer Science
                            </h4>
                            <p className="text-white/70 text-sm mt-0.5">
                              Punjab Board, Rawalpindi
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column (Info Widgets) */}
                    <div className="lg:col-span-5 space-y-6">
                      
                      {/* Quick Info Card */}
                      <div className="card card-fluid relative h-auto bg-transparent">
                        <div className="card__content p-8 flex flex-col justify-between items-start gap-4 relative overflow-hidden text-left">
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.015)_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />
                          <div className="relative z-10 w-full">
                            <h3 className="text-xs font-mono font-bold text-[#10b981] tracking-widest uppercase mb-6">
                              QUICK INFO
                            </h3>
                            <div className="space-y-4 font-sans text-sm">
                              <div className="flex justify-between border-b border-[#10b981]/10 pb-3">
                                <span className="font-medium text-white/50">Name:</span>
                                <span className="font-bold text-white">Laiba Hanif</span>
                              </div>
                              <div className="flex justify-between border-b border-[#10b981]/10 pb-3">
                                <span className="font-medium text-white/50">Location:</span>
                                <span className="font-bold text-white">Rawalpindi, PK</span>
                              </div>
                              <div className="flex justify-between border-b border-[#10b981]/10 pb-3">
                                <span className="font-medium text-white/50">Degree:</span>
                                <span className="font-bold text-white">BSCS</span>
                              </div>
                              <div className="flex justify-between border-b border-[#10b981]/10 pb-3">
                                <span className="font-medium text-white/50">Focus:</span>
                                <span className="font-bold text-white">Full Stack + Mobile</span>
                              </div>
                              <div className="flex justify-between pt-1">
                                <span className="font-medium text-white/50">Status:</span>
                                <span className="font-extrabold text-white flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981] animate-pulse" />
                                  Open to Work
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Interests Card */}
                      <div className="card card-fluid relative h-auto bg-transparent">
                        <div className="card__content p-8 flex flex-col justify-between items-start gap-4 relative overflow-hidden text-left">
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.015)_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />
                          <div className="relative z-10 w-full">
                            <h3 className="text-xs font-mono font-bold text-[#10b981] tracking-widest uppercase mb-6">
                              // INTERESTS
                            </h3>
                            <div className="flex flex-wrap gap-2.5 pt-1">
                              {["Mobile Apps", "Web Dev", "UI/UX", "Open Source"].map((interest) => (
                                <span 
                                  key={interest} 
                                  className="text-xs font-bold text-white px-4 py-2 rounded-full bg-[#020c08] border border-[#10b981]/25 hover:border-[#10b981] hover:text-[#10b981] hover:shadow-[0_0_10px_rgba(16,185,129,0.2)] transition-all duration-300"
                                >
                                  {interest}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-32 px-6 bg-black border-t border-[#10b981]/15 scroll-mt-24">
              <div className="container mx-auto">
                <div className="max-w-6xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left Column (Contact Details) */}
                    <div className="lg:col-span-5 space-y-8 text-left">
                      <div>
                        <span className="text-[10px] font-mono tracking-[0.4em] text-[#10b981] uppercase font-bold block mb-3">
                          GET IN TOUCH
                        </span>
                        
                        <h2 className="text-4xl md:text-6xl font-sans font-black tracking-tight text-white mb-4 leading-tight">
                          Let's Build <br />
                          Something <br />
                          <span className="bg-gradient-to-r from-white to-[#10b981] bg-clip-text text-transparent">
                            Great
                          </span>
                        </h2>
                        
                        <p className="text-white/70 text-lg font-normal">
                          Have a project idea? I'm always open to new opportunities.
                        </p>
                      </div>

                      {/* Info channels */}
                      <div className="space-y-4">
                        <a 
                          href="tel:03205705121" 
                          className="flex items-center gap-5 p-5 bg-[#020c08]/80 border border-[#10b981]/15 rounded-2xl hover:-translate-y-1 hover:border-[#10b981] hover:shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all duration-300 group cursor-pointer block"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-full bg-[#020c08] border border-[#10b981]/15 flex items-center justify-center text-[#10b981] shrink-0">
                              <Phone className="w-4.5 h-4.5" />
                            </div>
                            <div>
                              <span className="block text-[9px] font-mono font-bold text-white/50 tracking-wider">PHONE</span>
                              <span className="font-semibold text-white text-sm sm:text-base group-hover:text-[#10b981] transition-colors">03205705121</span>
                            </div>
                          </div>
                        </a>

                        <a 
                          href="mailto:laibaabbasi4555@gmail.com" 
                          className="flex items-center gap-5 p-5 bg-[#020c08]/80 border border-[#10b981]/15 rounded-2xl hover:-translate-y-1 hover:border-[#10b981] hover:shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all duration-300 group cursor-pointer block"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-full bg-[#020c08] border border-[#10b981]/15 flex items-center justify-center text-[#10b981] shrink-0">
                              <Mail className="w-4.5 h-4.5" />
                            </div>
                            <div>
                              <span className="block text-[9px] font-mono font-bold text-white/50 tracking-wider">EMAIL</span>
                              <span className="font-semibold text-white text-sm sm:text-base group-hover:text-[#10b981] transition-colors break-all">laibaabbasi4555@gmail.com</span>
                            </div>
                          </div>
                        </a>

                        <a 
                          href="https://www.linkedin.com/in/laiba-hanif-624083407" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-5 p-5 bg-[#020c08]/80 border border-[#10b981]/15 rounded-2xl hover:-translate-y-1 hover:border-[#10b981] hover:shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all duration-300 group cursor-pointer block"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-full bg-[#020c08] border border-[#10b981]/15 flex items-center justify-center text-[#10b981] shrink-0">
                              <Linkedin className="w-4.5 h-4.5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="block text-[9px] font-mono font-bold text-white/50 tracking-wider">LINKEDIN</span>
                              <span className="font-semibold text-white text-sm sm:text-base group-hover:text-[#10b981] transition-colors truncate block">laiba-hanif-624083407</span>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>

                    {/* Right Column (Form Panel) */}
                    <div className="lg:col-span-7 text-left w-full lg:pl-8">
                      <motion.form 
                        variants={contactContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="p-10 rounded-[24px] bg-[#020c08]/85 backdrop-blur-md border border-[#10b981]/20 shadow-lg space-y-6"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        {/* Name */}
                        <motion.div variants={contactItemVariants}>
                          <label className="block text-white/70 text-xs font-semibold uppercase tracking-[1px] mb-2 font-mono">
                            YOUR NAME
                          </label>
                          <input 
                            type="text" 
                            placeholder="John Doe" 
                            className="w-full bg-black/60 border border-[#10b981]/20 rounded-xl px-4.5 py-4 text-white placeholder-white/20 focus:bg-[#020c08] focus:border-[#10b981]/60 focus:ring-4 focus:ring-[#10b981]/10 outline-none transition-all duration-300 ease-in-out"
                          />
                        </motion.div>
                        
                        {/* Email */}
                        <motion.div variants={contactItemVariants}>
                          <label className="block text-white/70 text-xs font-semibold uppercase tracking-[1px] mb-2 font-mono">
                            EMAIL
                          </label>
                          <input 
                            type="email" 
                            placeholder="john@example.com" 
                            className="w-full bg-black/60 border border-[#10b981]/20 rounded-xl px-4.5 py-4 text-white placeholder-white/20 focus:bg-[#020c08] focus:border-[#10b981]/60 focus:ring-4 focus:ring-[#10b981]/10 outline-none transition-all duration-300 ease-in-out"
                          />
                        </motion.div>
 
                        {/* Message */}
                        <motion.div variants={contactItemVariants}>
                          <label className="block text-white/70 text-xs font-semibold uppercase tracking-[1px] mb-2 font-mono">
                            MESSAGE
                          </label>
                          <textarea 
                            rows={4}
                            placeholder="Tell me about your project..." 
                            className="w-full bg-black/60 border border-[#10b981]/20 rounded-xl px-4.5 py-4 text-white placeholder-white/20 focus:bg-[#020c08] focus:border-[#10b981]/60 focus:ring-4 focus:ring-[#10b981]/10 outline-none transition-all duration-300 ease-in-out resize-none min-h-[140px]"
                          />
                        </motion.div>
 
                        {/* Submit */}
                        <motion.div variants={contactItemVariants}>
                          <button 
                            type="submit"
                            className="w-full py-4 px-8 rounded-xl font-bold text-black bg-[#10b981] hover:bg-[#20e098] border border-transparent cursor-pointer hover:-translate-y-0.5 shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_22px_rgba(16,185,129,0.55)] transition-all duration-300 ease-in-out flex items-center justify-center gap-2"
                          >
                            <span>Send Message</span>
                            <Send className="w-4 h-4" />
                          </button>
                        </motion.div>
                      </motion.form>
                    </div>

                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer Section */}
          {/* FOOTER STICKY TO BOTTOM: using mt-auto within flex flex-col layout to ensure it adheres to footer layout instructions */}
          <footer className="bg-black border-t border-[#10b981]/15 text-white/70 py-16 px-6 mt-auto">
            <div className="container mx-auto max-w-6xl">
              
              {/* BUTTON RELOCATION TO FOOTER & SPACING ADJUSTMENT */}
              {/* The text "Hot days ahead" has a proper margin-bottom of 2rem (using style or mb-8/mb-[2rem]) so it doesn't touch the button too tightly */}
              <div className="flex flex-col items-center justify-center text-center pb-12 mb-12 border-b border-[#10b981]/10">
                <span className="font-sans text-lg uppercase tracking-[0.25em] text-white font-bold block" style={{ marginBottom: "2rem" }}>
                  Hot days ahead
                </span>
                <button 
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-10 py-4.5 rounded-xl font-bold font-mono text-xs tracking-widest text-black bg-[#10b981] hover:bg-[#20e098] cursor-pointer hover:-translate-y-0.5 shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_22px_rgba(16,185,129,0.55)] transition-all duration-300 ease-in-out uppercase"
                >
                  SCROLL PROJECTS
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left mb-12">
                
                {/* Brand */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[#10b981] font-sans font-black text-2xl tracking-tighter">L.</span>
                    <span className="text-white font-sans font-bold text-xl tracking-tight">Laiba Hanif</span>
                  </div>
                  <p className="font-mono text-xs text-[#10b981] font-bold">
                    Full Stack Developer & UI/UX Designer
                  </p>
                  <p className="text-sm text-white/60 max-w-xs leading-relaxed">
                    Building modern, scalable, and user-friendly digital experiences with pristine design structure.
                  </p>
                  <div className="flex gap-3 pt-2">
                    <a 
                      href="https://www.linkedin.com/in/laiba-hanif-624083407" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[#020c08] hover:bg-[#10b981]/15 border border-[#10b981]/15 hover:border-[#10b981] text-white/75 hover:text-[#10b981] flex items-center justify-center transition-all duration-300"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a 
                      href="mailto:laibaabbasi4555@gmail.com" 
                      className="w-10 h-10 rounded-full bg-[#020c08] hover:bg-[#10b981]/15 border border-[#10b981]/15 hover:border-[#10b981] text-white/75 hover:text-[#10b981] flex items-center justify-center transition-all duration-300"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Quick Navigation Links */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-white font-semibold text-lg relative inline-block">
                      Quick Links
                      <span className="block w-8 h-[2px] bg-[#10b981] mt-1.5" />
                    </h3>
                  </div>
                  <ul className="space-y-2.5 text-sm font-medium">
                    {[
                      { name: "Home", id: "home" },
                      { name: "Projects", id: "projects" },
                      { name: "Skills & Tools", id: "skills" },
                      { name: "Certifications", id: "certifications" },
                      { name: "About Me", id: "about" },
                      { name: "Contact", id: "contact" }
                    ].map((link) => (
                      <li key={link.id}>
                        <button
                          onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" })}
                          className="hover:text-[#10b981] transition-colors duration-200 cursor-pointer"
                        >
                          {link.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contacts details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-white font-semibold text-lg relative inline-block">
                      Contact Info
                      <span className="block w-8 h-[2px] bg-[#10b981] mt-1.5" />
                    </h3>
                  </div>
                  <ul className="space-y-3.5 text-sm font-medium">
                    <li className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-white/60 shrink-0" />
                      <a href="mailto:laibaabbasi4555@gmail.com" className="hover:text-[#10b981] transition-colors duration-200">
                        laibaabbasi4555@gmail.com
                      </a>
                    </li>
                    <li className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-white/60 shrink-0" />
                      <a href="tel:03205705121" className="hover:text-[#10b981] transition-colors duration-200">
                        03205705121
                      </a>
                    </li>
                    <li className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-white/60 shrink-0" />
                      <span>Pakistan</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* End block */}
              <div className="pt-8 border-t border-[#10b981]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-white/40">
                <p>© 2026 Laiba Hanif. All Rights Reserved.</p>
                <p>Designed & Built with ❤️ by Laiba Hanif</p>
              </div>
            </div>
          </footer>
        </motion.main>
      )}
    </div>
  );
}
