import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Alert,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import AdminShell from '../../../Components/admin/AdminShell';
import ResourceForm, { firstSectionWithError } from '../../../Components/admin/ResourceForm';
import TourPlanEditor from '../../../Components/admin/TourPlanEditor';
import StringListField from '../../../Components/admin/fields/StringListField';
import SaveBar from '../../../Components/admin/ui/SaveBar';
import { ConfirmDialog, FormSkeleton, StatusChip } from '../../../Components/admin/ui/primitives';
import { useToast } from '../../../Components/admin/ui/ToastProvider';
import { getResource } from '../../../admin/resources';
import { ApiError, districtsService, packagesService } from '../../../services';

const LIST_KINDS = [
  { kind: 'INCLUSION', label: "What's included" },
  { kind: 'EXCLUSION', label: "What's not included" },
  { kind: 'THING_TO_CARRY', label: 'Things to carry' },
  { kind: 'MAJOR_ACTIVITY', label: 'Major activities' },
  { kind: 'TERM', label: 'Terms and conditions' },
];

const PUBLIC_PATH = {
  packages: 'packages',
  destinations: 'destinations',
  blogs: 'travelblogs',
};

/**
 * One edit screen serving every resource. `id === 'new'` means create.
 *
 * Packages additionally get the tour-plan and list editors, saved as separate
 * atomic replaces after the record itself — the API models them that way
 * because they are ordered collections, not scalar fields.
 */
export default function ResourceEditPage() {
  const router = useRouter();
  const toast = useToast();

  const resourceKey = typeof router.query.resource === 'string' ? router.query.resource : null;
  const rawId = typeof router.query.id === 'string' ? router.query.id : null;
  const isNew = rawId === 'new';
  const config = resourceKey ? getResource(resourceKey) : null;

  const [values, setValues] = useState({});
  const [tourPlan, setTourPlan] = useState([]);
  const [lists, setLists] = useState({});
  const [defaults, setDefaults] = useState({});
  const [districtOptions, setDistrictOptions] = useState([]);
  const [dirty, setDirty] = useState(new Set());
  const [section, setSection] = useState(0);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(false);

  const isPackage = resourceKey === 'packages';

  const initialValues = useMemo(() => {
    if (!config) return {};
    return Object.fromEntries(
      config.fields.map((f) => [f.name, f.defaultValue ?? (f.type === 'switch' ? false : '')]),
    );
  }, [config]);

  const load = useCallback(async () => {
    if (!config || !rawId) return;
    setLoading(true);
    setError(null);

    try {
      if (config.fields.some((f) => f.optionsFrom === 'districts')) {
        const districts = await districtsService.admin.list({ perPage: 100 });
        setDistrictOptions(districts.items.map((d) => ({ value: d.id, label: d.name })));
      }

      if (isPackage) {
        const res = await packagesService.getDefaults();
        setDefaults(res.lists ?? {});
      }

      if (isNew) {
        setValues(initialValues);
        setTourPlan([]);
        setLists(Object.fromEntries(LIST_KINDS.map((k) => [k.kind, []])));
      } else {
        const record = await config.service.admin.get(Number(rawId));
        setValues({ ...initialValues, ...record });
        setTourPlan(record.tourPlan ?? []);

        // listItems are the RAW per-package overrides; an empty list for a kind
        // means the package inherits the global default for that kind.
        const grouped = Object.fromEntries(LIST_KINDS.map((k) => [k.kind, []]));
        for (const item of record.listItems ?? []) {
          if (grouped[item.kind]) grouped[item.kind].push(item.text);
        }
        setLists(grouped);
      }

      setDirty(new Set());
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not load this record.');
    } finally {
      setLoading(false);
    }
  }, [config, rawId, isNew, isPackage, initialValues]);

  useEffect(() => {
    if (router.isReady) load();
  }, [router.isReady, load]);

  useEffect(() => {
    if (router.isReady && resourceKey && !config) router.replace('/admin');
  }, [router, resourceKey, config]);

  if (!config) return null;

  const markDirty = (key) => setDirty((prev) => new Set(prev).add(key));

  const save = async () => {
    setSaving(true);
    setError(null);
    setFieldErrors({});

    try {
      // Send only declared fields — a loaded record also carries id, timestamps
      // and relations, which the API rejects as unknown keys.
      const payload = {};
      for (const field of config.fields) {
        const value = values[field.name];
        if (field.type === 'number') payload[field.name] = Number(value) || 0;
        else if (field.type === 'switch') payload[field.name] = Boolean(value);
        else payload[field.name] = value === '' ? null : value;
      }
      if (!payload.slug) delete payload.slug;

      const saved = isNew
        ? await config.service.admin.create(payload)
        : await config.service.admin.update(Number(rawId), payload);

      if (isPackage) {
        if (dirty.has('tourPlan') || isNew) {
          await packagesService.admin.replaceTourPlan(
            saved.id,
            tourPlan.map((d, i) => ({
              day: String(d.day ?? i + 1),
              title: d.title ?? '',
              description: d.description ?? '',
              note: d.note || null,
              sortOrder: i,
            })),
          );
        }

        for (const { kind } of LIST_KINDS) {
          if (!dirty.has(`list:${kind}`)) continue;
          await packagesService.admin.replaceListItems(
            saved.id,
            kind,
            (lists[kind] ?? []).map((s) => s.trim()).filter(Boolean),
          );
        }
      }

      setDirty(new Set());
      toast.success('Saved — the website updates in a few seconds.');

      if (isNew) {
        router.replace(`/admin/${resourceKey}/${saved.id}`);
      } else {
        setValues((prev) => ({ ...prev, ...saved }));
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setFieldErrors(err.fieldErrors);
        setError(err.message);
        // Validation errors can live on a tab that is not visible; jump to the
        // first one so the user is never told "invalid" with nothing showing.
        const target = firstSectionWithError(config.fields, err.fieldErrors);
        if (target !== null) setSection(target);
      } else {
        setError('Could not save. Please try again.');
      }
      toast.error('Save failed — check the highlighted fields.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    try {
      await config.service.admin.remove(Number(rawId));
      toast.success(`${config.singular} deleted.`);
      router.replace(`/admin/${resourceKey}`);
    } catch (err) {
      setConfirmDelete(false);
      toast.error(err instanceof ApiError ? err.message : 'Could not delete.');
    }
  };

  const heading = isNew
    ? `New ${config.singular.toLowerCase()}`
    : values[config.titleField] || config.singular;

  const publicPath = PUBLIC_PATH[resourceKey];
  const canPreview = !isNew && publicPath && values.slug;

  return (
    <>
      <Head>
        <title>{heading} | Discover Kashmir Admin</title>
        <meta name='robots' content='noindex' />
      </Head>

      <AdminShell
        title={heading}
        breadcrumb={config.label}
        maxWidth={880}
        actions={
          canPreview ? (
            <Button
              size='small'
              variant='outlined'
              startIcon={<OpenInNewRoundedIcon />}
              href={`/${publicPath}/${values.slug}`}
              target='_blank'
              rel='noopener noreferrer'
              sx={{ display: { xs: 'none', sm: 'inline-flex' }, whiteSpace: 'nowrap' }}
            >
              View
            </Button>
          ) : null
        }
      >
        {loading ? (
          <FormSkeleton />
        ) : (
          <>
            {config.hasPublished && !isNew ? (
              <Box sx={{ mb: 2 }}>
                <StatusChip published={Boolean(values.published)} />
              </Box>
            ) : null}

            {error ? (
              <Alert severity='error' sx={{ mb: 2 }}>
                {error}
              </Alert>
            ) : null}

            <ResourceForm
              fields={config.fields}
              values={values}
              errors={fieldErrors}
              options={{ districts: districtOptions }}
              activeSection={section}
              onSectionChange={setSection}
              onChange={(next) => {
                setValues(next);
                markDirty('fields');
              }}
            />

            {isPackage ? (
              <>
                <Paper variant='outlined' sx={{ p: { xs: 2, md: 3 }, mt: 2 }}>
                  <TourPlanEditor
                    days={tourPlan}
                    onChange={(next) => {
                      setTourPlan(next);
                      markDirty('tourPlan');
                    }}
                  />
                </Paper>

                <Paper variant='outlined' sx={{ p: { xs: 2, md: 3 }, mt: 2 }}>
                  <Typography variant='overline' sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
                    Inclusions &amp; details
                  </Typography>

                  <Stack spacing={3} divider={<Divider />}>
                    {LIST_KINDS.map(({ kind, label }) => {
                      const items = lists[kind] ?? [];
                      return (
                        <StringListField
                          key={kind}
                          label={label}
                          items={items}
                          help={
                            items.length === 0
                              ? `Using the shared default (${(defaults[kind] ?? []).length} items). Add one here to override it for this package.`
                              : 'Overrides the shared default for this package.'
                          }
                          onChange={(next) => {
                            setLists((prev) => ({ ...prev, [kind]: next }));
                            markDirty(`list:${kind}`);
                          }}
                        />
                      );
                    })}
                  </Stack>
                </Paper>
              </>
            ) : null}

            {!isNew ? (
              <Box sx={{ mt: 3 }}>
                <Button
                  color='error'
                  variant='outlined'
                  startIcon={<DeleteOutlineRoundedIcon />}
                  onClick={() => setConfirmDelete(true)}
                >
                  Delete {config.singular.toLowerCase()}
                </Button>
              </Box>
            ) : null}
          </>
        )}
      </AdminShell>

      <SaveBar
        visible={!loading && (dirty.size > 0 || isNew)}
        saving={saving}
        onSave={save}
        onDiscard={dirty.size > 0 ? load : undefined}
        label={isNew ? `New ${config.singular.toLowerCase()}` : 'Unsaved changes'}
      />

      <ConfirmDialog
        open={confirmDelete}
        title={`Delete this ${config.singular.toLowerCase()}?`}
        description={`“${heading}” will be removed from the website permanently. This cannot be undone.`}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={remove}
      />
    </>
  );
}
