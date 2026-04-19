import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useDesktopStore = create(
  persist(
    (set, get) => ({
      shortcuts: [
        { id: 'sc-vlc', appId: 'vlc', x: 20, y: 20 },
        { id: 'sc-gisunmusic', appId: 'gisunmusic', x: 20, y: 120 },
        { id: 'sc-terminal', appId: 'terminal', x: 20, y: 220 },
        { id: 'sc-activity', appId: 'activity', x: 20, y: 320 },
      ],
      
      widgets: {
        clock: { x: 50, y: 50 },
        stats: { x: 300, y: 50 }
      },

      addShortcut: (appId) => {
        const { shortcuts } = get();
        if (shortcuts.find(s => s.appId === appId)) return;
        
        const newShortcut = {
          id: `sc-${Math.random().toString(36).substr(2, 9)}`,
          appId,
          x: 120, // Default drop position
          y: 20
        };
        
        set({ shortcuts: [...shortcuts, newShortcut] });
      },

      removeShortcut: (id) => {
        set((state) => ({
          shortcuts: state.shortcuts.filter(s => s.id !== id || s.appId !== id) // Flexible check for IDs or appId
        }));
      },

      removeShortcutByAppId: (appId) => {
        set((state) => ({
          shortcuts: state.shortcuts.filter(s => s.appId !== appId)
        }));
      },

      updatePosition: (id, x, y) => {
        set((state) => ({
          shortcuts: state.shortcuts.map(s => 
            s.id === id ? { ...s, x, y } : s
          )
        }));
      },

      updateWidgetPosition: (id, x, y) => {
        set((state) => ({
          widgets: {
            ...state.widgets,
            [id]: { x, y }
          }
        }));
      },
    }),
    {
      name: 'gisunos-desktop-storage',
    }
  )
);

export default useDesktopStore;
