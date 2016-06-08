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

var cut = require('./vitals').cut;

var A = /^[ \t\v]+/;
var Z = /[ \t\v]+$/;

/**
 * @param {string} content
 * @return {string}
 */
module.exports = function trimWhitespace(content) {
  content = cut(content, A);
  return cut(content, Z);
};
