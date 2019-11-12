function Game() {
  this.map = document.createElement('canvas');
  this.ctx = this.map.getContext('2d');
  this.tanks = [];
}

Game.prototype.initTank = function() {
  var tank = new Tank(this.ctx, "Callum", 1, true, 100, 100, 100);
  this.tanks.push(tank);
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

Game.prototype.controls = function(tank) {

		$(document).keypress( function(e){
			var k = e.keyCode || e.which;
			switch(k){
				case 119: //W
					tank.dir.up = true;
          console.log("w");
					break;
				case 100: //D
					tank.dir.right = true;
          console.log("d");
					break;
				case 115: //S
					tank.dir.down = true;
          console.log("s");
					break;
				case 97: //A
					tank.dir.left = true;
          console.log("a");
					break;
			}

		}).keyup( function(e){
			var k = e.keyCode || e.which;
			switch(k){
				case 87: //W
					tank.dir.up = false;
          console.log("w");
					break;
				case 68: //D
					tank.dir.right = false;
          console.log("d");
					break;
				case 83: //S
					tank.dir.down = false;
          console.log("s");
					break;
				case 65: //A
					tank.dir.left = false;
          console.log("a");
					break;
			}
    });
};

var game = new Game();
game.initMap();
game.initTank();
game.initPlayers();
game.controls(game.tanks[0]);
