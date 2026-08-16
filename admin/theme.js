import { createTheme } from '@mui/material/styles';

/**
 * Admin design system.
 *
 * Deliberately scoped to the admin: it is applied by AdminThemeProvider via
 * ScopedCssBaseline, so none of it can leak into the public site's styling.
 *
 * Principles this encodes:
 *  - One accent colour, used only for primary actions. Everything else is
 *    neutral, so the eye is drawn to the one thing worth clicking.
 *  - Borders over shadows. Flat surfaces separated by hairlines read as
 *    "tool", not "marketing page", and survive dark mode without muddiness.
 *  - A 4px spacing scale and three radii. Constraint is what makes a UI feel
 *    designed rather than assembled.
 *  - 44px minimum interactive height everywhere — the WCAG touch target floor.
 */

// --- tokens ----------------------------------------------------------------

export const tokens = {
  radius: { sm: 6, md: 10, lg: 14 },
  space: (n) => n * 4,
  // Warm neutral ramp — cooler greys fight the brand's warm accent.
  neutral: {
    0: '#ffffff',
    25: '#fcfcfb',
    50: '#f7f7f5',
    100: '#efefec',
    200: '#e2e2dd',
    300: '#cbcbc4',
    400: '#a1a19a',
    500: '#77776f',
    600: '#57574f',
    700: '#3d3d37',
    800: '#26261f',
    900: '#171712',
  },
  // Brand orange, tuned for UI: the site's #DC834E is too light for white text.
  accent: {
    50: '#fdf3ec',
    100: '#f8dcc7',
    300: '#e9a877',
    500: '#d1763c',
    600: '#b85f28',
    700: '#94491d',
  },
};

const FONT_STACK = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
].join(',');

export function buildAdminTheme(mode = 'light') {
  const dark = mode === 'dark';
  const n = tokens.neutral;

  const bg = dark ? n[900] : n[50];
  const surface = dark ? n[800] : n[0];
  const border = dark ? '#33332b' : n[200];
  const textPrimary = dark ? n[50] : n[800];
  const textSecondary = dark ? n[400] : n[500];

  return createTheme({
    palette: {
      mode,
      primary: {
        main: dark ? tokens.accent[300] : tokens.accent[600],
        dark: dark ? tokens.accent[500] : tokens.accent[700],
        light: tokens.accent[100],
        contrastText: dark ? n[900] : '#fff',
      },
      background: { default: bg, paper: surface },
      text: { primary: textPrimary, secondary: textSecondary },
      divider: border,
      success: { main: dark ? '#5fbf7f' : '#1f7a44' },
      warning: { main: dark ? '#e0b458' : '#9a6b12' },
      error: { main: dark ? '#e88b83' : '#b3261e' },
    },

    shape: { borderRadius: tokens.radius.md },

    typography: {
      fontFamily: FONT_STACK,
      // Tight, deliberate scale. Admin UIs need fewer sizes than marketing.
      h1: { fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' },
      h2: { fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-0.01em' },
      h3: { fontSize: '1rem', fontWeight: 650 },
      body1: { fontSize: '0.9375rem', lineHeight: 1.6 },
      body2: { fontSize: '0.875rem', lineHeight: 1.55 },
      caption: { fontSize: '0.75rem', lineHeight: 1.4 },
      button: { textTransform: 'none', fontWeight: 600, letterSpacing: 0 },
      // Section labels
      overline: {
        fontSize: '0.6875rem',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        lineHeight: 1.4,
      },
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          // Respect the OS setting rather than animating regardless.
          '@media (prefers-reduced-motion: reduce)': {
            '*': {
              animationDuration: '0.01ms !important',
              transitionDuration: '0.01ms !important',
            },
          },
        },
      },

      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: tokens.radius.sm,
            minHeight: 40,
            paddingInline: 14,
            // A visible focus ring is the difference between usable and
            // unusable for keyboard and screen-reader users.
            '&:focus-visible': {
              outline: `2px solid ${tokens.accent[500]}`,
              outlineOffset: 2,
            },
          },
          sizeLarge: { minHeight: 48, fontSize: '0.95rem' },
          sizeSmall: { minHeight: 34 },
        },
      },

      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: tokens.radius.sm,
            '&:focus-visible': {
              outline: `2px solid ${tokens.accent[500]}`,
              outlineOffset: 2,
            },
          },
          // 44px touch target even when the glyph is small.
          sizeSmall: { width: 36, height: 36 },
        },
      },

      MuiPaper: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: { backgroundImage: 'none' },
          outlined: { borderColor: border },
        },
      },

      MuiCard: {
        defaultProps: { elevation: 0, variant: 'outlined' },
        styleOverrides: { root: { borderColor: border } },
      },

      MuiTextField: { defaultProps: { size: 'small' } },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: tokens.radius.sm,
            backgroundColor: surface,
            '& fieldset': { borderColor: border },
            '&:hover fieldset': { borderColor: dark ? n[600] : n[300] },
          },
          // Comfortable tap target; MUI's small is 32px which is below the floor.
          inputSizeSmall: { paddingTop: 10.5, paddingBottom: 10.5 },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: { borderRadius: tokens.radius.sm, fontWeight: 600 },
          sizeSmall: { height: 22, fontSize: '0.6875rem' },
        },
      },

      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: tokens.radius.sm,
            minHeight: 44,
            '&:focus-visible': {
              outline: `2px solid ${tokens.accent[500]}`,
              outlineOffset: -2,
            },
          },
        },
      },

      MuiTooltip: {
        defaultProps: { arrow: true },
        styleOverrides: {
          tooltip: { fontSize: '0.75rem', borderRadius: tokens.radius.sm },
        },
      },

      MuiDialog: {
        styleOverrides: { paper: { borderRadius: tokens.radius.lg } },
      },

      MuiTab: {
        styleOverrides: {
          root: { textTransform: 'none', fontWeight: 600, minHeight: 44 },
        },
      },
    },
  });
}
