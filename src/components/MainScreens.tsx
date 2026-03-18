import React, { useState } from 'react';
import {
  Search,
  Star,
  Trash2,
  Hammer,
  Paintbrush,
  PlugZap,
  Droplets,
  ShieldCheck,
  Truck,
  Clock,
  Sparkles,
  MessageCircle,
  ArrowRight,
  Scissors,
  Wrench,
  HardHat,
  Monitor,
  Heart,
  Car,
  Dog,
  Leaf,
  Utensils,
  Sun,
  MapPin,
  UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { Provider } from '../types';
import { CategoryCard, Header, CATEGORIES } from './Common';

const PortfolioCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-sm aspect-[4/5] mt-12 group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full h-full rounded-[50px] overflow-hidden border-4 border-white/10 shadow-2xl shadow-black/50"
        >
          <img
            src={images[currentIndex]}
            alt={`Foto ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 p-4 bg-black/50 border border-white/10 rounded-full text-white backdrop-blur-md active:scale-90 transition-transform shadow-xl z-20"
          >
            <ArrowRight className="rotate-180" size={20} strokeWidth={3} />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 top-1/2 -translate-y-1/2 p-4 bg-black/50 border border-white/10 rounded-full text-white backdrop-blur-md active:scale-90 transition-transform shadow-xl z-20"
          >
            <ArrowRight size={20} strokeWidth={3} />
          </button>

          {/* Indicators */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-white/20'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ProviderCTA = ({ isFull }: { isFull?: boolean }) => {
  const handleJoin = () => {
    const phone = '5534996506860';
    const message = encodeURIComponent('Olá! Vi o UaiTrampo e gostaria de saber mais sobre como ser um prestador parceiro, sô!');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  if (isFull) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 p-8 bg-emerald-uai/5 border-2 border-dashed border-emerald-uai/20 rounded-[40px] flex flex-col items-center text-center gap-6 backdrop-blur-sm"
      >
        <div className="w-20 h-20 bg-emerald-uai/20 rounded-[30px] flex items-center justify-center text-emerald-uai">
          <UserPlus size={40} strokeWidth={2.5} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-white italic tracking-tighter">BORA TRAMPAR <br /><span className="text-emerald-uai not-italic">COM A GENTE?</span></h3>
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest px-4">Mostre seu talento pros mineiros de Frutal e região!</p>
        </div>
        <button
          onClick={handleJoin}
          className="w-full bg-emerald-uai text-background-dark py-6 rounded-[30px] font-black text-lg active:scale-95 shadow-2xl shadow-emerald-uai/20 transition-all flex items-center justify-center gap-3 font-sans"
        >
          UAI SÔ, VÊM TRAMPAR CÔ NÓIS!?
          <ArrowRight size={20} strokeWidth={3} />
        </button>
      </motion.div>
    );
  }

  return (
    <button
      onClick={handleJoin}
      className="w-full mt-8 p-6 bg-emerald-uai/10 border-2 border-emerald-uai/30 rounded-[35px] flex items-center justify-between group hover:bg-emerald-uai transition-all active:scale-95"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-emerald-uai/20 rounded-2xl group-hover:bg-white/20 transition-all">
          <HardHat className="text-emerald-uai group-hover:text-background-dark" size={24} />
        </div>
        <div className="text-left">
          <span className="text-emerald-uai font-black text-[12px] uppercase tracking-widest group-hover:text-background-dark block leading-none mb-1">TRABALHE CONOSCO</span>
          <span className="text-[10px] text-white font-black italic tracking-tighter group-hover:text-background-dark/80">uai sô, vêm trampar cô nóis!?</span>
        </div>
      </div>
      <div className="p-3 bg-white/5 rounded-xl group-hover:bg-background-dark/10 transition-colors">
        <ArrowRight size={18} className="text-emerald-uai group-hover:text-background-dark group-hover:translate-x-1 transition-all" strokeWidth={3} />
      </div>
    </button>
  );
};

export const HomeScreen = ({
  providers,
  isAdmin,
  isVisitor,
  onDelete,
  onEdit,
  onProfile,
  onLoginRequired,
  activeFilter,
  setActiveFilter
}: {
  providers: Provider[],
  isAdmin: boolean,
  isVisitor: boolean,
  onDelete: (id: string) => void,
  onEdit: (p: Provider) => void,
  onProfile: () => void,
  onLoginRequired: () => void,
  activeFilter: string | null,
  setActiveFilter: (cat: string | null) => void
}) => {
  const [selectedPortfolio, setSelectedPortfolio] = useState<Provider | null>(null);

  const filteredProviders = activeFilter
    ? providers.filter(p => p.categories?.includes(activeFilter))
    : providers;

  const handleContact = (name: string) => {
    if (isVisitor) {
      toast.error('Opa! Precisa logar primeiro, sô.', {
        description: 'Faça login para entrar em contato com os melhores de Minas.'
      });
      onLoginRequired();
      return;
    }

    toast.success('Abrindo WhatsApp do prestador...');
    const providerPhone = providers.find(p => p.name === name)?.phone || '5534996506860';
    // Clean phone number (remove non-digits)
    const cleanPhone = providerPhone.replace(/\D/g, '');
    // Ensure it starts with 55 if length is 11 (standard BR mobile)
    const finalPhone = cleanPhone.length === 11 ? `55${cleanPhone}` : cleanPhone;
    const message = encodeURIComponent(`Olá ${name}! Vi seu perfil no UaiTrampo e gostaria de um orçamento, sô!`);

    window.open(`https://wa.me/${finalPhone}?text=${message}`, '_blank');
  };

  return (
    <div className="pb-40">
      <Header onProfile={onProfile} />
      
      <div className="px-4 sm:px-6 pt-32">
        <div className="flex flex-col gap-2 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full w-fit border border-primary/20">
            <Sparkles className="text-primary" size={14} />
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Destaques de Frutal</span>
          </div>
          <h2 className="text-5xl font-black text-white italic leading-[0.9] tracking-tighter">PRESTADORES <br /><span className="text-primary not-italic text-3xl">RECOMENDADOS</span></h2>
        </div>

        {/* Horizontal Categories with "Wow" style */}
        <div className="flex gap-6 overflow-x-auto pb-8 -mx-8 px-8 no-scrollbar">
          <CategoryCard
            icon={<Sparkles />}
            label="Ver Todos"
            onClick={() => setActiveFilter(null)}
            color={!activeFilter ? 'primary' : undefined}
          />
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.id}
              icon={cat.icon}
              label={cat.label}
              onClick={() => setActiveFilter(cat.label)}
              color={activeFilter === cat.label ? 'primary' : undefined}
            />
          ))}
        </div>
        
        <ProviderCTA />

        <div className="grid gap-6 mt-12 pb-20">
          {filteredProviders.length === 0 ? (
            <ProviderCTA isFull />
          ) : filteredProviders.map((p, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              key={p.id} 
              onClick={() => setSelectedPortfolio(p)}
              className={`bg-white/5 border border-white/10 p-4 sm:p-6 rounded-[30px] sm:rounded-[40px] flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 hover:bg-white/10 transition-all group relative backdrop-blur-md ${p.portfolio && p.portfolio.length > 0 ? 'cursor-pointer active:scale-98' : ''}`}
            >
              {isAdmin && (
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(p);
                    }}
                    className="p-3 bg-white/10 text-white rounded-2xl hover:bg-primary hover:text-background-dark transition-all"
                  >
                    <Wrench size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(p.id);
                    }}
                    className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )}

              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-[25px] sm:rounded-[30px] overflow-hidden border-2 border-primary/20 bg-primary/5 shadow-2xl group-hover:border-primary transition-all relative flex-shrink-0">
                <img src={p.profile_img} alt={p.name} className="w-full h-full object-cover transition-all duration-700" />
                {p.portfolio && p.portfolio.length > 0 && (
                  <div className="absolute bottom-1 right-1 bg-primary text-background-dark text-[8px] font-black px-1.5 py-0.5 rounded-lg shadow-lg">
                    +{p.portfolio.length} FOTOS
                  </div>
                )}
              </div>

              <div className="flex-1 w-full space-y-2 text-center sm:text-left">
                <div className="flex items-center gap-1.5 p-1 bg-primary/10 rounded-lg w-fit mx-auto sm:mx-0">
                  <Star size={12} className="text-primary fill-primary" />
                  <span className="text-[10px] font-black text-primary uppercase tracking-tighter">{p.reviews} AVALIAÇÕES</span>
                </div>
                <h3 className="font-black text-white text-xl tracking-tight leading-none group-hover:text-primary transition-colors">{p.name}</h3>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{p.role}</p>
                
                {p.categories && p.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1 justify-center sm:justify-start pt-1">
                    {p.categories.map(cat => (
                      <span key={cat} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-[8px] font-bold text-white/30 uppercase tracking-tighter">
                        {cat}
                      </span>
                    ))}
                  </div>
                )}

                {p.address && (
                  <div className="flex items-center gap-1.5 pt-1 justify-center sm:justify-start">
                    <MapPin size={10} className="text-primary" />
                    <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest truncate">{p.address}</span>
                  </div>
                )}

                <button
                  onClick={() => handleContact(p.name)}
                  className="w-full mt-4 bg-white text-background-dark py-4 rounded-2xl font-black text-[10px] tracking-[0.2em] hover:bg-primary transition-all active:scale-90 flex items-center justify-center gap-2 group/btn"
                >
                  MANDAR UM ZAP
                  <MessageCircle size={14} className="group-hover/btn:rotate-12 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPortfolio && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-6 backdrop-blur-xl"
          >
            <div className="absolute top-8 left-8 right-8 flex items-center justify-between z-10">
              <div className="space-y-1">
                <h3 className="text-primary font-black text-[10px] uppercase tracking-[0.3em]">PORTFÓLIO</h3>
                <p className="text-white font-black text-2xl italic tracking-tighter">{selectedPortfolio.name}</p>
              </div>
              <button
                onClick={() => setSelectedPortfolio(null)}
                className="p-4 bg-white/10 rounded-2xl border border-white/10 text-white active:scale-90 transition-transform backdrop-blur-md"
              >
                <ArrowRight size={24} className="rotate-180" />
              </button>
            </div>

            <PortfolioCarousel images={selectedPortfolio.portfolio} />

            <div className="absolute bottom-10 text-[8px] font-black text-white/20 uppercase tracking-[1em]">
              TREM DESLIZANTE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ExploreScreen = ({ onCategorySelect }: { onCategorySelect: (cat: string) => void }) => (
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
        {CATEGORIES.map((cat, i) => (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            key={cat.id}
          >
            <CategoryCard
              icon={cat.icon}
              label={cat.label}
              onClick={() => onCategorySelect(cat.label)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);
