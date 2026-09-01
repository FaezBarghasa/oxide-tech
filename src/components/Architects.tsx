import React from 'react';
import { motion } from 'motion/react';
import { t } from '../lib/i18n';
import { ShieldCheck, Cpu, GitBranch, Terminal, Award, Sparkles, ExternalLink } from 'lucide-react';
import { telemetry } from '../lib/analytics';

interface ArchitectsProps {
  lang: 'fa' | 'en';
}

const Architects: React.FC<ArchitectsProps> = ({ lang }) => {
  const leaders = [
    {
      name: t("ARCH_1_NAME", lang),
      role: t("ARCH_1_ROLE", lang),
      bio: t("ARCH_1_BIO", lang),
      tags: t("ARCH_1_TAGS", lang).split(', '),
      highlights: [
        'Hardware-Software Co-Design & EDA',
        'RTIC v2 Concurrency & Real-Time Kernels',
        'EMI/EMC Compliance & High-Density PCB',
        'Functional Safety (IEC 61508 / ISO 13485)'
      ],
      initials: 'MM',
      accentColor: '#3b82f6',
      githubUrl: 'https://github.com/monib-mokhtari'
    },
    {
      name: t("ARCH_2_NAME", lang),
      role: t("ARCH_2_ROLE", lang),
      bio: t("ARCH_2_BIO", lang),
      tags: t("ARCH_2_TAGS", lang).split(', '),
      highlights: [
        'Full-Stack Rust (no_std to Cloud Actix)',
        'Zero-Copy DMA Streaming Pipelines',
        'Async Embedded (Embassy) & Heap-Free MQTT',
        'Redox OS Kernel Architecture & Memory IPC Study'
      ],
      initials: 'FB',
      accentColor: '#06b6d4',
      githubUrl: 'https://github.com/FaezBarghasa'
    }
  ];

  return (
    <section id="architects" className="mb-32">
      {/* Section Header */}
      <motion.div 
        className="mb-14 text-start"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <span className="text-xs font-mono tracking-widest text-[#3b82f6] uppercase block mb-3">
          {t("ARCH_SUB", lang)}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#f8fafc] font-bold tracking-tight">
          {t("ARCH_TITLE", lang)}
        </h2>
        <p className="text-sm text-[#94a3b8] mt-3 max-w-2xl font-light">
          {t("ARCH_DESC", lang)}
        </p>
        <div className="h-[2px] w-20 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] mt-4 rounded-full"></div>
      </motion.div>

      {/* Side-by-Side Dual Core Leadership Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {leaders.map((leader, i) => (
          <motion.div
            key={i}
            className="bg-[#0f172a]/70 backdrop-blur-xl border border-white/5 p-8 rounded-sm hover:border-[#3b82f6]/40 transition-all duration-400 relative overflow-hidden group flex flex-col justify-between text-start shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            {/* Top Accent Line */}
            <div 
              className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{ background: `linear-gradient(to right, ${leader.accentColor}, transparent)` }}
            />

            <div>
              {/* Header Profile Lockup */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-14 h-14 rounded-sm flex items-center justify-center font-mono text-xl font-bold text-white shadow-lg border border-white/10"
                    style={{ backgroundColor: `${leader.accentColor}25` }}
                  >
                    {leader.initials}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#f8fafc]">
                      {leader.name}
                    </h3>
                    <div className="text-xs font-mono text-[#38bdf8] font-medium mt-0.5">
                      {leader.role}
                    </div>
                  </div>
                </div>

                <a
                  href={leader.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => telemetry.track(`github_architect_${leader.initials}`, 'opensource_click')}
                  className="p-2.5 rounded-sm bg-[#1e293b] hover:bg-[#3b82f6] text-[#94a3b8] hover:text-white transition-all duration-200"
                  title="View GitHub Profile"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Bio Statement */}
              <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed mb-6 font-light">
                {leader.bio}
              </p>

              {/* Engineering Highlights */}
              <div className="mb-6 space-y-2">
                {leader.highlights.map((hl, hIdx) => (
                  <div key={hIdx} className="flex items-center gap-2 text-xs font-mono text-[#94a3b8]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tag Badges Footer */}
            <div className="pt-5 border-t border-white/5 flex flex-wrap gap-1.5">
              {leader.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="text-[9px] font-mono text-[#93c5fd] bg-[#3b82f6]/10 border border-[#3b82f6]/20 px-2.5 py-1 rounded-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Architects;
