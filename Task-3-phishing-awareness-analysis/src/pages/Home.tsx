import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Search, BookOpen, ChevronRight, Activity, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050608] text-gray-300 font-sans selection:bg-blue-500/30 overflow-hidden relative">
      {/* Background Cyber Effects */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="px-6 py-6 lg:px-12 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3 text-blue-500">
          <Shield className="w-8 h-8" />
          <span className="text-xl font-bold tracking-tight text-white">DECODELABS</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/learn" className="text-sm font-medium text-gray-400 hover:text-white transition-colors hidden sm:block uppercase tracking-widest">
            Learning Hub
          </Link>
          <Link to="/analyze/email" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all shadow-lg shadow-blue-900/20">
            Platform Login
          </Link>
        </div>
      </header>

      <main className="relative z-10 px-6 lg:px-12 pt-20 pb-32 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Column: Copy */}
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/20 border border-blue-500/30 text-blue-400 text-[10px] font-bold tracking-widest uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            DecodeLabs Industrial Training Project
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]"
          >
            Phishing <br className="hidden lg:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
               Awareness Analysis
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 font-medium"
          >
            Developed by Saurabh Prasad Gupta
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center justify-center lg:justify-start gap-4 text-xs font-mono"
          >
             <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full font-bold uppercase tracking-widest">
               Cyber Security Intern
             </span>
             <span className="px-3 py-1 bg-white/5 text-gray-300 border border-white/10 rounded-full font-bold uppercase tracking-widest">
               Batch 2026
             </span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4"
          >
            <Link to="/analyze/email" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)]">
              Start Analysis Engine <ChevronRight className="w-5 h-5" />
            </Link>
            <Link to="/learn" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2">
              <BookOpen className="w-5 h-5" /> Learning Hub
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Visuals */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 w-full max-w-lg lg:max-w-none relative"
        >
          {/* Glassmorphic Dashboard Preview */}
          <div className="relative rounded-2xl bg-[#0a0c10]/80 backdrop-blur-xl border border-white/10 p-6 shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-green-500" />
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
              </div>
              <div className="text-[10px] uppercase tracking-widest font-mono text-gray-500">sys.scan.run()</div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-4 hover:bg-white/10 transition-colors">
                <div className="p-2 rounded-lg bg-red-500/20 text-red-400 mt-1">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm">Suspicious Payload Detected</h3>
                  <p className="text-gray-400 text-xs mt-1 font-mono">Domain mismatch in return-path header. High probability of spear phishing.</p>
                  <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-[85%]" />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-4 hover:bg-white/10 transition-colors">
                <div className="p-2 rounded-lg bg-green-500/20 text-green-400 mt-1">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm">Attachment Analysis</h3>
                  <p className="text-gray-400 text-xs mt-1 font-mono">File signature verified. No malicious macros identified.</p>
                  <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[15%]" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Animated scanning line */}
            <motion.div 
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent pointer-events-none z-20"
            />
          </div>
        </motion.div>
      </main>
      
      {/* Features Grid */}
      <section className="border-t border-white/10 bg-[#0a0c10]/50 relative z-10 py-20 px-6 lg:px-12">
         <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { icon: Search, title: 'Deep Analysis Engine', desc: 'Paste emails, URLs, or headers for instant threat evaluation based on known phishing indicators.' },
                 { icon: Activity, title: 'Simulation Environment', desc: 'Practice analyzing real-world phishing attempts in a safe, controlled sandbox.' },
                 { icon: Lock, title: 'Threat Intelligence', desc: 'Learn the latest social engineering tactics, from whaling to typosquatting.' }
               ].map((f, i) => (
                 <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors group">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-500/20 transition-colors">
                      <f.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-2">{f.title}</h3>
                    <p className="text-gray-400 text-xs font-mono leading-relaxed">{f.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Login Page Footer */}
      <footer className="border-t border-white/10 bg-[#050608] py-8 text-center text-[10px] uppercase tracking-widest text-gray-500 font-mono flex flex-col items-center justify-center gap-2">
        <p>Industrial Training Project</p>
        <p>Developed by <span className="text-white font-bold">Saurabh Prasad Gupta</span></p>
      </footer>
    </div>
  );
}
