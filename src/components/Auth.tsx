import React, { useState } from 'react';
import { 
  ArrowRight, 
  Globe, 
  HelpCircle, 
  Share2, 
  CheckCircle2, 
  Mail, 
  Lock, 
  User,
  Eye,
  EyeOff
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { Screen } from '../types';

export const LoginScreen = ({ onNext, onVisitor }: { onNext: (s: Screen) => void, onVisitor: () => void }) => (
  <div className="min-h-screen bg-background-dark p-8 flex flex-col justify-center items-center relative gap-8">
    <div className="text-center space-y-4">
      <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto border border-primary/20">
        <ArrowRight className="text-primary" size={40} />
      </div>
      <h2 className="text-4xl font-bold text-white tracking-tight">Bem-vindo ao <span className="text-primary">UaiTrampo</span></h2>
      <p className="text-white/60 text-sm max-w-[280px]">O jeito mais mineiro de resolver seus problemas de casa.</p>
    </div>

    <div className="w-full max-w-xs space-y-4">
      <button 
        onClick={() => onNext('register')}
        className="w-full bg-primary py-4 rounded-2xl font-bold text-background-dark hover:opacity-90 transition-all shadow-lg"
      >
        Entrar na Conta
      </button>
      
      <button 
        onClick={() => {
          toast.success('Entrando como visitante...');
          onVisitor();
        }}
        className="w-full bg-white/5 border border-white/10 py-4 rounded-2xl font-bold text-white hover:bg-white/10 transition-all"
      >
        Continuar como visitante
      </button>

      <div className="flex justify-center gap-6 pt-4 text-white/40">
        <Globe size={20} className="hover:text-primary cursor-pointer" onClick={() => toast.info('Disponível em Minas Gerais')} />
        <HelpCircle size={20} className="hover:text-primary cursor-pointer" onClick={() => toast.info('Suporte')} />
        <Share2 size={20} className="hover:text-primary cursor-pointer" onClick={() => toast.info('Compartilhar')} />
      </div>
    </div>
  </div>
);

export const RegisterScreen = ({ onNext }: { onNext: (s: Screen) => void }) => {
  const [step, setStep] = useState(1);
  return (
    <div className="min-h-screen bg-background-dark p-8">
      <div className="flex items-center gap-4 mb-12">
        <button onClick={() => onNext('login')} className="p-2 bg-white/5 rounded-xl border border-white/10">
          <ArrowRight className="rotate-180 text-white/40" size={24} />
        </button>
        <h2 className="text-2xl font-bold text-white">Criar Conta</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Nome Completo</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input type="text" placeholder="Como ocê chama?" className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl text-white outline-none focus:border-primary transition-all" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">E-mail</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input type="email" placeholder="seuemail@exemplo.com" className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl text-white outline-none focus:border-primary transition-all" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Senha</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl text-white outline-none focus:border-primary transition-all" />
          </div>
        </div>

        <button 
          onClick={() => onNext('verify')}
          className="w-full bg-primary py-4 rounded-2xl font-bold text-background-dark mt-8"
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
};

export const VerificationScreen = ({ onVerify }: { onVerify: () => void }) => (
  <div className="min-h-screen bg-background-dark p-8 flex flex-col justify-center items-center text-center gap-8">
    <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
      <Mail className="text-emerald-500" size={48} />
    </div>
    
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-white">Quase lá, sô!</h2>
      <p className="text-white/60 text-sm max-w-[240px] mx-auto">
        Mandamos um código pro seu e-mail. Dá uma olhada lá pra gente confirmar quem é ocê.
      </p>
    </div>

    <div className="flex gap-3">
      {[1, 2, 3, 4].map((i) => (
        <input key={i} type="text" maxLength={1} className="w-14 h-16 bg-white/5 border border-white/10 rounded-2xl text-center text-2xl font-bold text-white outline-none focus:border-primary transition-all" />
      ))}
    </div>

    <div className="w-full space-y-4">
      <button 
        onClick={() => {
          toast.success('Pode entrar, a casa é sua!');
          onVerify();
        }}
        className="w-full bg-primary py-4 rounded-2xl font-bold text-background-dark flex items-center justify-center gap-2"
      >
        VERIFICAR AGORA
        <CheckCircle2 size={20} />
      </button>
      <button onClick={() => toast.info('Mandamos de novo!')} className="text-white/40 text-sm font-bold hover:text-white transition-colors">Mandar de novo, uai!</button>
    </div>
  </div>
);

export const LoginPromptScreen = ({ 
  onBack, 
  onLogin 
}: { 
  onBack: () => void, 
  onLogin: (admin: boolean) => void 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'uaitrampo34@gmail.com' && password === 'Davi2602') {
      toast.success('Bem-vindo mestre Davi!', { icon: '👑' });
      onLogin(true);
    } else {
      toast.success('Login realizado com sucesso!');
      onLogin(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark p-8">
      <div className="flex items-center gap-4 mb-12">
        <button onClick={onBack} className="p-2 bg-white/5 rounded-xl border border-white/10">
          <ArrowRight className="rotate-180 text-white/40" size={24} />
        </button>
        <h2 className="text-2xl font-bold text-white">Entrar</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Seu E-mail</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com" 
              className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl text-white outline-none focus:border-primary transition-all"
              required 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Sua Senha</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input 
              type={showPass ? 'text' : 'password'} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full bg-white/5 border border-white/10 p-4 pl-12 pr-12 rounded-2xl text-white outline-none focus:border-primary transition-all"
              required 
            />
            <button 
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-primary py-4 rounded-2xl font-bold text-background-dark shadow-lg shadow-primary/20"
        >
          Entrar na Conta
        </button>
        
        <div className="flex flex-col gap-4 text-center pt-4">
          <button type="button" onClick={() => toast.info('Enviamos instruções pro seu e-mail')} className="text-white/40 text-xs font-bold hover:text-white">Esqueceu o trem da senha?</button>
          <button type="button" onClick={() => toast.info('Abrindo termos...')} className="text-[10px] text-white/20 leading-relaxed px-4">Ao entrar, você concorda com nossos <span className="text-white/40 font-bold decoration-dotted">Termos de Uso</span> e <span className="text-white/40 font-bold decoration-dotted">Privacidade</span>.</button>
        </div>
      </form>
    </div>
  );
};
