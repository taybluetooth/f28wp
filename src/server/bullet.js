// import uuid library for unique identifier
// inherit from object super class
// import constants from constants directory

const shortid = require('shortid');
const ObjectClass = require('./object');
const Constants = require('../shared/constants');

class Bullet extends ObjectClass {
  // bullet constructor extending main object class
  constructor(parentID, x, y, dir) {
    super(shortid(), x, y, dir, Constants.BULLET_SPEED);
    this.parentID = parentID;
  }

  // update function which determines if bullet should be deleted
  update(dt) {
    super.update(dt);
    return this.x < 0 || this.x > Constants.MAP_SIZE || this.y < 0 || this.y > Constants.MAP_SIZE;
  }
}

// export bullet class to be accessed by other classes

module.exports = Bullet;
