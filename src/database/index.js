'use strict';

let Sequelize = require('sequelize');
let Promise = require('bluebird');
let models = require('./models');


function createConnection(options) {
  let dialectOpts = {};

  if (options.socketPath) {
    dialectOpts.socketPath = options.socketPath;
  }

  let opts = {
    host: options.host,

    define: {
      timestamps: false // Убираем createdAt updatedAt
    },

    dialect: options.dialect,
    dialectOptions: dialectOpts,

    logging: require.main.require('./src/logging').for('SQL').silly,

    pool: {
      max: options.maxConnections,
      min: 0,
      idle: 10000
    }
  };

  return new Sequelize(
    options.name,
    options.username,
    options.password,
    opts
  );
}

let syncDone = false;

// Выполняем .sync, если надо. Всегда возвращаем Promise. Если соединение уже
// есть, то вернем Promise.resolve
function getDatabase(options){
  if(syncDone){
    return Promise.resolve(db);
  } else {
    let db = createConnection(options);
    models.defineModels(db);
    return db.sync().then(result => {
      syncDone = true;
      return result;
    });
  }
}

module.exports = { getDatabase };
