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

var has = require('./vitals').has;

var BLANK = /^\s+$/;

/**
 * @param {string} str
 * @return {boolean}
 */
module.exports = function isEmptyStr(str) {
  return !str || has(str, BLANK);
};
