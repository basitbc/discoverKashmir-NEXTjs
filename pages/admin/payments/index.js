import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import AdminShell from '../../../Components/admin/AdminShell';
import { EmptyState, ListSkeleton } from '../../../Components/admin/ui/primitives';
import { useToast } from '../../../Components/admin/ui/ToastProvider';
import { paymentsService, ApiError } from '../../../services';

const STATUS_COLOR = {
  SUCCESS: 'success',
  PENDING: 'default',
  INITIATED: 'info',
  FAILED: 'error',
  ABORTED: 'warning',
  CANCELLED: 'default',
  REFUNDED: 'secondary',
};

const FILTERS = ['all', 'SUCCESS', 'PENDING', 'INITIATED', 'FAILED', 'ABORTED', 'CANCELLED'];
const SYMBOL = { INR: '₹', USD: '$', GBP: '£', EUR: '€', AED: 'AED ', SGD: 'S$' };

const money = (amount, currency) =>
  `${SYMBOL[currency] ?? ''}${Number(amount).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

/**
 * Payment log.
 *
 * Read-mostly by design. Staff raise requests and watch them settle; nothing
 * here edits a transaction, because a payment record is financial history —
 * the only state change offered is cancelling an unpaid request.
 */
export default function AdminPayments() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const router = useRouter();
  const toast = useToast();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [config, setConfig] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await paymentsService.admin.list({
        perPage: 50,
        ...(search ? { q: search } : {}),
        ...(status !== 'all' ? { status } : {}),
      });
      setData(result);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not load payments.');
    } finally {
      setLoading(false);
    }
  }, [search, status]);

  useEffect(() => {
    const timer = setTimeout(load, search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [load, search]);

  useEffect(() => {
    paymentsService.admin.config().then(setConfig).catch(() => {});
  }, []);

  // ⌘K offers "New payment request", which lands here with ?new=1.
  useEffect(() => {
    if (router.query.new === '1') setDialogOpen(true);
  }, [router.query.new]);

  const rows = data?.items ?? [];

  return (
    <>
      <Head>
        <title>Payments | Discover Kashmir Admin</title>
        <meta name='robots' content='noindex' />
      </Head>

      <AdminShell
        title='Payments'
        breadcrumb='Finance'
        actions={
          <Button
            variant='contained'
            startIcon={<AddRoundedIcon />}
            onClick={() => setDialogOpen(true)}
            sx={{ whiteSpace: 'nowrap' }}
          >
            {isDesktop ? 'New request' : 'New'}
          </Button>
        }
      >
        {/* Staff must never be left guessing why a payment link does nothing. */}
        {config && !config.configured ? (
          <Alert severity='warning' sx={{ mb: 2 }}>
            Payments are not configured — customers cannot pay yet. Missing:{' '}
            {config.missing.join(', ')}.
          </Alert>
        ) : null}
        {config?.configured && config.environment === 'test' ? (
          <Alert severity='info' sx={{ mb: 2 }}>
            Running against the <strong>test</strong> gateway. No real money moves.
          </Alert>
        ) : null}

        <Grid container spacing={{ xs: 1.25, md: 2 }} sx={{ mb: 2.5 }}>
          <Stat label='Collected' value={data ? money(data.summary.collected, 'INR') : '—'} />
          <Stat label='Successful' value={data ? data.summary.successfulCount : '—'} />
          <Stat label='Shown' value={data ? data.total : '—'} />
        </Grid>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            placeholder='Search reference, name, email or tracking id…'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ maxWidth: { sm: 360 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchRoundedIcon fontSize='small' />
                </InputAdornment>
              ),
              endAdornment: search ? (
                <InputAdornment position='end'>
                  <IconButton size='small' onClick={() => setSearch('')} aria-label='Clear'>
                    <ClearRoundedIcon fontSize='small' />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />
          <TextField
            select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ minWidth: 160 }}
            aria-label='Filter by status'
          >
            {FILTERS.map((f) => (
              <MenuItem key={f} value={f}>
                {f === 'all' ? 'All statuses' : f.charAt(0) + f.slice(1).toLowerCase()}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        {error ? <Alert severity='error' sx={{ mb: 2 }}>{error}</Alert> : null}

        {loading ? (
          <ListSkeleton rows={5} withMedia={false} />
        ) : rows.length === 0 ? (
          <EmptyState
            icon={<ReceiptLongRoundedIcon />}
            title={search || status !== 'all' ? 'No matching payments' : 'No payments yet'}
            description={
              search || status !== 'all'
                ? 'Try a different search or clear the filter.'
                : 'Raise a request after quoting a trip, then send the customer the link.'
            }
            action={
              <Button variant='contained' startIcon={<AddRoundedIcon />} onClick={() => setDialogOpen(true)}>
                New payment request
              </Button>
            }
          />
        ) : isDesktop ? (
          <Paper variant='outlined' sx={{ overflow: 'hidden' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ '& th': { bgcolor: 'background.default', py: 1.25 } }}>
                  {['Reference', 'Customer', 'Amount', 'Status', 'Raised'].map((h) => (
                    <TableCell key={h}>
                      <Typography variant='overline' sx={{ color: 'text.secondary' }}>{h}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((p) => (
                  <TableRow
                    key={p.id}
                    hover
                    sx={{ cursor: 'pointer', '&:last-child td': { border: 0 } }}
                    onClick={() => router.push(`/admin/payments/${p.id}`)}
                  >
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{p.reference}</TableCell>
                    <TableCell>
                      <Typography variant='body2' sx={{ fontWeight: 600 }}>{p.customerName}</Typography>
                      <Typography variant='caption' sx={{ color: 'text.secondary' }}>{p.customerEmail}</Typography>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 650, whiteSpace: 'nowrap' }}>
                      {money(p.amount, p.currency)}
                    </TableCell>
                    <TableCell>
                      <Chip size='small' label={p.status} color={STATUS_COLOR[p.status]} variant={p.status === 'SUCCESS' ? 'filled' : 'outlined'} />
                    </TableCell>
                    <TableCell>
                      <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                        {new Date(p.createdAt).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        ) : (
          <Stack spacing={1}>
            {rows.map((p) => (
              <Card key={p.id} sx={{ p: 1.75, cursor: 'pointer' }} onClick={() => router.push(`/admin/payments/${p.id}`)}>
                <Stack direction='row' justifyContent='space-between' alignItems='flex-start' spacing={1}>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 650, fontSize: '0.95rem' }}>{p.customerName}</Typography>
                    <Typography variant='caption' noWrap sx={{ color: 'text.secondary', display: 'block' }}>
                      {p.reference}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                    <Typography sx={{ fontWeight: 700 }}>{money(p.amount, p.currency)}</Typography>
                    <Chip size='small' label={p.status} color={STATUS_COLOR[p.status]} variant={p.status === 'SUCCESS' ? 'filled' : 'outlined'} sx={{ mt: 0.5 }} />
                  </Box>
                </Stack>
              </Card>
            ))}
          </Stack>
        )}
      </AdminShell>

      <NewRequestDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          if (router.query.new) router.replace('/admin/payments', undefined, { shallow: true });
        }}
        onCreated={(order) => {
          toast.success('Payment request created.');
          load();
          router.push(`/admin/payments/${order.id}`);
        }}
      />
    </>
  );
}

function Stat({ label, value }) {
  return (
    <Grid item xs={4}>
      <Card sx={{ p: { xs: 1.5, md: 2 } }}>
        <Typography variant='overline' sx={{ color: 'text.secondary' }}>{label}</Typography>
        <Typography sx={{ fontSize: { xs: '1.15rem', md: '1.5rem' }, fontWeight: 750, lineHeight: 1.2 }}>
          {value}
        </Typography>
      </Card>
    </Grid>
  );
}

function NewRequestDialog({ open, onClose, onCreated }) {
  const toast = useToast();
  const [form, setForm] = useState({
    customerName: '', customerEmail: '', customerPhone: '',
    amount: '', currency: 'INR', description: '', notes: '',
  });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setErrors({});
    try {
      const order = await paymentsService.admin.create({
        ...form,
        customerPhone: form.customerPhone || null,
        notes: form.notes || null,
      });
      setForm({ customerName:'', customerEmail:'', customerPhone:'', amount:'', currency:'INR', description:'', notes:'' });
      onCreated(order);
      onClose();
    } catch (err) {
      if (err instanceof ApiError) {
        setErrors(err.fieldErrors);
        toast.error(err.message);
      } else {
        toast.error('Could not create the request.');
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <form onSubmit={submit}>
        <DialogTitle>New payment request</DialogTitle>
        <DialogContent dividers>
          <Typography variant='body2' sx={{ color: 'text.secondary', mb: 2.5 }}>
            The customer pays exactly this amount — they cannot change it.
          </Typography>
          <Stack spacing={2.5}>
            <TextField label='Customer name' required fullWidth value={form.customerName}
              onChange={set('customerName')} error={!!errors.customerName} helperText={errors.customerName} />
            <TextField label='Email' type='email' required fullWidth value={form.customerEmail}
              onChange={set('customerEmail')} error={!!errors.customerEmail} helperText={errors.customerEmail} />
            <TextField label='Phone' fullWidth value={form.customerPhone} onChange={set('customerPhone')} />
            <Stack direction='row' spacing={1.5}>
              <TextField label='Amount' required fullWidth value={form.amount} onChange={set('amount')}
                placeholder='25000.00' error={!!errors.amount}
                helperText={errors.amount || 'Numbers only, up to 2 decimal places'} />
              <TextField select label='Currency' value={form.currency} onChange={set('currency')} sx={{ minWidth: 110 }}>
                {['INR','USD','GBP','EUR','AED','SGD'].map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </TextField>
            </Stack>
            <TextField label='What is this for?' required fullWidth multiline rows={2}
              value={form.description} onChange={set('description')}
              placeholder='Kashmir Family Package — 5 nights, advance payment'
              error={!!errors.description}
              helperText={errors.description || 'Shown to the customer on the payment page'} />
            <TextField label='Internal notes' fullWidth multiline rows={2} value={form.notes}
              onChange={set('notes')} helperText='Never shown to the customer' />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type='submit' variant='contained' disabled={busy}>
            {busy ? 'Creating…' : 'Create & get link'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
