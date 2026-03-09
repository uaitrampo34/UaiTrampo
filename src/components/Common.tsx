import React from 'react';
import { 
  Zap, 
  Menu, 
  User as UserIcon 
} from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../types';

export const Splash = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="min-h-screen flex items-center justify-center bg-background-dark"
  >
    <div className="flex flex-col items-center gap-4">
      <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center rotate-12 shadow-2xl shadow-primary/20">
        <Zap size={48} className="text-background-dark -rotate-12 fill-background-dark" />
      </div>
      <h1 className="text-4xl font-black text-white italic tracking-tighter">UAITRAMPO</h1>
      <div className="flex gap-2">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
      </div>
    </div>
  </motion.div>
);

export const Header = ({ onProfile }: { onProfile: () => void }) => (
  <header className="p-6 flex items-center justify-between sticky top-0 bg-background-dark/80 backdrop-blur-xl z-50 border-b border-white/5">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-primary/10 rounded-xl cursor-pointer hover:bg-primary/20 transition-all border border-primary/20 active:scale-95 group">
        <Menu size={20} className="text-primary group-hover:rotate-180 transition-transform duration-500" />
      </div>
      <h1 className="text-xl font-black text-white tracking-tighter italic">UAITRAMPO</h1>
    </div>
    <div 
      onClick={onProfile}
      className="p-2 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-all border border-white/10 active:scale-95 group"
    >
      <UserIcon size={20} className="text-white group-hover:scale-110 transition-transform" />
    </div>
  </header>
);

export const BottomNav = ({ screen, setScreen }: { screen: Screen, setScreen: (s: Screen) => void }) => {
  const navItems = [
    { id: 'home', icon: 'Home', label: 'Início' },
    { id: 'explore', icon: 'Search', label: 'Explorar' },
    { id: 'profile', icon: 'User', label: 'Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 p-4 bg-background-dark/80 backdrop-blur-xl border-t border-white/5 z-50">
      <div className="max-w-md mx-auto flex items-center justify-around relative">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setScreen(item.id as Screen)}
            className={`flex flex-col items-center gap-1 transition-all ${
              screen === item.id ? 'text-primary' : 'text-white/40 hover:text-white/60'
            }`}
          >
            <div className={`p-2 rounded-xl transition-all ${screen === item.id ? 'bg-primary/10 scale-110 shadow-lg shadow-primary/5' : ''}`}>
              {item.id === 'home' && <Zap size={24} className={screen === 'home' ? 'fill-primary' : ''} />}
              {item.id === 'explore' && <div className="p-0.5 border-2 border-current rounded-lg"><div className="w-4 h-4 rounded-full border-2 border-current" /></div>}
              {item.id === 'profile' && <UserIcon size={24} />}
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

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
    className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all active:scale-95 group"
  >
    <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform`}>
      {icon}
    </div>
    <span className="text-xs font-bold text-white uppercase tracking-wider">{label}</span>
  </button>
);
