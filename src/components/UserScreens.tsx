import React, { useState, useEffect } from 'react';
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
  Download,
  Star,
  Trash2,
  MapPin,
  User
} from 'lucide-react';
import { CATEGORIES } from './Common';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { Screen, Provider } from '../types';
import { supabase } from '../supabaseClient';

export const ProfileScreen = ({ isAdmin, isVisitor, onNext, providersCount }: { isAdmin: boolean, isVisitor: boolean, onNext: (s: Screen) => void, providersCount: number }) => {
  const [user, setUser] = useState<any>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (!isVisitor) {
      supabase.auth.getUser().then(({ data: { user } }) => {
        setUser(user);
      });
    }

    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, [isVisitor]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const displayName = isVisitor ? 'Visitante UaiTrampo' : (isAdmin ? 'MESTRE DEV' : (user?.user_metadata?.full_name || 'Usuário'));
  const displayEmail = isVisitor ? 'ACESSO VISITANTE' : (user?.email || (isAdmin ? 'admin@uaitrampo.com' : 'usuario@uaitrampo.com'));

  return (
    <div className="min-h-screen bg-background-dark p-8 pb-40">
      <div className="flex items-center justify-between mb-12 mt-4">
        <div className="space-y-1">
          <div className="h-1 w-8 bg-primary rounded-full" />
          <h2 className="text-4xl font-black text-white italic tracking-tighter">MEU <span className="text-primary not-italic">PERFIL</span></h2>
        </div>
        {!isVisitor && (
          <button
            onClick={() => onNext('settings')}
            className="p-4 bg-white/5 rounded-3xl border border-white/10 text-white/40 active:scale-90 transition-transform"
          >
            <SettingsIcon size={24} />
          </button>
        )}
      </div>

      {/* Premium Profile Card */}
      <div className="relative group mb-12">
        <div className="absolute inset-0 bg-primary/10 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="relative bg-white/5 border border-white/10 p-8 rounded-[40px] flex flex-col items-center gap-6 backdrop-blur-xl">
          <div className="relative">
            <div className="w-28 h-28 rounded-[35px] bg-primary flex items-center justify-center border-4 border-background-dark shadow-2xl overflow-hidden group-hover:rotate-6 transition-transform">
              <span className="text-background-dark text-4xl font-black">{isAdmin ? 'DEV' : (displayName[0] || 'V')}</span>
            </div>
            {isAdmin && (
              <div className="absolute -top-3 -right-3 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full border-2 border-background-dark shadow-xl animate-bounce">
                MESTRE DEV
              </div>
            )}
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-black text-white tracking-tight">{displayName}</h3>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">{displayEmail}</p>
          </div>

          {isAdmin && (
            <div className="flex gap-4 w-full pt-4">
              <div className="flex-1 bg-white/5 border border-white/10 p-6 rounded-3xl text-center">
                <p className="text-primary text-2xl font-black">{providersCount}</p>
                <p className="text-[10px] text-white/20 font-bold uppercase text-center leading-none tracking-widest mt-1">TREMS CADASTRADOS</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {isVisitor ? (
        <div className="space-y-4 mb-12">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-primary text-background-dark py-6 rounded-[30px] font-black text-xl active:scale-95 shadow-2xl shadow-primary/30"
          >
            ENTRAR NA MINHA CONTA
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-white/5 border border-white/10 py-6 rounded-[30px] font-black text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            CRIAR UMA CONTA AGORA
          </button>
        </div>
      ) : !isAdmin && (
        <button
          onClick={() => onNext('edit-profile')}
          className="w-full bg-white/5 border border-white/10 py-6 rounded-[30px] font-black text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 active:scale-95 mb-12"
        >
          EDITAR MEU PERFIL
        </button>
      )}

      {isAdmin && (
        <div className="mb-12 space-y-6">
          <div className="flex items-center gap-3 ml-2">
            <Zap className="text-primary" size={16} />
            <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em]">COMANDOS DO MESTRE</h3>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => onNext('add-provider')}
              className="w-full p-6 bg-primary/20 border-2 border-primary/30 rounded-[35px] flex items-center gap-6 hover:bg-primary transition-all group/btn active:scale-95"
            >
              <div className="p-4 bg-primary/20 rounded-2xl group-hover/btn:bg-white/20 transition-colors">
                <UserPlus className="text-primary group-hover/btn:text-background-dark" size={32} />
              </div>
              <div className="text-left">
                <span className="text-lg font-black text-primary group-hover:text-background-dark uppercase tracking-widest leading-none block">NOVO PRESTADOR</span>
                <span className="text-[10px] text-primary/40 font-bold uppercase tracking-[0.2em] group-hover:text-background-dark/50">CADASTRAR NOVO TRAMPO</span>
              </div>
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center gap-3 ml-2">
          <Sparkles className="text-white/20" size={16} />
          <h3 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">NAVEGAÇÃO</h3>
        </div>


        {!isVisitor && !isInstalled && deferredPrompt && (
          <button
            onClick={handleInstall}
            className="w-full bg-primary/20 border-2 border-primary/30 p-6 rounded-[35px] flex items-center justify-between group hover:bg-primary transition-all active:scale-95"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/20 rounded-2xl group-hover:bg-white/20 transition-all">
                <Download className="text-primary group-hover:text-background-dark" size={20} />
              </div>
              <div className="text-left">
                <span className="text-primary font-black text-[12px] uppercase tracking-widest group-hover:text-background-dark block">INSTALAR APP</span>
                <span className="text-[8px] text-primary/40 font-bold uppercase tracking-[0.2em] group-hover:text-background-dark/50">TER ACESSO RÁPIDO</span>
              </div>
            </div>
            <ChevronRight size={20} className="text-primary/20 group-hover:text-background-dark/40 group-hover:translate-x-2 transition-transform" />
          </button>
        )}

        <button
          onClick={async () => {
            if (isVisitor) {
              window.location.reload();
              return;
            }
            await supabase.auth.signOut();
            toast.success('Até mais ver, sô! Volta logo pro trem!');
            setTimeout(() => window.location.reload(), 1500);
          }}
          className="w-full py-6 text-red-500 font-black text-[12px] uppercase tracking-[0.3em] hover:bg-red-500/10 rounded-[35px] transition-all flex items-center justify-center gap-3 mt-8 border-2 border-red-500/10 active:scale-95"
        >
          <LogOut size={18} />
          {isVisitor ? 'VOLTAR AO LOGIN' : 'SAIR DA CONTA'}
        </button>
      </div>
    </div>
  );
};

export const EditUserProfileScreen = ({
  onBack,
  onUpdate
}: {
  onBack: () => void,
  onUpdate: (data: { name?: string, phone?: string, address?: string }) => void
}) => {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
        setName(user.user_metadata?.full_name || '');
        setPhone(user.user_metadata?.phone || '');
        setAddress(user.user_metadata?.address || '');
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: name,
        phone,
        address
      }
    });

    setLoading(false);
    if (error) {
      toast.error('Erro ao salvar seus dados, sô!', { description: error.message });
      return;
    }

    toast.success('Perfil atualizado com sucesso! Chique demais.');
    onUpdate({ name, phone, address });
  };

  return (
    <div className="min-h-screen bg-background-dark p-8 relative overflow-hidden flex flex-col">
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[120px]" />

      <div className="relative z-10 flex flex-col flex-1 pb-10">
        <div className="flex items-center gap-6 mt-4 mb-12">
          <button onClick={onBack} className="p-4 bg-white/5 rounded-2xl border border-white/10 text-white/40 active:scale-90 transition-transform">
            <ArrowRight className="rotate-180" size={24} strokeWidth={3} />
          </button>
          <h2 className="text-4xl font-black text-white italic tracking-tighter leading-none">EDITAR MEU <br /><span className="text-primary not-italic text-3xl">PERFIL</span></h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12 flex-1">
          <div className="space-y-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-1">COMO OCÊ CHAMA?</label>
              <div className="relative group">
                <User className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={24} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full bg-transparent border-b-2 border-white/5 py-4 pl-10 text-xl font-bold text-white outline-none focus:border-primary transition-all placeholder:text-white/10"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-1">INSTAGRAM OU ZAP (OPCIONAL)</label>
              <div className="relative group">
                <MessageCircle className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={24} />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Seu contato"
                  className="w-full bg-transparent border-b-2 border-white/5 py-4 pl-10 text-xl font-bold text-white outline-none focus:border-primary transition-all placeholder:text-white/10"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-1">SEU ENDEREÇO (OPCIONAL)</label>
              <div className="relative group">
                <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={24} />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Para sabermos de onde ocê é"
                  className="w-full bg-transparent border-b-2 border-white/5 py-4 pl-10 text-xl font-bold text-white outline-none focus:border-primary transition-all placeholder:text-white/10"
                />
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col gap-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-background-dark py-6 rounded-[35px] font-black text-xl active:scale-95 shadow-2xl shadow-primary/30 disabled:opacity-50"
            >
              {loading ? 'SALVANDO TREM...' : 'SALVAR ALTERAÇÕES'}
            </button>
            <button type="button" onClick={onBack} className="w-full py-2 text-white/20 text-xs font-black uppercase tracking-widest hover:text-white transition-colors">VOLTAR</button>
          </div>
        </form>
      </div>
    </div>
  );
};

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
  onAdd,
  providerToEdit
}: {
  onBack: () => void,
  onAdd: (p: Omit<Provider, 'id' | 'reviews'>) => void,
  providerToEdit: Provider | null
}) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [portfolio, setPortfolio] = useState<string[]>([]);
  const [phone, setPhone] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (providerToEdit) {
      setName(providerToEdit.name);
      setRole(providerToEdit.role);
      setPhone(providerToEdit.phone || '');
      setAddress(providerToEdit.address || '');
      setProfileImg(providerToEdit.profile_img);
      setPortfolio(providerToEdit.portfolio);
      setCategories(providerToEdit.categories || []);
    }
  }, [providerToEdit]);

  const processImage = (base64Str: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX_DIM = 1200;
        if (width > height) {
          if (width > MAX_DIM) {
            height *= MAX_DIM / width;
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width *= MAX_DIM / height;
            height = MAX_DIM;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, isProfile: boolean, index?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return toast.error('Foto muito pesada! Escolha uma menor, sô.');

    const reader = new FileReader();
    reader.onload = async (event) => {
      const compressed = await processImage(event.target?.result as string);
      if (isProfile) setProfileImg(compressed);
      else if (typeof index === 'number') {
        const newPortfolio = [...portfolio];
        newPortfolio[index] = compressed;
        setPortfolio(newPortfolio);
      }
    };
    reader.readAsDataURL(file);
  };

  const generateRandomAvatar = async (isProfile: boolean, index?: number) => {
    const randomId = Math.random().toString(36).substr(2, 9);
    const url = `https://i.pravatar.cc/300?u=${randomId}`;
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = async (e) => {
        const compressed = await processImage(e.target?.result as string);
        if (isProfile) setProfileImg(compressed);
        else if (typeof index === 'number') {
          const newPortfolio = [...portfolio];
          newPortfolio[index] = compressed;
          setPortfolio(newPortfolio);
        }
      };
      reader.readAsDataURL(blob);
      toast.success('Imagem chique gerada!', { icon: '✨' });
    } catch (err) {
      toast.error('Erro ao buscar imagem aleatória.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role) return toast.error('Preencha os campos tudo, sô!');
    if (categories.length === 0) return toast.error('Escolha pelo menos uma categoria pro trem, uai!');
    if (!profileImg) return toast.error('Coloca uma foto de perfil pelo menos, uai!');
    onAdd({
      name,
      role,
      phone,
      categories,
      address,
      profile_img: profileImg,
      portfolio: portfolio.filter(img => !!img)
    });
  };

  return (
    <div className="min-h-screen bg-background-dark p-8 relative overflow-hidden flex flex-col">
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[120px]" />

      <div className="relative z-10 flex flex-col flex-1 pb-10">
        <div className="flex items-center gap-6 mt-4 mb-12">
          <button onClick={onBack} className="p-4 bg-white/5 rounded-2xl border border-white/10 text-white/40 active:scale-90 transition-transform">
            <ArrowRight className="rotate-180" size={24} strokeWidth={3} />
          </button>
          <h2 className="text-4xl font-black text-white italic tracking-tighter leading-none">{providerToEdit ? 'EDITAR' : 'NOVO'} <br /><span className="text-primary not-italic text-3xl">PRESTADOR</span></h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10 flex-1">
          <div className="flex flex-col items-center gap-4 group">
            <div className="relative">
              <div className="w-32 h-32 rounded-[40px] bg-white/5 border-4 border-dashed border-white/10 flex items-center justify-center overflow-hidden group-hover:border-primary transition-all">
                {profileImg ? (
                  <img src={profileImg} alt="Preview" className="w-full h-full object-cover transition-all duration-700" />
                ) : (
                  <Camera size={32} className="text-white/10 group-hover:text-primary transition-colors" />
                )}
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, true)} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
              <button
                type="button"
                onClick={() => generateRandomAvatar(true)}
                className="absolute -bottom-2 -right-2 bg-primary p-4 rounded-3xl shadow-2xl active:scale-90 transition-transform z-10"
              >
                <RefreshCw size={20} className="text-background-dark font-bold" strokeWidth={3} />
              </button>
            </div>
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">FOTO DE PERFIL</span>
          </div>

          <div className="space-y-4">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] ml-1">PORTFÓLIO (ATÉ 4 FOTOS)</span>
            <div className="grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="relative aspect-square rounded-2xl bg-white/5 border-2 border-dashed border-white/5 flex items-center justify-center overflow-hidden hover:border-primary/50 transition-colors">
                  {portfolio[i] ? (
                    <img src={portfolio[i]} alt={`Portfolio ${i}`} className="w-full h-full object-cover" />
                  ) : (
                    <Sparkles size={16} className="text-white/5" />
                  )}
                  <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, false, i)} className="absolute inset-0 opacity-0 cursor-pointer" />
                  {portfolio[i] && (
                    <button type="button" onClick={() => {
                      const newPortfolio = [...portfolio];
                      newPortfolio[i] = '';
                      setPortfolio(newPortfolio);
                    }} className="absolute top-1 right-1 bg-red-500/80 p-1.5 rounded-lg text-white backdrop-blur-sm">
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] ml-1">CATEGORIA DO SERVIÇO</span>
            <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
              {CATEGORIES.map((cat) => {
                const isSelected = categories.includes(cat.label);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setCategories(categories.filter(c => c !== cat.label));
                      } else {
                        setCategories([...categories, cat.label]);
                      }
                    }}
                    className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest whitespace-nowrap transition-all border ${isSelected
                      ? 'bg-primary text-background-dark border-primary'
                      : 'bg-white/5 text-white/40 border-white/5 hover:border-white/20'
                      }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-10">
            {[
              { label: 'COMO O PROFISSIONAL CHAMA?', value: name, setter: setName, placeholder: 'Ex: Sebastião Silva' },
              { label: 'QUAL A ESPECIALIDADE?', value: role, setter: setRole, placeholder: 'Ex: Eletricista de Primeira' },
              { label: 'WHATSAPP PARA CONTATO', value: phone, setter: setPhone, placeholder: 'Ex: 34996506860' },
              { label: 'ENDEREÇO (OPCIONAL)', value: address, setter: setAddress, placeholder: 'Ex: Rua 12, nº 450, Centro' }
            ].map((f) => (
              <div key={f.label} className="space-y-4">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-1">{f.label}</label>
                <input
                  type="text"
                  value={f.value}
                  onChange={(e) => f.setter(e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full bg-transparent border-b-2 border-white/5 py-4 text-xl font-bold text-white outline-none focus:border-primary transition-all placeholder:text-white/10"
                  required={f.label !== 'ENDEREÇO (OPCIONAL)'}
                />
              </div>
            ))}
          </div>

          <div className="pt-8 flex flex-col gap-4">
            <button type="submit" className="w-full bg-primary text-background-dark py-6 rounded-[35px] font-black text-xl active:scale-95 shadow-22xl shadow-primary/30">
              {providerToEdit ? 'ATUALIZAR DADOS' : 'CADASTRAR TUDO'}
            </button>
            <button type="button" onClick={onBack} className="w-full py-2 text-white/20 text-xs font-black uppercase tracking-widest hover:text-white transition-colors">CANCELAR OPERAÇÃO</button>
          </div>
        </form>
      </div>
    </div>
  );
};
