# ansiparse [![Build Status](https://secure.travis-ci.org/mmalecki/ansiparse.png)](http://travis-ci.org/mmalecki/ansiparse)
Copyright (C) 2011 by Maciej Małecki  
MIT License (see LICENSE file)

**ansiparse** parses ANSI color codes.

## Installation

    npm install ansiparse

## Usage
```js
var ansiparse = require('ansiparse');
require('colors');
ansiparse('red'.red + ' ' + 'green'.green);
  // => [ { foreground: '31', text: 'red' }, { text: ' ' }, { foreground: '32', text: 'green' } ]
```

