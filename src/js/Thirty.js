import Utils from './Utils';

class Thirty {
  constructor (options) {
    this.options = options;

    this.init();
  }

  init () {
    // Craete PIXI app
    this.app = new PIXI.Application(this.options.width, this.options.height, {
      transparent: true,
      antialias: true
    });
    document.body.appendChild(this.app.view);

    // Create partible container
    this.container = new PIXI.Container();
    this.container.x = this.app.renderer.width / 2;
    this.container.y = this.app.renderer.height / 2;
    this.app.stage.addChild(this.container);

    // Render updates
    this.app.ticker.add(this.update.bind(this));

    // Create particles
    this.particles = [];
    this.createParticles();
  }

  createParticles () {
    const text = new PIXI.Text(this.options.text, {
      fontFamily: 'Arial',
      fontSize: this.options.size,
      fill: 0x000000,
      align: 'center'
    });
    text.anchor.set(.5);
    // container.addChild(text);

    const imageData = text.context.getImageData(0, 0, text.width, text.height);

    // Iterate each row and column
    for (let i = 0; i < imageData.height; i += this.options.density) {
      for (let j = 0; j < imageData.width; j += this.options.density) {

        // Get the color of the pixel
        const color = imageData.data[((j * (imageData.width * 4)) + (i * 4)) - 1];

        // If the color is black, draw pixels
        if (color === 255) {
          this.createParticle(
            i - text.width / 2,
            j - text.height / 2
          );
        }
      }
    }
  }

  createParticle (x, y) {
    const color = this.options.colors[
      Math.floor(Math.random() * this.options.colors.length)
    ];
    const particle = this.particle(color);
    particle.position.set(x, y);
    this.particles.push(particle);
    this.container.addChild(particle);
  }

  particle (color) {
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

    p.pos = Utils.randomInt(0, 100);
    p.v = Utils.randomPlusMinus() * Utils.random(.5, 1);
    p.sling = Utils.random(.2, 1.5);
    // p.alpha = Utils.randomInt(10, 100) / 100;

    p.update = function () {
      p.x = p.x + p.sling * Math.sin(p.pos * .15);
      p.y = p.y + p.sling * Math.cos(p.pos * .15);
      p.pos = p.pos + p.v;
    }

    return p;
  }

  update () {
    this.particles.forEach(p => p.update());
  }
}

export default Thirty;
