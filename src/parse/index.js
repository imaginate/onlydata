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

var getBaseKey  = require('./base-key/get');
var trimBaseKey = require('./base-key/trim');

var isBlock   = require('./is-blocked-string');
var isBoolean = require('./boolean/is');
var isComment = require('./is-comment');
var isImport  = require('./is-import');
var isList    = require('./is-list');
var isMap     = require('./is-map');
var isNull    = require('./is-null');
var isNumber  = require('./is-number');
var isQuoted  = require('./is-quoted-string');

var parseBlock   = require('./parse-blocked-string');
var parseBoolean = require('./boolean/parse');
var parseImport  = require('./parse-import');
var parseList    = require('./parse-list');
var parseMap     = require('./parse-map');
var parseNumber  = require('./parse-number');
var parseQuoted  = require('./parse-quoted-string');
var parseString  = require('./parse-basic-string');

var vitals = require('../help/vitals');
var fuse   = vitals.fuse;
var is     = vitals.is;
var to     = vitals.to;

var isBlank   = require('../help/is-empty-str');
var trimSpace = require('../help/trim-whitespace');

/**
 * @param {!Object} config
 * @param {string}  data - must be valid OnlyData syntax (line-feed EOLs only)
 * @param {string=} file
 * @return {!Object}
 */
module.exports = function parseOnlyData(config, data, file) {

  /** @type {!Object} */
  var result;
  /** @type {!Array} */
  var lines;
  /** @type {string} */
  var line;
  /** @type {string} */
  var key;
  /** @type {*} */
  var val;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  file = file || '';

  if ( !is.obj(config) ) throw new TypeError('invalid type for `config` param');
  if ( !is.str(data)   ) throw new TypeError('invalid type for `data` param');
  if ( !is.str(file)   ) throw new TypeError('invalid type for `file` param');

  if ( isBlank(data) ) return {};

  result = {};
  lines = to.arr(data, '\n');
  len = lines.length;
  i = -1;
  while (++i < len) {

    line = lines[i];
    line = trimSpace(line);

    if ( isComment(line) ) continue;

    key = getBaseKey(line, i, file);
    val = trimBaseKey(line);

    if ( isComment(val) ) throw new Error( noValErrMsg(i, file) );

    // parse lists, maps, and string blocks (i.e. multi-line values)
    val = isList(val)
      ? parseList(lines, i, file)
      : isMap(val)
        ? parseMap(lines, i, file)
        : isBlock(val)
          ? parseBlock(lines, i, file)
          : val;

    // save list, map, or string block result
    if ( is.obj(val) ) {
      i   = val.index;
      val = val.value;
    }
    else {
      // parse remaining data types
      val = isQuoted(val)
        ? parseQuoted(val, i, file)
        : isNull(val)
          ? null
          : isBoolean(val)
            ? parseBoolean(val)
            : isImport(val)
              ? parseImport(val, i, file)
              : isNumber(val)
                ? parseNumber(val)
                : parseString(val);
    }

    result[key] = val;
  }

  return result;
};

/**
 * @private
 * @param {number} i
 * @param {string} file
 * @return {string}
 */
function noValErrMsg(i, file) {
  ++i;
  return file
    ? fuse('missing a value at line `', i, '` in file `', file, '`')
    : fuse('missing a value at line `', i, '`');
}
