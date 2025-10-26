
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  path: string;
  name: string;
  icon: LucideIcon;
  description: string;
}

export interface NavGroup {
  name: string;
  path?: string;
  icon: LucideIcon;
  description: string;
  items?: NavItem[];
}
