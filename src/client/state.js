
// import leaderboard to use in main game update method

import { updateLeaderboard } from './leaderboard';

// rendering delay to ensure network can keep up

const RENDER_DELAY = 100;

// game state variable which controls any changes in game

const gameUpdates = [];
let gameStart = 0;
let firstServerTimestamp = 0;

// setter method for initialising the server state

export function initState() {
  gameStart = 0;
  firstServerTimestamp = 0;
}

// main method for processing updates respective to time, will push updates to gameUpdates

export function processGameUpdate(update) {
  if (!firstServerTimestamp) {
    firstServerTimestamp = update.t;
    gameStart = Date.now();
  }
  gameUpdates.push(update);

  updateLeaderboard(update.leaderboard);

  // Keep only one game update before the current server time
  const base = getBaseUpdate();
  if (base > 0) {
    gameUpdates.splice(0, base);
  }
}

// getter method for server time at call

function currentServerTime() {
  return firstServerTimestamp + (Date.now() - gameStart) - RENDER_DELAY;
}


// returns the index of the base update

function getBaseUpdate() {
  const serverTime = currentServerTime();
  for (let i = gameUpdates.length - 1; i >= 0; i--) {
    if (gameUpdates[i].t <= serverTime) {
      return i;
    }
  }
  return -1;
}

// returns local tank, others, and bullets

export function getCurrentState() {
  if (!firstServerTimestamp) {
    return {};
  }

  const base = getBaseUpdate();
  const serverTime = currentServerTime();

  // interpolation which gives updates on each object and creates new data entries in
  // game update

  if (base < 0 || base === gameUpdates.length - 1) {
    return gameUpdates[gameUpdates.length - 1];
  } else {
    const baseUpdate = gameUpdates[base];
    const next = gameUpdates[base + 1];
    const ratio = (serverTime - baseUpdate.t) / (next.t - baseUpdate.t);
    return {
      me: interpolateObject(baseUpdate.me, next.me, ratio),
      others: interpolateObjectArray(baseUpdate.others, next.others, ratio),
      bullets: interpolateObjectArray(baseUpdate.bullets, next.bullets, ratio),
      foods: interpolateObjectArray(baseUpdate.foods, next.foods, ratio),
    };
  }
}

// interpolation helper function which takes two objects and calculates a new data entry

function interpolateObject(object1, object2, ratio) {
  if (!object2) {
    return object1;
  }

  const interpolated = {};
  Object.keys(object1).forEach(key => {
    if (key === 'direction') {
      interpolated[key] = interpolateDirection(object1[key], object2[key], ratio);
    } else {
      interpolated[key] = object1[key] + (object2[key] - object1[key]) * ratio;
    }
  });
  return interpolated;
}

// non recursive method of interpolating an entire array

function interpolateObjectArray(objects1, objects2, ratio) {
  return objects1.map(o => interpolateObject(o, objects2.find(o2 => o.id === o2.id), ratio));
}

// method which determines the best way to rotate based on the angle calculated between d1 and d2
function interpolateDirection(d1, d2, ratio) {
  const absD = Math.abs(d2 - d1);
  if (absD >= Math.PI) {
    // angle between the directions is large therefore we should rotate opposite way
    if (d1 > d2) {
      return d1 + (d2 + 2 * Math.PI - d1) * ratio;
    } else {
      return d1 - (d2 - 2 * Math.PI - d1) * ratio;
    }
  } else {
    return d1 + (d2 - d1) * ratio;
  }
}
