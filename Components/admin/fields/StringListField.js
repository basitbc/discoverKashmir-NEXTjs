import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

/**
 * Editor for an ordered list of short strings — inclusions, exclusions, things
 * to carry, terms.
 *
 * Reorder is up/down buttons rather than drag-and-drop on purpose: dragging is
 * unreliable on touch inside a scrolling page, and these lists are edited on
 * phones.
 */
export default function StringListField({ label, help, items, onChange, placeholder }) {
  const update = (index, text) => {
    const next = [...items];
    next[index] = text;
    onChange(next);
  };

  const remove = (index) => onChange(items.filter((_, i) => i !== index));

  const move = (index, delta) => {
    const target = index + delta;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <Box>
      <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>{label}</Typography>
      {help ? (
        <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary', mb: 1 }}>
          {help}
        </Typography>
      ) : null}

      <Stack spacing={1} sx={{ mt: 1 }}>
        {items.map((item, index) => (
          <Stack key={index} direction='row' spacing={0.5} alignItems='flex-start'>
            <TextField
              size='small'
              fullWidth
              multiline
              value={item}
              placeholder={placeholder}
              onChange={(e) => update(index, e.target.value)}
            />
            <Stack direction='row'>
              <IconButton
                size='small'
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label='Move up'
              >
                <ArrowUpwardIcon fontSize='small' />
              </IconButton>
              <IconButton
                size='small'
                onClick={() => move(index, 1)}
                disabled={index === items.length - 1}
                aria-label='Move down'
              >
                <ArrowDownwardIcon fontSize='small' />
              </IconButton>
              <IconButton
                size='small'
                onClick={() => remove(index)}
                aria-label='Remove'
                color='error'
              >
                <DeleteIcon fontSize='small' />
              </IconButton>
            </Stack>
          </Stack>
        ))}

        {items.length === 0 ? (
          <Typography sx={{ fontSize: '0.82rem', color: 'text.disabled', py: 1 }}>
            Nothing added yet.
          </Typography>
        ) : null}

        <Button
          size='small'
          startIcon={<AddIcon />}
          onClick={() => onChange([...items, ''])}
          sx={{ alignSelf: 'flex-start' }}
        >
          Add item
        </Button>
      </Stack>
    </Box>
  );
}
