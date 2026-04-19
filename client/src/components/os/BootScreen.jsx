import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSystemStore from '../../store/useSystemStore';

const BootScreen = () => {
  const { bootStage, setBootStage } = useSystemStore();

  useEffect(() => {
    // Cinematic Timeline
    if (bootStage === 'logo') {
      const timer = setTimeout(() => setBootStage('bar'), 3500); // Longer for cinematic effect
      return () => clearTimeout(timer);
    }
    if (bootStage === 'bar') {
      const timer = setTimeout(() => setBootStage('desktop'), 4000);
      return () => clearTimeout(timer);
    }
  }, [bootStage, setBootStage]);

  const letters = "Gisun".split("");

  return (
    <div className="fixed inset-0 z-[6000] flex flex-col items-center justify-center bg-black font-['Outfit'] overflow-hidden">
      {/* Cinematic Background Glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15)_0%,transparent_70%)]"
      />

      <AnimatePresence mode="wait">
        {(bootStage === 'logo' || bootStage === 'bar') && (
          <motion.div
            key="gisun-cinematic-logo"
            className="relative mb-16 flex flex-col items-center"
          >
            {/* New Gisun Icon Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
              animate={{ 
                opacity: 0.8, 
                scale: 1, 
                filter: 'blur(0px)',
              }}
              transition={{ 
                duration: 2,
                ease: "easeOut"
              }}
              className="mb-8 relative"
            >
              <motion.img 
                src="/logo.png" 
                alt="Gisun Logo" 
                className="w-32 h-32 object-contain drop-shadow-[0_0_40px_rgba(59,130,246,0.3)]"
                animate={{ 
                  y: [0, -10, 0],
                  filter: ["blur(0px)", "blur(1px)", "blur(0px)"],
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              {/* Extra Glow Orb behind logo */}
              <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full scale-150 -z-10" />
            </motion.div>

            {/* Staggered Letter Reveal */}
            <div className="flex">
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: 'blur(20px)', scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    filter: 'blur(0px)', 
                    scale: 1 
                  }}
                  transition={{ 
                    duration: 1.5, 
                    delay: i * 0.15,
                    ease: [0.2, 0.65, 0.3, 0.9]
                  }}
                  className="text-8xl font-black tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] italic"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Atmospheric Subtitle */}
            <motion.div 
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 0.4, letterSpacing: '1.2em' }}
              transition={{ delay: 2, duration: 4 }}
              className="mt-6 text-[10px] font-black text-white uppercase translate-x-[0.6em]"
            >
              A webOS
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center gap-8 relative z-20">
        <div className="h-[2px] w-72 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
          <AnimatePresence>
            {bootStage === 'bar' && (
              <motion.div
                key="cinematic-progress"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                transition={{ duration: 4, ease: [0.4, 0, 0.2, 1] }}
                className="h-full bg-gradient-to-r from-blue-500 via-white to-blue-500 shadow-[0_0_25px_rgba(255,255,255,0.5)]"
              />
            )}
          </AnimatePresence>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ delay: 2.5 }}
          className="text-[9px] uppercase font-black tracking-[0.4em] text-white text-center"
        >
          {bootStage === 'logo' ? 'Synchronizing Kernel' : 'Mounting Virtual Environment'}
        </motion.div>
      </div>
    </div>
  );
};

export default BootScreen;
