
import { LayoutOption, ColorScheme, FontOption } from './types';

export const LAYOUT_OPTIONS: LayoutOption[] = [
  { id: 'left', name: 'Left', className: 'items-start text-left' },
  { id: 'center', name: 'Center', className: 'items-center text-center' },
  { id: 'right', name: 'Right', className: 'items-end text-right' },
];

export const COLOR_SCHEMES: ColorScheme[] = [
  { id: 'azure', name: 'Azure & Cloud', bg: 'bg-white', text: 'text-gray-800', accent: 'text-sky-600', secondaryText: 'text-gray-500' },
  { id: 'onyx', name: 'Onyx & Ivory', bg: 'bg-gray-900', text: 'text-white', accent: 'text-amber-400', secondaryText: 'text-gray-300' },
  { id: 'mint', name: 'Mint & Charcoal', bg: 'bg-emerald-50', text: 'text-gray-900', accent: 'text-emerald-600', secondaryText: 'text-gray-600' },
  { id: 'crimson', name: 'Crimson & Slate', bg: 'bg-rose-900', text: 'text-rose-100', accent: 'text-rose-300', secondaryText: 'text-rose-200' },
  { id: 'mono', name: 'Monochrome', bg: 'bg-gray-100', text: 'text-black', accent: 'text-black', secondaryText: 'text-gray-700' },
];

export const FONT_OPTIONS: FontOption[] = [
  { id: 'inter', name: 'Inter', className: 'font-sans' },
  { id: 'lora', name: 'Lora', className: 'font-serif' },
  { id: 'inconsolata', name: 'Inconsolata', className: 'font-mono' },
];
