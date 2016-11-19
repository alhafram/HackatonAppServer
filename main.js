let config = require('./config.json');
let logging = require('./src/logging');
let Server = require('./src/server');


logging.initialize(config.logging);
logging = logging.for('Main');

process.on('uncaughtException', error => {
  logging.error('Uncaught exception, exiting!');
  logging.error(error);
  process.exit(1);
});

new Server().listen(config.http.port).then(() => {
  logging.info(`Server listening at ${config.http.port}`);
});
