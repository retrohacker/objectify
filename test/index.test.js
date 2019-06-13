'use strict'

const test = require('ava')
const objectify = require('../index')

test('should leave array of non-objects alone', t => {
  const obj = [1, 2, 3]
  t.deepEqual(objectify(obj), obj)
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

test('should leave objects with arrays of non-objects alone', t => {
  const obj = {
    'foo': [1, 2, 3],
    'bar': ['a', 'b', 'c']
  }
  t.deepEqual(objectify(obj), obj)
})

test('should convert arrays of arrays of non-objects', t => {
  const obj = [[1], [2]]
  t.deepEqual(objectify(obj), {
    '0': [1],
    '1': [2]
  })
})

test('should convert arrays of objects', t => {
  const obj = [{ a: 1 }, { b: 2 }]
  t.deepEqual(objectify(obj), {
    '0': { a: 1 },
    '1': { b: 2 }
  })
})

test('should handle arrays that are nested', t => {
  const obj = { 'foo': [{ a: 1 }, { b: 2 }] }
  t.deepEqual(objectify(obj), {
    'foo': {
      'foo_0': { a: 1 },
      'foo_1': { b: 2 }
    }
  })
})
