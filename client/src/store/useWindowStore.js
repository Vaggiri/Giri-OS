import { create } from 'zustand';

const useWindowStore = create((set) => ({
  windows: [], // Array of { id, title, icon, component, zIndex, isMinimized, isMaximized, x, y, w, h }
  activeWindowId: null,
  topZIndex: 100,

  openWindow: (app) => set((state) => {
    const exists = state.windows.find(w => w.id === app.id);
    if (exists) {
      return { 
        activeWindowId: app.id,
        windows: state.windows.map(w => 
          w.id === app.id ? { ...w, isMinimized: false, zIndex: state.topZIndex + 1 } : w
        ),
        topZIndex: state.topZIndex + 1
      };
    }
    
    return {
      windows: [...state.windows, {
        ...app,
        zIndex: state.topZIndex + 1,
        isMinimized: false,
        isMaximized: false,
        x: 100 + state.windows.length * 30,
        y: 100 + state.windows.length * 30,
        w: 800,
        h: 500
      }],
      activeWindowId: app.id,
      topZIndex: state.topZIndex + 1
    };
  }),

  focusWindow: (id) => set((state) => ({
    activeWindowId: id,
    windows: state.windows.map(w => 
      w.id === id ? { ...w, zIndex: state.topZIndex + 1 } : w
    ),
    topZIndex: state.topZIndex + 1
  })),

  updateWindowRect: (id, rect) => set((state) => ({
    windows: state.windows.map(w =>
      w.id === id ? { ...w, ...rect } : w
    )
  })),

  closeWindow: (id) => set((state) => ({
    windows: state.windows.filter(w => w.id !== id),
    activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
  })),

  toggleMinimize: (id) => set((state) => ({
    windows: state.windows.map(w => 
      w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
    ),
    activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
  })),

  toggleMaximize: (id) => set((state) => ({
    windows: state.windows.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    )
  })),
}));

export default useWindowStore;
