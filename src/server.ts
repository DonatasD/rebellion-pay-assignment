import app from './app';
import {cacheCloudinaryData} from './jobs/cloudinaryCacheJob';

const server = app.listen(app.get('port'), () => {
  console.log(
      'App is running at http://localhost:%d in %s mode',
      app.get('port'),
      app.get('env'),
  );
  console.log('Press CTRL-C to stop\n');
  cacheCloudinaryData().then(() => console.log('Cached successfully'));
});

export default server;
