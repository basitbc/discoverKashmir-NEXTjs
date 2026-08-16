import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import AdminShell from '../../../Components/admin/AdminShell';
import { ConfirmDialog, FormSkeleton } from '../../../Components/admin/ui/primitives';
import { useToast } from '../../../Components/admin/ui/ToastProvider';
import { paymentsService, ApiError } from '../../../services';

const STATUS_COLOR = {
  SUCCESS: 'success', PENDING: 'default', INITIATED: 'info',
  FAILED: 'error', ABORTED: 'warning', CANCELLED: 'default', REFUNDED: 'secondary',
};
const SYMBOL = { INR: '₹', USD: '$', GBP: '£', EUR: '€', AED: 'AED ', SGD: 'S$' };

/**
 * One payment, with its full audit trail.
 *
 * The event list is the point of this screen: when a customer says "I paid",
 * this is where you prove what the gateway actually reported, and when.
 */
export default function PaymentDetail() {
  const router = useRouter();
  const toast = useToast();
  const { id } = router.query;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmCancel, setConfirmCancel] = useState(false);

  const load = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      setOrder(await paymentsService.admin.get(id));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not load this payment.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (router.isReady) load();
  }, [router.isReady, load]);

  const copy = async (text, what) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${what} copied.`);
    } catch {
      toast.error('Could not copy — please select and copy manually.');
    }
  };

  const cancel = async () => {
    try {
      await paymentsService.admin.cancel(order.id);
      toast.success('Payment request cancelled.');
      setConfirmCancel(false);
      load();
    } catch (err) {
      setConfirmCancel(false);
      toast.error(err instanceof ApiError ? err.message : 'Could not cancel.');
    }
  };

  const money = order
    ? `${SYMBOL[order.currency] ?? ''}${Number(order.amount).toLocaleString('en-IN', {
        minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : '';

  const canCancel = order && !['SUCCESS', 'CANCELLED', 'REFUNDED'].includes(order.status);

  return (
    <>
      <Head>
        <title>{order ? order.reference : 'Payment'} | Discover Kashmir Admin</title>
        <meta name='robots' content='noindex' />
      </Head>

      <AdminShell title={order?.reference ?? 'Payment'} breadcrumb='Payments' maxWidth={880}>
        <Button startIcon={<ArrowBackRoundedIcon />} size='small'
          onClick={() => router.push('/admin/payments')} sx={{ mb: 2 }}>
          All payments
        </Button>

        {loading ? (
          <FormSkeleton />
        ) : error ? (
          <Alert severity='error'>{error}</Alert>
        ) : order ? (
          <Stack spacing={2}>
            {/* --------------------------------------------------- summary */}
            <Paper variant='outlined' sx={{ p: { xs: 2, md: 3 } }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent='space-between'
                alignItems={{ sm: 'flex-start' }} spacing={2}>
                <Box>
                  <Typography variant='overline' sx={{ color: 'text.secondary' }}>Amount</Typography>
                  <Typography sx={{ fontSize: '2rem', fontWeight: 750, lineHeight: 1.15 }}>{money}</Typography>
                </Box>
                <Chip label={order.status} color={STATUS_COLOR[order.status]}
                  variant={order.status === 'SUCCESS' ? 'filled' : 'outlined'} />
              </Stack>

              {order.failureMessage ? (
                <Alert severity='error' sx={{ mt: 2 }}>{order.failureMessage}</Alert>
              ) : null}
            </Paper>

            {/* ------------------------------------------------- pay link */}
            {canCancel ? (
              <Paper variant='outlined' sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant='overline' sx={{ color: 'text.secondary', display: 'block', mb: 1.5 }}>
                  Payment link — send this to the customer
                </Typography>
                <Stack direction='row' spacing={1}>
                  <TextField fullWidth size='small' value={order.payUrl}
                    InputProps={{ readOnly: true, sx: { fontFamily: 'monospace', fontSize: '0.8rem' } }} />
                  <Tooltip title='Copy link'>
                    <IconButton onClick={() => copy(order.payUrl, 'Link')} aria-label='Copy payment link'>
                      <ContentCopyRoundedIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Open'>
                    <IconButton component='a' href={order.payUrl} target='_blank' rel='noopener noreferrer' aria-label='Open payment page'>
                      <OpenInNewRoundedIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Paper>
            ) : null}

            {/* --------------------------------------------------- details */}
            <Paper variant='outlined' sx={{ p: { xs: 2, md: 3 } }}>
              <Typography variant='overline' sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
                Details
              </Typography>
              <Stack spacing={1.5} divider={<Divider flexItem />}>
                <Row label='For' value={order.description} />
                <Row label='Customer' value={`${order.customerName} · ${order.customerEmail}`} />
                {order.customerPhone ? <Row label='Phone' value={order.customerPhone} /> : null}
                <Row label='Reference' value={order.reference} mono />
                {order.trackingId ? <Row label='Gateway tracking id' value={order.trackingId} mono /> : null}
                {order.bankRefNo ? <Row label='Bank reference' value={order.bankRefNo} mono /> : null}
                {order.paymentMode ? <Row label='Paid by' value={order.paymentMode} /> : null}
                {order.paidAt ? <Row label='Paid at' value={new Date(order.paidAt).toLocaleString('en-GB')} /> : null}
                <Row label='Raised' value={`${new Date(order.createdAt).toLocaleString('en-GB')}${order.createdBy ? ` by ${order.createdBy.name}` : ''}`} />
                {order.notes ? <Row label='Internal notes' value={order.notes} /> : null}
              </Stack>
            </Paper>

            {/* ---------------------------------------------- audit trail */}
            <Paper variant='outlined' sx={{ p: { xs: 2, md: 3 } }}>
              <Typography variant='overline' sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
                Activity — {order.events.length} event{order.events.length === 1 ? '' : 's'}
              </Typography>
              <Stack spacing={0}>
                {order.events.map((ev, i) => (
                  <Box key={ev.id} sx={{ display: 'flex', gap: 1.5, pb: i === order.events.length - 1 ? 0 : 2 }}>
                    {/* timeline rail */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 0.5 }}>
                      <Box sx={{ width: 9, height: 9, borderRadius: '50%', flexShrink: 0,
                        bgcolor: ev.status === 'SUCCESS' ? 'success.main' : ev.status === 'FAILED' ? 'error.main' : 'divider' }} />
                      {i < order.events.length - 1 ? (
                        <Box sx={{ width: '1px', flexGrow: 1, bgcolor: 'divider', mt: 0.5 }} />
                      ) : null}
                    </Box>
                    <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                      <Stack direction='row' spacing={1} alignItems='center' flexWrap='wrap'>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>{ev.type}</Typography>
                        {ev.status ? <Chip size='small' variant='outlined' label={ev.status} /> : null}
                        <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                          {new Date(ev.createdAt).toLocaleString('en-GB')}
                        </Typography>
                      </Stack>
                      {ev.message ? (
                        <Typography variant='body2' sx={{ color: 'text.secondary', mt: 0.25 }}>{ev.message}</Typography>
                      ) : null}
                      {ev.payload ? (
                        <Box component='details' sx={{ mt: 0.75 }}>
                          <Box component='summary' sx={{ cursor: 'pointer', fontSize: '0.75rem', color: 'text.secondary' }}>
                            Raw gateway response
                          </Box>
                          <Box component='pre' sx={{ mt: 0.75, p: 1.25, bgcolor: 'action.hover', borderRadius: 1,
                            fontSize: '0.7rem', overflowX: 'auto', maxWidth: '100%' }}>
                            {JSON.stringify(ev.payload, null, 2)}
                          </Box>
                        </Box>
                      ) : null}
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Paper>

            {canCancel ? (
              <Box>
                <Button color='error' variant='outlined' startIcon={<BlockRoundedIcon />}
                  onClick={() => setConfirmCancel(true)}>
                  Cancel this request
                </Button>
                <Typography variant='caption' sx={{ display: 'block', color: 'text.secondary', mt: 1 }}>
                  The record is kept for your books — cancelling only stops it being paid.
                </Typography>
              </Box>
            ) : null}
          </Stack>
        ) : null}
      </AdminShell>

      <ConfirmDialog
        open={confirmCancel}
        title='Cancel this payment request?'
        description={`The link for ${order?.reference} will stop working. The record stays in your payment log.`}
        confirmLabel='Cancel request'
        onCancel={() => setConfirmCancel(false)}
        onConfirm={cancel}
      />
    </>
  );
}

function Row({ label, value, mono }) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0.25, sm: 2 }} sx={{ py: 0.5 }}>
      <Typography variant='body2' sx={{ color: 'text.secondary', minWidth: 150, flexShrink: 0 }}>
        {label}
      </Typography>
      <Typography variant='body2'
        sx={{ fontWeight: 500, wordBreak: 'break-word', ...(mono ? { fontFamily: 'monospace', fontSize: '0.82rem' } : {}) }}>
        {value}
      </Typography>
    </Stack>
  );
}
