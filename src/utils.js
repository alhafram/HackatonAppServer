'use strict';


function objectToArray(object){
  return Object.keys(object).map(key => object[key]);
}

function stringListToNumberArray(param, separator = ',') {
  return param.split(separator).map(Number).filter(id => !isNaN(id));
}

module.exports = {
  objectToArray, stringListToNumberArray
};
