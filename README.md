# martha

🍑 A tiny collection of convenient JavaScript utilities.

## Features

- 🔬 Tiny (<850b gzipped)
- 🚕 Convenient
- 🌲 Tree-shakeable

## Installation

```sh
npm i martha
```

## Usage

```js
import { qs, on } from 'martha'

let off

function mount() {
  let button = qs('button')

  // add click handler on button
  off = on(button, 'click', () => {
    console.log('click!')
  })
}

function unmount() {
  // remove click handler from button
  off()
}
```

## Functions

### `off = on(el|els, event, fn)`

Add event listener(s) to element or an array of elements. Returns a function to remove the listener(s)

### `once(el|els, event, fn)`

Add event listener(s) to element or array of elements and fire once

### `add(el|els, cx)`

Add provided class(es) to element or array of elements. Multiple classnames should be separated by a space within the string.

### `remove(el|els, cx)`

Remove provided class(es) from element or array of elements. Multiple classnames should be separated by a space within the string.

### `toggle(el|els, cx)`

Toggle provided class(es) from element or array of elements. Multiple classnames should be separated by a space within the string.

### `has(el|els, cn)`

Check if element or array of elements contain the provided classname. Returns a boolean.

### `{ ww, wh, dpr } = size()`

Returns an object containing window width (`ww`) and height (`wh`) as well as pixel density (`dpr`)

### `index(element)`

Returns the index of the provided element amongst it's siblings

### `rect(element)`

Returns the ClientRect of the provided element

### `qs(selector, [container = document])`

Alias for querySelector

### `qsa(selector, [container = document])`

Array-returning alias for querySelectorAll

### `noop()`

Just a noop :-)

### `clamp(value, min, max)`

Clamp a value between two bounds

### `diagonal(width, height)`

Diagonal of a rectangle

### `distance(x1, y1, x2, y2)`

Distance between two points

### `lerp(currentValue, targetValue, progress)`

Linear interpolation

### `map(value, start1, stop1, start2, stop2)`

Maps a value to a new range

### `norm(value, min, max)`

Normalize a value between two bounds

### `round(value, precision)`

Rounds a value to the given precision

### `wrap(index, length)`

Wrap an index around the given length using the modulo operator
