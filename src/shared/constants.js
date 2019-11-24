module.exports = Object.freeze({
  TANK_RADIUS: 20,
  TANK_MAX_HP: 100,
  TANK_SPEED: 300,
  TANK_FIRE_COOLDOWN: 0.25,

  BULLET_RADIUS: 3,
  BULLET_SPEED: 800,
  BULLET_DAMAGE: 10,

  SCORE_BULLET_HIT: 20,
  SCORE_PER_SECOND: 1,

  FOOD_RADIUS: 5,
  FOOD_SPEED: 100,

  MAP_SIZE: 3000,
  MSG_TYPES: {
    JOIN_GAME: 'join_game',
    GAME_UPDATE: 'update',
    INPUT: 'input',
    GAME_OVER: 'dead',
  },
});
