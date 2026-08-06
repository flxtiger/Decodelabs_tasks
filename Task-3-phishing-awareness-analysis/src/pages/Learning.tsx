import React, { useState } from 'react';
import { BookOpen, Shield, AlertTriangle, Eye, Globe, Smartphone, Mail, FileWarning } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const MODULES = [
  {
    id: 'intro',
    icon: Shield,
    title: 'Phishing 101',
    description: 'Understand the basics of phishing and social engineering.',
    content: 'Phishing is a cyber attack that uses disguised email as a weapon. The goal is to trick the email recipient into believing that the message is something they want or need — a request from their bank, for instance, or a note from someone in their company — and to click a link or download an attachment.'
  },
  {
    id: 'spear',
    icon: Eye,
    title: 'Spear Phishing & Whaling',
    description: 'Targeted attacks on specific individuals or high-level executives.',
    content: 'Unlike mass phishing, spear phishing is highly targeted. Attackers gather information about their target to craft convincing emails. Whaling is a specific type of spear phishing aimed at high-profile targets like C-level executives.'
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Smishing & Vishing',
    description: 'Attacks over SMS (Smishing) and Voice calls (Vishing).',
    content: 'Smishing uses SMS text messages to lure victims into revealing personal information or downloading malware. Vishing relies on voice calls, often using spoofed caller IDs and social engineering tactics to extract information.'
  },
  {
    id: 'domain',
    icon: Globe,
    title: 'Domain Spoofing',
    description: 'How attackers fake sender addresses and domains.',
    content: 'Attackers often use lookalike domains (Typosquatting like g00gle.com) or spoof the display name in an email to make it appear as though the email is coming from a legitimate source.'
  }
];

export default function Learning() {
  const [activeModule, setActiveModule] = useState(MODULES[0]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-blue-400" />
          Awareness Training
        </h1>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-mono">Master the concepts of social engineering and threat vectors.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Module List */}
        <div className="space-y-3">
          {MODULES.map((mod) => (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod)}
              className={cn(
                "w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-4 group",
                activeModule.id === mod.id 
                  ? "bg-white/10 border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.1)]" 
                  : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10 backdrop-blur-sm"
              )}
            >
              <div className={cn(
                "p-2 rounded-lg shrink-0 transition-colors",
                activeModule.id === mod.id ? "bg-blue-500/20 text-blue-400" : "bg-black/40 text-gray-400 group-hover:text-blue-400"
              )}>
                <mod.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className={cn("font-bold text-xs uppercase tracking-widest", activeModule.id === mod.id ? "text-blue-400" : "text-white")}>
                  {mod.title}
                </h3>
                <p className="text-[10px] text-gray-400 font-mono mt-1 line-clamp-2">{mod.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8 min-h-[400px]"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 shadow-[0_0_20px_rgba(37,99,235,0.15)]">
                 <activeModule.icon className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight mb-4">{activeModule.title}</h2>
              <div className="max-w-none">
                <p className="text-gray-300 leading-relaxed text-sm">
                  {activeModule.content}
                </p>
              </div>
              
              <div className="mt-12 p-6 rounded-xl bg-orange-500/5 border border-orange-500/20 flex gap-4">
                 <AlertTriangle className="w-6 h-6 text-orange-500 shrink-0" />
                 <div>
                    <h4 className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-2">Red Flag Indicators</h4>
                    <ul className="text-xs font-mono text-orange-200/70 space-y-2 list-disc list-inside">
                       <li>Generic greetings instead of your name.</li>
                       <li>Requests for personal or financial information.</li>
                       <li>Creating a false sense of urgency.</li>
                    </ul>
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
