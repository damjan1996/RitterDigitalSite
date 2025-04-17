// src/types/index.ts

// Exportiere alle Typen aus den spezifischen Dateien
export * from './common';
export * from './blog';
export * from './services';
export * from './forms';

// Allgemeine Projekt-spezifische Typen
export type Theme = 'light' | 'dark' | 'system';

export type Locale = 'de' | 'en';

export type ViewMode = 'list' | 'grid' | 'compact';

export type SortDirection = 'asc' | 'desc';

export type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: number;
};

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type Alignment = 'left' | 'center' | 'right';

export type Spacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'outline'
  | 'ghost'
  | 'link'
  | 'danger';

export type InputSize = 'sm' | 'md' | 'lg';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export type Toast = {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center';
  onClose?: () => void;
};

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type Position = 'top' | 'right' | 'bottom' | 'left';

export type Direction = 'horizontal' | 'vertical';

export type LayoutType = 'default' | 'blog' | 'landing' | 'admin';

export type Device = 'mobile' | 'tablet' | 'desktop';

export type ColorScheme =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'tertiary'
  | 'background'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';
