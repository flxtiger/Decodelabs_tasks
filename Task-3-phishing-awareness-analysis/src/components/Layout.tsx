import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, LayoutDashboard, Mail, Link as LinkIcon, 
  FileText, BookOpen, User, LogOut, Menu, X, ChevronRight, Activity 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Email Analyzer', href: '/analyze/email', icon: Mail },
    { name: 'URL Analyzer', href: '/analyze/url', icon: LinkIcon },
    { name: 'Header Analyzer', href: '/analyze/headers', icon: FileText },
    { name: 'Learning Module', href: '/learn', icon: BookOpen },
    { name: 'Simulation Quiz', href: '/quiz', icon: Activity },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-[#050608] text-gray-200 font-sans selection:bg-blue-500/30">
      {/* Header Navigation */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#0a0c10]/80 backdrop-blur-md z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <div>
            <Link to="/">
              <h1 className="text-lg font-bold tracking-tight text-white">
                DECODELABS <span className="text-blue-400 text-sm font-normal ml-2 tracking-widest uppercase">PhishShield v2.6</span>
              </h1>
            </Link>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Senior Threat Intelligence Dashboard</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-4 text-xs font-medium uppercase tracking-wider">
            <Link to="/analyze/email" className={cn("transition-colors", location.pathname.includes('/analyze') ? "text-blue-400 border-b-2 border-blue-400 pb-1" : "text-gray-400 hover:text-white")}>Analyzer</Link>
            <Link to="/learn" className={cn("transition-colors", location.pathname === '/learn' ? "text-blue-400 border-b-2 border-blue-400 pb-1" : "text-gray-400 hover:text-white")}>Learning Hub</Link>
            <Link to="/dashboard" className={cn("transition-colors", location.pathname === '/dashboard' ? "text-blue-400 border-b-2 border-blue-400 pb-1" : "text-gray-400 hover:text-white")}>Reports</Link>
            <Link to="/quiz" className={cn("transition-colors", location.pathname === '/quiz' ? "text-blue-400 border-b-2 border-blue-400 pb-1" : "text-gray-400 hover:text-white")}>Simulation</Link>
          </nav>
          <div className="h-8 w-[1px] bg-white/10"></div>
          <Link to="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="text-right text-[10px] uppercase">
              <p className="text-gray-400 leading-none mb-1">Cyber Security Intern</p>
              <p className="text-white font-mono leading-none">Saurabh Prasad Gupta</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-900 to-blue-500 border border-white/20 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-[#050608] m-[2px] rounded-full flex items-center justify-center">
                <span className="text-blue-400 text-[10px] font-bold">SPG</span>
              </div>
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar Tools */}
        <aside className="w-16 border-r border-white/10 flex flex-col items-center py-6 gap-8 bg-[#0a0c10]/40 shrink-0">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                title={item.name}
                className={cn(
                  "p-2 rounded-lg transition-all relative group",
                  isActive
                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-inner"
                    : "text-gray-500 hover:text-white border border-transparent"
                )}
              >
                <item.icon className="w-6 h-6" />
                {/* Tooltip */}
                <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-black text-white text-[10px] uppercase tracking-widest whitespace-nowrap rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                  {item.name}
                </div>
              </Link>
            );
          })}
          
          <button 
            onClick={() => navigate('/')}
            title="Exit Platform"
            className="mt-auto p-2 text-gray-500 hover:text-white transition-colors group relative"
          >
            <LogOut className="w-6 h-6" />
             <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-black text-white text-[10px] uppercase tracking-widest whitespace-nowrap rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                  Exit
             </div>
          </button>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-auto p-6 bg-[#050608]">
          <div className="max-w-7xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Footer Stats Bar */}
      <footer className="h-10 border-t border-white/10 bg-[#050608] px-4 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-gray-500 uppercase shrink-0 gap-2 sm:gap-0">
        <div className="flex items-center gap-4 hidden sm:flex">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span>Threat DB: Online</span>
          </div>
          <span className="border-l border-white/10 pl-4">&copy; 2026 DecodeLabs Industrial Training Project</span>
        </div>
        <div className="flex items-center gap-4 text-[9px] sm:text-[10px]">
          <span>Developed by <span className="text-white font-bold">Saurabh Prasad Gupta</span></span>
          <span className="text-blue-500 border-l border-white/10 pl-4 hidden sm:inline">Cyber Security Intern</span>
          <span className="text-white border-l border-white/10 pl-4 hidden sm:inline">Batch 2026</span>
        </div>
      </footer>
    </div>
  );
}
