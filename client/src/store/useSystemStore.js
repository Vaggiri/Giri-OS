import { create } from 'zustand';

const useSystemStore = create((set) => ({
  bootStage: 'logo', // 'none' | 'logo' | 'bar' | 'login' | 'desktop'
  isDark: true,
  user: {
    name: 'Gisun',
    avatar: '/assets/avatar.png',
  },
  
  setBootStage: (stage) => set({ bootStage: stage }),
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
  
  logout: () => set({ bootStage: 'login' }),
  login: () => set({ bootStage: 'desktop' }),
}));

export default useSystemStore;
