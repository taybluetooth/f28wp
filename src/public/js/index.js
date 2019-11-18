function Game() {
  this.tanks = [];
  this.canvas = document.getElementById("canvas")
  this.ctx = this.canvas.getContext("2d")
  this.camera = new Camera(this.ctx);
  this.width;
  this.height;

  this.keymap = {
    68: 'right',
    65: 'left',
    87: 'up',
    83: 'down'
  };

  this.pressedKeys = {
    left: false,
    right: false,
    up: false,
    down: false
  };
}

Game.prototype.resize = function() {
  this.width = window.innerWidth * 2
  this.height = window.innerHeight * 2
  this.canvas.width = this.width
  this.canvas.height = this.height
}

Game.prototype.background = function() {
  var img = new Image()
  img.src = "/assets/images/background.png"
  var ptrn = this.ctx.createPattern(img, 'repeat')
  return ptrn;
}

Game.prototype.initTank = function() {
  var tank = new Tank(this, this.ctx, "Callum", 1, true, 400, 400, 100);
  this.tanks.push(tank);
};

Game.prototype.initSocket = function() {
  return 0;
};

Game.prototype.loadImg = function(name) {
  var img = new Image()
  img.src = "/assets/images/"+name+".png"
  return img;
}

Game.prototype.update = function(progress) {
  var p = progress * 2;
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.camera.begin();
  this.ctx.fillStyle = this.background()
  this.ctx.fillRect(-500, -500, 10000, 10000)
  this.tanks.forEach(function(tank) {
    tank.render();
    tank.updateRotation(p);
    tank.updateMovement(p);
    tank.updatePosition(p);
  });
  this.camera.moveTo(this.tanks[0].position.x, this.tanks[0].position.y)
  this.camera.end();
}

Game.prototype.initMap = function() {
  var img = new Image()
  img.src = "/assets/images/background.png"
  this.ctx.createPattern(img, 'repeat');
};

Game.prototype.initPlayers = function() {
  this.tanks.forEach(function(tank) {
    tank.render();
  });
};

Game.prototype.keydown = function(event) {
  var keyCode = event.keyCode;
  game.pressedKeys[game.keymap[keyCode]] = true;
};

Game.prototype.keyup = function(event) {
  var keyCode = event.keyCode;
  game.pressedKeys[game.keymap[keyCode]] = false;
};

var game = new Game();
game.initMap();
game.initTank();
game.initPlayers();

function loop(timestamp) {
  var progress = timestamp - lastRender;

  game.update(progress);

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
};

var lastRender = 0
window.requestAnimationFrame(loop)

window.onresize = game.resize;
game.resize();

window.addEventListener("keydown", game.keydown, false);
window.addEventListener("keyup", game.keyup, false);
