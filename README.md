# OnlyData [![version](https://img.shields.io/badge/version-0.1.0-brightgreen.svg?style=flat)](http://onlydata.tech)

_OnlyData_ is a simple, flexible, and human-readable data serialization language.

## Contents
- [Example](#example)
- [Files](#files)
- [Comments](#comments)
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
- [Parsers](#parsers)
- [More](#more)

## Example
```
########################################
## QUICK

str  = simple strings
num  = 105
bool = true
none = null
map  = {
  key: value
  key: value
}
list = [ value, value, value ] # comment

########################################
## CLEAR

str = enjoy "unencumbered quoting"
str = "clarify strings by wrapping"
str = 'fearlessly feel unescaped's power'

num = +105
num = -15e3
num = 54,321.123_45

bool = yes
bool = True
bool = TRUE

none = nil
none = Null
none = NULL

map = { key: value, key: value }
map = {
  key: value,
  key: value,
}

list = [ value, value, value, ]
list = [
  value
  value
]

########################################
## DEEP

str = " keep your space bro "
str = '# no comment needed'
str = '[ special chars ]'

str = <<
  # trim ${comments} ${whitespace} ${line-breaks}
  <div>
    <h1>Be Blocky</h1>
    <p>Lorem ipsum madness!</p>
  </div>
>>
str = <<<
  <h2>Raw Power</h2>
  <ol>
    <li>I am keeping your comments!</li>
    <li># Why?</li>
    <li>Because I want to.</li>
    <li># Ok</li>
    <li>And your whitespace too.</li>
  </ol>
>>>

map = import ./yes/siree.onlydata
map = {
  map: Import @base/nest/cleanly.od
}
```

## Files
- Each OnlyData file is equivalent to one [map](#map).
- [UTF-8](https://en.wikipedia.org/wiki/UTF-8) encoding is mandatory.
- File extensions must be ```.od```, ```.only```, or ```.onlydata```.
- Line breaks are automatically converted to [line feeds](https://en.wikipedia.org/wiki/Newline).

## Comments
- Initialized by a hash mark, ```#```.
- Terminated by a line break.
- Can begin at any point on a line.

## Keys
- Keys must begin with a letter, a-z (not case-sensitive), or an underscore.
- Keys can contain letters, numbers, underscores, or dashes.
- Base keys use the equal sign, ```=```, to attribute value.
- Nested keys use the colon, ```:```, to attribute value.
- Whitespace is trimmed before and after each key.
- Keys must include a [value](#values).

## Values
- All values except for [string blocks](#string), [maps](#map), and [lists](#list) are terminated by line breaks.
- Whitespace is trimmed before and after each value.
- Base values can be any [data type](#data-types).
- Nested values (i.e. values within nested [maps](#map) or [lists](#list)) can be any one line [data type](#data-types).

## Data Types

### Boolean
The standard ```true``` or ```false``` boolean values with optional ```yes``` or ```no``` aliases. Booleans are **not case-sensitive**.
```
key = false
key = True
key = YES
```

### String
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

### Number
- **Integer**<br>
  All positive or negative whole numbers within the [signed 64-bit integer](https://en.wikipedia.org/wiki/Integer_(computer_science)#Long_integer) range. Integers may be preceded by a plus, ```+```, or minus, ```-```, sign and contain commas, ```,```, or underscores, ```_```, between groups of three digits for increased clarity.

    ```
    num = +5
    num = -5
    num = 1000
    num = 1,000
    num = 1_000
    ```

- **Float**<br>
  All positive or negative fractions and exponentially-expressed numbers within the [64-bit double-precision float](https://en.wikipedia.org/wiki/Double-precision_floating-point_format) range. The decimal mark, ```.```, is used to indicate fractional portions, and the exponential mark, ```e``` (not case-sensitive), to indicate exponents. Floats may be preceded by a plus, ```+```, or minus, ```-```, sign, contain commas, ```,```, or underscores, ```_```, between groups of three digits preceding the decimal and exponential mark, contain underscores, ```_```, between groups of three digits following the decimal mark and preceding the exponential mark, and precede an exponent with a plus, ```+```, or minus, ```-```, sign.

    ```
    num = +5.01
    num = -5.09
    num = 1.234

    num = 3E+5
    num = 3E-5
    num = 3e10

    num = 4.3e-10
    num = 4.899E5

    num = 54,321.123_45
    num = 54_321.123_45
    num = -54,321.123_45e6
    ```

### Map
Maps are simple key/value [associative arrays](https://en.wikipedia.org/wiki/Associative_array). Nested maps must be enclosed with curly braces, ```{``` and ```}```, unless [importing](#import) a separate file. Note that deep nesting is strictly limited to encourage simple data structures and when necessary the use of separate pages (i.e. [importing](#import)) to break down more complex structures.
- **Inline Maps**<br>
  - [Key](#keys)/[value](#values) pairs must be separated by a comma, ```,```.
  - A comma is optional for the last key/value pair.
  - [Strings](#string) must be quoted (i.e. basic and blocked strings are not allowed).
  - [Numbers](#number) must use underscores for any clarity marks (i.e. do not use commas).
  - [Maps](#map), [lists](#list), and [importing](#import) are not allowed (i.e. use a multi-line map).
  <br><br>

  ```
  map = { key: value, key: value, key: value }
  map = { key: value, key: value, key: value, }
  ```

- **Multi-line Maps**<br>
  - [Key](#keys)/[value](#values) pairs are not allowed on the same line as the opening and closing curly braces.
  - Key/value pairs must be separated by a line break.
  - Key/value pairs may be separated by a comma and line break.
  - If a comma is used to separate pairs, a comma is optional for the last key/value pair.
  - Blocked [strings](#string) are not allowed (i.e. keep strings to one-line when nesting).
  - [Maps](#map) and [lists](#list) must be inline (i.e. deep nesting is only allowed via [importing](#import)).
  <br><br>

  ```
  map = {
    key: value
    key: value
    key: value
  }
  map = {
    key: value,
    key: value,
    key: value
  }
  map = {
    key: value,
    key: value,
    key: value,
  }
  ```

### List
Lists are simple indexed [arrays](https://en.wikipedia.org/wiki/Array_data_type) of [values](#values). Lists must be enclosed with square brackets, ```[``` and ```]```.
- **Inline Lists**<br>
  - Values must be separated by a comma, ```,```.
  - A comma is optional for the last value.
  - [Strings](#string) must be quoted (i.e. basic and blocked strings are not allowed).
  - [Numbers](#number) must use underscores for any clarity marks (i.e. do not use commas).
  - [Maps](#map), [lists](#list), and [importing](#import) are not allowed (i.e. use a multi-line list).
  <br><br>

  ```
  list = [ value, value, value ]
  list = [ value, value, value, ]
  ```

- **Multi-line Lists**<br>
  - Values are not allowed on the same line as the opening and closing square brackets.
  - Values must be separated by a line break.
  - Values may be separated by a comma and line break.
  - If a comma is used to separate values, a comma is optional for the value.
  - Blocked [strings](#string) are not allowed (i.e. keep strings to one-line).
  - [Maps](#map) and [lists](#list) must be inline (i.e. deep nesting is only allowed via [importing](#import)).
  <br><br>

  ```
  list = [
    value
    value
    value
  ]
  list = [
    value,
    value,
    value
  ]
  list = [
    value,
    value,
    value,
  ]
  ```

### Null
Null is used to represent all empty, missing, or undefined values. The keywords ```null``` or ```nil``` (not case-sensitive) are used to represent a null value.
```
key = null
key = NIL
```

## Import
Nested [maps](#map) can be imported via the ```import``` keyword (not case-sensitive). A relative or absolute path may be used for the OnlyData file. Additionally, a value from the parser configuration's ```import-base``` map may used as the base path via the at symbol, ```@```, followed by the key name. To import all files from a directory into one map with the each filename (with leading path and extension trimmed) as key and its map as value, an asterisk, ```*```, may be used in place of the filename.
```
key = import /abs/path/to/file.od
key = import ../rel/path/to/file.od
key = Import rel/path/to/files/*.only
key = IMPORT @base/path/to/file.onlydata
```

## Parsers
- [node.js](http://onlydata.tech/node)

## More
**contributing:** [see contributing guide](https://github.com/imaginate/onlydata/blob/master/CONTRIBUTING.md)<br>
**bugs/improvements:** [open an issue](https://github.com/imaginate/onlydata/issues)<br>
**questions:** adam@imaginate.life
