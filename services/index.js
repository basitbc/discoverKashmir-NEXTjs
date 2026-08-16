/**
 * Service layer for the Discover Kashmir content API.
 *
 * Import from here rather than reaching into individual files:
 *   import { packagesService, settingsService } from '../services';
 *
 * Public reads are safe to call from getStaticProps. Anything under a service's
 * `.admin` namespace is browser-only — it needs the bearer token that the
 * request interceptor pulls from the NextAuth session.
 */
export { ApiError } from './apiError';
export { publicClient, adminClient, getPublic, getPublicOrNull, clearTokenCache } from './http';
export { createResourceService } from './resourceService';

export { authService } from './auth.service';
export { packagesService } from './packages.service';
export { destinationsService } from './destinations.service';
export { blogsService } from './blogs.service';
export { testimonialsService } from './testimonials.service';
export { heroSlidesService } from './heroSlides.service';
export { districtsService } from './districts.service';
export { settingsService } from './settings.service';
export { uploadsService } from './uploads.service';
export { imagesService } from './images.service';
export { paymentsService } from './payments.service';
