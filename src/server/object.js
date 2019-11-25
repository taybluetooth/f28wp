// object constructor class
// initialises uuid, position, direction and movement speed

class Object {
  constructor(id, x, y, dir, speed) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.direction = dir;
    this.speed = speed;
  }

  // object update function for handling movement based on direction

  update(dt) {
    this.x += dt * this.speed * Math.sin(this.direction);
    this.y -= dt * this.speed * Math.cos(this.direction);
  }

  // method to calcuate distance between two objects

  distanceTo(object) {
    const dx = this.x - object.x;
    const dy = this.y - object.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // setter method for direction

  setDirection(dir) {
    this.direction = dir;
  }

  // returns new set of coordinates

  serializeForUpdate() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
    };
  }
}

// export object class for others to access

module.exports = Object;
