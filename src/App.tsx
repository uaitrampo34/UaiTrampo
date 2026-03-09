import React, { useState } from 'react';
import { 
  Home as HomeIcon, 
  Search, 
  User, 
  Menu, 
  Hammer, 
  Zap, 
  Wrench, 
  Star, 
  MapPin, 
  MessageCircle, 
  Compass, 
  Settings, 
  ChevronRight, 
  LogOut, 
  Bell, 
  Lock, 
  Info, 
  ShieldCheck, 
  Smartphone, 
  ArrowLeft, 
  Eye, 
  Rocket, 
  LogIn, 
  Globe, 
  HelpCircle, 
  Share2,
  Construction,
  Truck,
  Scissors,
  GraduationCap,
  Flower2,
  Droplets,
  Brush,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Screen = 'login' | 'register' | 'verify' | 'home' | 'explore' | 'profile' | 'settings';

// --- Components ---

const BottomNav = ({ currentScreen, setScreen }: { currentScreen: Screen, setScreen: (s: Screen) => void }) => {
  const navItems = [
    { id: 'home', icon: HomeIcon, label: 'Início' },
    { id: 'explore', icon: Compass, label: 'Explorar' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card-dark/90 backdrop-blur-xl border-t border-white/5 px-4 pb-6 pt-2 z-50">
      <div className="flex justify-between items-center mx-auto max-w-lg">
        <div className="flex justify-between items-center w-full gap-4">
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setScreen(item.id as Screen)}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  currentScreen === item.id ? 'text-primary' : 'text-slate-500'
                }`}
              >
                <item.icon size={24} fill={currentScreen === item.id ? 'currentColor' : 'none'} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
              </button>
            ))}
          </div>
          
          {currentScreen === 'home' && (
            <button className="flex-1 bg-emerald-uai hover:bg-emerald-600 text-white font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-uai/10 text-shadow-black">
              <Hammer size={18} />
              <span className="text-sm uppercase tracking-tight">TRABALHAR CÔ NÓIS, UAI!</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

const Header = ({ title, onBack, rightAction }: { title?: string, onBack?: () => void, rightAction?: React.ReactNode }) => {
  return (
    <header className="flex items-center justify-between p-4 sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-2">
        {onBack ? (
          <button onClick={onBack} className="p-2 -ml-2 text-slate-300 hover:text-primary transition-colors">
            <ArrowLeft size={24} />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <Hammer className="text-primary" size={28} />
            <h1 className="text-primary text-xl font-bold tracking-tight">UaiTrampo</h1>
          </div>
        )}
      </div>
      
      {title && <h2 className="text-lg font-bold absolute left-1/2 -translate-x-1/2">{title}</h2>}

      <div className="flex items-center gap-2">
        {rightAction || (
          <>
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-300">
              <User size={24} />
            </button>
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-300">
              <Menu size={24} />
            </button>
          </>
        )}
      </div>
    </header>
  );
};

// --- Screens ---

const LoginScreen = ({ onNext }: { onNext: (s: Screen) => void }) => (
  <div className="min-h-screen flex flex-col bg-background-dark">
    <Header />
    <div className="px-4 py-2">
      <div className="relative overflow-hidden rounded-xl min-h-[380px] flex flex-col justify-end group">
        <img 
          src="https://picsum.photos/seed/uaitrampo-hero/800/1200" 
          alt="People working" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent" />
        <div className="relative p-6">
          <span className="inline-block px-3 py-1 mb-4 rounded-full bg-primary text-background-dark text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(255,215,0,0.3)]">
            Oportunidades
          </span>
          <h2 className="text-white tracking-tight text-4xl font-black leading-tight mb-2">Bão demais ter ocê por aqui!</h2>
          <p className="text-zinc-400 text-sm max-w-xs font-medium">Encontre as melhores vaga de Minas Gerais num estalar de dedos.</p>
        </div>
      </div>
    </div>

    <div className="flex flex-col items-center px-6 py-8 bg-card-dark rounded-t-[2.5rem] mt-4 border-t border-white/5 shadow-2xl flex-1">
      <h2 className="text-slate-100 tracking-tight text-2xl font-bold leading-tight text-center pb-2">
        Faça parte do <span className="text-primary">trem!</span>
      </h2>
      <p className="text-slate-400 text-base font-normal leading-normal pb-8 text-center max-w-xs">
        Escolha como deseja prosseguir pra ver as vaga tudo que nóis tem.
      </p>
      
      <div className="flex flex-col w-full max-w-[400px] gap-4">
        <button 
          onClick={() => onNext('register')}
          className="flex items-center justify-center gap-3 rounded-xl h-14 px-5 bg-emerald-uai hover:bg-emerald-600 transition-all text-white text-base font-bold tracking-wide w-full shadow-[0_4px_20px_rgba(16,185,129,0.3)] border border-emerald-400/20"
        >
          <Rocket size={20} />
          <span className="text-lg">Criar meu cadastro</span>
        </button>
        
        <button 
          onClick={() => onNext('home')}
          className="flex items-center justify-center gap-3 rounded-xl h-14 px-5 bg-primary hover:bg-[#E6C200] transition-all text-background-dark text-base font-bold tracking-wide w-full shadow-[0_4px_20px_rgba(255,215,0,0.2)]"
        >
          <LogIn size={20} />
          <span className="text-lg">Entrar na conta</span>
        </button>

        <div className="flex items-center gap-4 py-2">
          <div className="h-[1px] flex-1 bg-slate-800" />
          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">ou</span>
          <div className="h-[1px] flex-1 bg-slate-800" />
        </div>

        <button 
          onClick={() => onNext('home')}
          className="flex items-center justify-center gap-2 rounded-xl h-14 px-5 bg-zinc-800/50 hover:bg-zinc-800 transition-colors text-zinc-300 text-base font-bold tracking-wide w-full border border-white/5"
        >
          <span>Continuar como visitante</span>
        </button>
      </div>

      <div className="mt-auto pt-8 flex flex-col items-center gap-4">
        <p className="text-slate-500 text-xs text-center">
          Ao prosseguir, você concorda com nossos <br/>
          <a className="text-primary hover:underline font-medium" href="#">Termos de Uso</a> e <a className="text-primary hover:underline font-medium" href="#">Privacidade</a>.
        </p>
        <div className="flex gap-6 mt-2">
          <Globe className="text-slate-600 cursor-pointer hover:text-primary transition-colors" size={20} />
          <HelpCircle className="text-slate-600 cursor-pointer hover:text-primary transition-colors" size={20} />
          <Share2 className="text-slate-600 cursor-pointer hover:text-primary transition-colors" size={20} />
        </div>
      </div>
    </div>
  </div>
);

const VerificationScreen = ({ onBack, onVerify }: { onBack: () => void, onVerify: () => void }) => {
  const [code, setCode] = useState(['', '', '', '']);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <header className="flex items-center justify-between p-4 pt-6">
        <button onClick={onBack} className="flex items-center justify-center size-10 rounded-full bg-zinc-900 text-primary">
          <ArrowLeft size={24} />
        </button>
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
          <ShieldCheck className="text-background-dark" size={24} />
        </div>
        <div className="size-10" />
      </header>

      <main className="flex-1 px-6 pt-8 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Confirma o trem!</h1>
          <p className="text-slate-400 text-lg">Mandamos um código pro seu e-mail. Digita ele aí embaixo pra nóis saber que é ocê mesmo.</p>
        </div>

        <div className="flex justify-between gap-4 mb-10">
          {code.map((digit, i) => (
            <input
              key={i}
              id={`code-${i}`}
              type="number"
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              className="w-16 h-20 bg-zinc-900 border-2 border-zinc-800 rounded-2xl text-center text-3xl font-bold text-primary focus:border-primary focus:ring-0 outline-none transition-all"
            />
          ))}
        </div>

        <button 
          onClick={onVerify}
          className="w-full bg-emerald-uai hover:bg-emerald-600 py-5 rounded-3xl text-white font-bold text-lg shadow-xl shadow-emerald-uai/20 transition-transform active:scale-95 text-shadow-black"
        >
          VERIFICAR AGORA
        </button>

        <div className="mt-8 text-center">
          <p className="text-slate-400">Não recebeu nada?</p>
          <button className="mt-2 text-primary font-bold hover:underline">Mandar de novo, uai!</button>
        </div>
      </main>
    </div>
  );
};

const RegisterScreen = ({ onBack, onNext }: { onBack: () => void, onNext: (s: Screen) => void }) => (
  <div className="min-h-screen flex flex-col bg-background-dark">
    <header className="flex items-center justify-between p-4 pt-6">
      <button onClick={onBack} className="flex items-center justify-center size-10 rounded-full bg-zinc-900 text-primary">
        <ArrowLeft size={24} />
      </button>
      <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
        <Briefcase className="text-background-dark" size={24} />
      </div>
      <div className="size-10" />
    </header>

    <main className="flex-1 px-6 pt-4 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Crie sua conta, uai!</h1>
        <p className="text-slate-400 text-lg">Bão demais ter ocê aqui no UaiTrampo.</p>
      </div>

      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onNext('verify'); }}>
        {[
          { label: 'Nome Completo', placeholder: 'Como ocê chama?', icon: User, type: 'text' },
          { label: 'E-mail', placeholder: 'seu@email.com', icon: Info, type: 'email' },
          { label: 'WhatsApp', placeholder: '(34) 9 9999-9999', icon: MessageCircle, type: 'tel' },
        ].map((field) => (
          <div key={field.label} className="space-y-1.5">
            <label className="text-sm font-semibold ml-2 text-slate-300">{field.label}</label>
            <div className="relative">
              <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 rounded-3xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white" 
                placeholder={field.placeholder} 
                type={field.type}
              />
            </div>
          </div>
        ))}

        <div className="space-y-1.5">
          <label className="text-sm font-semibold ml-2 text-slate-300">Cidade</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <select className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 rounded-3xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white appearance-none">
              <option>Frutal</option>
              <option>Uberaba</option>
              <option>Uberlândia</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold ml-2 text-slate-300">Senha</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              className="w-full pl-12 pr-12 py-4 bg-zinc-900 border border-zinc-800 rounded-3xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white" 
              placeholder="Crie uma senha forte" 
              type="password"
            />
            <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Eye size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 py-2">
          <input className="size-5 rounded border-zinc-700 text-primary focus:ring-primary bg-transparent" id="terms" type="checkbox" />
          <label className="text-xs text-slate-400" htmlFor="terms">
            Li e concordo com os <a className="text-primary underline" href="#">Termos de Uso</a> e <a className="text-primary underline" href="#">Privacidade</a>.
          </label>
        </div>

        <div className="pt-4">
          <button className="w-full bg-emerald-uai hover:bg-emerald-600 py-5 rounded-3xl text-white font-bold text-lg shadow-xl shadow-emerald-uai/20 transition-transform active:scale-95 text-shadow-black" type="submit">
            CADASTRAR AGORA
          </button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <p className="text-slate-400">Já tem uma conta?</p>
        <button onClick={() => onNext('login')} className="mt-2 text-secondary font-bold hover:underline">Fazer login agora</button>
      </div>
    </main>
  </div>
);

const HomeScreen = () => (
  <div className="pb-24">
    <div className="px-4 py-6">
      <label className="flex flex-col w-full">
        <div className="flex w-full items-stretch rounded-xl h-14 premium-border gold-glow overflow-hidden bg-card-dark transition-all focus-within:border-primary">
          <div className="flex items-center justify-center px-4">
            <Search className="text-primary" size={20} />
          </div>
          <input 
            className="flex w-full border-none bg-transparent focus:ring-0 text-base placeholder:text-slate-400 text-white" 
            placeholder="Procurar um trem em Frutal..."
          />
        </div>
      </label>
    </div>

    <section className="px-4 py-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Categorias</h3>
        <a className="text-sm text-primary font-medium" href="#">Ver todas</a>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Brush, label: 'Reformar o barraco' },
          { icon: Zap, label: 'Luz e Gambiarra' },
          { icon: Wrench, label: 'Ajeitar o trem' },
        ].map((cat) => (
          <div key={cat.label} className="flex flex-col items-center gap-3 p-4 rounded-xl border border-white/5 bg-card-dark hover:border-primary/50 transition-all">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 border border-primary/20">
              <cat.icon className="text-primary" size={24} />
            </div>
            <span className="text-[10px] font-semibold text-center uppercase tracking-wider">{cat.label}</span>
          </div>
        ))}
      </div>
    </section>

    <section className="px-4 py-8">
      <h3 className="text-lg font-bold mb-4">Destaques da Semana</h3>
      <div className="flex flex-col gap-4">
        {[
          { name: 'João Pedro', role: 'Eng. Elétrico & Automação', reviews: 48, img: 'https://i.pravatar.cc/150?u=joao' },
          { name: 'Ana Silva', role: 'Designer de Interiores', reviews: 32, img: 'https://i.pravatar.cc/150?u=ana' },
        ].map((provider) => (
          <div key={provider.name} className="bg-card-dark rounded-xl premium-border p-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src={provider.img} 
                  alt={provider.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-1 -right-1 bg-primary text-background-dark rounded-full p-0.5 border-2 border-card-dark">
                  <ShieldCheck size={14} />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <h4 className="font-bold text-lg">{provider.name}</h4>
                  <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded border border-primary/30 font-bold uppercase tracking-tighter">Verificado</span>
                </div>
                <p className="text-slate-400 text-sm">{provider.role}</p>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="text-primary fill-primary" size={14} />)}
                  <span className="text-xs text-slate-400 ml-1">({provider.reviews} avaliações)</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <MapPin className="text-primary" size={16} />
                Frutal, MG
              </div>
              <button className="bg-emerald-uai hover:bg-emerald-600 text-white font-extrabold py-2 px-6 rounded-lg flex items-center gap-2 transition-transform active:scale-95 text-shadow-black">
                <MessageCircle size={16} />
                Chamar no zap, sô!
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const ExploreScreen = () => (
  <div className="pb-24">
    <div className="px-6 py-8">
      <p className="text-primary font-bold text-lg mb-2 ml-1">Ô de casa!</p>
      <label className="flex flex-col w-full">
        <div className="flex w-full items-stretch rounded-2xl h-16 border-2 border-primary/20 shadow-[0_0_20px_-5px_rgba(255,215,0,0.25)] overflow-hidden bg-zinc-900 transition-all focus-within:border-primary">
          <div className="flex items-center justify-center px-5">
            <Search className="text-primary" size={28} />
          </div>
          <input 
            className="flex w-full border-none bg-transparent focus:ring-0 text-lg placeholder:text-slate-400 text-white" 
            placeholder="Procês ocê precisa o quê, uai?"
          />
        </div>
      </label>
    </div>

    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold">Explorar <span className="text-primary">Categorias</span></h2>
      <p className="text-sm text-zinc-400 mt-1">Encontre os melhores profissionais mineiros</p>
    </div>

    <div className="grid grid-cols-2 gap-4 px-4 pb-8">
      {[
        { icon: Construction, label: 'Reformas' },
        { icon: Zap, label: 'Elétrica' },
        { icon: Brush, label: 'Limpeza' },
        { icon: Truck, label: 'Fretes' },
        { icon: Scissors, label: 'Beleza' },
        { icon: GraduationCap, label: 'Aulas' },
        { icon: Flower2, label: 'Jardinagem' },
        { icon: Droplets, label: 'Hidráulica' },
      ].map((cat) => (
        <div key={cat.label} className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-primary/50 transition-all cursor-pointer group shadow-lg">
          <div className="bg-primary/10 p-4 rounded-full group-hover:bg-primary/20 transition-colors">
            <cat.icon className="text-primary" size={32} />
          </div>
          <span className="font-semibold text-zinc-200 group-hover:text-primary transition-colors">{cat.label}</span>
        </div>
      ))}
    </div>
  </div>
);

const ProfileScreen = ({ onSettings }: { onSettings: () => void }) => {
  const [available, setAvailable] = useState(true);

  return (
    <div className="pb-24">
      <Header 
        title="Meu Cantinho" 
        rightAction={
          <button onClick={onSettings} className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/30">
            <Settings size={20} />
          </button>
        }
      />
      
      <div className="flex p-6 mt-4">
        <div className="flex w-full flex-col gap-6 items-center">
          <div className="relative">
            <div className="min-h-32 w-32 rounded-full border-2 border-primary p-1 overflow-hidden">
              <img 
                src="https://i.pravatar.cc/150?u=me" 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute bottom-1 right-1 bg-primary text-black rounded-full p-1.5 flex items-center justify-center border-2 border-background-dark">
              <Star size={14} fill="currentColor" />
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold leading-tight tracking-tight text-center">Bão demais ver ocê!</p>
            <p className="text-primary text-base font-medium leading-normal text-center mt-1">Uai, cê tá chique demais!</p>
            <div className="mt-2 px-3 py-1 bg-primary/20 rounded-full border border-primary/40">
              <p className="text-primary text-xs font-bold uppercase tracking-widest">Nível Ouro</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-1">
        <h3 className="text-primary text-sm font-bold uppercase tracking-widest px-6 pb-2">Meu Painel do Prestador</h3>
        {[
          { icon: Briefcase, title: 'Ajeitar meus trens', sub: 'Gerencie seus serviços e preços', color: 'text-emerald-uai' },
          { icon: Star, title: 'Ver o que o povo tá falando', sub: 'Suas avaliações e comentários', color: 'text-emerald-uai' },
        ].map((item) => (
          <button key={item.title} className="flex items-center gap-4 px-6 py-4 hover:bg-emerald-uai/5 transition-colors border-b border-slate-800/50 w-full text-left">
            <item.icon className={item.color} size={24} />
            <div className="flex-1">
              <p className="text-base font-medium">{item.title}</p>
              <p className="text-slate-400 text-xs">{item.sub}</p>
            </div>
            <ChevronRight className="text-slate-500" size={20} />
          </button>
        ))}
        
        <div className="flex items-center gap-4 px-6 py-4 hover:bg-emerald-uai/5 transition-colors border-b border-slate-800/50">
          <HomeIcon className="text-emerald-uai" size={24} />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-base font-medium">Tô disponível agora?</p>
              {available && <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
            </div>
            <p className="text-slate-400 text-xs">Ative ou desative sua agenda</p>
          </div>
          <button 
            onClick={() => setAvailable(!available)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${available ? 'bg-emerald-uai' : 'bg-zinc-700'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${available ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

        <h3 className="text-primary text-sm font-bold uppercase tracking-widest px-6 pb-2 mt-6">Minha Conta</h3>
        <button className="flex items-center gap-4 px-6 py-4 hover:bg-primary/5 transition-colors border-b border-slate-800/50 w-full text-left">
          <User className="text-primary" size={24} />
          <div className="flex-1">
            <p className="text-base font-medium">Meus Dados</p>
            <p className="text-slate-400 text-xs">Ajeite suas informações</p>
          </div>
          <ChevronRight className="text-slate-500" size={20} />
        </button>
        
        <button className="flex items-center gap-4 px-6 py-4 hover:bg-red-500/5 transition-colors group w-full text-left">
          <LogOut className="text-red-500 group-hover:scale-110 transition-transform" size={24} />
          <div className="flex-1">
            <p className="text-base font-medium text-red-500">Arredar o pé</p>
            <p className="text-slate-400 text-xs">Sair da conta com segurança</p>
          </div>
        </button>
      </div>
    </div>
  );
};

const SettingsScreen = ({ onBack }: { onBack: () => void }) => (
  <div className="min-h-screen flex flex-col bg-background-dark">
    <Header title="Ajustes do App" onBack={onBack} rightAction={<Search size={24} />} />
    
    <div className="flex flex-col gap-6 p-4 pb-24">
      <section>
        <h3 className="text-primary text-sm font-bold uppercase tracking-wider mb-3 ml-1">Ajustar os trens</h3>
        <div className="bg-card-dark rounded-xl overflow-hidden border border-white/5">
          <div className="flex items-center gap-4 px-4 py-4 justify-between border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
                <Bell size={20} />
              </div>
              <div>
                <p className="text-base font-medium leading-tight">Notificações</p>
                <p className="text-slate-400 text-xs">Alertas de novos serviços</p>
              </div>
            </div>
            <button className="relative flex h-[28px] w-[48px] items-center rounded-full bg-primary p-1 justify-end">
              <div className="h-full aspect-square rounded-full bg-white shadow-md" />
            </button>
          </div>
          
          <div className="flex items-center gap-4 px-4 py-4 justify-between">
            <div className="flex items-center gap-4">
              <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
                <Lock size={20} />
              </div>
              <div>
                <p className="text-base font-medium leading-tight">Segurança da conta</p>
                <p className="text-slate-400 text-xs">Mudar a senha e proteção</p>
              </div>
            </div>
            <ChevronRight className="text-slate-500" size={20} />
          </div>
        </div>
      </section>

      <section className="bg-emerald-uai/10 border-2 border-emerald-uai/30 rounded-xl p-6 flex flex-col items-center text-center gap-4">
        <div className="bg-emerald-uai p-3 rounded-full text-white shadow-lg">
          <HelpCircle size={32} />
        </div>
        <div>
          <h3 className="text-xl font-bold">Precisa de uma mãozinha?</h3>
          <p className="text-slate-300 text-sm mt-1">Nossa equipe tá de prontidão pra te ajudar com qualquer trem.</p>
        </div>
        <button className="w-full bg-emerald-uai text-white font-bold py-3 px-6 rounded-lg shadow-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
          Falar com o Suporte
          <MessageCircle size={16} />
        </button>
      </section>

      <section>
        <h3 className="text-primary text-sm font-bold uppercase tracking-wider mb-3 ml-1">Sobre o App</h3>
        <div className="bg-card-dark rounded-xl overflow-hidden border border-white/5">
          {[
            { icon: Info, label: 'Termos e Condições' },
            { icon: ShieldCheck, label: 'Privacidade' },
          ].map((item) => (
            <button key={item.label} className="flex items-center gap-4 px-4 py-4 justify-between border-b border-white/5 w-full">
              <div className="flex items-center gap-4">
                <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
                  <item.icon size={20} />
                </div>
                <p className="text-base font-medium">{item.label}</p>
              </div>
              <ChevronRight className="text-slate-500" size={20} />
            </button>
          ))}
          <div className="flex items-center gap-4 px-4 py-4 justify-between">
            <div className="flex items-center gap-4">
              <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
                <Smartphone size={20} />
              </div>
              <div>
                <p className="text-base font-medium">Versão do App</p>
                <p className="text-slate-400 text-xs">UaiTrampo v2.4.12-pro</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <button className="flex items-center justify-center gap-2 w-full py-4 text-rose-500 font-bold hover:bg-rose-500/5 rounded-xl transition-colors">
        <LogOut size={20} />
        Sair do trem
      </button>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');

  const renderScreen = () => {
    switch (screen) {
      case 'login': return <LoginScreen onNext={setScreen} />;
      case 'register': return <RegisterScreen onBack={() => setScreen('login')} onNext={setScreen} />;
      case 'verify': return <VerificationScreen onBack={() => setScreen('register')} onVerify={() => setScreen('home')} />;
      case 'home': return <HomeScreen />;
      case 'explore': return <ExploreScreen />;
      case 'profile': return <ProfileScreen onSettings={() => setScreen('settings')} />;
      case 'settings': return <SettingsScreen onBack={() => setScreen('profile')} />;
      default: return <HomeScreen />;
    }
  };

  const showNav = ['home', 'explore', 'profile'].includes(screen);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background-dark text-slate-100 font-sans selection:bg-primary selection:text-background-dark">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          {showNav && <Header />}
          {renderScreen()}
          {showNav && <BottomNav currentScreen={screen} setScreen={setScreen} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
