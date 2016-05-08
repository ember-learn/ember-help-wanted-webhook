import bunyan from 'bunyan';

export const logger = bunyan.createLogger({
  name: 'ember-help-wanted-service',
  level: process.env.LOGGER_LEVEL || 'debug',
  streams: [{
    level: 'error',
    stream: process.stdout
  }, {
    level: 'info',
    path: './logs/events.log',
    type: 'rotating-file'
  }]
});
