'use strict';

var options = {
  width: window.innerWidth,
  height: window.innerHeight,
  keyword: '30',
  density: 8
};

var app = new PIXI.Application(options.width, options.height, {
  transparent: true,
  antialias: true
});

document.body.appendChild(app.view);

var container = new PIXI.Container();
container.x = app.renderer.width / 2;
container.y = app.renderer.height / 2;
app.stage.addChild(container);

app.ticker.add(update);

var particles = [];

function init() {
  positionParticles();
}

function positionParticles() {
  var text = new PIXI.Text('30', {
    fontFamily: 'Arial',
    fontSize: 300,
    fill: '#000000',
    align: 'center'
  });
  text.anchor.set(0.5);
  // container.addChild(text);

  var imageData = text.context.getImageData(0, 0, text.width, text.height);

  // Iterate each row and column
  for (var i = 0; i < imageData.height; i += options.density) {
    for (var j = 0; j < imageData.width; j += options.density) {

      // Get the color of the pixel
      var color = imageData.data[j * (imageData.width * 4) + i * 4 - 1];

      // If the color is black, draw pixels
      if (color === 255) {
        var particle = Particle();
        particle.position.set(i - text.width / 2, j - text.height / 2);
        particles.push(particle);
        container.addChild(particle);
      }
    }
  }
}

function Particle() {
  var Math2 = {};
  Math2.random = function (t, n) {
    return Math.random() * (n - t) + t;
  };
  Math2.randomPlusMinus = function (t) {
    return t = t ? t : .5, Math.random() > t ? -1 : 1;
  };
  Math2.randomInt = function (t, n) {
    return n += 1, Math.floor(Math.random() * (n - t) + t);
  };

  var p = new PIXI.Graphics();
  var radius = Math.random() * 10.5;

  p.beginFill(0Xffb600);
  p.drawCircle(0, 0, radius);

  p.timer = Math2.randomInt(0, 100);
  p.v = Math2.randomPlusMinus() * Math2.random(.5, 1);

  p.alpha = Math2.randomInt(10, 100) / 100;

  return p;
}

function update() {
  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];
    p.x = p.x + .2 * Math.sin(p.timer * .15);
    p.y = p.y + .2 * Math.cos(p.timer * .15);
    p.timer = p.timer + p.v;
  }
}

init();