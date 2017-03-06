const Utils = {
  /**
   * Get a random floating point number between `min` and `max`.
   *
   * @param {number} min - min number
   * @param {number} max - max number
   * @return {float} a random floating point number
   */
  random: function (min, max) {
    return Math.random() * (max - min) + min;
  },

  /**
   * Get a random integer between `min` and `max`.
   *
   * @param {number} min - min number
   * @param {number} max - max number
   * @return {int} a random integer
   */
  randomInt: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  /**
   * Get a random 1 or -1 integer.
   *
   * @param {number} t - number between 0 and 1
   * @return {int} a random 1 or -1 integer
   */
  randomPlusMinus: function (t) {
    t = t ? t : .5;
    return Math.random() > t ? -1 : 1;
  }
};

export default Utils;
