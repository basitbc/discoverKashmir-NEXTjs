import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import { paymentsService } from '../../services';

const CURRENCY_SYMBOL = { INR: '₹', USD: '$', GBP: '£', EUR: '€', AED: 'AED ', SGD: 'S$' };

/**
 * Where the gateway sends the customer after paying.
 *
 * The status shown is re-fetched from OUR database rather than read from the
 * query string. The customer's browser is redirected by the gateway and could
 * be manipulated; the server-recorded callback is the only trustworthy source
 * of whether money actually moved.
 */
const OUTCOMES = {
  SUCCESS: {
    icon: <CheckCircleRoundedIcon sx={{ fontSize: 56 }} />,
    color: 'success.main',
    title: 'Payment received',
    body: 'Thank you. We have your payment and will be in touch shortly with the next steps.',
  },
  FAILED: {
    icon: <ErrorOutlineRoundedIcon sx={{ fontSize: 56 }} />,
    color: 'error.main',
    title: 'Payment failed',
    body: 'Your bank did not complete this payment, and you have not been charged. You can try again, or contact us and we will help.',
  },
  ABORTED: {
    icon: <ErrorOutlineRoundedIcon sx={{ fontSize: 56 }} />,
    color: 'warning.main',
    title: 'Payment cancelled',
    body: 'You cancelled before the payment completed, so nothing has been charged.',
  },
  PENDING: {
    icon: <HourglassEmptyRoundedIcon sx={{ fontSize: 56 }} />,
    color: 'text.secondary',
    title: 'Payment not completed',
    body: 'We have not received a payment against this reference yet.',
  },
};

export default function PaymentResult() {
  const router = useRouter();
  const { ref, status: errorStatus, reason } = router.query;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;
    if (typeof ref !== 'string') {
      setLoading(false);
      return;
    }

    let cancelled = false;
    paymentsService
      .get(ref)
      .then((data) => !cancelled && setOrder(data))
      .catch(() => {})
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [router.isReady, ref]);

  const outcome =
    errorStatus === 'error'
      ? {
          icon: <ErrorOutlineRoundedIcon sx={{ fontSize: 56 }} />,
          color: 'error.main',
          title: 'We could not confirm this payment',
          body: 'If money has left your account, please contact us with your reference and we will resolve it straight away.',
        }
      : OUTCOMES[order?.status] ?? OUTCOMES.PENDING;

  const symbol = CURRENCY_SYMBOL[order?.currency] ?? '';

  return (
    <>
      <Head>
        <title>Payment result | Discover Kashmir</title>
        <meta name='robots' content='noindex, nofollow' />
      </Head>

      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'center',
          p: { xs: 2, sm: 3 },
          pt: { xs: 5, sm: 3 },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 460 }}>
          <Paper variant='outlined'>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Stack spacing={1.5} alignItems='center' sx={{ px: 3, pt: 4, pb: 3, textAlign: 'center' }}>
                  <Box sx={{ color: outcome.color, display: 'flex' }}>{outcome.icon}</Box>
                  <Typography variant='h1'>{outcome.title}</Typography>
                  <Typography variant='body2' sx={{ color: 'text.secondary', maxWidth: 340 }}>
                    {outcome.body}
                  </Typography>
                </Stack>

                {order ? (
                  <>
                    <Divider />
                    <Stack spacing={1.5} sx={{ p: 3 }}>
                      <Row label='Amount' value={`${symbol}${Number(order.amount).toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2})}`} />
                      <Row label='For' value={order.description} />
                      <Row
                        label='Reference'
                        value={
                          <Box component='span' sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                            {order.reference}
                          </Box>
                        }
                      />
                    </Stack>
                  </>
                ) : null}

                <Divider />
                <Stack spacing={1} sx={{ p: 3 }}>
                  <Button component={Link} href='/' variant='contained' fullWidth>
                    Back to the website
                  </Button>
                  {order && order.status !== 'SUCCESS' ? (
                    <Button component={Link} href={`/pay/${order.reference}`} fullWidth>
                      Try the payment again
                    </Button>
                  ) : null}
                </Stack>
              </>
            )}
          </Paper>

          {reason ? (
            <Typography
              variant='caption'
              sx={{ display: 'block', textAlign: 'center', color: 'text.disabled', mt: 2 }}
            >
              Diagnostic: {reason}
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
