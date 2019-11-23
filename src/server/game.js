const Constants = require('../shared/constants');
const Tank = require('./tank');
const Food = require('./food')
const applyCollisions = require('./collisions');

class Game {
  constructor() {
    this.sockets = {};
    this.tanks = {};
    this.bullets = [];
    this.foods = [];
    this.lastUpdateTime = Date.now();
    this.shouldSendUpdate = false;
    setInterval(this.update.bind(this), 1000 / 60);
  }

  addTank(socket, username) {
    this.sockets[socket.id] = socket;

    // Generate a position to start this tank at.
    const x = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
    const y = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
    this.tanks[socket.id] = new Tank(socket.id, username, x, y);
  }

  addFood() {
    var i;
    for(i = 0; i < 1000; i++) {
      this.foods[i] = new Food(this.randomCoord(Constants.MAP_SIZE), this.randomCoord(Constants.MAP_SIZE), this.randomCoord(360))
    }
  }

  removeTank(socket) {
    delete this.sockets[socket.id];
    delete this.tanks[socket.id];
  }

  handleInput(socket, dir) {
    if (this.tanks[socket.id]) {
      this.tanks[socket.id].setDirection(dir);
    }
  }

  update() {
    // Calculate time elapsed
    const now = Date.now();
    const dt = (now - this.lastUpdateTime) / 1000;
    this.lastUpdateTime = now;

    // Update each bullet
    const bulletsToRemove = [];
    this.bullets.forEach(bullet => {
      if (bullet.update(dt)) {
        // Destroy bullet
        bulletsToRemove.push(bullet);
      }
    });
    this.bullets = this.bullets.filter(bullet => !bulletsToRemove.includes(bullet));

    // Update food
    const foodToRemove = [];
    this.foods.forEach(food => {
      if (food.update(dt)) {
        // Destroy food
        //foodToRemove.push(food);
      }
    });
    //this.foods = this.foods.filter(food => !foodToRemove.includes(food));

    // Update each tank
    Object.keys(this.sockets).forEach(tankID => {
      const tank = this.tanks[tankID];
      const newBullet = tank.update(dt);
      if (newBullet) {
        this.bullets.push(newBullet);
      }
    });

    // Apply collisions, give tanks score for hitting bullets
    const destroyedBullets = applyCollisions(Object.values(this.tanks), this.bullets);
    destroyedBullets.forEach(b => {
      if (this.tanks[b.parentID]) {
        this.tanks[b.parentID].onDealtDamage();
      }
    });
    this.bullets = this.bullets.filter(bullet => !destroyedBullets.includes(bullet));

    // Check if any tanks are dead
    Object.keys(this.sockets).forEach(tankID => {
      const socket = this.sockets[tankID];
      const tank = this.tanks[tankID];
      if (tank.hp <= 0) {
        socket.emit(Constants.MSG_TYPES.GAME_OVER);
        this.removeTank(socket);
      }
    });

    // Send a game update to each tank every other time
    if (this.shouldSendUpdate) {
      const leaderboard = this.getLeaderboard();
      Object.keys(this.sockets).forEach(tankID => {
        const socket = this.sockets[tankID];
        const tank = this.tanks[tankID];
        socket.emit(Constants.MSG_TYPES.GAME_UPDATE, this.createUpdate(tank, leaderboard));
      });
      this.shouldSendUpdate = false;
    } else {
      this.shouldSendUpdate = true;
    }
  }

  getLeaderboard() {
    return Object.values(this.tanks)
      .sort((p1, p2) => p2.score - p1.score)
      .slice(0, 5)
      .map(p => ({ username: p.username, score: Math.round(p.score) }));
  }

  createUpdate(tank, leaderboard) {

    const nearbyTanks = Object.values(this.tanks).filter(
      p => p !== tank && p.distanceTo(tank) <= Constants.MAP_SIZE / 2,
    );
    const nearbyBullets = this.bullets.filter(
      b => b.distanceTo(tank) <= Constants.MAP_SIZE / 2,
    );

    const nearbyFoods = this.foods.filter(
      c => c.distanceTo(tank) <= Constants.MAP_SIZE / 2,
    );

    return {
      t: Date.now(),
      me: tank.serializeForUpdate(),
      others: nearbyTanks.map(p => p.serializeForUpdate()),
      bullets: nearbyBullets.map(b => b.serializeForUpdate()),
      foods: nearbyFoods.map(c => c.serializeForUpdate()),
      leaderboard,
    };
  }

  randomCoord(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}


module.exports = Game;
