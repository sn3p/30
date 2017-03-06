/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Utils = {
  /**
   * Get a random floating point number between `min` and `max`.
   *
   * @param {number} min - min number
   * @param {number} max - max number
   * @return {float} a random floating point number
   */
  random: function random(min, max) {
    return Math.random() * (max - min) + min;
  },

  /**
   * Get a random integer between `min` and `max`.
   *
   * @param {number} min - min number
   * @param {number} max - max number
   * @return {int} a random integer
   */
  randomInt: function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  /**
   * Get a random 1 or -1 integer.
   *
   * @param {number} t - number between 0 and 1
   * @return {int} a random 1 or -1 integer
   */
  randomPlusMinus: function randomPlusMinus(t) {
    t = t ? t : .5;
    return Math.random() > t ? -1 : 1;
  }
};

exports.default = Utils;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

var _Utils = __webpack_require__(0);

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
  width: window.innerWidth,
  height: window.innerHeight,
  text: '30',
  size: 500,
  density: 14,
  colors: [0x222222, 0xc49a62, 0xffb600, 0x5ccfea, 0x98edc2, 0xceff00, 0xe90055, 0xbfb1f2]
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
  var text = new PIXI.Text(options.text, {
    fontFamily: 'Arial',
    fontSize: options.size,
    fill: 0x000000,
    align: 'center'
  });
  text.anchor.set(.5);
  // container.addChild(text);

  var imageData = text.context.getImageData(0, 0, text.width, text.height);

  // Iterate each row and column
  for (var i = 0; i < imageData.height; i += options.density) {
    for (var j = 0; j < imageData.width; j += options.density) {

      // Get the color of the pixel
      var color = imageData.data[j * (imageData.width * 4) + i * 4 - 1];

      // If the color is black, draw pixels
      if (color === 255) {
        createParticle(i - text.width / 2, j - text.height / 2);
      }
    }
  }
}

function createParticle(x, y) {
  var color = options.colors[Math.floor(Math.random() * options.colors.length)];
  var particle = Particle(color);
  particle.position.set(x, y);
  particles.push(particle);
  container.addChild(particle);
}

function Particle(color) {
  var p = new PIXI.Graphics();

  p.beginFill(color);

  // Draw a circle
  if (Math.random() >= .5) {
    var radius = Math.random() * 8 + 1;
    p.drawCircle(0, 0, radius);

    // Draw a square
  } else {
    var size = Math.random() * 10 + 5;
    p.drawRect(0, 0, size, size);
    p.rotation = 40;
  }

  p.pos = _Utils2.default.randomInt(0, 100);
  p.v = _Utils2.default.randomPlusMinus() * _Utils2.default.random(.5, 1);
  p.sling = _Utils2.default.random(.2, 1.5);
  // p.alpha = Utils.randomInt(10, 100) / 100;

  p.update = function () {
    p.x = p.x + p.sling * Math.sin(p.pos * .15);
    p.y = p.y + p.sling * Math.cos(p.pos * .15);
    p.pos = p.pos + p.v;
  };

  return p;
}

function update() {
  particles.forEach(function (p) {
    return p.update();
  });
}

init();

/***/ })
/******/ ]);