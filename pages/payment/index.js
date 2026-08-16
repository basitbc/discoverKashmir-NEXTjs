import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { paymentsService, ApiError } from '../../services';

const CURRENCIES = [
  { code: 'INR', symbol: '₹' },
  { code: 'USD', symbol: '$' },
  { code: 'GBP', symbol: '£' },
  { code: 'EUR', symbol: '€' },
  { code: 'AED', symbol: 'AED' },
  { code: 'SGD', symbol: 'S$' },
];

/**
 * Customer payment form. Replaces the old MUI checkout template, which threw
 * on click (`format` was used but never imported) and posted to localhost:3001.
 *
 * The customer enters the amount agreed with us — deliberate, and the agency
 * verifies the figure before confirming the trip.
 *
 * What the browser CANNOT set is anything that steers the money: merchant id,
 * gateway return URLs and the working key all stay on the server. The old form
 * carried all three as hidden inputs, so a tampered page could have sent the
 * payment confirmation somewhere else entirely.
 *
 * The order is recorded BEFORE the redirect, so an abandoned attempt still
 * appears in the admin log rather than vanishing.
 */
export default function PaymentPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    amount: '',
    currency: 'INR',
    description: '',
    billingCity: '',
    billingState: '',
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const set = (key) => (event) => setForm({ ...form, [key]: event.target.value });
  const symbol = CURRENCIES.find((c) => c.code === form.currency)?.symbol ?? '';

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setErrors({});

    try {
      const { reference } = await paymentsService.create({
        ...form,
        customerPhone: form.customerPhone || null,
        billingCity: form.billingCity || null,
        billingState: form.billingState || null,
      });
      router.push(`/pay/${reference}`);
    } catch (err) {
      if (err instanceof ApiError) {
        setErrors(err.fieldErrors);
        setError(err.isValidation ? 'Please check the highlighted fields.' : err.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
      setBusy(false);
    }
  };

  return (
    <>
      <Head>
        <title>Make a payment | Discover Kashmir</title>
        <meta name='robots' content='noindex' />
      </Head>

      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'center',
          p: { xs: 2, sm: 3 },
          pt: { xs: 4, md: 3 },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 520 }}>
          <Stack spacing={0.5} sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant='h1'>Make a payment</Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              Enter the amount agreed with us and pay securely
            </Typography>
          </Stack>

          <Paper variant='outlined' component='form' onSubmit={submit}>
            <Stack spacing={2.5} sx={{ p: { xs: 2.5, sm: 3 } }}>
              {error ? <Alert severity='error'>{error}</Alert> : null}

              <TextField
                label='Amount'
                required
                fullWidth
                value={form.amount}
                onChange={set('amount')}
                error={Boolean(errors.amount)}
                helperText={errors.amount || 'The figure we agreed with you'}
                inputMode='decimal'
                InputProps={{
                  startAdornment: <InputAdornment position='start'>{symbol}</InputAdornment>,
                  endAdornment: (
                    <InputAdornment position='end'>
                      <TextField
                        select
                        variant='standard'
                        value={form.currency}
                        onChange={set('currency')}
                        InputProps={{ disableUnderline: true }}
                        sx={{ '& .MuiSelect-select': { py: 0, fontSize: '0.85rem' } }}
                        aria-label='Currency'
                      >
                        {CURRENCIES.map((c) => (
                          <MenuItem key={c.code} value={c.code}>
                            {c.code}
                          </MenuItem>
                        ))}
                      </TextField>
                    </InputAdornment>
                  ),
                }}
                // The amount is what this screen is about — make it the focus.
                sx={{ '& input': { fontSize: '1.5rem', fontWeight: 700, py: 1.25 } }}
              />

              <TextField
                label='What is this payment for?'
                required
                fullWidth
                multiline
                rows={2}
                value={form.description}
                onChange={set('description')}
                error={Boolean(errors.description)}
                helperText={
                  errors.description || 'e.g. Advance for Kashmir family package, 12–17 May'
                }
              />

              <Divider />

              <TextField
                label='Your name'
                required
                fullWidth
                value={form.customerName}
                onChange={set('customerName')}
                error={Boolean(errors.customerName)}
                helperText={errors.customerName}
              />
              <TextField
                label='Email'
                type='email'
                required
                fullWidth
                value={form.customerEmail}
                onChange={set('customerEmail')}
                error={Boolean(errors.customerEmail)}
                helperText={errors.customerEmail || 'Your receipt goes here'}
              />
              <TextField
                label='Phone'
                fullWidth
                value={form.customerPhone}
                onChange={set('customerPhone')}
                error={Boolean(errors.customerPhone)}
                helperText={errors.customerPhone}
              />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label='City'
                  fullWidth
                  value={form.billingCity}
                  onChange={set('billingCity')}
                />
                <TextField
                  label='State'
                  fullWidth
                  value={form.billingState}
                  onChange={set('billingState')}
                />
              </Stack>
            </Stack>

            <Divider />

            <Box sx={{ p: { xs: 2.5, sm: 3 } }}>
              <Button
                type='submit'
                variant='contained'
                size='large'
                fullWidth
                disabled={busy}
                startIcon={busy ? null : <LockRoundedIcon />}
                sx={{ py: 1.5, fontSize: '1rem' }}
              >
                {busy ? <CircularProgress size={24} color='inherit' /> : 'Continue to payment'}
              </Button>
              <Typography
                variant='caption'
                sx={{ display: 'block', textAlign: 'center', color: 'text.secondary', mt: 1.5 }}
              >
                You will review everything before paying. Card details are entered on
                CCAvenue&rsquo;s secure page, never here.
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
}
