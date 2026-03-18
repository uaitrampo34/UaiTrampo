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
  | 'edit-profile'
  | 'privacy-policy';

export interface Provider {
  id: string;
  name: string;
  role: string;
  reviews: number;
  profile_img: string;
  portfolio: string[];
  phone?: string;
  categories: string[];
  address?: string;
  created_at?: string;
}
