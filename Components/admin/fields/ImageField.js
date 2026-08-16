import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  FormHelperText,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import ImageNotSupportedRoundedIcon from '@mui/icons-material/ImageNotSupportedRounded';
import MediaPicker from '../MediaPicker';
import { imagesService } from '../../../services';

/**
 * Image field backed by the media library.
 *
 * The stored value is an image ID, not a URL, so the same photo can be shared
 * across records — change its crop or alt text once and every use updates.
 *
 * The field only holds the id, so on load it fetches the row to show a preview.
 * `initialImage` lets a parent pass the already-loaded object and skip that.
 */
export default function ImageField({
  label,
  value,
  onChange,
  folder = 'general',
  help,
  error,
  initialImage = null,
}) {
  const [image, setImage] = useState(initialImage);
  const [loading, setLoading] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (!value) {
      setImage(null);
      return undefined;
    }
    // Already showing the right one — no need to re-fetch.
    if (image?.id === value) return undefined;

    setLoading(true);
    imagesService.admin
      .get(value)
      .then((row) => {
        if (!cancelled) setImage(row);
      })
      .catch(() => {
        if (!cancelled) setImage(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [value, image?.id]);

  const clear = () => {
    setImage(null);
    onChange(null);
  };

  return (
    <Box>
      <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, mb: 1 }}>{label}</Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems='flex-start'>
        <Box
          sx={{
            width: { xs: '100%', sm: 168 },
            height: { xs: 180, sm: 118 },
            flexShrink: 0,
            borderRadius: 1.5,
            border: '1px solid',
            borderColor: error ? 'error.main' : 'divider',
            bgcolor: 'action.hover',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {loading ? (
            <Skeleton variant='rectangular' width='100%' height='100%' />
          ) : image ? (
            <>
              {/* Plain <img>: the URL may be from any provider, and next/image
                  would need each one allowlisted for an admin-only preview. */}
              <Box
                component='img'
                src={image.url}
                alt=''
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <IconButton
                size='small'
                onClick={clear}
                aria-label={`Remove ${label}`}
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  bgcolor: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
                }}
              >
                <DeleteOutlineRoundedIcon fontSize='small' />
              </IconButton>
            </>
          ) : (
            <Stack alignItems='center' spacing={0.5} sx={{ color: 'text.disabled' }}>
              <ImageNotSupportedRoundedIcon />
              <Typography variant='caption'>No image</Typography>
            </Stack>
          )}
        </Box>

        <Stack spacing={1} sx={{ flexGrow: 1, width: '100%', minWidth: 0 }}>
          <Button
            variant='outlined'
            startIcon={<CollectionsRoundedIcon />}
            onClick={() => setPickerOpen(true)}
            fullWidth
            sx={{ maxWidth: { sm: 230 } }}
          >
            {image ? 'Change image' : 'Choose image'}
          </Button>

          {image ? (
            <Box sx={{ minWidth: 0 }}>
              <Typography variant='caption' noWrap sx={{ display: 'block', color: 'text.secondary' }}>
                {image.filename}
              </Typography>
              <Stack direction='row' spacing={0.5} sx={{ mt: 0.5, flexWrap: 'wrap', gap: 0.5 }}>
                {image.width ? (
                  <Chip size='small' variant='outlined' label={`${image.width}×${image.height}`} />
                ) : null}
                {image.bytes ? (
                  <Chip size='small' variant='outlined' label={`${Math.round(image.bytes / 1024)} KB`} />
                ) : null}
                {image.usageCount > 1 ? (
                  <Chip size='small' color='info' variant='outlined' label={`used ${image.usageCount}×`} />
                ) : null}
              </Stack>
              {!image.alt ? (
                <Typography variant='caption' sx={{ color: 'warning.main', display: 'block', mt: 0.5 }}>
                  No alt text — add one in the media library for accessibility.
                </Typography>
              ) : null}
            </Box>
          ) : null}
        </Stack>
      </Stack>

      {(error || help) && (
        <FormHelperText error={Boolean(error)} sx={{ mt: 0.75, ml: 0 }}>
          {error || help}
        </FormHelperText>
      )}

      <MediaPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        folder={folder}
        selectedId={value ?? null}
        onSelect={(picked) => {
          setImage(picked);
          onChange(picked.id);
        }}
      />
    </Box>
  );
}
