'use strict';

let express = require('express');
let Promise = require('bluebird');


// Обертка над Express-приложением
class Server {
  constructor () {
    this.app = express();
    this.app.get('/routes', (req, res) => {
      res.json({
        "routes": [
          {
            "id": 1,
            "name": "Прогулка по центру",
            "duration": 3,
            "description": "Awesome route",
            "rating": 4.7,
            "price": 1000,
            "points": [1, 2],
            "categories": [1, 3],
            "pictures": [
              "http://s3.amazonaws.com/abcd/l9k2dd.jpg",
              "http://s3.amazonaws.com/abcd/fj82a2.jpg",
              "http://s3.amazonaws.com/abcd/8ck382.jpg"
            ]
          },
        ],
        "points": [
          {
            "id": 1,
            "name": "Кафе *название*",
            "coordinates": "59.123,30.456",
            "time": "11:00-23:00",
            "pinPicture": "http://s3.amazonaws.com/abcd/fj82a2.jpg"
          }
        ]
      });
    });
    this.app.get('/categories', (req, res) => {
      res.json({
        "categories": [
          {
            "id": 1,
            "name": "Для плохой погоды"
          },
          {
            "id": 2,
            "name": "Центр города"
          }
        ]
      });
    });
  }

  listen (port) {
    return new Promise(resolve => this.app.listen(port, resolve));
  }
}

module.exports = Server;
