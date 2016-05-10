import bunyan from 'bunyan';

const logDir = process.env.OPENSHIFT_LOG_DIR ? process.env.OPENSHIFT_LOG_DIR : './logs';

export const logger = bunyan.createLogger({
  name: 'ember-help-wanted-service',
  level: process.env.LOGGER_LEVEL || 'debug',
  streams: [{
    level: 'error',
    stream: process.stdout
  }, {
    level: 'info',
    path: `${logDir}/events.log`,
    type: 'rotating-file'
  }]
});
