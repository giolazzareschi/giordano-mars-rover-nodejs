#!/usr/bin/env node

'use strict';

/* npm modules */
const program = require('commander');
const print = console.log;
const inquirer = require('inquirer');

/* app modules */
const tools = require('./app/common/tools');
const Plateau = require('./app/models/Plateau');
const Rover = require('./app/models/Rover');

/* local variables */
let plateauMars = new Plateau();

/* The program flow: the struct above have all the flow that the programs run along. */
let programFlow = {

  plateauConfiguration: {

    question: function() {
      getUserCommandLineAnswerFor('plateauConfiguration', "Plateau upper-right limits: ");
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
          makeCommandLineQuestion('plateauConfiguration', validBorders.message);
        else
          makeCommandLineQuestion('roverLandingConfiguration');

      } else {
        makeCommandLineQuestion('plateauConfiguration', 'Hey, supply 2 integer numbers please.');
      }
    }
  },

  roverLandingConfiguration: {

    question: function() {
      getUserCommandLineAnswerFor('roverLandingConfiguration', "Rover" + ( plateauMars.getRoverPoolSize() + 1 ) + " Landing: ");
    },

    answer: function(commandLineInput) {
      let
      inputs = tools.parseCommandLineInput(commandLineInput),
      validInput = inputs && inputs.length === 3;

      if(validInput) {
        let
        coordinateX = inputs[0],
        coordinateY = inputs[1],
        direction = inputs[2],
        rover = new Rover(),
        validRoverLanding = rover.setLandingInstructions(coordinateX, coordinateY, direction);

        if(validRoverLanding.message) {
          makeCommandLineQuestion('roverLandingConfiguration', validRoverLanding.message);
        } else {
          let
          validRover = plateauMars.addRover(rover);

          
        }
      }else {
        makeCommandLineQuestion('roverLandingConfiguration', 'Please, supply the landing coordinates and a valid direction in the format: 0 0 D');
      }
    }
  }
};

/* Command line inteface question */
function makeCommandLineQuestion(step, warnMessage) {
  tools.printWarnMessage(warnMessage);
  programFlow[step].question();
};

/* Command line inteface answer */
function getUserCommandLineAnswerFor(step, question) {
  callCommandLineUserInput([
    {
      type: 'input',
      name: 'userInput',
      message: question,
    }
  ], programFlow[step].answer);
};

/* Command line api */
function callCommandLineUserInput(questions, responseMethod) {
  inquirer.prompt(questions).then(responseMethod);
};

/* app start */
print("\n");
print("-------- Mars Rover Simulator --------");
print("Before start, let's configurate the plateau borders.");
print("Please, inform the plateau upper-right points with format 0 0 ");
print("\n");

let
startPoint = programFlow.plateauConfiguration.question;

program
  .version('0.0.1')
  .description('Mars Rover Simulator');

program
  .command('start')
  .alias('s')
  .description('Start the simulator')
  .action(startPoint);

program
  .parse(process.argv);