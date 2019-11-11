class Tank {

  constructor(name, id, local, x, y, hp) {
    this.name = name;
    this.id = id;
    this.local = local;
    this.width = 50;
    this.height = 80;
    this.colour = "#ff0000";
    this.hp = hp;
    this.damage = 10;
    this.level = 1;
  }

}

Tank.prototype = {

  update: function() {
    return 0;
  },

  render: function() {
    var tank = new Tank(name, id, local, x, y, hp);
    return tank;
  },

  fire: function() {
    return 0;
  },

  levelUp: function() {
    return 0;
  }

}
