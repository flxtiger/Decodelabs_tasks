import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, RefreshCcw, Copy, Trash2, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { encrypt, decrypt } from '../lib/cipher';

type Toast = {
  id: number;
  message: string;
  type: 'success' | 'error';
};

export default function CipherTool() {
  const [inputText, setInputText] = useState('');
  const [shiftKey, setShiftKey] = useState('3');
  const [encryptedOutput, setEncryptedOutput] = useState('');
  const [decryptedOutput, setDecryptedOutput] = useState('');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const addToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const validate = (): number | null => {
    if (!inputText.trim()) {
      addToast('Please enter some text.', 'error');
      return null;
    }
    if (!shiftKey.trim()) {
      addToast('Please enter a shift key.', 'error');
      return null;
    }
    const shiftNum = parseInt(shiftKey, 10);
    if (isNaN(shiftNum)) {
      addToast('Shift key must be numeric.', 'error');
      return null;
    }
    return shiftNum;
  };

  const handleEncrypt = () => {
    const shift = validate();
    if (shift !== null) {
      setIsAnimating(true);
      setTimeout(() => {
        setEncryptedOutput(encrypt(inputText, shift));
        setDecryptedOutput('');
        setIsAnimating(false);
        addToast('Text encrypted successfully!', 'success');
      }, 500);
    }
  };

  const handleDecrypt = () => {
    const shift = validate();
    if (shift !== null) {
      setIsAnimating(true);
      setTimeout(() => {
        setDecryptedOutput(decrypt(inputText, shift));
        setEncryptedOutput('');
        setIsAnimating(false);
        addToast('Text decrypted successfully!', 'success');
      }, 500);
    }
  };

  const handleClear = () => {
    setInputText('');
    setShiftKey('3');
    setEncryptedOutput('');
    setDecryptedOutput('');
    addToast('Fields cleared.', 'success');
    textareaRef.current?.focus();
  };

  const handleCopy = (text: string, type: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      addToast(`${type} text copied to clipboard!`, 'success');
    });
  };

  return (
    <div className="max-w-[1400px] w-[95%] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Interface Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Input Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-8 lg:p-10 shadow-2xl shadow-black/50"
        >
          <div className="flex justify-between items-end mb-4">
            <label htmlFor="inputText" className="text-lg font-semibold text-slate-200 flex items-center gap-3">
              <ChevronRight className="w-5 h-5 text-cyan-400" />
              Plain Text
            </label>
            <span className="text-sm text-cyan-400 font-mono bg-cyan-900/30 px-3 py-1.5 rounded-lg border border-cyan-500/20">
              {inputText.length} chars
            </span>
          </div>
          <textarea
            id="inputText"
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to encrypt or decrypt..."
            className="w-full h-64 bg-slate-900/80 border border-slate-600 rounded-2xl p-6 text-slate-100 text-lg placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all resize-none font-mono leading-relaxed shadow-inner"
          />

          <div className="mt-8 flex flex-col sm:flex-row gap-6 items-end">
            <div className="w-full sm:w-48">
              <label htmlFor="shiftKey" className="block text-lg font-semibold text-slate-200 mb-3">
                Shift Key
              </label>
              <input
                id="shiftKey"
                type="number"
                value={shiftKey}
                onChange={(e) => setShiftKey(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-600 rounded-2xl px-6 py-4 text-slate-100 text-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all font-mono text-center shadow-inner"
              />
            </div>
            
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={handleEncrypt}
                disabled={isAnimating}
                className="group relative flex flex-col items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-2xl py-4 transition-all overflow-hidden shadow-lg hover:shadow-blue-500/25"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                <Lock className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold uppercase tracking-wider">Encrypt</span>
              </button>
              <button
                onClick={handleDecrypt}
                disabled={isAnimating}
                className="group relative flex flex-col items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white rounded-2xl py-4 transition-all overflow-hidden border border-slate-600 shadow-lg"
              >
                <Unlock className="w-6 h-6 group-hover:scale-110 transition-transform text-cyan-400" />
                <span className="text-sm font-bold uppercase tracking-wider text-slate-300">Decrypt</span>
              </button>
              <button
                onClick={handleClear}
                className="group flex flex-col items-center justify-center gap-2 bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-2xl py-4 transition-all border border-slate-700 hover:border-red-500/30 shadow-lg"
              >
                <Trash2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold uppercase tracking-wider">Clear</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Output Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 flex flex-col gap-8"
        >
          {/* Encrypted Output Card */}
          <div className={`relative bg-slate-800/80 backdrop-blur-xl border rounded-3xl p-8 transition-all duration-500 ${encryptedOutput ? 'border-cyan-500/50 shadow-[0_0_30px_rgba(0,229,255,0.15)]' : 'border-slate-700'}`}>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-md font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-3">
                <Lock className="w-5 h-5" /> Encrypted
              </h3>
              {encryptedOutput && (
                <button 
                  onClick={() => handleCopy(encryptedOutput, 'Encrypted')}
                  className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-700 transition-colors border border-transparent hover:border-slate-600"
                  title="Copy to clipboard"
                >
                  <Copy className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="h-40 bg-slate-900/80 rounded-2xl p-5 border border-slate-700/50 overflow-y-auto font-mono text-lg break-words relative shadow-inner">
              {isAnimating && encryptedOutput === '' && decryptedOutput === '' ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <RefreshCcw className="w-8 h-8 text-cyan-500 animate-spin" />
                </div>
              ) : encryptedOutput ? (
                <span className="text-cyan-100 selection:bg-cyan-500/40">{encryptedOutput}</span>
              ) : (
                <span className="text-slate-600 italic">No encrypted output yet...</span>
              )}
            </div>
          </div>

          {/* Decrypted Output Card */}
          <div className={`relative bg-slate-800/80 backdrop-blur-xl border rounded-3xl p-8 transition-all duration-500 ${decryptedOutput ? 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.15)]' : 'border-slate-700'}`}>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-md font-bold text-blue-400 uppercase tracking-widest flex items-center gap-3">
                <Unlock className="w-5 h-5" /> Decrypted
              </h3>
              {decryptedOutput && (
                <button 
                  onClick={() => handleCopy(decryptedOutput, 'Decrypted')}
                  className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-700 transition-colors border border-transparent hover:border-slate-600"
                  title="Copy to clipboard"
                >
                  <Copy className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="h-40 bg-slate-900/80 rounded-2xl p-5 border border-slate-700/50 overflow-y-auto font-mono text-lg break-words relative shadow-inner">
               {isAnimating && encryptedOutput === '' && decryptedOutput === '' ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <RefreshCcw className="w-8 h-8 text-blue-500 animate-spin" />
                </div>
              ) : decryptedOutput ? (
                <span className="text-blue-100 selection:bg-blue-500/40">{decryptedOutput}</span>
              ) : (
                <span className="text-slate-600 italic">No decrypted output yet...</span>
              )}
            </div>
          </div>

        </motion.div>
      </div>

      {/* Toast Notifications */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl pointer-events-auto ${
                toast.type === 'success' 
                  ? 'bg-emerald-900/80 border-emerald-500/50 text-emerald-100'
                  : 'bg-red-900/80 border-red-500/50 text-red-100'
              }`}
            >
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-400" />
              )}
              <p className="text-md font-semibold">{toast.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
