'use strict';

let express = require('express');
let logging = require('./logging').for('HTTP API');
let handlers = require('./handlers');


function getApiHandler(database, config) {
  let app = express();

  handlers.forEach(Handler => {
    let handler = new Handler(database, config);
    let method = handler.method;
    let path = handler.path;
    let fn = wrapHandlerFunction(handler);

    app[method](path, fn);

    logging.verbose(`Attached handler for ${method} ${path}`);
  });

  return app;
}

// Оборачиваем handler function, ловим ошибки из промисов
function wrapHandlerFunction (handler) {
  return (req, res) => {
    handler.handlerFunction(req).then(result => {
      res.json(result);
    }).catch(error => {
      logging.error('Error during processing request!');
      logging.error(error);

      res.sendStatus(500);
    });
  };
}

module.exports = getApiHandler;
