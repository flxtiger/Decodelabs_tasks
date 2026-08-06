import { motion } from 'motion/react';
import { Lock, Unlock, Key, Smartphone, Moon, Copy, Trash2, Hash, ShieldAlert, Shield, Zap, Sparkles } from 'lucide-react';

const features = [
  { icon: Lock, title: 'Encryption', desc: 'Securely convert plain text to cipher text.' },
  { icon: Unlock, title: 'Decryption', desc: 'Revert cipher text back to plain text.' },
  { icon: Key, title: 'Custom Shift Key', desc: 'User-defined numeric shift values.' },
  { icon: Smartphone, title: 'Responsive', desc: 'Perfectly scales on all devices.' },
  { icon: Moon, title: 'Dark Mode', desc: 'Eye-friendly cyber security theme.' },
  { icon: Copy, title: 'Copy Button', desc: 'One-click copy to clipboard.' },
  { icon: Trash2, title: 'Clear Button', desc: 'Instantly reset all input fields.' },
  { icon: Hash, title: 'Character Counter', desc: 'Real-time text length tracking.' },
  { icon: ShieldAlert, title: 'Validation', desc: 'Prevents empty or invalid inputs.' },
  { icon: Shield, title: 'Cyber Theme', desc: 'Professional glowing aesthetics.' },
  { icon: Zap, title: 'Fast Processing', desc: 'Zero-latency local execution.' },
  { icon: Sparkles, title: 'Beautiful UI', desc: 'Glassmorphism and smooth animations.' },
];

export default function Features() {
  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Project Features</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full shadow-[0_0_15px_rgba(0,229,255,0.5)]"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {features.map((feat, index) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="bg-slate-800/40 backdrop-blur border border-slate-700/50 p-6 rounded-2xl hover:bg-slate-800 hover:border-cyan-500/30 hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform border border-slate-700 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]">
              <feat.icon className="w-7 h-7 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{feat.title}</h3>
            <p className="text-slate-400 text-md leading-relaxed">{feat.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
