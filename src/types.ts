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
  | 'privacy-policy'
  | 'manage-ads';

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
  subscription_expires_at?: string;
  is_active?: boolean;
}

export interface Ad {
  id: string;
  image_url: string;
  company_name: string;
  link_url?: string;
  is_active?: boolean;
  created_at?: string;
}
