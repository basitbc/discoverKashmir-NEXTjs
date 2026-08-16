import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { paymentsService, ApiError } from '../../services';

const CURRENCY_SYMBOL = { INR: '₹', USD: '$', GBP: '£', EUR: '€', AED: 'AED ', SGD: 'S$' };

/**
 * Customer payment page.
 *
 * Deliberately stripped of site navigation. A checkout screen has exactly one
 * job, and every extra link is a chance to wander off mid-payment — which is
 * why every payment provider's own checkout looks like this.
 *
 * The amount is READ-ONLY and comes from the server. The customer confirms what
 * was quoted; they never type a figure, so there is nothing to mistype and
 * nothing for a tampered client to change.
 */
export default function PayPage() {
  const router = useRouter();
  const { reference } = router.query;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!router.isReady || typeof reference !== 'string') return;
    let cancelled = false;

    paymentsService
      .get(reference)
      .then((data) => {
        if (!cancelled) setOrder(data);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err instanceof ApiError && err.isNotFound
            ? 'We could not find this payment link. Please check it with us.'
            : 'Something went wrong loading this payment. Please try again.',
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [router.isReady, reference]);

  const symbol = CURRENCY_SYMBOL[order?.currency] ?? `${order?.currency ?? ''} `;
  const expired = order?.expiresAt && new Date(order.expiresAt) < new Date();
  const settled = order?.status === 'SUCCESS';
  const cancelled = order?.status === 'CANCELLED';
  const payable = order && !settled && !cancelled && !expired;

  return (
    <>
      <Head>
        <title>Secure payment | Discover Kashmir</title>
        {/* A payment link must never be indexed. */}
        <meta name='robots' content='noindex, nofollow' />
      </Head>

      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'center',
          p: { xs: 2, sm: 3 },
          pt: { xs: 4, sm: 3 },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 460 }}>
          <Stack spacing={0.5} sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant='h1'>Discover Kashmir</Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              Secure payment
            </Typography>
          </Stack>

          <Paper variant='outlined' sx={{ overflow: 'hidden' }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Box sx={{ p: 3 }}>
                <Alert severity='error' icon={<ErrorOutlineRoundedIcon />}>
                  {error}
                </Alert>
              </Box>
            ) : (
              <>
                {/* The amount is the one thing that must be unmissable. */}
                <Box sx={{ px: 3, pt: 3.5, pb: 3, textAlign: 'center' }}>
                  <Typography variant='overline' sx={{ color: 'text.secondary' }}>
                    Amount to pay
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: '2.5rem', sm: '3rem' },
                      fontWeight: 750,
                      letterSpacing: '-0.03em',
                      lineHeight: 1.1,
                      mt: 0.5,
                    }}
                  >
                    {symbol}
                    {Number(order.amount).toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Typography>
                </Box>

                <Divider />

                <Stack spacing={2} sx={{ p: 3 }}>
                  <Row label='For' value={order.description} />
                  <Row label='Name' value={order.customerName} />
                  <Row
                    label='Reference'
                    value={
                      <Box component='span' sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                        {order.reference}
                      </Box>
                    }
                  />
                </Stack>

                <Divider />

                <Box sx={{ p: 3 }}>
                  {settled ? (
                    <Alert severity='success' icon={<CheckCircleRoundedIcon />}>
                      This payment has already been completed. Thank you.
                    </Alert>
                  ) : cancelled ? (
                    <Alert severity='warning'>
                      This payment request was cancelled. Please contact us for a new link.
                    </Alert>
                  ) : expired ? (
                    <Alert severity='warning'>
                      This payment link has expired. Please contact us for a new one.
                    </Alert>
                  ) : (
                    <>
                      {/* A real form POST, not fetch: the gateway needs a
                          top-level browser navigation to take over the page. */}
                      <form
                        method='POST'
                        action={paymentsService.initiateUrl(order.reference)}
                        onSubmit={() => setSubmitting(true)}
                      >
                        <Button
                          type='submit'
                          variant='contained'
                          size='large'
                          fullWidth
                          disabled={submitting}
                          startIcon={submitting ? null : <LockRoundedIcon />}
                          sx={{ py: 1.5, fontSize: '1rem' }}
                        >
                          {submitting ? (
                            <CircularProgress size={24} color='inherit' />
                          ) : (
                            `Pay ${symbol}${Number(order.amount).toLocaleString('en-IN')}`
                          )}
                        </Button>
                      </form>

                      <Stack
                        direction='row'
                        spacing={0.75}
                        alignItems='center'
                        justifyContent='center'
                        sx={{ mt: 2, color: 'text.secondary' }}
                      >
                        <LockRoundedIcon sx={{ fontSize: 14 }} />
                        <Typography variant='caption'>
                          Card details are entered on CCAvenue's secure page, never here
                        </Typography>
                      </Stack>
                    </>
                  )}
                </Box>
              </>
            )}
          </Paper>

          {payable ? (
            <Typography
              variant='caption'
              sx={{ display: 'block', textAlign: 'center', color: 'text.secondary', mt: 2 }}
            >
              Questions about this payment? Quote reference{' '}
              <Box component='span' sx={{ fontFamily: 'monospace' }}>
                {order.reference}
              </Box>
            </Typography>
          ) : null}
        </Box>
      </Box>
    </>
  );
}

function Row({ label, value }) {
  return (
    <Stack direction='row' spacing={2} alignItems='flex-start'>
      <Typography variant='body2' sx={{ color: 'text.secondary', minWidth: 84, flexShrink: 0 }}>
        {label}
      </Typography>
      <Typography variant='body2' sx={{ fontWeight: 500, wordBreak: 'break-word' }}>
        {value}
      </Typography>
    </Stack>
  );
}
