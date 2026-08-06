import React from 'react';
import { PasswordChecker } from './components/PasswordChecker';
import { SecurityTips } from './components/SecurityTips';
import { AboutSection } from './components/AboutSection';
import { Shield } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#0F172A] text-[#E2E8F0]">
      <header className="py-5 px-6 glass-card sticky top-0 z-50 border-b border-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
              <Shield className="w-6 h-6 text-blue-500" />
            </div>
            <h1 className="text-xl font-semibold text-white tracking-tight">Password Strength Analyzer</h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-xs font-medium text-blue-400">Real-Time Password Analysis</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-12">
        <div className="w-full max-w-6xl mx-auto">
          <PasswordChecker />
          <div className="max-w-5xl mx-auto">
            <SecurityTips />
          </div>
          <AboutSection />
        </div>
      </main>

      <footer className="py-8 border-t border-slate-800/60 text-center text-slate-500 text-sm">
        <p>Developed by Saurabh Prasad Gupta | DecodeLabs Cyber Security Internship Project</p>
      </footer>
    </div>
  );
}

