// import express.js
// import webpack for parsing files
// import socket io for web socket handling

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const socketio = require('socket.io');

// import constants from constants directory
// import main game class based on client
// import webpack config which handles html and css files

const Constants = require('../shared/constants');
const Game = require('./game');
const webpackConfig = require('../../webpack.dev.js');

// initialise an express server
const app = express();
app.use(express.static('public'));

  // initialise webpack for development
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler));

// listen on port given by heroku
const port = process.env.PORT || 3000;
const server = app.listen(port);
console.log(`Server listening on port ${port}`);

// initialise socket.io
const io = socketio(server);

// listen for socket.io connections in game
io.on('connection', socket => {
  console.log('Player connected!', socket.id);

  socket.on(Constants.MSG_TYPES.JOIN_GAME, joinGame);
  socket.on(Constants.MSG_TYPES.INPUT, handleInput);
  socket.on('disconnect', onDisconnect);
});

// initialise the Game
const game = new Game();

// join game method which adds tank object to game

function joinGame(username) {
  game.addTank(this, username);
}

// method which applys input method to recently joined tank

function handleInput(dir) {
  game.handleInput(this, dir);
}

// method which deletes the tank upon disconnection

function onDisconnect() {
  game.removeTank(this);
}
