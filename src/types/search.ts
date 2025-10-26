
import { ReactNode } from 'react';

export interface SearchResult {
  type: 'page' | 'setting' | 'tool' | 'article';
  title: string;
  description?: string;
  icon?: ReactNode;
  href: string;
}
