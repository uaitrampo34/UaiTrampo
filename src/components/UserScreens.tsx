import React, { useState } from 'react';
import { 
  ArrowRight, 
  Settings as SettingsIcon, 
  MessageCircle, 
  ChevronRight, 
  LogOut, 
  Bell, 
  Lock, 
  Shield, 
  UserPlus, 
  Users, 
  History, 
  Database,
  Camera,
  RefreshCw
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { Screen, Provider } from '../types';

export const ProfileScreen = ({ isAdmin, onNext }: { isAdmin: boolean, onNext: (s: Screen) => void }) => (
  <div className="min-h-screen bg-background-dark p-6 pb-32">
    <div className="flex items-center justify-between mb-8 mt-4">
      <h2 className="text-4xl font-black text-white italic tracking-tighter leading-none">SEU <br /><span className="text-primary not-italic">PERFIL</span></h2>
      <div 
        onClick={() => onNext('settings')}
        className="p-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 cursor-pointer transition-all"
      >
        <SettingsIcon className="text-white/40" size={24} />
      </div>
    </div>

    <div className="bg-white/5 border border-white/10 p-6 rounded-[32px] mb-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all" />
      <div className="flex items-center gap-6 relative z-10">
        <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center border-4 border-white/10 shadow-2xl relative">
          <span className="text-background-dark text-4xl font-black italic">D</span>
          {isAdmin && (
            <div className="absolute -top-3 -right-3 bg-yellow-500 text-black text-[10px] font-black px-2 py-1 rounded-lg border-2 border-background-dark shadow-xl animate-bounce">
              DEV
            </div>
          )}
        </div>
        <div>
          <h3 className="text-2xl font-black text-white italic tracking-tighter">DAVI REIS</h3>
          <p className="text-white/40 font-bold uppercase text-xs tracking-widest mt-1">Nível Amador em Minas</p>
          <div className="flex gap-2 mt-3">
            <div className="px-2 py-1 bg-primary/10 rounded-lg border border-primary/20">
              <span className="text-[10px] font-black text-primary">12 TRAMPOS</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {isAdmin && (
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 p-6 bg-primary/5 border-2 border-primary/20 rounded-[32px] overflow-hidden relative"
      >
        <div className="absolute top-2 right-4 flex gap-1 opacity-20">
           <Database size={12} className="text-primary" />
           <Lock size={12} className="text-primary" />
        </div>
        <h3 className="text-primary font-black italic text-xl mb-4 flex items-center gap-2">
          CONTROLE DO SISTEMA (DEV)
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => onNext('add-provider')}
            className="p-4 bg-primary/10 border border-primary/20 rounded-2xl flex flex-col items-center gap-2 hover:bg-primary/20 transition-all group"
          >
            <UserPlus className="text-primary group-hover:scale-110 transition-transform" size={20} />
            <span className="text-[10px] font-black text-primary text-center leading-tight">CADASTRAR NOVO PRESTADOR</span>
          </button>
          <button className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center gap-2 hover:bg-white/10 transition-all group">
            <Users className="text-white/40 group-hover:scale-110 transition-transform" size={20} />
            <span className="text-[10px] font-black text-white/40 text-center leading-tight">GERENCIAR USUÁRIOS</span>
          </button>
          <button className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center gap-2 hover:bg-white/10 transition-all group lg:col-span-1">
            <History className="text-white/40 group-hover:scale-110 transition-transform" size={20} />
            <span className="text-[10px] font-black text-white/40 text-center leading-tight">VER LOGS DO SISTEMA</span>
          </button>
          <button className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center gap-2 hover:bg-white/10 transition-all group">
            <SettingsIcon className="text-white/40 group-hover:scale-110 transition-transform" size={20} />
            <span className="text-[10px] font-black text-white/40 text-center leading-tight">CONFIG. AVANÇADAS</span>
          </button>
        </div>
      </motion.div>
    )}

    <div className="space-y-4">
      <button 
        onClick={() => toast.info('Abrindo histórico de serviços...')}
        className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center justify-between hover:bg-white/10 transition-all group"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center">
            <MessageCircle className="text-orange-500" size={24} />
          </div>
          <div className="text-left">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Meus Serviços</h4>
            <p className="text-white/40 text-[10px] font-bold">Gerencie suas solicitações</p>
          </div>
        </div>
        <ChevronRight className="text-white/20 group-hover:translate-x-1 transition-transform" />
      </button>

      <button className="w-full bg-primary/10 border-2 border-primary/20 p-6 rounded-3xl flex items-center justify-between group hover:bg-primary/20 transition-all overflow-hidden relative">
        <div className="absolute right-[-10%] top-[-20%] opacity-10 rotate-12">
          <ArrowRight size={100} className="text-primary" />
        </div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
            <ArrowRight className="text-background-dark" size={24} />
          </div>
          <div className="text-left">
            <h4 className="font-black text-primary italic text-lg leading-tight uppercase tracking-tighter">TRABALHAR CÔ NÓIS, UAI!</h4>
            <p className="text-primary/60 text-[10px] font-black uppercase tracking-widest">Bora ganhar um dinheiro extra</p>
          </div>
        </div>
        <ChevronRight className="text-primary relative z-10 group-hover:translate-x-1 transition-transform" />
      </button>

      <button 
        onClick={() => {
          toast.success('Até mais ver, sô!');
          setTimeout(() => window.location.reload(), 1500);
        }}
        className="w-full flex items-center justify-center gap-2 py-8 text-red-500 font-black uppercase tracking-[0.2em] text-xs hover:bg-red-500/5 rounded-3xl transition-all"
      >
        <LogOut size={16} />
        Arredar o pé (Logout)
      </button>
    </div>
  </div>
);

export const SettingsScreen = ({ onBack }: { onBack: () => void }) => (
  <div className="min-h-screen bg-background-dark p-6">
    <div className="flex items-center gap-4 mb-12 mt-4">
      <button 
        onClick={onBack}
        className="p-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10"
      >
        <ArrowRight className="rotate-180 text-white/40" size={24} />
      </button>
      <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">AJUSTES</h2>
    </div>

    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-xs font-black text-white/20 uppercase tracking-[0.3em] ml-4">Conta e Segurança</h3>
        <div className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden">
          <div onClick={() => toast.info('Configurações de notificação')} className="p-6 flex items-center justify-between hover:bg-white/10 border-b border-white/5 cursor-pointer">
            <div className="flex items-center gap-4">
              <Bell className="text-primary" size={20} />
              <span className="text-white font-bold text-sm">Notificações</span>
            </div>
            <ChevronRight size={16} className="text-white/20" />
          </div>
          <div onClick={() => toast.info('Configurações de privacidade')} className="p-6 flex items-center justify-between hover:bg-white/10 cursor-pointer">
            <div className="flex items-center gap-4">
              <Shield className="text-primary" size={20} />
              <span className="text-white font-bold text-sm">Dados e Privacidade</span>
            </div>
            <ChevronRight size={16} className="text-white/20" />
          </div>
        </div>
      </div>

      <div className="pt-8">
        <button 
          onClick={() => toast.success('Chamando suporte técnico...')}
          className="w-full bg-white text-background-dark font-black py-6 rounded-3xl hover:bg-primary transition-all active:scale-95 shadow-xl"
        >
          Falar com o Suporte
        </button>
      </div>
    </div>
  </div>
);

export const AddProviderScreen = ({ 
  onBack, 
  onAdd 
}: { 
  onBack: () => void, 
  onAdd: (p: Omit<Provider, 'id' | 'reviews'>) => void 
}) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [img, setImg] = useState('');

  const generateRandomAvatar = () => {
    const randomId = Math.random().toString(36).substr(2, 9);
    setImg(`https://i.pravatar.cc/150?u=${randomId}`);
    toast.success('Novo avatar gerado!', { icon: '📸' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role) return toast.error('Preenche tudo aí, sô!');
    onAdd({ name, role, img: img || `https://i.pravatar.cc/150?u=${name}` });
  };

  return (
    <div className="min-h-screen bg-background-dark p-6">
      <div className="flex items-center gap-4 mb-12 mt-4">
        <button 
          onClick={onBack}
          className="p-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10"
        >
          <ArrowRight className="rotate-180 text-white/40" size={24} />
        </button>
        <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">CADASTRAR <br /><span className="text-primary not-italic">NOVO TREM</span></h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <div className="w-32 h-32 rounded-[40px] bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden group-hover:border-primary transition-all">
              {img ? (
                <img src={img} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <Camera size={32} className="text-white/20 group-hover:text-primary transition-colors" />
              )}
            </div>
            <button 
              type="button"
              onClick={generateRandomAvatar}
              className="absolute -bottom-2 -right-2 bg-primary p-3 rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all"
            >
              <RefreshCw size={20} className="text-background-dark" />
            </button>
          </div>
          <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mt-4">Foto do Prestador</span>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-4">Nome do Profissional</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Sebastião Silva" 
            className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white font-bold outline-none focus:border-primary transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-4">O que ele faz? (Cargo)</label>
          <input 
            type="text" 
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Ex: Eletricista de primeira" 
            className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white font-bold outline-none focus:border-primary transition-all"
            required
          />
        </div>

        <div className="pt-8 space-y-4">
          <button 
            type="submit"
            className="w-full bg-primary py-6 rounded-3xl font-black text-background-dark flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-primary/20"
          >
            CONFIRMAR CADASTRO
            <UserPlus size={24} />
          </button>
          <button type="button" onClick={onBack} className="w-full text-white/40 text-xs font-bold uppercase tracking-widest hover:text-white">Agora não, uai</button>
        </div>
      </form>
    </div>
  );
};
