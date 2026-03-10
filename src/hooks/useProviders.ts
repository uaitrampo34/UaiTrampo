import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Provider } from '../types';
import { toast } from 'sonner';

export const useProviders = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProviders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('providers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar prestadores:', error);
      toast.error('Erro ao carregar prestadores do banco.');
    } else {
      setProviders(data || []);
    }
    setLoading(false);
  };

  const deleteProvider = async (id: string) => {
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
    const { data, error } = await supabase
      .from('providers')
      .insert([
        {
          name: newP.name,
          role: newP.role,
          profile_img: newP.profile_img,
          portfolio: newP.portfolio || [],
          phone: newP.phone,
          category: newP.category,
          address: newP.address,
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
    const { data, error } = await supabase
      .from('providers')
      .update({
        name: updates.name,
        role: updates.role,
        profile_img: updates.profile_img,
        portfolio: updates.portfolio,
        phone: updates.phone,
        category: updates.category,
        address: updates.address
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
