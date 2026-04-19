import React, { useState, useEffect } from 'react';
import Desktop from './components/os/Desktop';
import BootScreen from './components/os/BootScreen';
import LoginScreen from './components/os/Auth/LoginScreen';
import OrientationGuardian from './components/os/OrientationGuardian';
import useSystemStore from './store/useSystemStore';
import useThemeStore from './store/useThemeStore';
import useFileSystemStore from './store/useFileSystemStore';
import { supabase } from './supabase';

function App() {
  const { bootStage } = useSystemStore();
  const { brightness } = useThemeStore();
  const { fetchFileSystem } = useFileSystemStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        setIsAuthenticated(true);
        fetchFileSystem();
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setIsAuthenticated(true);
        fetchFileSystem();
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchFileSystem]);

  return (
    <div className="h-screen w-screen overflow-hidden select-none bg-black">
      <OrientationGuardian />
      
      {/* Global Brightness Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9999] bg-black transition-opacity duration-300"
        style={{ opacity: (100 - brightness) / 100 }}
      />
      
      {bootStage !== 'desktop' && bootStage !== 'login' ? (
        <BootScreen />
      ) : !isAuthenticated ? (
        <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <Desktop />
      )}
    </div>
  );
}

export default App;
