'use strict';

const tools = require('../common/tools');

class Plateau{

  constructor() {}

  set limits(array) {
    this.limitsCoordenates = {
      x: array[0] || 0,
      y: array[1] || 0
    };
  }

  get limits() {
    return this.limitsCoordenates;
  }

  setBorderLimits(x,y) {
    if(this.isInvalidInteger(x))
      return new Error('Woops, X coordinate must be an integer.');

    if(this.isInvalidInteger(y))
      return new Error('Woops, Y coordinate must be an integer.');

    return this.limits = [tools.round(x), tools.round(y)];
  }

  isInvalidInteger(data) {
    return tools.isInvalidInteger(data);
  }

};

module.exports = Plateau;