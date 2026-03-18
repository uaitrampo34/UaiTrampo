import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Provider } from '../types';
import { toast } from 'sonner';

export const useProviders = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  const getWeekSeed = () => {
    const now = new Date();
    const oneJan = new Date(now.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((now.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
    const week = Math.ceil((now.getDay() + 1 + numberOfDays) / 7);
    return `${now.getFullYear()}-${week}`;
  };

  const hashString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  };

  const fetchProviders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('providers')
      .select('*');

    if (error) {
      console.error('Erro ao buscar prestadores:', error);
      toast.error('Erro ao carregar prestadores do banco.');
    } else {
      const allProviders = data || [];
      const seed = getWeekSeed();
      
      // Filter inactive and sort deterministically by week
      const processed = allProviders
        .sort((a, b) => {
          const hashA = hashString(a.id + seed);
          const hashB = hashString(b.id + seed);
          return hashA - hashB;
        });

      setProviders(processed);
    }
    setLoading(false);
  };

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email !== 'uaitrampo34@gmail.com') {
      toast.error('Opa! Ocê não tem permissão de MESTRE pra mexer nisso, sô!');
      return false;
    }
    return true;
  };

  const deleteProvider = async (id: string) => {
    if (!(await checkAdmin())) return false;
    
    const { error } = await supabase
      .from('providers')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Erro ao excluir prestador no banco!');
      return false;
    } else {
      setProviders(prev => prev.filter(p => p.id !== id));
      toast.success('Prestador removido com sucesso!');
      return true;
    }
  };

  const addProvider = async (newP: Omit<Provider, 'id' | 'reviews'>) => {
    if (!(await checkAdmin())) return null;

    const { data, error } = await supabase
      .from('providers')
      .insert([
        {
          name: newP.name,
          role: newP.role,
          profile_img: newP.profile_img,
          portfolio: newP.portfolio || [],
          phone: newP.phone,
          categories: newP.categories,
          address: newP.address,
          subscription_expires_at: newP.subscription_expires_at,
          is_active: newP.is_active ?? true,
          reviews: 0
        }
      ])
      .select();

    if (error) {
      toast.error('Erro ao salvar prestador no banco!');
      console.error(error);
      return null;
    } else {
      if (data && data[0]) {
        setProviders(prev => [data[0], ...prev]);
        toast.success('Novo prestador cadastrado!', {
          description: `Bora trabalhar, ${newP.name}!`,
          icon: '🚀'
        });
        return data[0];
      }
      return null;
    }
  };

  const updateProvider = async (id: string, updates: Partial<Provider>) => {
    if (!(await checkAdmin())) return null;

    const { data, error } = await supabase
      .from('providers')
      .update({
        name: updates.name,
        role: updates.role,
        profile_img: updates.profile_img,
        portfolio: updates.portfolio,
        phone: updates.phone,
        categories: updates.categories,
        address: updates.address,
        subscription_expires_at: updates.subscription_expires_at,
        is_active: updates.is_active
      })
      .eq('id', id)
      .select();

    if (error) {
      toast.error('Erro ao atualizar prestador no banco!');
      console.error(error);
      return null;
    } else {
      if (data && data[0]) {
        setProviders(prev => prev.map(p => p.id === id ? data[0] : p));
        toast.success('Perfil atualizado com sucesso!', {
          icon: '✅'
        });
        return data[0];
      }
      return null;
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return { providers, loading, fetchProviders, deleteProvider, addProvider, updateProvider };
};

