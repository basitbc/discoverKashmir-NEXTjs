import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';

/**
 * Small shared building blocks.
 *
 * Kept in one file because each is a handful of lines and they are always used
 * together; splitting them would add imports without adding clarity.
 */

/**
 * Published / draft indicator.
 *
 * Carries an ICON as well as colour. Status shown by colour alone fails WCAG
 * 1.4.1 and is invisible to the ~8% of men with colour-vision deficiency.
 */
export function StatusChip({ published, size = 'small' }) {
  return (
    <Chip
      size={size}
      variant={published ? 'filled' : 'outlined'}
      color={published ? 'success' : 'default'}
      icon={
        published ? (
          <CheckCircleRoundedIcon sx={{ fontSize: 14 }} />
        ) : (
          <RemoveCircleOutlineRoundedIcon sx={{ fontSize: 14 }} />
        )
      }
      label={published ? 'Live' : 'Draft'}
      sx={{ '& .MuiChip-icon': { ml: 0.75, mr: -0.25 } }}
    />
  );
}

/**
 * Empty state.
 *
 * Always offers the next action. A dead end that only says "no results" makes
 * the user work out what to do; this does that work for them.
 */
export function EmptyState({ icon, title, description, action }) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: { xs: 6, md: 9 },
        px: 3,
        border: '1px dashed',
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      {icon ? (
        <Box sx={{ color: 'text.disabled', mb: 1.5, '& svg': { fontSize: 40 } }}>{icon}</Box>
      ) : null}
      <Typography variant='h3' sx={{ mb: 0.75 }}>
        {title}
      </Typography>
      {description ? (
        <Typography variant='body2' sx={{ color: 'text.secondary', maxWidth: 380, mx: 'auto' }}>
          {description}
        </Typography>
      ) : null}
      {action ? <Box sx={{ mt: 2.5 }}>{action}</Box> : null}
    </Box>
  );
}

/**
 * Skeletons shaped like the content they replace, so the layout does not jump
 * when data arrives. A centred spinner tells the user nothing about what is
 * coming and causes a visible reflow when it does.
 */
export function ListSkeleton({ rows = 5, withMedia = true }) {
  return (
    <Stack spacing={1}>
      {Array.from({ length: rows }).map((_, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            gap: 1.5,
            alignItems: 'center',
            p: 1.5,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
          }}
        >
          {withMedia ? (
            <Skeleton variant='rounded' width={56} height={56} sx={{ flexShrink: 0 }} />
          ) : null}
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Skeleton variant='text' width={`${45 + ((i * 13) % 35)}%`} height={20} />
            <Skeleton variant='text' width='30%' height={16} />
          </Box>
          <Skeleton variant='rounded' width={54} height={22} />
        </Box>
      ))}
    </Stack>
  );
}

export function FormSkeleton() {
  return (
    <Stack spacing={2}>
      {[3, 4, 2].map((fields, section) => (
        <Box
          key={section}
          sx={{ p: 2.5, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}
        >
          <Skeleton variant='text' width={90} height={14} sx={{ mb: 2 }} />
          <Stack spacing={2.5}>
            {Array.from({ length: fields }).map((_, i) => (
              <Skeleton key={i} variant='rounded' height={44} />
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}

/**
 * Destructive confirmation.
 *
 * Names the thing being deleted rather than saying "this item" — the single
 * cheapest guard against deleting the wrong record. The cancel button is the
 * default focus so an accidental Enter does not destroy anything.
 */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Delete',
  onConfirm,
  onCancel,
  busy = false,
}) {
  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth='xs'>
      <DialogTitle sx={{ pb: 1 }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText variant='body2'>{description}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 0, gap: 1 }}>
        <Button onClick={onCancel} autoFocus fullWidth variant='outlined'>
          Cancel
        </Button>
        <Button onClick={onConfirm} color='error' variant='contained' fullWidth disabled={busy}>
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
