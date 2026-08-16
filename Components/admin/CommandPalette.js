import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Dialog,
  InputBase,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { signOut } from 'next-auth/react';
import { RESOURCES } from '../../admin/resources';
import { useColorMode } from './AdminThemeProvider';

/**
 * Command palette (⌘K / Ctrl-K).
 *
 * The single highest-leverage navigation affordance in an admin tool: any
 * destination or action is two keystrokes and a filter away, instead of
 * open-drawer → scan → tap → scan → tap.
 *
 * It is an accelerator, never the only path — every command here is also
 * reachable by pointer, so it adds speed for daily users without becoming a
 * hidden requirement for occasional ones.
 */
export default function CommandPalette({ open, onClose }) {
  const router = useRouter();
  const { mode, setMode } = useColorMode();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const listRef = useRef(null);

  const commands = useMemo(() => {
    const items = [];

    for (const [key, cfg] of Object.entries(RESOURCES)) {
      items.push({
        id: `go-${key}`,
        label: cfg.label,
        group: 'Go to',
        icon: <ArrowForwardRoundedIcon fontSize='small' />,
        keywords: cfg.singular,
        run: () => router.push(`/admin/${key}`),
      });
      items.push({
        id: `new-${key}`,
        label: `New ${cfg.singular.toLowerCase()}`,
        group: 'Create',
        icon: <AddRoundedIcon fontSize='small' />,
        keywords: cfg.label,
        run: () => router.push(`/admin/${key}/new`),
      });
    }

    items.push(
      {
        id: 'go-payments',
        label: 'Payments',
        group: 'Go to',
        icon: <ArrowForwardRoundedIcon fontSize='small' />,
        run: () => router.push('/admin/payments'),
      },
      {
        id: 'new-payment',
        label: 'New payment request',
        group: 'Create',
        icon: <AddRoundedIcon fontSize='small' />,
        run: () => router.push('/admin/payments?new=1'),
      },
      {
        id: 'go-settings',
        label: 'Site settings',
        group: 'Go to',
        icon: <ArrowForwardRoundedIcon fontSize='small' />,
        run: () => router.push('/admin/settings'),
      },
      {
        id: 'go-dashboard',
        label: 'Dashboard',
        group: 'Go to',
        icon: <ArrowForwardRoundedIcon fontSize='small' />,
        run: () => router.push('/admin'),
      },
      {
        id: 'theme',
        label: mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
        group: 'Actions',
        icon:
          mode === 'dark' ? (
            <LightModeRoundedIcon fontSize='small' />
          ) : (
            <DarkModeRoundedIcon fontSize='small' />
          ),
        run: () => setMode(mode === 'dark' ? 'light' : 'dark'),
      },
      {
        id: 'view-site',
        label: 'Open the website',
        group: 'Actions',
        icon: <OpenInNewRoundedIcon fontSize='small' />,
        run: () => window.open('/', '_blank', 'noopener'),
      },
      {
        id: 'signout',
        label: 'Sign out',
        group: 'Actions',
        icon: <LogoutRoundedIcon fontSize='small' />,
        run: () => signOut({ callbackUrl: '/admin/login' }),
      },
    );

    return items;
  }, [router, mode, setMode]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.group} ${c.keywords ?? ''}`.toLowerCase().includes(q),
    );
  }, [commands, query]);

  // Reset when reopened so the palette never shows a stale filter.
  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const run = (command) => {
    onClose();
    command.run();
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (event.key === 'Enter' && results[active]) {
      event.preventDefault();
      run(results[active]);
    }
  };

  // Keep the highlighted row in view during keyboard navigation.
  useEffect(() => {
    const node = listRef.current?.querySelector('[data-active="true"]');
    node?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  let lastGroup = null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='sm'
      // Anchored high rather than centred: the results grow downward from a
      // fixed point instead of the whole panel shifting as you type.
      sx={{ '& .MuiDialog-container': { alignItems: 'flex-start', pt: { xs: 4, sm: 10 } } }}
      PaperProps={{ sx: { overflow: 'hidden' } }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          py: 1.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <SearchRoundedIcon sx={{ color: 'text.secondary' }} />
        <InputBase
          autoFocus
          fullWidth
          placeholder='Search or jump to…'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          inputProps={{
            'aria-label': 'Search commands',
            role: 'combobox',
            'aria-expanded': true,
            'aria-controls': 'command-results',
          }}
          sx={{ fontSize: '1rem' }}
        />
      </Box>

      <List
        id='command-results'
        ref={listRef}
        dense
        sx={{ maxHeight: 380, overflowY: 'auto', py: 0.5 }}
      >
        {results.length === 0 ? (
          <Typography variant='body2' sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
            No matches for “{query}”.
          </Typography>
        ) : null}

        {results.map((command, index) => {
          const showGroup = command.group !== lastGroup;
          lastGroup = command.group;

          return (
            <Box key={command.id}>
              {showGroup ? (
                <Typography
                  variant='overline'
                  sx={{ display: 'block', px: 2, pt: 1.25, pb: 0.5, color: 'text.secondary' }}
                >
                  {command.group}
                </Typography>
              ) : null}
              <ListItemButton
                data-active={index === active}
                selected={index === active}
                onMouseEnter={() => setActive(index)}
                onClick={() => run(command)}
                sx={{ mx: 1, borderRadius: 1.5 }}
              >
                <ListItemIcon sx={{ minWidth: 34, color: 'text.secondary' }}>
                  {command.icon}
                </ListItemIcon>
                <ListItemText
                  primary={command.label}
                  primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }}
                />
              </ListItemButton>
            </Box>
          );
        })}
      </List>

      <Box
        sx={{
          px: 2,
          py: 1,
          borderTop: '1px solid',
          borderColor: 'divider',
          display: { xs: 'none', sm: 'flex' },
          gap: 2,
        }}
      >
        {[
          ['↑↓', 'navigate'],
          ['↵', 'select'],
          ['esc', 'close'],
        ].map(([key, label]) => (
          <Typography key={key} variant='caption' sx={{ color: 'text.secondary' }}>
            <Box
              component='kbd'
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 0.75,
                px: 0.6,
                py: 0.1,
                mr: 0.5,
                fontFamily: 'inherit',
              }}
            >
              {key}
            </Box>
            {label}
          </Typography>
        ))}
      </Box>
    </Dialog>
  );
}
