function Tank(game, name, id, local, x, y, hp){
  this.game = game;
  this.name = name;
  this.id = id;
  this.local = local;
  this.x = x;
  this.y = y;
  this.width = 50;
  this.height = 80;
  this.hp = hp;
  this.damage = 10;
  this.level = 1;
  this.dir = {
    up: false,
    down: false,
    left: false,
    right: false
  };
  this.colour = "#000000";
}

Tank.prototype.update = function() {
  return 0;
};

Tank.prototype.render = function() {
  this.colour = Tank.prototype.colour();
  this.game.fillStyle = this.colour;
  this.game.fillRect(this.x, this.y, this.width, this.height);
};

Tank.prototype.update = function() {
  return 0;
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
