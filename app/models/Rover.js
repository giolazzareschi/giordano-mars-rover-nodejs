'use strict';

const tools = require('../common/tools');
const { positionsMapping } = require('../common/positionsMapping');

class Rover{

  constructor() {
    this.currentState = {
      x: 0,
      y: 0,
      direction: 'N'
    };

    this.roverName = "Rover";
  }

  get state() {
    return this.currentState;  
  }

  set name(name) {
    this.roverName += name;
  }

  get name() {
    return this.roverName;
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

  setInstructions(data) {
    var
    parseInstructions = this.parseInstructions(data);

    if(!parseInstructions || !parseInstructions.length)
      return new Error('Provide valid directions please. Onyl allowes L R M');

    parseInstructions.forEach(instruction => {
      // console.log('loop ', instruction);
      this.dealWithInstruction(instruction);
    });

    return true;
  }

  dealWithInstruction(instruction) {
    switch(instruction) {
      case 'L':
        this.turnLeft(); break;
      case 'R':
        this.turnRight(); break;
      case 'M':
        this.move(); break;
    }
  }

  getCurrentDirection() {
    return this.currentState.direction;
  }

  turnLeft() {
    // console.log('before direction', this.getCurrentDirection());
    this.setCurrentDirection(this.getCurrentSiblingPosition('left'));
  }

  turnRight() {
    this.setCurrentDirection(this.getCurrentSiblingPosition('right'));
  }

  move() {
    let
    currentDirection = this.getCurrentDirection();

    // console.log('currentDirection', currentDirection);

    switch(currentDirection) {
      case 'N':
        this.moveY(1); break;
      case 'S':
        this.moveY(-1); break;
      case 'E':
        this.moveX(1); break;
      case 'W':
        this.moveX(-1); break;
    }
  }

  moveX(amount) {
    // console.log('x', amount);
    this.currentState.x += amount;
  }

  moveY(amount) {
    // console.log('y', amount);
    this.currentState.y += amount;
  }

  setCurrentDirection(direction) {
    this.currentState.direction = direction;
  }

  getCurrentSiblingPosition(direction) {
    return positionsMapping[this.getCurrentDirection()][direction];
  }

  parseInstructions(data) {
    return (String(data || "").toLocaleUpperCase().match(/[a-zA-Z]+/gi) || []).join("").match(/L|R|M/gi) || [];
  }

  isInvalidInteger(data) {
    return tools.isInvalidInteger(data);
  }

  isInvalidDirection(data) {
    return tools.isInvalidDirection(data);
  }

  displayCurrentState() {
    let
    text = this.name + ": ";

    for(let index in this.currentState)
      text += " " + this.currentState[index];

    return text;
  }

};

module.exports = Rover;