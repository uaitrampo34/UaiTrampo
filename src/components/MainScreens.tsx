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
  Clock 
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { Provider } from '../types';
import { CategoryCard, Header, BottomNav } from './Common';

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

    // "Arroz com feijão": Notificação de avaliação após o contato
    setTimeout(() => {
      toast('E aí, o serviço foi bão?', {
        description: `Como foi o atendimento com ${name}?`,
        action: {
          label: 'Avaliar Agora',
          onClick: () => toast.success('Abre tela de avaliação (Em breve!)')
        },
        duration: 10000,
      });
    }, 5000); // 5 segundos após clicar
  };

  return (
    <div className="pb-32">
      <Header onProfile={onProfile} />
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-white italic leading-none tracking-tighter">PRESTADORES <br /><span className="text-primary not-italic">RECOMENDADOS</span></h2>
          <button onClick={() => toast.info('Carregando todos os profissionais...')} className="text-primary text-xs font-bold uppercase tracking-widest border-b-2 border-primary pb-1">Ver todas</button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-6 -mx-6 px-6 no-scrollbar">
          <CategoryCard icon={<Hammer />} label="Reparos" color="bg-orange-500" onClick={() => toast.info('Filtrando por Reparos...')} />
          <CategoryCard icon={<Paintbrush />} label="Pintura" color="bg-pink-500" onClick={() => toast.info('Filtrando por Pintura...')} />
          <CategoryCard icon={<PlugZap />} label="Elétrica" color="bg-yellow-500" onClick={() => toast.info('Filtrando por Elétrica...')} />
          <CategoryCard icon={<ShieldCheck />} label="Segurança" color="bg-blue-500" onClick={() => toast.info('Filtrando por Segurança...')} />
        </div>

        <div className="grid gap-4 mt-4">
          {providers.map((p) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={p.id} 
              className="bg-white/5 border border-white/10 p-4 rounded-3xl flex items-center gap-4 hover:bg-white/10 transition-all group relative"
            >
              {isAdmin && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(p.id);
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all z-10"
                >
                  <Trash2 size={16} />
                </button>
              )}
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/20 bg-primary/10">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-1">
                  <Star size={12} className="text-primary fill-primary" />
                  <span className="text-xs font-bold text-primary">{p.reviews} avaliações</span>
                </div>
                <h3 className="font-bold text-white text-lg">{p.name}</h3>
                <p className="text-white/40 text-sm font-medium">{p.role}</p>
              </div>
              <button 
                onClick={() => handleContact(p.name)}
                className="bg-white text-background-dark p-3 rounded-2xl font-black text-xs hover:bg-primary transition-all active:scale-90"
              >
                CHAMAR
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ExploreScreen = () => (
  <div className="min-h-screen bg-background-dark p-6 pb-32">
    <h2 className="text-4xl font-black text-white italic tracking-tighter mb-8 mt-4">EXPLORAR <br /><span className="text-primary not-italic">SERVIÇOS</span></h2>
    
    <div className="relative mb-8">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
      <input 
        type="text" 
        placeholder="O que você tá precisando hoje?" 
        className="w-full bg-white/5 border border-white/10 p-6 pl-12 rounded-3xl text-white font-bold outline-none focus:border-primary transition-all backdrop-blur-md"
      />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <CategoryCard icon={<Truck />} label="Mudanças" color="bg-purple-600" onClick={() => toast.info('Abrindo Mudanças...')} />
      <CategoryCard icon={<Clock />} label="Faxina" color="bg-emerald-500" onClick={() => toast.info('Abrindo Faxina...')} />
      <CategoryCard icon={<Hammer />} label="Obras" color="bg-orange-500" onClick={() => toast.info('Abrindo Obras...')} />
      <CategoryCard icon={<PlugZap />} label="Ar-condicionado" color="bg-sky-500" onClick={() => toast.info('Abrindo Ar-condicionado...')} />
      <CategoryCard icon={<Paintbrush />} label="Decoradores" color="bg-pink-500" onClick={() => toast.info('Abrindo Decoradores...')} />
      <CategoryCard icon={<ShieldCheck />} label="Câmeras" color="bg-blue-500" onClick={() => toast.info('Abrindo Câmeras...')} />
    </div>
  </div>
);
