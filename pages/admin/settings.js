import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Alert, Typography } from '@mui/material';
import AdminShell from '../../Components/admin/AdminShell';
import ResourceForm from '../../Components/admin/ResourceForm';
import SaveBar from '../../Components/admin/ui/SaveBar';
import { FormSkeleton } from '../../Components/admin/ui/primitives';
import { useToast } from '../../Components/admin/ui/ToastProvider';
import { ApiError, settingsService } from '../../services';

/**
 * Site-wide settings.
 *
 * A singleton, so it gets its own screen rather than going through the generic
 * list/edit pair — there is nothing to list and no id to route by.
 *
 * These values appear in the header and footer of every page, so saving here
 * revalidates the whole site rather than one URL.
 */
const FIELDS = [
  { name: 'logoText', label: 'Site name', type: 'text', section: 'Branding',
    help: 'Shown if no logo is set, and used as the logo alt text.' },
  {
    name: 'headerLogoId',
    label: 'Logo for dark backgrounds',
    type: 'image',
    folder: 'general',
    section: 'Branding',
    help: 'Used on the desktop header, which has a black background. Upload a light or white logo.',
  },
  {
    name: 'footerLogoId',
    label: 'Logo for light backgrounds',
    type: 'image',
    folder: 'general',
    section: 'Branding',
    help: 'Used on the footer and the mobile header, which are both light. Upload a dark logo.',
  },
  {
    name: 'phoneNumber',
    label: 'Phone number',
    type: 'text',
    section: 'Contact',
    help: 'Shown in the header and footer, and used for the call link.',
  },
  {
    name: 'whatsappNumber',
    label: 'WhatsApp number',
    type: 'text',
    section: 'Contact',
    help: 'Digits and country code, no spaces — e.g. 919797593199.',
  },
  { name: 'email', label: 'Email address', type: 'text', section: 'Contact' },
  { name: 'address', label: 'Address', type: 'textarea', rows: 2, section: 'Contact' },
  {
    name: 'about1',
    label: 'About — first paragraph',
    type: 'textarea',
    rows: 4,
    section: 'About section',
  },
  {
    name: 'about2',
    label: 'About — second paragraph',
    type: 'textarea',
    rows: 4,
    section: 'About section',
  },
  {
    name: 'aboutImageFrontId',
    label: 'About image (front)',
    type: 'image',
    folder: 'general',
    section: 'About section',
  },
  {
    name: 'aboutImageBackId',
    label: 'About image (back)',
    type: 'image',
    folder: 'general',
    section: 'About section',
  },
  {
    name: 'contactBgImageId',
    label: 'Contact & policy pages banner',
    type: 'image',
    folder: 'general',
    section: 'Page banners',
    help: 'Used on contact, EMI and all policy pages.',
  },
  {
    name: 'packagesBannerId',
    label: 'Packages page banner',
    type: 'image',
    folder: 'general',
    section: 'Page banners',
  },
  {
    name: 'destinationsBannerId',
    label: 'Destinations page banner',
    type: 'image',
    folder: 'general',
    section: 'Page banners',
  },
  {
    name: 'blogsBannerId',
    label: 'Blog page banner',
    type: 'image',
    folder: 'general',
    section: 'Page banners',
  },
  {
    name: 'packagesOverviewId',
    label: 'Packages overview image',
    type: 'image',
    folder: 'general',
    section: 'Page banners',
    help: 'Shown beside the Overview text on the packages page.',
  },
  {
    name: 'blogSectionBgId',
    label: 'Homepage blog strip background',
    type: 'image',
    folder: 'general',
    section: 'Page banners',
  },
];

export default function AdminSettings() {
  const toast = useToast();
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const settings = await settingsService.get();
        if (!cancelled) setValues(settings);
      } catch (err) {
        if (!cancelled) setError('Could not load settings.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const save = async () => {
    setSaving(true);
    setError(null);
    setFieldErrors({});

    try {
      const payload = {};
      for (const field of FIELDS) {
        const value = values[field.name];
        payload[field.name] = value === '' ? null : value;
      }

      const saved = await settingsService.admin.update(payload);
      setValues(saved);
      setDirty(false);
      toast.success('Settings saved. The website updates shortly.');
    } catch (err) {
      if (err instanceof ApiError) {
        setFieldErrors(err.fieldErrors);
        setError(err.message);
      } else {
        setError('Could not save settings.');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Head>
        <title>Site settings | Discover Kashmir Admin</title>
        <meta name="robots" content="noindex" />
      </Head>

      <AdminShell title="Site settings" breadcrumb="Configuration" maxWidth={880}>
        {loading ? (
          <FormSkeleton />
        ) : (
          <>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
              These appear on every page of the website.
            </Typography>

            {error ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            ) : null}

            <ResourceForm
              fields={FIELDS}
              values={values}
              errors={fieldErrors}
              onChange={(next) => {
                setValues(next);
                setDirty(true);
              }}
            />
          </>
        )}
      </AdminShell>

      <SaveBar visible={!loading && dirty} saving={saving} onSave={save} />
    </>
  );
}
