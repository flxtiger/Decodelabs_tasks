import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShieldAlert, ShieldCheck, AlertTriangle, FileText, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { useAnalysis } from '../context/AnalysisContext';
import { timeAgo } from '../lib/utils';

export default function Dashboard() {
  const { history } = useAnalysis();

  const stats = useMemo(() => {
    return {
      total: history.length,
      safe: history.filter(h => h.level === 'SAFE').length,
      suspicious: history.filter(h => h.level === 'SUSPICIOUS').length,
      malicious: history.filter(h => h.level === 'MALICIOUS').length,
    };
  }, [history]);

  const chartData = useMemo(() => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return {
        name: dayNames[d.getDay()],
        dateKey: d.toDateString(),
        safe: 0,
        suspicious: 0,
        malicious: 0,
      };
    });

    history.forEach(log => {
      if (!log.timestamp) return;
      const d = new Date(log.timestamp);
      const dateKey = d.toDateString();
      const dayData = last7Days.find(day => day.dateKey === dateKey);
      if (dayData) {
        if (log.level === 'SAFE') dayData.safe++;
        if (log.level === 'SUSPICIOUS') dayData.suspicious++;
        if (log.level === 'MALICIOUS') dayData.malicious++;
      }
    });

    return last7Days;
  }, [history]);

  const recentReports = history.slice(0, 10);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Security Analyst Dashboard</h1>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-mono">Overview of recent phishing awareness analysis activity</p>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-4 backdrop-blur-sm shadow-lg">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-900 to-blue-500 p-0.5 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
            <div className="w-full h-full bg-[#050608] rounded-full flex items-center justify-center">
              <span className="text-blue-400 font-bold text-xs tracking-widest">SPG</span>
            </div>
          </div>
          <div className="pr-2">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold leading-none mb-1">Welcome,</p>
            <p className="text-sm text-white font-bold leading-none mb-1.5">Saurabh Prasad Gupta</p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-blue-400 font-mono">Cyber Security Intern</span>
              <span className="w-1 h-1 rounded-full bg-gray-600"></span>
              <span className="text-[10px] text-gray-400 font-mono">DecodeLabs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Analyses', value: stats.total, icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/10 border border-blue-500/20' },
          { title: 'Safe Detected', value: stats.safe, icon: ShieldCheck, color: 'text-green-400', bg: 'bg-green-500/10 border border-green-500/20' },
          { title: 'Suspicious', value: stats.suspicious, icon: AlertTriangle, color: 'text-orange-400', bg: 'bg-orange-500/10 border border-orange-500/20' },
          { title: 'Malicious', value: stats.malicious, icon: ShieldAlert, color: 'text-red-400', bg: 'bg-red-500/10 border border-red-500/20' },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="p-5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4 backdrop-blur-sm relative overflow-hidden"
          >
            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color} z-10`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="z-10">
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{stat.title}</p>
              <h3 className="text-2xl font-mono font-bold text-white mt-1 leading-none">{stat.value}</h3>
            </div>
            {/* Subtle glow */}
            <div className={`absolute -right-4 -bottom-4 w-16 h-16 rounded-full blur-2xl opacity-20 ${stat.bg.split(' ')[0]}`} />
          </motion.div>
        ))}
      </div>

      {/* Charts & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-xs font-bold text-white uppercase tracking-widest">Weekly Analysis Trends</h3>
             <span className="px-2 py-1 rounded bg-black/40 text-[10px] font-mono text-gray-400 border border-white/10">LAST 7 DAYS</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                <YAxis stroke="#6b7280" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0c10', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Bar dataKey="safe" stackId="a" fill="#22c55e" radius={[0, 0, 4, 4]} />
                <Bar dataKey="suspicious" stackId="a" fill="#f97316" />
                <Bar dataKey="malicious" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col">
          <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Recent Reports</h3>
          <div className="space-y-2 flex-1 overflow-y-auto">
            {recentReports.length === 0 ? (
               <div className="h-full flex flex-col items-center justify-center text-center p-4">
                 <FileText className="w-8 h-8 text-white/10 mb-2" />
                 <p className="text-xs text-gray-500 font-mono">No analyses yet.<br/>Scan an email or URL.</p>
               </div>
            ) : (
              recentReports.map((log, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors border border-transparent hover:border-white/5 group">
                  <div className={`p-2 rounded shrink-0 ${
                    log.level === 'MALICIOUS' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                    log.level === 'SUSPICIOUS' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                    'bg-green-500/10 text-green-400 border border-green-500/20'
                  }`}>
                    <FileText className="w-3 h-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white truncate">{log.content}</p>
                    <p className="text-[10px] text-gray-500 font-mono uppercase mt-0.5">{log.type} Vector</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-500 font-mono block">{timeAgo(log.timestamp)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
