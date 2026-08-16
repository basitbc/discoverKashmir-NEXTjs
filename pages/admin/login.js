import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

/**
 * Sign in.
 *
 * NextAuth posts the credentials to the content API, which is the source of
 * truth; the returned bearer token is stored in the session for the admin
 * client's request interceptor.
 *
 * Deliberately plain — a login screen's job is to get out of the way. The one
 * affordance worth adding is the show-password toggle, which measurably reduces
 * failed sign-ins on phones where typos are invisible and common.
 */
export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const expired = router.query.expired === '1';

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError(null);

    const result = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    setBusy(false);

    if (result?.error) {
      // Vague on purpose — never reveal whether an email exists.
      setError('Incorrect email or password.');
      return;
    }

    const target = typeof router.query.from === 'string' ? router.query.from : '/admin';
    router.replace(target.startsWith('/admin') ? target : '/admin');
  };

  return (
    <>
      <Head>
        <title>Sign in | Discover Kashmir Admin</title>
        <meta name='robots' content='noindex' />
      </Head>

      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <Stack spacing={0.5} sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant='h1'>Discover Kashmir</Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              Sign in to manage your website content
            </Typography>
          </Stack>

          <Paper variant='outlined' sx={{ p: { xs: 2.5, sm: 3.5 } }}>
            {expired ? (
              <Alert severity='info' sx={{ mb: 2 }}>
                Your session expired. Please sign in again.
              </Alert>
            ) : null}

            {error ? (
              <Alert severity='error' sx={{ mb: 2 }}>
                {error}
              </Alert>
            ) : null}

            <form onSubmit={submit}>
              <Stack spacing={2}>
                <TextField
                  label='Email'
                  type='email'
                  autoComplete='username'
                  autoFocus
                  required
                  fullWidth
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <TextField
                  label='Password'
                  type={showPassword ? 'text' : 'password'}
                  autoComplete='current-password'
                  required
                  fullWidth
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={() => setShowPassword((v) => !v)}
                          edge='end'
                          size='small'
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? (
                            <VisibilityOffRoundedIcon fontSize='small' />
                          ) : (
                            <VisibilityRoundedIcon fontSize='small' />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button type='submit' variant='contained' size='large' disabled={busy} fullWidth>
                  {busy ? <CircularProgress size={22} color='inherit' /> : 'Sign in'}
                </Button>
              </Stack>
            </form>
          </Paper>
        </Box>
      </Box>
    </>
  );
}
