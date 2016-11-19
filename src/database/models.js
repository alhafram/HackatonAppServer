'use strict';

let Sequelize = require('sequelize');


function defineModels(database) {
  // Определяет структуру таблиц
  let Route = database.define('Route', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    rating: Sequelize.FLOAT, // TODO: временно, заменить на сумму + кол-во оценок
    duration: Sequelize.FLOAT, // В часах
    price: Sequelize.INTEGER
  });

  let Point = database.define('Point', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: Sequelize.STRING,
    latitude: Sequelize.FLOAT, // TODO: использовать PostGIS + тип GEOGRAPHY
    longitude: Sequelize.FLOAT,
    time: Sequelize.STRING
  });

  let Category = database.define('Category', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: Sequelize.STRING
  });

  let Picture = database.define('Picture', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    filename: Sequelize.STRING
  });

  // Связи, foreign keys
  Route.belongsToMany(Category, { through: 'RouteCategory' });
  Category.belongsToMany(Route, { through: 'RouteCategory' });

  Route.belongsToMany(Point, { through: 'RoutePoint' });
  Point.belongsToMany(Route, { through: 'RoutePoint' });

  Route.belongsToMany(Picture, { through: 'RoutePicture' });
  Picture.belongsToMany(Route, { through: 'RoutePicture' });

  Route.hasOne(Picture, { as: 'Cover' });
  Point.hasOne(Picture, { as: 'PinPicture' });
}

module.exports = { defineModels };