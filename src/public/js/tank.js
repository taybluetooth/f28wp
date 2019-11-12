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
}

Tank.prototype.update = function() {
  return 0;
};

Tank.prototype.render = function() {
  this.game.fillStyle = "#ff0000";
  this.game.fillRect(this.x, this.y, this.width, this.height);
};

Tank.prototype.fire = function() {
  return 0;
};

Tank.prototype.levelUp = function() {
  return 0;
};
