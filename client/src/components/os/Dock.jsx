import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, Terminal, Settings, Music, Compass, Mail, LayoutGrid, Calculator as CalcIcon, Calendar as CalIcon, FileText, Activity, MapPin, Play } from 'lucide-react';
import useWindowStore from '../../store/useWindowStore';
import useThemeStore from '../../store/useThemeStore';

const DOCK_APPS = [
  { id: 'finder', name: 'Finder', title: 'Finder', icon: <Folder className="text-blue-400" /> },
  { id: 'notepad', name: 'Notepad', title: 'Notepad', icon: <FileText className="text-slate-400" /> },
  { id: 'compass', name: 'Browser', title: 'Browser', icon: <Compass className="text-sky-500" /> },
  { id: 'gisuntube', name: 'YouTube', title: 'GisunTube', icon: <Play className="text-red-500" /> },
  { id: 'maps', name: 'Maps', title: 'GisunMaps', icon: <MapPin className="text-emerald-500" /> },
  { id: 'gisunmusic', name: 'Music', title: 'GisunMusic', icon: <Music className="text-pink-500" /> },
  { id: 'vlc', name: 'VLC Player', title: 'VLC Player', icon: <Play className="text-orange-500" size={24} /> },
  { id: 'activity', name: 'Activity', title: 'Activity', icon: <Activity className="text-red-400" /> },
  { id: 'calendar', name: 'Calendar', title: 'Calendar', icon: <CalIcon className="text-red-400" /> },
  { id: 'calculator', name: 'Calculator', title: 'Calculator', icon: <CalcIcon className="text-orange-400" /> },
  { id: 'terminal', name: 'Terminal', title: 'Terminal', icon: <Terminal className="text-gray-300" /> },
  { id: 'settings', name: 'Settings', title: 'Settings', icon: <Settings className="text-gray-400" /> },
];

const Dock = ({ toggleLaunchpad }) => {
  const { openWindow, windows } = useWindowStore();
  const { dockAutoHide } = useThemeStore();
  const [isMouseNear, setIsMouseNear] = useState(false);

  const showDock = !dockAutoHide || isMouseNear;

  return (
    <>
      {/* Invisible trigger area for auto-hide */}
      {dockAutoHide && (
        <div 
          className="fixed bottom-0 left-0 right-0 h-4 z-[999]"
          onMouseEnter={() => setIsMouseNear(true)}
        />
      )}

      <motion.div 
        className="fixed bottom-4 left-1/2 z-[1000] -translate-x-1/2"
        onMouseEnter={() => setIsMouseNear(true)}
        onMouseLeave={() => setIsMouseNear(false)}
        initial={false}
        animate={{ 
          y: showDock ? 0 : 120,
          opacity: showDock ? 1 : 0
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <div 
          className={`flex flex-row h-18 items-center gap-3 rounded-[24px] px-5 transition-all duration-300 
            ${dockAutoHide ? 'bg-black/30 backdrop-blur-3xl border-white/10 shadow-2xl' : 'bg-transparent border-transparent'} 
            border hover:bg-white/5 group/dock`}
        >
          {/* Launchpad Icon */}
          <motion.div
            onClick={toggleLaunchpad}
            whileHover={{ scale: 1.25, y: -12 }}
            transition={{ type: "spring", stiffness: 600, damping: 25 }}
            className="group relative flex h-[56px] w-[56px] cursor-pointer items-center justify-center rounded-xl bg-white/3 text-white transition-all border border-white/5 shadow-lg"
          >
            <LayoutGrid size={24} className="text-pink-400" />
            <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform px-2 py-1 bg-black/80 backdrop-blur-md rounded text-[10px] whitespace-nowrap z-[1001]">
              Launchpad
            </div>
          </motion.div>

          <div className="w-[1px] h-8 bg-white/10 mx-1" />

          {DOCK_APPS.map((app) => {
            const isOpen = windows.some(w => w.id === app.id);
            
            return (
              <motion.div
                key={app.id}
                onClick={() => openWindow(app)}
                initial={{ y: 0 }}
                whileHover={{ 
                  scale: 1.25,
                  y: -12,
                }}
                transition={{ type: "spring", stiffness: 600, damping: 25 }}
                className="group relative flex h-[56px] w-[56px] cursor-pointer items-center justify-center rounded-xl bg-white/3 text-white transition-all border border-white/5 focus:outline-none shadow-lg"
              >
                <div className="transform transition-transform">
                  {app.icon}
                </div>
                
                <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform px-2 py-1 bg-black/80 backdrop-blur-md rounded text-[10px] whitespace-nowrap z-[1001]">
                  {app.name}
                </div>

                {/* Active Indicator (Dot) */}
                {isOpen && (
                   <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]" />
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default Dock;
