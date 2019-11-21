function Food(arena, x, y, colour) {
  this.arena = arena;
  this.position = {
    x: x,
    y: y
  }
  this.width = 7;
  this.height = 7;
  this.exp = 10;
  this.colour = colour;
  this.score = 10;
  this.rotation = arena.randomInt(360);
}

Food.prototype.render = function() {
  this.arena.ctx.fillStyle = this.colour;
  this.arena.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
}

Food.prototype.update = function() {
  var accelerationVector = {
    x: 1 * 0.2 * Math.cos((this.rotation-90) * (Math.PI/180)),
    y: 1 * 0.2 * Math.sin((this.rotation-90) * (Math.PI/180))
  }
  this.position.x += accelerationVector.x;
  this.position.y += accelerationVector.y;

  this.updatePosition();
}

Food.prototype.updatePosition = function() {

  var accelerationVector = {
    x: 1 * 0.2 * Math.cos((this.rotation-90) * (Math.PI/180)),
    y: 1 * 0.2 * Math.sin((this.rotation-90) * (Math.PI/180))
  }

  // Detect boundaries
  if (this.position.x > 2990) {
    this.rotation = -90;
    this.position.x += accelerationVector.x;
  }
  else if (this.position.x < 1) {
    this.rotation = 90;
    this.position.x -= accelerationVector.x;
  }
  if (this.position.y > 2990) {
    this.rotation = 0;
    this.position.y += accelerationVector.y;
  }
  else if (this.position.y < 1) {
    this.rotation = 180;
    this.position.y -= accelerationVector.y;
  }
};
