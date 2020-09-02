import client from './client';
import {DEFAULT_PAGINATION_LIMIT, RESOURCE_TYPE} from './constants';
import logger from '../../utils/logger';
import {CloudinaryResponse} from './types';

const getPaginatedImageResponse =
    async (cursor?: string, limit = DEFAULT_PAGINATION_LIMIT): Promise<CloudinaryResponse | null> => {
      try {
        const result = await client.search
            .max_results(limit)
            .next_cursor(cursor)
            .expression(`resource_type=${RESOURCE_TYPE}`)
            .execute();
        const rateLimitInfo = {
          remaining: result.rate_limit_remaining,
          reset: result.rate_limit_reset_at,
        };
        logger.debug(`Cloudinary remaining rate limit info`, rateLimitInfo);
        return result;
      } catch (e) {
        logger.error(e);
        return null;
      }
    };

const service = {
  getPaginatedImageResponse,
};
export default service;
