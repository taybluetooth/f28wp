function Tank(arena, ctx, name, id, local, x, y, hp){
  this.arena = arena;
  this.ctx = ctx;
  this.name = name;
  this.id = id;
  this.local = local;
  this.position = {
    x: x,
    y: y
  };
  this.movement = {
    x: x,
    y: y
  };
  this.rotation = 0;
  this.width = 50;
  this.height = 80;
  this.hp = hp;
  this.damage = 10;
  this.level = 1;
};

Tank.prototype.render = function() {
  this.ctx.save();
  this.ctx.translate(this.position.x, this.position.y)
  this.ctx.rotate((Math.PI/180) * this.rotation)
  this.ctx.drawImage(this.arena.loadImg('tank'), -20, -20, 40, 40)
  this.ctx.restore()
};

Tank.prototype.updateRotation = function(p) {
  if (this.arena.pressedKeys.left) {
    this.rotation -= p / 5
  }
  else if (this.arena.pressedKeys.right) {
    this.rotation += p / 5
  }
}

Tank.prototype.updateMovement = function(p) {

  var accelerationVector = {
    x: p * 0.2 * Math.cos((this.rotation-90) * (Math.PI/180)),
    y: p * 0.2 * Math.sin((this.rotation-90) * (Math.PI/180))
  }

  if (this.arena.pressedKeys.up) {
    this.position.x += accelerationVector.x;
    this.position.y += accelerationVector.y;
  }
  else if (this.arena.pressedKeys.down) {
    this.position.x -= accelerationVector.x;
    this.position.y -= accelerationVector.y;
  }

}

Tank.prototype.updatePosition = function(p) {

  // Detect boundaries
  if (this.position.x > this.arena.canvas.width-40) {
    this.position.x -= p/5
  }
  else if (this.position.x < 40) {
    this.position.x += p/5
  }
  if (this.position.y > this.arena.canvas.height-40) {
    this.position.y -= p/5
  }
  else if (this.position.y < 40) {
    this.position.y += p/5
  }
}

Tank.prototype.fire = function() {
  return 0;
};

Tank.prototype.levelUp = function() {
  return 0;
};

Tank.prototype.colour = function() {
  var letters = '0123456789ABCDEF';
  var colour = '#';
  for (var i = 0; i < 6; i++) {
    colour += letters[Math.floor(Math.random() * 16)];
  }
  return colour;
}
