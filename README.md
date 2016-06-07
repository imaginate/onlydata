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
map12 = import yes-siree.od
```

## Install
```bash
npm install onlydata
```

## JS API
```javascript

var od = require('onlydata');

// values
var str = 'an string of OnlyData syntax';
var obj = { an: 'object', aka: 'map' };
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

// set import root
od.setConfig('import-root', 'path/to/tree');

// unset import root
od.unsetConfig('import-root');
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
- Each OnlyData file is equivalent to one [map](#map).
- [UTF-8](https://en.wikipedia.org/wiki/UTF-8) encoding is mandatory.
- File extensions must be ```.od```, ```.only```, or ```.onlydata```.
- Line breaks are automatically converted to [line feeds](https://en.wikipedia.org/wiki/Newline).

### Keys
- Keys must begin with a letter, a-z (not case-sensitive), or an underscore.
- Keys can contain letters, numbers, underscores, or dashes.
- Base keys use the equal sign, ```=```, to attribute value.
- Nested keys use the colon, ```:```, to attribute value.
- Whitespace is trimmed before and after each key.
- Keys must include a [value](#values).

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
- **Basic String**<br>
  All line-terminated values that do not match another data type are trimmed of whitespace and considered a string.

    ```
    str = I am a basic string.
    ```

- **Quoted String**<br>
  One line strings can be enclosed by single, ```'```, or double, ```"```, quotation marks to improve clarity, to keep whitespace and hash marks, ```#```, or to define an empty string. Quoted strings must begin and end with the chosen quotation mark. Quotation marks within strings do not need any special attention (i.e. no backslash needed). Multi-line strings must be blocked.

    ```
    str = ''
    str = 'I am a quoted string.'
    str = "I am a quoted string."
    ```

- **Blocked String**<br>
  Multi-line strings must be enclosed by two or three angle brackets, ```<``` and ```>```. Blocked string values must begin with only the opening angle brackets for the first line and end with only the closing angle brackets for the last line. For two bracket enclosed strings, all line breaks, comments, and leading/ending whitespace (per line) is trimmed. For three bracket enclosed strings (aka **raw strings**), only the leading and ending line breaks are trimmed.

    ```
    str = <<
    # Trims comments, whitespace, and line breaks
    <div>
      <p>I am a blocked string.</p>
    </div>
    >>
    str = <<<
    # Keeps comments, whitespace, and line breaks
    <div>
      <p>I am a raw string.</p>
    </div>
    >>>
    ```

#### Number
All positive or negative whole numbers that pass the [Number.isSafeInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger) test. Numbers may be preceded by a plus, ```+```, or minus, ```-```, sign and contain commas, ```,```, for increased clarity. If a number does not pass the isSafeInteger test (e.g. a decimal) then it is saved as a string.
```
num = +5
num = -5
num = 1000
num = 1,000
```

#### Map
Maps are simple [key](#keys)/[value](#values) [associative arrays](https://en.wikipedia.org/wiki/Associative_array). Nested maps must be enclosed with curly braces, ```{``` and ```}```, unless [importing](#import) a separate file. For one line maps, key/value pairs must be separated by a comma, ```,```. For multi-line maps, key/value pairs must be separated by line breaks (additional commas are optional) and cannot exist on the same line as the opening and closing curly braces.
```
map = { key: value, key: value }
map = {
  key: value
  key: value
}
map = {
  key: value,
  key: value,
}
map = import path/to/file.onlydata
```

#### List
Lists are simple indexed [arrays](https://en.wikipedia.org/wiki/Array_data_type) of [values](#values). Lists must be enclosed with square brackets, ```[``` and ```]```. For one line lists, values must be separated by a comma, ```,```. For multi-line lists, values must be separated by line breaks (additional commas are optional) and cannot exist on the same line as the opening and closing square brackets.
```
list = [ value, value ]
list = [
  value
  value
]
list = [
  value,
  value,
]
```

#### Null
Null is used to represent all empty, missing, or undefined values. The keywords ```null``` or ```nil``` (not case-sensitive) are used to represent a null value.
```
key = null
key = NIL
```

### Import
Nested [maps](#map) can be imported via the ```import``` keyword (not case-sensitive). If a relative path is given, the file is searched in relation to the calling file. Otherwise the configured import root value (defaults to ```process.cwd()```) is used as the base path.
```
key = import ../path/to/file.od
key = Import ./path/to/file.only
key = IMPORT path/to/file.onlydata
```

## Other Details
**contributing:** [see contributing guide](https://github.com/imaginate/onlydata/blob/master/CONTRIBUTING.md)<br>
**bugs/improvements:** [open an issue](https://github.com/imaginate/onlydata/issues)<br>
**questions:** adam@imaginate.life
