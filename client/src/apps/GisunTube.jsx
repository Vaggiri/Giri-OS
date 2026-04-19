import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Play, X, ChevronLeft, TrendingUp, Clock, ThumbsUp, Share2, Maximize2 } from 'lucide-react';
import { API_URL } from '../config';

const GisunTube = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Music', 'Gaming', 'Live', 'Tech', 'Coding', 'Movies'];

  const searchVideos = async (searchQuery = 'trending') => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/youtube/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setVideos(data);
    } catch (err) {
      console.error('Failed to fetch videos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchVideos('trending');
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter') searchVideos(query);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#0f0f0f] text-white overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-[#0f0f0f] border-b border-white/5 sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="bg-red-600 p-1.5 rounded-lg shadow-[0_0_15px_rgba(220,38,38,0.4)]">
            <Play size={18} fill="currentColor" />
          </div>
          <span className="text-lg font-black tracking-tighter">GisunTube</span>
        </div>

        <div className="flex-1 max-w-2xl px-8">
          <div className="relative group">
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 px-5 pl-12 outline-none focus:border-red-500/50 focus:bg-white/10 transition-all text-sm"
              placeholder="Search GisunTube..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-red-500" />
          </div>
        </div>

        <div className="w-32 flex justify-end">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-purple-600" />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r border-white/5 p-4 hidden md:flex flex-col gap-2 overflow-y-auto no-scrollbar">
          <SidebarItem icon={<TrendingUp size={18}/>} label="Trending" active />
          <SidebarItem icon={<Clock size={18}/>} label="Shorts" />
          <SidebarItem icon={<ThumbsUp size={18}/>} label="Subscriptions" />
          <div className="h-[1px] bg-white/5 my-2" />
          <span className="text-[10px] font-black uppercase text-white/30 px-3 py-2 tracking-widest">Library</span>
          <SidebarItem icon={<Clock size={18}/>} label="History" />
          <SidebarItem icon={<Play size={18}/>} label="Wath Later" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 relative no-scrollbar">
          <AnimatePresence mode="wait">
            {selectedVideo ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col gap-4 max-w-6xl mx-auto"
              >
                {/* Back Button */}
                <button 
                  onClick={() => setSelectedVideo(null)}
                  className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-2 text-sm font-semibold"
                >
                  <ChevronLeft size={20} /> Back to discovery
                </button>

                {/* Player */}
                <div className="aspect-video w-full rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/5 relative group">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&modestbranding=1&rel=0`}
                    className="w-full h-full border-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Meta */}
                <div className="flex flex-col gap-2 mt-2">
                  <h1 className="text-2xl font-black leading-tight tracking-tight">{selectedVideo.title}</h1>
                  <div className="flex items-center justify-between py-2">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/5" />
                        <div className="flex flex-col">
                           <span className="font-bold text-sm tracking-tight">{selectedVideo.author}</span>
                           <span className="text-xs text-white/40">1.2M Subscribers</span>
                        </div>
                        <button className="ml-4 bg-white text-black px-6 py-2 rounded-full text-xs font-black transition-transform active:scale-95">
                           SUBSCRIBE
                        </button>
                     </div>
                     <div className="flex items-center gap-2">
                        <ActionButton icon={<ThumbsUp size={16}/>} label="Like" />
                        <ActionButton icon={<Share2 size={16}/>} label="Share" />
                        <ActionButton icon={<Maximize2 size={16}/>} />
                     </div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 mt-2">
                     <span className="text-xs font-bold block mb-1">{selectedVideo.views} • {selectedVideo.timestamp}</span>
                     <p className="text-sm text-white/70 leading-relaxed font-medium">Enjoy this premium playback experience on GisunOS. GisunTube ensures zero cross-origin errors and full-speed video encoding.</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-6"
              >
                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                        activeCategory === cat 
                          ? 'bg-white text-black border-white' 
                          : 'bg-white/5 text-white/60 border-white/5 hover:bg-white/10'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
                  {loading ? (
                    Array(12).fill(0).map((_, i) => (
                      <div key={i} className="flex flex-col gap-3 animate-pulse">
                        <div className="aspect-video bg-white/5 rounded-2xl" />
                        <div className="h-4 w-3/4 bg-white/5 rounded-full" />
                        <div className="h-3 w-1/2 bg-white/5 rounded-full" />
                      </div>
                    ))
                  ) : (
                    videos.map(video => (
                      <motion.div
                        layoutId={video.id}
                        key={video.id}
                        whileHover={{ y: -5 }}
                        className="flex flex-col gap-3 cursor-pointer group"
                        onClick={() => setSelectedVideo(video)}
                      >
                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-white/5">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none" />
                          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 rounded font-mono text-[10px] font-bold">14:20</div>
                        </div>
                        <div className="flex flex-col px-1">
                          <h3 className="text-sm font-bold line-clamp-2 leading-snug tracking-tight group-hover:text-red-500 transition-colors uppercase">
                            {video.title.toLowerCase()}
                          </h3>
                          <div className="flex flex-col mt-1 opacity-60">
                            <span className="text-[11px] font-bold">{video.author}</span>
                            <span className="text-[10px]">{video.views} • {video.timestamp}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-4 px-4 py-2.5 rounded-2xl cursor-pointer transition-all ${active ? 'bg-red-600/10 text-red-500 border border-red-500/20' : 'hover:bg-white/5 opacity-60 hover:opacity-100'}`}>
    {icon}
    <span className="text-sm font-bold tracking-tight">{label}</span>
  </div>
);

const ActionButton = ({ icon, label }) => (
  <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/5">
    {icon}
    {label && <span className="text-xs font-black">{label}</span>}
  </button>
);

export default GisunTube;
