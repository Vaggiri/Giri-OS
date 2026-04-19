import React from 'react';
import useWindowStore from '../store/useWindowStore';
import { Activity, XCircle, Cpu, HardDrive, Zap } from 'lucide-react';

const ActivityMonitor = () => {
  const { windows, closeWindow } = useWindowStore();

  return (
    <div className="flex h-full w-full flex-col bg-[#1e1e1e] text-white">
      {/* Header Stats */}
      <div className="grid grid-cols-4 gap-4 p-6 bg-white/5 border-b border-white/5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs text-blue-400 font-bold uppercase tracking-tighter">
            <Cpu size={14} /> CPU Usage
          </div>
          <div className="text-2xl font-light">12%</div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-[12%]" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs text-purple-400 font-bold uppercase tracking-tighter">
            <HardDrive size={14} /> Memory
          </div>
          <div className="text-2xl font-light">4.2 GB</div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 w-[35%]" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs text-yellow-400 font-bold uppercase tracking-tighter">
            <Zap size={14} /> Energy
          </div>
          <div className="text-2xl font-light">Efficient</div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs text-green-400 font-bold uppercase tracking-tighter">
            <Activity size={14} /> Network
          </div>
          <div className="text-2xl font-light">240 KB/s</div>
        </div>
      </div>

      {/* Process List */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-[#1e1e1e] z-10">
            <tr className="text-[10px] text-white/40 border-b border-white/5 uppercase font-bold tracking-widest">
              <th className="px-6 py-3 font-bold">Process Name</th>
              <th className="px-6 py-3 font-bold">Status</th>
              <th className="px-6 py-3 font-bold">CPU (%)</th>
              <th className="px-6 py-3 font-bold">Memory</th>
              <th className="px-6 py-3 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium">
            {windows.map(win => (
              <tr key={win.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4 flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                   {win.title}
                </td>
                <td className="px-6 py-4 opacity-60">Running</td>
                <td className="px-6 py-4 text-blue-400">{(Math.random() * 5).toFixed(1)}%</td>
                <td className="px-6 py-4 opacity-60">{(Math.random() * 200 + 50).toFixed(0)} MB</td>
                <td className="px-6 py-4">
                   <button 
                     onClick={() => closeWindow(win.id)}
                     className="flex items-center gap-1 text-[10px] text-red-400 opacity-0 group-hover:opacity-100 bg-red-400/10 px-2 py-1 rounded transition-all hover:bg-red-400 hover:text-white"
                   >
                     <XCircle size={12} /> FORCE QUIT
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityMonitor;
