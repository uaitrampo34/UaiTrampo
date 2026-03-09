import React, { useState } from 'react';
import { 
  ArrowRight, 
  Globe, 
  HelpCircle, 
  Share2, 
  CheckCircle2, 
  ShieldCheck, 
  LogIn
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { Screen } from '../types';

export const LoginScreen = ({ onNext, onVisitor }: { onNext: (s: Screen) => void, onVisitor: () => void }) => (
  <div className="min-h-screen bg-background-dark p-8 flex flex-col justify-between relative overflow-hidden">
    <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
    <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
    
    <div className="flex justify-between items-center z-10">
      <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center rotate-12">
          <ArrowRight className="text-background-dark -rotate-12" size={20} />
        </div>
      </div>
      <div className="flex gap-4">
        <Globe className="text-white/40 hover:text-primary transition-colors cursor-pointer" size={24} onClick={() => toast.info('App disponível em todo o Triângulo Mineiro!')} />
        <HelpCircle className="text-white/40 hover:text-primary transition-colors cursor-pointer" size={24} onClick={() => toast.info('Iniciando chat de suporte...')} />
        <Share2 className="text-white/40 hover:text-primary transition-colors cursor-pointer" size={24} onClick={async () => {
          if (navigator.share) {
            try {
              await navigator.share({ title: 'UaiTrampo', text: 'Encontre os melhores prestadores de serviço!', url: window.location.href });
            } catch (err) { console.error(err); }
          } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Link copiado pro seu zap!');
          }
        }} />
      </div>
    </div>

    <div className="z-10 mt-12">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <h2 className="text-6xl font-black text-white italic tracking-tighter leading-[0.8] mb-4">
          O TREM QUE <br />
          <span className="text-primary not-italic">RESOLVE</span> <br />
          PRA VOCÊ.
        </h2>
        <p className="text-white/40 text-lg font-medium max-w-[280px] leading-snug">
          Encontre os melhores profissionais de Minas num vapt-vupt.
        </p>
      </motion.div>
    </div>

    <div className="flex flex-col gap-4 z-10">
      <button 
        onClick={() => onNext('register')}
        className="w-full bg-primary py-6 rounded-3xl font-black text-background-dark flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-primary/20 group"
      >
        BORA COMEÇAR?
        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </button>
      
      <button 
        onClick={() => {
          toast.success('Entrando como visitante...');
          onVisitor();
        }}
        className="w-full bg-white/5 border border-white/10 py-6 rounded-3xl font-bold text-white hover:bg-white/10 transition-all backdrop-blur-md"
      >
        Continuar como visitante
      </button>

      <div className="flex justify-center gap-8 mt-4">
        <button onClick={() => onNext('login-prompt')} className="text-primary/60 text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">Entrar na conta</button>
        <button className="text-white/20 text-xs font-bold uppercase tracking-widest hover:text-white/40 transition-colors" onClick={() => toast.info('Abra os termos de uso')}>Termos de Uso</button>
        <button className="text-white/20 text-xs font-bold uppercase tracking-widest hover:text-white/40 transition-colors" onClick={() => toast.info('Abra a política de privacidade')}>Privacidade</button>
      </div>
    </div>
  </div>
);

export const RegisterScreen = ({ onNext }: { onNext: (s: Screen) => void }) => (
  <div className="min-h-screen bg-background-dark p-8 flex flex-col justify-center">
    <div className="mb-12">
      <h2 className="text-5xl font-black text-white italic tracking-tighter leading-none mb-4">CADASTRO <br /><span className="text-primary">VAPT-VUPT</span></h2>
      <p className="text-white/40">Coloca seu número aí embaixo, sô!</p>
    </div>
    
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-4">Seu Celular</label>
        <input 
          type="tel" 
          placeholder="(34) 99999-9999" 
          className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl text-white font-bold outline-none focus:border-primary focus:bg-primary/5 transition-all text-xl"
        />
      </div>

      <button 
        onClick={() => onNext('verify')}
        className="w-full bg-primary py-6 rounded-3xl font-black text-background-dark flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-primary/20"
      >
        MANDAR CÓDIGO
        <ArrowRight size={20} />
      </button>

      <button onClick={() => onNext('login')} className="w-full text-white/40 text-xs font-bold uppercase tracking-widest hover:text-white">Arredar pro início</button>
    </div>
  </div>
);

export const VerificationScreen = ({ onVerify }: { onVerify: () => void }) => (
  <div className="min-h-screen bg-background-dark p-8 flex flex-col justify-center">
    <div className="mb-12">
      <h2 className="text-5xl font-black text-white italic tracking-tighter leading-none mb-4">CONFIRMA <br /><span className="text-primary">PRA NÓIS</span></h2>
      <p className="text-white/40">Chegou um código aí no seu zap.</p>
    </div>
    
    <div className="space-y-8 text-center">
      <div className="flex justify-between gap-4">
        {[1,2,3,4].map(i => (
          <input 
            key={i}
            type="text" 
            maxLength={1}
            className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-white font-black text-3xl text-center outline-none focus:border-primary transition-all"
          />
        ))}
      </div>

      <button 
        onClick={() => {
          toast.success('Perfil verificado com sucesso!');
          onVerify();
        }}
        className="w-full bg-primary py-6 rounded-3xl font-black text-background-dark flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-primary/20"
      >
        VERIFICAR AGORA
        <CheckCircle2 size={20} />
      </button>

      <button className="text-white/40 text-xs font-bold uppercase tracking-widest hover:text-white" onClick={() => toast.success('Código reenviado!')}>Mandar de novo, uai!</button>
    </div>
  </div>
);

export const LoginPromptScreen = ({ onBack, onLogin }: { onBack: () => void, onLogin: (isAdmin: boolean) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'uaitrampo34@gmail.com' && password === 'Davi2602') {
      toast.success('Bem-vindo de volta, Mestre Davi!', { icon: '👑' });
      onLogin(true);
    } else {
      toast.success('Login realizado com sucesso!');
      onLogin(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark p-8 flex flex-col justify-center">
      <div className="mb-12">
        <h2 className="text-5xl font-black text-white italic tracking-tighter leading-none mb-4">ENTRE <br /><span className="text-primary">NA CONTA</span></h2>
        <p className="text-white/40">Que bom te ver de volta!</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-4">E-mail</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="uai@exemplo.com" 
            className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white font-bold outline-none focus:border-primary transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-4">Senha</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••" 
            className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white font-bold outline-none focus:border-primary transition-all"
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-primary py-6 rounded-3xl font-black text-background-dark flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-primary/20"
        >
          LOGAR AGORA
          <LogIn size={20} />
        </button>

        <button type="button" onClick={onBack} className="w-full text-white/40 text-xs font-bold uppercase tracking-widest hover:text-white">Voltar pro início</button>
      </form>
    </div>
  );
};
