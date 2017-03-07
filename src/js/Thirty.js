import Particle from './Particle';

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
    const particle = new Particle(color);
    particle.position(x, y);
    this.particles.push(particle);
    this.container.addChild(particle.gfx);
  }

  update () {
    this.particles.forEach(p => p.update());
  }
}

export default Thirty;
