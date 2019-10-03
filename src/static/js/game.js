var canvas;
var context;

setup = () => {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  document.addEventListener('keydown', keyHandle);
  test = new Tank(80, 80);
}

keyHandle = (e) => {
  switch(e.keyCode) {
    case 38:
      test.y -= 5;
      break;
    case 40:
      test.y += 5;
      break;
    case 65:
      rotate(test, 10);
      break;
    case 68:
      rotate(test, 10);
      break;
    }
}

rotate = (object, angle) => {
  context.translate(object.x + object.width/2, object.y + object.height/2);
  context.rotate(angle * Math.PI / 180);
  context.translate(-(object.x + object.width /2), -(object.y + object.height/2));
}

clearCanv = () => {
  context.save();
  context.setTransform(1,0,0,1,0,0);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.restore();
}

class Tank {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 80;
    this.update = () => {
      test.show();
    }

    this.show = () => {
      context.fillStyle = "green";
      context.fillRect(this.x,this.y,this.width,this.height);
    }
  }
}

main = () => {
  setInterval(function onTick() {
    clearCanv();
    test.show();
  }, 10);
}

setup();
main();
