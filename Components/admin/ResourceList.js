import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import ImageNotSupportedRoundedIcon from '@mui/icons-material/ImageNotSupportedRounded';
import { StatusChip, EmptyState, ListSkeleton, ConfirmDialog } from './ui/primitives';

/**
 * Resource list.
 *
 * Two genuinely different layouts rather than one squeezed layout:
 *   phone   — cards, because a table at 375px either scrolls sideways or
 *             truncates every column into uselessness
 *   desktop — a table, because scanning many records benefits from alignment
 *
 * Both are generated from the same `columns` config, so they cannot drift.
 *
 * Row actions live behind an overflow menu on mobile: five icon buttons per
 * card is visual noise and puts destructive actions a mis-tap away from edit.
 */
export default function ResourceList({
  resourceKey,
  config,
  rows,
  loading,
  error,
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onReorder,
  onDelete,
}) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const router = useRouter();
  const [confirm, setConfirm] = useState(null);
  const [menu, setMenu] = useState({ el: null, row: null });

  const edit = (row) => router.push(`/admin/${resourceKey}/${row.id}`);

  const titleOf = (row) =>
    config.titleRender ? config.titleRender(row) : row[config.titleField] ?? `#${row.id}`;

  // Admin responses carry the joined Image row; public ones are flattened to a
  // URL string. Accept either so this component works with both shapes.
  const imageSrc = (row) => {
    const value = row[config.imageField];
    if (!value) return undefined;
    return typeof value === 'string' ? value : value.url;
  };

  const move = (index, delta) => {
    const target = index + delta;
    if (target < 0 || target >= rows.length) return;
    const next = [...rows];
    [next[index], next[target]] = [next[target], next[index]];
    onReorder(next.map((row, i) => ({ id: row.id, sortOrder: i })));
  };

  const filters = useMemo(() => {
    if (!config.hasPublished) return [];
    return [
      { value: 'all', label: 'All' },
      { value: 'true', label: 'Live' },
      { value: 'false', label: 'Drafts' },
    ];
  }, [config.hasPublished]);

  const closeMenu = () => setMenu({ el: null, row: null });

  return (
    <Box>
      {/* ----------------------------------------------------- filter bar */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        sx={{ mb: 2 }}
        alignItems={{ sm: 'center' }}
      >
        <TextField
          fullWidth
          placeholder={`Search ${config.label.toLowerCase()}…`}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{ maxWidth: { sm: 320 } }}
          inputProps={{ 'aria-label': `Search ${config.label}` }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchRoundedIcon fontSize='small' sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
            endAdornment: search ? (
              <InputAdornment position='end'>
                <IconButton size='small' onClick={() => onSearchChange('')} aria-label='Clear search'>
                  <ClearRoundedIcon fontSize='small' />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />

        {filters.length > 0 ? (
          <Stack direction='row' spacing={0.75} role='group' aria-label='Filter by status'>
            {filters.map((f) => (
              <Chip
                key={f.value}
                label={f.label}
                clickable
                onClick={() => onStatusFilterChange(f.value)}
                color={statusFilter === f.value ? 'primary' : 'default'}
                variant={statusFilter === f.value ? 'filled' : 'outlined'}
                aria-pressed={statusFilter === f.value}
                sx={{ height: 32 }}
              />
            ))}
          </Stack>
        ) : null}

        <Box sx={{ flexGrow: 1 }} />

        {!loading && rows.length > 0 ? (
          <Typography variant='caption' sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
            {rows.length} {rows.length === 1 ? 'item' : 'items'}
          </Typography>
        ) : null}
      </Stack>

      {error ? (
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : null}

      {/* --------------------------------------------------------- content */}
      {loading ? (
        <ListSkeleton rows={5} withMedia={Boolean(config.imageField)} />
      ) : rows.length === 0 ? (
        <EmptyState
          icon={<InboxRoundedIcon />}
          title={search || statusFilter !== 'all' ? 'Nothing matches' : `No ${config.label.toLowerCase()} yet`}
          description={
            search || statusFilter !== 'all'
              ? 'Try a different search or clear the filters.'
              : `Create your first ${config.singular.toLowerCase()} to see it on the website.`
          }
          action={
            search || statusFilter !== 'all' ? (
              <Button
                variant='outlined'
                onClick={() => {
                  onSearchChange('');
                  onStatusFilterChange('all');
                }}
              >
                Clear filters
              </Button>
            ) : (
              <Button
                component={Link}
                href={`/admin/${resourceKey}/new`}
                variant='contained'
                startIcon={<AddRoundedIcon />}
              >
                New {config.singular.toLowerCase()}
              </Button>
            )
          }
        />
      ) : isDesktop ? (
        <Paper variant='outlined' sx={{ overflow: 'hidden' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ '& th': { bgcolor: 'background.default', py: 1.25 } }}>
                {config.imageField ? <TableCell sx={{ width: 72 }} /> : null}
                {config.columns.map((col) => (
                  <TableCell key={col.field}>
                    <Typography variant='overline' sx={{ color: 'text.secondary' }}>
                      {col.label}
                    </Typography>
                  </TableCell>
                ))}
                {config.hasPublished ? (
                  <TableCell sx={{ width: 100 }}>
                    <Typography variant='overline' sx={{ color: 'text.secondary' }}>
                      Status
                    </Typography>
                  </TableCell>
                ) : null}
                <TableCell align='right' sx={{ width: 150 }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  hover
                  sx={{ '&:last-child td': { border: 0 }, cursor: 'pointer' }}
                >
                  {config.imageField ? (
                    <TableCell onClick={() => edit(row)}>
                      <Avatar
                        variant='rounded'
                        src={imageSrc(row)}
                        sx={{ width: 48, height: 36, bgcolor: 'action.hover', color: 'text.disabled' }}
                      >
                        <ImageNotSupportedRoundedIcon sx={{ fontSize: 16 }} />
                      </Avatar>
                    </TableCell>
                  ) : null}

                  {config.columns.map((col, ci) => (
                    <TableCell key={col.field} onClick={() => edit(row)}>
                      <Typography
                        variant='body2'
                        sx={{ fontWeight: ci === 0 ? 600 : 400, color: ci === 0 ? 'text.primary' : 'text.secondary' }}
                      >
                        {col.render ? col.render(row) : row[col.field] || '—'}
                      </Typography>
                    </TableCell>
                  ))}

                  {config.hasPublished ? (
                    <TableCell onClick={() => edit(row)}>
                      <StatusChip published={row.published} />
                    </TableCell>
                  ) : null}

                  <TableCell align='right'>
                    <Stack direction='row' spacing={0.25} justifyContent='flex-end'>
                      {config.hasSortOrder ? (
                        <>
                          <Tooltip title='Move up'>
                            <span>
                              <IconButton size='small' onClick={() => move(index, -1)} disabled={index === 0} aria-label={`Move ${titleOf(row)} up`}>
                                <KeyboardArrowUpRoundedIcon fontSize='small' />
                              </IconButton>
                            </span>
                          </Tooltip>
                          <Tooltip title='Move down'>
                            <span>
                              <IconButton size='small' onClick={() => move(index, 1)} disabled={index === rows.length - 1} aria-label={`Move ${titleOf(row)} down`}>
                                <KeyboardArrowDownRoundedIcon fontSize='small' />
                              </IconButton>
                            </span>
                          </Tooltip>
                        </>
                      ) : null}
                      <Tooltip title='Edit'>
                        <IconButton size='small' onClick={() => edit(row)} aria-label={`Edit ${titleOf(row)}`}>
                          <EditRoundedIcon fontSize='small' />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Delete'>
                        <IconButton size='small' color='error' onClick={() => setConfirm(row)} aria-label={`Delete ${titleOf(row)}`}>
                          <DeleteOutlineRoundedIcon fontSize='small' />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      ) : (
        <Stack spacing={1}>
          {rows.map((row, index) => (
            <Card key={row.id} sx={{ p: 1.25 }}>
              <Stack direction='row' spacing={1.5} alignItems='center'>
                {config.imageField ? (
                  <Avatar
                    variant='rounded'
                    src={imageSrc(row)}
                    sx={{ width: 56, height: 56, flexShrink: 0, bgcolor: 'action.hover', color: 'text.disabled' }}
                  >
                    <ImageNotSupportedRoundedIcon fontSize='small' />
                  </Avatar>
                ) : null}

                <Box
                  onClick={() => edit(row)}
                  sx={{ minWidth: 0, flexGrow: 1, cursor: 'pointer', py: 0.5 }}
                >
                  <Typography sx={{ fontWeight: 650, fontSize: '0.9rem', lineHeight: 1.35 }}>
                    {titleOf(row)}
                  </Typography>
                  {config.subtitleField && row[config.subtitleField] ? (
                    <Typography variant='caption' noWrap sx={{ color: 'text.secondary', display: 'block' }}>
                      {row[config.subtitleField]}
                    </Typography>
                  ) : null}
                  {config.hasPublished ? (
                    <Box sx={{ mt: 0.75 }}>
                      <StatusChip published={row.published} />
                    </Box>
                  ) : null}
                </Box>

                <Stack alignItems='center'>
                  {config.hasSortOrder ? (
                    <>
                      <IconButton size='small' onClick={() => move(index, -1)} disabled={index === 0} aria-label={`Move ${titleOf(row)} up`}>
                        <KeyboardArrowUpRoundedIcon fontSize='small' />
                      </IconButton>
                      <IconButton size='small' onClick={() => move(index, 1)} disabled={index === rows.length - 1} aria-label={`Move ${titleOf(row)} down`}>
                        <KeyboardArrowDownRoundedIcon fontSize='small' />
                      </IconButton>
                    </>
                  ) : null}
                  <IconButton
                    size='small'
                    onClick={(e) => setMenu({ el: e.currentTarget, row })}
                    aria-label={`Actions for ${titleOf(row)}`}
                  >
                    <MoreVertRoundedIcon fontSize='small' />
                  </IconButton>
                </Stack>
              </Stack>
            </Card>
          ))}
        </Stack>
      )}

      <Menu anchorEl={menu.el} open={Boolean(menu.el)} onClose={closeMenu}>
        <MenuItem
          onClick={() => {
            edit(menu.row);
            closeMenu();
          }}
        >
          <EditRoundedIcon fontSize='small' style={{ marginRight: 10 }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setConfirm(menu.row);
            closeMenu();
          }}
          sx={{ color: 'error.main' }}
        >
          <DeleteOutlineRoundedIcon fontSize='small' style={{ marginRight: 10 }} />
          Delete
        </MenuItem>
      </Menu>

      <ConfirmDialog
        open={Boolean(confirm)}
        title={`Delete this ${config.singular.toLowerCase()}?`}
        description={`“${confirm ? titleOf(confirm) : ''}” will be removed from the website permanently. This cannot be undone.`}
        onCancel={() => setConfirm(null)}
        onConfirm={() => {
          onDelete(confirm);
          setConfirm(null);
        }}
      />
    </Box>
  );
}
