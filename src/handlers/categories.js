'use strict';

let BaseHandler = require('./baseHandler');


class CategoriesListHandler extends BaseHandler {
  constructor (database) {
    super('get', '/categories');
    this.database = database;
  }

  handlerFunction (req) {
    return this.database.models.Category.findAll().then(result => {
      return {
        categories: result.map(c => c.get({ plain: true }))
      }
    });
  }
}

module.exports = CategoriesListHandler;
