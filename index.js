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

/* 
  The program flow: the struct above have all the flow that the programs run along. 
  Program starts with the 'plateauConfiguration', if succeeds goes to first rover
  configuration in 'roverLandingConfiguration'. If the config for the first rover
  is good, the program will ask for the instructions for the current rover.

  If the instructions are correct, the program shows the final position for the rover
  and lead the user to a next rover until the user decides to finish the program.
*/
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
        inValidBorders = plateauMars.setBorderLimits(coordinateX, coordinateY);
        
        if(inValidBorders.message) {
          makeCommandLineQuestion('plateauConfiguration', inValidBorders.message);
        } else { 
          print("\n");
          makeCommandLineQuestion('roverLandingConfiguration');
        }

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
        inValidRoverLanding = rover.setLandingInstructions(coordinateX, coordinateY, direction);

        if(inValidRoverLanding.message) {
          makeCommandLineQuestion('roverLandingConfiguration', inValidRoverLanding.message);
        } else {
          let
          validRover = plateauMars.addRover(rover);

          rover.name = plateauMars.getRoverPoolSize();

          makeCommandLineQuestion('instructionsForCurrentRover');
        }
      }else {
        makeCommandLineQuestion('roverLandingConfiguration', 'Please, supply the landing coordinates and a valid direction in the format: 0 0 D');
      }
    }
  },

  instructionsForCurrentRover: {

    question: function() {
      getUserCommandLineAnswerFor('instructionsForCurrentRover', "Rover" + ( plateauMars.getRoverPoolSize() ) + " Instructions: ");
    },

    answer: function(commandLineInput) {
      let
      inputs = tools.parseCommandLineInput(commandLineInput),
      instructions = inputs.join("").replace(" ", "");

      if(instructions) {
        let
        currentRover = plateauMars.getCurrentRover(),
        invalidInstructions = currentRover.setInstructions(instructions);

        if(invalidInstructions.message) {
          makeCommandLineQuestion('instructionsForCurrentRover', invalidInstructions.message);
        } else {
          print("\n");
          print(currentRover.displayCurrentState());
          print("\n");
          makeCommandLineQuestion('roverLandingConfiguration'); 
        }

          
      }else{
        makeCommandLineQuestion('instructionsForCurrentRover', 'Please inform correct instructions for the current Rover. Only allowed: L R M');
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