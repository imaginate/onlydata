# OnlyData

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

map = import ./yes-siree.onlydata
map = {
  map: Import nest-cleanly.od
}
```

### Files
- Each OnlyData file is equivalent to one [map](#map).
- [UTF-8](https://en.wikipedia.org/wiki/UTF-8) encoding is mandatory.
- File extensions must be ```.od```, ```.only```, or ```.onlydata```.
- Line breaks are automatically converted to [line feeds](https://en.wikipedia.org/wiki/Newline).

### Comments
- Initialized by a hash mark, ```#```.
- Terminated by a line break.
- Can begin at any point on a line.

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
- Base values can be any [data type](#data-types).
- Nested values (i.e. values within nested [maps](#map) or [lists](#list)) can be any one line [data type](#data-types).

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
- **Integer**<br>
  All positive or negative whole numbers within the [signed 64-bit integer](https://en.wikipedia.org/wiki/Integer_(computer_science)#Long_integer) range. Integers may be preceded by a plus, ```+```, or minus, ```-```, sign and contain commas, ```,```, between groups of three digits for increased clarity.

    ```
    num = +5
    num = -5
    num = 1000
    num = 1,000
    ```

- **Float**<br>
  All positive or negative fractions and exponentially-expressed numbers within the [64-bit double-precision float](https://en.wikipedia.org/wiki/Double-precision_floating-point_format) range. The decimal mark, ```.```, is used to indicate fractional portions, and the exponential mark, ```e``` (not case-sensitive), to indicate exponents. Floats may be preceded by a plus, ```+```, or minus, ```-```, sign, contain commas, ```,```, between groups of three digits preceding the decimal and exponential mark, contain underscores, ```_```, between groups of three digits following the decimal mark and preceding the exponential mark, and precede an exponent with a plus, ```+```, or minus, ```-```, sign.

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
    num = -54,321.123_45e6
    ```

#### Map
Maps are simple [key](#keys)/[value](#values) [associative arrays](https://en.wikipedia.org/wiki/Associative_array). Nested maps must be enclosed with curly braces, ```{``` and ```}```, unless [importing](#import) a separate file. For one line maps, key/value pairs must be separated by a comma, ```,```, and [strings](#string) must be quoted. For multi-line maps, key/value pairs must be separated by line breaks (additional commas are optional) and cannot exist on the same line as the opening and closing curly braces.
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
Nested [maps](#map) can be imported via the ```import``` keyword (not case-sensitive). If a relative path is given, the file is searched in relation to the calling file. Otherwise ```config['import-root'] || process.cwd();``` is used as the base path. To import all files from a directory into one map with the each filename (with leading path and extension trimmed) as key and its map as value, an asterisk, ```*```, may be used in place of the filename.
```
key = import ../path/to/file.od
key = Import ./path/to/file.only
key = IMPORT all/files/*.onlydata
```

## Other Details
**contributing:** [see contributing guide](https://github.com/imaginate/onlydata/blob/master/CONTRIBUTING.md)<br>
**bugs/improvements:** [open an issue](https://github.com/imaginate/onlydata/issues)<br>
**questions:** adam@imaginate.life
