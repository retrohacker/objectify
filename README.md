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
  'foo': [
    { 'a': 1 },
    { 'b': 2 }]
  }
)
```

yields

```js
{
  'foo': {
    'foo_0': { 'a': 1 },
    'foo_1': { 'b': 2 }
  }
}
```

and

```js
{
  'foo': [1, 2, 3],
  'bar': ['a', 'b', 'c']
}
```

yields

```js
{
  'foo': [1, 2, 3],
  'bar': ['a', 'b', 'c']
}
```
