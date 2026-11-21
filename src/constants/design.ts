import { Platform, StyleSheet } from 'react-native';

export const Palette = {
  primary: '#6B4FB6',
  primaryDeep: '#51368F',
  primarySoft: '#EDE7FA',
  primarySofter: '#F6F2FD',
  lilac: '#C9B8EF',
  background: '#FBF9FE',
  surface: '#FFFFFF',
  surfaceMuted: '#F4F0FA',
  border: '#E5DDF3',
  text: '#2E2542',
  textSecondary: '#635A77',
  onPrimary: '#FFFFFF',
  onSoft: '#3B2C63',
  blush: '#FBE9F1',
  blushInk: '#7A3E5C',
  mint: '#E3F5EC',
  mintInk: '#2F6B4B',
  amber: '#FFF3D9',
  amberInk: '#7A5A1E',
  white: '#FFFFFF',
  transparent: 'transparent',
} as const;

export const Typography = StyleSheet.create({
  display: {
    fontSize: 32,
    lineHeight: 39,
    fontWeight: '700',
    color: Palette.text,
  },
  title: {
    fontSize: 26,
    lineHeight: 33,
    fontWeight: '700',
    color: Palette.text,
  },
  heading: {
    fontSize: 20,
    lineHeight: 27,
    fontWeight: '700',
    color: Palette.text,
  },
  body: {
    fontSize: 17,
    lineHeight: 25,
    fontWeight: '400',
    color: Palette.text,
  },
  bodyStrong: {
    fontSize: 17,
    lineHeight: 25,
    fontWeight: '600',
    color: Palette.text,
  },
  small: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
    color: Palette.textSecondary,
  },
  smallStrong: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
    color: Palette.textSecondary,
  },
  caption: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
    letterSpacing: 0.2,
    color: Palette.textSecondary,
  },
  button: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const Radius = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  pill: 999,
} as const;

export const Shadows = {
  card: Platform.select({
    ios: {
      shadowColor: Palette.primaryDeep,
      shadowOpacity: 0.1,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 6 },
    },
    android: { elevation: 4 },
    default: {},
  }),
  lifted: Platform.select({
    ios: {
      shadowColor: Palette.primaryDeep,
      shadowOpacity: 0.16,
      shadowRadius: 22,
      shadowOffset: { width: 0, height: 10 },
    },
    android: { elevation: 7 },
    default: {},
  }),
} as const;

export const TouchTarget = {
  minHeight: 56,
  minWidth: 56,
  compact: 44,
} as const;

export const MaxContentWidth = 640;
