'use strict';

let BaseHandler = require('./baseHandler');
let utils = require.main.require('./src/utils');


class RoutesListHandler extends BaseHandler {
  constructor (database, config) {
    super('get', '/routes');
    this.database = database;
    this.staticBaseUrl = config.static.downloadPath;
  }

  extractQueryData (route, objects) {
    let catIds = route.Categories.map(category => {
      objects.categories[category.id] = objects.categories[category.id] || {
        id: category.id,
        name: category.name
      };
      return category.id;
    });

    let pointIds = route.Points.map(point => {
      objects.points[point.id] = objects.points[point.id] || {
        id: point.id,
        name: point.name,
        coordinates: point.latitude+','+point.longitude,
        time: point.time,
        pinPicture: this.staticBaseUrl + point.PinPicture.filename
      };
      return point.id;
    });

    let picIds = route.Pictures.map(picture => {
      objects.pictures[picture.id] = objects.pictures[picture.id] || {
        id: picture.id,
        url: this.staticBaseUrl + picture.filename
      };
      return picture.id;
    });

    objects.routes[route.id] = {
      id: route.id,
      name: route.name,
      description: route.description,
      rating: route.rating,
      duration: route.duration,
      price: route.price,
      points: pointIds,
      pictures: picIds,
      categories: catIds,
      cover: this.staticBaseUrl + route.Cover.filename
    };
  }

  handlerFunction (req) {
    let limitCategories, excludeRoutes;
    if(req.query.categories) {
      limitCategories = utils.stringListToNumberArray(req.query.categories);
    }
    if(req.query.alreadySaved) {
      excludeRoutes = utils.stringListToNumberArray(req.query.alreadySaved);
    }

    // Объекты, на которые ссылается Route и которые должны выдаваться отдельно
    // Так сделано из-за того, что несколько Route могут указывать на одни и те
    // же картинки/поинты/etc
    let resultObjects = {
      routes: {}, pictures: {}, categories: {}, points: {}
    };

    return this.selectFromDatabase(
      limitCategories, excludeRoutes
    ).then(result => {
      // Приводим объекты к чистому JSON (без методов/свойств от sequelize)
      result.forEach(route => {
        this.extractQueryData(route, resultObjects);
      });

      Object.keys(resultObjects).forEach(key => {
        resultObjects[key] = utils.objectToArray(resultObjects[key]);
      });

      return resultObjects;
    });
  }
  
  selectFromDatabase (limitCategories, excludeRoutes){
    let categoryFilter = limitCategories ? {
      id: limitCategories
    } : undefined;

    let routeFilter = excludeRoutes ? {
      id: {
        $notIn: excludeRoutes
      }
    } : undefined;

    return this.database.models.Route.findAll({
      include: [
        { all: true, nested: true },
        {
          model: this.database.models.Category,
          where: categoryFilter
        }
      ],
      where: routeFilter
    });
  }
}

module.exports = RoutesListHandler;
