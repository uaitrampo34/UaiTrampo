import React, { useState } from 'react';
import {
  ArrowRight,
  Instagram,
  Hammer,
  HelpCircle,
  Share2,
  CheckCircle2,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Sparkles,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { Screen } from '../types';
import { supabase } from '../supabaseClient';

export const LoginScreen = ({ onNext, onVisitor }: { onNext: (s: Screen) => void, onVisitor: () => void }) => (
  <div className="min-h-screen bg-background-dark p-8 flex flex-col justify-end relative overflow-hidden">
    {/* Animated background blobs */}
    <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
    <div className="absolute top-1/2 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse delay-700" />

    <div className="relative z-10 space-y-12 mb-12">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 rounded-full border border-primary/30">
          <Sparkles className="text-primary" size={12} />
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">A FORÇA DO TRABALHO MINEIRO</span>
        </div>
        <h2 className="text-6xl font-black text-white italic tracking-tighter leading-[0.9]">BEM-VINDO <br /><span className="text-primary not-italic">AO NOSSO TREM!</span></h2>
        <p className="text-white/40 text-sm font-bold">Vem cô nóis, que o trem é bão demais!</p>
      </motion.div>

      <div className="space-y-3">
        <button
          onClick={() => onNext('register')}
          className="w-full bg-white text-background-dark py-6 rounded-[30px] font-black text-lg hover:bg-primary transition-all flex items-center justify-center gap-3 group active:scale-95 shadow-2xl shadow-white/5"
        >
          CRIAR MINHA CONTA
          <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} strokeWidth={3} />
        </button>

        <button
          onClick={() => onNext('login-prompt')}
          className="w-full bg-primary text-background-dark py-6 rounded-[30px] font-black text-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group active:scale-95 shadow-2xl shadow-primary/20"
        >
          JÁ TENHO CONTA (ENTRAR)
          <Lock className="group-hover:rotate-12 transition-transform" size={20} strokeWidth={3} />
        </button>

        <button
          onClick={() => {
            toast.success('Pode entrar, sô! Aproveita o passeio.');
            onVisitor();
          }}
          className="w-full bg-white/5 border border-white/10 backdrop-blur-md py-6 rounded-[30px] font-black text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          CONTINUAR COMO VISITANTE
        </button>
      </div>

      <div className="flex justify-center gap-8 pt-4">
        <button
          onClick={() => window.open('https://www.instagram.com/uaitrampo34/', '_blank')}
          className="p-4 bg-white/5 rounded-2xl border border-white/10 text-white/40 hover:text-primary hover:border-primary/50 transition-all active:scale-90"
        >
          <Instagram size={20} />
        </button>
        <button
          onClick={() => window.open('https://wa.me/5534996506860?text=Opa! Preciso de uma ajuda aqui no UaiTrampo.', '_blank')}
          className="p-4 bg-white/5 rounded-2xl border border-white/10 text-white/40 hover:text-primary hover:border-primary/50 transition-all active:scale-90"
        >
          <HelpCircle size={20} />
        </button>
        <button
          onClick={() => {
            navigator.clipboard.writeText('https://uai-trampo.vercel.app');
            toast.success('Link do app copiado! Manda pros amigos.');
          }}
          className="p-4 bg-white/5 rounded-2xl border border-white/10 text-white/40 hover:text-primary hover:border-primary/50 transition-all active:scale-90"
        >
          <Share2 size={20} />
        </button>
      </div>
    </div>
  </div>
);

export const RegisterScreen = ({ onNext }: { onNext: (s: Screen) => void }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return toast.error('Preencha os campos tudo, sô!');

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name }
      }
    });

    setLoading(false);
    if (error) {
      toast.error('Erro ao cadastrar, dá uma olhada:', { description: error.message });
      return;
    }

    toast.success('Quase lá! Agora confirma seu e-mail.');
    onNext('verify');
  };

  return (
    <div className="min-h-screen bg-background-dark p-8 relative overflow-hidden flex flex-col">
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[120px]" />

      <div className="relative z-10 flex flex-col flex-1">
        <div className="flex items-center justify-between mt-4 mb-12">
          <button onClick={() => onNext('login')} className="p-4 bg-white/5 rounded-2xl border border-white/10 text-white/40 active:scale-90 transition-transform">
            <ArrowRight className="rotate-180" size={24} strokeWidth={3} />
          </button>
          <div className="h-1 w-12 bg-white/10 rounded-full" />
        </div>

        <div className="space-y-4 mb-12">
          <h2 className="text-5xl font-black text-white italic tracking-tighter leading-tight">NOVO <br /><span className="text-primary not-italic text-4xl">CADASTRO</span></h2>
          <p className="text-white/40 text-sm font-bold">Vem cô nóis, que o trem é bão demais!</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-10 flex-1">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-1">COMO OCÊ CHAMA?</label>
            <div className="relative group">
              <User className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={24} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome Completo"
                className="w-full bg-transparent border-b-2 border-white/5 py-4 pl-10 text-xl font-bold text-white outline-none focus:border-primary transition-all placeholder:text-white/10"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-1">QUAL SEU E-MAIL?</label>
            <div className="relative group">
              <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={24} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-transparent border-b-2 border-white/5 py-4 pl-10 text-xl font-bold text-white outline-none focus:border-primary transition-all placeholder:text-white/10"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-1">CRIA UMA SENHA</label>
            <div className="relative group">
              <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={24} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-b-2 border-white/5 py-4 pl-10 text-xl font-bold text-white outline-none focus:border-primary transition-all placeholder:text-white/10"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-primary text-background-dark py-6 rounded-[30px] font-black text-xl hover:scale-[1.02] transition-transform active:scale-95 shadow-2xl shadow-primary/20 disabled:opacity-50"
          >
            {loading ? 'CADASTRANDO...' : 'CADASTRAR AGORA'}
          </button>
        </form>
      </div>
    </div>
  );
};

export const VerificationScreen = ({ onVerify }: { onVerify: () => void }) => (
  <div className="min-h-screen bg-background-dark p-8 flex flex-col justify-center gap-12 text-center relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />

    <div className="relative z-10 space-y-6">
      <div className="w-24 h-24 bg-primary/10 rounded-[40px] flex items-center justify-center mx-auto border-2 border-primary/20 rotate-12 relative overflow-hidden">
        <Zap className="text-primary" size={48} fill="currentColor" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Hammer className="text-white/60 -rotate-12 translate-y-1" size={24} strokeWidth={2.5} />
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-5xl font-black text-white italic tracking-tighter">OLHA O <br /><span className="text-primary not-italic text-3xl">E-MAIL!</span></h2>
        <p className="text-white/40 text-sm font-bold max-w-[200px] mx-auto">Mandamos um link de confirmação pro seu e-mail. Clica lá pra ativar sua conta!</p>
      </div>
    </div>

    <div className="relative z-10 space-y-6">
      <div className="p-6 bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-md">
        <p className="text-xs font-bold text-white/60 uppercase tracking-widest leading-relaxed">
          Após clicar no link do e-mail, ocê já vai tá logado e pronto pro trabalho!
        </p>
      </div>

      <button
        onClick={() => {
          toast.info('Voltando para o início...');
          window.location.reload();
        }}
        className="w-full bg-white/5 border border-white/10 py-6 rounded-[30px] font-black text-white hover:bg-white/10 transition-all flex items-center justify-center"
      >
        VOLTAR PARA O LOGIN
      </button>
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error('Preencha os campos tudo, sô!');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error('Erro no login, confere os dados aí!', { description: error.message });
      console.error(error);
      return;
    }

    if (data.user) {
      // Check if it's the master email we defined
      const isAdmin = email === 'uaitrampo34@gmail.com';
      if (isAdmin) {
        toast.success('Bem-vindo(a) de volta, Mestre DEV!', { icon: '👑' });
      } else {
        toast.success('Login realizado com sucesso!');
      }
      onLogin(isAdmin);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark p-8 flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />

      <div className="relative z-10 flex flex-col h-full">
        <button onClick={onBack} className="self-start p-4 bg-white/5 rounded-2xl border border-white/10 text-white/40 active:scale-90 transition-transform mt-4 mb-12">
          <ArrowRight className="rotate-180" size={24} strokeWidth={3} />
        </button>

        <div className="space-y-4 mb-16">
          <h2 className="text-5xl font-black text-white italic tracking-tighter leading-tight">QUE BOM <br /><span className="text-primary not-italic text-4xl">VER VOCÊ!</span></h2>
          <p className="text-white/40 text-sm font-bold">Saudade d'ocê, sô!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12 flex-1">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-1">SEU E-MAIL</label>
            <div className="relative group">
              <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={24} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-transparent border-b-2 border-white/5 py-4 pl-10 text-xl font-bold text-white outline-none focus:border-primary transition-all placeholder:text-white/10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-1">SUA SENHA</label>
            <div className="relative group">
              <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={24} />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-b-2 border-white/5 py-4 pl-10 pr-10 text-xl font-bold text-white outline-none focus:border-primary transition-all placeholder:text-white/10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20 hover:text-white p-2"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-background-dark py-6 rounded-[30px] font-black text-xl hover:scale-[1.02] transition-transform active:scale-95 shadow-22xl shadow-primary/20"
          >
            ENTRAR NO TREM
          </button>

          <button
            type="button"
            onClick={async () => {
              if (!email) return toast.error('Digita seu e-mail primeiro, sô!');
              const { error } = await supabase.auth.resetPasswordForEmail(email);
              if (error) toast.error('Erro ao enviar trem: ' + error.message);
              else toast.success('Enviamos as instruções pro seu e-mail!');
            }}
            className="w-full text-white/20 text-xs font-black uppercase tracking-widest hover:text-white transition-colors"
          >
            ESQUECEU O TREM DA SENHA?
          </button>
        </form>
      </div>
    </div>
  );
};
