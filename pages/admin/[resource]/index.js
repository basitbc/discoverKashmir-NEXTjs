import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AdminShell from '../../../Components/admin/AdminShell';
import ResourceList from '../../../Components/admin/ResourceList';
import { useToast } from '../../../Components/admin/ui/ToastProvider';
import { getResource } from '../../../admin/resources';
import { ApiError } from '../../../services';

/**
 * One list screen serving every resource, driven by the registry.
 *
 * Client-rendered: this is an authenticated tool behind a login, so server
 * rendering buys nothing and the bearer token stays exclusively in the browser.
 */
export default function ResourceListPage() {
  const router = useRouter();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const toast = useToast();

  const resourceKey = typeof router.query.resource === 'string' ? router.query.resource : null;
  const config = resourceKey ? getResource(resourceKey) : null;

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const load = useCallback(
    async (q, status) => {
      if (!config) return;
      setLoading(true);
      setError(null);
      try {
        const result = await config.service.admin.list({
          perPage: 100,
          ...(q ? { q } : {}),
          ...(status && status !== 'all' ? { published: status } : {}),
        });
        setRows(result.items);
      } catch (err) {
        setError(err instanceof ApiError ? err.message : 'Could not load content.');
      } finally {
        setLoading(false);
      }
    },
    [config],
  );

  // Debounced so typing does not fire a request per keystroke.
  useEffect(() => {
    if (!config) return undefined;
    const timer = setTimeout(() => load(search, statusFilter), search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [config, search, statusFilter, load]);

  // Reset filters when switching between resources.
  useEffect(() => {
    setSearch('');
    setStatusFilter('all');
  }, [resourceKey]);

  useEffect(() => {
    if (router.isReady && resourceKey && !config) router.replace('/admin');
  }, [router, resourceKey, config]);

  if (!config) return null;

  const handleReorder = async (items) => {
    // Optimistic: reflect the tap immediately, reconcile with the server after.
    const byId = new Map(items.map((i) => [i.id, i.sortOrder]));
    setRows((prev) => [...prev].sort((a, b) => (byId.get(a.id) ?? 0) - (byId.get(b.id) ?? 0)));

    try {
      await config.service.admin.reorder(items);
    } catch {
      toast.error('Could not save the new order.');
      load(search, statusFilter);
    }
  };

  const handleDelete = async (row) => {
    const previous = rows;
    setRows((prev) => prev.filter((r) => r.id !== row.id));

    try {
      await config.service.admin.remove(row.id);
      toast.success(`${config.singular} deleted.`);
    } catch (err) {
      setRows(previous); // put it back — the delete did not happen
      toast.error(err instanceof ApiError ? err.message : 'Could not delete.');
    }
  };

  return (
    <>
      <Head>
        <title>{config.label} | Discover Kashmir Admin</title>
        <meta name='robots' content='noindex' />
      </Head>

      <AdminShell
        title={config.label}
        breadcrumb='Content'
        actions={
          <Button
            component={Link}
            href={`/admin/${resourceKey}/new`}
            variant='contained'
            startIcon={<AddRoundedIcon />}
            sx={{ whiteSpace: 'nowrap', px: { xs: 1.5, sm: 2 } }}
            aria-label={`New ${config.singular.toLowerCase()}`}
          >
            {/* Label collapses to the icon on narrow screens so the title keeps
                its room; the aria-label carries the meaning either way. */}
            {isDesktop ? 'New' : ''}
          </Button>
        }
      >
        <ResourceList
          resourceKey={resourceKey}
          config={config}
          rows={rows}
          loading={loading}
          error={error}
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onReorder={handleReorder}
          onDelete={handleDelete}
        />
      </AdminShell>
    </>
  );
}
