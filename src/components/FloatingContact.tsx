import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, X, PhoneCall, Copy, Check } from 'lucide-react';
import { telemetry } from '../lib/analytics';

interface FloatingContactProps {
  lang: 'fa' | 'en';
}

const FloatingContact: React.FC<FloatingContactProps> = ({ lang }) => {
  const [open, setOpen] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    telemetry.track(`copy_${id}`, 'cta');
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const contacts = [
    {
      id: "monib",
      name: lang === 'fa' ? "منیب مختاری" : "Monib Mokhtari",
      role: lang === 'fa' ? "مدیرعامل و معمار سیستم" : "CEO & Architect",
      phone: "+989123617481",
      phoneDisplay: "+98 912 361 7481",
      email: "monib.mokhtari@gmail.com",
      accent: "#c1552c"
    },
    {
      id: "faez",
      name: lang === 'fa' ? "فائز برق‌آسا" : "Faez Barghasa",
      role: lang === 'fa' ? "مدیر ارشد فناوری (CTO)" : "CTO & Systems Eng",
      phone: "+989359180154",
      phoneDisplay: "+98 935 918 0154",
      email: "faez.barghasa@gmail.com",
      accent: "#ff7f41"
    },
    {
      id: "office",
      name: lang === 'fa' ? "دفتر مرکزی اکساید تک" : "Oxide Tech Lab",
      role: lang === 'fa' ? "ارتباطات سازمانی" : "General Inquiries",
      phone: "+982188000000",
      phoneDisplay: "+98 21 8800 0000",
      email: "oxide.embedded@gmail.com",
      accent: "#eab308"
    }
  ];

  return (
    <div className="fixed bottom-6 start-6 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            className="mb-3 w-80 bg-[#161210] border border-[#c1552c]/50 p-4 rounded-sm shadow-[0_10px_35px_rgba(0,0,0,0.85)] text-start space-y-3 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-[#c1552c]/20 pb-2">
              <span className="text-xs font-bold text-[#fbfbfb] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span>{lang === 'fa' ? "ارتباط مستقیم با مهندسان" : "Direct Engineering Lines"}</span>
              </span>
              <button 
                onClick={() => setOpen(false)}
                className="text-[#85746a] hover:text-white p-0.5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              {contacts.map((c) => (
                <div 
                  key={c.id} 
                  className="p-2.5 rounded-sm bg-[#0b0908] border border-[#c1552c]/20 hover:border-[#c1552c]/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-[#fbfbfb]">{c.name}</span>
                    <span className="text-[9px] font-mono text-[#ff7f41]">{c.role}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] font-mono" dir="ltr">
                    {/* Call Link */}
                    <a
                      href={`tel:${c.phone}`}
                      onClick={() => telemetry.track(`call_${c.id}`, 'cta')}
                      className="flex-1 flex items-center gap-1.5 bg-[#1b1714] hover:bg-[#c1552c] text-[#ff7f41] hover:text-white px-2 py-1 rounded transition-colors dir-ltr"
                      title="Call direct line"
                      dir="ltr"
                    >
                      <Phone className="w-3 h-3 flex-shrink-0" />
                      <span className="dir-ltr text-[10px] font-bold" dir="ltr">{c.phoneDisplay}</span>
                    </a>

                    {/* Email Link */}
                    <a
                      href={`mailto:${c.email}`}
                      onClick={() => telemetry.track(`email_${c.id}`, 'cta')}
                      className="flex items-center justify-center p-1.5 bg-[#1b1714] hover:bg-[#c1552c] text-[#c2b5ad] hover:text-white rounded transition-colors dir-ltr"
                      title="Send Gmail"
                      dir="ltr"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>

                    {/* Copy Email Button */}
                    <button
                      onClick={() => handleCopy(c.email, `${c.id}_email`)}
                      className="p-1.5 bg-[#1b1714] hover:bg-[#c1552c] text-[#85746a] hover:text-white rounded transition-colors cursor-pointer"
                      title="Copy Gmail"
                    >
                      {copiedItem === `${c.id}_email` ? (
                        <Check className="w-3.5 h-3.5 text-[#ff7f41]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[9px] font-mono text-[#85746a] text-center pt-1 border-t border-white/5">
              // Direct access to core decision makers
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <button
        onClick={() => {
          setOpen(!open);
          telemetry.track('floating_contact_toggle', 'cta');
        }}
        className="w-13 h-13 rounded-full bg-[#c1552c] hover:bg-[#d9531e] text-white shadow-[0_0_25px_rgba(193,85,44,0.75)] flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
        aria-label="Direct Phone & Gmail Contacts"
      >
        <PhoneCall className="w-5 h-5" />
      </button>
    </div>
  );
};

export default FloatingContact;
