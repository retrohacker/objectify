# objectify

A little library that recursively converts an object with arrays to an object
with objects.

## Install

```sh
yarn add @retrohacker/objectify
```

## Usage

```js
objectify({
  'foo': [1, 2, 3],
  'bar': ['a', 'b', 'c']
})
```

Yields

```js  
{
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
}
```

```js
objectify([
  [1],
  [2]
])
```

Yields

```js
{
  '0': {
    '0_0': 1
  },
  '1': {
    '1_0': 2
  }
}
```
