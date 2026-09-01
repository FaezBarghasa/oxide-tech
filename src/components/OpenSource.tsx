import React from 'react';
import { motion } from 'motion/react';
import { t } from '../lib/i18n';
import { GitBranch, ExternalLink, Star, Terminal } from 'lucide-react';
import { telemetry } from '../lib/analytics';

interface OpenSourceProps {
  lang: 'fa' | 'en';
}

const OpenSource: React.FC<OpenSourceProps> = ({ lang }) => {
  const repos = [
    {
      name: "mqtt-async-embedded",
      desc: lang === 'fa' 
        ? "کلاینت فوق سبک، ناهمگام و بدون هیپ (Zero-Alloc) پروتکل MQTT v5 برای تارگت‌های no_std میکروکنترلری (STM32 & ESP32)."
        : "Lightweight zero-allocation async MQTT v5 client for bare-metal embedded targets with Embassy integration.",
      language: "Rust",
      tag: "no_std // IIoT // Embassy",
      repoUrl: "https://github.com/FaezBarghasa/mqtt-async-embedded",
    },
    {
      name: "Rotary_Library",
      desc: lang === 'fa'
        ? "کتابخانه صنعتی انکودر روتاری با الگوریتم حذف نویز تماسی (Debounce) و پردازش بلادرنگ پالس‌ها."
        : "Industrial-grade rotary encoder quadrature decoding engine with hardware debounce filters.",
      language: "C++ / Rust",
      tag: "Rotary // Quadrature // DSP",
      repoUrl: "https://github.com/MonibMo/Rotary_Library",
    },
    {
      name: "r_klipp",
      desc: lang === 'fa'
        ? "ابزار خط فرمان با کارایی بالا برای مدیریت بافر کلیپ‌بورد در سرورهای لینوکسی و محیط‌های توسعه توزیع‌شده."
        : "Fast native clipboard bridge daemon and CLI utility engineered in Rust for Wayland & headless sessions.",
      language: "Rust",
      tag: "CLI // Linux // IPC",
      repoUrl: "https://github.com/FaezBarghasa/r_klipp",
    },
    {
      name: "omid",
      desc: lang === 'fa'
        ? "موتور بهینه‌سازی و تحلیل بلادرنگ تله‌متری با قابلیت اتصال مستقیم به پایگاه‌های داده صنعتی."
        : "High-throughput industrial telemetry engine designed for low-latency operational data ingestion.",
      language: "Rust",
      tag: "Telemetry // Stream // Analytics",
      repoUrl: "https://github.com/FaezBarghasa/omid",
    },
  ];

  return (
    <section id="opensource" className="mb-32 scroll-mt-24">
      {/* Section Header */}
      <motion.div 
        className="mb-14 text-start"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <span className="text-xs font-mono tracking-widest text-[#ff7f41] uppercase block mb-3 font-bold">
          {t("OSS_SUB", lang)}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#fbfbfb] font-bold tracking-tight">
          {t("OSS_TITLE", lang)}
        </h2>
        <p className="text-sm text-[#c2b5ad] mt-3 max-w-2xl font-light">
          {t("OSS_DESC", lang)}
        </p>
        <div className="h-[2px] w-20 bg-gradient-to-r from-[#c1552c] to-[#ff7f41] mt-4 rounded-full"></div>
      </motion.div>

      {/* 2x2 Repos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {repos.map((repo, idx) => (
          <motion.div
            key={idx}
            className="bg-[#161210]/80 backdrop-blur-xl border border-[#ff7f41]/15 p-7 rounded-sm hover:border-[#c1552c]/60 transition-all duration-300 flex flex-col justify-between group shadow-lg text-start relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            {/* Top Hover Line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#c1552c] to-[#ff7f41] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[#ff7f41] font-mono text-sm font-bold">
                  <GitBranch className="w-4 h-4 text-[#c1552c]" />
                  <span>{repo.name}</span>
                </div>

                <span className="text-[10px] font-mono text-[#ff7f41] bg-[#c1552c]/10 border border-[#c1552c]/20 px-2 py-0.5 rounded-xs flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff7f41]" />
                  <span>{repo.language}</span>
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#c2b5ad] leading-relaxed mb-6 font-light">
                {repo.desc}
              </p>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#85746a]">
                {repo.tag}
              </span>

              <a
                href={repo.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => telemetry.track(`view_repo_${repo.name}`, 'opensource_click')}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#ff7f41] hover:text-white hover:bg-[#c1552c] border border-[#c1552c]/30 px-3 py-1.5 rounded-sm transition-all duration-200"
              >
                <span>{t("OSS_VIEW_GITHUB", lang)}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OpenSource;
