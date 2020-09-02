import cache, {CacheKey} from '../utils/cache';
import client from '../integrations/cloudinary/client';
import {ResourceApiResponse} from 'cloudinary';

export const cacheCloudinaryData = async (cursor?: string) => {
  const result = await client.search
      .max_results(500)
      .next_cursor(cursor)
      .expression('resource_type=image')
      .execute();
  const currentTempCacheValue: ResourceApiResponse['resources'] = cache.get(CacheKey.TempCloudinaryImages) as ResourceApiResponse['resources'] || [];
  if (result.next_cursor) {
    // Append temporal cache
    cache.set(
        CacheKey.TempCloudinaryImages,
        [
          ...currentTempCacheValue,
          ...result.resources,
        ],
    );
    // Continue retrieving paginated data
    await cacheCloudinaryData(result.next_cursor);
  } else {
    // Swap Data to update main cache
    cache.set(
        CacheKey.CloudinaryImages,
        [
          ...currentTempCacheValue,
          ...result.resources,
        ],
    );
    // Remove temporal cache and statistics cache as it should be recalculated
    cache.del(CacheKey.TempCloudinaryImages);
    // TODO recalculation could take place in this job as well to reduce request delay spike
    cache.del(CacheKey.CloudinaryStatistics);
  }
};
