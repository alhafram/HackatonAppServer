'use strict';

let BaseHandler = require('./baseHandler');


class RoutesListHandler extends BaseHandler {
  constructor (database, config) {
    super('get', '/routes');
    this.database = database;
    this.staticBaseUrl = config.static.downloadPath;
  }

  handlerFunction (req) {
    function toNumberArray(param) {
      return param.split(',').map(n => parseInt(n)).filter(id => !isNaN(id));
    }

    let categoryFilter, routeFilter;
    if(req.query.categories) {
      categoryFilter = {
        id: toNumberArray(req.query.categories)
      };
    }
    if(req.query.alreadySaved) {
      routeFilter = {
        id: {
          $notIn: toNumberArray(req.query.alreadySaved)
        }
      };
    }

    let categories = {};
    let pictures = {};
    let routes = {};
    let points = {};

    function arr(x){
      return Object.keys(x).map(k => x[k]);
    }

    return this.database.models.Route.findAll({
      include: [
        { all: true, nested: true },
        {
          model: this.database.models.Category,
          where: categoryFilter
        }
      ],
      where: routeFilter
    }).then(result => {
      // Приводим объекты к чистому JSON (без методов/свойств от sequelize)
      result.forEach(result => {
        result = result.get({ plain: true });

        let catIds = result.Categories.map(category => {
          categories[category.id] = {
            id: category.id,
            name: category.name
          };
          return category.id;
        });

        let pointIds = result.Points.map(point => {
          points[point.id] = {
            id: point.id,
            name: point.name,
            coordinates: point.latitude+','+point.longitude,
            time: point.time,
            pinPicture: this.staticBaseUrl + point.PinPicture.filename
          };
          return point.id;
        });

        let picIds = result.Pictures.map(picture => {
          pictures[picture.id] = {
            id: picture.id,
            url: this.staticBaseUrl + picture.filename
          };
          return picture.id;
        });

        routes[result.id] = {
          id: result.id,
          name: result.name,
          description: result.description,
          rating: result.rating,
          duration: result.duration,
          price: result.price,
          points: pointIds,
          pictures: picIds,
          categories: catIds,
          cover: this.staticBaseUrl + result.Cover.filename
        };
      });

      return {
        routes: arr(routes),
        pictures: arr(pictures),
        categories: arr(categories),
        points: arr(points)
      };
    });
  }
}

module.exports = RoutesListHandler;
