// import throttle-debounce for smoothness in network
// import assets for images and state class for game update functions

import { debounce } from 'throttle-debounce';
import { getAsset } from './assets';
import { getCurrentState } from './state';

// import constants from constants directory

const Constants = require('../shared/constants');

const { TANK_RADIUS, TANK_MAX_HP, BULLET_RADIUS, FOOD_RADIUS, MAP_SIZE } = Constants;

// get canvas and context from html

const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');
setCanvasDimensions();

// setter method for canvas size respective to the current window size

function setCanvasDimensions() {
  // Mobile Responsiveness
  const scaleRatio = Math.max(1, 800 / window.innerWidth);
  canvas.width = scaleRatio * window.innerWidth;
  canvas.height = scaleRatio * window.innerHeight;
}

// add event listener which resizes the canvas if the window has been resized

window.addEventListener('resize', debounce(40, setCanvasDimensions));

// main render function

function render() {
  const { me, others, bullets, foods } = getCurrentState();
  if (!me) {
    return;
  }

  // call background rendering function

  renderBackground(me.x, me.y);

  // draw game borders

  context.strokeStyle = 'black';
  context.lineWidth = 1;
  context.strokeRect(canvas.width / 2 - me.x, canvas.height / 2 - me.y, MAP_SIZE, MAP_SIZE);

  // draw bullets when pushed to array

  bullets.forEach(renderBullet.bind(null, me));

  foods.forEach(renderFood.bind(null));

  // draw local tank and 'others' which represents tanks already in the game

  renderTank(me, me);
  others.forEach(renderTank.bind(null, me));

  // minimap rendering function

  renderMinimap(me, others);
}

// method which draws background

function renderBackground(x, y) {
  const backgroundX = MAP_SIZE / 2 - x + canvas.width / 2;
  const backgroundY = MAP_SIZE / 2 - y + canvas.height / 2;
  context.fillStyle="#ffffff"
  context.fillRect(0, 0, canvas.width, canvas.height);
}

// Renders a tank at the given coordinates
function renderTank(me, tank) {
  const { x, y, direction } = tank;
  const canvasX = canvas.width / 2 + x - me.x;
  const canvasY = canvas.height / 2 + y - me.y;

  // Draw tank with constants
  context.save();
  context.translate(canvasX, canvasY);
  context.rotate(direction);
  context.drawImage(
    getAsset('tank.svg'),
    -TANK_RADIUS,
    -TANK_RADIUS,
    TANK_RADIUS * 2,
    TANK_RADIUS * 2,
  );
  context.restore();

  // Draw health bar
  context.fillStyle = 'green';
  context.fillRect(
    canvasX - TANK_RADIUS,
    canvasY + TANK_RADIUS + 8,
    TANK_RADIUS * 2,
    2,
  );
  context.fillStyle = 'red';
  context.fillRect(
    canvasX - TANK_RADIUS + TANK_RADIUS * 2 * tank.hp / TANK_MAX_HP,
    canvasY + TANK_RADIUS + 8,
    TANK_RADIUS * 2 * (1 - tank.hp / TANK_MAX_HP),
    2,
  );
}

// method which draws bullet

function renderBullet(me, bullet) {
  const { x, y } = bullet;
  context.drawImage(
    getAsset('bullet.svg'),
    canvas.width / 2 + x - me.x - BULLET_RADIUS,
    canvas.height / 2 + y - me.y - BULLET_RADIUS,
    BULLET_RADIUS * 2,
    BULLET_RADIUS * 2,
  );
}

function renderFood(food) {
  const { x, y } = food;
  context.drawImage(
    getAsset('bullet.svg'),
    canvas.width / 2 + x - FOOD_RADIUS,
    canvas.height / 2 + y - FOOD_RADIUS,
    FOOD_RADIUS * 2,
    FOOD_RADIUS * 2,
  );
}


// method which draws main io menu for gathering username

function renderMainMenu() {
  const t = Date.now() / 7500;
  const x = MAP_SIZE / 2 + 800 * Math.cos(t);
  const y = MAP_SIZE / 2 + 800 * Math.sin(t);
  renderBackground(x, y);
}

// helper method to gain a randomly generated colour

function renderColour() {
  var letters = '0123456789ABCDEF';
  var colour = '#';
  for (var i = 0; i < 6; i++) {
    colour += letters[Math.floor(Math.random() * 16)];
  }
  return colour;
}

// method which draws method with player being red and others being blue

function renderMinimap(player, others) {
  // set the scale to use for the minimap
  let scale = 1 / 5;

  // set width and height of the minimap, to be of ratio.
  let width = canvas.width * scale;
  let height = canvas.height * scale;

  // the margin for the minimap
  let margin = 20;

  // fill in the rect background of the minimap
  context.fillStyle = 'lightgrey';
  context.fillRect(canvas.width - width - margin, canvas.height - height - margin, width, height);

  // fill in the outline of the minimap
  context.strokeStyle = 'black';
  context.strokeRect(canvas.width - width - margin, canvas.height - height - margin, width, height);

  // get player positions
  const { x, y } = player;

  // draw main player
  context.fillStyle = 'red';
  context.beginPath();
  context.arc((canvas.width - width) + (x * (width/MAP_SIZE)), (canvas.height - height) + (y * (height/MAP_SIZE)), 3, 0, 2 * Math.PI);
  context.closePath();
  context.fill();

  // display other players in the minimap
  // TODO: fix this asap
  for(let i = 0; i < others.length; i++) {
    const { x, y } = others[i];

    context.fillStyle = 'blue';
    context.beginPath();
    context.arc((canvas.width - width) + (x * (width/MAP_SIZE)), (canvas.height - height) + (y * (height/MAP_SIZE)), 5, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
  }
}

let renderInterval = setInterval(renderMainMenu, 1000 / 60);

// replaces main menu rendering with game rendering.
export function startRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(render, 1000 / 60);
}

// replaces game rendering with main menu rendering.
export function stopRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(renderMainMenu, 1000 / 60);
}
