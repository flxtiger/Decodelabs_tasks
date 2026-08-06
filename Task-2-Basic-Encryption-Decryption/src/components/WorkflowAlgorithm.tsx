import { motion } from 'motion/react';
import { ArrowRight, Code, Binary, Cpu, Workflow } from 'lucide-react';

export default function WorkflowAlgorithm() {
  const workflowSteps = [
    'User Input',
    'Caesar Cipher',
    'Encryption',
    'Cipher Text',
    'Decryption',
    'Original Text'
  ];

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      {/* Workflow Section */}
      <div>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Project Workflow</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full shadow-[0_0_15px_rgba(0,229,255,0.5)]"></div>
        </div>

        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-4">
          {workflowSteps.map((step, index) => (
            <div key={step} className="flex flex-col md:flex-row items-center gap-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/80 backdrop-blur border border-slate-600 px-6 py-4 rounded-xl shadow-lg hover:border-cyan-400 transition-colors text-center"
              >
                <span className="text-lg font-bold text-slate-100">{step}</span>
              </motion.div>
              {index < workflowSteps.length - 1 && (
                <ArrowRight className="w-6 h-6 text-slate-500 hidden md:block" />
              )}
               {index < workflowSteps.length - 1 && (
                <ArrowRight className="w-6 h-6 text-slate-500 block md:hidden rotate-90" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Algorithm Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 lg:p-12 relative overflow-hidden"
      >
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
            <Cpu className="w-7 h-7 text-cyan-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Algorithm: Caesar Cipher</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
          <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
            <p>
              The Caesar Cipher is a substitution cipher where each letter in the plaintext is shifted a certain number of places down the alphabet.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Code className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                <span><strong className="text-white">ASCII Base:</strong> Uses ASCII character codes to perform mathematical shifts on characters.</span>
              </li>
              <li className="flex items-start gap-3">
                <Workflow className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                <span><strong className="text-white">Shift Key:</strong> The user-defined integer value determining the offset.</span>
              </li>
              <li className="flex items-start gap-3">
                <Binary className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                <span><strong className="text-white">Modulo 26:</strong> Ensures the shift wraps around the 26-letter English alphabet correctly.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-4">Encryption Formula</h3>
              <div className="bg-black/50 p-4 rounded-xl border border-slate-800 font-mono text-xl text-center text-emerald-400 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                E(n) = (n + shift) mod 26
              </div>
            </div>
            <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-4">Decryption Formula</h3>
              <div className="bg-black/50 p-4 rounded-xl border border-slate-800 font-mono text-xl text-center text-blue-400 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                D(n) = (n - shift) mod 26
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
