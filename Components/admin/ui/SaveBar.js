import { useEffect } from 'react';
import { Box, Button, CircularProgress, Fade, Paper, Stack, Typography } from '@mui/material';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { BOTTOM_NAV_HEIGHT } from '../AdminShell';

/**
 * Contextual save bar.
 *
 * Appears only when there is something to save. The previous version was
 * permanently docked, which meant a strip of chrome sat over the content at all
 * times saying "All changes saved" — pure noise that also stole vertical space
 * on exactly the devices with least of it.
 *
 * Sits above the mobile bottom navigation so the two never overlap, and binds
 * ⌘S / Ctrl-S because saving is the action daily users repeat most.
 */
export default function SaveBar({ visible, saving, onSave, onDiscard, label = 'Unsaved changes' }) {
  useEffect(() => {
    if (!visible) return undefined;

    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
        event.preventDefault();
        if (!saving) onSave();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible, saving, onSave]);

  // Warn before losing work to a tab close or refresh.
  useEffect(() => {
    if (!visible) return undefined;
    const beforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', beforeUnload);
    return () => window.removeEventListener('beforeunload', beforeUnload);
  }, [visible]);

  return (
    <Fade in={visible} unmountOnExit>
      <Paper
        role='region'
        aria-label='Unsaved changes'
        sx={{
          position: 'fixed',
          zIndex: 1250,
          left: { xs: 12, md: '50%' },
          right: { xs: 12, md: 'auto' },
          transform: { md: 'translateX(-50%)' },
          bottom: {
            xs: `calc(${BOTTOM_NAV_HEIGHT}px + env(safe-area-inset-bottom) + 12px)`,
            md: 24,
          },
          px: 1.5,
          py: 1.25,
          borderRadius: 999,
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 8px 28px rgba(0,0,0,0.16)',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          minWidth: { md: 420 },
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: 'warning.main',
            ml: 1,
            flexShrink: 0,
          }}
        />
        <Typography variant='body2' sx={{ flexGrow: 1, fontWeight: 500 }} noWrap>
          {label}
        </Typography>

        <Stack direction='row' spacing={0.75}>
          {onDiscard ? (
            <Button size='small' onClick={onDiscard} disabled={saving} sx={{ borderRadius: 999 }}>
              Discard
            </Button>
          ) : null}
          <Button
            size='small'
            variant='contained'
            onClick={onSave}
            disabled={saving}
            startIcon={saving ? null : <SaveRoundedIcon />}
            sx={{ borderRadius: 999, minWidth: 96 }}
          >
            {saving ? <CircularProgress size={18} color='inherit' /> : 'Save'}
          </Button>
        </Stack>
      </Paper>
    </Fade>
  );
}
