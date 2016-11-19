'use strict';

let config = require('./config.json');
let logging = require('./src/logging');
let Server = require('./src/server');
let database = require('./src/database');


logging.initialize(config.logging);
logging = logging.for('Main');

process.on('uncaughtException', error => {
  logging.error('Uncaught exception, exiting!');
  logging.error(error);
  process.exit(1);
});

logging.info('Loaded libraries, connecting to database');

database.getDatabase(config.database).then(database => {
  logging.info('Database connection ok, creating HTTP server');
  return new Server(database).listen(config.http.port);
}).then(() => {
  logging.info(`Server listening at ${config.http.port}`);
}).catch(error => {
  logging.error('Failed to start server!');
  logging.error(error);

  process.exit(1);
});
