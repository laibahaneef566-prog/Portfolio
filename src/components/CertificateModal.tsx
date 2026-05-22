import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Printer, Award, Shield, CheckCircle, Smartphone } from "lucide-react";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  id: string;
  skills: string[];
  gradient: string;
  signatories: { name: string; title: string; signaturePath: string }[];
  verifyUrl: string;
  badgeType: "ai" | "cloud" | "prompt" | "opswat";
  cpe?: string;
  expires?: string;
}

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  cert: Certificate | null;
}

export default function CertificateModal({ isOpen, onClose, cert }: CertificateModalProps) {
  if (!cert) return null;

  const handlePrint = () => {
    window.print();
  };

  // Pre-drawn elegant signature paths
  const signatures = {
    guvi_ceo: "M 10 30 Q 30 10, 50 35 T 90 20 T 130 40 T 170 15",
    guvi_cto: "M 10 25 Q 40 45, 80 15 T 120 35 T 150 10 T 180 30",
    skillected: "M 15 35 Q 45 10, 75 35 T 115 15 T 145 35 T 175 20",
    opswat_ceo: "M 10 20 Q 35 45, 60 15 T 110 35 T 150 15 T 180 25",
    opswat_vp: "M 15 35 Q 50 15, 85 40 T 120 15 T 155 30 T 185 10"
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto"
        >
          {/* Controls Bar */}
          <div className="absolute top-4 right-4 z-20 flex gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="p-3 bg-[#020c08]/85 border border-[#10b981]/20 hover:border-[#10b981] text-[#10b981] hover:text-white rounded-full shadow-lg transition-all duration-300 backdrop-blur-md cursor-pointer flex items-center gap-2 text-xs font-mono uppercase tracking-wider"
              title="Print / Save PDF"
            >
              <Printer size={16} />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-3 bg-red-950/20 border border-red-500/20 hover:border-red-500 text-red-400 hover:text-white rounded-full shadow-lg transition-all duration-300 backdrop-blur-md cursor-pointer"
              title="Close"
            >
              <X size={16} />
            </button>
          </div>

          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="w-full max-w-4xl bg-[#030705] border border-[#10b981]/30 rounded-3xl shadow-[0_20px_50px_rgba(16,185,129,0.15)] relative overflow-hidden my-8 print:border-none print:shadow-none print:bg-white print:text-black print:my-0"
          >
            {/* Ambient Background Glow (Glow from the certification screen) */}
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#10b981]/5 rounded-full blur-[120px] pointer-events-none print:hidden" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#05f3a0]/3 rounded-full blur-[120px] pointer-events-none print:hidden" />

            {/* Certificate Border/Frame */}
            <div className="p-1 sm:p-2 bg-gradient-to-br from-[#10b981]/30 via-[#020c08] to-[#10b981]/15 rounded-3xl print:p-0">
              <div className="bg-[#020c08] p-8 sm:p-12 md:p-16 rounded-[22px] border border-[#10b981]/20 relative print:bg-white print:text-black print:border-none print:p-8">
                
                {/* Tactical lines matching the web theme */}
                <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-[#10b981]/20 pointer-events-none print:hidden" />
                <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-[#10b981]/20 pointer-events-none print:hidden" />
                <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-[#10b981]/20 pointer-events-none print:hidden" />
                <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-[#10b981]/20 pointer-events-none print:hidden" />

                {/* Header Info */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-[#10b981]/10 pb-8 print:border-black/10">
                  <div className="space-y-1">
                    <span className="font-mono text-xs text-[#10b981] tracking-[0.25em] block uppercase font-bold print:text-emerald-700">
                      SECURE DIGITAL CREDENTIAL
                    </span>
                    <h2 className="text-2xl font-sans font-black flex items-center gap-2 tracking-tight text-white print:text-black">
                      {cert.issuer}
                    </h2>
                  </div>

                  {cert.badgeType === "opswat" ? (
                    <div className="flex items-center gap-2.5 bg-[#10b981]/10 border border-[#10b981]/30 px-3.5 py-1.5 rounded-lg text-[#10b981]/90 font-mono text-[10px] tracking-widest font-bold uppercase print:bg-emerald-50 print:border-emerald-200">
                      <Shield size={14} />
                      ICIP CREDENTIAL (CPE: {cert.cpe || "0.30"})
                    </div>
                  ) : (
                    <div className="flex items-center gap-2.5 bg-[#10b981]/10 border border-[#10b981]/30 px-3.5 py-1.5 rounded-lg text-[#10b981]/90 font-mono text-[10px] tracking-widest font-bold uppercase print:bg-emerald-50 print:border-emerald-200">
                      <Award size={14} />
                      VERIFIED ACHIEVEMENT
                    </div>
                  )}
                </div>

                {/* Certificate Body Content */}
                <div className="text-center space-y-8 my-8">
                  <span className="font-mono text-xs tracking-[0.3em] uppercase text-white/50 block print:text-black/60">
                    THIS CERTIFICATE IS PROUDLY PRESENTED TO
                  </span>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-black tracking-tight text-white drop-shadow-[0_0_15px_rgba(16,185,129,0.3)] print:text-black print:drop-shadow-none">
                    Laiba Hanif
                  </h1>

                  <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#10b981] to-transparent mx-auto print:via-black" />

                  <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal print:text-black/80">
                    has successfully completed all requirements and standards for the exceptional completion of
                  </p>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-sans font-extrabold text-[#10b981] max-w-3xl mx-auto tracking-normal uppercase leading-tight print:text-emerald-800">
                    {cert.title}
                  </h3>

                  {cert.expires && (
                    <p className="text-xs font-mono text-white/40 uppercase tracking-widest print:text-black/50">
                      EXPIRATION DATE: <span className="font-bold text-white/70 print:text-black">{cert.expires}</span>
                    </p>
                  )}
                </div>

                {/* Footer Section with Badges & Signatures */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-12 border-t border-[#10b981]/10 mt-12 print:border-black/10">
                  
                  {/* Digital Signature(s) */}
                  <div className="md:col-span-8 flex flex-col sm:flex-row gap-8 justify-start text-left">
                    {cert.signatories.map((sig, sIdx) => (
                      <div key={sIdx} className="space-y-2 mt-4">
                        <div className="h-16 relative">
                          {/* Animated vector signature line mimicking genuine dynamic signatures */}
                          <svg className="w-40 h-full overflow-visible text-[#10b981] print:text-black opacity-85" viewBox="0 0 200 50">
                            <motion.path
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 1.5, delay: 0.5 + sIdx * 0.3 }}
                              d={sig.signaturePath}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="w-40 h-[1px] bg-white/10 print:bg-black/20" />
                        <div>
                          <p className="font-sans font-extrabold text-white text-xs print:text-black leading-tight">
                            {sig.name}
                          </p>
                          <p className="font-mono text-[9px] text-[#10b981]/60 uppercase tracking-wider leading-none mt-1 print:text-emerald-700">
                            {sig.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stamp / Security Watermark Badge */}
                  <div className="md:col-span-4 flex flex-col items-center md:items-end justify-end">
                    <div className="relative group w-24 h-24 flex items-center justify-center">
                      {/* Security circular frame */}
                      <svg className="absolute inset-0 w-full h-full animate-[spin_20s_infinite_linear] text-[#10b981]/25 print:text-black/20" viewBox="0 0 100 100">
                        <path id="circlePath" fill="none" d="M 10,50 A 40,40 0 1,1 90,50 A 40,40 0 1,1 10,50" />
                        <text className="font-mono text-[7px] tracking-[0.1em] font-normal fill-[#10b981] print:fill-black">
                          <textPath href="#circlePath">
                            * VERIFIED SECURITY CREDENTIAL * LAIBA HANIF PORTFOLIO *
                          </textPath>
                        </text>
                      </svg>
                      
                      {/* Center symbol */}
                      <div className="w-12 h-12 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 flex items-center justify-center text-[#10b981] shadow-[0_0_15px_rgba(16,185,129,0.2)] print:border-black print:text-black">
                        {cert.badgeType === "opswat" ? (
                          <Shield size={20} className="stroke-[2]" />
                        ) : cert.badgeType === "ai" ? (
                          <Award size={20} className="stroke-[2]" />
                        ) : (
                          <CheckCircle size={18} className="stroke-[2.5]" />
                        )}
                      </div>
                    </div>
                  </div>

                </div>

                {/* ID & Date Verification Strip */}
                <div className="mt-12 pt-6 border-t border-[#10b981]/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-left print:border-black/5">
                  <div className="font-mono text-[10px] tracking-wider text-white/40 space-y-1 print:text-black/50">
                    <p>CREDENTIAL ID: <span className="font-bold text-white/70 print:text-black uppercase">{cert.id}</span></p>
                    <p>ISSUE DATE: <span className="font-bold text-white/70 print:text-black">{cert.date}</span></p>
                  </div>

                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#020c08] hover:bg-[#10b981] border border-[#10b981]/20 hover:border-transparent px-5 py-2.5 rounded-xl text-[10px] font-mono tracking-widest font-bold text-[#10b981] hover:text-black transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:shadow-[0_4px_20px_rgba(16,185,129,0.4)] cursor-pointer uppercase print:hidden"
                  >
                    <span>Verify At Source</span>
                    <ExternalLink size={10} />
                  </a>
                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
