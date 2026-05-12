/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { intelData, Report } from './data';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Database, 
  Cpu, 
  ShieldAlert, 
  Settings, 
  Radio, 
  Lock, 
  X,
  Volume2
} from 'lucide-react';

const TECH_FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1510511459019-5efa3702468d?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600"
];

const getFallbackImage = (id: number) => TECH_FALLBACK_IMAGES[id % TECH_FALLBACK_IMAGES.length];

// Robust Intel Image component handles missing root images gracefully
const IntelImage = ({ src, id, alt, className }: { src: string; id: number; alt: string; className?: string }) => {
  const [error, setError] = useState(false);
  const path = src.startsWith('/') ? src : `/${src}`;
  
  return (
    <img 
      src={error ? getFallbackImage(id) : path} 
      alt={alt} 
      className={`object-cover ${className}`}
      onError={() => setError(true)}
    />
  );
};

export default function App() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  return (
    <div className="flex h-screen w-full bg-dark overflow-hidden font-sans selection:bg-cyan/30 selection:text-cyan">
      
      {/* Sidebar Navigation */}
      <aside className="w-16 md:w-64 bg-obsidian border-r border-cyan/20 flex flex-col justify-between z-10 hidden sm:flex shrink-0">
        <div>
          <div className="p-6 border-b border-cyan/20 flex items-center md:gap-3">
            <Radio className="text-cyan w-6 h-6 animate-pulse" />
            <span className="hidden md:block font-black text-cyan tracking-[0.2em] font-mono whitespace-nowrap overflow-hidden">AI SCOUT</span>
          </div>
          <nav className="p-4 space-y-2">
            <NavItem icon={<Terminal size={18} />} label="TERMINAL" active />
            <NavItem icon={<Database size={18} />} label="ARCHIVE" />
            <NavItem icon={<Cpu size={18} />} label="SYSTEMS" />
            <NavItem icon={<ShieldAlert size={18} />} label="THREAT INTEL" />
          </nav>
        </div>
        <div className="p-6 border-t border-cyan/10">
          <NavItem icon={<Settings size={18} />} label="SETTINGS" />
          <div className="hidden md:flex mt-4 items-center gap-2 text-xs font-mono text-zinc-500">
            <Lock size={12} className="text-gold" />
            <span className="text-gold">ENC: 2048-RSA</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative bg-dark">
        
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-dark/80 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cyan shadow-[0_0_8px_theme(colors.cyan)] animate-pulse"></div>
            <span className="text-xs font-mono tracking-widest text-zinc-400">NETWORK: SECURE</span>
          </div>
          <div className="text-xs font-mono tracking-widest text-zinc-500">
            {new Date().toISOString().split('T')[0].replace(/-/g, '.')} // INTEL_SYNC
          </div>
        </header>

        <div className="p-6 md:p-10 pb-24 max-w-7xl mx-auto">
          
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 relative overflow-hidden rounded-xl border border-cyan/30 bg-panel group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-obsidian to-transparent z-10 pointer-events-none"></div>
            <div className="flex flex-col md:flex-row min-h-[300px]">
              <div className="z-20 p-8 md:p-12 flex flex-col justify-center w-full md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2 uppercase">
                  {intelData.hero.title}
                </h1>
                <p className="text-cyan font-mono text-sm uppercase tracking-widest mb-6 border-l-2 border-gold pl-3">
                  {intelData.hero.subtitle}
                </p>
                <div className="mt-auto pt-8 flex gap-4">
                  <button className="bg-cyan/10 hover:bg-cyan/20 border border-cyan text-cyan px-6 py-2.5 rounded font-mono text-xs tracking-widest transition-all duration-300">
                    GLOBAL SCAN
                  </button>
                  <button className="bg-transparent border border-white/20 hover:border-gold text-white hover:text-gold px-6 py-2.5 rounded font-mono text-xs tracking-widest transition-all duration-300">
                    DECRYPT LOGS
                  </button>
                </div>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-full md:w-2/3 h-full opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                <IntelImage 
                  id={0} 
                  src={intelData.hero.image} 
                  alt="Hero Intel" 
                  className="w-full h-full"
                />
                <div className="absolute inset-0 mask-image-gradient bg-gradient-to-l from-transparent to-panel"></div>
              </div>
            </div>
          </motion.div>

          {/* Section Title */}
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold tracking-widest text-zinc-100 uppercase">Sovereign Intelligence Feed</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan/50 to-transparent"></div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {intelData.reports.map((report, idx) => (
              <motion.div 
                key={report.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.04 }}
                className="bg-panel border border-white/5 hover:border-cyan/50 rounded-lg overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,255,242,0.1)] flex flex-col"
                onClick={() => setSelectedReport(report)}
              >
                <div className="h-40 relative overflow-hidden bg-obsidian">
                  <IntelImage 
                    id={report.id} 
                    src={report.image} 
                    alt={report.title} 
                    className="w-full h-full transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-panel to-transparent"></div>
                  <div className="absolute top-3 right-3 bg-dark/80 backdrop-blur text-gold font-mono text-[10px] px-2 py-1 rounded border border-gold/30">
                    ID: {report.id.toString().padStart(3, '0')}
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-semibold text-cyan mb-2 leading-tight group-hover:text-cyan/80 transition-colors">{report.title}</h3>
                  <p className="text-zinc-400 text-sm mb-6 flex-1 line-clamp-2">{report.description}</p>
                  
                  <div className="mt-auto w-full group-hover:bg-cyan group-hover:text-dark border border-cyan/30 text-cyan py-2 rounded font-mono text-xs font-bold tracking-wider text-center transition-all duration-300">
                    ACCESS DATA
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
        
        {/* Footer */}
        <footer className="border-t border-white/10 bg-obsidian p-8 text-center mt-auto">
          <p className="text-zinc-500 font-mono text-xs tracking-widest mb-2">
            &copy; 2026 <span className="text-gold font-bold">AI SCOUT</span> | THE INFINITE DIGITAL FACTORY
          </p>
          <p className="text-zinc-600 font-mono text-[10px] tracking-[0.2em]">MODEL-AGNOSTIC STRATEGY // DATA SOVEREIGNTY</p>
        </footer>
      </main>

      {/* Detail Modal Overlay */}
      <AnimatePresence>
        {selectedReport && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-dark/95 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#111111] border border-cyan/40 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl shadow-[0_0_50px_rgba(0,255,242,0.15)] flex flex-col"
            >
              <div className="sticky top-0 bg-[#111111]/90 backdrop-blur px-6 py-4 border-b border-white/10 flex justify-between items-center z-10">
                <div className="flex items-center gap-3">
                  <div className="bg-cyan/20 p-2 rounded">
                    <Database size={18} className="text-cyan" />
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-white tracking-wide">{selectedReport.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedReport(null)}
                  className="text-zinc-500 hover:text-cyan p-2 rounded-full hover:bg-white/5 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 md:p-8">
                <div className="rounded-lg overflow-hidden border border-white/5 mb-8 h-64 md:h-80 relative">
                    <IntelImage 
                      id={selectedReport.id} 
                      src={selectedReport.image} 
                      alt={selectedReport.title} 
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] pointer-events-none"></div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <h3 className="text-gold font-mono text-xs tracking-widest mb-3 border-b border-gold/20 pb-2">INTELLIGENCE BRIEFING</h3>
                    <p className="text-zinc-300 leading-relaxed text-sm md:text-base">
                      {selectedReport.description}
                    </p>
                    <p className="text-zinc-500 mt-4 text-sm">
                      Further decryption required for extended analysis. Proceed with standard clearance protocols.
                    </p>
                  </div>
                  
                  <div className="w-full md:w-64 bg-dark border border-white/10 p-5 rounded flex flex-col">
                    <div className="flex items-center gap-2 mb-4 text-cyan">
                      <Volume2 size={16} />
                      <span className="font-mono text-xs tracking-widest">AUDIO TRANSMISSION</span>
                    </div>
                    
                    <div className="bg-obsidian border border-white/5 rounded p-3 mb-4 flex items-center justify-center h-16 relative overflow-hidden">
                      {/* Faux generic audio wave visualization */}
                      <div className="flex items-center gap-1 w-full justify-between opacity-50 px-2">
                        {[1, 2, 3, 4, 1, 5, 2, 6, 2, 1, 4, 2].map((v, i) => (
                           <div key={i} className="bg-cyan w-1 rounded-full animate-pulse" style={{ height: `${v * 4}px`, animationDelay: `${i * 0.1}s` }}></div>
                        ))}
                      </div>
                    </div>
                    
                    <audio controls className="w-full h-8 flex-1 mt-auto filter invert pt-1 opacity-80 hover:opacity-100 transition-opacity">
                      <source src={selectedReport.link || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Side Navigation Item Component
const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 group ${active ? 'bg-cyan/10 text-cyan border border-cyan/20' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'}`}>
    <span className={`${active ? 'text-cyan' : 'text-zinc-500 group-hover:text-cyan transition-colors'}`}>
      {icon}
    </span>
    <span className="hidden md:block font-mono text-xs font-bold tracking-widest">{label}</span>
  </a>
);
