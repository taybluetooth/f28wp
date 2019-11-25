// import socket.io and throttle debounce for network stability
// import state class to get game update functions

import io from 'socket.io-client';
import { throttle } from 'throttle-debounce';
import { processGameUpdate } from './state';

// import constants class from constants directory

const Constants = require('../shared/constants');
// when tank connects, add to server and log confirmation of connection
export var playersConnected = 0;

const socket = io(`ws://${window.location.host}`, { reconnection: false });
const connectedPromise = new Promise(resolve => {
  socket.on('connect', () => {
    playersConnected += 1;
    console.log('Connected to server!');
    resolve();
  });
});

// if game over occurs, disconnect from game and register the respective callbacks

export const connect = onGameOver => (
  connectedPromise.then(() => {
    socket.on(Constants.MSG_TYPES.GAME_UPDATE, processGameUpdate);
    socket.on(Constants.MSG_TYPES.GAME_OVER, onGameOver);
    socket.on('disconnect', () => {
      playersConnected -= 1;
      console.log('Disconnected from server.');
      document.getElementById('disconnect-modal').classList.remove('hidden');
      document.getElementById('reconnect-button').onclick = () => {
        window.location.reload();
      };
    });
  })
);

// play function which registers username and emits it to socket

export const play = username => {
  socket.emit(Constants.MSG_TYPES.JOIN_GAME, username);
};

// method to control rotation when mouse moves respective to speed

export const updateDirection = throttle(20, dir => {
  socket.emit(Constants.MSG_TYPES.INPUT, dir);
});
