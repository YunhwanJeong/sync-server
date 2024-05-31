import Logger from '#config/logger';
import { Env } from '#start/env';
import app from './app.js';

app
  .listen(Env.PORT, () => {
    Logger.info(`server running on port : ${Env.PORT}`);
  })
  .on('error', (e) => Logger.error(e));
