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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

  p.pos = Math2.randomInt(0, 100);
  p.v = Math2.randomPlusMinus() * Math2.random(.5, 1);
  p.sling = Math2.random(.2, 1.5);
  // p.alpha = Math2.randomInt(10, 100) / 100;

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