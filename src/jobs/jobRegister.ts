import logger from '../utils/logger';
import {cloudinaryCacheJob} from './cloudinary';
import {CronJob} from 'cron';
import {CLOUDINARY_JOB_CRON} from './constant';

const register = () => {
  const onTick = () => {
    logger.info('Running cloudinary cache job');
    cloudinaryCacheJob()
        .then(() => logger.info('Successfully update cache'))
        .catch((e) => logger.error(e));
  };
  const job = new CronJob({onTick, cronTime: CLOUDINARY_JOB_CRON, runOnInit: true});
  job.start();
};
export default register;
