'use strict';

class BaseHandler {
  constructor (method, path) {
    this.method = method.toLowerCase();
    this.path = path;
  }
}

module.exports = BaseHandler;
