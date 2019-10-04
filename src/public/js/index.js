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
    state.x -= progress
  }
  if (state.pressedKeys.right) {
    state.x += progress
  }
  if (state.pressedKeys.up) {
    state.y -= progress
  }
  if (state.pressedKeys.down) {
    state.y += progress
  }
  if (state.x > width) {
    state.x -= width
  }
  else if (state.x < 0) {
    state.x += width
  }
  if (state.y > height) {
    state.y -= height
  }
  else if (state.y < 0) {
    state.y += height
  }
  camera.moveTo(state.x, state.y)
}

function draw() {
  ctx.clearRect(0, 0, width, height)
  camera.begin()
  ctx.fillStyle = background()
  ctx.fillRect(-1920, -1920, 10000, 10000)
  ctx.drawImage(loadImg('tank'), state.x - 5, state.y - 5, 35, 30)
  camera.end()
}

function loop(timestamp) {
  var progress = timestamp - lastRender

  update(progress)
  draw()
  //console.log("X: " + state.x + " Y: " + state.y)

  lastRender = timestamp
  window.requestAnimationFrame(loop)
}

var lastRender = 0
window.requestAnimationFrame(loop)
