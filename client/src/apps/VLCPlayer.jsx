import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, 
  Maximize2, List, Cloud, HardDrive, Music, Video,
  Search, RefreshCw, AlertCircle
} from 'lucide-react';
import { supabase } from '../supabase';

const VLCPlayer = () => {
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.storage.from('giri-os-media').list();
      
      if (error) {
         if (error.message.includes('bucket not found')) {
            setError("Bucket 'giri-os-media' not found. Please create it in Supabase.");
         } else {
            setError(error.message);
         }
         return;
      }
      
      const mediaFiles = data.map(file => {
        const { data: { publicUrl } } = supabase.storage.from('giri-os-media').getPublicUrl(file.name);
        
        // Robust type detection using extension as fallback
        const ext = file.name.split('.').pop().toLowerCase();
        const videoExts = ['mp4', 'mov', 'webm', 'mkv'];
        const isVideo = file.metadata?.mimetype?.startsWith('video') || videoExts.includes(ext);
        
        return {
          ...file,
          url: publicUrl,
          type: isVideo ? 'video' : 'audio'
        };
      });
      
      setFiles(mediaFiles);
    } catch (err) {
      setError("Failed to connect to Supabase Storage.");
    } finally {
      setLoading(false);
    }
  };

  const handlePlayFile = (file) => {
    setCurrentFile(file);
    setIsPlaying(true);
    setProgress(0);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    setCurrentTime(current);
    setProgress((current / dur) * 100);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const seekTime = (x / rect.width) * duration;
    videoRef.current.currentTime = seekTime;
    setProgress((x / rect.width) * 100);
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex h-full w-full bg-[#1a1a1a] text-white overflow-hidden font-sans select-none">
      {/* Sidebar - Playlist */}
      <div className="w-72 bg-[#121212] border-r border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                  <Play size={16} fill="white" />
               </div>
               <span className="font-bold text-sm tracking-tight text-white/80">VLC MEDIA</span>
            </div>
            <button onClick={fetchMedia} className="p-2 hover:bg-white/5 rounded-full text-white/40 transition-colors">
               <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1 no-scrollbar">
           {loading ? (
             <div className="p-8 text-center text-white/20 text-xs font-medium italic">Scanning cloud library...</div>
           ) : error ? (
             <div className="p-8 text-center">
                <AlertCircle className="mx-auto mb-2 text-red-500/50" size={24} />
                <p className="text-[10px] text-white/40 leading-relaxed">{error}</p>
             </div>
           ) : files.length === 0 ? (
             <div className="p-8 text-center text-white/20 text-xs">No media found in 'giri-os-media'</div>
           ) : (
             files.map((file, idx) => (
               <button 
                 key={idx}
                 onClick={() => handlePlayFile(file)}
                 className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 group ${
                   currentFile?.name === file.name ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'hover:bg-white/5 text-white/60'
                 }`}
               >
                 <div className={`p-2 rounded-lg ${currentFile?.name === file.name ? 'bg-white/20' : 'bg-white/5'}`}>
                    {file.type === 'video' ? <Video size={14} /> : <Music size={14} />}
                 </div>
                 <div className="flex-1 overflow-hidden">
                    <div className="text-xs font-bold truncate">{file.name}</div>
                    <div className="text-[9px] opacity-40 uppercase tracking-widest mt-0.5">{file.type}</div>
                 </div>
               </button>
             ))
           )}
        </div>
      </div>

      {/* Main Player Area */}
      <div className="flex-1 flex flex-col relative bg-black">
        <div className="flex-1 flex items-center justify-center overflow-hidden">
           {currentFile ? (
              <div className="w-full h-full flex items-center justify-center relative bg-black">
                {currentFile.type === 'video' ? (
                   <video
                     ref={videoRef}
                     src={currentFile.url}
                     onTimeUpdate={handleTimeUpdate}
                     onLoadedMetadata={handleLoadedMetadata}
                     className="max-w-full max-h-full"
                     autoPlay
                   />
                ) : (
                   <div className="flex flex-col items-center gap-6">
                      <motion.div 
                        animate={{ rotate: isPlaying ? 360 : 0 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="w-48 h-48 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-2xl shadow-orange-500/40 relative"
                      >
                         <Music size={80} className="text-white/80" />
                         <div className="absolute inset-0 border-8 border-white/10 rounded-full" />
                      </motion.div>
                      <div className="text-center">
                         <h3 className="text-xl font-bold">{currentFile.name}</h3>
                         <p className="text-white/40 text-xs uppercase tracking-widest mt-2 font-black">Streaming from Cloud</p>
                      </div>
                      <audio
                        ref={videoRef}
                        src={currentFile.url}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        autoPlay
                      />
                   </div>
                )}

                {/* Video Info Overlay (Fades out) */}
                <AnimatePresence>
                   {!isPlaying && (
                     <motion.div 
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       exit={{ opacity: 0 }}
                       className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none"
                     >
                        <div className="w-20 h-20 rounded-full bg-orange-500/80 flex items-center justify-center">
                           <Play size={40} fill="white" />
                        </div>
                     </motion.div>
                   )}
                </AnimatePresence>
              </div>
           ) : (
             <div className="flex flex-col items-center gap-4 opacity-10">
                <Play size={120} className="text-white" />
                <span className="text-sm font-black tracking-[1em] uppercase">VLC Ready</span>
             </div>
           )}
        </div>

        {/* Controls Bar */}
        <div className="h-24 bg-[#121212]/80 backdrop-blur-xl border-t border-white/5 flex flex-col p-4">
           {/* Progress Bar */}
           <div 
             onClick={handleSeek}
             className="w-full h-1.5 bg-white/10 rounded-full mb-4 cursor-pointer relative overflow-hidden group"
           >
              <div 
                className="absolute top-0 left-0 h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)] transition-all ease-out" 
                style={{ width: `${progress}%` }}
              />
              <div 
                className="absolute h-full w-2 bg-white top-0 group-hover:opacity-100 opacity-0 transition-opacity" 
                style={{ left: `${progress}%` }}
              />
           </div>

           <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-4">
                    <SkipBack size={20} className="text-white/40 hover:text-white transition-colors cursor-pointer" />
                    <button 
                      onClick={togglePlay}
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all"
                    >
                       {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" className="ml-1" />}
                    </button>
                    <SkipForward size={20} className="text-white/40 hover:text-white transition-colors cursor-pointer" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-xs font-bold text-white/80">{currentFile?.name || 'Nothing Playing'}</span>
                    <span className="text-[10px] text-white/40 font-mono mt-0.5">{formatTime(currentTime)} / {formatTime(duration)}</span>
                 </div>
              </div>

              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-3 group/vol">
                    <Volume2 size={18} className="text-white/40 group-hover/vol:text-orange-500" />
                    <div className="w-24 h-1 bg-white/10 rounded-full relative">
                       <div className="absolute top-0 left-0 h-full bg-orange-500" style={{ width: `${volume}%` }} />
                    </div>
                 </div>
                 <Maximize2 size={18} className="text-white/40 hover:text-white cursor-pointer" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default VLCPlayer;
