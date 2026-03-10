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
  profile_img: string;
  portfolio: string[];
  created_at?: string;
}
