import React, { useState, useEffect, useCallback } from 'react';
import { PasswordCheckResponse } from '../types';
import { PasswordDetails } from './PasswordDetails';
import { Eye, EyeOff, X, RefreshCw, Copy, Check, ShieldAlert, CheckCircle2, XCircle, Settings, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PasswordChecker: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState<PasswordCheckResponse | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Advanced Settings State
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [genLength, setGenLength] = useState(16);
  const [genUpper, setGenUpper] = useState(true);
  const [genLower, setGenLower] = useState(true);
  const [genNumber, setGenNumber] = useState(true);
  const [genSymbol, setGenSymbol] = useState(true);
  
  // Data Breach Check State
  const [pwnedCount, setPwnedCount] = useState<number | null>(null);
  const [isCheckingPwned, setIsCheckingPwned] = useState(false);
  const [pwnedError, setPwnedError] = useState('');
  
  // Debounce the API call
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const response = await fetch('/api/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password })
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Failed to analyze password', error);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [password]);

  // Reset pwned status on password change
  useEffect(() => {
    setPwnedCount(null);
    setPwnedError('');
  }, [password]);

  const checkDataBreach = async () => {
    if (!password) return;
    setIsCheckingPwned(true);
    setPwnedCount(null);
    setPwnedError('');
    try {
      const encoder = new TextEncoder();
      const dataToHash = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-1', dataToHash);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
      
      const prefix = hashHex.slice(0, 5);
      const suffix = hashHex.slice(5);

      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      if (!response.ok) throw new Error('API error');
      
      const text = await response.text();
      const lines = text.split('\n');
      let foundCount = 0;
      for (const line of lines) {
        const [lineSuffix, count] = line.split(':');
        if (lineSuffix === suffix) {
          foundCount = parseInt(count.trim(), 10);
          break;
        }
      }
      setPwnedCount(foundCount);
    } catch (e) {
      setPwnedError('Failed to check database. Please try again.');
    } finally {
      setIsCheckingPwned(false);
    }
  };

  const generatePassword = () => {
    let charset = "";
    if (genUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (genLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (genNumber) charset += "0123456789";
    if (genSymbol) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    
    // Fallback if nothing selected
    if (charset === "") {
        charset = "abcdefghijklmnopqrstuvwxyz";
        setGenLower(true);
    }

    let newPassword = "";
    if (genUpper) newPassword += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
    if (genLower) newPassword += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
    if (genNumber) newPassword += "0123456789"[Math.floor(Math.random() * 10)];
    if (genSymbol) newPassword += "!@#$%^&*"[Math.floor(Math.random() * 8)];
    
    for (let i = newPassword.length; i < genLength; i++) {
      newPassword += charset[Math.floor(Math.random() * charset.length)];
    }
    
    // Shuffle
    newPassword = newPassword.split('').sort(() => 0.5 - Math.random()).join('');
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getProgressColor = () => {
    if (!data) return 'bg-slate-700';
    if (data.strength === 'Weak') return 'bg-red-500';
    if (data.strength === 'Medium') return 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]';
    if (data.strength === 'Strong') return 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]';
    return 'bg-slate-700';
  };

  const getProgressWidth = () => {
    if (!data) return '0%';
    return `${(data.score / 5) * 100}%`;
  };

  const CheckItem = ({ label, passed }: { label: string; passed: boolean }) => (
    <div className="flex items-center gap-2 text-sm bg-slate-800/40 p-2.5 rounded-lg border border-white/5 transition-colors">
      {passed ? (
        <CheckCircle2 className="w-4 h-4 text-green-500" />
      ) : (
        <XCircle className="w-4 h-4 text-slate-600" />
      )}
      <span className={passed ? 'text-slate-200' : 'text-slate-500'}>{label}</span>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto glass-card rounded-xl p-6 md:p-8 lg:p-10 relative overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-blue-500/10 blur-[100px] pointer-events-none" />

      <div className="text-center mb-10 relative z-10">
        <h2 className="text-3xl font-semibold text-white mb-3 flex items-center justify-center gap-3">
          <ShieldAlert className="w-8 h-8 text-blue-500" />
          Analyze Password
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">Analyze your password strength with real-time security insights and recommendations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 relative z-10">
        {/* Left Column: Input and Basic Checks */}
        <div className="flex flex-col">
          <div className="relative group z-10">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..."
              className="w-full bg-slate-900/50 border border-white/10 text-white rounded-lg p-5 pr-32 font-mono text-xl input-focus transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {password && (
                <button
                  onClick={() => setPassword('')}
                  className="p-2.5 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-700/50"
                  title="Clear"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-2.5 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-700/50"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {data?.isCommon && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3"
            >
              <ShieldAlert className="w-6 h-6 text-red-500 shrink-0" />
              <p className="text-sm text-red-200">
                <strong>Warning:</strong> This password is extremely common and can be cracked instantly by attackers.
              </p>
            </motion.div>
          )}

          {/* Progress Bar */}
          <div className="mt-8 mb-3 flex justify-between items-end">
            <span className="text-sm font-medium text-slate-400 uppercase tracking-wide">Strength Score</span>
            <span className={`text-base font-bold uppercase tracking-wider ${
              data?.strength === 'Weak' ? 'text-red-500' :
              data?.strength === 'Medium' ? 'text-orange-500' :
              data?.strength === 'Strong' ? 'text-green-500' : 'text-slate-500'
            }`}>
              {data?.strength || '---'}
            </span>
          </div>
          <div className="h-3 w-full bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${getProgressColor()} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: getProgressWidth() }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>

          <div className="mt-10 grid grid-cols-2 gap-y-5 gap-x-4">
            <CheckItem label="Length (8+)" passed={data?.checks?.length ?? false} />
            <CheckItem label="Uppercase" passed={data?.checks?.uppercase ?? false} />
            <CheckItem label="Lowercase" passed={data?.checks?.lowercase ?? false} />
            <CheckItem label="Numbers" passed={data?.checks?.number ?? false} />
            <CheckItem label="Symbols" passed={data?.checks?.special ?? false} />
          </div>

          <div className="mt-10 pt-8 border-t border-slate-700/50 flex flex-col sm:flex-row gap-4">
            <button
              onClick={generatePassword}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-4 px-5 rounded-xl font-medium transition-colors border border-blue-500/50 shadow-lg shadow-blue-500/20"
            >
              <RefreshCw className="w-5 h-5" />
              Generate Strong Password
            </button>
            <button
              onClick={copyToClipboard}
              disabled={!password}
              className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 px-8 rounded-xl font-medium transition-colors border border-slate-600"
            >
              {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Right Column: Details and Advanced Tools */}
        <div className="flex flex-col h-full space-y-6">
          <div className="flex-1">
            <PasswordDetails data={data} />
          </div>

          {/* Advanced Features Toggle */}
          <div className="pt-2">
            <button 
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-between w-full p-5 bg-slate-800/30 hover:bg-slate-800/50 rounded-xl border border-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Settings className="w-6 h-6 text-blue-400" />
                <span className="font-semibold text-slate-200 text-lg">Advanced Tools</span>
              </div>
              <span className="text-sm font-medium text-slate-400 bg-slate-800 px-3 py-1 rounded-full">{showAdvanced ? 'Hide' : 'Show'}</span>
            </button>

            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 mt-4 bg-slate-800/40 rounded-xl border border-white/5 space-y-8">
                    
                    {/* Data Breach Check */}
                    <div>
                      <h4 className="text-base font-semibold text-slate-200 mb-3 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-blue-400" />
                        Data Breach Check
                      </h4>
                      <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                        Check if this password has been exposed in a known data breach. Uses k-anonymity, your password is never sent or exposed.
                      </p>
                      <div className="flex flex-wrap items-center gap-4">
                        <button
                          onClick={checkDataBreach}
                          disabled={!password || isCheckingPwned}
                          className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded-lg text-sm font-medium text-white transition-colors border border-slate-600"
                        >
                          {isCheckingPwned ? 'Checking...' : 'Check Database'}
                        </button>
                        {pwnedCount !== null && (
                          <span className={`text-sm font-semibold ${pwnedCount > 0 ? 'text-red-400' : 'text-green-400'}`}>
                            {pwnedCount > 0 ? `Found ${pwnedCount.toLocaleString()} times in breaches!` : 'No breaches found!'}
                          </span>
                        )}
                        {pwnedError && <span className="text-sm text-red-400">{pwnedError}</span>}
                      </div>
                    </div>

                    {/* Generator Settings */}
                    <div className="pt-6 border-t border-slate-700/50">
                      <h4 className="text-base font-semibold text-slate-200 mb-5 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-blue-400" />
                        Generator Options
                      </h4>
                      
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium text-slate-300">Length</label>
                            <span className="text-sm text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded">{genLength}</span>
                          </div>
                          <input 
                            type="range" min="8" max="64" value={genLength} 
                            onChange={(e) => setGenLength(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <label className="flex items-center gap-3 text-sm font-medium text-slate-300 cursor-pointer p-2 hover:bg-white/5 rounded-lg transition-colors">
                            <input type="checkbox" checked={genUpper} onChange={(e) => setGenUpper(e.target.checked)} className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900" /> Uppercase
                          </label>
                          <label className="flex items-center gap-3 text-sm font-medium text-slate-300 cursor-pointer p-2 hover:bg-white/5 rounded-lg transition-colors">
                            <input type="checkbox" checked={genLower} onChange={(e) => setGenLower(e.target.checked)} className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900" /> Lowercase
                          </label>
                          <label className="flex items-center gap-3 text-sm font-medium text-slate-300 cursor-pointer p-2 hover:bg-white/5 rounded-lg transition-colors">
                            <input type="checkbox" checked={genNumber} onChange={(e) => setGenNumber(e.target.checked)} className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900" /> Numbers
                          </label>
                          <label className="flex items-center gap-3 text-sm font-medium text-slate-300 cursor-pointer p-2 hover:bg-white/5 rounded-lg transition-colors">
                            <input type="checkbox" checked={genSymbol} onChange={(e) => setGenSymbol(e.target.checked)} className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900" /> Symbols
                          </label>
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
