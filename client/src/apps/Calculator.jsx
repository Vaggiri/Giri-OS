import React, { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleInput = (val) => {
    if (display === '0') setDisplay(val);
    else setDisplay(display + val);
  };

  const handleOp = (op) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    try {
      const fullEq = equation + display;
      const result = eval(fullEq.replace('×', '*').replace('÷', '/'));
      setDisplay(String(result));
      setEquation('');
    } catch {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  return (
    <div className="flex h-full w-full flex-col bg-[#1c1c1c] text-white p-4">
      <div className="flex-1 flex flex-col justify-end items-end pb-4 border-b border-white/5">
        <div className="text-xs opacity-40 h-4">{equation}</div>
        <div className="text-4xl font-light tracking-tight truncate w-full text-right">{display}</div>
      </div>
      <div className="grid grid-cols-4 gap-2 mt-4 flex-[2]">
        <button onClick={clear} className="bg-gray-700 hover:bg-gray-600 rounded-lg py-3 text-sm font-bold">AC</button>
        <button className="bg-gray-700 hover:bg-gray-600 rounded-lg py-3">+/-</button>
        <button className="bg-gray-700 hover:bg-gray-600 rounded-lg py-3">%</button>
        <button onClick={() => handleOp('÷')} className="bg-orange-500 hover:bg-orange-400 rounded-lg py-3 font-bold">÷</button>
        
        {[7, 8, 9].map(n => <button key={n} onClick={() => handleInput(String(n))} className="bg-zinc-800 hover:bg-zinc-700 rounded-lg py-3 text-lg">{n}</button>)}
        <button onClick={() => handleOp('×')} className="bg-orange-500 hover:bg-orange-400 rounded-lg py-3 font-bold">×</button>
        
        {[4, 5, 6].map(n => <button key={n} onClick={() => handleInput(String(n))} className="bg-zinc-800 hover:bg-zinc-700 rounded-lg py-3 text-lg">{n}</button>)}
        <button onClick={() => handleOp('-')} className="bg-orange-500 hover:bg-orange-400 rounded-lg py-3 font-bold">-</button>
        
        {[1, 2, 3].map(n => <button key={n} onClick={() => handleInput(String(n))} className="bg-zinc-800 hover:bg-zinc-700 rounded-lg py-3 text-lg">{n}</button>)}
        <button onClick={() => handleOp('+')} className="bg-orange-500 hover:bg-orange-400 rounded-lg py-3 font-bold">+</button>
        
        <button onClick={() => handleInput('0')} className="col-span-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg py-3 text-lg text-left px-6">0</button>
        <button onClick={() => handleInput('.')} className="bg-zinc-800 hover:bg-zinc-700 rounded-lg py-3 text-lg">.</button>
        <button onClick={calculate} className="bg-orange-500 hover:bg-orange-400 rounded-lg py-3 font-bold">=</button>
      </div>
    </div>
  );
};

export default Calculator;
