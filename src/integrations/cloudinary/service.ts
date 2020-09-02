import client from './client';
import logger from '../../utils/logger';

export const getCountByFormat = (format?: String): Promise<number> => {
  return client.search
      .expression(`format=${format}`)
      .max_results(0)
      .execute()
      .then((result) => {
        logger.debug(result);
        return result.total_count;
      })
      .catch((e) => {
        logger.error(e);
        return new Error(`Could not get count for format: ${format}`);
      });
};
export const getLargestPicture = (): Promise<string> => {
  return client.search
      .sort_by('bytes', 'desc')
      .expression('resource_type=image')
      .max_results(1)
      .execute()
      .then((result) => {
        logger.debug(result);
        return result.resources.length && result.resources[0].secure_url;
      })
      .catch((e) => {
        logger.error(e);
        return new Error('Could not find largest picture');
      });
};

export const getSmallestPicture = (): Promise<string> => {
  return client.search
      .sort_by('bytes', 'asc')
      .expression('resource_type=image')
      .max_results(1)
      .execute()
      .then((result) => {
        logger.debug(result);
        return result.resources.length && result.resources[0].secure_url;
      })
      .catch((e) => {
        logger.error(e);
        return new Error('Could not find largest picture');
      });
};

export const getTotalImageCount = (): Promise<number> => {
  return client.search
      .expression('resource_type=image')
      .execute()
      .then((result) => {
        logger.debug(result);
        return result.total_count;
      })
      .catch((e) => {
        logger.error(e);
        return new Error('Could not find largest picture');
      });
};


