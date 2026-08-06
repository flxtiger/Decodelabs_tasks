import React from 'react';
import { motion } from 'motion/react';
import { User, ShieldCheck, Code, Server, Database, Globe, ShieldAlert } from 'lucide-react';

export default function AboutDeveloper() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">About the Developer</h1>
        <p className="text-gray-400 mt-2">DecodeLabs Industrial Training Project</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8 text-center flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-900 to-blue-500 p-1 mb-6 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
              <div className="w-full h-full bg-[#050608] rounded-full flex items-center justify-center border-4 border-[#050608]">
                <User className="w-16 h-16 text-blue-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">Saurabh Prasad Gupta</h2>
            <p className="text-blue-400 font-medium mb-4 text-sm">Cyber Security Intern</p>
            
            <div className="w-full space-y-3 mt-4 text-left border-t border-white/10 pt-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Organization</p>
                <p className="text-white text-sm">DecodeLabs</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Project</p>
                <p className="text-white text-sm">Phishing Awareness Analysis</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Training Batch</p>
                <p className="text-white text-sm">2026</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
               <ShieldCheck className="w-5 h-5 text-blue-400" />
               About Project
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              Saurabh Prasad Gupta developed this Cyber Security project as part of the DecodeLabs Industrial Training Program. 
              The project focuses on phishing awareness, cyber threat analysis, phishing detection, and user security education. 
              It demonstrates practical knowledge of phishing analysis, threat identification, and secure web application development.
              This application is developed strictly for educational and cybersecurity awareness purposes under the DecodeLabs Industrial Training Program.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
               <Code className="w-5 h-5 text-blue-400" />
               Technical Expertise
            </h3>
            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-lg flex items-center gap-2 text-sm font-medium">
                <ShieldCheck className="w-4 h-4" /> Cyber Security
              </div>
              <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-300 rounded-lg flex items-center gap-2 text-sm font-medium">
                <ShieldAlert className="w-4 h-4" /> Threat Analysis
              </div>
              <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-lg flex items-center gap-2 text-sm font-medium">
                <Globe className="w-4 h-4" /> Web Development
              </div>
              <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 text-green-300 rounded-lg flex items-center gap-2 text-sm font-medium">
                <Server className="w-4 h-4" /> FastAPI
              </div>
              <div className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 rounded-lg flex items-center gap-2 text-sm font-medium">
                <Code className="w-4 h-4" /> React
              </div>
              <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-lg flex items-center gap-2 text-sm font-medium">
                <Database className="w-4 h-4" /> MongoDB
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
