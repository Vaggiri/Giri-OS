import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useThemeStore from '../store/useThemeStore';
import useDesktopStore from '../store/useDesktopStore';
import { Palette, Monitor, Type, Info, Check, Layout, Trash2, Plus } from 'lucide-react';

const WALLPAPERS = [
  '/wallpapers/dark_premium.png',
  '/wallpapers/default.png', 
  '/wallpapers/ocean.png',
  '/wallpapers/mist.png',
  '/wallpapers/city.png',
];

const FONTS = ['Inter', 'Roboto', 'Outfit', 'Montserrat', 'System-ui'];

const APPS = [
  { id: 'vlc', name: 'VLC Player', icon: 'Play', color: 'text-orange-500' },
  { id: 'gisunmusic', name: 'Music', icon: 'Music', color: 'text-pink-500' },
  { id: 'terminal', name: 'Terminal', icon: 'Terminal', color: 'text-gray-300' },
  { id: 'activity', name: 'Activity Monitor', icon: 'Activity', color: 'text-red-500' },
  { id: 'maps', name: 'GisunMaps', icon: 'MapPin', color: 'text-emerald-500' },
  { id: 'gisuntube', name: 'GisunTube', icon: 'Play', color: 'text-red-500' },
  { id: 'calculator', name: 'Calculator', icon: 'Calculator', color: 'text-orange-400' },
  { id: 'calendar', name: 'Calendar', icon: 'Calendar', color: 'text-red-400' },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState('appearance');
  const { wallpaper, setWallpaper, font, setFont, dockAutoHide, setDockAutoHide } = useThemeStore();
  const { shortcuts, addShortcut, removeShortcutByAppId } = useDesktopStore();

  const isShortcutActive = (appId) => shortcuts.some(s => s.appId === appId);

  return (
    <div className="flex flex-col h-full bg-[#1a1a1a] text-white overflow-hidden">
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-48 bg-black/20 border-r border-white/5 p-4 flex flex-col gap-1 overflow-y-auto">
          {[
            { id: 'appearance', label: 'Appearance', icon: Palette },
            { id: 'desktop', label: 'Desktop', icon: Layout },
            { id: 'display', label: 'Display', icon: Monitor },
            { id: 'typography', label: 'Typography', icon: Type },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${
                activeTab === tab.id ? 'bg-blue-500/20 text-blue-400 font-bold' : 'text-white/60 hover:bg-white/5'
              }`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
          
          <div className="mt-auto">
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-white/40 text-xs transition-colors">
              <Info size={14} /> GisunOS Beta 1.0
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar h-full">
          <div className="max-w-2xl space-y-12">
            
            {activeTab === 'appearance' && (
              <>
                <section>
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">Desktop Wallpaper</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {WALLPAPERS.map((url, i) => (
                      <button
                        key={i}
                        onClick={() => setWallpaper(url)}
                        className={`group relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                          wallpaper === url ? 'border-blue-500 scale-[0.98]' : 'border-transparent hover:border-white/20'
                        }`}
                      >
                        <img loading="lazy" src={url} alt={`Wallpaper ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        {wallpaper === url && (
                          <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1 shadow-lg">
                            <Check size={12} className="text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </section>

                <section className="bg-white/5 rounded-2xl p-6 border border-white/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold">Dock Behavior</h3>
                      <p className="text-sm text-white/40 mt-1">Automatically hide the Dock on mouse hover.</p>
                    </div>
                    <button 
                      onClick={() => setDockAutoHide(!dockAutoHide)}
                      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${dockAutoHide ? 'bg-blue-600' : 'bg-white/10'}`}
                    >
                      <motion.div animate={{ x: dockAutoHide ? 26 : 4 }} className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg" />
                    </button>
                  </div>
                </section>
              </>
            )}

            {activeTab === 'desktop' && (
              <section className="space-y-6">
                <h2 className="text-xl font-bold">Desktop Shortcuts</h2>
                <div className="grid grid-cols-1 gap-3">
                  {APPS.map(app => {
                    const active = isShortcutActive(app.id);
                    return (
                      <div key={app.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg bg-black/40 flex items-center justify-center ${app.color}`}>
                             <div className="opacity-80 font-bold">{app.name[0]}</div>
                          </div>
                          <div>
                            <div className="font-bold text-sm">{app.name}</div>
                            <div className="text-[10px] text-white/40 uppercase tracking-widest">Application</div>
                          </div>
                        </div>
                        <button
                          onClick={() => active ? removeShortcutByAppId(app.id) : addShortcut(app.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                            active ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20'
                          }`}
                        >
                          {active ? <Trash2 size={14} /> : <Plus size={14} />}
                          {active ? 'Remove' : 'Add to Desktop'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {activeTab === 'typography' && (
              <section>
                <h2 className="text-xl font-bold mb-6">System Typography</h2>
                <div className="flex flex-wrap gap-2">
                  {FONTS.map(f => (
                    <button
                      key={f}
                      onClick={() => setFont(f)}
                      className={`px-4 py-2 rounded-xl border text-sm transition-all ${
                        font === f ? 'bg-white text-black border-white font-bold' : 'border-white/10 hover:border-white/30 text-white/60'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
