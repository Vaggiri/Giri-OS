import React, { useState, useEffect, useCallback } from 'react';
import MenuBar from './MenuBar';
import Dock from './Dock';
import WindowManager from './WindowManager';
import ContextMenu from './ContextMenu';
import Launchpad from './Launchpad';
import Spotlight from './Spotlight';
import WidgetSystem from './WidgetSystem';
import ClockWidget from './widgets/ClockWidget';
import WeatherWidget from './widgets/WeatherWidget';
import { useContextMenu } from '../../hooks/useContextMenu';
import useFileSystemStore from '../../store/useFileSystemStore';
import useThemeStore from '../../store/useThemeStore';
import useWindowStore from '../../store/useWindowStore';
import useDesktopStore from '../../store/useDesktopStore';
import { motion } from 'framer-motion';
import { Folder, Terminal as TerminalIcon, Compass, Music, Settings as SettingsIcon, Calculator as CalcIcon, Calendar as CalIcon, FileText, Activity, MapPin, Play } from 'lucide-react';

const Desktop = () => {
  const [isLaunchpadOpen, setIsLaunchpadOpen] = useState(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const { contextMenu, handleContextMenu, closeMenu } = useContextMenu();
  const { getChildren } = useFileSystemStore();
  const { wallpaper } = useThemeStore();
  const { openWindow } = useWindowStore();
  const { shortcuts, updatePosition } = useDesktopStore();
  const desktopItems = getChildren('desktop');

  const apps = [
    { id: 'finder', name: 'Finder', title: 'Finder', icon: <Folder className="text-blue-400" size={32} /> },
    { id: 'notepad', name: 'Notepad', title: 'Notepad', icon: <FileText className="text-slate-500" size={32} /> },
    { id: 'activity', name: 'Activity Monitor', title: 'Activity Monitor', icon: <Activity className="text-red-500" size={32} /> },
    { id: 'maps', name: 'Maps', title: 'GisunMaps', icon: <MapPin className="text-emerald-500" size={32} /> },
    { id: 'vlc', name: 'VLC Player', title: 'VLC Player', icon: <Play className="text-orange-500" size={32} /> },
    { id: 'terminal', name: 'Terminal', title: 'Terminal', icon: <TerminalIcon className="text-gray-300" size={32} /> },
    {id: 'compass', name: 'Gisun Browser', title: 'Gisun Browser', icon: <Compass className="text-sky-500" size={32} /> },
    { id: 'gisuntube', name: 'GisunTube', title: 'GisunTube', icon: <Play className="text-red-500" size={32} /> },
    { id: 'gisunmusic', name: 'Music', title: 'GisunMusic', icon: <Music className="text-pink-500" size={32} /> },
    { id: 'settings', name: 'Settings', title: 'Settings', icon: <SettingsIcon className="text-gray-400" size={32} /> },
    { id: 'calculator', name: 'Calculator', title: 'Calculator', icon: <CalcIcon className="text-orange-400" size={32} /> },
    { id: 'calendar', name: 'Calendar', title: 'Calendar', icon: <CalIcon className="text-red-400" size={32} /> },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === ' ') {
        e.preventDefault();
        setIsSpotlightOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSpotlightOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      onContextMenu={handleContextMenu}
      className="relative h-full w-full bg-cover bg-center overflow-hidden flex flex-col select-none transition-all duration-1000"
      style={{ 
        backgroundImage: `url('${wallpaper}')`,
      }}
    >
      <div className="absolute inset-0 bg-black/5" />
      
      <MenuBar />
      
      <main 
        style={{ padding: 'var(--desktop-padding)', paddingTop: 'calc(var(--menubar-h) + 1.5rem)' }}
        className="relative flex-1 w-full h-full no-scrollbar overflow-hidden"
      >
        {/* Dynamic App Shortcuts (Freely Movable) */}
        {shortcuts.map(shortcut => {
           const app = apps.find(a => a.id === shortcut.appId);
           if (!app) return null;
           
           return (
             <motion.div
               key={shortcut.id}
               drag
               dragMomentum={false}
               onDragEnd={(e, info) => {
                  const newX = shortcut.x + info.offset.x;
                  const newY = shortcut.y + info.offset.y;
                  updatePosition(shortcut.id, newX, newY);
               }}
               onContextMenu={(e) => {
                  e.stopPropagation();
                  handleContextMenu(e, 'shortcut', shortcut.id);
               }}
               initial={{ x: shortcut.x, y: shortcut.y }}
               animate={{ x: shortcut.x, y: shortcut.y }}
               onDoubleClick={() => openWindow(app)}
               className="absolute z-10 group flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 cursor-grab active:cursor-grabbing transition-colors"
               style={{ width: 'var(--shortcut-size)' }}
             >
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg group-hover:scale-110 transition-transform">
                  <div className="scale-75 md:scale-100 flex items-center justify-center">
                    {app.icon}
                  </div>
                </div>
                <span className="text-[9px] md:text-[10px] text-white text-center font-bold shadow-black drop-shadow-md tracking-tight truncate w-full">
                  {app.name}
                </span>
             </motion.div>
           );
        })}

        {/* Static Grid for System Files/Folders */}
        <div 
          style={{ top: 'calc(var(--menubar-h) + 1rem)', left: 'var(--desktop-padding)' }}
          className="absolute grid grid-cols-[repeat(auto-fill,minmax(var(--shortcut-size),1fr))] gap-2 md:gap-4 pointer-events-none"
        >
           {desktopItems.map(item => (
            <div
              key={item.id}
              className="group flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-colors pointer-events-auto"
            >
              <Folder className="text-blue-400 fill-blue-400/20 shadow-sm size-8 md:size-12" />
              <span className="text-[10px] md:text-[11px] text-white text-center font-medium shadow-black drop-shadow-md">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        <WidgetSystem />
        <WindowManager />
      </main>
      
      <Dock toggleLaunchpad={() => setIsLaunchpadOpen(!isLaunchpadOpen)} />

      <Launchpad 
        isOpen={isLaunchpadOpen} 
        closeLaunchpad={() => setIsLaunchpadOpen(false)} 
        apps={apps}
      />

      <Spotlight 
        isOpen={isSpotlightOpen} 
        closeSpotlight={() => setIsSpotlightOpen(false)} 
      />

      {contextMenu && (
        <ContextMenu 
          {...contextMenu} 
          closeMenu={closeMenu} 
        />
      )}
    </div>
  );
};

export default Desktop;
