import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, Maximize2, MonitorOff } from 'lucide-react';

const OrientationGuardian = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [showGuardian, setShowGuardian] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const mobileMatch = window.matchMedia("(max-width: 1024px)").matches;
      const portraitMatch = window.matchMedia("(orientation: portrait)").matches;
      
      setIsMobile(mobileMatch);
      setIsPortrait(portraitMatch);
      setShowGuardian(mobileMatch && portraitMatch);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  const handleEnterLandscape = async () => {
    try {
      // Step 1: Request Fullscreen (needed for orientation lock in many browsers)
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }

      // Step 2: Attempt to lock orientation
      if (window.screen?.orientation?.lock) {
        await window.screen.orientation.lock('landscape');
      }
    } catch (err) {
      console.warn("Orientation lock/Fullscreen failed or not supported:", err);
      // Fallback: Just let the user know they should rotate manually if lock fails
    }
  };

  return (
    <AnimatePresence>
      {showGuardian && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-2xl flex flex-col items-center justify-center p-8 text-center"
        >
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
          </div>

          <motion.div
            initial={{ y: 20, scale: 0.9 }}
            animate={{ y: 0, scale: 1 }}
            className="max-w-md relative"
          >
            <div className="mb-8 relative inline-block">
              <motion.div
                animate={{ rotate: 90 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl"
              >
                <RotateCw className="text-blue-400 w-12 h-12" />
              </motion.div>
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                <MonitorOff className="text-white w-4 h-4" />
              </div>
            </div>

            <h2 className="text-3xl font-black text-white mb-4 tracking-tighter italic">
              Experience Elevated
            </h2>
            
            <p className="text-white/60 font-medium mb-12 leading-relaxed">
              GisunOS is designed for a cinematic widescreen experience. Please rotate your device to landscape mode to unlock the workstation.
            </p>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleEnterLandscape}
                className="group relative flex items-center justify-center gap-3 px-8 h-14 bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-full hover:bg-blue-400 hover:text-white transition-all active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                <Maximize2 size={16} />
                <span>Enter Fullscreen & Lock</span>
              </button>
              
              <div className="text-[10px] font-black text-white/20 uppercase tracking-[4px] mt-4">
                Optimized for Horizontal Workflows
              </div>
            </div>
          </motion.div>

          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes shimmer {
              100% { transform: translateX(100%); }
            }
          `}} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrientationGuardian;
