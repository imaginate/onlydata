# OnlyData [![npm version](https://img.shields.io/badge/npm-0.0.1--alpha-red.svg?style=flat)](https://www.npmjs.com/package/onlydata)

_OnlyData_ is a simple, flexible, and human-readable data serialization language that is easily converted into JavaScript objects.

## Example
```
# Comment
bool1 = true
str2  = a string
map3  = {
  num1: 5
  nil2: null
}
list4 = [ 0, 1, 3, magic string ]
str6 = how could you # Comment all you like I won't hear
str7 = 'listen here # We are all ears'
str8 = " keep your space bro "
str9 = <<
  # Still can't hear you
  <div>
    <p>Lorem ipsum madness!</p>
  </div>
  # If only a trimming could be avoided
  # But alas, my whitespace and line breaks could not be saved
>>
str10 = <<<
  <ol>
    <li>I am keeping your comments!</li>
    <li># Why?</li>
    <li>Because I want to.</li>
    <li># Ok</li>
    <li>Plus your whitespace too.</li>
  </ol>
>>>
bool11 = No
map12  = import yes-siree.od
```

## Install
```bash
npm install onlydata
```

## JS API
```javascript

var od = require('onlydata');

// values
var obj = { an: 'object', aka: 'hash map' };
var str = 'a string of OnlyData syntax';
var file = 'path/to/file.onlydata';
// or      'path/to/file.only';
// or      'path/to/file.od';

// parse string
obj = od(str);
obj = od.parse(str);
obj = od.parseString(str);

// parse file
obj = od(file);
obj = od.parse(file);
obj = od.parseFile(file);

// make string
str = od(obj);
str = od.make(obj);
str = od.makeString(obj);

// make file
str = od(obj, file);
str = od.make(obj, file);
str = od.makeFile(obj, file);
```

## Syntax
- [Files](#files)
- [Keys](#keys)
- [Values](#values)
- [Data Types](#data-types)
  - [Boolean](#boolean)
  - [String](#string)
  - [Number](#number)
  - [Map](#map)
  - [List](#list)
  - [Null](#null)
- [Import](#import)

### Files
- Each OnlyData file is equivalent to one hash map.
- [UTF-8](https://en.wikipedia.org/wiki/UTF-8) encoding is mandatory.
- File extensions must be ```.od```, ```.only```, or ```.onlydata```.
- Line breaks are automatically converted to [line feeds](https://en.wikipedia.org/wiki/Newline).

### Keys
- Keys must begin with a letter, a-z (not case-sensitive), or an underscore.
- Keys can contain letters, numbers, underscores, or dashes.
- Base keys use the equal sign, ```=```, to attribute value.
- Nested keys use the colon, ```:```, to attribute value.
- Whitespace is trimmed before and after each key.

### Values
- All values except for [string blocks](#string), [maps](#map), and [lists](#list) are terminated by line breaks.
- Whitespace is trimmed before and after each value.
- Values can be any [data type](#data-types).

### Data Types

#### Boolean
The standard ```true``` or ```false``` boolean values with optional ```yes``` or ```no``` aliases. Booleans are **not case-sensitive**.
```
key = false
key = True
key = YES
```

#### String

#### Number

#### Map

#### List

#### Null

### Import

## Other Details
**contributing:** [see contributing guide](https://github.com/imaginate/onlydata/blob/master/CONTRIBUTING.md)<br>
**bugs/improvements:** [open an issue](https://github.com/imaginate/onlydata/issues)<br>
**questions:** adam@imaginate.life
