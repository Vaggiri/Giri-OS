import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useSystemStore from '../../store/useSystemStore';

const BootSequence = ({ stage }) => {
  const { setBootStage } = useSystemStore();

  useEffect(() => {
    if (stage === 'logo') {
      setTimeout(() => setBootStage('bar'), 2000);
    } else if (stage === 'bar') {
      setTimeout(() => setBootStage('desktop'), 3000);
    }
  }, [stage, setBootStage]);

  return (
    <div className="flex h-full w-full items-center justify-center bg-black">
      {stage === 'logo' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="text-6xl text-white"
        >
          
        </motion.div>
      )}
      
      {stage === 'bar' && (
        <div className="flex flex-col items-center gap-8">
          <div className="text-6xl text-white">GisunOS</div>
          <div className="h-1 w-64 overflow-hidden rounded bg-gray-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="h-full bg-white"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BootSequence;
