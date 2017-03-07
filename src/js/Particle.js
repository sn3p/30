import Utils from './Utils';

class Particle {
  constructor (color) {
    this.color = color || 0x000000;

    this.init();
  }

  init () {
    this.gfx = new PIXI.Graphics();

    this.gfx.beginFill(this.color);

    // Draw a circle
    if (Math.random() >= .5) {
      const radius = Math.random() * 8 + 1;
      this.gfx.drawCircle(0, 0, radius);

    // Draw a square
    } else {
      const size = Math.random() * 10 + 5;
      this.gfx.drawRect(0, 0, size, size);
      this.gfx.rotation = 40;
    }

    // this.gfx.alpha = Utils.randomInt(10, 100) / 100;
    this.pos = Utils.randomInt(0, 100);
    this.velocity = Utils.randomPlusMinus() * Utils.random(.5, 1);
    this.sling = Utils.random(.2, 1.5);
  }

  position (x, y) {
    this.gfx.position.set(x, y);
  }

  update () {
    this.gfx.x += this.sling * Math.sin(this.pos * .15);
    this.gfx.y += this.sling * Math.cos(this.pos * .15);
    this.pos += this.velocity;
  }
}

export default Particle;
