import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Alert, Snackbar, Slide } from '@mui/material';

/**
 * App-wide feedback.
 *
 * One provider rather than a Snackbar per screen, so every confirmation and
 * failure looks and behaves the same — consistency here is what makes the tool
 * feel predictable rather than assembled from parts.
 *
 * Positioned bottom-centre above the mobile navigation, and announced to
 * assistive technology via the alert role.
 */
const ToastContext = createContext(() => {});

export const useToast = () => useContext(ToastContext);

export default function ToastProvider({ children, bottomOffset = 0 }) {
  const [toast, setToast] = useState(null);

  const notify = useCallback((message, severity = 'success') => {
    setToast({ message, severity, key: Date.now() });
  }, []);

  const api = useMemo(
    () => ({
      success: (m) => notify(m, 'success'),
      error: (m) => notify(m, 'error'),
      info: (m) => notify(m, 'info'),
      warning: (m) => notify(m, 'warning'),
    }),
    [notify],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <Snackbar
        key={toast?.key}
        open={Boolean(toast)}
        // Errors stay longer: the user has to read and act on them.
        autoHideDuration={toast?.severity === 'error' ? 7000 : 3500}
        onClose={(_, reason) => {
          if (reason !== 'clickaway') setToast(null);
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        TransitionComponent={Slide}
        sx={{ bottom: { xs: bottomOffset + 16, md: 24 } }}
      >
        {toast ? (
          <Alert
            severity={toast.severity}
            variant='filled'
            onClose={() => setToast(null)}
            sx={{ borderRadius: 2, alignItems: 'center', maxWidth: 420 }}
          >
            {toast.message}
          </Alert>
        ) : null}
      </Snackbar>
    </ToastContext.Provider>
  );
}
