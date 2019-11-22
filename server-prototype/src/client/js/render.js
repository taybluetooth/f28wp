import { getAsset } from './assets';
import { getState } from './game-state';

const Constants = require('../shared/constants');
const { PLAYER_RADIUS, PLAYER_MAX_HP, BULLET_RADIUS, MAP_SIZE } = Constants;

// Get the canvas graphics context
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

// Make the canvas fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function render() {
  const { me, others, bullets } = getState();
  if (!me) {
    return;
  }
  bullets.forEach(renderBullet.bind(null, me));

  // Draw all players
  renderPlayer(me, me);
  others.forEach(renderPlayer.bind(null, me));
}

let renderInterval = null;
export function startRendering() {
  renderInterval = setInterval(render, 1000 / 60);
}
export function stopRendering() {
  clearInterval(renderInterval);
}

function renderBullet(me, bullet) {
  const { x, y } = bullet;
  context.fillStyle="red";
  context.fillRect(
    canvas.width / 2 + x - me.x - BULLET_RADIUS,
    canvas.height / 2 + y - me.y - BULLET_RADIUS,
    BULLET_RADIUS * 2,
    BULLET_RADIUS * 2,
  );
}
