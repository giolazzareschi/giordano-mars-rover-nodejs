# Giordano Mars Rover Test

Test for VoyagerPortal: an implementation in plain nodejs of a Mars Rover problem.

## How to run the code
```
git clone https://github.com/giolazzareschi/giordano-mars-rover-nodejs.git
cd giordano-mars-rover-nodejs
npm install
npm start
```

## How test the code

```
npm test
```

## About the rules
- The rovers must land inside the plateau area
- The rovers cannot cross the plateau borders
- The program must output the final position for every rover
- To end the program press ctrl+c in the terminal


## About the program flow in index.js
The struct called 'programFlow' have all the flows that the programs run along. 

The strucut are made of steps that scopes the context of a given point of the app.
Each step have a question and a respective answer for that question.

The program starts with the 'plateauConfiguration', if succeeds goes to first rover
configuration in 'roverLandingConfiguration'. If the config for the first rover
is good, the program will ask for the instructions for the current rover in
'instructionsForCurrentRover'.

If the instructions are correct, the program shows the final position for the rover
and lead the user to a next rover until the user decides to finish the program.

```
let programFlow = {

  plateauConfiguration: {
    question: function() {
      ...
    },

    answer: function(commandLineInput) {
      ...
    }
  },

  roverLandingConfiguration: {
    question: function() {
      ...
    },

    answer: function(commandLineInput) {
      ...
    }
  },

  instructionsForCurrentRover: {
    question: function() {
      ...
    },

    answer: function(commandLineInput) {
      ...
    }
  }
}
```

### Configurations used

nodejs 8.11.3

npm 5.6.0