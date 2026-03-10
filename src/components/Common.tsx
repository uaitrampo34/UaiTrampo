import React from 'react';
import {
  Hammer,
  Home,
  Search,
  User as UserIcon,
  Star,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../types';

export const Splash = () => (
  <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center p-8 overflow-hidden relative">
    {/* High-energy background effects */}
    <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/30 rounded-full blur-[150px] animate-pulse" />
    <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[130px] animate-pulse delay-1000" />

    <div className="z-10 flex flex-col items-center gap-8">
      <motion.div
        initial={{ rotate: -180, scale: 0, opacity: 0 }}
        animate={{ rotate: 12, scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-primary blur-3xl opacity-50 animate-pulse" />
        <div className="w-28 h-28 bg-primary rounded-[40px] flex items-center justify-center shadow-2xl shadow-primary/40 relative z-10 border-4 border-white/20 overflow-hidden">
          <Zap className="text-background-dark scale-[1.4]" size={56} fill="currentColor" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Hammer className="text-white/90 -rotate-12 translate-y-1" size={32} strokeWidth={2.5} />
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 30, opacity: 0.5 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <h1 className="text-6xl font-black text-white italic tracking-tighter leading-none">Uai<br /><span className="text-primary not-italic">Trampo</span></h1>
        <div className="h-1 w-20 bg-primary mx-auto mt-6 rounded-full" />
        <p className="text-white/40 font-bold uppercase text-[12px] tracking-[0.5em] mt-6">O TREM QUE RESOLVE</p>
      </motion.div>
    </div>
  </div>
);

export const Header = ({ onProfile }: { onProfile: () => void }) => (
  <header className="p-6 flex justify-between items-center sticky top-0 z-50 bg-background-dark/80 backdrop-blur-xl border-b border-white/5">
    <div className="flex items-center gap-3 group">
      <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform relative overflow-hidden">
        <Zap className="text-background-dark scale-125" size={24} fill="currentColor" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Hammer className="text-white/90 -rotate-12 translate-y-0.5" size={14} strokeWidth={3} />
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-black text-white italic tracking-tighter leading-none">Uai<span className="text-primary not-italic">Trampo</span></h1>
        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">Minas Gerais, Uai!</p>
      </div>
    </div>
    <button
      onClick={onProfile}
      className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all active:scale-95 group"
    >
      <UserIcon className="text-white group-hover:text-primary transition-colors" size={24} />
    </button>
  </header>
);

export const BottomNav = ({ screen, setScreen }: { screen: Screen, setScreen: (s: Screen) => void }) => (
  <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-8 pointer-events-none z-50">
    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-3 rounded-[32px] flex justify-between items-center pointer-events-auto shadow-2xl shadow-black/80">
      <button
        onClick={() => setScreen('home')}
        className={`flex-1 flex flex-col items-center py-4 rounded-2xl transition-all ${screen === 'home' ? 'bg-primary text-background-dark shadow-xl shadow-primary/30 scale-105 font-bold' : 'text-white/40 hover:text-white'}`}
      >
        <Home size={22} fill={screen === 'home' ? 'currentColor' : 'none'} />
      </button>
      <button
        onClick={() => setScreen('explore')}
        className={`flex-1 flex flex-col items-center py-4 rounded-2xl transition-all ${screen === 'explore' ? 'bg-primary text-background-dark shadow-xl shadow-primary/30 scale-105 font-bold' : 'text-white/40 hover:text-white'}`}
      >
        <Search size={22} strokeWidth={screen === 'explore' ? 3 : 2} />
      </button>
      <button
        onClick={() => setScreen('profile')}
        className={`flex-1 flex flex-col items-center py-4 rounded-2xl transition-all ${screen === 'profile' ? 'bg-primary text-background-dark shadow-xl shadow-primary/30 scale-105 font-bold' : 'text-white/40 hover:text-white'}`}
      >
        <UserIcon size={22} fill={screen === 'profile' ? 'currentColor' : 'none'} />
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
  color?: string,
  onClick: () => void
}) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-4 group min-w-[120px]"
  >
    <div className={`w-20 h-20 rounded-[30px] flex items-center justify-center text-white shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 bg-white/5 border border-white/10 group-hover:bg-primary group-hover:text-background-dark group-hover:border-primary`}>
      {React.cloneElement(icon as React.ReactElement, { size: 32, strokeWidth: 2.5 })}
    </div>
    <span className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">{label}</span>
  </button>
);
