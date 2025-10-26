
export interface User {
  id: string;
  email?: string;
  app_metadata?: {
    provider?: string;
    [key: string]: any;
  };
  user_metadata?: {
    [key: string]: any;
  };
  aud?: string;
  created_at?: string;
  [key: string]: any;
}

export interface Profile {
  id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  website?: string;
  company?: string;
  bio?: string;
  created_at?: string;
  updated_at?: string;
}
