function Tank(game, name, id, local, x, y, hp){
  this.game = game;
  this.name = name;
  this.id = id;
  this.local = local;
  this.x = x;
  this.y = y;
  this.rotation = 0;
  this.width = 50;
  this.height = 80;
  this.hp = hp;
  this.damage = 10;
  this.level = 1;
  this.colour = Tank.prototype.colour();
  this.movement = new Physics();
}

Tank.prototype.render = function() {
  this.game.fillStyle = this.colour;
  this.game.fillRect(this.x, this.y, this.width, this.height);
};

Tank.prototype.update = function() {
  this.movement.applyForce(this);
  this.movement.applyRotation(this);
}

Tank.prototype.rotate = function() {
  this.game.translate(this.x + this.width/2, this.y + this.height/2);
  this.game.rotate(this.rotation*(Math.PI / 180));
  this.game.translate(-(this.x + this.width/2), -(this.y + this.height/2));
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
