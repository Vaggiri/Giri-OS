import React from 'react';
import { MapPin, Search, Compass, Navigation } from 'lucide-react';
import { BRIDGE_URL } from '../config';

const GisunMaps = () => {
  const BRIGDE_ENDPOINT = BRIDGE_URL;
  const GOOGLE_MAPS_URL = 'https://www.google.com/maps?igu=1';
  
  // We use the bridge to ensure Google Maps can be embedded without X-Frame-Options blocking
  const proxiedMapsUrl = `${BRIGDE_ENDPOINT}${encodeURIComponent(GOOGLE_MAPS_URL)}`;

  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Chrome Header for Maps */}
      <div className="absolute top-4 left-4 z-10 w-72 flex items-center gap-2 p-2 px-4 rounded-full bg-white/90 backdrop-blur-md shadow-xl border border-gray-100 transition-all hover:w-80 font-bold tracking-tight">
        <Search size={18} className="text-gray-400" />
        <input 
          className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800 placeholder:text-gray-400"
          placeholder="Search Google Maps..."
        />
        <div className="h-4 w-px bg-gray-200 mx-1" />
        <Navigation size={18} className="text-blue-500 cursor-pointer" />
      </div>

      {/* Map Content Area */}
      <div className="flex-1 w-full bg-[#e5e3df] relative overflow-hidden">
        <iframe 
          src={proxiedMapsUrl}
          className="w-full h-full border-none"
          title="Google Maps"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-presentation allow-popups-to-escape-sandbox"
        />
        
        {/* Connection Status */}
        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white pointer-events-none">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-[9px] font-black uppercase tracking-widest opacity-80 font-bold">GisunBridge Maps Active</span>
        </div>
      </div>
    </div>
  );
};

export default GisunMaps;
