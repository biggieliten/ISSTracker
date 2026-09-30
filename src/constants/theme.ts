/**
 * Design tokens for the app: colors (light + dark), typography, spacing, radii, etc.
 * Use `useTheme()` from `@/hooks/useTheme` to get the colors for the active scheme.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#0F1115',
    textSecondary: '#60646C',
    background: '#F0F0F3',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E0E1E6',
    surface: '#FFFFFF',
    border: '#E2E8F0',
    primary: '#2563EB',
    primaryMuted: 'rgba(37, 99, 235, 0.12)',
    onPrimary: '#FFFFFF',
    success: '#16A34A',
    successMuted: 'rgba(22, 163, 74, 0.12)',
    icon: '#0F1115',
    switchTrackOff: '#CBD5E1',
    switchTrackOn: '#93C5FD',
    switchThumbOff: '#F8FAFC',
  },
  dark: {
    text: '#FFFFFF',
    textSecondary: '#B0B4BA',
    background: '#323335',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    surface: '#131314',
    border: '#3A3C40',
    primary: '#2563EB',
    primaryMuted: 'rgba(37, 99, 235, 0.15)',
    onPrimary: '#FFFFFF',
    success: '#22C55E',
    successMuted: 'rgba(34, 197, 94, 0.15)',
    icon: '#FFFFFF',
    switchTrackOff: '#475569',
    switchTrackOn: '#1D4ED8',
    switchThumbOff: '#CBD5E1',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;
export type ThemeColors = Record<ThemeColor, string>;
export type ColorSchemeName = keyof typeof Colors;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const FontSize = {
  xs: 12,
  sm: 13,
  md: 14,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 30,
  display: 56,
} as const;

export const FontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const LineHeight = {
  body: 20,
  display: 62,
} as const;

export const LetterSpacing = {
  label: 1.5,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const BorderWidth = {
  thin: 1,
  accent: 4,
} as const;

export const IconSize = {
  sm: 18,
  md: 30,
  lg: 36,
} as const;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
