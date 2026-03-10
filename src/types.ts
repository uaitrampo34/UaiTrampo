export type Screen =
  | 'login'
  | 'register'
  | 'verify'
  | 'home'
  | 'explore'
  | 'profile'
  | 'settings'
  | 'login-prompt'
  | 'add-provider'
  | 'edit-profile';

export interface Provider {
  id: string;
  name: string;
  role: string;
  reviews: number;
  profile_img: string;
  portfolio: string[];
  phone?: string;
  category?: string;
  address?: string;
  created_at?: string;
}
