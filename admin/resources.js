import {
  packagesService,
  destinationsService,
  blogsService,
  testimonialsService,
  heroSlidesService,
  districtsService,
} from '../services';

/**
 * Registry describing every content type the admin can edit.
 *
 * The list and form screens are generic and read from here, mirroring how the
 * backend configures one CRUD implementation per resource. Adding a content
 * type is an entry in this file — not another pair of hand-written pages.
 *
 * Field types map to editors in Components/admin/ResourceForm:
 *   text · textarea · richtext · image · switch · number · select · date
 */

const seoFields = [
  {
    name: 'metaTitle',
    label: 'SEO title',
    type: 'text',
    help: 'Shown in Google results. Leave blank to use the name.',
    section: 'SEO',
  },
  {
    name: 'metaDescription',
    label: 'SEO description',
    type: 'textarea',
    rows: 2,
    help: 'Around 150 characters. Leave blank to use the short description.',
    section: 'SEO',
  },
];

const publishFields = [
  {
    name: 'published',
    label: 'Published',
    type: 'switch',
    help: 'Unpublished items disappear from the website but are kept here.',
    section: 'Visibility',
    defaultValue: true,
  },
  {
    name: 'sortOrder',
    label: 'Sort order',
    type: 'number',
    help: 'Lower numbers appear first.',
    section: 'Visibility',
    defaultValue: 0,
  },
];

const slugField = {
  name: 'slug',
  label: 'URL slug',
  type: 'text',
  section: 'SEO',
  help: 'Changing this changes the live URL and breaks existing links. Leave blank when creating and one is generated.',
};

export const RESOURCES = {
  packages: {
    label: 'Packages',
    singular: 'Package',
    icon: 'LocalOffer',
    service: packagesService,
    titleField: 'packageName',
    imageField: 'cardImage',
    subtitleField: 'location',
    hasSlug: true,
    hasPublished: true,
    hasSortOrder: true,
    // Packages have ordered children the generic form cannot express.
    editors: ['tourPlan', 'packageLists'],
    columns: [
      { field: 'packageName', label: 'Name' },
      { field: 'location', label: 'Location' },
      { field: 'duration', label: 'Duration' },
      { field: 'price', label: 'Price' },
    ],
    fields: [
      { name: 'packageName', label: 'Package name', type: 'text', required: true },
      { name: 'duration', label: 'Duration', type: 'text', required: true, placeholder: '6 Nights 7 Days' },
      { name: 'location', label: 'Location', type: 'text', required: true },
      {
        name: 'price',
        label: 'Price',
        type: 'text',
        required: true,
        // Free text on purpose — the live data holds "Whatsapp for quote".
        help: 'Free text. Can be a number or something like "Whatsapp for quote".',
      },
      { name: 'notPrice', label: 'Was-price', type: 'text', help: 'Shown struck through. Optional.' },
      { name: 'mealsPlan', label: 'Meals plan', type: 'text', placeholder: 'MAP' },
      { name: 'vehicle', label: 'Vehicle', type: 'text', placeholder: 'Innova' },
      { name: 'pickAndDrop', label: 'Pick-up / drop', type: 'text' },
      {
        name: 'description',
        label: 'About this package',
        type: 'textarea',
        rows: 8,
        help: 'Plain text — formatting is removed when saved.',
      },
      { name: 'cardImageId', label: 'Card image', type: 'image', folder: 'packages' },
      { name: 'bgImageId', label: 'Banner image', type: 'image', folder: 'packages' },
      slugField,
      ...seoFields,
      ...publishFields,
    ],
  },

  destinations: {
    label: 'Destinations',
    singular: 'Destination',
    icon: 'Place',
    service: destinationsService,
    titleField: 'destinationName',
    imageField: 'cardImage',
    subtitleField: 'distance',
    hasSlug: true,
    hasPublished: true,
    hasSortOrder: true,
    columns: [
      { field: 'destinationName', label: 'Name' },
      { field: 'district', label: 'District', render: (row) => row.district?.name ?? '—' },
      { field: 'distance', label: 'Distance' },
    ],
    fields: [
      { name: 'destinationName', label: 'Destination name', type: 'text', required: true },
      {
        name: 'districtId',
        label: 'District',
        type: 'select',
        required: true,
        optionsFrom: 'districts',
      },
      { name: 'distance', label: 'Distance', type: 'text', placeholder: '51kms from Srinagar via Tangmarg' },
      { name: 'bestTimeToVisit', label: 'Best time to visit', type: 'text' },
      {
        name: 'shortDes',
        label: 'Short description',
        type: 'textarea',
        rows: 3,
        help: 'One or two sentences, used on cards and in search results.',
      },
      {
        name: 'description',
        label: 'Full description',
        type: 'richtext',
        help: 'Supports bold, headings, lists and links.',
      },
      { name: 'cardImageId', label: 'Card image', type: 'image', folder: 'destinations' },
      { name: 'bgImageId', label: 'Banner image', type: 'image', folder: 'destinations' },
      {
        name: 'thumbnailId',
        label: 'Share image',
        type: 'image',
        folder: 'destinations',
        help: 'Used when the page is shared on WhatsApp or Facebook.',
      },
      slugField,
      ...seoFields,
      ...publishFields,
    ],
  },

  blogs: {
    label: 'Travel blogs',
    singular: 'Blog post',
    icon: 'Article',
    service: blogsService,
    titleField: 'title',
    imageField: 'cardImage',
    subtitleField: 'author',
    hasSlug: true,
    hasPublished: true,
    hasSortOrder: true,
    columns: [
      { field: 'title', label: 'Title' },
      { field: 'author', label: 'Author' },
    ],
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'author', label: 'Author', type: 'text' },
      { name: 'publishedAt', label: 'Publish date', type: 'date' },
      { name: 'shortDes', label: 'Excerpt', type: 'textarea', rows: 3 },
      {
        name: 'description',
        label: 'Article',
        type: 'richtext',
        help: 'Supports bold, headings, lists and links.',
      },
      { name: 'cardImageId', label: 'Card image', type: 'image', folder: 'blogs' },
      { name: 'bgImageId', label: 'Banner image', type: 'image', folder: 'blogs' },
      slugField,
      ...seoFields,
      ...publishFields,
    ],
  },

  testimonials: {
    label: 'Testimonials',
    singular: 'Testimonial',
    icon: 'FormatQuote',
    service: testimonialsService,
    titleField: 'name',
    imageField: 'image',
    subtitleField: 'place',
    hasPublished: true,
    hasSortOrder: true,
    columns: [
      { field: 'name', label: 'Name' },
      { field: 'place', label: 'Place' },
    ],
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'place', label: 'Place', type: 'text', required: true },
      { name: 'imageId', label: 'Photo', type: 'image', folder: 'testimonials' },
      { name: 'description', label: 'Review', type: 'textarea', rows: 6 },
      ...publishFields,
    ],
  },

  'hero-slides': {
    label: 'Hero slides',
    singular: 'Hero slide',
    icon: 'Slideshow',
    service: heroSlidesService,
    titleField: 'id',
    titleRender: (row) => row.image?.filename ?? `Slide #${row.id}`,
    imageField: 'image',
    hasPublished: true,
    hasSortOrder: true,
    columns: [{ field: 'image', label: 'Image', render: (row) => row.image?.filename ?? '—' }],
    fields: [
      { name: 'imageId', label: 'Slide image', type: 'image', folder: 'hero', required: true },
      ...publishFields,
    ],
  },

  districts: {
    label: 'Districts',
    singular: 'District',
    icon: 'Map',
    service: districtsService,
    titleField: 'name',
    hasSortOrder: true,
    columns: [{ field: 'name', label: 'Name' }],
    fields: [
      { name: 'name', label: 'District name', type: 'text', required: true },
      {
        name: 'sortOrder',
        label: 'Sort order',
        type: 'number',
        defaultValue: 0,
        help: 'Controls the order of sections on the destinations page.',
      },
    ],
  },
};

export const RESOURCE_KEYS = Object.keys(RESOURCES);

export function getResource(key) {
  return RESOURCES[key] ?? null;
}

/** Groups fields by their `section`, with ungrouped fields first under "Details". */
export function groupFields(fields) {
  const groups = new Map();
  for (const field of fields) {
    const section = field.section ?? 'Details';
    if (!groups.has(section)) groups.set(section, []);
    groups.get(section).push(field);
  }
  return [...groups.entries()].map(([title, items]) => ({ title, items }));
}
