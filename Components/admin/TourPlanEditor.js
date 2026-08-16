import { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RichTextField from './fields/RichTextField';

/**
 * Day-by-day itinerary editor.
 *
 * Days are accordions because a full plan can run to eleven entries with long
 * descriptions — on a phone, a flat list would be an unusable wall of inputs.
 * Only one day is expanded at a time.
 *
 * The whole plan is saved as a single atomic replace (PUT .../tour-plan), which
 * is why order here is authoritative: what the editor sees is what is stored.
 */
export default function TourPlanEditor({ days, onChange }) {
  const [expanded, setExpanded] = useState(0);

  const update = (index, patch) => {
    const next = [...days];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };

  const add = () => {
    onChange([
      ...days,
      { day: String(days.length + 1), title: '', description: '', note: '' },
    ]);
    setExpanded(days.length);
  };

  const remove = (index) => {
    onChange(days.filter((_, i) => i !== index));
    setExpanded(false);
  };

  const move = (index, delta) => {
    const target = index + delta;
    if (target < 0 || target >= days.length) return;
    const next = [...days];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
    setExpanded(target);
  };

  return (
    <Box>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{ mb: 1.5 }}
      >
        <Typography sx={{ fontSize: '0.95rem', fontWeight: 700 }}>
          Tour plan
          <Chip label={`${days.length} days`} size='small' sx={{ ml: 1 }} />
        </Typography>
        <Button size='small' startIcon={<AddIcon />} onClick={add}>
          Add day
        </Button>
      </Stack>

      {days.length === 0 ? (
        <Typography sx={{ fontSize: '0.85rem', color: 'text.disabled', py: 2 }}>
          No days yet. Add the first one to start building the itinerary.
        </Typography>
      ) : null}

      {days.map((day, index) => (
        <Accordion
          key={index}
          expanded={expanded === index}
          onChange={() => setExpanded(expanded === index ? false : index)}
          disableGutters
          sx={{ mb: 1, borderRadius: 1.5, '&:before': { display: 'none' }, border: '1px solid', borderColor: 'divider' }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Stack direction='row' spacing={1} alignItems='center' sx={{ minWidth: 0, flexGrow: 1 }}>
              <Chip label={`Day ${day.day || index + 1}`} size='small' color='primary' />
              <Typography noWrap sx={{ fontSize: '0.88rem', minWidth: 0 }}>
                {day.title || <em style={{ color: '#999' }}>Untitled</em>}
              </Typography>
            </Stack>
          </AccordionSummary>

          <AccordionDetails>
            <Stack spacing={2}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <TextField
                  label='Day'
                  size='small'
                  value={day.day ?? ''}
                  onChange={(e) => update(index, { day: e.target.value })}
                  sx={{ width: { xs: '100%', sm: 90 } }}
                />
                <TextField
                  label='Title'
                  size='small'
                  fullWidth
                  value={day.title ?? ''}
                  onChange={(e) => update(index, { title: e.target.value })}
                />
              </Stack>

              <RichTextField
                label='Description'
                value={day.description ?? ''}
                onChange={(html) => update(index, { description: html })}
                minHeight={150}
              />

              <TextField
                label='Note'
                size='small'
                fullWidth
                multiline
                rows={2}
                value={day.note ?? ''}
                onChange={(e) => update(index, { note: e.target.value })}
                helperText='Optional caveat shown under the day, e.g. extra charges.'
              />

              <Stack direction='row' spacing={0.5} justifyContent='flex-end'>
                <IconButton size='small' onClick={() => move(index, -1)} disabled={index === 0} aria-label='Move day up'>
                  <ArrowUpwardIcon fontSize='small' />
                </IconButton>
                <IconButton size='small' onClick={() => move(index, 1)} disabled={index === days.length - 1} aria-label='Move day down'>
                  <ArrowDownwardIcon fontSize='small' />
                </IconButton>
                <IconButton size='small' color='error' onClick={() => remove(index)} aria-label='Delete day'>
                  <DeleteIcon fontSize='small' />
                </IconButton>
              </Stack>
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
