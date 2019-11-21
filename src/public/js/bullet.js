function Bullet(arena, tank, x, y, dir) {
  this.position = {
    x: x,
    y: y
  };
  this.radius = 5;
  this.tank = tank;
  this.arena = arena;
  this.direction = dir;
  this.destory = false;
}

Bullet.prototype.render = function() {
  this.arena.ctx.beginPath();
  this.arena.ctx.fillStyle = "#ff0000";
  this.arena.ctx.arc(this.position.x, this.position.y, this.radius, 2*Math.PI, false);
  this.arena.ctx.fill();
  this.arena.ctx.strokeStyle = "#8b0000";
  this.arena.ctx.lineWidth = 3;
  this.arena.ctx.stroke();
}

Bullet.prototype.update = function() {
  var accelerationVector = {
    x: 60 * 0.2 * Math.cos((this.direction-90) * (Math.PI/180)),
    y: 60 * 0.2 * Math.sin((this.direction-90) * (Math.PI/180))
  }
  this.position.x += accelerationVector.x;
  this.position.y += accelerationVector.y;

}
