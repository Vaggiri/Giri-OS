import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
  persist(
    (set) => ({
      wallpaper: '/wallpaper.png',
      fontFamily: 'Inter',
      accentColor: '#007AFF',
      brightness: 100,
      volume: 80,
      isDark: true,
      dockAutoHide: false,

      setWallpaper: (url) => set({ wallpaper: url }),
      setFontFamily: (font) => set({ fontFamily: font }),
      setAccentColor: (color) => set({ accentColor: color }),
      setBrightness: (val) => set({ brightness: val }),
      setVolume: (val) => set({ volume: val }),
      setDark: (val) => set({ isDark: val }),
      setDockAutoHide: (val) => set({ dockAutoHide: val }),
    }),
    { name: 'gisun-theme' }
  )
);

export default useThemeStore;
