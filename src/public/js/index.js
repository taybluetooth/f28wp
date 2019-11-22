function Game() {
  this.tanks = [];
  this.gameFood = [];
  this.canvas = document.getElementById("canvas")
  this.ctx = this.canvas.getContext("2d")
  this.camera = new Camera(this.ctx);
  this.width;
  this.height;
  this.trigger = false;

  this.keymap = {
    68: 'right',
    65: 'left',
    87: 'up',
    83: 'down',
  };

  this.pressedKeys = {
    left: false,
    right: false,
    up: false,
    down: false,
  };
}

Game.prototype.music = function() {
  var audio = new Audio('/assets/music/Gameplay.mp3');
  audio.loop = true;
  audio.volume = 0.3;
  audio.play();
}

Game.prototype.resize = function() {
  this.width = window.innerWidth * 2
  this.height = window.innerHeight * 2
  this.canvas.width = this.width
  this.canvas.height = this.height
}

Game.prototype.initFood = function() {
  for (i = 0; i < 2000; i++) {
    var x = this.randomInt(2800);
    var y = this.randomInt(2800);
    this.gameFood.push(new Food(this, x, y, this.colour()));
  }
}

Game.prototype.initTank = function() {
  var tank = new Tank(this, this.ctx, "Callum", 1, true, 400, 400, 50);
  var tank2 = new Tank(this, this.ctx, "Fraser", 2, false, 200, 200, 50);

  this.tanks.push(tank);
  this.tanks.push(tank2);
};

Game.prototype.initSocket = function() {
  return 0;
};

Game.prototype.loadImg = function(name) {
  var img = new Image()
  img.src = "/assets/images/" + name + ".png"
  return img;
}

Game.prototype.update = function(progress) {
  var p = progress;
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.camera.begin();
  this.ctx.fillStyle = "#000022";
  this.ctx.fillRect(-2, -2, 3000, 3000);

  this.tanks.forEach(function(tank) {

    if(tank.checkAlive()) {
      tank.render();
      tank.updateRotation(p);
      tank.updateMovement(p);
      tank.updatePosition(p);
      tank.fired();
      Game.prototype.checkFood(tank);
      if(tank.id != 1) {
        Game.prototype.checkBullet(game.getTank(1), tank);
      }
    }

    if (tank === game.getTank(1)) {
      // Calculate percentage of exp gained thus far by player.
      var totalExp = tank.exp / (tank.level * 100) * 100;
      document.getElementById('level-text').innerHTML = "Level " + tank.levelUp();
      document.getElementById('score-text').innerHTML = "Score " + tank.getScore();
      document.getElementById('inner-bar').style.width = totalExp + "%";
    }

  });

  this.gameFood.forEach(function(food) {
    food.render();
    food.update();
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

Game.prototype.getTank = function(id) {
  var value;
  this.tanks.forEach(function(tank) {
    if(tank.id == id) {
      value = tank;
    }
  });
  return value;
}

Game.prototype.checkFood = function(tank) {

  game.gameFood.forEach(function(food) {
    if (food.position.x > tank.position.x - (tank.width / 2) / 2 &&
        food.position.x < tank.position.x + (tank.width / 2) / 2 &&
        food.position.y > tank.position.y - (tank.height / 2) / 2 &&
        food.position.y < tank.position.y + (tank.height / 2) / 2) {
          var index = game.gameFood.indexOf(food);
          tank.expUp(food.exp);
          tank.increaseScore(food.score);
          game.gameFood.splice(index, 1);
    }
  });

}

Game.prototype.checkBullet = function(tank1, tank2) {

  tank1.bullets.forEach(function(bullet) {
    if(bullet.position.x > tank2.position.x - (tank2.width / 2) / 2 &&
       bullet.position.x < tank2.position.x + (tank2.width / 2) / 2 &&
       bullet.position.y > tank2.position.y - (tank2.height / 2) / 2 &&
       bullet.position.y < tank2.position.y + (tank2.width / 2) / 2) {
         var index = tank1.bullets.indexOf(bullet);
         tank2.hurt(tank1.damage);
         tank1.increaseScore(100 * tank2.level);
         tank1.expUp(100 * tank2.level);
         tank1.bullets.splice(index, 1);
    }
  });
}

Game.prototype.keydown = function(event) {
  var keyCode = event.keyCode;
  if(keyCode != 32) {
    game.pressedKeys[game.keymap[keyCode]] = true;
  }
  else {
    if(this.trigger == false) {
      game.tanks.forEach(function(tank) {
        if(tank.local) {
          tank.fire()
          this.trigger = true;
        }
      });
    }
  }
};

Game.prototype.keyup = function(event) {
  var keyCode = event.keyCode;
  game.pressedKeys[game.keymap[keyCode]] = false;
  this.trigger = false;
};

Game.prototype.colour = function() {
  var letters = '0123456789ABCDEF';
  var colour = '#';
  for (var i = 0; i < 6; i++) {
    colour += letters[Math.floor(Math.random() * 16)];
  }
  return colour;
}

Game.prototype.randomInt = function(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var game = new Game();
game.initMap();
game.initFood();
game.initTank();
game.initPlayers();
game.music();

// CLIENT GAME LOOP (TO BE ALTERED TO WORK ON SERVER) //

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

// EVENT HANDLERS //

window.addEventListener("keydown", game.keydown, false);
window.addEventListener("keyup", game.keyup, false);
window.addEventListener("keypress", game.keypress, false);
