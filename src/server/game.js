// import constants from constants directory
// import main tank class
// import collision detection class

const Constants = require('../shared/constants');
const Tank = require('./tank');
const Food = require('./food');
const applyCollisions = require('./collisions');

// main game constructor method
// initialise all sockets connected
// initialise tank and bullet arrays

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

  // method which adds a tank object to the game upon connection

  addTank(socket, username) {
    this.sockets[socket.id] = socket;

    // Generate a position to start this tank at.
    const x = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
    const y = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
    this.tanks[socket.id] = new Tank(socket.id, username, x, y);
  }

  addFood() {
    var i;
    const x = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
    const y = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
    for(i = 0; i < 1000; i++) {
      this.foods.push(new Food(x, y));
    }
  }

  // method which deletes the tank upon disconnection

  removeTank(socket) {
    delete this.sockets[socket.id];
    delete this.tanks[socket.id];
  }

  // method which calculates the direction of a given tank

  handleInput(socket, dir) {
    if (this.tanks[socket.id]) {
      this.tanks[socket.id].setDirection(dir);
    }
  }

  // game update function which utilises functions from the state class

  update() {
    const now = Date.now();
    const dt = (now - this.lastUpdateTime) / 1000;
    this.lastUpdateTime = now;
    // update all bullets
    const bulletsToRemove = [];
    this.bullets.forEach(bullet => {
      if (bullet.update(dt)) {
        // delete each bullet fired
        bulletsToRemove.push(bullet);
      }
    });
    this.bullets = this.bullets.filter(bullet => !bulletsToRemove.includes(bullet));

    // update all tanks
    Object.keys(this.sockets).forEach(tankID => {
      const tank = this.tanks[tankID];
      const newBullet = tank.update(dt);
      // if bullet fired, push to array and render it
      if (newBullet) {
        this.bullets.push(newBullet);
      }
    });

    // aply collisions, give tanks points for shooting other tanks
    const destroyedBullets = applyCollisions(Object.values(this.tanks), this.bullets);
    destroyedBullets.forEach(b => {
      if (this.tanks[b.parentID]) {
        this.tanks[b.parentID].onDealtDamage();
      }
    });
    this.bullets = this.bullets.filter(bullet => !destroyedBullets.includes(bullet));

    // delete any tanks whose health is at 0
    Object.keys(this.sockets).forEach(tankID => {
      const socket = this.sockets[tankID];
      const tank = this.tanks[tankID];
      if (tank.hp <= 0) {
        socket.emit(Constants.MSG_TYPES.GAME_OVER);
        this.removeTank(socket);
      }
    });

    // send the current state of update to each tank in the game
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

  // method which gets the current state of the leaderboard
  getLeaderboard() {
    return Object.values(this.tanks)
      .sort((p1, p2) => p2.score - p1.score)
      .slice(0, 5)
      .map(p => ({ username: p.username, score: Math.round(p.score) }));
  }

  // method which will return the value for an object based on serializeForUpdate object method
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

  // helper function which generates a random number used for coordinates

  randomCoord(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

}


module.exports = Game;
