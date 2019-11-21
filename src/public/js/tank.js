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
  this.rotation = 0;
  this.width = 50;
  this.height = 80;
  this.hp = hp;
  this.damage = 10;
  this.exp = 0;
  this.level = 1;
  this.bullets = [];
  this.score = 0;
};

Tank.prototype.info = function() {
  this.ctx.fillStyle="#000000";
  this.ctx.fillRect(this.position.x-(this.width/2), this.position.y + 25, 50 , 3);
  this.ctx.fillStyle="#00FF00";
  this.ctx.fillRect(this.position.x-(this.width/2), this.position.y + 25, this.hp , 3);
}

Tank.prototype.render = function() {
  this.info();
  this.ctx.save();
  this.ctx.translate(this.position.x, this.position.y)
  this.ctx.rotate((Math.PI/180) * this.rotation)
  this.ctx.drawImage(this.arena.loadImg('tank'), -20, -20, 40, 40)
  this.ctx.restore()
};

Tank.prototype.updateRotation = function(p) {

  if(this.local) {
    if (this.arena.pressedKeys.left) {
      this.rotation -= p / 5
    }
    else if (this.arena.pressedKeys.right) {
      this.rotation += p / 5
    }
  }
}

Tank.prototype.updateMovement = function(p) {

  if(this.local) {

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
}

Tank.prototype.updatePosition = function(p) {

  var accelerationVector = {
    x: p * 0.2 * Math.cos((this.rotation-90) * (Math.PI/180)),
    y: p * 0.2 * Math.sin((this.rotation-90) * (Math.PI/180))
  }

  // Detect boundaries
  if (this.position.x > 2980) {
    this.position.x -= accelerationVector.x;
  }
  else if (this.position.x < 10) {
    this.position.x -= accelerationVector.x;
  }
  if (this.position.y > 2980) {
    this.position.y -= accelerationVector.y;
  }
  else if (this.position.y < 10) {
    this.position.y -= accelerationVector.y;
  }
};

Tank.prototype.fire = function() {
  this.bullets.push(new Bullet(this.arena, this, this.position.x, this.position.y, this.rotation));
};

Tank.prototype.fired = function() {
  this.bullets.forEach(function(bullet) {
    bullet.update();
    bullet.render();
  });
}

Tank.prototype.levelUp = function() {
  if(this.exp >= this.level * 100) {
    this.level += 1;
    this.exp = 0;
  }
  return this.level;
};

Tank.prototype.getScore = function() {
  return this.score;
}

Tank.prototype.increaseScore = function(val) {
  this.score += val;
}

Tank.prototype.expUp = function(amount) {
    this.exp += amount;
}

Tank.prototype.hurt = function(damage) {
  this.hp -= damage;
}

Tank.prototype.checkAlive = function() {
  var alive;

  if(this.hp <= 0) {
    alive = false;
  }
  else {
    alive = true;
  }
  return alive;
}
