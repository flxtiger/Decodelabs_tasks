import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-slate-900/50 backdrop-blur-md mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-center text-center md:text-left">
          
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Shield className="w-8 h-8 text-cyan-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent tracking-wide">CryptoCore</span>
            </div>
            <p className="text-slate-400 text-md">Basic Encryption & Decryption</p>
            <p className="text-slate-500 text-sm uppercase tracking-wider font-semibold mt-2">Industrial Training Project</p>
          </div>

          <div className="space-y-2 text-center">
            <p className="text-slate-400 text-sm uppercase tracking-widest font-semibold mb-2">Developed By</p>
            <p className="text-cyan-400 font-bold text-xl">Saurabh Prasad Gupta</p>
            <p className="text-slate-400 text-md">Cyber Security Intern</p>
          </div>

          <div className="space-y-2 text-center md:text-right">
            <p className="text-slate-400 text-sm uppercase tracking-widest font-semibold mb-2">Powered By</p>
            <p className="text-blue-400 font-bold text-xl">DecodeLabs</p>
            <p className="text-slate-500 text-md">Cohort 2026</p>
          </div>
          
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 text-center">
          <p className="text-slate-600 text-sm">&copy; 2026 Saurabh Prasad Gupta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
