import React from 'react';
import { FileText, Search, ShieldAlert, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function HeaderAnalyzer() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center max-w-2xl mx-auto">
         <div className="w-16 h-16 mx-auto bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
           <FileText className="w-8 h-8" />
         </div>
         <h1 className="text-3xl font-bold text-white tracking-tight">Email Header Forensics</h1>
         <p className="text-gray-400 mt-3 text-sm">Analyze raw SMTP headers to detect spoofing, mismatched return paths, and routing anomalies.</p>
      </div>
      
      <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-xl">
         <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Raw Header Input</span>
         </div>
         <textarea 
           rows={12}
           placeholder="Paste raw email headers here (e.g., Delivered-To, Received, Return-Path, DKIM-Signature)..."
           className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-gray-300 focus:outline-none focus:border-blue-500/50 font-mono text-sm resize-none mb-4 shadow-inner"
         />
         <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 active:scale-[0.99]">
            <Search className="w-4 h-4" /> Execute Header Analysis
         </button>
      </div>
    </div>
  );
}
