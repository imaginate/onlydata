/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.0
 * @see [OnlyData](http://onlydata.tech)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var trim = require('./trim');

var has = require('../../help/vitals').has;

var YES = /^(?:true|yes)$/i;

/**
 * @param {string} line
 * @return {boolean}
 */
module.exports = function parseBoolean(line) {
  line = trim(line);
  return has(line, YES);
};
