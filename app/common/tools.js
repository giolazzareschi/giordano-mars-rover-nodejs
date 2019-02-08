'use strict'

function isInvalidInteger(data) {
  return isNaN(parseFloat(data));
};

function splitUserInput(inputString) {
  return inputString.split(" ");
};

module.exports = {
  isInvalidInteger: isInvalidInteger,
  splitUserInput: splitUserInput,
}