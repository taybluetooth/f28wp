var canvas = document.getElementById("canvas");
var width = canvas.width;
var height = canvas.height;
var ctx = canvas.getContext("2d")
var camera = new Camera(ctx);
ctx.fillStyle = "red"
window.addEventListener("keydown", keydown, false)
window.addEventListener("keyup", keyup, false)

var keyMap = {
  68: 'right',
  65: 'left',
  87: 'up',
  83: 'down'
}

var state = {
  x: width / 2,
  y: height / 2,
  pressedKeys: {
    left: false,
    right: false,
    up: false,
    down: false
  }
}

function keydown(event) {
  var key = keyMap[event.keyCode]
  state.pressedKeys[key] = true
}
function keyup(event) {
  var key = keyMap[event.keyCode]
  state.pressedKeys[key] = false
}

function update(progress) {
  if (state.pressedKeys.left) {
    state.x -= progress/5
    camera.moveTo(state.x, state.y);
  }
  if (state.pressedKeys.right) {
    state.x += progress/5
    camera.moveTo(state.x, state.y);
  }
  if (state.pressedKeys.up) {
    state.y -= progress/5
    camera.moveTo(state.x, state.y);
  }
  if (state.pressedKeys.down) {
    state.y += progress/5
    camera.moveTo(state.x, state.y);
  }
}

function draw() {
  var img = new Image()
  img.src = "/assets/images/mountains.jpg"
  ctx.clearRect(0, 0, width, height)
  ctx.drawImage(img, -state.x, -state.y)
  camera.begin();
  ctx.fillRect(state.x - 5, state.y - 5, 10, 10)
  camera.end();
}

function loop(timestamp) {
  var progress = timestamp - lastRender

  update(progress)
  draw()

  lastRender = timestamp
  window.requestAnimationFrame(loop)
}

var lastRender = 0
window.requestAnimationFrame(loop)
