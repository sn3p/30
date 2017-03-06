import '../css/main.css';

const Math2={};
Math2.random=function(t,n){return Math.random()*(n-t)+t};
Math2.randomPlusMinus=function(t){return t=t?t:.5,Math.random()>t?-1:1};
Math2.randomInt=function(t,n){return n+=1,Math.floor(Math.random()*(n-t)+t)};

const options = {
  width: window.innerWidth,
  height: window.innerHeight,
  text: '30',
  size: 500,
  density: 14,
  colors: [0x222222, 0xc49a62, 0xffb600, 0x5ccfea, 0x98edc2, 0xceff00, 0xe90055, 0xbfb1f2],
};

const app = new PIXI.Application(options.width, options.height, {
  transparent: true,
  antialias: true
});

document.body.appendChild(app.view);

const container = new PIXI.Container();
container.x = app.renderer.width / 2;
container.y = app.renderer.height / 2;
app.stage.addChild(container);

app.ticker.add(update);

const particles = [];

function init () {
  positionParticles();
}

function positionParticles () {
  const text = new PIXI.Text(options.text, {
    fontFamily: 'Arial',
    fontSize: options.size,
    fill: 0x000000,
    align: 'center'
  });
  text.anchor.set(.5);
  // container.addChild(text);

  const imageData = text.context.getImageData(0, 0, text.width, text.height);

  // Iterate each row and column
  for (let i = 0; i < imageData.height; i += options.density) {
    for (let j = 0; j < imageData.width; j += options.density) {

      // Get the color of the pixel
      const color = imageData.data[((j * (imageData.width * 4)) + (i * 4)) - 1];

      // If the color is black, draw pixels
      if (color === 255) {
        createParticle(
          i - text.width / 2,
          j - text.height / 2
        );
      }
    }
  }
}

function createParticle (x, y) {
  const color = options.colors[Math.floor(Math.random() * options.colors.length)];
  const particle = Particle(color);
  particle.position.set(x, y);
  particles.push(particle);
  container.addChild(particle);
}

function Particle (color) {
  const p = new PIXI.Graphics();

  p.beginFill(color);

  // Draw a circle
  if (Math.random() >= .5) {
    const radius = Math.random() * 8 + 1;
    p.drawCircle(0, 0, radius);

  // Draw a square
  } else {
    const size = Math.random() * 10 + 5;
    p.drawRect(0, 0, size, size);
    p.rotation = 40;
  }

  p.pos = Math2.randomInt(0, 100);
  p.v = Math2.randomPlusMinus() * Math2.random(.5, 1);
  p.sling = Math2.random(.2, 1.5);
  // p.alpha = Math2.randomInt(10, 100) / 100;

  p.update = function () {
    p.x = p.x + p.sling * Math.sin(p.pos * .15);
    p.y = p.y + p.sling * Math.cos(p.pos * .15);
    p.pos = p.pos + p.v;
  }

  return p;
}

function update () {
  particles.forEach(p => p.update());
}

init();
