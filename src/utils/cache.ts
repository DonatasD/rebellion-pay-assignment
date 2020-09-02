import NodeCache from 'node-cache';

export enum CacheKey {
  CloudinaryImages = 'cloudinaryImages',
  TempCloudinaryImages = 'tempCloudinaryImages',
  CloudinaryStatistics = 'cloudinaryStatistics',
}

const cache = new NodeCache({deleteOnExpire: false});
export default cache;
