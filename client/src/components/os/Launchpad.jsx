import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Power, LogOut, RefreshCcw, User, Settings } from 'lucide-react';
import useWindowStore from '../../store/useWindowStore';
import useSystemStore from '../../store/useSystemStore';
import { supabase } from '../../supabase';

const Launchpad = ({ isOpen, closeLaunchpad, apps }) => {
  const { openWindow } = useWindowStore();
  const { setBootStage, logout } = useSystemStore();

  if (!isOpen) return null;

  const handleSignOut = async (e) => {
    e.stopPropagation();
    await supabase.auth.signOut();
    logout();
    closeLaunchpad();
    // Force a reload to clear all states if needed
    window.location.reload();
  };

  const handleSystemAction = (e, action) => {
    e.stopPropagation();
    if (action === 'shutdown') setBootStage('none');
    if (action === 'restart') setBootStage('logo');
    closeLaunchpad();
    setTimeout(() => window.location.reload(), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-[5000] flex flex-col items-center bg-black/20 backdrop-blur-3xl px-20 pt-20"
      onClick={closeLaunchpad}
    >
      {/* Search Bar */}
      <div className="relative w-full max-w-md mb-16">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
        <input 
          autoFocus
          placeholder="Search App"
          className="w-full h-12 bg-white/10 rounded-2xl border border-white/10 px-12 text-white outline-none focus:bg-white/20 transition-all font-medium"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* App Grid */}
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-12 gap-y-16 w-full max-w-6xl overflow-y-auto pb-40 no-scrollbar">
        {apps.map((app) => (
          <motion.div
            key={app.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2 cursor-pointer group"
            onClick={(e) => {
              e.stopPropagation();
              openWindow(app);
              closeLaunchpad();
            }}
          >
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white p-4 shadow-2xl transition-all group-hover:brightness-110 bg-white/5 border border-white/5`}>
              {app.icon || <div className="w-12 h-12 bg-white/20 rounded-lg" />}
            </div>
            <span className="text-white text-[13px] font-semibold tracking-tight shadow-black drop-shadow-md opacity-80 group-hover:opacity-100 transition-opacity">
              {app.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Persistent System Footer (Windows-style) */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 p-2 px-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
         <div className="flex items-center gap-3 pr-6 border-r border-white/10">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
               <User size={16} />
            </div>
            <span className="text-xs font-bold text-white/60">Gisun user</span>
         </div>
         
         <div className="flex gap-2">
            <button 
              onClick={(e) => handleSystemAction(e, 'restart')}
              className="p-3 rounded-xl hover:bg-white/10 text-white/60 hover:text-white transition-all group relative"
            >
               <RefreshCcw size={18} />
               <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-bold">Restart</div>
            </button>
            <button 
              onClick={handleSignOut}
              className="p-3 rounded-xl hover:bg-white/10 text-white/60 hover:text-white transition-all group relative"
            >
               <LogOut size={18} />
               <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-bold">Sign Out</div>
            </button>
            <button 
              onClick={(e) => handleSystemAction(e, 'shutdown')}
              className="p-3 rounded-xl hover:bg-red-500/20 text-red-500/60 hover:text-red-500 transition-all group relative"
            >
               <Power size={18} />
               <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-bold">Shut Down</div>
            </button>
         </div>
      </div>
    </motion.div>
  );
};

export default Launchpad;
