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
    // this.container.addChild(text);

    // Get text image data
    const imageData = text.context.getImageData(0, 0, text.width, text.height);

    // Iterate each column amd row
    for (let y = 0; y < imageData.height; y += this.options.density) {
      for (let x = 0; x < imageData.width; x += this.options.density) {

        // Get the color of the pixel
        const color = imageData.data[(y * imageData.width + x) * 4 + 3];

        // If the color is black, draw pixels
        if (color === 255) {
          this.createParticle(
            x - text.width / 2,
            y - text.height / 2
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
