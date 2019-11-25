// import uuid library for unique identifier
// inherit from object super class
// import constants from constants directory

const shortid = require('shortid');
const ObjectClass = require('./object');
const Constants = require('../shared/constants');

class Food extends ObjectClass {
  // food constructor extending main object class
  constructor(parentID, x, y) {
    super(shortid(), x, y);
    this.parentID = parentID;
  }

}

// export food class to be accessed by other classes

module.exports = Food;
