import { useMemo, useState } from 'react';
import {
  Badge,
  Box,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Paper,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import ImageField from './fields/ImageField';
import RichTextField from './fields/RichTextField';
import { groupFields } from '../../admin/resources';

/**
 * Config-driven form.
 *
 * Sections are TABS rather than one continuous scroll. A package has sixteen
 * fields; as a single column that is four phone-screens of scrolling, and the
 * fields a user actually came to change are buried among ones they rarely
 * touch. Tabs put "Details", "SEO" and "Visibility" one tap apart.
 *
 * The risk with tabs is hiding a validation error on an inactive tab, so each
 * tab carries an error count badge and the form jumps to the first failing tab
 * on submit.
 *
 * Fields stay in a single column at every width: multi-column forms scan badly,
 * break down on phones, and gain little for content of this shape.
 */
export default function ResourceForm({
  fields,
  values,
  errors,
  onChange,
  options = {},
  activeSection,
  onSectionChange,
}) {
  const sections = useMemo(() => groupFields(fields), [fields]);
  const [internalTab, setInternalTab] = useState(0);

  const tab = activeSection ?? internalTab;
  const setTab = onSectionChange ?? setInternalTab;

  const errorCounts = useMemo(
    () =>
      sections.map(
        (section) => section.items.filter((f) => errors?.[f.name]).length,
      ),
    [sections, errors],
  );

  const setValue = (name, value) => onChange({ ...values, [name]: value });

  const renderField = (field) => {
    const value = values[field.name];
    const error = errors?.[field.name];

    const common = {
      key: field.name,
      fullWidth: true,
      label: field.label,
      required: field.required,
      error: Boolean(error),
      helperText: error || field.help,
      placeholder: field.placeholder,
    };

    switch (field.type) {
      case 'image':
        return (
          <ImageField
            key={field.name}
            label={field.label}
            value={value ?? ''}
            folder={field.folder}
            help={field.help}
            error={error}
            onChange={(url) => setValue(field.name, url)}
          />
        );

      case 'richtext':
        return (
          <RichTextField
            key={field.name}
            label={field.label}
            value={value ?? ''}
            help={field.help}
            error={error}
            onChange={(html) => setValue(field.name, html)}
          />
        );

      case 'switch':
        return (
          <Box
            key={field.name}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 2,
              py: 0.5,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                {field.label}
              </Typography>
              {field.help ? (
                <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                  {field.help}
                </Typography>
              ) : null}
            </Box>
            <Switch
              checked={Boolean(value)}
              onChange={(e) => setValue(field.name, e.target.checked)}
              inputProps={{ 'aria-label': field.label }}
            />
          </Box>
        );

      case 'select':
        return (
          <TextField
            {...common}
            select
            value={value ?? ''}
            onChange={(e) => setValue(field.name, e.target.value)}
          >
            {(options[field.optionsFrom] ?? []).map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        );

      case 'number':
        return (
          <TextField
            {...common}
            type='number'
            value={value ?? 0}
            onChange={(e) => setValue(field.name, Number(e.target.value))}
          />
        );

      case 'date':
        return (
          <TextField
            {...common}
            type='date'
            InputLabelProps={{ shrink: true }}
            value={value ? String(value).slice(0, 10) : ''}
            onChange={(e) => setValue(field.name, e.target.value || null)}
          />
        );

      case 'textarea':
        return (
          <TextField
            {...common}
            multiline
            rows={field.rows ?? 4}
            value={value ?? ''}
            onChange={(e) => setValue(field.name, e.target.value)}
          />
        );

      default:
        return (
          <TextField
            {...common}
            value={value ?? ''}
            onChange={(e) => setValue(field.name, e.target.value)}
          />
        );
    }
  };

  const current = sections[tab] ?? sections[0];

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={(_, next) => setTab(next)}
        variant='scrollable'
        scrollButtons='auto'
        allowScrollButtonsMobile
        sx={{
          mb: 2,
          minHeight: 44,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        {sections.map((section, index) => (
          <Tab
            key={section.title}
            label={
              errorCounts[index] > 0 ? (
                <Badge badgeContent={errorCounts[index]} color='error' sx={{ pr: 1.5 }}>
                  {section.title}
                </Badge>
              ) : (
                section.title
              )
            }
            id={`form-tab-${index}`}
            aria-controls={`form-panel-${index}`}
          />
        ))}
      </Tabs>

      <Paper
        variant='outlined'
        role='tabpanel'
        id={`form-panel-${tab}`}
        aria-labelledby={`form-tab-${tab}`}
        sx={{ p: { xs: 2, md: 3 } }}
      >
        <Stack spacing={3}>{current?.items.map(renderField)}</Stack>
      </Paper>
    </Box>
  );
}

/** Given field errors, returns the index of the first section containing one. */
export function firstSectionWithError(fields, errors) {
  const sections = groupFields(fields);
  const index = sections.findIndex((s) => s.items.some((f) => errors?.[f.name]));
  return index === -1 ? null : index;
}
