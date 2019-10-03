var canvas;
var context;

objectInit = () => {
  test = new Tank(canvas.width/2, canvas.height/2);
  turret = new Turret(test.x + 25 / 2 - 3, test.y + 25 / 2 - 30);
}

setup = () => {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  document.addEventListener('keydown', keyHandle);
  objectInit();
}

preloadImg = (name) => {
  var img = new Image();
  img.src = "/assets/images/"+name+".png";
  return img;
}

keyHandle = (e) => {
  switch(e.keyCode) {
    case 87:
      test.move(true);
      break;
    case 83:
      test.move(false);
      break;
    case 65:
      test.rotate(-10);
      break;
    case 68:
      test.rotate(10);
      break;
    }
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
    this.width = 40;
    this.height = 40;

    this.show = () => {
      var base = preloadImg('base')
      context.drawImage(base, this.x,this.y,this.width,this.height);
    }

    this.rotate = (angle) => {
      context.translate(this.x + this.width/2, this.y + this.height/2);
      context.rotate(angle * Math.PI / 180);
      context.translate(-(this.x + this.width /2), -(this.y + this.height/2));
    }

    this.move = (forward) => {
      if(forward === true) {
        test.y -= 5;
        turret.y -= 5;
      }
      else {
        test.y += 5;
        turret.y += 5;
      }
    }
  }
}

class Turret {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 30;
    this.angle = 0;

    this.show = () => {
      var turret = preloadImg('turret');
      context.drawImage(turret, this.x,this.y, this.width, this.height);
    }
  }
}

drawObjects = () => {
  test.show();
  turret.show();
}

main = () => {
  setInterval(function onTick() {
    clearCanv();
    drawObjects();
  }, 10);
}

setup();
main();
