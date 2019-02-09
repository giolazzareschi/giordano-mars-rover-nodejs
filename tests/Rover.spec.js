'use strict'

const Rover = require('../app/models/Rover');
const expect = require('chai').expect;

describe('Rover model', () => {
  
  describe('About the constructor', () => {
    
    it('should build an instance', () => {
      let rover = new Rover();
      expect(rover).to.not.be.null;
      expect(rover).to.not.be.undefined;
      expect(rover).to.be.instanceOf(Rover);
    })

    it('should initialize X at 0', () => {
      let rover = new Rover();
      expect(rover.state.x).to.be.equal(0);
    })

    it('should initialize Y at 0', () => {
      let rover = new Rover();
      expect(rover.state.y).to.be.equal(0);
    })

    it('should initialize direction at N', () => {
      let rover = new Rover();
      expect(rover.state.direction).to.be.equal('N');
    })

    it('should initialize name equal "Rover"', () => {
      let rover = new Rover();
      expect(rover.name).to.be.equal("Rover");
    })

  })

  describe('About the getters and setters', () => {

    it('should get current state', () => {
      let rover = new Rover();
      expect(rover.state).to.be.equal(rover.currentState);
    })

    it('should get initial state', () => {
      let rover = new Rover();
      expect(rover.state).to.deep.equal({
        x: 0,
        y: 0,
        direction: 'N'
      });
    })

    it('should set the Rover\'s name', () => {
      let rover = new Rover();

      rover.name = 1;

      expect(rover.name).to.be.equal('Rover1');
    })

    it('should get the Rover\'s name', () => {
      let rover = new Rover();

      rover.name = 1;

      expect(rover.name).to.be.equal('Rover1');
    })

  })
  
  describe('About the directions logic', () => {
    
    it('should land at 0 0 S', () => {
      let rover = new Rover();

      rover.setLandingInstructions(0,0,'S');

      expect(rover.state.x).to.be.equal(0);
      expect(rover.state.y).to.be.equal(0);
      expect(rover.state.direction).to.be.equal('S');
    })

    it('should land at 1 3 E', () => {
      let rover = new Rover();

      rover.setLandingInstructions(1,3,'E');

      expect(rover.state.x).to.be.equal(1);
      expect(rover.state.y).to.be.equal(3);
      expect(rover.state.direction).to.be.equal('E');
    })

    it('should return error message to wrong X coordinate', () => {
      let rover = new Rover();
      let roverValidation = rover.setLandingInstructions(null, 3, 'E');

      expect(roverValidation).to.have.property('message');
      expect(roverValidation.message).to.not.be.null;
    })

    it('should return error message to wrong Y coordinate', () => {
      let rover = new Rover();
      let roverValidation = rover.setLandingInstructions(3, 'F', 'E');

      expect(roverValidation).to.have.property('message');
      expect(roverValidation.message).to.not.be.null;
    })

    it('should return error message to wrong direction', () => {
      let rover = new Rover();
      let roverValidation = rover.setLandingInstructions(0, 0, ' ');

      expect(roverValidation).to.have.property('message');
      expect(roverValidation.message).to.not.be.null;
    })

    it('should accept instructions to move', () => {
      let rover = new Rover();
      let roverValidation = rover.setInstructions('LRM');

      expect(roverValidation).to.be.equal(true);
    })

    it('should identify instructions among characters and spaces', () => {
      let rover = new Rover();
      let roverValidation = rover.setInstructions('102oda R$@!#!@# ´ ldsa0 1 ds a  dsdll l l mn asd r');

      expect(roverValidation).to.be.equal(true);
    })

    it('should not accept instructions if numbers are passed', () => {
      let rover = new Rover();
      let roverValidation = rover.setInstructions(112);

      expect(roverValidation).to.have.property('message');
      expect(roverValidation.message).to.not.be.null;
    })

    it('should not accept instructions if not find any instructions', () => {
      let rover = new Rover();
      let roverValidation = rover.setInstructions('dsajidubashdjsakdasdjashdiaoi');

      expect(roverValidation).to.have.property('message');
      expect(roverValidation.message).to.not.be.null;
    })

  })

})