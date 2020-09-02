import {StatisticsDTO} from './types';
import cache, {CacheKey} from '../utils';
import {ResourceApiResponse} from 'cloudinary';
import {arrayMax, arrayMin} from '../utils';
import {Parser} from 'json2csv';

const getStatistics = (): StatisticsDTO => {
  let statistics: StatisticsDTO | undefined = cache.get(CacheKey.CloudinaryStatistics);
  if (!statistics) {
    const imageResources = cache.get(CacheKey.CloudinaryImages) as ResourceApiResponse['resources'] || [];
    statistics = {
      avgSize: findAverageSize(imageResources),
      smallestPicture: findSmallestImage(imageResources),
      biggestPicture: findLargestImage(imageResources),
      totalImages: imageResources.length,
      formats: findImageCountByTypes(imageResources),
    };
    cache.set(CacheKey.CloudinaryStatistics, statistics);
  }
  return statistics;
};

const getImageCSV = () => {
  const parser = new Parser();

  return parser.parse(cache.get(CacheKey.CloudinaryImages) || '');
};

/**
 * Calculates average size for cloudinary resources. If no resources are provided 0 is returned.
 *
 * @param resources
 */
const findAverageSize = (resources: ResourceApiResponse['resources']) => {
  if (!resources.length) {
    return 0;
  }
  return resources.map((value) => value.bytes).reduce((acc, value) => acc + value, 0) / resources.length;
};

/**
 * Find smallest image from cloudinary resources. If no resources are provided undefined is
 * returned.
 *
 * @param resources
 */
const findSmallestImage = (resources: ResourceApiResponse['resources']) => {
  if (!resources.length) {
    return undefined;
  }
  return arrayMin(resources, (item) => (item.bytes)).secure_url;
};

/**
 * Find largest image from cloudinary resources. If no resources are provided undefined is
 * returned.
 *
 * @param resources
 */
const findLargestImage = (resources: ResourceApiResponse['resources']) => {
  if (!resources.length) {
    return undefined;
  }
  return arrayMax(resources, (item) => (item.bytes)).secure_url;
};

/**
 * Find image counts based on their type from cloudinary resources. If no resources are provided
 * undefined is returned.
 *
 * @param resources
 */
const findImageCountByTypes = (resources: ResourceApiResponse['resources']) => {
  if (!resources.length) {
    return undefined;
  }
  const imageTypes = new Set(resources.map((resource) => resource.format));
  return Array.from(imageTypes.values()).map((imageType) => ({
    [imageType]: resources.filter((resource) => resource.format === imageType).length,
  }));
};

const service = {
  getStatistics,
  getImageCSV,
};
export default service;
