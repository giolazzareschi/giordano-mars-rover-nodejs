#!/usr/bin/env node

'use strict';

/* modules */
const program = require('commander');
const print = console.log;
const inquirer = require('inquirer');

const tools = require('./app/common/tools');
const Plateau = require('./app/models/Plateau');

let plateauMars = new Plateau();

let programFlowStruct = {

  plateauConfiguration: {

    question: function() {
      getUserCommandLineAnswer([
        {
          type: 'input',
          name: 'userInput',
          message: "Inform the upper-right plateau limit. \n  Write the X point, a space, then the Y point eg.: 4 5 \n",
        }
      ], 'plateauConfiguration');
    },

    answer: function(commandLineInput) {
      let
      userInput = getUserInput(commandLineInput),
      inputs = splitUserInput(userInput),
      validInput = inputs && inputs.length === 2;

      if(validInput) {
        let
        coordinateX = inputs[0],
        coordinateY = inputs[1],
        validBorders = plateauMars.setBorderLimits(coordinateX, coordinateY);
        
        if(validBorders.message)
          return callQuestion('plateauConfiguration', validBorders.message);
        
        callQuestion('roverLandingConfiguration');

      } else {
        return callQuestion('plateauConfiguration', 'Hey, supply 2 integer numbers please.');
      }
    }
  },

  roverLandingConfiguration: {

    question: function() {
      getUserCommandLineAnswer([
        {
          type: 'input',
          name: 'userInput',
          message: "How many Rovers are gonna land in Mars? \n",
        }
      ], 'roverLandingConfiguration');
    },
    
    answer: function(commandLineInput) {

      let
      userInput = getUserInput(commandLineInput),
      inputs = splitUserInput(userInput),
      invalid = isInvalidInteger(inputs[0]);

      if(invalid) {
        return callQuestion('roverLandingConfiguration', 'Hey, supply an integer number.');
      } else {
        
      }

    }
  }

};

print("-------- Mars Rover Simulator --------");
print("Before start, let's configurate de plateau borders.");

function isInvalidInteger(data) {
  return tools.isInvalidInteger(data);
};

function splitUserInput(inputString) {
  return tools.splitUserInput(inputString);
};

function getUserInput(commandLineInput) {
  return (commandLineInput && commandLineInput.userInput) || "";
};

function userInput(questions, responseMethod) {
  inquirer.prompt(questions).then(responseMethod);
};

function callQuestion(questionCommand, warnMessage) {
  let
  flow = programFlowStruct[questionCommand];

  if(warnMessage) {
    print('\n');
    print('::::::::::::::');
    print("Warning: ", String(warnMessage));
    print('::::::::::::::');
    print('\n');
  }

  if(flow && flow.question)
    flow.question();
};

function getUserCommandLineAnswer(questions, methodToDealResponse) {
  let
  flow = programFlowStruct[methodToDealResponse];

  if(flow)
    userInput(questions, flow.answer);
};

program
  .version('0.0.1')
  .description('Mars Rover Simulator');

program
  .command('start')
  .alias('s')
  .description('Start the simulator')
  .action(programFlowStruct.plateauConfiguration.question);

program
  .parse(process.argv);