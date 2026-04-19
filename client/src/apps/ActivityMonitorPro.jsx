import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, HardDrive, Zap, Info, ArrowUp, ArrowDown, ListOrdered } from 'lucide-react';
import { API_URL } from '../config';

const ActivityMonitorPro = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState({ cpu: Array(20).fill(0), mem: Array(20).fill(0) });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/api/system/stats`);
        const data = await res.json();
        setStats(data);
        setError(null);

        setHistory(prev => {
          const newCpu = [...prev.cpu.slice(1), parseFloat(data.cpu) || 0];
          const newMem = [...prev.mem.slice(1), parseFloat(data.memory.percent) || 0];
          return { cpu: newCpu, mem: newMem };
        });
      } catch (err) {
        setError("GisunBridge disconnected. Ensure 'node server/index.js' is running.");
      }
    };

    const interval = setInterval(fetchStats, 1000);
    fetchStats();
    return () => clearInterval(interval);
  }, []);

  const generatePath = (data, min, max, width, height) => {
    if (!data.length) return "";
    const points = data.map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((val - min) / (max - min)) * height;
      return { x, y };
    });
    
    // Create smooth cubic bezier path
    return points.reduce((acc, point, i, a) => {
      if (i === 0) return `M ${point.x},${point.y}`;
      const prev = a[i - 1];
      const cp1x = prev.x + (point.x - prev.x) / 2;
      const cp2x = prev.x + (point.x - prev.x) / 2;
      return `${acc} C ${cp1x},${prev.y} ${cp2x},${point.y} ${point.x},${point.y}`;
    }, "");
  };

  if (error) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-[#0a0a0a] text-white/50">
        <Info size={48} className="mb-4 text-red-500/30" />
        <p className="text-sm font-bold opacity-80">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col bg-[#050505] text-white/90 overflow-hidden font-sans">
      {/* Real-time Telemetry Dashboard */}
      <div className="grid grid-cols-2 gap-4 p-6 bg-gradient-to-b from-white/[0.02] to-transparent">
        {/* CPU Panel */}
        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 relative overflow-hidden group">
           <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2 text-[10px] text-blue-400 font-black uppercase tracking-[0.2em]">
                 <Cpu size={14} className="animate-pulse" /> Processor Performance
              </div>
              <span className="text-xl font-black text-blue-500 tabular-nums">{stats?.cpu || '0.0'}%</span>
           </div>
           <div className="h-28 w-full relative">
              <svg className="w-full h-full overflow-visible">
                 <defs>
                    <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                       <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                 </defs>
                 <path 
                   d={`${generatePath(history.cpu, 0, 100, 350, 112)} L 350,112 L 0,112 Z`}
                   fill="url(#cpuGradient)"
                   className="transition-all duration-700 ease-in-out"
                 />
                 <path 
                   d={generatePath(history.cpu, 0, 100, 350, 112)}
                   fill="transparent"
                   stroke="#3b82f6"
                   strokeWidth="3"
                   strokeLinecap="round"
                   className="transition-all duration-700 ease-in-out drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                 />
              </svg>
           </div>
        </div>

        {/* Memory Panel */}
        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 relative overflow-hidden group">
           <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2 text-[10px] text-purple-400 font-black uppercase tracking-[0.2em]">
                 <HardDrive size={14} fill="currentColor" fillOpacity="0.1" /> Neural Memory
              </div>
              <span className="text-xl font-black text-purple-500 tabular-nums">{stats?.memory?.percent || '0.0'}%</span>
           </div>
           <div className="h-28 w-full relative">
              <svg className="w-full h-full overflow-visible">
                 <defs>
                    <linearGradient id="memGradient" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                       <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                    </linearGradient>
                 </defs>
                 <path 
                   d={`${generatePath(history.mem, 0, 100, 350, 112)} L 350,112 L 0,112 Z`}
                   fill="url(#memGradient)"
                   className="transition-all duration-700 ease-in-out"
                 />
                 <path 
                   d={generatePath(history.mem, 0, 100, 350, 112)}
                   fill="transparent"
                   stroke="#a855f7"
                   strokeWidth="3"
                   strokeLinecap="round"
                   className="transition-all duration-700 ease-in-out drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                 />
              </svg>
           </div>
        </div>
      </div>

      {/* Logic/Process Table */}
      <div className="flex-1 px-6 overflow-y-auto no-scrollbar pb-6">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-4 px-2">
           <ListOrdered size={14} /> System Process Snapshot
        </div>
        <div className="space-y-1">
           <ProcessItem pid="0" name="Kernel/GisunOS" cpu="0.1%" mem="12.4 MB" status="Root" />
           <ProcessItem pid="102" name="GisunBridge Engine" cpu={stats?.cpu + "%"} mem="245.8 MB" status="Active" />
           <ProcessItem pid="215" name="Window Server" cpu="1.2%" mem="84.2 MB" status="Idle" />
           <ProcessItem pid="562" name="Supabase Sync" cpu="0.0%" mem="1.4 MB" status="Ready" />
           <ProcessItem pid="893" name="VLC Player" cpu="0.0%" mem="0.0 MB" status="Suspended" />
        </div>
      </div>

      {/* Network IO Status */}
      <div className="h-16 flex-shrink-0 bg-white/[0.02] border-t border-white/5 px-8 flex items-center justify-between">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <ArrowUp size={12} className="text-emerald-500" />
               <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Up: <span className="text-white">4.2 MB/s</span></span>
            </div>
            <div className="flex items-center gap-2">
               <ArrowDown size={12} className="text-blue-500" />
               <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Down: <span className="text-white">28.9 MB/s</span></span>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[3px] text-white/30">System Nominal</span>
         </div>
      </div>
    </div>
  );
};

const ProcessItem = ({ pid, name, cpu, mem, status }) => (
  <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/5 group">
     <div className="flex items-center gap-4">
        <span className="text-[10px] font-bold text-white/20 w-8">{pid}</span>
        <span className="text-sm font-bold tracking-tight uppercase italic">{name}</span>
     </div>
     <div className="flex items-center gap-8">
        <span className="text-[10px] font-bold text-white/40">{cpu}</span>
        <span className="text-[10px] font-bold text-white/40">{mem}</span>
        <span className={`text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded border ${
           status === 'Active' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' : 'text-white/20 border-white/5'
        }`}>{status}</span>
     </div>
  </div>
);

export default ActivityMonitorPro;
;
