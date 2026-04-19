import React from 'react';

const Calendar = () => {
  const date = new Date();
  const currentMonth = date.toLocaleString('default', { month: 'long' });
  const currentYear = date.getFullYear();
  
  const daysInMonth = new Date(currentYear, date.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentYear, date.getMonth(), 1).getDay();
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  return (
    <div className="flex h-full w-full flex-col bg-white text-gray-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{currentMonth} {currentYear}</h2>
        <div className="flex gap-4 opacity-40">
           <span className="cursor-pointer hover:text-blue-500">&lt;</span>
           <span className="cursor-pointer hover:text-blue-500">&gt;</span>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-gray-400 mb-2 uppercase tracking-widest">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {blanks.map(b => <div key={b} className="h-10" />)}
        {days.map(d => (
          <div 
            key={d} 
            className={`h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors cursor-pointer
              ${d === date.getDate() ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'hover:bg-gray-100'}`}
          >
            {d}
          </div>
        ))}
      </div>
      <div className="mt-auto pt-6 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-501 bg-blue-500" />
          <span className="text-xs font-semibold">User Meeting: 4:00 PM</span>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          <span className="text-xs font-semibold">GisunOS Release v0.1.0</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
