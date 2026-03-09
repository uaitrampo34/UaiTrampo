export type Screen = 
  | 'login' 
  | 'register' 
  | 'verify' 
  | 'home' 
  | 'explore' 
  | 'profile' 
  | 'settings' 
  | 'login-prompt' 
  | 'add-provider';

export interface Provider {
  id: string;
  name: string;
  role: string;
  reviews: number;
  img: string;
  created_at?: string;
}
