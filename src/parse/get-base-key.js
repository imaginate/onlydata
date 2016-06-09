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

var isValidKey = require('./has-base-key');

var vitals = require('../help/vitals');
var cut    = vitals.cut;
var fuse   = vitals.fuse;

var NOT_KEY = / *[=:].*$/;

/**
 * @param {string} line
 * @param {number} i
 * @param {string} file
 * @return {string}
 */
module.exports = function getBaseKey(line, i, file) {

  if ( !isValidKey(line) ) throw new Error( errMsg(i, file) );

  return cut(line, NOT_KEY);
};

/**
 * @private
 * @param {number} i
 * @param {string} file
 * @return {string}
 */
function errMsg(i, file) {
  ++i;
  return file
    ? fuse('invalid base key at line `', i, '` in file `', file, '`')
    : fuse('invalid base key at line `', i, '`');
}
