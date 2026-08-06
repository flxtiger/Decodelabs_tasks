import Hero from './components/Hero';
import CipherTool from './components/CipherTool';
import InfoCards from './components/InfoCards';
import Features from './components/Features';
import WorkflowAlgorithm from './components/WorkflowAlgorithm';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen font-sans bg-slate-900 text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
      
      {/* Animated Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-[40%] right-[-10%] w-[50%] h-[50%] bg-cyan-400/10 blur-[150px] rounded-full animate-pulse" style={{ animationDuration: '12s' }}></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-indigo-500/10 blur-[150px] rounded-full animate-pulse" style={{ animationDuration: '10s' }}></div>
      </div>

      <div className="relative z-10">
        <Hero />
        <CipherTool />
        <InfoCards />
        <Features />
        <WorkflowAlgorithm />
        <Footer />
      </div>
    </div>
  );
}
