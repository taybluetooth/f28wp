var bulletVisible = false;
bullet.hide();

function shoot(){
  bullet = new Sprite(canvas,loadImg('bullet'),40,20)
  bullet.show();

}
