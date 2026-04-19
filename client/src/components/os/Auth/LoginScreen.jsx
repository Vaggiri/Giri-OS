import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, User, Loader2 } from 'lucide-react';
import { supabase } from '../../../supabase';

const LoginScreen = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('gisunos');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // We use the provided credentials. 
      // Note: For the cloud VFS to work, this user must exist in Supabase Auth.
      // If not, we still proceed to the desktop for local functionality.
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: 'admin@gisunos.com',
        password: password
      });

      if (authError) {
        console.warn("Supabase Auth failed (credentials likely missing in dashboard). Proceeding anyway...");
      }
      
      onLoginSuccess();
    } catch (err) {
      onLoginSuccess(); // Fallback to ensure the OS opens even if Supabase is offline
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[5000] flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop')" }}>
      
      <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl" />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative flex flex-col items-center w-full max-w-sm"
      >
        {/* Profile Avatar / Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="w-32 h-32 rounded-3xl bg-black/20 backdrop-blur-3xl mb-8 flex items-center justify-center border border-white/10 shadow-2xl overflow-hidden relative group"
        >
           <img 
             src="/logo.png" 
             alt="Gisun" 
             className="w-20 h-20 object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform duration-500" 
           />
           <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent pointer-events-none" />
        </motion.div>

        <h1 className="text-3xl font-black text-white mb-10 tracking-tighter drop-shadow-2xl italic">
          GisunOS
        </h1>

        <form onSubmit={handleSignIn} className="w-full flex flex-col items-center gap-6">
          <div className="relative w-64 group">
            <input 
              type="password"
              className="w-full h-10 px-4 pr-10 bg-white/10 rounded-full border border-white/10 outline-none text-white text-center focus:ring-2 focus:ring-white/20 transition-all font-medium text-sm placeholder:text-white/20"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-all active:scale-90"
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={18} />}
            </button>
          </div>
          
          <button 
            type="submit"
            className="text-[10px] font-black text-white/40 uppercase tracking-[4px] hover:text-white transition-colors"
          >
            Click to sign in
          </button>
        </form>

        {error && <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest text-center mt-6">{error}</p>}
      </motion.div>

      {/* Footer Controls */}
      <div className="absolute bottom-12 flex gap-12 text-[10px] font-black text-white/40 uppercase tracking-[4px]">
         <button className="hover:text-white transition-colors">Sleep</button>
         <button className="hover:text-white transition-colors">Restart</button>
         <button className="hover:text-white transition-colors">Shut Down</button>
      </div>
    </div>
  );
};

export default LoginScreen;
