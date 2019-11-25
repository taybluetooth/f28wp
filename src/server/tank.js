// import object class
// import bullet class
// import constants

const ObjectClass = require('./object');
const Bullet = require('./bullet');
const Constants = require('../shared/constants');

// tank constructor inheriting from object class

class Tank extends ObjectClass {
  constructor(id, username, x, y) {
    super(id, x, y, Math.random() * 2 * Math.PI, Constants.TANK_SPEED);
    this.username = username;
    this.hp = Constants.TANK_MAX_HP;
    this.fireCooldown = 0;
    this.score = 0;
  }

  // return a bullet if fired
  update(dt) {
    super.update(dt);

    // increment score by 1 each second
    this.score += dt * Constants.SCORE_PER_SECOND;

    // stop tank from going past map borders
    this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
    this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));

    // fire a bullet
    this.fireCooldown -= dt;
    if (this.fireCooldown <= 0) {
      this.fireCooldown += Constants.TANK_FIRE_COOLDOWN;
      return new Bullet(this.id, this.x, this.y, this.direction);
    }

    return null;
  }

  // if hit by another bullet, take damage

  takeBulletDamage() {
    this.hp -= Constants.BULLET_DAMAGE;
  }

  // if bullet hits another tank, increment score

  onDealtDamage() {
    this.score += Constants.SCORE_BULLET_HIT;
  }

  // call object serializeForUpdate returning new coordinates
  // also assign new direction and health

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      direction: this.direction,
      hp: this.hp,
    };
  }
}

// export tank class

module.exports = Tank;
