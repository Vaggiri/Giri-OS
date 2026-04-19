import React from 'react';
import useThemeStore from '../../store/useThemeStore';
import { Sun, Volume2, Wifi, Bluetooth, Battery, Moon } from 'lucide-react';

const ControlCenter = ({ closeMenu }) => {
  const { brightness, setBrightness, volume, setVolume, isDark, setDark } = useThemeStore();

  return (
    <div 
      className="liquid-glass fixed top-8 right-4 z-[1000] w-80 rounded-2xl p-4 shadow-2xl backdrop-blur-3xl border border-white/20"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex flex-col gap-3">
          <div className="liquid-glass flex items-center gap-3 p-3 rounded-xl bg-white/5">
            <Wifi size={18} className="text-blue-500" />
            <div className="flex flex-col">
              <span className="text-[11px] font-bold">Wi-Fi</span>
              <span className="text-[10px] opacity-60">Home_Net</span>
            </div>
          </div>
          <div className="liquid-glass flex items-center gap-3 p-3 rounded-xl bg-white/5">
            <Bluetooth size={18} className="text-blue-500" />
            <div className="flex flex-col">
              <span className="text-[11px] font-bold">Bluetooth</span>
              <span className="text-[10px] opacity-60">Connected</span>
            </div>
          </div>
        </div>
        <div 
          onClick={() => setDark(!isDark)}
          className="liquid-glass flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 cursor-pointer hover:bg-white/10"
        >
          <Moon size={24} className={isDark ? "text-blue-400" : "opacity-40"} />
          <span className="text-[11px] font-bold mt-2">Dark Mode</span>
        </div>
      </div>

      {/* Sliders */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold opacity-60">Display</span>
          <div className="flex items-center gap-3">
            <Sun size={14} className="opacity-60" />
            <input 
              type="range"
              min="20"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(parseInt(e.target.value))}
              className="flex-1 h-4 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold opacity-60">Sound</span>
          <div className="flex items-center gap-3">
            <Volume2 size={14} className="opacity-60" />
            <input 
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="flex-1 h-4 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlCenter;
