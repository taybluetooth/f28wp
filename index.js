var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var camera = new Camera(ctx);
var width
var height



var resize = function() {
  width = window.innerWidth * 2
  height = window.innerHeight * 2
  canvas.width = width
  canvas.height = height
}
window.onresize = resize
resize()

var state = {
  position: {
    x: (width / 2),
    y: (height / 2)
  },
  movement: {
    x: 0,
    y: 0
  },
  rotation: 0,
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

function update(progress) {
  var p = progress * 3

  updateRotation(p)
  updateMovement(p)
  updatePosition(p)

  camera.moveTo(state.position.x, state.position.y)
}

function updateRotation(p) {
  if (state.pressedKeys.left) {
    state.rotation -= p / 5
  }
  else if (state.pressedKeys.right) {
    state.rotation += p / 5
  }
}

function updateMovement(p) {

  var accelerationVector = {
    x: p * 0.2 * Math.cos((state.rotation-90) * (Math.PI/180)),
    y: p * 0.2 * Math.sin((state.rotation-90) * (Math.PI/180))
  }

  if (state.pressedKeys.up) {
    state.position.x += accelerationVector.x
    state.position.y += accelerationVector.y
  }
  else if (state.pressedKeys.down) {
    state.position.x -= accelerationVector.x
    state.position.y -= accelerationVector.y
  }

}

function updatePosition(p) {

  // Detect boundaries
  if (state.position.x > width-40) {
    state.position.x -= p/5
  }
  else if (state.position.x < 40) {
    state.position.x += p/5
  }
  if (state.position.y > height-40) {
    state.position.y -= p/5
  }
  else if (state.position.y < 40) {
    state.position.y += p/5
  }
}

function updateBullet(p){
  if(state.onmousedown){
    shoot();
  }
}

function draw() {
  ctx.clearRect(0, 0, width, height)
  camera.begin()
  ctx.fillStyle = background()
  ctx.fillRect(-500, -500, 10000, 10000)
  ctx.save();
  ctx.translate(state.position.x, state.position.y)
  ctx.rotate((Math.PI/180) * state.rotation)
  ctx.drawImage(loadImg('tank'), 0, 0, 40, 40)
  //ctx.drawImage(loadImg('bullet'), 210, 10, 40, 20)
  ctx.restore()
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

var keyMap = {
  68: 'right',
  65: 'left',
  87: 'up',
  83: 'down'
}
function keydown(event) {
  var key = keyMap[event.keyCode]
  state.pressedKeys[key] = true
}
function keyup(event) {
  var key = keyMap[event.keyCode]
  state.pressedKeys[key] = false
}

window.addEventListener("keydown", keydown, false)
window.addEventListener("keyup", keyup, false)
