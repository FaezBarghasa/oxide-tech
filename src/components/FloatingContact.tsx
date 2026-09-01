import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, Phone, X, Sparkles } from 'lucide-react';
import { telemetry } from '../lib/analytics';

interface FloatingContactProps {
  lang: 'fa' | 'en';
}

const FloatingContact: React.FC<FloatingContactProps> = ({ lang }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 start-6 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            className="mb-3 w-64 bg-[#0f172a] border border-[#3b82f6]/40 p-4 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.6)] text-start space-y-3"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold text-[#f8fafc]">
                {lang === 'fa' ? "ارتباط مستقیم مهندسی" : "Direct Engineering Channel"}
              </span>
              <button 
                onClick={() => setOpen(false)}
                className="text-[#64748b] hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Telegram */}
            <a
              href="https://t.me/oxide_tech"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => telemetry.track('telegram_click', 'cta')}
              className="flex items-center gap-3 p-2.5 rounded-sm bg-[#1e293b] hover:bg-[#3b82f6] text-[#93c5fd] hover:text-white transition-colors"
            >
              <Send className="w-4 h-4 text-[#38bdf8]" />
              <div className="text-xs font-mono">
                <div className="font-bold">Telegram Official</div>
                <div className="text-[10px] text-[#94a3b8]">@oxide_tech</div>
              </div>
            </a>

            {/* Corporate Hotline / Phone */}
            <a
              href="tel:+982188000000"
              onClick={() => telemetry.track('phone_call_click', 'cta')}
              className="flex items-center gap-3 p-2.5 rounded-sm bg-[#1e293b] hover:bg-[#3b82f6] text-[#93c5fd] hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-[#10b981]" />
              <div className="text-xs font-mono">
                <div className="font-bold">Direct Office Line</div>
                <div className="text-[10px] text-[#94a3b8]">+98 21 (Tehran HQ)</div>
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <button
        onClick={() => {
          setOpen(!open);
          telemetry.track('floating_contact_toggle', 'cta');
        }}
        className="w-12 h-12 rounded-full bg-[#3b82f6] hover:bg-[#2563eb] text-white shadow-[0_0_25px_rgba(59,130,246,0.6)] flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
        aria-label="Direct Technical Support"
      >
        <MessageSquare className="w-5 h-5" />
      </button>
    </div>
  );
};

export default FloatingContact;
