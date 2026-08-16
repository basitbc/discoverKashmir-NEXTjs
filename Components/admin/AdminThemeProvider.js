import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import { buildAdminTheme } from '../../admin/theme';

/**
 * Applies the admin design system.
 *
 * ScopedCssBaseline rather than CssBaseline is the important detail: the reset
 * applies inside this subtree only, so nothing here can alter the public site's
 * typography or spacing.
 *
 * Colour mode follows the OS by default and can be overridden per user; the
 * choice is remembered locally. Defaulting to the system setting matters for
 * staff working evenings on a phone.
 */
const ColorModeContext = createContext({ mode: 'light', setMode: () => {} });

export const useColorMode = () => useContext(ColorModeContext);

const STORAGE_KEY = 'dk-admin-color-mode';

export default function AdminThemeProvider({ children }) {
  const [preference, setPreference] = useState('system');
  const [systemDark, setSystemDark] = useState(false);

  // Read the stored preference after mount — localStorage is unavailable during
  // SSR and reading it during render would cause a hydration mismatch.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) setPreference(stored);

    const query = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemDark(query.matches);

    const onChange = (event) => setSystemDark(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const mode = preference === 'system' ? (systemDark ? 'dark' : 'light') : preference;

  const setMode = (next) => {
    setPreference(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  const theme = useMemo(() => buildAdminTheme(mode), [mode]);
  const value = useMemo(() => ({ mode, preference, setMode }), [mode, preference]);

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <ScopedCssBaseline
          sx={{ bgcolor: 'background.default', minHeight: '100vh' }}
        >
          {children}
        </ScopedCssBaseline>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
