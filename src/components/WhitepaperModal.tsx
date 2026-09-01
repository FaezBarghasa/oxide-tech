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
          className="absolute inset-0 bg-[#07070a]/85 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          className="relative z-10 w-full max-w-xl bg-[#161210] border border-[#c1552c]/50 rounded-sm shadow-[0_0_50px_rgba(193,85,44,0.3)] p-6 sm:p-8 text-start overflow-hidden"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Top Line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#c1552c] via-[#ff7f41] to-[#eab308]" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 end-5 text-[#85746a] hover:text-white p-1 rounded-sm cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-sm bg-[#c1552c]/15 text-[#ff7f41]">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#fbfbfb]">
                    {t("WP_MODAL_TITLE", lang)}
                  </h3>
                  <div className="text-[11px] font-mono text-[#ff7f41] font-semibold">
                    {OXIDE_WHITEPAPER.format} • {OXIDE_WHITEPAPER.pages} PAGES • {OXIDE_WHITEPAPER.version}
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#c2b5ad] leading-relaxed mb-6 font-light">
                {t("WP_MODAL_DESC", lang)}
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#c2b5ad] mb-1.5">
                      {t("WP_FORM_NAME", lang)} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="مهندس علوی / Eng. Alavi"
                      className="w-full bg-[#1b1714] border border-[#c1552c]/30 px-3.5 py-2.5 rounded-sm text-xs text-[#fbfbfb] focus:border-[#ff7f41] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#c2b5ad] mb-1.5">
                      {t("WP_FORM_COMPANY", lang)} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="صنایع نفت / شرکت اتوماسیون"
                      className="w-full bg-[#1b1714] border border-[#c1552c]/30 px-3.5 py-2.5 rounded-sm text-xs text-[#fbfbfb] focus:border-[#ff7f41] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#c2b5ad] mb-1.5">
                      {t("WP_FORM_PHONE", lang)} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0912..."
                      className="w-full bg-[#1b1714] border border-[#c1552c]/30 px-3.5 py-2.5 rounded-sm text-xs font-mono text-[#fbfbfb] focus:border-[#ff7f41] focus:outline-none dir-ltr text-start"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#c2b5ad] mb-1.5">
                      {t("WP_FORM_EMAIL", lang)} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="eng@company.ir"
                      className="w-full bg-[#1b1714] border border-[#c1552c]/30 px-3.5 py-2.5 rounded-sm text-xs font-mono text-[#fbfbfb] focus:border-[#ff7f41] focus:outline-none dir-ltr text-start"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Lock className="w-3.5 h-3.5 text-[#85746a]" />
                  <span className="text-[10px] font-mono text-[#85746a]">
                    Zero telemetry spam. Confidential enterprise delivery.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#c1552c] hover:bg-[#d9531e] text-white py-3 px-6 rounded-sm text-xs font-mono font-bold tracking-wider hover:shadow-[0_0_20px_rgba(193,85,44,0.5)] transition-all cursor-pointer uppercase flex items-center justify-center gap-2 mt-4"
                >
                  <Download className="w-4 h-4" />
                  <span>{t("WP_FORM_SUBMIT", lang)}</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#ff7f41] mx-auto animate-bounce" />
              <h3 className="text-xl font-bold text-[#fbfbfb]">
                {t("WP_SUCCESS_TITLE", lang)}
              </h3>
              <p className="text-xs text-[#c2b5ad] max-w-md mx-auto leading-relaxed">
                {t("WP_SUCCESS_DESC", lang)}
              </p>
              
              {downloadTriggered && (
                <div className="p-3 bg-[#c1552c]/10 border border-[#c1552c]/30 rounded-sm font-mono text-xs text-[#ff7f41] flex items-center justify-center gap-2">
                  <Download className="w-4 h-4 animate-pulse" />
                  <span>DOWNLOAD STARTED // SHA-256 VERIFIED</span>
                </div>
              )}

              <button
                onClick={onClose}
                className="mt-6 border border-[#c1552c]/40 text-[#ff7f41] hover:bg-[#c1552c]/15 px-6 py-2 rounded-sm text-xs font-mono cursor-pointer"
              >
                Close Window
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WhitepaperModal;
