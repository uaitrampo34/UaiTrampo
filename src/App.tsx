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
  LoginPromptScreen 
} from './components/Auth';
import { HomeScreen, ExploreScreen } from './components/MainScreens';
import { 
  ProfileScreen, 
  SettingsScreen, 
  AddProviderScreen 
} from './components/UserScreens';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [screen, setScreen] = useState<Screen>('login');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVisitor, setIsVisitor] = useState(false);
  
  const { 
    providers, 
    loading, 
    deleteProvider, 
    addProvider 
  } = useProviders();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (adminStatus: boolean) => {
    setIsAdmin(adminStatus);
    setIsVisitor(false);
    setScreen('home');
  };

  const handleVisitorAccess = () => {
    setIsVisitor(true);
    setIsAdmin(false);
    setScreen('home');
  };

  const handleAddProvider = async (newP: Omit<Provider, 'id' | 'reviews'>) => {
    const result = await addProvider(newP);
    if (result) {
      setScreen('home');
    }
  };

  const renderScreen = () => {
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
            onProfile={() => setScreen('profile')} 
            onLoginRequired={() => setScreen('login-prompt')}
          />
        );
      case 'explore': 
        return <ExploreScreen />;
      case 'profile': 
        return <ProfileScreen isAdmin={isAdmin} onNext={setScreen} />;
      case 'settings': 
        return <SettingsScreen onBack={() => setScreen('profile')} />;
      case 'add-provider': 
        return <AddProviderScreen onBack={() => setScreen('profile')} onAdd={handleAddProvider} />;
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
