function Game() {
  this.map = document.createElement('canvas');
  this.ctx = this.map.getContext('2d');
  this.tanks = [];
}

Game.prototype.initTank = function() {
  var tank = new Tank(this.ctx, "Callum", 1, true, this.map.width/2, this.map.height-300, 100);
  this.tanks.push(tank);
};

Game.prototype.initSocket = function() {
  return 0;
};

Game.prototype.update = function() {

  this.tanks.forEach(function(tank) {
    tank.update(this.ctx);
    tank.render(this.ctx);
  });

}

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

Game.prototype.controls = function(tank) {

		$(document).keypress( function(e){
			var k = e.keyCode || e.which;
			switch(k){
				case 119: //W
					tank.movement.dir.up = true;
					break;
				case 100: //D
					tank.movement.dir.right = true;
					break;
				case 115: //S
					tank.movement.dir.down = true;
					break;
				case 97: //A
					tank.movement.dir.left = true;
					break;
			}

		}).keyup( function(e){
			var k = e.keyCode || e.which;
			switch(k){
				case 87: //W
					tank.movement.dir.up = false;
					break;
				case 68: //D
					tank.movement.dir.right = false;
					break;
				case 83: //S
					tank.movement.dir.down = false;
					break;
				case 65: //A
					tank.movement.dir.left = false;
					break;
			}
    });
};

var game = new Game();
game.initMap();
game.initTank();
game.initPlayers();
game.controls(game.tanks[0]);

setInterval(function() {
  game.update();
}, 1000/30);
