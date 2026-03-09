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
  RefreshCw,
  Sparkles,
  Zap,
  Star
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { Screen, Provider } from '../types';

export const ProfileScreen = ({ isAdmin, onNext }: { isAdmin: boolean, onNext: (s: Screen) => void }) => (
  <div className="min-h-screen bg-background-dark p-8 pb-40">
    <div className="flex items-center justify-between mb-12 mt-4">
      <div className="space-y-1">
        <div className="h-1 w-8 bg-primary rounded-full" />
        <h2 className="text-4xl font-black text-white italic tracking-tighter">MEU <span className="text-primary not-italic">PERFIL</span></h2>
      </div>
      <button 
        onClick={() => onNext('settings')}
        className="p-4 bg-white/5 rounded-3xl border border-white/10 text-white/40 active:scale-90 transition-transform"
      >
        <SettingsIcon size={24} />
      </button>
    </div>

    {/* Premium Profile Card */}
    <div className="relative group mb-12">
      <div className="absolute inset-0 bg-primary/10 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="relative bg-white/5 border border-white/10 p-8 rounded-[40px] flex flex-col items-center gap-6 backdrop-blur-xl">
        <div className="relative">
          <div className="w-28 h-28 rounded-[35px] bg-primary flex items-center justify-center border-4 border-background-dark shadow-2xl overflow-hidden group-hover:rotate-6 transition-transform">
            <span className="text-background-dark text-5xl font-black">D</span>
          </div>
          {isAdmin && (
            <div className="absolute -top-3 -right-3 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full border-2 border-background-dark shadow-xl animate-bounce">
              MESTRE DAVI
            </div>
          )}
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-black text-white tracking-tight">Davi Reis</h3>
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">davi.reis@uaitrampo.com</p>
        </div>
        
        <div className="flex gap-4 w-full pt-4">
          <div className="flex-1 bg-white/5 border border-white/10 p-4 rounded-3xl text-center">
            <p className="text-primary text-xl font-black">12</p>
            <p className="text-[10px] text-white/20 font-bold uppercase">TREMS</p>
          </div>
          <div className="flex-1 bg-white/5 border border-white/10 p-4 rounded-3xl text-center">
            <p className="text-primary text-xl font-black">4.9</p>
            <div className="flex justify-center"><Star className="text-primary fill-primary" size={10} /></div>
          </div>
        </div>
      </div>
    </div>

    {isAdmin && (
      <div className="mb-12 space-y-6">
        <div className="flex items-center gap-3 ml-2">
          <Zap className="text-primary" size={16} />
          <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em]">COMANDOS DO MESTRE</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => onNext('add-provider')}
            className="p-6 bg-primary/20 border-2 border-primary/30 rounded-[35px] flex flex-col items-start gap-4 hover:bg-primary transition-all group/btn active:scale-95"
          >
            <div className="p-3 bg-primary/20 rounded-2xl group-hover/btn:bg-white/20 transition-colors">
              <UserPlus className="text-primary group-hover/btn:text-background-dark" size={24} />
            </div>
            <span className="text-xs font-black text-primary group-hover:text-background-dark uppercase tracking-widest leading-tight">NOVO <br />PRESTADOR</span>
          </button>
          
          <button className="p-6 bg-white/5 border border-white/10 rounded-[35px] flex flex-col items-start gap-4 opacity-40 grayscale group hover:opacity-100 transition-all cursor-not-allowed">
            <div className="p-3 bg-white/5 rounded-2xl">
              <Users className="text-white/40 group-hover:text-white" size={24} />
            </div>
            <span className="text-xs font-black text-white/40 group-hover:text-white uppercase tracking-widest leading-tight">GESTÃO <br />USUÁRIOS</span>
          </button>
        </div>
      </div>
    )}

    <div className="space-y-4">
      <div className="flex items-center gap-3 ml-2">
        <Sparkles className="text-white/20" size={16} />
        <h3 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">NAVEGAÇÃO</h3>
      </div>
      
      <button 
        onClick={() => toast.info('Histórico de serviços')}
        className="w-full bg-white/5 border border-white/10 p-6 rounded-[35px] flex items-center justify-between group hover:bg-white/10 transition-all active:scale-95"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-primary transition-all group-hover:rotate-12">
            <MessageCircle className="text-white/40 group-hover:text-background-dark" size={20} />
          </div>
          <span className="text-white font-black text-[12px] uppercase tracking-widest">MEUS SERVIÇOS</span>
        </div>
        <ChevronRight size={20} className="text-white/20 group-hover:translate-x-2 transition-transform" />
      </button>

      <button 
        onClick={() => {
          toast.success('Até mais ver, sô! Volta logo pro trem!');
          setTimeout(() => window.location.reload(), 1500);
        }}
        className="w-full py-8 text-red-500 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-red-500/10 rounded-[35px] transition-all flex items-center justify-center gap-3 mt-8 border-2 border-red-500/10"
      >
        <LogOut size={20} />
        ARREDAR O PÉ (Sair)
      </button>
    </div>
  </div>
);

export const SettingsScreen = ({ onBack }: { onBack: () => void }) => (
  <div className="min-h-screen bg-background-dark p-8 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
    
    <div className="relative z-10">
      <div className="flex items-center gap-6 mt-4 mb-16">
        <button 
          onClick={onBack}
          className="p-4 bg-white/5 rounded-2xl border border-white/10 text-white/40 active:scale-90 transition-transform"
        >
          <ArrowRight className="rotate-180" size={24} strokeWidth={3} />
        </button>
        <h2 className="text-4xl font-black text-white italic tracking-tighter leading-none">AJUSTES <br /><span className="text-primary not-italic text-3xl">DO TREM</span></h2>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 ml-2">
            <Shield className="text-primary" size={16} />
            <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em]">SEGURANÇA</h3>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden backdrop-blur-xl">
            {[
              { icon: Bell, label: "Notificações", sub: "Alertas de novos serviços" },
              { icon: Shield, label: "Privacidade", sub: "Quem pode ver seus trens" }
            ].map((item, i, arr) => (
              <div 
                key={item.label}
                onClick={() => toast.info(item.label)} 
                className={`p-6 flex items-center justify-between hover:bg-white/5 cursor-pointer group transition-colors ${i !== arr.length - 1 ? 'border-b border-white/5' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-primary/20 transition-colors">
                    <item.icon className="text-white/40 group-hover:text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-black text-sm uppercase tracking-widest">{item.label}</p>
                    <p className="text-white/20 text-[10px] font-bold uppercase mt-0.5">{item.sub}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-white/20 group-hover:translate-x-2 transition-transform" />
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={() => toast.success('Chamando o pessoal do suporte!')}
          className="w-full bg-white text-background-dark font-black py-6 rounded-[35px] hover:bg-primary transition-all shadow-2xl shadow-white/5 flex items-center justify-center gap-3 group active:scale-95"
        >
          FALAR CO O SUPORTE
          <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
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
    toast.success('Imagem chique gerada!', { icon: '✨' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role) return toast.error('Preencha os campos tudo, sô!');
    onAdd({ name, role, img: img || `https://i.pravatar.cc/150?u=${name}` });
  };

  return (
    <div className="min-h-screen bg-background-dark p-8 relative overflow-hidden flex flex-col">
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[120px]" />
      
      <div className="relative z-10 flex flex-col flex-1">
        <div className="flex items-center gap-6 mt-4 mb-12">
          <button 
            onClick={onBack}
            className="p-4 bg-white/5 rounded-2xl border border-white/10 text-white/40 active:scale-90 transition-transform"
          >
            <ArrowRight className="rotate-180" size={24} strokeWidth={3} />
          </button>
          <h2 className="text-4xl font-black text-white italic tracking-tighter leading-none">NOVO <br /><span className="text-primary not-italic text-3xl">PRESTADOR</span></h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10 flex-1">
          <div className="flex flex-col items-center gap-6 group">
            <div className="relative">
              <div className="w-32 h-32 rounded-[40px] bg-white/5 border-4 border-dashed border-white/10 flex items-center justify-center overflow-hidden group-hover:border-primary transition-all">
                {img ? (
                  <img src={img} alt="Preview" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                ) : (
                  <Camera size={32} className="text-white/10 group-hover:text-primary transition-colors" />
                )}
              </div>
              <button 
                type="button"
                onClick={generateRandomAvatar}
                className="absolute -bottom-2 -right-2 bg-primary p-4 rounded-3xl shadow-2xl active:scale-90 transition-transform"
              >
                <RefreshCw size={20} className="text-background-dark font-bold" strokeWidth={3} />
              </button>
            </div>
            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">FOTO DO PROFISSIONAL</span>
          </div>

          <div className="space-y-10">
            {[
              { label: 'COMO O PROFISSIONAL CHAMA?', value: name, setter: setName, placeholder: 'Ex: Sebastião Silva' },
              { label: 'QUAL A ESPECIALIDADE?', value: role, setter: setRole, placeholder: 'Ex: Eletricista de Primeira' }
            ].map((f) => (
              <div key={f.label} className="space-y-4">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-1">{f.label}</label>
                <input 
                  type="text" 
                  value={f.value}
                  onChange={(e) => f.setter(e.target.value)}
                  placeholder={f.placeholder} 
                  className="w-full bg-transparent border-b-2 border-white/5 py-4 text-xl font-bold text-white outline-none focus:border-primary transition-all placeholder:text-white/10"
                  required
                />
              </div>
            ))}
          </div>

          <div className="pt-8 flex flex-col gap-4">
            <button 
              type="submit"
              className="w-full bg-primary text-background-dark py-6 rounded-[35px] font-black text-xl active:scale-95 shadow-22xl shadow-primary/30"
            >
              CADASTRAR PRESTADOR
            </button>
            <button type="button" onClick={onBack} className="w-full py-2 text-white/20 text-xs font-black uppercase tracking-widest hover:text-white transition-colors">CANCELAR OPERAÇÃO</button>
          </div>
        </form>
      </div>
    </div>
  );
};
