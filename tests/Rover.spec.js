'use strict'

const Rover = require('../app/models/Rover');
const expect = require('chai').expect;

describe('Rover model', () => {
  
  describe('About the constructor', () => {
    
    it('should build an instance', () => {
      let user = new Rover();
      expect(user).to.not.be.null;
      expect(user).to.not.be.undefined;
      expect(user).to.be.instanceOf(Rover);
    })

  })

})