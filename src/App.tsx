import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { AnimatePresence } from 'motion/react';

// --- Types & Hooks ---
import { Screen, Provider } from './types';
import { useProviders } from './hooks/useProviders';

// --- Components ---
import { Splash, BottomNav } from './components/Common';
import {
  LoginScreen,
  RegisterScreen,
  VerificationScreen,
  LoginPromptScreen,
  SuccessTransition
} from './components/Auth';
import { supabase } from './supabaseClient';
import { HomeScreen, ExploreScreen } from './components/MainScreens';
import {
  ProfileScreen,
  SettingsScreen,
  AddProviderScreen,
  EditUserProfileScreen
} from './components/UserScreens';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [screen, setScreen] = useState<Screen>('login');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVisitor, setIsVisitor] = useState(false);
  const [editingProvider, setEditingProvider] = useState<Provider | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const {
    providers,
    loading,
    deleteProvider,
    addProvider,
    updateProvider
  } = useProviders();

  // 1. Splash Timer
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // 2. centralized Auth Listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth Event:', event, session?.user?.email);
      
      if (event === 'SIGNED_IN' || (event === 'INITIAL_SESSION' && session)) {
        const adminStatus = session?.user?.email === 'uaitrampo34@gmail.com';
        setIsAdmin(adminStatus);
        setIsVisitor(false);
        
        // Only show transition for active logins, not initial loads
        if (event === 'SIGNED_IN') {
          setIsTransitioning(true);
          setTimeout(() => {
            setIsTransitioning(false);
            setScreen('home');
          }, 1500);
        } else {
          setScreen('home');
        }
      } else if (event === 'SIGNED_OUT') {
        setIsAdmin(false);
        setIsVisitor(false);
        setScreen('login');
      }
      
      setSessionLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = (adminStatus: boolean) => {
    // This is now redundant as onAuthStateChange handles it,
    // but we can keep it for explicit UI feedback if needed.
    // However, moving to home is handled by the listener.
  };

  const handleVisitorAccess = () => {
    setIsVisitor(true);
    setIsAdmin(false);
    setScreen('home');
  };

  const handleSaveProvider = async (p: Omit<Provider, 'id' | 'reviews'>) => {
    if (editingProvider) {
      const result = await updateProvider(editingProvider.id, p);
      if (result) {
        setEditingProvider(null);
        setScreen('home');
      }
    } else {
      const result = await addProvider(p);
      if (result) {
        setScreen('home');
      }
    }
  };

  const handleEditProvider = (p: Provider) => {
    setEditingProvider(p);
    setScreen('add-provider');
  };

  const renderScreen = () => {
    // Show nothing or a smooth background while checking session
    if (sessionLoading) return <div className="min-h-screen bg-background-dark" />;
    
    // Safety buffer after login to prevent accidental clicks
    if (isTransitioning) return <SuccessTransition isAdmin={isAdmin} />;

    if (loading && screen === 'home') {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background-dark">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-primary font-bold uppercase tracking-widest animate-pulse">Buscando os trens...</p>
          </div>
        </div>
      );
    }

    switch (screen) {
      case 'login':
        return <LoginScreen onNext={setScreen} onVisitor={handleVisitorAccess} />;
      case 'register':
        return <RegisterScreen onNext={setScreen} />;
      case 'verify':
        return <VerificationScreen onVerify={() => setScreen('home')} />;
      case 'login-prompt':
        return <LoginPromptScreen onBack={() => setScreen('login')} onLogin={handleLogin} />;
      case 'home':
        return (
          <HomeScreen
            providers={providers}
            isAdmin={isAdmin}
            isVisitor={isVisitor}
            onDelete={deleteProvider}
            onEdit={handleEditProvider}
            onProfile={() => setScreen('profile')}
            onLoginRequired={() => setScreen('login-prompt')}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        );
      case 'explore':
        return (
          <ExploreScreen
            onCategorySelect={(cat) => {
              setActiveFilter(cat);
              setScreen('home');
            }}
          />
        );
      case 'profile':
        return <ProfileScreen isAdmin={isAdmin} isVisitor={isVisitor} onNext={setScreen} providersCount={providers.length} />;
      case 'settings':
        return <SettingsScreen onBack={() => setScreen('profile')} />;
      case 'add-provider':
        return (
          <AddProviderScreen
            onBack={() => {
              setEditingProvider(null);
              setScreen('profile');
            }}
            onAdd={handleSaveProvider}
            providerToEdit={editingProvider}
          />
        );
      case 'edit-profile':
        return (
          <EditUserProfileScreen
            onBack={() => setScreen('profile')}
            onUpdate={() => setScreen('profile')}
          />
        );
      default:
        return <LoginScreen onNext={setScreen} onVisitor={handleVisitorAccess} />;
    }
  };

  if (showSplash) return <Splash />;

  return (
    <div className="min-h-screen bg-background-dark font-sans selection:bg-primary/30 text-white overflow-x-hidden">
      <Toaster position="top-center" expand={true} richColors closeButton theme="dark" />

      <main className="max-w-md mx-auto min-h-screen relative shadow-2xl shadow-black/50 bg-background-dark">
        <AnimatePresence mode="wait">
          {renderScreen()}
        </AnimatePresence>

        {['home', 'explore', 'profile'].includes(screen) && (
          <BottomNav screen={screen} setScreen={setScreen} />
        )}
      </main>
    </div>
  );
}
