import cache, {CacheKey} from '../../utils';
import {CloudinaryResponse, cloudinaryService} from '../../integrations';

const job = async (cursor?: string) => {
  const result = await cloudinaryService.getPaginatedImageResponse(cursor);
  if (!result) {
    // TODO we need to retry. Keep retry count to abort at some point
    await job(cursor);
    return Promise.reject(
        new Error(`Failed to retrieve paginated data for cursor: ${cursor}. Job should be restarted`),
    );
  }
  const currentTempCacheValue: CloudinaryResponse['resources'] = cache.get(CacheKey.TempCloudinaryImages) as CloudinaryResponse['resources'] || [];
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
    await job(result.next_cursor);
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
  return Promise.resolve();
};

export default job;
