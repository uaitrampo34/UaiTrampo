import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Ad } from '../types';
import { toast } from 'sonner';

export const useAds = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email !== 'uaitrampo34@gmail.com') {
      toast.error('Opa! Ocê não tem permissão de MESTRE pra mexer nisso, sô!');
      return false;
    }
    return true;
  };

  const fetchAds = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('ads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar anúncios:', error);
      toast.error('Erro ao carregar anúncios do banco.');
    } else {
      setAds(data || []);
    }
    setLoading(false);
  };

  const addAd = async (newAd: Omit<Ad, 'id' | 'created_at'>) => {
    if (!(await checkAdmin())) return null;

    const { data, error } = await supabase
      .from('ads')
      .insert([{
        image_url: newAd.image_url,
        company_name: newAd.company_name,
        link_url: newAd.link_url,
        is_active: newAd.is_active ?? true
      }])
      .select();

    if (error) {
      toast.error('Erro ao salvar anúncio no banco!');
      console.error(error);
      return null;
    } else {
      if (data && data[0]) {
        setAds(prev => [data[0], ...prev]);
        toast.success('Novo anúncio cadastrado!');
        return data[0];
      }
      return null;
    }
  };

  const updateAd = async (id: string, updates: Partial<Ad>) => {
    if (!(await checkAdmin())) return null;

    const { data, error } = await supabase
      .from('ads')
      .update({
        image_url: updates.image_url,
        company_name: updates.company_name,
        link_url: updates.link_url,
        is_active: updates.is_active
      })
      .eq('id', id)
      .select();

    if (error) {
      toast.error('Erro ao atualizar anúncio no banco!');
      console.error(error);
      return null;
    } else {
      if (data && data[0]) {
        setAds(prev => prev.map(a => a.id === id ? data[0] : a));
        toast.success('Anúncio atualizado com sucesso!');
        return data[0];
      }
      return null;
    }
  };

  const deleteAd = async (id: string) => {
    if (!(await checkAdmin())) return false;

    const { error } = await supabase
      .from('ads')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Erro ao excluir anúncio no banco!');
      return false;
    } else {
      setAds(prev => prev.filter(a => a.id !== id));
      toast.success('Anúncio removido com sucesso!');
      return true;
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return { ads, loading, fetchAds, addAd, updateAd, deleteAd };
};
