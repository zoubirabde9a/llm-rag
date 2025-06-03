import { ReactNode } from 'react';

export interface NavItem {
  id: string;
  icon: ReactNode;
  label: string;
  subItems?: NavItem[];
}

export interface NavigationState {
  selectedItemId: string | null;
  selectedSubItemId: string | null;
}

export const initialNavigationState: NavigationState = {
  selectedItemId: null,
  selectedSubItemId: null,
};

// Sample CRM navigation items
export const navigationItems: NavItem[] = [
  {
    id: 'dashboard',
    icon: '📊',
    label: 'Dashboard',
    subItems: [
      { id: 'overview', icon: '📈', label: 'Overview' },
      { id: 'analytics', icon: '📉', label: 'Analytics' },
      { id: 'reports', icon: '📑', label: 'Reports' },
    ],
  },
  {
    id: 'customers',
    icon: '👥',
    label: 'Customers',
    subItems: [
      { id: 'all-customers', icon: '👤', label: 'All Customers' },
      { id: 'leads', icon: '🎯', label: 'Leads' },
      { id: 'opportunities', icon: '💫', label: 'Opportunities' },
    ],
  },
  {
    id: 'sales',
    icon: '💰',
    label: 'Sales',
    subItems: [
      { id: 'deals', icon: '🤝', label: 'Deals' },
      { id: 'forecasts', icon: '🔮', label: 'Forecasts' },
      { id: 'pipeline', icon: '📊', label: 'Pipeline' },
    ],
  },
  {
    id: 'marketing',
    icon: '📢',
    label: 'Marketing',
    subItems: [
      { id: 'campaigns', icon: '🎯', label: 'Campaigns' },
      { id: 'automation', icon: '⚡', label: 'Automation' },
      { id: 'analytics', icon: '📈', label: 'Analytics' },
    ],
  },
  {
    id: 'settings',
    icon: '⚙️',
    label: 'Settings',
    subItems: [
      { id: 'profile', icon: '👤', label: 'Profile' },
      { id: 'team', icon: '👥', label: 'Team' },
      { id: 'preferences', icon: '⚡', label: 'Preferences' },
    ],
  },
];

export const findNavItem = (items: NavItem[], id: string): NavItem | undefined => {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.subItems) {
      const found = item.subItems.find(subItem => subItem.id === id);
      if (found) return found;
    }
  }
  return undefined;
};

export const getCurrentItem = (items: NavItem[], selectedItemId: string | null): NavItem | undefined => {
  if (!selectedItemId) return undefined;
  return items.find(item => item.id === selectedItemId);
}; 