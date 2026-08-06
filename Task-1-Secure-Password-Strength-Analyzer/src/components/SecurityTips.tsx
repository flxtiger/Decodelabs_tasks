import React, { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const tips = [
  "Never reuse passwords across different accounts.",
  "Enable Two-Factor Authentication (2FA) wherever possible.",
  "Use a reputable Password Manager to generate and store passwords.",
  "Never share your passwords via text or email.",
  "Avoid using personal information like birthdays or pet names.",
  "A passphrase (multiple random words) is often stronger than a complex short password.",
  "Regularly monitor your accounts for suspicious activity."
];

export const SecurityTips: React.FC = () => {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card rounded-xl p-4 mt-8 flex items-center gap-4 overflow-hidden relative">
      <div className="bg-blue-500/20 p-2 rounded-full shrink-0">
        <Lightbulb className="w-5 h-5 text-blue-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Cyber Security Tip</p>
        <div className="relative h-[20px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTip}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-slate-300 absolute inset-0 truncate"
            >
              {tips[currentTip]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
