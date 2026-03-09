import React, { useState } from 'react';
import { 
  ArrowRight, 
  Settings as SettingsIcon, 
  MessageCircle, 
  ChevronRight, 
  LogOut, 
  Bell, 
  Shield, 
  UserPlus, 
  Users, 
  History, 
  Camera,
  RefreshCw
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { Screen, Provider } from '../types';

export const ProfileScreen = ({ isAdmin, onNext }: { isAdmin: boolean, onNext: (s: Screen) => void }) => (
  <div className="min-h-screen bg-background-dark p-6 pb-32">
    <div className="flex items-center justify-between mb-8 mt-4">
      <h2 className="text-3xl font-bold text-white">Meu Perfil</h2>
      <button 
        onClick={() => onNext('settings')}
        className="p-2 bg-white/5 rounded-xl border border-white/10"
      >
        <SettingsIcon className="text-white/60" size={24} />
      </button>
    </div>

    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl mb-8 flex items-center gap-4">
      <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center relative">
        <span className="text-background-dark text-3xl font-bold">D</span>
        {isAdmin && (
          <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-background-dark shadow-lg">
            ADMIN
          </div>
        )}
      </div>
      <div>
        <h3 className="text-xl font-bold text-white leading-tight">Davi Reis</h3>
        <p className="text-white/40 text-sm mt-0.5">davi.reis@uaitrampo.com</p>
      </div>
    </div>

    {isAdmin && (
      <div className="mb-8 space-y-3">
        <h3 className="text-xs font-bold text-white/20 uppercase tracking-widest ml-1">Painel Administrativo</h3>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => onNext('add-provider')}
            className="p-4 bg-primary/10 border border-primary/20 rounded-2xl flex flex-col items-start gap-2 hover:bg-primary/20 transition-all"
          >
            <UserPlus className="text-primary" size={20} />
            <span className="text-xs font-bold text-primary">Novo Prestador</span>
          </button>
          <button className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-start gap-2 opacity-50">
            <Users className="text-white/40" size={20} />
            <span className="text-xs font-bold text-white/40">Usuários</span>
          </button>
          <button className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-start gap-2 opacity-50">
            <History className="text-white/40" size={20} />
            <span className="text-xs font-bold text-white/40">Logs</span>
          </button>
          <button className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-start gap-2 opacity-50">
            <SettingsIcon className="text-white/40" size={20} />
            <span className="text-xs font-bold text-white/40">Configurações</span>
          </button>
        </div>
      </div>
    )}

    <div className="space-y-3">
      <h3 className="text-xs font-bold text-white/20 uppercase tracking-widest ml-1">Geral</h3>
      <button 
        onClick={() => toast.info('Histórico de serviços')}
        className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between group"
      >
        <div className="flex items-center gap-4">
          <MessageCircle className="text-white/40" size={20} />
          <span className="text-white font-bold text-sm">Meus Serviços</span>
        </div>
        <ChevronRight size={18} className="text-white/20 group-hover:translate-x-1 transition-transform" />
      </button>

      <button className="w-full bg-primary/10 border border-primary/20 p-4 rounded-2xl flex items-center justify-between group">
        <div className="flex items-center gap-4">
          <ArrowRight className="text-primary" size={20} />
          <span className="text-primary font-bold text-sm">Trabalhar cô nóis!</span>
        </div>
        <ChevronRight size={18} className="text-primary group-hover:translate-x-1 transition-transform" />
      </button>

      <button 
        onClick={() => {
          toast.success('Até mais ver, sô!');
          setTimeout(() => window.location.reload(), 1500);
        }}
        className="w-full flex items-center justify-center gap-2 py-6 text-red-500 font-bold text-sm hover:bg-red-500/5 rounded-2xl transition-all mt-4"
      >
        <LogOut size={18} />
        Arredar o pé (Sair)
      </button>
    </div>
  </div>
);

export const SettingsScreen = ({ onBack }: { onBack: () => void }) => (
  <div className="min-h-screen bg-background-dark p-6">
    <div className="flex items-center gap-4 mb-12 mt-4">
      <button 
        onClick={onBack}
        className="p-2 bg-white/5 rounded-xl border border-white/10"
      >
        <ArrowRight className="rotate-180 text-white/40" size={24} />
      </button>
      <h2 className="text-2xl font-bold text-white">Configurações</h2>
    </div>

    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-white/20 uppercase tracking-widest ml-1">Segurança</h3>
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden text-sm">
          <div onClick={() => toast.info('Notificações')} className="p-4 flex items-center justify-between hover:bg-white/10 border-b border-white/5 cursor-pointer">
            <div className="flex items-center gap-3">
              <Bell className="text-white/40" size={18} />
              <span className="text-white font-medium">Notificações</span>
            </div>
            <ChevronRight size={14} className="text-white/20" />
          </div>
          <div onClick={() => toast.info('Privacidade')} className="p-4 flex items-center justify-between hover:bg-white/10 cursor-pointer">
            <div className="flex items-center gap-3">
              <Shield className="text-white/40" size={18} />
              <span className="text-white font-medium">Privacidade</span>
            </div>
            <ChevronRight size={14} className="text-white/20" />
          </div>
        </div>
      </div>

      <button 
        onClick={() => toast.success('Chamando suporte...')}
        className="w-full bg-white text-background-dark font-bold py-4 rounded-2xl hover:bg-primary transition-all"
      >
        Falar com o Suporte
      </button>
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
    toast.success('Imagem gerada!');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role) return toast.error('Preencha os campos!');
    onAdd({ name, role, img: img || `https://i.pravatar.cc/150?u=${name}` });
  };

  return (
    <div className="min-h-screen bg-background-dark p-6">
      <div className="flex items-center gap-4 mb-12 mt-4">
        <button 
          onClick={onBack}
          className="p-2 bg-white/5 rounded-xl border border-white/10"
        >
          <ArrowRight className="rotate-180 text-white/40" size={24} />
        </button>
        <h2 className="text-2xl font-bold text-white">Novo Prestador</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden">
              {img ? (
                <img src={img} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <Camera size={24} className="text-white/20" />
              )}
            </div>
            <button 
              type="button"
              onClick={generateRandomAvatar}
              className="absolute -bottom-1 -right-1 bg-primary p-2 rounded-xl shadow-lg"
            >
              <RefreshCw size={16} className="text-background-dark" />
            </button>
          </div>
          <span className="text-[10px] font-bold text-white/40 uppercase">Foto do Profissional</span>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-white/40 uppercase ml-1">Nome</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Sebastião Silva" 
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-primary transition-all"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-white/40 uppercase ml-1">Especialidade</label>
            <input 
              type="text" 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Ex: Eletricista" 
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-primary transition-all"
              required
            />
          </div>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <button 
            type="submit"
            className="w-full bg-primary py-4 rounded-2xl font-bold text-background-dark shadow-lg"
          >
            Confirmar Cadastro
          </button>
          <button type="button" onClick={onBack} className="w-full text-white/40 text-xs font-bold uppercase py-2">Cancelar</button>
        </div>
      </form>
    </div>
  );
};
