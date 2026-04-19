import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, FileText, Folder, Terminal, Compass, Music, Settings, Calculator, Calendar } from 'lucide-react';
import useWindowStore from '../../store/useWindowStore';
import useFileSystemStore from '../../store/useFileSystemStore';

const Spotlight = ({ isOpen, closeSpotlight }) => {
  const [query, setQuery] = useState('');
  const { openWindow } = useWindowStore();
  const { fileTree } = useFileSystemStore();

  const apps = [
    { id: 'finder', name: 'Finder', title: 'Finder', icon: <Folder className="text-blue-400" size={20} /> },
    { id: 'notepad', name: 'Notepad', title: 'Notepad', icon: <FileText className="text-slate-500" size={20} /> },
    { id: 'terminal', name: 'Terminal', title: 'Terminal', icon: <Terminal className="text-gray-300" size={20} /> },
    { id: 'compass', name: 'Safari', title: 'Safari', icon: <Compass className="text-blue-500" size={20} /> },
    { id: 'music', name: 'Music', title: 'YouTube Music', icon: <Music className="text-pink-500" size={20} /> },
    { id: 'settings', name: 'Settings', title: 'Settings', icon: <Settings className="text-gray-400" size={20} /> },
    { id: 'calculator', name: 'Calculator', title: 'Calculator', icon: <Calculator className="text-orange-400" size={20} /> },
    { id: 'calendar', name: 'Calendar', title: 'Calendar', icon: <Calendar className="text-red-400" size={20} /> },
  ];

  const filteredApps = apps.filter(app => app.name.toLowerCase().includes(query.toLowerCase()));
  const filteredFiles = fileTree.filter(file => file.type === 'file' && file.name.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (isOpen) setQuery('');
  }, [isOpen]);

  const handleLaunch = (app) => {
    openWindow(app);
    closeSpotlight();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-start justify-center pt-32 bg-black/10 backdrop-blur-sm" onClick={closeSpotlight}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: -20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-[600px] liquid-glass rounded-2xl overflow-hidden shadow-2xl border border-white/20"
      >
        <div className="flex items-center gap-4 p-4 border-b border-white/10">
          <Search size={24} className="text-white/40" />
          <input 
            autoFocus
            placeholder="Spotlight Search"
            className="flex-1 bg-transparent border-none outline-none text-xl text-white font-light placeholder:text-white/20"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-1 opacity-20 text-[10px] font-bold decoration-none border border-white/40 rounded px-1">
             <Command size={10} /> <span>SPACE</span>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto p-2 scrollbar-hide">
          {query.length > 0 && (
            <>
              {filteredApps.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-[10px] uppercase font-bold text-white/40 px-3 mb-2 tracking-widest">Applications</h3>
                  {filteredApps.map(app => (
                    <div 
                      key={app.id} 
                      onClick={() => handleLaunch(app)}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-500 transition-colors cursor-pointer group"
                    >
                      <div className="bg-white/10 p-1.5 rounded-md group-hover:bg-white/20 transition-colors">
                        {app.icon}
                      </div>
                      <span className="text-sm font-medium text-white">{app.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {filteredFiles.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-[10px] uppercase font-bold text-white/40 px-3 mb-2 tracking-widest">Files</h3>
                  {filteredFiles.map(file => (
                    <div 
                      key={file.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-500 transition-colors cursor-pointer group"
                    >
                      <div className="bg-white/10 p-1.5 rounded-md group-hover:bg-white/20 transition-colors">
                        <FileText size={20} className="text-slate-300" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">{file.name}</span>
                        <span className="text-[9px] text-white/40 group-hover:text-white/60">Documents / {file.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {filteredApps.length === 0 && filteredFiles.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-white/20 gap-2">
                  <Search size={48} strokeWidth={1} />
                  <span className="text-sm font-medium">No results for "{query}"</span>
                </div>
              )}
            </>
          )}
          
          {query.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-white/20 gap-2">
               <Command size={48} strokeWidth={1} />
               <span className="text-sm font-medium italic opacity-50 underline decoration-dotted">Try searching for Finder or Notepad</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Spotlight;
