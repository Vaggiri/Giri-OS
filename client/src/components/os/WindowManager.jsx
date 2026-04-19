import React, { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import useWindowStore from '../../store/useWindowStore';
import WindowFrame from './WindowFrame';

const WindowManager = () => {
  // Select only IDs to prevent re-rendering all windows when one resizes
  const windowIds = useWindowStore((state) => 
    state.windows.map(w => w.id).join(',')
  ).split(',').filter(Boolean);

  return (
    <div className="absolute inset-0 pointer-events-none z-[500] overflow-hidden">
      <AnimatePresence>
        {windowIds.map((id) => (
          <WindowFrame 
            key={id} 
            id={id} 
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default WindowManager;
