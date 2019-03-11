import PrismicLib, { previewCookie } from 'prismic-javascript';
import PrismicConfig from '../prismic-configuration.json';

let frontClient;

export const Client = (req = null) => {
  if (!req && frontClient) return frontClient;

  const options = Object.assign(
    {},
    req
      ? {
        req,
      }
      : {},
    PrismicConfig.accessToken
      ? {
        accessToken: PrismicConfig.accessToken,
      }
      : {},
  );
  return PrismicLib.client(PrismicConfig.apiEndpoint, options);
};
export const Prismic = PrismicLib;
export const PREVIEW_COOKIE = previewCookie;

export const linkResolver = (doc) => {
  if (doc.type === 'homepage') return '/';
  if (doc.type === 'products') return '/products';
  if (doc.type === 'product') return `/products/${doc.uid}`;
  if (doc.type === 'article') return `/article/${doc.uid}`;
  return '/';
};
