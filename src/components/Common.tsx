import React from 'react';
import { 
  ArrowRight, 
  Home, 
  Search, 
  User as UserIcon,
  Star
} from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../types';

export const Splash = () => (
  <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center p-8 overflow-hidden relative">
    <div className="z-10 flex flex-col items-center gap-6">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-24 h-24 bg-primary rounded-[40px] flex items-center justify-center shadow-2xl shadow-primary/40 rotate-12"
      >
        <ArrowRight className="text-background-dark -rotate-12" size={48} />
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white tracking-tighter">Uai<span className="text-primary">Trampo</span></h1>
        <p className="text-white/40 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">O TREM QUE RESOLVE</p>
      </motion.div>
    </div>
  </div>
);

export const Header = ({ onProfile }: { onProfile: () => void }) => (
  <div className="p-6 flex justify-between items-center bg-background-dark border-b border-white/5 sticky top-0 z-50">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
        <ArrowRight className="text-background-dark" size={24} />
      </div>
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-1">Uai<span className="text-primary font-black italic tracking-tighter">Trampo</span></h1>
        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-none">Minas Gerais, Uai!</p>
      </div>
    </div>
    <button 
      onClick={onProfile}
      className="p-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all active:scale-90"
    >
      <UserIcon className="text-white" size={20} />
    </button>
  </div>
);

export const BottomNav = ({ screen, setScreen }: { screen: Screen, setScreen: (s: Screen) => void }) => (
  <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-6 pointer-events-none z-50">
    <div className="bg-background-dark border border-white/10 p-2 rounded-[32px] flex justify-between items-center pointer-events-auto shadow-2xl shadow-black/50">
      <button 
        onClick={() => setScreen('home')}
        className={`flex-1 flex flex-col items-center py-3 rounded-2xl transition-all ${screen === 'home' ? 'bg-primary text-background-dark shadow-lg shadow-primary/20' : 'text-white/40 hover:text-white'}`}
      >
        <Home size={20} />
      </button>
      <button 
        onClick={() => setScreen('explore')}
        className={`flex-1 flex flex-col items-center py-3 rounded-2xl transition-all ${screen === 'explore' ? 'bg-primary text-background-dark shadow-lg shadow-primary/20' : 'text-white/40 hover:text-white'}`}
      >
        <Search size={20} />
      </button>
      <button 
        onClick={() => setScreen('profile')}
        className={`flex-1 flex flex-col items-center py-3 rounded-2xl transition-all ${screen === 'profile' ? 'bg-primary text-background-dark shadow-lg shadow-primary/20' : 'text-white/40 hover:text-white'}`}
      >
        <UserIcon size={20} />
      </button>
    </div>
  </div>
);

export const CategoryCard = ({ 
  icon, 
  label, 
  color, 
  onClick 
}: { 
  icon: React.ReactNode, 
  label: string, 
  color: string, 
  onClick: () => void 
}) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center gap-3 min-w-[100px] group"
  >
    <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
      {React.cloneElement(icon as React.ReactElement, { size: 28 })}
    </div>
    <span className="text-xs font-bold text-white/60 group-hover:text-white transition-colors">{label}</span>
  </button>
);
