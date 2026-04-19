import { useState, useEffect, useCallback } from 'react';

export const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    setContextMenu({
      x: e.pageX,
      y: e.pageY,
      type: e.target.getAttribute('data-context-type') || 'desktop',
      targetId: e.target.getAttribute('data-id')
    });
  }, []);

  const closeMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  useEffect(() => {
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, [closeMenu]);

  return { contextMenu, handleContextMenu, closeMenu };
};
