// import constants from constants directory

const Constants = require('../shared/constants');

// method which pushes bullets that need to be deleted in an array and returns it
function applyCollisions(tanks, bullets) {
  const destroyedBullets = [];
  for (let i = 0; i < bullets.length; i++) {
    // check if bullet collided with another tank
    for (let j = 0; j < tanks.length; j++) {
      const bullet = bullets[i];
      const tank = tanks[j];
      if (
        // if bullet uuid does not equal that of the tank which fired it
        // then calcutae the distance between the other tank and bullet
        bullet.parentID !== tank.id &&
        tank.distanceTo(bullet) <= Constants.TANK_RADIUS + Constants.BULLET_RADIUS
      ) {
        destroyedBullets.push(bullet);
        tank.takeBulletDamage();
        break;
      }
    }
  }
  // return destroyed bullets array
  return destroyedBullets;
}

// export as applyCollisions
module.exports = applyCollisions;
