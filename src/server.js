'use strict';

let express = require('express');
let Promise = require('bluebird');
let handlers = require('./handlers');
let logging = require('./logging').for('Server');


// Обертка над Express-приложением
class Server {
  constructor (database) {
    this.app = express();
    this.database = database;
    handlers.forEach(Handler => {
      let handler = new Handler(database);
      let method = handler.method;
      let path = handler.path;
      let fn = Server.wrapHandlerFunction(handler);

      this.app[method](path, fn);

      logging.verbose(`Attached handler for ${method} ${path}`);
    });
  }

  listen (port) {
    return new Promise(resolve => this.app.listen(port, resolve));
  }

  // Оборачиваем handler function, ловим ошибки из промисов
  static wrapHandlerFunction (handler) {
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
}

module.exports = Server;
