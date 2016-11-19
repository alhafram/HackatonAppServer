'use strict';

let winston = require('winston');


class WinstonLoggerWrapper {
  constructor (options, module) {
    let transports = this.createTransports(options);
    this.logger = new winston.Logger({
      transports
    });

    // Обертки над стандартными методами логгирования (выводим имя модуля)
    for(let level in winston.levels){
      this[level] = msg => {
        this.logger[level](msg, { module });
      }
    }
  }

  static format(options){
    let date = new Date().toLocaleString();
    let level = options.level.toUpperCase();
    let module = (options.meta && options.meta.module) ?
      `(${options.meta.module}): ` : '';
    let message = options.message;

    // Печатаем stack trace ошибок
    if(message instanceof Error) {
      message = message.stack;
    }

    return `${date} [${level}] ${module}${message}`;
  }

  createTransports (options) {
    return options.map((transport, index) => {
      let Transport = transport.type === 'file' ?
        winston.transports.File :
        winston.transports.Console;
      return new Transport({
        name: 'transport-' + index,
        level: transport.level || 'silly',
        formatter: this.constructor.format,
        json: false,
      });
    });
  }
}

let options = {};

module.exports = {
  for: function(module) {
    return new WinstonLoggerWrapper(options, module);
  },
  initialize: function(opts) {
    options = opts;
  }
};
