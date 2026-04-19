import React, { useState } from 'react';
import { Search, Globe, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

const SearchHub = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' || !e.key) {
      // In a real OS this would perform a search
      // Here we simulate the results or provide a link
      if (query.trim()) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
      }
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-white text-gray-900 overflow-auto">
      <div className="max-w-4xl mx-auto w-full px-8 py-20 flex flex-col items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-12">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-xl">
             <Globe size={28} />
          </div>
          <span className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            GisunSearch
          </span>
        </div>

        {/* Search Input */}
        <div className="w-full relative max-w-2xl group">
          <input 
            autoFocus
            className="w-full h-16 pl-14 pr-6 rounded-3xl border border-gray-200 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 text-lg transition-all shadow-sm group-hover:shadow-lg"
            placeholder="Search the web or type a URL"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <Search size={24} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
           {['YouTube', 'GitHub', 'Reddit', 'Docs', 'Gemini'].map(site => (
             <button key={site} className="px-5 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-sm font-semibold text-gray-600 transition-colors border border-gray-100">
               {site}
             </button>
           ))}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full text-left">
           <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100/50">
              <ShieldCheck className="text-blue-600 mb-4" size={24} />
              <h3 className="font-bold text-sm mb-2">Privacy First</h3>
              <p className="text-xs text-gray-500 leading-relaxed">GisunSearch blocks tracking scripts and protects your identity while browsing the virtual web.</p>
           </div>
           <div className="p-6 rounded-2xl bg-cyan-50 border border-cyan-100/50">
              <Zap className="text-cyan-600 mb-4" size={24} />
              <h3 className="font-bold text-sm mb-2">Instant Scale</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Built for GisunOS performance, sites render 2x faster through our custom indexing engine.</p>
           </div>
           <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100/50 group cursor-pointer hover:bg-gray-100 transition-colors">
              <ArrowRight className="text-gray-400 mb-4 group-hover:translate-x-1 transition-transform" size={24} />
              <h3 className="font-bold text-sm mb-2">Cloud Synced</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Your history and bookmarks stay synced across all your browser tabs in GisunOS.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHub;
