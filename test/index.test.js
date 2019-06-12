'use strict'

const test = require('ava')
const objectify = require('../index')

test('should convert array to object', t => {
  const obj = [1, 2, 3]
  t.deepEqual(objectify(obj), {
    '0': 1,
    '1': 2,
    '2': 3
  })
})

test('should leave non-arrays alone', t => {
  const obj = { 'foo': 1, 'bar': 2 }
  t.deepEqual(objectify(obj), obj)
  t.deepEqual(objectify(true), true)
  t.deepEqual(objectify(false), false)
  t.deepEqual(objectify(0), 0)
  t.deepEqual(objectify(1), 1)
  t.deepEqual(objectify('hello'), 'hello')
})

test('should convert objects with arrays', t => {
  const obj = {
    'foo': [1, 2, 3],
    'bar': ['a', 'b', 'c']
  }
  t.deepEqual(objectify(obj), {
    'foo': {
      'foo_0': 1,
      'foo_1': 2,
      'foo_2': 3
    },
    'bar': {
      'bar_0': 'a',
      'bar_1': 'b',
      'bar_2': 'c'
    }
  })
})

test('should convert array of arrays', t => {
  t.deepEqual(objectify([[1], [2]]), {
    '0': {
      '0_0': 1
    },
    '1': {
      '1_0': 2
    }
  })
})
