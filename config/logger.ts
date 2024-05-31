import { Env } from '#start/env';
import { createLogger, format, transports } from 'winston';

const logLevel = Env.NODE_ENV === 'development' ? 'debug' : 'warn';

const Logger = createLogger({
  transports: [
    new transports.Console({
      level: logLevel,
      format: format.combine(
        format.errors({ stack: true }),
        format.prettyPrint(),
      ),
    }),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

export default Logger;
