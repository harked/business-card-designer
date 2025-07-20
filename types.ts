
export interface CardData {
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  website: string;
  tagline: string;
  logoUrl: string;
}

export interface LayoutOption {
  id: 'left' | 'center' | 'right';
  name: string;
  className: string;
}

export interface ColorScheme {
  id: string;
  name: string;
  bg: string;
  text: string;
  accent: string;
  secondaryText: string;
}

export interface FontOption {
  id: string;
  name: string;
  className: string;
}

export interface DesignOptions {
  layout: LayoutOption;
  colorScheme: ColorScheme;
  font: FontOption;
}
