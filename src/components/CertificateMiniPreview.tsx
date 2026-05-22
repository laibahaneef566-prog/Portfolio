import React from "react";
import { Award, Shield, Cpu, CloudLightning, HelpCircle, CheckCircle } from "lucide-react";

interface CertificateMiniPreviewProps {
  badgeType: "ai" | "cloud" | "prompt" | "opswat";
  title: string;
  issuer: string;
  date: string;
}

export default function CertificateMiniPreview({ badgeType, title, issuer, date }: CertificateMiniPreviewProps) {
  // Configs matching each specific certificate
  const config = {
    ai: {
      accent: "#10b981",
      glow: "rgba(16,185,129,0.3)",
      icon: Cpu,
      badgeText: "AI STUDIO & SPEECH",
    },
    cloud: {
      accent: "#10b981",
      glow: "rgba(16,185,129,0.25)",
      icon: CloudLightning,
      badgeText: "CLOUD DATA & BIGQUERY",
    },
    prompt: {
      accent: "#10b981",
      glow: "rgba(16,185,129,0.25)",
      icon: HelpCircle,
      badgeText: "PROMPT ENGINEERING",
    },
    opswat: {
      accent: "#10b981",
      glow: "rgba(16,185,129,0.45)",
      icon: Shield,
      badgeText: "CRITICAL INFRASTRUCTURE",
    }
  };

  const current = config[badgeType] || config.ai;
  const Icon = current.icon;

  return (
    <div className="relative w-full h-[180px] bg-[#020c08] border border-[#10b981]/20 rounded-xl overflow-hidden shadow-inner group/preview select-none flex flex-col justify-between p-5 mb-5">
      {/* 1. Futuristic Cyber Vector Grid (animated or fine lines) */}
      <div 
        className="absolute inset-0 z-0 opacity-15"
        style={{ 
          backgroundImage: `
            linear-gradient(to right, ${current.accent} 1px, transparent 1px),
            linear-gradient(to bottom, ${current.accent} 1px, transparent 1px)
          `,
          backgroundSize: '16px 16px'
        }}
      />

      {/* 2. Soft Dynamic Accent Gradients */}
      <div 
        className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-32 h-32 rounded-full opacity-[0.2] blur-[40px] pointer-events-none group-hover/preview:opacity-[0.35] transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${current.accent} 0%, transparent 70%)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#020c08] via-transparent to-white/[0.02]" />

      {/* 3. Certificate Miniature Header */}
      <div className="relative z-10 flex justify-between items-center">
        <span className="font-mono text-[8px] font-bold tracking-[0.25em] text-[#10b981] uppercase">
          {issuer}
        </span>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#10b981]/15 border border-[#10b981]/25">
          <span className="w-1 h-1 rounded-full bg-[#10b981] animate-pulse" />
          <span className="font-mono text-[7px] text-white/50 tracking-wider">SECURE_ID</span>
        </div>
      </div>

      {/* 4. Central Badge Graphic */}
      <div className="relative z-10 flex flex-col items-center justify-center my-1.5 space-y-1">
        <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-[#030d09]/90 border border-[#10b981]/30 group-hover/preview:border-[#10b981] group-hover/preview:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-300">
          <Icon size={20} className="text-[#10b981]" />
          <div className="absolute inset-1 rounded-full border border-[#10b981]/5 border-dashed animate-[spin_40s_linear_infinite]" />
        </div>
        <span className="font-mono text-[8px] tracking-[0.22em] text-[#10b981]/80 font-black uppercase text-center max-w-[170px] truncate">
          {current.badgeText}
        </span>
      </div>

      {/* 5. Bottom Ribbon showing Candidate Name & Digital Sign Off */}
      <div className="relative z-10 flex justify-between items-end border-t border-[#10b981]/10 pt-3">
        <div className="text-left">
          <span className="block text-[7px] font-mono text-white/40 uppercase tracking-widest leading-none">
            RECIPIENT
          </span>
          <span className="block text-xs font-sans font-black tracking-tight text-white mt-1 group-hover/preview:text-[#10b981] transition-colors duration-300">
            Laiba Hanif
          </span>
        </div>
        <div className="text-right">
          <span className="block text-[7px] font-mono text-white/40 uppercase tracking-widest leading-none">
            COMPLETED
          </span>
          <span className="block text-[8px] font-mono text-white/60 tracking-wider mt-1 font-bold">
            {date}
          </span>
        </div>
      </div>

      {/* Decorative metal rivets/screws on the corner (matches HUD style) */}
      <div className="absolute top-2 left-2 w-1 h-1 rounded-full bg-[#10b981]/30" />
      <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-[#10b981]/30" />
      <div className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-[#10b981]/30" />
      <div className="absolute bottom-2 right-2 w-1 h-1 rounded-full bg-[#10b981]/30" />
    </div>
  );
}
