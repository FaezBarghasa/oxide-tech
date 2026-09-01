import React from 'react';
import { motion } from 'motion/react';
import { t } from '../lib/i18n';
import { Cpu, ShieldCheck, Terminal, ExternalLink, Award, Sparkles } from 'lucide-react';
import { telemetry } from '../lib/analytics';

interface ArchitectsProps {
  lang: 'fa' | 'en';
}

const Architects: React.FC<ArchitectsProps> = ({ lang }) => {
  const leaders = [
    {
      name: t("ARCH_MONIB_NAME", lang),
      role: t("ARCH_MONIB_ROLE", lang),
      bio: t("ARCH_MONIB_BIO", lang),
      highlights: [
        lang === 'fa' ? "۲۳ سال سابقه در طراحی سخت‌افزار، شماتیک و بردهای چندلایه" : "23+ Years Hardware Co-Design & EDA Architecture",
        lang === 'fa' ? "طراحی بردهای صنعتی با رعایت کامل استانداردهای EMI/EMC" : "Full EMI/EMC Compliance & High-Speed Layout",
        lang === 'fa' ? "پیاده‌سازی فریمورک‌های بلادرنگ با RTIC v2 در میکروکنترلرهای STM32" : "Real-Time Embedded Systems with RTIC v2 on STM32",
        lang === 'fa' ? "مهندسی قابلیت اطمینان و استانداردهای ایمنی عملکردی" : "Functional Safety & High-Reliability Control"
      ],
      githubUrl: "https://github.com/MonibMo",
      accentColor: "#c1552c",
      initials: "MM",
      tags: ["STM32", "PCB EMI/EMC", "RTIC v2", "Hardware-Software Co-Design", "Functional Safety"]
    },
    {
      name: t("ARCH_FAEZ_NAME", lang),
      role: t("ARCH_FAEZ_ROLE", lang),
      bio: t("ARCH_FAEZ_BIO", lang),
      highlights: [
        lang === 'fa' ? "توسعه فول‌استک سیستم با Rust (از no_std تا کلود)" : "Full-Stack Rust Systems (no_std to Sovereign Cloud)",
        lang === 'fa' ? "پایپلاین‌های DMA کپی-صفر (Zero-Copy) و پروتکل‌های بدون هیپ" : "Zero-Copy DMA Pipelines & Heap-Free Async Protocols",
        lang === 'fa' ? "یکپارچه‌سازی هوش مصنوعی لبه (YOLOv8) با رابط‌های کاربری Slint" : "Edge AI (YOLO) & Cross-Platform Slint HMI Integration",
        lang === 'fa' ? "پژوهش و توسعه سیستم‌های عامل ریزهسته‌ای (Redox OS)" : "Microkernel OS & Redox IPC Concurrency Research"
      ],
      githubUrl: "https://github.com/FaezBarghasa",
      accentColor: "#ff7f41",
      initials: "FB",
      tags: ["Rust no_std", "Embassy Async", "Zero-Copy DMA", "Slint Framework", "Edge AI", "Redox OS"]
    }
  ];

  return (
    <section id="architects" className="mb-32 scroll-mt-24">
      {/* Section Header */}
      <motion.div 
        className="mb-14 text-start"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <span className="text-xs font-mono tracking-widest text-[#ff7f41] uppercase block mb-3 font-bold">
          {t("ARCH_SUB", lang)}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#fbfbfb] font-bold tracking-tight">
          {t("ARCH_TITLE", lang)}
        </h2>
        <p className="text-sm text-[#c2b5ad] mt-3 max-w-2xl font-light">
          {t("ARCH_DESC", lang)}
        </p>
        <div className="h-[2px] w-20 bg-gradient-to-r from-[#c1552c] to-[#ff7f41] mt-4 rounded-full"></div>
      </motion.div>

      {/* Side-by-Side Dual Core Leadership Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {leaders.map((leader, i) => (
          <motion.div
            key={i}
            className="bg-[#161210]/80 backdrop-blur-xl border border-[#ff7f41]/15 p-8 rounded-sm hover:border-[#c1552c]/60 transition-all duration-400 relative overflow-hidden group flex flex-col justify-between text-start shadow-xl"
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
                    className="w-14 h-14 rounded-sm flex items-center justify-center font-mono text-xl font-bold text-white shadow-lg border border-[#c1552c]/30"
                    style={{ backgroundColor: `${leader.accentColor}30` }}
                  >
                    {leader.initials}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#fbfbfb]">
                      {leader.name}
                    </h3>
                    <div className="text-xs font-mono text-[#ff7f41] font-semibold mt-0.5">
                      {leader.role}
                    </div>
                  </div>
                </div>

                <a
                  href={leader.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => telemetry.track(`github_architect_${leader.initials}`, 'opensource_click')}
                  className="p-2.5 rounded-sm bg-[#1b1714] hover:bg-[#c1552c] text-[#c2b5ad] hover:text-white transition-all duration-200"
                  title="View GitHub Profile"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Bio Statement */}
              <p className="text-xs sm:text-sm text-[#c2b5ad] leading-relaxed mb-6 font-light">
                {leader.bio}
              </p>

              {/* Engineering Highlights */}
              <div className="mb-6 space-y-2">
                {leader.highlights.map((hl, hIdx) => (
                  <div key={hIdx} className="flex items-center gap-2 text-xs font-mono text-[#c2b5ad]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff7f41]" />
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
                  className="text-[9px] font-mono text-[#ff7f41] bg-[#c1552c]/10 border border-[#c1552c]/25 px-2.5 py-1 rounded-xs"
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
