import React from 'react';
import { 
  Search, 
  Star, 
  Trash2, 
  Hammer, 
  Paintbrush, 
  PlugZap, 
  ShieldCheck, 
  Truck, 
  Clock,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { Provider } from '../types';
import { CategoryCard, Header } from './Common';

export const HomeScreen = ({ 
  providers, 
  isAdmin, 
  isVisitor,
  onDelete, 
  onProfile,
  onLoginRequired
}: { 
  providers: Provider[], 
  isAdmin: boolean, 
  isVisitor: boolean,
  onDelete: (id: string) => void,
  onProfile: () => void,
  onLoginRequired: () => void
}) => {
  const handleContact = (name: string) => {
    if (isVisitor) {
      toast.error('Opa! Precisa logar primeiro, sô.', {
        description: 'Faça login para entrar em contato com os melhores de Minas.'
      });
      onLoginRequired();
      return;
    }

    toast.success('Abrindo WhatsApp do prestador...');
    window.open('https://wa.me/5534996506860', '_blank');

    // Notificação de avaliação "Arroz com feijão"
    setTimeout(() => {
      toast('E aí, o serviço foi bão?', {
        description: `Como foi o atendimento com ${name}?`,
        action: {
          label: 'Avaliar Agora',
          onClick: () => toast.success('Abre tela de avaliação (Em breve!)')
        },
        duration: 10000,
      });
    }, 5000);
  };

  return (
    <div className="pb-40">
      <Header onProfile={onProfile} />
      
      <div className="p-8">
        <div className="flex flex-col gap-2 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full w-fit border border-primary/20">
            <Sparkles className="text-primary" size={14} />
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Destaques de Frutal</span>
          </div>
          <h2 className="text-5xl font-black text-white italic leading-[0.9] tracking-tighter">PRESTADORES <br /><span className="text-primary not-italic text-3xl">RECOMENDADOS</span></h2>
        </div>

        {/* Horizontal Categories with "Wow" style */}
        <div className="flex gap-6 overflow-x-auto pb-8 -mx-8 px-8 no-scrollbar">
          <CategoryCard icon={<Hammer />} label="Reparos" onClick={() => toast.info('Filtrando Reparos')} />
          <CategoryCard icon={<Paintbrush />} label="Pintura" onClick={() => toast.info('Filtrando Pintura')} />
          <CategoryCard icon={<PlugZap />} label="Elétrica" onClick={() => toast.info('Filtrando Elétrica')} />
          <CategoryCard icon={<ShieldCheck />} label="Câmeras" onClick={() => toast.info('Filtrando Câmeras')} />
        </div>

        <div className="grid gap-6 mt-4">
          {providers.map((p, idx) => (
            <motion.div 
              layout
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              key={p.id} 
              className="bg-white/5 border border-white/10 p-6 rounded-[40px] flex items-center gap-6 hover:bg-white/10 transition-all group relative backdrop-blur-md"
            >
              {isAdmin && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(p.id);
                  }}
                  className="absolute top-4 right-4 p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all z-10"
                >
                  <Trash2 size={18} />
                </button>
              )}
              
              <div className="w-24 h-24 rounded-[30px] overflow-hidden border-2 border-primary/20 bg-primary/5 shadow-2xl group-hover:border-primary transition-all">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-1.5 p-1 bg-primary/10 rounded-lg w-fit">
                  <Star size={12} className="text-primary fill-primary" />
                  <span className="text-[10px] font-black text-primary uppercase tracking-tighter">{p.reviews} AVALIAÇÕES</span>
                </div>
                <h3 className="font-black text-white text-xl tracking-tight leading-none group-hover:text-primary transition-colors">{p.name}</h3>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{p.role}</p>
                
                <button 
                  onClick={() => handleContact(p.name)}
                  className="w-full mt-4 bg-white text-background-dark py-4 rounded-2xl font-black text-[10px] tracking-[0.2em] hover:bg-primary transition-all active:scale-90 flex items-center justify-center gap-2 group/btn"
                >
                  ACORDAR TREM
                  <MessageCircle size={14} className="group-hover/btn:rotate-12 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ExploreScreen = () => (
  <div className="min-h-screen bg-background-dark p-8 pb-40 relative">
    <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[120px]" />
    
    <div className="relative z-10">
      <h2 className="text-5xl font-black text-white italic tracking-tighter leading-tight mb-10 mt-4">ENCONTRE O <br /><span className="text-primary not-italic text-4xl">PROFISSIONAL</span></h2>
      
      <div className="relative mb-12 group">
        <div className="absolute inset-0 bg-primary/5 blur-2xl group-focus-within:bg-primary/10 transition-colors" />
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={24} />
        <input 
          type="text" 
          placeholder="O que ocê precisa, sô?" 
          className="w-full bg-white/5 border border-white/10 p-6 pl-16 rounded-[30px] text-white font-bold outline-none focus:border-primary transition-all backdrop-blur-xl"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: <Truck />, label: "Mudanças", color: "bg-purple-600" },
          { icon: <Clock />, label: "Faxina", color: "bg-emerald-500" },
          { icon: <Hammer />, label: "Obras", color: "bg-orange-500" },
          { icon: <PlugZap />, label: "Ar-condicionado", color: "bg-sky-500" },
          { icon: <Paintbrush />, label: "Pintura", color: "bg-pink-500" },
          { icon: <ShieldCheck />, label: "Câmeras", color: "bg-blue-500" }
        ].map((cat, i) => (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            key={cat.label}
          >
            <CategoryCard 
              icon={cat.icon} 
              label={cat.label} 
              onClick={() => toast.info(`Explorando ${cat.label}`)} 
            />
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);
