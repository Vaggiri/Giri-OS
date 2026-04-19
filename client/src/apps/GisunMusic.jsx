import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Play, Pause, SkipBack, SkipForward, Volume2, Music, Disc, Globe2, Heart, ListMusic, Mic2, Radio } from 'lucide-react';
import { API_URL } from '../config';

const GisunMusic = () => {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [activeRegion, setActiveRegion] = useState('Global');
  
  // Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const playerRef = useRef(null);
  const timerRef = useRef(null);

  const regions = [
    { name: 'Global', query: 'Top 50 Global Hits 2024' },
    { name: 'India', query: 'Indian Bollywood Hits 2024' },
    { name: 'Korea', query: 'K-Pop Top Hits' },
    { name: 'Latino', query: 'Reggaeton & Latino Hits' },
    { name: 'UK', query: 'UK Pop & Drill' },
    { name: 'Japan', query: 'J-Pop Top Mix' },
    { name: 'France', query: 'French Pop Hits' }
  ];

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Interval to sync time
    timerRef.current = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        const time = playerRef.current.getCurrentTime();
        const dur = playerRef.current.getDuration();
        setCurrentTime(time);
        if (dur > 0) setDuration(dur);
        
        // Auto-sync playing state
        const state = playerRef.current.getPlayerState();
        setIsPlaying(state === 1); // 1 is playing
      }
    }, 500);

    return () => clearInterval(timerRef.current);
  }, []);

  const initPlayer = (videoId) => {
    if (playerRef.current) {
      playerRef.current.loadVideoById(videoId);
      playerRef.current.setVolume(volume);
    } else if (window.YT && window.YT.Player) {
      playerRef.current = new window.YT.Player('gimusic-player', {
        height: '0',
        width: '0',
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          controls: 0
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(volume);
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) setIsPlaying(true);
            else if (event.data === window.YT.PlayerState.PAUSED) setIsPlaying(false);
          }
        }
      });
    }
  };

  useEffect(() => {
    if (currentSong) {
      initPlayer(currentSong.id);
    }
  }, [currentSong]);

  const searchSongs = async (searchQuery) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/youtube/search?q=${encodeURIComponent(searchQuery + ' music official audio')}`);
      const data = await res.json();
      setSongs(data);
    } catch (err) {
      console.error('Failed to fetch songs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchSongs(regions.find(r => r.name === activeRegion).query);
  }, [activeRegion]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e) => {
    if (!playerRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickedProgress = x / rect.width;
    const newTime = clickedProgress * duration;
    playerRef.current.seekTo(newTime, true);
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newVolume = Math.round((x / rect.width) * 100);
    setVolume(newVolume);
    if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
      playerRef.current.setVolume(newVolume);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex h-full w-full bg-[#050505] text-white/90 overflow-hidden font-sans">
      {/* Hidden Player Div */}
      <div id="gimusic-player" className="hidden"></div>

      {/* Left Sidebar */}
      <div className="w-64 bg-black/40 backdrop-blur-3xl border-r border-white/5 flex flex-col pt-12 pb-6">
        <div className="px-6 mb-8 group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                 <Disc size={22} className="text-white animate-spin-slow" />
              </div>
              <span className="text-lg font-black tracking-tighter">GisunMusic</span>
           </div>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 px-4 mb-4">World Hub</p>
          {regions.map((region) => (
            <button
              key={region.name}
              onClick={() => setActiveRegion(region.name)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                activeRegion === region.name 
                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                : 'text-white/40 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Globe2 size={16} />
              <span className="text-sm font-bold tracking-tight">{region.name}</span>
            </button>
          ))}
          <div className="h-[1px] bg-white/5 my-6 mx-4" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 px-4 mb-4">Library</p>
          <SidebarItem icon={<Heart size={16}/>} label="Favorites" />
          <SidebarItem icon={<ListMusic size={16}/>} label="Playlists" />
          <SidebarItem icon={<Mic2 size={16}/>} label="Artists" />
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-b from-indigo-500/5 to-transparent">
        <header className="h-20 flex items-center px-8 justify-between z-10">
           <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-xl group">
                 <input 
                   value={query}
                   onChange={(e) => setQuery(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && searchSongs(query)}
                   placeholder="Search millions of songs internationally..."
                   className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 px-6 pl-12 text-sm outline-none focus:bg-white/10 focus:border-indigo-500/30 transition-all font-medium"
                 />
                 <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-indigo-400" />
              </div>
           </div>
           <div className="w-32"></div>
        </header>

        <div className="flex-1 overflow-y-auto px-10 pb-32 no-scrollbar">
           <div className="mb-8">
              <h1 className="text-3xl font-black tracking-tighter mb-1 uppercase italic">{activeRegion} Discovery</h1>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
              {loading ? (
                Array(10).fill(0).map((_, i) => (
                  <div key={i} className="flex flex-col gap-3 animate-pulse">
                     <div className="aspect-square bg-white/5 rounded-3xl" />
                     <div className="h-4 w-3/4 bg-white/5 rounded-full" />
                  </div>
                ))
              ) : (
                songs.map(song => (
                  <motion.div
                    key={song.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex flex-col gap-3 group cursor-pointer"
                    onClick={() => setCurrentSong(song)}
                  >
                    <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 group-hover:shadow-indigo-500/10 transition-all">
                       <img src={song.thumbnail} alt={song.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center">
                             <Play size={24} fill="currentColor" />
                          </div>
                       </div>
                    </div>
                    <div className="px-1 line-clamp-1">
                       <h3 className="text-sm font-black tracking-tight leading-tight group-hover:text-indigo-400 transition-colors uppercase">{song.title.toLowerCase()}</h3>
                    </div>
                  </motion.div>
                ))
              )}
           </div>
        </div>

        {/* Playback Control Bar */}
        <AnimatePresence>
          {currentSong && (
            <motion.div 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              className="absolute bottom-0 left-0 right-0 h-24 bg-black/80 backdrop-blur-3xl border-t border-white/5 px-8 flex items-center justify-between z-30"
            >
               <div className="flex items-center gap-4 w-1/4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                     <img src={currentSong.thumbnail} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col min-w-0">
                     <span className="text-sm font-black truncate tracking-tighter uppercase italic">{currentSong.title.toLowerCase()}</span>
                     <span className="text-[10px] font-bold text-white/30 tracking-widest">{currentSong.author}</span>
                  </div>
               </div>

               <div className="flex flex-col items-center gap-3 w-2/4 px-10">
                  <div className="flex items-center gap-6">
                     <button className="text-white/40 hover:text-white transition-colors" onClick={() => playerRef.current?.seekTo(currentTime - 10)}><SkipBack size={20} fill="currentColor" /></button>
                     <button 
                       onClick={togglePlay}
                       className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg"
                     >
                        {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" className="ml-1" />}
                     </button>
                     <button className="text-white/40 hover:text-white transition-colors" onClick={() => playerRef.current?.seekTo(currentTime + 10)}><SkipForward size={20} fill="currentColor" /></button>
                  </div>
                  
                  <div className="w-full flex items-center gap-3">
                     <span className="text-[10px] font-bold text-white/30 w-10 text-right font-mono">{formatTime(currentTime)}</span>
                     <div 
                       onClick={handleSeek}
                       className="flex-1 h-1.5 bg-white/5 rounded-full relative cursor-pointer group"
                     >
                        <div 
                          className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all" 
                          style={{ width: `${(currentTime / duration) * 100}%` }}
                        />
                        <div 
                          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ left: `${(currentTime / duration) * 100}%`, transform: 'translate(-50%, -50%)' }}
                        />
                     </div>
                     <span className="text-[10px] font-bold text-white/30 w-10 font-mono">{formatTime(duration)}</span>
                  </div>
               </div>

               <div className="flex items-center justify-end gap-3 w-1/4 group/vol">
                  <Volume2 size={18} className="text-white/40 group-hover/vol:text-indigo-400 transition-colors" />
                  <div 
                    onClick={handleVolumeChange}
                    className="w-24 h-1.5 bg-white/10 rounded-full relative cursor-pointer overflow-hidden"
                  >
                     <div 
                       className="absolute top-0 left-0 h-full bg-indigo-500 transition-all shadow-[0_0_8px_rgba(99,102,241,0.3)]" 
                       style={{ width: `${volume}%` }}
                     />
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label }) => (
  <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/40 hover:bg-white/5 hover:text-white cursor-pointer transition-all">
    {icon}
    <span className="text-sm font-bold tracking-tight">{label}</span>
  </div>
);

export default GisunMusic;
