import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCw, Home, Search as SearchIcon, Shield, Globe, Plus, X, Lock, ExternalLink } from 'lucide-react';
import { BRIDGE_URL } from '../config';

const Browser = () => {
  const [tabs, setTabs] = useState([
    { id: 1, url: 'https://www.google.com/search?igu=1', title: 'Google Search', loading: false }
  ]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [addressBar, setAddressBar] = useState('');

  const BRIGDE_ENDPOINT = BRIDGE_URL;
  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  useEffect(() => {
    setAddressBar(getDisplayUrl(activeTab.url));
  }, [activeTab.url]);

  const addTab = () => {
    const newId = Math.max(...tabs.map(t => t.id)) + 1;
    const newTab = { id: newId, url: 'https://www.google.com/search?igu=1', title: 'New Tab', loading: false };
    setTabs([...tabs, newTab]);
    setActiveTabId(newId);
  };

  const closeTab = (id, e) => {
    e.stopPropagation();
    if (tabs.length === 1) return;
    const newTabs = tabs.filter(t => t.id !== id);
    setTabs(newTabs);
    if (activeTabId === id) {
      setActiveTabId(newTabs[0].id);
    }
  };

  const handleGo = (targetUrl) => {
    let rawUrl = targetUrl || addressBar;
    if (!rawUrl) return;

    let finalUrl = rawUrl;
    if (!rawUrl.includes('.') || rawUrl.includes(' ')) {
      finalUrl = `https://www.google.com/search?q=${encodeURIComponent(rawUrl)}`;
    } else if (!rawUrl.startsWith('http')) {
      finalUrl = 'https://' + rawUrl;
    }

    const needsBridge = finalUrl.includes('google.com') || finalUrl.includes('youtube.com') || finalUrl.includes('wikipedia.org');
    const proxiedUrl = needsBridge ? `${BRIGDE_ENDPOINT}${encodeURIComponent(finalUrl)}` : finalUrl;

    setTabs(tabs.map(t => t.id === activeTabId ? { ...t, url: proxiedUrl, title: rawUrl } : t));
  };

  const getDisplayUrl = (url) => {
    if (url.includes(BRIGDE_ENDPOINT)) {
      try {
        return decodeURIComponent(url.split('url=')[1]);
      } catch (e) { return url; }
    }
    return url;
  };

  return (
    <div className="flex h-full w-full flex-col bg-[#0f0f0f] text-white/90 overflow-hidden font-sans">
      {/* Tab Bar */}
      <div className="flex h-11 bg-[#050505] px-2 pt-1.5 gap-1 overflow-x-auto no-scrollbar border-b border-white/5">
        <AnimatePresence>
          {tabs.map((tab) => (
            <motion.div
              key={tab.id}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 180, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              onClick={() => setActiveTabId(tab.id)}
              className={`group flex items-center gap-2 px-3 h-full rounded-t-xl cursor-pointer transition-all border-x border-t border-transparent relative
                ${activeTabId === tab.id 
                  ? 'bg-[#1a1a1a] text-white border-white/10 z-10' 
                  : 'text-white/40 hover:bg-white/5'
                }`}
            >
              <Globe size={12} className={activeTabId === tab.id ? 'text-blue-400' : 'text-white/20'} />
              <span className="text-[11px] font-semibold truncate flex-1 tracking-tight">{tab.title}</span>
              <button 
                onClick={(e) => closeTab(tab.id, e)}
                className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-white/10 rounded transition-all"
              >
                <X size={10} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        
        <button 
          onClick={addTab}
          className="p-1.5 h-7 w-7 mt-0.5 flex items-center justify-center hover:bg-white/10 rounded-full transition-all text-white/40 hover:text-white"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex h-12 items-center gap-4 px-4 bg-[#1a1a1a] border-b border-white/5 shadow-xl">
        <div className="flex gap-1 items-center">
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/30 cursor-not-allowed"><ChevronLeft size={18} /></button>
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/30 cursor-not-allowed"><ChevronRight size={18} /></button>
          <button onClick={() => handleGo()} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/60"><RotateCw size={16} /></button>
          <button onClick={() => handleGo('https://www.google.com/search?igu=1')} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/60 ml-1"><Home size={16} /></button>
        </div>
        
        <div className="flex-1 flex items-center bg-black/40 rounded-xl h-9 px-4 border border-white/10 focus-within:ring-2 focus-within:ring-blue-500/30 transition-all shadow-inner group/address">
           <Lock size={12} className="text-emerald-500/70 mr-3" />
           <input 
              className="w-full h-full text-[13px] outline-none bg-transparent font-medium"
              value={addressBar}
              onChange={(e) => setAddressBar(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGo()}
              placeholder="Search or enter address..."
           />
           <SearchIcon size={14} className="text-white/20 group-focus-within/address:text-blue-400 ml-2" />
        </div>

        <div className="flex items-center gap-3">
           <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg shadow-sm">
              <Shield size={12} className="text-blue-400" />
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Gisun Sandbox</span>
           </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTabId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            <iframe 
              src={activeTab.url} 
              className="w-full h-full border-none"
              title={`Gisun Browser - ${activeTab.id}`}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-presentation allow-popups-to-escape-sandbox"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Connection Status */}
        <div className="absolute bottom-6 right-6 flex items-center gap-3 px-4 py-2 bg-black/90 backdrop-blur-2xl rounded-2xl border border-white/10 text-white shadow-2xl animate-in slide-in-from-right duration-500">
           <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
           <div className="flex flex-col">
             <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Network</span>
             <span className="text-[10px] font-bold tracking-tight">Proxy Secured</span>
           </div>
           <ExternalLink size={12} className="opacity-20 ml-2" />
        </div>
      </div>
    </div>
  );
};

export default Browser;
