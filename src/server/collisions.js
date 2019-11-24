const Constants = require('../shared/constants');

// Returns an array of bullets to be destroyed.
function applyCollisions(tanks, bullets) {
  const destroyedBullets = [];
  for (let i = 0; i < bullets.length; i++) {
    // Look for a tank (who didn't create the bullet) to collide each bullet with.
    // As soon as we find one, break out of the loop to prevent double counting a bullet.
    for (let j = 0; j < tanks.length; j++) {
      const bullet = bullets[i];
      const tank = tanks[j];
      if (
        bullet.parentID !== tank.id &&
        tank.distanceTo(bullet) <= Constants.TANK_RADIUS + Constants.BULLET_RADIUS
      ) {
        destroyedBullets.push(bullet);
        tank.takeBulletDamage();
        break;
      }
    }
  }
  return destroyedBullets;
}

module.exports = applyCollisions;
