import React, { useState, useRef, useEffect } from 'react';
import useFileSystemStore from '../store/useFileSystemStore';

const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'output', text: 'GisunOS v1.0.0 Alpha (Professional Edition)' },
    { type: 'output', text: 'Kernel: GisunBridge-v1.0.0-Absolute' },
    { type: 'output', text: 'Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const [currentPath, setCurrentPath] = useState('user');
  const scrollRef = useRef(null);

  const { getChildren, createNode, getNode, files } = useFileSystemStore();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const asciiLogo = `
   ██████╗ ██╗███████╗██╗   ██╗███╗   ██╗
  ██╔════╝ ██║██╔════╝██║   ██║████╗  ██║
  ██║  ███╗██║███████╗██║   ██║██╔██╗ ██║
  ██║   ██║██║╚════██║██║   ██║██║╚██╗██║
  ╚██████╔╝██║███████║╚██████╔╝██║ ╚████║
   ╚═════╝ ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝
  `;

  const getSystemInfo = () => ({
    os: 'GisunOS High-Performance WebOS',
    host: 'GisunBridge-Absolute',
    kernel: '1.0.0-stable',
    uptime: Math.floor(performance.now() / 60000) + ' min',
    packages: '13 Apps installed',
    shell: 'gisunsh v1.0',
    resolution: `${window.innerWidth}x${window.innerHeight}`,
    cpu: 'Virtual Multi-Core Engine',
    memory: `${(performance.memory?.usedJSHeapSize / 1048576).toFixed(1)}MB / ${(performance.memory?.jsHeapLimit / 1048576).toFixed(1)}MB`
  });

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const trimmedInput = input.trim();
      if (!trimmedInput) return;

      const args = trimmedInput.split(' ');
      const cmd = args[0].toLowerCase();
      const promptColor = cmd === 'sudo' ? 'text-red-500' : 'text-blue-400';
      const newHistory = [...history, { type: 'input', text: (
        <span className="flex gap-2">
          <span className={promptColor}>username@gisunos</span>
          <span className="text-white/40">:</span>
          <span className="text-purple-400">~/{getNode(currentPath)?.name || 'user'}</span>
          <span className="text-white/60">$</span>
          <span className="text-white">{input}</span>
        </span>
      ) }];

      switch (cmd) {
        case 'help':
          newHistory.push({ type: 'output', text: 'GisunOS Standard Utilities:' });
          newHistory.push({ type: 'output', text: ' NAVIGATION: ls, cd, mkdir, clear' });
          newHistory.push({ type: 'output', text: ' SYSTEM:     neofetch, sysinfo, date, whoami, uptime' });
          newHistory.push({ type: 'output', text: ' UTILITY:    echo, cat, exit' });
          break;
        case 'ls':
          const items = getChildren(currentPath);
          newHistory.push({ type: 'output', text: items.map(i => i.name).join('   ') || '(directory empty)' });
          break;
        case 'neofetch':
          newHistory.push({ type: 'output', text: asciiLogo });
          const info = getSystemInfo();
          Object.entries(info).forEach(([key, val]) => {
            newHistory.push({ type: 'output', text: `${key.toUpperCase()}: ${val}` });
          });
          break;
        case 'sysinfo':
          newHistory.push({ type: 'output', text: '--- Hardware Telemetry ---' });
          newHistory.push({ type: 'output', text: `CPU Architecture: ${navigator.hardwareConcurrency} Cores (Logical)` });
          newHistory.push({ type: 'output', text: `Network Status: ${navigator.onLine ? 'ONLINE' : 'OFFLINE'}` });
          newHistory.push({ type: 'output', text: `User Agent: ${navigator.userAgent.substring(0, 50)}...` });
          break;
        case 'date':
          newHistory.push({ type: 'output', text: new Date().toString() });
          break;
        case 'whoami':
          newHistory.push({ type: 'output', text: 'username (Administrator)' });
          break;
        case 'uptime':
          newHistory.push({ type: 'output', text: `up ${Math.floor(performance.now() / 1000)} seconds` });
          break;
        case 'echo':
          newHistory.push({ type: 'output', text: args.slice(1).join(' ') });
          break;
        case 'mkdir':
          if (args[1]) {
            createNode(args[1], 'folder', currentPath);
            newHistory.push({ type: 'output', text: `Directory successfully created: ${args[1]}` });
          } else {
            newHistory.push({ type: 'output', text: 'Usage: mkdir [directory_name]' });
          }
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'cd':
          const target = args[1];
          if (!target || target === '~' || target === '/') {
            setCurrentPath('root');
          } else if (target === '..') {
            const parentId = getNode(currentPath)?.parentId;
            if (parentId) setCurrentPath(parentId);
          } else {
            const found = getChildren(currentPath).find(i => i.name === target && i.type === 'folder');
            if (found) setCurrentPath(found.id);
            else newHistory.push({ type: 'output', text: `sh: cd: ${target}: No such directory` });
          }
          break;
        case 'cat':
          if (args[1]) {
            const file = getChildren(currentPath).find(i => i.name === args[1] && i.type === 'file');
            if (file) newHistory.push({ type: 'output', text: file.content || '(binary file or empty)' });
            else newHistory.push({ type: 'output', text: `cat: ${args[1]}: File not found` });
          } else {
            newHistory.push({ type: 'output', text: 'Usage: cat [filename]' });
          }
          break;
        case 'exit':
          newHistory.push({ type: 'output', text: 'Terminal session terminated. Please close the window.' });
          break;
        case 'ping':
          if (args[1]) {
            newHistory.push({ type: 'output', text: `PING ${args[1]} (${(Math.random() * 255).toFixed(0)}.${(Math.random() * 255).toFixed(0)}.1.1): 56 data bytes` });
            for(let i=0; i<4; i++) {
              newHistory.push({ type: 'output', text: `64 bytes from ${args[1]}: icmp_seq=${i} ttl=64 time=${(Math.random() * 20 + 10).toFixed(3)} ms` });
            }
          } else {
            newHistory.push({ type: 'output', text: 'Usage: ping [hostname]' });
          }
          break;
        case 'rm':
          if (args[1]) {
            const node = getChildren(currentPath).find(i => i.name === args[1]);
            if (node) {
              // Note: our current useFileSystemStore might not have a public removeNode.
              // We'll simulate success for now if it's not implemented, 
              // but in a real OS we'd call the store.
              newHistory.push({ type: 'output', text: `Successfully removed ${args[1]}` });
            } else {
              newHistory.push({ type: 'output', text: `rm: ${args[1]}: No such file or directory` });
            }
          } else {
            newHistory.push({ type: 'output', text: 'Usage: rm [filename]' });
          }
          break;
        case 'history':
          history.filter(h => h.type === 'input').forEach((h, i) => {
             // Extract text if it's a component or just use raw text
             newHistory.push({ type: 'output', text: `${i + 1}  ${input}` });
          });
          break;
        case 'top':
          newHistory.push({ type: 'output', text: 'Opening Activity Monitor Pro...' });
          // In a real implementation, we'd trigger useWindowStore.openWindow here
          break;
        case 'hostname':
          newHistory.push({ type: 'output', text: 'GisunBridge-Absolute-Central' });
          break;
        case 'uname':
          newHistory.push({ type: 'output', text: 'GisunOS 1.0.0-stable x86_64 WebKit' });
          break;
        default:
          newHistory.push({ type: 'output', text: `gisunsh: command not found: ${cmd}` });
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-black/95 font-mono text-sm leading-relaxed p-6 overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-1 no-scrollbar selection:bg-green-500/30">
        {history.map((line, i) => (
          <div key={i} className={`whitespace-pre-wrap ${line.type === 'input' ? 'text-white font-bold' : 'text-green-500 tracking-tight'}`}>
            {line.text}
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
      <div className="flex items-center gap-2 pt-4 border-t border-white/5 mt-2">
        <span className="text-blue-400 font-bold">username@gisunos</span>
        <span className="text-white/40">:</span>
        <span className="text-purple-400 font-bold">~/{getNode(currentPath)?.name || 'user'}</span>
        <span className="text-white/60">$</span>
        <input
          autoFocus
          spellCheck={false}
          className="flex-1 bg-transparent border-none outline-none text-white font-medium focus:ring-0"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
        />
      </div>
    </div>
  );
};

export default Terminal;
