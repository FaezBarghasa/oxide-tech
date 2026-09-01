import React from 'react';
import { motion } from 'motion/react';
import { t } from '../lib/i18n';
import { GitBranch, Star, Terminal, ExternalLink, Code2 } from 'lucide-react';
import { telemetry } from '../lib/analytics';

interface OpenSourceProps {
  lang: 'fa' | 'en';
}

const OpenSource: React.FC<OpenSourceProps> = ({ lang }) => {
  const repos = [
    {
      name: t("OSS_1_NAME", lang),
      desc: t("OSS_1_DESC", lang),
      tag: t("OSS_1_TAG", lang),
      repoUrl: 'https://github.com/FaezBarghasa/mqtt-async-embedded',
      stars: '48',
      language: 'Rust (no_std)'
    },
    {
      name: t("OSS_2_NAME", lang),
      desc: t("OSS_2_DESC", lang),
      tag: t("OSS_2_TAG", lang),
      repoUrl: 'https://github.com/monib-mokhtari/Rotary_Library',
      stars: '32',
      language: 'Rust (embedded-hal)'
    },
    {
      name: t("OSS_3_NAME", lang),
      desc: t("OSS_3_DESC", lang),
      tag: t("OSS_3_TAG", lang),
      repoUrl: 'https://github.com/FaezBarghasa/r_klipp',
      stars: '64',
      language: 'Rust (Kinematics)'
    },
    {
      name: t("OSS_4_NAME", lang),
      desc: t("OSS_4_DESC", lang),
      tag: t("OSS_4_TAG", lang),
      repoUrl: 'https://github.com/FaezBarghasa/omid',
      stars: '29',
      language: 'Rust (Robotics)'
    }
  ];

  return (
    <section id="opensource" className="mb-32">
      {/* Section Header */}
      <motion.div 
        className="mb-14 text-start"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <span className="text-xs font-mono tracking-widest text-[#3b82f6] uppercase block mb-3">
          {t("OSS_SUB", lang)}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#f8fafc] font-bold tracking-tight">
          {t("OSS_TITLE", lang)}
        </h2>
        <p className="text-sm text-[#94a3b8] mt-3 max-w-2xl font-light">
          {t("OSS_DESC", lang)}
        </p>
        <div className="h-[2px] w-20 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] mt-4 rounded-full"></div>
      </motion.div>

      {/* 2x2 Repos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {repos.map((repo, idx) => (
          <motion.div
            key={idx}
            className="bg-[#0f172a]/70 backdrop-blur-xl border border-white/5 p-7 rounded-sm hover:border-[#3b82f6]/40 transition-all duration-300 flex flex-col justify-between group shadow-lg text-start relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            {/* Top Hover Line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[#60a5fa] font-mono text-sm font-bold">
                  <GitBranch className="w-4 h-4 text-[#3b82f6]" />
                  <span>{repo.name}</span>
                </div>

                <span className="text-[10px] font-mono text-[#34d399] bg-[#10b981]/10 border border-[#10b981]/20 px-2 py-0.5 rounded-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                  <span>{repo.language}</span>
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed mb-6 font-light">
                {repo.desc}
              </p>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#64748b]">
                {repo.tag}
              </span>

              <a
                href={repo.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => telemetry.track(`view_repo_${repo.name}`, 'opensource_click')}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#93c5fd] hover:text-white hover:bg-[#3b82f6] px-3 py-1.5 rounded-sm transition-all duration-200"
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
