#!/usr/bin/env node

'use strict';

/* npm modules */
const program = require('commander');
const print = console.log;
const inquirer = require('inquirer');

/* app modules */
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
      inputs = tools.parseCommandLineInput(commandLineInput),
      validInput = inputs && inputs.length === 2;

      if(validInput) {
        let
        coordinateX = inputs[0],
        coordinateY = inputs[1],
        validBorders = plateauMars.setBorderLimits(coordinateX, coordinateY);
        
        if(validBorders.message)
          return makeCommandLineQuestion('plateauConfiguration', validBorders.message);
        
        makeCommandLineQuestion('roverLandingConfiguration');

      } else {
        return makeCommandLineQuestion('plateauConfiguration', 'Hey, supply 2 integer numbers please.');
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
      inputs = tools.parseCommandLineInput(commandLineInput),
      invalid = tools.isInvalidInteger(inputs[0]);

      if(invalid) {
        return makeCommandLineQuestion('roverLandingConfiguration', 'Hey, supply an integer number.');
      } else {

      }

    }
  }
};

print("-------- Mars Rover Simulator --------");
print("Before start, let's configurate de plateau borders.");
print("\n");


/* Command line intefaces question */
function makeCommandLineQuestion(methodToDeal, warnMessage) {
  let
  flow = programFlowStruct[methodToDeal];

  tools.printWarnMessage(warnMessage);

  if(flow && flow.question)
    flow.question();
};

/* Command line inteface answer */
function getUserCommandLineAnswer(questions, methodToDeal) {
  let
  flow = programFlowStruct[methodToDeal];

  if(flow)
    callCommandLineUserInput(questions, flow.answer);
};

/* Command line api */
function callCommandLineUserInput(questions, responseMethod) {
  inquirer.prompt(questions).then(responseMethod);
};

/* Command line start */
let
startQuestion = programFlowStruct.plateauConfiguration.question;

program
  .version('0.0.1')
  .description('Mars Rover Simulator');

program
  .command('start')
  .alias('s')
  .description('Start the simulator')
  .action(startQuestion);

program
  .parse(process.argv);