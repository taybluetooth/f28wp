const express = require('express')
const app = express()
const Game = require('/.game');
const game = new Game();
var path = require('path')
var server = require('http').Server(game);
var io = require('socket.io')(server, {});
var socket_list = {}

app.use('/client', express.static(__dirname + '/client'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/html/index.html');
});

server.listen(process.env.port || 3000);
console.log('BEST BOY TANK LISTENING ON PORT 3000');
