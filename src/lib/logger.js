import bunyan from 'bunyan';

const logDir = process.env.OPENSHIFT_LOG_DIR ? process.env.OPENSHIFT_LOG_DIR : './logs';

const logger = bunyan.createLogger({
  name: 'ember-help-wanted-service',
  level: process.env.LOGGER_LEVEL || 'debug',
  streams: [{
    level: 'debug',
    stream: process.stdout
  }, {
    level: 'debug',
    path: `${logDir}/events.log`,
    type: 'rotating-file'
  }]
});

export default logger;

