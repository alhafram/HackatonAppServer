'use strict';

let BaseHandler = require('./baseHandler');


class RoutesListHandler extends BaseHandler {
  constructor (database) {
    super('get', '/routes');
    this.database = database;
  }

  handlerFunction (req) {
    let categoryIds = [];
    if(req.query.categories) {
      categoryIds = req.query.categories.split(',')
        .map(parseInt).filter(id => !isNaN(id));
    }

    return this.database.models.Route.findAll({
      include: [
        {
          model: this.database.models.Category,
          where: {
            id: categoryIds
          }
        }
      ]
    }).then(result => {
      // Приводим объекты к чистому JSON (без методов/свойств от sequelize)
      return {
        routes: result.map(c => c.get({ plain: true }))
      };
    });
  }
}

module.exports = RoutesListHandler;
