import { motion } from 'motion/react';
import { Lock } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative py-24 lg:py-32 flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/40 shadow-[0_0_40px_rgba(59,130,246,0.4)] mb-8 mx-auto"
      >
        <Lock className="w-12 h-12 md:w-16 md:h-16 text-cyan-400 drop-shadow-[0_0_15px_rgba(0,229,255,0.8)]" />
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6"
      >
        Basic Encryption <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">&</span> Decryption
      </motion.h1>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-3 mb-10"
      >
        <p className="text-xl md:text-3xl text-cyan-100 font-medium tracking-wide uppercase">
          Industrial Training Project
        </p>
        <p className="text-lg md:text-xl text-slate-400">
          Cyber Security Internship Project
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-slate-800/80 border border-slate-700/50 backdrop-blur-md shadow-lg"
      >
        <span className="text-slate-400 text-lg">Powered by</span>
        <span className="text-cyan-400 font-bold tracking-wider text-xl">DecodeLabs</span>
      </motion.div>
    </div>
  );
}
