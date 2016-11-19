'use strict';

let express = require('express');


function getStaticHandler(paths) {
  let app = express();

  paths.forEach(path => {
    app.use(express.static(path));
  });

  return app;
}

module.exports = getStaticHandler;
