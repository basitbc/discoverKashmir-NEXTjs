import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  Chip,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AdminShell from '../../Components/admin/AdminShell';
import { RESOURCES } from '../../admin/resources';
import { ApiError } from '../../services';

/**
 * Dashboard.
 *
 * Reframed from "a grid of counts" to "what would you like to do". Counts alone
 * are a vanity metric in a CMS this size — nobody needs to know there are nine
 * blog posts. What they need is to reach the right list, or start a new item,
 * in one tap. So every card is both, and drafts are surfaced because an
 * unpublished item is usually unfinished work someone meant to come back to.
 */
export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const entries = await Promise.all(
          Object.entries(RESOURCES).map(async ([key, cfg]) => {
            const all = await cfg.service.admin.list({ perPage: 1 });
            let drafts = 0;
            if (cfg.hasPublished) {
              const unpublished = await cfg.service.admin.list({ perPage: 1, published: false });
              drafts = unpublished.total;
            }
            return [key, { total: all.total, drafts }];
          }),
        );
        if (!cancelled) setStats(Object.fromEntries(entries));
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : 'Could not load content counts.');
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard | Discover Kashmir Admin</title>
        <meta name='robots' content='noindex' />
      </Head>

      <AdminShell title='Dashboard' breadcrumb='Discover Kashmir'>
        <Typography variant='body2' sx={{ color: 'text.secondary', mb: 2.5 }}>
          Everything you publish here appears on the website within a few seconds.
        </Typography>

        {error ? (
          <Alert severity='error' sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : null}

        <Grid container spacing={{ xs: 1.25, md: 2 }}>
          {Object.entries(RESOURCES).map(([key, cfg]) => {
            const stat = stats?.[key];
            return (
              <Grid item xs={12} sm={6} lg={4} key={key}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardActionArea
                    component={Link}
                    href={`/admin/${key}`}
                    sx={{ p: 2, flexGrow: 1 }}
                  >
                    <Stack direction='row' alignItems='flex-start' spacing={1}>
                      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography variant='overline' sx={{ color: 'text.secondary' }}>
                          {cfg.label}
                        </Typography>
                        <Stack direction='row' alignItems='baseline' spacing={1} sx={{ mt: 0.25 }}>
                          {stats ? (
                            <Typography sx={{ fontSize: '1.75rem', fontWeight: 750, lineHeight: 1.1 }}>
                              {stat.total}
                            </Typography>
                          ) : (
                            <Skeleton variant='text' width={40} height={40} />
                          )}
                          {stats && stat.drafts > 0 ? (
                            <Chip
                              size='small'
                              color='warning'
                              variant='outlined'
                              label={`${stat.drafts} draft${stat.drafts === 1 ? '' : 's'}`}
                            />
                          ) : null}
                        </Stack>
                      </Box>
                      <ArrowForwardRoundedIcon sx={{ color: 'text.disabled', fontSize: 18, mt: 1 }} />
                    </Stack>
                  </CardActionArea>

                  <Box sx={{ px: 1.5, pb: 1.5, pt: 0 }}>
                    <Button
                      component={Link}
                      href={`/admin/${key}/new`}
                      size='small'
                      startIcon={<AddRoundedIcon />}
                      fullWidth
                      variant='outlined'
                    >
                      New {cfg.singular.toLowerCase()}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Typography
          variant='caption'
          sx={{ color: 'text.secondary', display: 'block', mt: 3, textAlign: 'center' }}
        >
          Tip: press ⌘K (or Ctrl-K) anywhere to jump straight to a section.
        </Typography>
      </AdminShell>
    </>
  );
}
