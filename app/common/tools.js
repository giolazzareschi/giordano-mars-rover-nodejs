'use strict'

const print = console.log;

function isInvalidInteger(data) {
  return isNaN(parseFloat(data));
};

function splitUserInput(inputString) {
  return inputString.split(" ");
};

function printWarnMessage(warnMessage) {
  if(warnMessage) {
    print('\n');
    print('::::::::::::::');
    print("Warning: ", String(warnMessage));
    print('::::::::::::::');
    print('\n');
  }
};

function round(number) {
  if(!isInvalidInteger(number))
    return Math.round(number);
  
  return 0;
};

module.exports = {
  isInvalidInteger: isInvalidInteger,
  splitUserInput: splitUserInput,
  printWarnMessage: printWarnMessage,
  round: round,
}