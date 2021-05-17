# martha

🥪 A tiny collection of convenient JavaScript utilities.

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

let offClick

function mount() {
  let button = qs('button')

  // add click handler on button
  offClick = onClick(button, () => {
    console.log('click!')
  })
}

function unmount() {
  // remove click handler from button
  offClick()
}
```

## Functions

### `off = on(element(s), event, fn)`

Add event listener(s) to element or an array of elements. Returns a function to remove the listener(s)

### `once(element(s), event, fn)`

Add event listener(s) to element or array of elements and fire once

### `add(element(s), cx)`

Add provided class(es) to element or array of elements. Multiple classnames should be separated by a space within the string.

### `remove(element(s), cx)`

Remove provided class(es) from element or array of elements. Multiple classnames should be separated by a space within the string.

### `toggle(element(s), cx)`

Toggle provided class(es) from element or array of elements. Multiple classnames should be separated by a space within the string.

### `Boolean = has(element(s), cn)`

Check if element or array of elements contain the provided classname. Returns a boolean.

### `{ ww, wh, dpr } = size()`

Returns an object containing window width (`ww`) and height (`wh`) as well as pixel density (`dpr`)

### `Number = index(element)`

Get the index of the provided element amongst it's siblings

### `ClientRect = rect(element)`

Get the ClientRect of the provided element

### `el = qs(selector, [container = document])`

Alias for querySelector

### `els = qsa(selector, [container = document])`

Array-returning alias for querySelectorAll
