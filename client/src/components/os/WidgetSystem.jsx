import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, HardDrive, Clock, Sun } from 'lucide-react';
import useDesktopStore from '../../store/useDesktopStore';

const WidgetSystem = () => {
  const { widgets } = useDesktopStore();
  
  return (
    <div className="absolute inset-0 pointer-events-none p-10 select-none overflow-hidden">
      {/* Persistent Widgets */}
      <ClockWidget position={widgets.clock} />
      <StatsWidget position={widgets.stats} />
    </div>
  );
};

const WidgetWrapper = ({ children, id, position }) => {
  const updateWidgetPosition = useDesktopStore(state => state.updateWidgetPosition);

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={false}
      animate={{ x: position.x, y: position.y }}
      onDragEnd={(e, info) => {
        const SNAP_SIZE = 20;
        const EDGE_THRESHOLD = 30;
        
        let newX = position.x + info.offset.x;
        let newY = position.y + info.offset.y;

        // Apply Grid Snapping
        newX = Math.round(newX / SNAP_SIZE) * SNAP_SIZE;
        newY = Math.round(newY / SNAP_SIZE) * SNAP_SIZE;

        // Apply Edge Magnetism (Sticking to screen edges)
        const vh = window.innerHeight;
        const vw = window.innerWidth;

        if (newX < EDGE_THRESHOLD) newX = 0;
        if (newY < EDGE_THRESHOLD) newY = 0;
        
        // Account for widget being near right/bottom (rough estimation)
        if (vw - newX < 250) newX = vw - 240; // Estimated widget width
        if (vh - newY < 150) newY = vh - 140;

        updateWidgetPosition(id, newX, newY);
      }}
      className="absolute pointer-events-auto cursor-grab active:cursor-grabbing group"
      style={{ left: 0, top: 0 }}
    >
      <div className="relative">
         {/* Widget Content */}
         <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-6 shadow-2xl overflow-hidden min-w-[200px] hover:bg-white/[0.05] transition-colors">
            {children}
         </div>
         {/* Drag Handle UI Hint */}
         <div className="absolute -top-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-8 h-1 bg-white/20 rounded-full" />
         </div>
      </div>
    </motion.div>
  );
};

const ClockWidget = ({ position }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <WidgetWrapper id="clock" position={position}>
      <div className="flex flex-col items-center">
        <span className="text-5xl font-extralight tracking-tighter text-white/90">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mt-2">
          {time.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
        </span>
      </div>
    </WidgetWrapper>
  );
};

const StatsWidget = ({ position }) => {
  const [load, setLoad] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoad(Math.floor(Math.random() * 40 + 10));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <WidgetWrapper id="stats" position={position}>
      <div className="flex flex-col gap-4">
         <div className="flex items-center gap-3">
            <Cpu size={16} className="text-blue-400" />
            <div className="flex flex-col">
               <span className="text-[10px] font-black uppercase tracking-widest text-white/40">CPU Load</span>
               <div className="flex items-baseline gap-2">
                  <span className="text-xl font-light">{load}%</span>
                  <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                     <motion.div animate={{ width: `${load}%` }} className="h-full bg-blue-500" />
                  </div>
               </div>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <HardDrive size={16} className="text-purple-400" />
            <div className="flex flex-col">
               <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Memory</span>
               <div className="flex items-baseline gap-2">
                  <span className="text-xl font-light">4.2GB</span>
                  <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                     <span className="h-full w-2/3 bg-purple-500 block" />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </WidgetWrapper>
  );
};

export default WidgetSystem;
