import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  Skeleton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded';
import { EmptyState } from './ui/primitives';
import { imagesService, uploadsService, ApiError } from '../../services';

const FOLDERS = ['all', 'packages', 'destinations', 'blogs', 'testimonials', 'hero', 'general'];

/**
 * Media library picker.
 *
 * Reuse is the whole point: a photo already on the site should be one tap away,
 * not a second upload. So the library is what opens first and uploading is the
 * secondary action, rather than the other way round.
 *
 * Full-screen on phones — a grid of thumbnails inside a small dialog is
 * unusable, and picking an image is a focused task that deserves the screen.
 */
export default function MediaPicker({ open, onClose, onSelect, folder = 'general', selectedId }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const fileRef = useRef(null);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [activeFolder, setActiveFolder] = useState(folder);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [chosen, setChosen] = useState(selectedId ?? null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await imagesService.admin.list({
        perPage: 60,
        ...(search ? { q: search } : {}),
        ...(activeFolder !== 'all' ? { folder: activeFolder } : {}),
      });
      setItems(result.items);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not load the media library.');
    } finally {
      setLoading(false);
    }
  }, [search, activeFolder]);

  useEffect(() => {
    if (!open) return undefined;
    const timer = setTimeout(load, search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [open, load, search]);

  useEffect(() => {
    if (open) {
      setChosen(selectedId ?? null);
      setActiveFolder(folder);
    }
  }, [open, selectedId, folder]);

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      // The API creates the library row, so a new upload is immediately
      // reusable elsewhere rather than being welded to this one record.
      const image = await uploadsService.upload(file, activeFolder === 'all' ? folder : activeFolder, setProgress);
      onSelect(image);
      onClose();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const confirm = () => {
    const image = items.find((i) => i.id === chosen);
    if (image) onSelect(image);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='md' fullScreen={fullScreen}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 1 }}>
        <CollectionsRoundedIcon fontSize='small' />
        <Box sx={{ flexGrow: 1 }}>Media library</Box>
        <IconButton onClick={onClose} size='small' aria-label='Close'>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Stack spacing={1.5} sx={{ mb: 2 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <TextField
              fullWidth
              placeholder='Search by name or alt text…'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchRoundedIcon fontSize='small' />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant='contained'
              startIcon={<UploadRoundedIcon />}
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              sx={{ whiteSpace: 'nowrap', minWidth: 150 }}
            >
              Upload new
            </Button>
            <input
              ref={fileRef}
              type='file'
              accept='image/jpeg,image/png,image/webp,image/avif,image/gif'
              hidden
              onChange={handleUpload}
            />
          </Stack>

          <Stack direction='row' spacing={0.75} sx={{ overflowX: 'auto', pb: 0.5 }}>
            {FOLDERS.map((f) => (
              <Chip
                key={f}
                label={f === 'all' ? 'All' : f}
                clickable
                size='small'
                onClick={() => setActiveFolder(f)}
                color={activeFolder === f ? 'primary' : 'default'}
                variant={activeFolder === f ? 'filled' : 'outlined'}
                sx={{ textTransform: 'capitalize', flexShrink: 0 }}
              />
            ))}
          </Stack>

          {uploading ? <LinearProgress variant='determinate' value={progress} /> : null}
          {error ? <Alert severity='error'>{error}</Alert> : null}
        </Stack>

        {loading ? (
          <Grid container spacing={1}>
            {Array.from({ length: 12 }).map((_, i) => (
              <Grid item xs={4} sm={3} md={2} key={i}>
                <Skeleton variant='rounded' sx={{ pt: '100%' }} />
              </Grid>
            ))}
          </Grid>
        ) : items.length === 0 ? (
          <EmptyState
            icon={<CollectionsRoundedIcon />}
            title={search ? 'No matches' : 'No images yet'}
            description={
              search ? 'Try a different search.' : 'Upload one to start your library.'
            }
          />
        ) : (
          <Grid container spacing={1}>
            {items.map((image) => {
              const active = chosen === image.id;
              return (
                <Grid item xs={4} sm={3} md={2} key={image.id}>
                  <Box
                    role='button'
                    tabIndex={0}
                    aria-pressed={active}
                    aria-label={image.alt || image.filename}
                    onClick={() => setChosen(image.id)}
                    onDoubleClick={() => {
                      onSelect(image);
                      onClose();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setChosen(image.id);
                      }
                    }}
                    sx={{
                      position: 'relative',
                      pt: '100%',
                      borderRadius: 1.5,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: '2px solid',
                      borderColor: active ? 'primary.main' : 'divider',
                      transition: 'border-color 120ms',
                      '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 2 },
                    }}
                  >
                    <Box
                      component='img'
                      src={image.url}
                      alt=''
                      loading='lazy'
                      sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {active ? (
                      <CheckCircleRoundedIcon
                        sx={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          color: 'primary.main',
                          bgcolor: 'background.paper',
                          borderRadius: '50%',
                          fontSize: 20,
                        }}
                      />
                    ) : null}
                    {/* Shows where a photo is already used, so reusing it is an
                        informed choice rather than a surprise. */}
                    {image.usageCount > 0 ? (
                      <Chip
                        size='small'
                        label={`in ${image.usageCount}`}
                        sx={{
                          position: 'absolute',
                          bottom: 4,
                          left: 4,
                          height: 18,
                          fontSize: '0.6rem',
                          bgcolor: 'rgba(0,0,0,0.6)',
                          color: '#fff',
                        }}
                      />
                    ) : null}
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 2, py: 1.5, gap: 1 }}>
        <Typography variant='caption' sx={{ color: 'text.secondary', flexGrow: 1 }}>
          {items.length} image{items.length === 1 ? '' : 's'}
        </Typography>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant='contained' onClick={confirm} disabled={!chosen}>
          Use image
        </Button>
      </DialogActions>
    </Dialog>
  );
}
