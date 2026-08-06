import { motion } from 'motion/react';
import { User, ShieldCheck, Building2, Terminal } from 'lucide-react';

export default function InfoCards() {
  return (
    <div className="py-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Project Info Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-cyan-500/30 transition-all duration-300 group"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
            <Terminal className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white">Project Information</h3>
        </div>
        
        <div className="space-y-4 text-lg">
          <InfoRow label="Project Name" value="Basic Encryption & Decryption" />
          <InfoRow label="Technology" value="Python, Flask, HTML5, CSS3, JavaScript" />
          <InfoRow label="Algorithm" value="Caesar Cipher" />
          <InfoRow label="Category" value="Cyber Security" />
          <InfoRow label="Project Type" value="Industrial Internship Project" />
          <InfoRow label="Organization" value="DecodeLabs" />
        </div>
      </motion.div>

      {/* Developer Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-blue-500/30 transition-all duration-300 group relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 blur-3xl rounded-full"></div>
        <div className="flex items-center gap-5 mb-6">
          <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.3)]">
            <User className="w-10 h-10 text-cyan-300" />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">Saurabh Prasad Gupta</h3>
            <p className="text-cyan-400 text-lg font-medium">Cyber Security Intern</p>
            <p className="text-md text-slate-400">Full Stack Developer | Python Developer</p>
          </div>
        </div>
        
        <p className="text-slate-300 text-lg leading-relaxed italic mb-8">
          "This project was designed and developed by Saurabh Prasad Gupta as part of the DecodeLabs Cyber Security Industrial Training Program. The objective of this project is to demonstrate the implementation of Caesar Cipher encryption and decryption while following professional software development practices."
        </p>

        <div className="flex flex-wrap gap-3">
          {['Python', 'Flask', 'Cyber Security', 'HTML', 'CSS', 'JavaScript'].map((badge) => (
            <span key={badge} className="px-4 py-2 text-md bg-slate-900 border border-slate-700 rounded-full text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors shadow-sm">
              {badge}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Company Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-indigo-500/30 transition-all duration-300 group"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
            <Building2 className="w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white">About DecodeLabs</h3>
        </div>
        
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          "This project has been completed as part of the DecodeLabs Industrial Training Program. DecodeLabs provides practical industry-focused projects that help students develop real-world software engineering and cyber security skills."
        </p>

        <div className="grid grid-cols-2 gap-4">
          <CompanyStat label="Program" value="Industrial Training" />
          <CompanyStat label="Domain" value="Cyber Security" />
          <CompanyStat label="Assignment" value="Project 2" />
          <CompanyStat label="Cohort" value="Batch 2026" />
        </div>
      </motion.div>

      {/* Internship Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-emerald-500/30 transition-all duration-300 group"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
            <ShieldCheck className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white">Industrial Training Project</h3>
        </div>
        
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          This application was developed as part of the Cyber Security Industrial Training Program conducted by DecodeLabs.
        </p>

        <div>
          <h4 className="text-md font-semibold text-slate-400 uppercase tracking-wider mb-4">Skills Demonstrated</h4>
          <div className="flex flex-wrap gap-3">
            {['Python', 'Flask', 'Frontend Development', 'Problem Solving', 'Encryption Concepts', 'Caesar Cipher', 'Cyber Security Basics'].map((skill) => (
              <span key={skill} className="px-4 py-2 text-md bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-300 font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center py-4 border-b border-slate-700/50 last:border-0">
      <span className="text-slate-400 font-medium w-48 shrink-0">{label}</span>
      <span className="text-slate-100 font-semibold">{value}</span>
    </div>
  );
}

function CompanyStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/50">
      <p className="text-sm text-slate-500 uppercase font-semibold mb-2">{label}</p>
      <p className="text-slate-200 text-lg font-medium">{value}</p>
    </div>
  );
}
