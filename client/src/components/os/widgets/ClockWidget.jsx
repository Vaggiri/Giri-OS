import React, { useState, useEffect } from 'react';

const ClockWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-[2rem] bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl select-none group hover:bg-white/10 transition-colors duration-500">
      <span className="text-5xl font-extrabold tracking-tighter text-white drop-shadow-2xl">
        {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
      </span>
      <span className="text-xs font-bold uppercase tracking-widest text-blue-400 mt-2 opacity-80">
        {time.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
      </span>
    </div>
  );
};

export default ClockWidget;
