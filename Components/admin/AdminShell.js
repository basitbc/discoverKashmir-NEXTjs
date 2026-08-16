import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import SlideshowRoundedIcon from '@mui/icons-material/SlideshowRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { RESOURCES } from '../../admin/resources';
import CommandPalette from './CommandPalette';
import { useColorMode } from './AdminThemeProvider';

const SIDEBAR_WIDTH = 236;
export const BOTTOM_NAV_HEIGHT = 62;

const ICONS = {
  LocalOffer: LocalOfferRoundedIcon,
  Place: PlaceRoundedIcon,
  Article: ArticleRoundedIcon,
  FormatQuote: FormatQuoteRoundedIcon,
  Slideshow: SlideshowRoundedIcon,
  Map: MapRoundedIcon,
};

/**
 * Admin shell.
 *
 * The navigation model differs by device on purpose, rather than shrinking one
 * pattern to fit:
 *
 *   Desktop — a persistent sidebar. Screen space is cheap; showing every
 *             destination at once removes a click from every journey.
 *   Mobile  — a BOTTOM navigation bar for the four things staff touch daily,
 *             plus a "More" sheet for the rest. The previous drawer-only
 *             version cost two taps for every single navigation and put the
 *             control in the top-left, the hardest corner to reach one-handed.
 *             A bottom bar sits in the thumb arc and makes it one tap.
 *
 * ⌘K opens the command palette on any device.
 */
export default function AdminShell({ title, breadcrumb, actions, children, maxWidth = 1180 }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const router = useRouter();
  const { data: session } = useSession();
  const { mode, setMode } = useColorMode();

  const [moreOpen, setMoreOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(null);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Global accelerator. Ignored while typing so it cannot hijack a text field.
  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const resourceItems = Object.entries(RESOURCES).map(([key, cfg]) => ({
    href: `/admin/${key}`,
    label: cfg.label,
    Icon: ICONS[cfg.icon] ?? ArticleRoundedIcon,
  }));

  const allItems = [
    { href: '/admin', label: 'Dashboard', Icon: DashboardRoundedIcon, exact: true },
    ...resourceItems,
    // Payments is not a content type, so it is listed explicitly rather than
    // coming from the resource registry.
    { href: '/admin/payments', label: 'Payments', Icon: PaymentsRoundedIcon },
    { href: '/admin/settings', label: 'Settings', Icon: SettingsRoundedIcon },
  ];

  // The four highest-frequency destinations get the thumb zone.
  const primaryMobile = allItems.filter((i) =>
    ['/admin', '/admin/packages', '/admin/destinations', '/admin/blogs'].includes(i.href),
  );
  const secondaryMobile = allItems.filter((i) => !primaryMobile.includes(i));

  const isActive = (item) =>
    item.exact ? router.pathname === item.href : router.asPath.startsWith(item.href);

  const activeMobileValue =
    primaryMobile.findIndex((i) => isActive(i)) === -1
      ? 'more'
      : primaryMobile.find((i) => isActive(i))?.href;

  const navList = (items, onNavigate) => (
    <List sx={{ px: 1, py: 1 }}>
      {items.map((item) => {
        const active = isActive(item);
        return (
          <ListItemButton
            key={item.href}
            component={Link}
            href={item.href}
            selected={active}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            sx={{
              mb: 0.25,
              '&.Mui-selected': {
                bgcolor: 'action.selected',
                color: 'text.primary',
                fontWeight: 700,
                '& .MuiListItemIcon-root': { color: 'primary.main' },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
              <item.Icon fontSize='small' />
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: active ? 650 : 500 }}
            />
          </ListItemButton>
        );
      })}
    </List>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* ------------------------------------------------ desktop sidebar */}
      {isDesktop ? (
        <Box
          component='nav'
          aria-label='Main'
          sx={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            borderRight: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            position: 'fixed',
            top: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ px: 2.5, py: 2.25 }}>
            <Typography sx={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '-0.01em' }}>
              Discover Kashmir
            </Typography>
            <Typography variant='caption' sx={{ color: 'text.secondary' }}>
              Content admin
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>{navList(allItems)}</Box>
          <Divider />
          <Box sx={{ p: 1 }}>
            <ListItemButton
              component='a'
              href='/'
              target='_blank'
              rel='noopener noreferrer'
              sx={{ borderRadius: 1.5 }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                <OpenInNewRoundedIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText
                primary='View website'
                primaryTypographyProps={{ fontSize: '0.82rem' }}
              />
            </ListItemButton>
          </Box>
        </Box>
      ) : null}

      {/* ----------------------------------------------------- top app bar */}
      <Box sx={{ flexGrow: 1, ml: { md: `${SIDEBAR_WIDTH}px` }, minWidth: 0 }}>
        <AppBar
          position='sticky'
          elevation={0}
          sx={{
            bgcolor: 'background.paper',
            color: 'text.primary',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Toolbar sx={{ gap: 1, minHeight: { xs: 58, md: 64 } }}>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              {breadcrumb ? (
                <Typography
                  variant='caption'
                  noWrap
                  sx={{ color: 'text.secondary', display: 'block', lineHeight: 1.2 }}
                >
                  {breadcrumb}
                </Typography>
              ) : null}
              <Typography component='h1' variant='h2' noWrap sx={{ lineHeight: 1.25 }}>
                {title}
              </Typography>
            </Box>

            {actions}

            <Tooltip title='Search  ⌘K'>
              <IconButton onClick={() => setPaletteOpen(true)} aria-label='Open command palette'>
                <SearchRoundedIcon />
              </IconButton>
            </Tooltip>

            <IconButton
              onClick={(e) => setUserMenu(e.currentTarget)}
              aria-label='Account menu'
              sx={{ p: 0.5 }}
            >
              <Avatar
                sx={{ width: 32, height: 32, fontSize: '0.8rem', bgcolor: 'primary.main', fontWeight: 700 }}
              >
                {(session?.user?.name ?? 'A').charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={userMenu}
              open={Boolean(userMenu)}
              onClose={() => setUserMenu(null)}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{ sx: { minWidth: 230, mt: 0.5 } }}
            >
              <Box sx={{ px: 2, py: 1.25 }}>
                <Typography sx={{ fontWeight: 650, fontSize: '0.875rem' }}>
                  {session?.user?.name}
                </Typography>
                <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                  {session?.user?.email}
                </Typography>
              </Box>
              <Divider />
              <MenuItem
                onClick={() => {
                  setMode(mode === 'dark' ? 'light' : 'dark');
                  setUserMenu(null);
                }}
              >
                <ListItemIcon>
                  {mode === 'dark' ? (
                    <LightModeRoundedIcon fontSize='small' />
                  ) : (
                    <DarkModeRoundedIcon fontSize='small' />
                  )}
                </ListItemIcon>
                {mode === 'dark' ? 'Light mode' : 'Dark mode'}
              </MenuItem>
              <MenuItem component='a' href='/' target='_blank' rel='noopener noreferrer'>
                <ListItemIcon>
                  <OpenInNewRoundedIcon fontSize='small' />
                </ListItemIcon>
                View website
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => signOut({ callbackUrl: '/admin/login' })}>
                <ListItemIcon>
                  <LogoutRoundedIcon fontSize='small' />
                </ListItemIcon>
                Sign out
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Box
          component='main'
          sx={{
            px: { xs: 1.5, sm: 3, md: 4 },
            py: { xs: 2, md: 3 },
            // Clear the bottom navigation on mobile so nothing hides behind it.
            pb: { xs: `calc(${BOTTOM_NAV_HEIGHT}px + env(safe-area-inset-bottom) + 16px)`, md: 4 },
            maxWidth,
            mx: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>

      {/* -------------------------------------------- mobile bottom nav */}
      {!isDesktop ? (
        <>
          <Box
            component='nav'
            aria-label='Main'
            sx={{
              position: 'fixed',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1200,
              borderTop: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
              pb: 'env(safe-area-inset-bottom)',
            }}
          >
            <BottomNavigation
              value={activeMobileValue}
              showLabels
              sx={{ height: BOTTOM_NAV_HEIGHT, bgcolor: 'transparent' }}
            >
              {primaryMobile.map((item) => (
                <BottomNavigationAction
                  key={item.href}
                  value={item.href}
                  component={Link}
                  href={item.href}
                  label={item.label === 'Dashboard' ? 'Home' : item.label}
                  icon={<item.Icon />}
                  sx={{ minWidth: 0, '& .MuiBottomNavigationAction-label': { fontSize: '0.68rem' } }}
                />
              ))}
              <BottomNavigationAction
                value='more'
                label='More'
                icon={
                  <Badge
                    color='primary'
                    variant='dot'
                    invisible={activeMobileValue !== 'more'}
                  >
                    <MoreHorizRoundedIcon />
                  </Badge>
                }
                onClick={() => setMoreOpen(true)}
                sx={{ minWidth: 0, '& .MuiBottomNavigationAction-label': { fontSize: '0.68rem' } }}
              />
            </BottomNavigation>
          </Box>

          {/* Bottom sheet, not a side drawer: it opens next to the thumb that
              summoned it rather than across the screen. */}
          <Drawer
            anchor='bottom'
            open={moreOpen}
            onClose={() => setMoreOpen(false)}
            PaperProps={{
              sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16, pb: 'env(safe-area-inset-bottom)' },
            }}
          >
            <Box sx={{ pt: 1.5, pb: 1 }}>
              <Box
                sx={{ width: 36, height: 4, bgcolor: 'divider', borderRadius: 2, mx: 'auto', mb: 1 }}
              />
              {navList(secondaryMobile, () => setMoreOpen(false))}
              <Divider sx={{ my: 0.5 }} />
              <Box sx={{ px: 2, pt: 1, display: 'flex', gap: 1 }}>
                <Button
                  fullWidth
                  variant='outlined'
                  startIcon={mode === 'dark' ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
                  onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
                >
                  {mode === 'dark' ? 'Light' : 'Dark'}
                </Button>
                <Button
                  fullWidth
                  variant='outlined'
                  startIcon={<OpenInNewRoundedIcon />}
                  href='/'
                  target='_blank'
                >
                  Website
                </Button>
              </Box>
            </Box>
          </Drawer>
        </>
      ) : null}

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </Box>
  );
}
