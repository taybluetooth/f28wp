var canvas = document.getElementById("canvas")
var width = window.innerWidth
var height = window.innerHeight
canvas.width = width;
canvas.height = height;
var ctx = canvas.getContext("2d")
var camera = new Camera(ctx)
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

function updateText() {
  document.getElementById("coord").innerHTML = "Current Coordinates: X: " + state.x.toFixed(2) + " Y: " + state.y.toFixed(2)
}

function background() {
  var img = new Image()
  img.src = "/assets/images/background.png"
  var ptrn = ctx.createPattern(img, 'repeat')
  return ptrn;
}

function loadImg(name) {
  var img = new Image()
  img.src = "/assets/images/"+name+".png"
  return img;
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
    state.x -= progress/3
  }
  if (state.pressedKeys.right) {
    state.x += progress/3
  }
  if (state.pressedKeys.up) {
    state.y -= progress/3
  }
  if (state.pressedKeys.down) {
    state.y += progress/3
  }
  if (state.x > 1000) {
    state.x -= 1000
  }
  else if (state.x < 0) {
    state.x += 1000
  }
  if (state.y > 1000) {
    state.y -= 1000
  }
  else if (state.y < 0) {
    state.y += 1000
  }
  camera.moveTo(state.x, state.y)
}

function draw() {
  ctx.clearRect(0, 0, width, height)
  camera.begin()
  ctx.fillStyle = background()
  ctx.fillRect(-1920, -1920, 10000, 10000)
  ctx.font = "10px Poppins";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("Bob", state.x + 20, state.y + 50);
  ctx.drawImage(loadImg('tank'), state.x, state.y, 40, 40)
  camera.end()
}

function loop(timestamp) {
  var progress = timestamp - lastRender

  update(progress)
  updateText()
  draw()

  lastRender = timestamp
  window.requestAnimationFrame(loop)
}

var lastRender = 0
window.requestAnimationFrame(loop)
