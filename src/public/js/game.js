function Game() {
  this.map = document.createElement('canvas');
  this.ctx = this.map.getContext('2d');
  this.tanks = [];
}

Game.prototype.initTank = function() {
  var tank = new Tank(this.ctx, "Callum", 1, true, 100, 100, 100)
  this.tanks.push(tank)
};

Game.prototype.initSocket = function() {
  return 0;
};

Game.prototype.initMap = function() {
  var body = document.getElementsByTagName("body")[0];
  this.map.id = 'map';
  this.map.width = 400;
  this.map.height = 400;
  body.appendChild(this.map);
};

Game.prototype.initPlayers = function() {
  this.tanks.forEach(function(tank) {
    tank.render(this.ctx);
  });
}

Game.prototype.keyPress = function() {
  return 0;
};

Game.prototype.keyUp = function() {
  return 0;
};

var game = new Game();
game.initMap();
game.initTank();
game.initPlayers();
