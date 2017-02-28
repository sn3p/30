'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import { Graphics } from 'pixi.js';
var PIXI = require('pixi.js');

// class Particle extends PIXI.Graphics {

var Particle = function (_PIXI$Graphics) {
  _inherits(Particle, _PIXI$Graphics);

  function Particle(options) {
    _classCallCheck(this, Particle);

    var _this = _possibleConstructorReturn(this, (Particle.__proto__ || Object.getPrototypeOf(Particle)).call(this));

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

    // const p = new PIXI.Graphics()
    // const radius = Math.random() * 10.5;

    _this.beginFill(0Xffb600);
    _this.drawCircle(0, 0, radius);

    _this.timer = Math2.randomInt(0, 100);
    _this.v = Math2.randomPlusMinus() * Math2.random(.5, 1);

    _this.alpha = Math2.randomInt(10, 100) / 100;

    // return super();
    return _this;
  }

  return Particle;
}(PIXI.Graphics);

exports.default = Particle;