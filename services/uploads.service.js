import { adminClient } from './http';

/**
 * Image uploads. Returns a complete URL that goes straight into an image field.
 *
 * Legacy images keep their `/Assets/Images/...` paths and new uploads become
 * Blob URLs — both are valid values for the same column, so nothing needs a
 * bulk migration.
 */
export const uploadsService = {
  /**
   * @param file      a File from an <input type="file">
   * @param folder    packages | destinations | blogs | testimonials | hero | general
   * @param onProgress optional (percent: number) => void
   */
  async upload(file, folder = 'general', onProgress) {
    const form = new FormData();
    form.append('file', file);

    const { data } = await adminClient.post('/admin/uploads', form, {
      params: { folder },
      // Let the browser set Content-Type so it includes the multipart boundary.
      headers: { 'Content-Type': undefined },
      onUploadProgress: (event) => {
        if (onProgress && event.total) {
          onProgress(Math.round((event.loaded * 100) / event.total));
        }
      },
    });

    return data; // { url, pathname, contentType, size }
  },

  /** No-op for legacy /Assets paths; only Blob URLs are actually deleted. */
  async remove(url) {
    const { data } = await adminClient.delete('/admin/uploads', { data: { url } });
    return data;
  },
};
