import type { Logger } from 'pino';
import pino from 'pino';

let logger: Logger;

function getLogger() {
  if (logger) {
    return logger;
  }

  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pretty = require('pino-pretty');

    logger = pino(
      {},
      pretty({
        colorize: true,
      })
    );
  } else {
    logger = pino({
      browser: {},
      level: 'debug',
      base: {
        env: process.env.NODE_ENV,
      },
    });
  }

  return logger;
}

export default getLogger;
