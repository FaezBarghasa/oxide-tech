import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, CheckCircle2, Download, ShieldCheck, Lock } from 'lucide-react';
import { t } from '../lib/i18n';
import { OXIDE_WHITEPAPER } from '../lib/whitepaper';
import { telemetry } from '../lib/analytics';

interface WhitepaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'fa' | 'en';
}

const WhitepaperModal: React.FC<WhitepaperModalProps> = ({ isOpen, onClose, lang }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [downloadTriggered, setDownloadTriggered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.company && formData.phone && formData.email) {
      telemetry.track('whitepaper_submit', 'whitepaper', formData.company, formData.email);
      setSubmitted(true);
      
      // Simulate real browser download
      setTimeout(() => {
        setDownloadTriggered(true);
        const dummyBlob = new Blob([
          `OXIDE TECH INDUSTRIAL WHITEPAPER\n` +
          `Title: ${OXIDE_WHITEPAPER.titleEn}\n` +
          `Version: ${OXIDE_WHITEPAPER.version}\n` +
          `Recipient: ${formData.name} (${formData.company})\n` +
          `Topics:\n` +
          OXIDE_WHITEPAPER.topics.map(t => `- ${t}`).join('\n')
        ], { type: 'text/plain;charset=utf-8' });
        
        const url = URL.createObjectURL(dummyBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Oxide-Tech-IIoT-Edge-AI-Whitepaper.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-[#070b14]/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          className="relative z-10 w-full max-w-xl bg-[#0f172a] border border-[#3b82f6]/40 rounded-sm shadow-[0_0_50px_rgba(59,130,246,0.25)] p-6 sm:p-8 text-start overflow-hidden"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Top Line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#3b82f6] via-[#06b6d4] to-[#10b981]" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 end-5 text-[#64748b] hover:text-white p-1 rounded-sm cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-sm bg-[#3b82f6]/10 text-[#3b82f6]">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#f8fafc]">
                    {t("WP_MODAL_TITLE", lang)}
                  </h3>
                  <div className="text-[11px] font-mono text-[#38bdf8]">
                    {OXIDE_WHITEPAPER.format} • {OXIDE_WHITEPAPER.pages} PAGES • {OXIDE_WHITEPAPER.version}
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#94a3b8] leading-relaxed mb-6 font-light">
                {t("WP_MODAL_DESC", lang)}
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">
                      {t("WP_FORM_NAME", lang)} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="مهندس علوی / Eng. Alavi"
                      className="w-full bg-[#1e293b]/70 border border-white/10 px-3.5 py-2.5 rounded-sm text-xs text-[#f8fafc] focus:border-[#3b82f6] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">
                      {t("WP_FORM_COMPANY", lang)} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="صنایع نفت / شرکت اتوماسیون"
                      className="w-full bg-[#1e293b]/70 border border-white/10 px-3.5 py-2.5 rounded-sm text-xs text-[#f8fafc] focus:border-[#3b82f6] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">
                      {t("WP_FORM_PHONE", lang)} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0912..."
                      className="w-full bg-[#1e293b]/70 border border-white/10 px-3.5 py-2.5 rounded-sm text-xs font-mono text-[#f8fafc] focus:border-[#3b82f6] focus:outline-none dir-ltr text-start"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">
                      {t("WP_FORM_EMAIL", lang)} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="cto@enterprise.ir"
                      className="w-full bg-[#1e293b]/70 border border-white/10 px-3.5 py-2.5 rounded-sm text-xs font-mono text-[#f8fafc] focus:border-[#3b82f6] focus:outline-none dir-ltr text-start"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full mt-4 bg-[#3b82f6] hover:bg-[#2563eb] text-white py-3 rounded-sm font-bold text-xs tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.4)] flex items-center justify-center gap-2 cursor-pointer uppercase"
                >
                  <Download className="w-4 h-4" />
                  <span>{t("WP_FORM_SUBMIT", lang)}</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[#64748b] mt-2">
                  <Lock className="w-3 h-3" />
                  <span>256-BIT ENCRYPTED ENTERPRISE INQUIRY</span>
                </div>
              </form>
            </div>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 bg-[#10b981]/10 text-[#10b981] rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#f8fafc]">
                {lang === 'fa' ? "درخواست شما تأیید گردید" : "Access Granted"}
              </h3>
              <p className="text-xs text-[#94a3b8] max-w-sm mx-auto leading-relaxed">
                {t("WP_SUCCESS", lang)}
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="bg-[#1e293b] hover:bg-[#3b82f6] text-white text-xs font-mono px-6 py-2 rounded-sm transition-colors cursor-pointer"
                >
                  {lang === 'fa' ? "بستن پنجره" : "Close"}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WhitepaperModal;
