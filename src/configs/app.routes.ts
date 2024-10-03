/**
 * Application routes with its version
 * https://github.com/Sairyss/backend-best-practices#api-versioning
 */

// Root
const campaignRoot = 'campaign';

const candidateRoot = 'candidate';

// Api Versions
const v1 = 'v1';

export const routesV1 = {
  version: v1,
  campaign: {
    root: campaignRoot,
    delete: `/${campaignRoot}/:id`,
  },

  candidate: {
    root: candidateRoot,
    create: `/${candidateRoot}`,
  },
};
