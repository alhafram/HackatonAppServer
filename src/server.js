'use strict';

let express = require('express');
let Promise = require('bluebird');
let handlers = require('./handlers');


// Обертка над Express-приложением
class Server {
  constructor (database, subApps) {
    this.app = express();
    this.database = database;

    Object.keys(subApps).forEach(path => {
      this.app.use(path, subApps[path]);
    });
  }

  listen (port) {
    return new Promise(resolve => this.app.listen(port, resolve));
  }
}

module.exports = Server;
