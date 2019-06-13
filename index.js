'use strict'

const hasObj = (arr) => arr.reduce(
  (acc, cur) => acc || (typeof cur === 'object'),
  false)

module.exports =
// This makes it possible to index arrays in elasticsearch.
function objectify (input, key = '') {
  // Leave arrays of non-objects alone
  if (Array.isArray(input) && !hasObj(input)) {
    return input.map(v => objectify(v))
  }
  // Convert arrays w/ objects into an elasticsearch friendly format
  if (Array.isArray(input)) {
    if (key.length > 0) {
      // Add seperator, otherwise nested arrays are ambigious
      // (foo10 vs foo_1_0)
      key += '_'
    }
    return input.reduce((acc, cur, idx) => {
      // Also objectify the element in the array
      acc[`${key}${idx}`] = objectify(cur, `${key}${idx}`)
      return acc
    }, {})
  }
  // If this is an object, objectify every value stored on it
  if (typeof input === 'object') {
    // First, get each key on the object
    return Object.keys(input)
      // Then objectify each value on the object and keep track of it's key
      .map((v) => {
        return {
          key: v,
          value: objectify(input[v], v)
        }
      })
      // Create a new object with the same keys and the objectifyed values
      .reduce((acc, cur) => {
        acc[`${cur.key}`] = cur.value
        return acc
      }, {})
  }
  // If this isn't an array or an object, nothing to do!
  return input
}
