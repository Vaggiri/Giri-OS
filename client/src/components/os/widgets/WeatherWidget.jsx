import React from 'react';
import { CloudRain, Sun, Cloud } from 'lucide-react';

const WeatherWidget = () => {
  return (
    <div className="flex flex-col p-6 rounded-[2rem] bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-3xl border border-white/10 shadow-2xl select-none group hover:brightness-110 transition-all duration-500">
      <div className="flex justify-between items-start mb-4">
        <Sun size={32} className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
        <span className="text-3xl font-bold text-white leading-none">24°</span>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-bold text-white/80">Sunny</span>
        <span className="text-[10px] text-white/50">H:28° L:19°</span>
      </div>
      <div className="mt-4 pt-4 border-t border-white/5 flex gap-3 text-[10px] text-white/60">
        <div className="flex flex-col items-center gap-1">
          <span>Mon</span>
          <Cloud size={12} />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span>Tue</span>
          <CloudRain size={12} />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span>Wed</span>
          <Sun size={12} className="text-yellow-400" />
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
