var assert = require('assert'),
    vows = require('vows'),
    ansiparse = require('../');

require('colors');

var dataSets = {
  simple: {
    input: 'hello world'.green,
    output: [{ text: 'hello world', foreground: 'green' }]
  },
  many: {
    input: 'hello '.green + 'world'.red,
    output: [{ text: 'hello ', foreground: 'green' }, { text: 'world', foreground: 'red' }]
  },
  'many same colors': {
    input: 'hello '.green + 'world'.green,
    output: [{ text: 'hello ', foreground: 'green' }, { text: 'world', foreground: 'green' }]
  },
  bold: {
    input: 'hello world'.bold,
    output: [{ text: 'hello world', bold: true }]
  },
  italics: {
    input: 'hello world'.italic,
    output: [{ text: 'hello world', italic: true }]
  },
  background: {
    input: '\033\[42mhello world\033\[49m',
    output: [{ text: 'hello world', background: 'green' }]
  },
  boldAndColor: {
    input: 'hello world'.red.bold,
    output: [{ text: 'hello world', bold: true, foreground: 'red' }]
  },
  'partly bolded': {
    input: 'hello '.bold + 'world'.red,
    output: [
      { text: 'hello ', bold: true },
      { text: 'world', foreground: 'red', bold: false }
    ]
  },
  noColor: {
    input: 'hello world',
    output: [{ text: 'hello world' }]
  },
  'unfinished color': {
    input: '\033\[32mhello world',
    output: [{ text: 'hello world', foreground: 'green' }]
  },
  nested: {
    input: ('hello ' + 'world'.red).green,
    output: [
      { text: 'hello ', foreground: 'green' },
      { text: 'world', foreground: 'red' }
    ]
  },
  grey: {
    input: 'hello world'.grey,
    output: [{ text: 'hello world', foreground: 'grey' }]
  },
  'malformed control sequence': {
    input: '\033A string between two ESC\033',
    output: [ { text: '\033A string between two ESC\033' } ]
  },
  'simple backspace': {
    input: 'hello '.green + 'worz\bld'.red,
    output: [{ text: 'hello ', foreground: 'green' }, { text: 'world', foreground: 'red' }]
  },
  'backspace across blocks': {
    input: 'hello'.green + ' ' + 'worz\b\b\b\b\bl    \b\b\b\b'.red,
    output: [{ text: 'hello', foreground: 'green' }, { text: 'l', foreground: 'red' }]
  }
};

function getTopics() {
  var topics = {};
  Object.keys(dataSets).forEach(function (set) {
    topics['when using ' + set + ' data set'] = {
      topic: ansiparse(dataSets[set].input),
      'should return correct output': function (result) {
        console.log('\n  Input: ' + dataSets[set].input);
        assert.isArray(result);
        assert.deepEqual(result, dataSets[set].output);
      }
    };
  });
  return topics;
}

vows.describe('ansiparse').addBatch({
  'When using ansiparse': getTopics()
}).export(module);

