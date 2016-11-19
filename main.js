'use strict';

let config = require('./config.json');
let logging = require('./src/logging');
logging.initialize(config.logging);
logging = logging.for('Main');

let Server = require('./src/server');
let database = require('./src/database');
let getApiHandler = require('./src/httpApi');
let getStaticHandler = require('./src/staticContentServer');


process.on('uncaughtException', error => {
  logging.error('Uncaught exception, exiting!');
  logging.error(error);
  process.exit(1);
});

logging.info('Loaded libraries, connecting to database');

database.getDatabase(config.database).then(database => {
  logging.info('Database connection ok, creating HTTP server');

  const subApps = {
    "/api": getApiHandler(database, config),
    [config.static.path]: getStaticHandler(config.static.directories)
  };

  return new Server(database, subApps).listen(config.http.port);
}).then(() => {
  logging.info(`Server listening at ${config.http.port}`);
}).catch(error => {
  logging.error('Failed to start server!');
  logging.error(error);

  process.exit(1);
});
