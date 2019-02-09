'use strict';

const tools = require('../common/tools');

class Rover{

  constructor() {
    this.currentState = {
      x: 0,
      y: 0,
      direction: 'N'
    };
  }

  get state() {
    return this.currentState;  
  }

  setLandingInstructions(x, y, direction) {
    if(this.isInvalidInteger(x))
      return new Error('Woops, X coordinate must be an integer.');

    if(this.isInvalidInteger(y))
      return new Error('Woops, Y coordinate must be an integer.');

    if(this.isInvalidDirection(direction))    
      return new Error('Provide a valid direction N S E W.');

    return this.currentState = {
      x: tools.round(x) || 0,
      y: tools.round(y) || 0,
      direction: String(direction).toLocaleUpperCase() || 'N',
    };
  }

  isInvalidInteger(data) {
    return tools.isInvalidInteger(data);
  }

  isInvalidDirection(data) {
    return tools.isInvalidDirection(data);
  }

};

module.exports = Rover;