import React from 'react';
import { PasswordCheckResponse } from '../types';
import { ShieldAlert, ShieldCheck, Shield, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PasswordDetailsProps {
  data: PasswordCheckResponse | null;
}

export const PasswordDetails: React.FC<PasswordDetailsProps> = ({ data }) => {
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 gap-6"
    >
      <div className="bg-white/5 rounded-xl p-5 border border-white/10">
        <h3 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-500" />
          Security Details
        </h3>
        <ul className="space-y-3">
          <li className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Password Length</span>
            <span className="font-semibold text-slate-200">{data.details.length} chars</span>
          </li>
          <li className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Character Variety</span>
            <span className="font-semibold text-slate-200">
              {[data.checks.uppercase, data.checks.lowercase, data.checks.number, data.checks.special].filter(Boolean).length} / 4 types
            </span>
          </li>
          <li className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Entropy Score</span>
            <span className="font-semibold text-slate-200">{Math.round(data.details.entropy)} bits</span>
          </li>
          <li className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Estimated Crack Time</span>
            <span className="font-semibold text-slate-200">{data.details.crackTime}</span>
          </li>
          <li className="flex justify-between items-center text-sm pt-3 border-t border-white/5 mt-1">
            <span className="text-slate-300 font-medium">Overall Security Score</span>
            <span className={`font-bold ${data.score >= 4 ? 'text-green-500' : data.score >= 2 ? 'text-orange-500' : 'text-red-500'}`}>
              {Math.min(100, Math.round((data.score / 5) * 100))}/100
            </span>
          </li>
        </ul>
      </div>

      <div className="bg-white/5 rounded-xl p-5 border border-white/10">
        <h3 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-500" />
          Suggestions
        </h3>
        <AnimatePresence mode="popLayout">
          {data.feedback.length > 0 ? (
            <ul className="space-y-2">
              {data.feedback.map((tip, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-2 text-sm text-slate-300"
                >
                  <ShieldAlert className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  {tip}
                </motion.li>
              ))}
            </ul>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-sm text-green-400"
            >
              <CheckCircle2 className="w-4 h-4" />
              Password follows all security best practices.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
