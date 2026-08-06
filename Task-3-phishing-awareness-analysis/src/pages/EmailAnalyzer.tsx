import React, { useState } from 'react';
import { Mail, Search, ShieldAlert, ShieldCheck, AlertTriangle, ChevronRight, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AnalyzerService } from '../services/analyzer';
import { AnalysisResult } from '../types';
import { cn } from '../lib/utils';
import { useAnalysis } from '../context/AnalysisContext';

export default function EmailAnalyzer() {
  const [subject, setSubject] = useState('');
  const [sender, setSender] = useState('');
  const [body, setBody] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { addResult } = useAnalysis();

  const handleAnalyze = () => {
    if (!body) return;
    setIsAnalyzing(true);
    
    // Simulate network delay for effect
    setTimeout(() => {
      const res = AnalyzerService.analyzeEmail(body, subject, sender);
      setResult(res);
      addResult(res);
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleExport = () => {
    window.print();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full h-full">
      {/* Analysis Entry (Left) */}
      <section className="w-full lg:w-1/3 flex flex-col gap-4">
        <div className="flex flex-col flex-1 rounded-xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> Content Analysis Input
          </h2>
          
          <label className="text-[10px] text-gray-500 uppercase font-mono mb-2">Sender (From)</label>
          <input
            type="text"
            placeholder="e.g., support@amaz0n-security.ru"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-gray-300 font-mono focus:outline-none focus:border-blue-500/50 mb-3 placeholder:text-gray-600"
          />
          
          <label className="text-[10px] text-gray-500 uppercase font-mono mb-2">Subject</label>
          <input
            type="text"
            placeholder="[URGENT] Account Restriction"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-gray-300 font-mono focus:outline-none focus:border-blue-500/50 mb-3 placeholder:text-gray-600"
          />
          
          <label className="text-[10px] text-gray-500 uppercase font-mono mb-2">Email Body / Raw Content</label>
          <textarea
            rows={8}
            placeholder="Paste raw email body or metadata here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="flex-1 w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-gray-300 font-mono resize-none focus:outline-none focus:border-blue-500/50 placeholder:text-gray-600 mb-4"
          />

          <button
            onClick={handleAnalyze}
            disabled={!body || isAnalyzing}
            className="mt-auto w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Scanning...
              </>
            ) : 'Perform Deep Scan'}
          </button>
        </div>

        <div className="h-40 rounded-xl border border-white/10 bg-[#0a0c10]/60 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[10px] uppercase tracking-widest text-gray-400">Learning Insight</h3>
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[8px] font-bold">TIP #42</span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed italic">
            "Look out for <span className="text-yellow-400">Typosquatting</span>: attackers register domains similar to popular brands (e.g., amaz0n.com vs amazon.com) to deceive users."
          </p>
        </div>
      </section>

      {/* Intelligence Dashboard (Right) */}
      <section className="flex-1 flex flex-col gap-6">
        {!result && !isAnalyzing && (
          <div className="flex-1 flex items-center justify-center border border-white/5 rounded-xl bg-black/20">
            <div className="text-center">
               <ShieldAlert className="w-12 h-12 text-gray-600 mx-auto mb-4" />
               <p className="text-gray-500 text-sm font-mono uppercase tracking-widest">Awaiting Analysis Input</p>
            </div>
          </div>
        )}

        {isAnalyzing && (
          <div className="flex-1 flex items-center justify-center border border-blue-500/20 rounded-xl bg-blue-900/5 relative overflow-hidden">
             <motion.div 
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent pointer-events-none"
             />
             <div className="text-center relative z-10">
                <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-400 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-blue-400 text-sm font-mono uppercase tracking-widest">Processing Vector Data...</p>
             </div>
          </div>
        )}

        {result && !isAnalyzing && (
          <>
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className={cn("rounded-xl border p-4 text-center relative overflow-hidden group", 
                result.level === 'MALICIOUS' ? "bg-red-500/5 border-red-500/20" :
                result.level === 'SUSPICIOUS' ? "bg-orange-500/5 border-orange-500/20" :
                "bg-green-500/5 border-green-500/20"
              )}>
                <div className="absolute top-0 right-0 p-1 opacity-10">
                  <ShieldAlert className={cn("w-16 h-16", 
                    result.level === 'MALICIOUS' ? "text-red-500" :
                    result.level === 'SUSPICIOUS' ? "text-orange-500" :
                    "text-green-500"
                  )} />
                </div>
                <p className={cn("text-[10px] uppercase font-bold tracking-widest mb-1", 
                  result.level === 'MALICIOUS' ? "text-red-400" :
                  result.level === 'SUSPICIOUS' ? "text-orange-400" :
                  "text-green-400"
                )}>Threat Score</p>
                <h3 className={cn("text-4xl font-mono font-bold leading-none", 
                  result.level === 'MALICIOUS' ? "text-red-500" :
                  result.level === 'SUSPICIOUS' ? "text-orange-500" :
                  "text-green-500"
                )}>{result.score}<span className="text-sm opacity-50">/100</span></h3>
                <p className={cn("text-[10px] mt-2 font-mono uppercase", 
                  result.level === 'MALICIOUS' ? "text-red-400" :
                  result.level === 'SUSPICIOUS' ? "text-orange-400" :
                  "text-green-400"
                )}>Calculated</p>
              </div>

              <div className={cn("rounded-xl border p-4 text-center", 
                result.level === 'MALICIOUS' ? "bg-red-500/5 border-red-500/20" :
                result.level === 'SUSPICIOUS' ? "bg-orange-500/5 border-orange-500/20" :
                "bg-green-500/5 border-green-500/20"
              )}>
                <p className={cn("text-[10px] uppercase font-bold tracking-widest mb-1", 
                  result.level === 'MALICIOUS' ? "text-red-400" :
                  result.level === 'SUSPICIOUS' ? "text-orange-400" :
                  "text-green-400"
                )}>Risk Level</p>
                <h3 className={cn("text-4xl font-mono font-bold leading-none", 
                  result.level === 'MALICIOUS' ? "text-red-500" :
                  result.level === 'SUSPICIOUS' ? "text-orange-500" :
                  "text-green-500"
                )}>{result.level}</h3>
                <div className="flex gap-1 justify-center mt-3">
                  <div className={cn("h-1 w-6", result.level === 'SAFE' || result.level === 'SUSPICIOUS' || result.level === 'MALICIOUS' ? (result.level === 'SAFE' ? 'bg-green-500' : result.level === 'SUSPICIOUS' ? 'bg-orange-500' : 'bg-red-500') : 'bg-white/10')}></div>
                  <div className={cn("h-1 w-6", result.level === 'SUSPICIOUS' || result.level === 'MALICIOUS' ? (result.level === 'SUSPICIOUS' ? 'bg-orange-500' : 'bg-red-500') : 'bg-white/10')}></div>
                  <div className={cn("h-1 w-6", result.level === 'MALICIOUS' ? 'bg-red-500' : 'bg-white/10')}></div>
                  <div className={cn("h-1 w-6", 'bg-white/10')}></div>
                </div>
              </div>

              <div className="rounded-xl bg-blue-500/5 border border-blue-500/20 p-4 text-center">
                <p className="text-[10px] text-blue-400 uppercase font-bold tracking-widest mb-1">Detected Flags</p>
                <h3 className="text-4xl font-mono font-bold text-blue-400 leading-none">{String(result.findings.length).padStart(2, '0')}</h3>
                <p className="text-[10px] text-blue-400 mt-2 font-mono uppercase">Anomalies Identified</p>
              </div>
            </div>

            {/* Analysis Details */}
            <div className="flex-1 rounded-xl border border-white/10 bg-black/20 flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white">Detailed Threat Indicators</h3>
                <div className="flex gap-2">
                  <span className="px-2 py-1 rounded-full text-[8px] bg-white/5 text-gray-300 border border-white/10 font-bold uppercase">{result.id}</span>
                </div>
              </div>

              <div className="flex-1 p-0 flex flex-col divide-y divide-white/5 overflow-y-auto">
                {result.findings.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 text-sm">No significant threat indicators found.</div>
                ) : (
                  result.findings.map((finding, i) => (
                    <div key={i} className="flex items-center p-4 hover:bg-white/5 transition-colors group">
                      <div className={cn("w-8 h-8 rounded-full flex items-center justify-center mr-4 font-mono text-xs font-bold shrink-0", 
                        finding.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                        finding.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-blue-500/20 text-blue-400'
                      )}>
                        {finding.severity === 'CRITICAL' ? '!!' : '!'}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-white">{finding.category}</h4>
                        <p className="text-[11px] text-gray-400 mt-1">{finding.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className={cn("text-[10px] uppercase font-bold", 
                          finding.severity === 'CRITICAL' ? 'text-red-500' :
                          finding.severity === 'HIGH' ? 'text-orange-400' :
                          'text-blue-400'
                        )}>{finding.severity}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className={cn("p-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
                result.level === 'MALICIOUS' ? 'bg-red-900/10' :
                result.level === 'SUSPICIOUS' ? 'bg-orange-900/10' :
                'bg-green-900/10'
              )}>
                <div className="flex items-start sm:items-center gap-3">
                  <div className={cn("w-2 h-2 rounded-full mt-1 sm:mt-0 shrink-0", 
                    result.level === 'MALICIOUS' ? 'bg-red-500 animate-ping' :
                    result.level === 'SUSPICIOUS' ? 'bg-orange-500 animate-ping' :
                    'bg-green-500'
                  )}></div>
                  <div className="flex flex-col">
                    <p className={cn("text-xs font-semibold uppercase tracking-widest italic font-mono mb-1",
                      result.level === 'MALICIOUS' ? 'text-red-400' :
                      result.level === 'SUSPICIOUS' ? 'text-orange-400' :
                      'text-green-400'
                    )}>
                      {result.level === 'MALICIOUS' ? 'System recommendation: ESCALATE TO SOC' :
                       result.level === 'SUSPICIOUS' ? 'System recommendation: PROCEED WITH CAUTION' :
                       'System recommendation: NO ACTION REQUIRED'}
                    </p>
                    <div className="text-[10px] text-gray-400 space-y-0.5">
                      {result.recommendations.map((r, i) => <p key={i}>- {r}</p>)}
                    </div>
                  </div>
                </div>
                <button onClick={handleExport} className="shrink-0 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-[10px] font-bold uppercase tracking-widest border border-white/20 transition-all">
                  Generate PDF Report
                </button>
              </div>
            </div>

            {/* Print Footer */}
            <div className="hidden print:block fixed bottom-0 left-0 right-0 p-8 border-t border-gray-300 text-xs text-center text-black bg-white">
              <p className="font-bold mb-2">Developed By: Saurabh Prasad Gupta</p>
              <p>Organization: DecodeLabs</p>
              <p>Industrial Training Project</p>
              <p>Batch: 2026</p>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
