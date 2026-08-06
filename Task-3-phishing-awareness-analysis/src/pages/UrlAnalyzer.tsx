import React, { useState } from 'react';
import { Link as LinkIcon, Search, ShieldAlert, ShieldCheck, AlertTriangle, ChevronRight, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AnalyzerService } from '../services/analyzer';
import { AnalysisResult } from '../types';
import { cn } from '../lib/utils';
import { useAnalysis } from '../context/AnalysisContext';

export default function UrlAnalyzer() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { addResult } = useAnalysis();

  const handleAnalyze = () => {
    if (!url) return;
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const res = AnalyzerService.analyzeUrl(url);
      setResult(res);
      addResult(res);
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 mx-auto bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
           <LinkIcon className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">URL Threat Scanner</h1>
        <p className="text-gray-400 mt-3 text-sm">Detect typosquatting, malicious domains, and shortened URL redirects before you click.</p>
      </div>

      <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-2 rounded-xl flex items-center shadow-lg focus-within:ring-1 focus-within:ring-blue-500/50 transition-all">
        <div className="pl-4 pr-2 text-gray-500">
           <Search className="w-5 h-5" />
        </div>
        <input 
           type="url"
           placeholder="https://example.com/login"
           value={url}
           onChange={(e) => setUrl(e.target.value)}
           className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-gray-600 px-2 py-3 text-sm"
           onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
        />
        <button 
          onClick={handleAnalyze}
          disabled={!url || isAnalyzing}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest transition-colors shadow-lg shadow-blue-900/20"
        >
          {isAnalyzing ? 'Scanning...' : 'Analyze Link'}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {result && !isAnalyzing && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 border border-white/10 backdrop-blur-sm rounded-2xl overflow-hidden mt-8"
          >
            <div className={cn(
              "p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10",
              result.level === 'SAFE' ? "bg-green-500/5" :
              result.level === 'SUSPICIOUS' ? "bg-orange-500/5" :
              "bg-red-500/5"
            )}>
               <div className="flex items-center gap-4">
                  <div className={cn(
                     "w-12 h-12 rounded-xl flex items-center justify-center border",
                     result.level === 'SAFE' ? "bg-green-500/10 text-green-400 border-green-500/20" :
                     result.level === 'SUSPICIOUS' ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                     "bg-red-500/10 text-red-400 border-red-500/20"
                  )}>
                     {result.level === 'SAFE' ? <ShieldCheck className="w-6 h-6" /> :
                      result.level === 'SUSPICIOUS' ? <AlertTriangle className="w-6 h-6" /> :
                      <ShieldAlert className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className={cn("text-lg font-bold tracking-tight", 
                      result.level === 'SAFE' ? "text-green-400" : 
                      result.level === 'SUSPICIOUS' ? "text-orange-400" : "text-red-400"
                    )}>{result.level} URL</h3>
                    <p className="text-xs text-gray-400 font-mono mt-1 truncate max-w-md">{result.content}</p>
                  </div>
               </div>
               <div className="text-right">
                  <div className={cn("text-2xl font-bold font-mono",
                      result.level === 'SAFE' ? "text-green-400" : 
                      result.level === 'SUSPICIOUS' ? "text-orange-400" : "text-red-400"
                  )}>{result.score}<span className="text-sm opacity-50">/100</span></div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">Risk Score</p>
               </div>
            </div>

            <div className="p-6">
              <h4 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">Analysis Results</h4>
              {result.findings.length === 0 ? (
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-gray-400 text-sm flex items-center gap-3 font-mono">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  No malicious patterns detected in this URL.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.findings.map((finding, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                         <div className={cn(
                           "w-2 h-2 rounded-full",
                           finding.severity === 'CRITICAL' ? 'bg-red-500' :
                           finding.severity === 'HIGH' ? 'bg-orange-500' :
                           finding.severity === 'MEDIUM' ? 'bg-yellow-500' : 'bg-blue-500'
                         )} />
                         <span className="font-bold text-white text-xs uppercase tracking-widest">{finding.category}</span>
                      </div>
                      <p className="text-xs text-gray-400 font-mono mt-2">{finding.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
