# martha

🍑 A tiny collection of convenient JavaScript utilities.

## Features

- 🔬 Tiny (<1kb gzipped)
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

`off = on(el|els, event, callback)`

Add event listener(s) to element or an array of elements. Returns a function to remove the listener(s)

`once(el|els, event, callback)`

Add event listener(s) to element or array of elements and fire once

`add(el|els, cx)`

Add provided class(es) to element or array of elements. Multiple classnames should be separated by a space within the string.

`remove(el|els, cx)`

Remove provided class(es) from element or array of elements. Multiple classnames should be separated by a space within the string.

`toggle(el|els, cx)`

Toggle provided class from element or array of elements. 

`has(el|els, cn)`

Check if element or array of elements contain the provided classname. Returns a boolean.

`attr(el, name[, value])`

Get attribute by passing el and attribute name. With a 3rd argument, set and remove attributes (falsy values remove, true boolean sets to empty string). Always returns the attribute value being retrieved, set, or removed.

`prop(el, name[, value])`

Get custom property value by passing el and property name. With a 3rd argument, you can set properties. Always returns the property value being retrieved or set.

`each(array, callback)`

Iterate over each item in an array like `forEach`

`{ ww, wh, dpr } = size()`

Returns an object containing viewport width (`ww`) and height (`wh`) and pixel density (`dpr`)

`index(el)`

Returns the index of the provided element amongst it's siblings

`rect(el)`

Returns the DOMRect of the provided element

`qs(selector, [container = document])`

Alias for querySelector

`qsa(selector, [container = document])`

Array-returning alias for querySelectorAll

`noop()`

Just a noop :-)

`clamp(value, min, max)`

Clamp a value between two bounds

`diagonal(width, height)`

Diagonal of a rectangle

`distance(x1, y1, x2, y2)`

Distance between two points

`lerp(currentValue, targetValue, progress)`

Linear interpolation

`map(value, start1, stop1, start2, stop2)`

Maps a value to a new range

`norm(value, min, max)`

Normalize a value between two bounds

`round(value, precision)`

Rounds a value to the given precision

`wrap(index, length)`

Wrap a number around the given length using the modulo operator