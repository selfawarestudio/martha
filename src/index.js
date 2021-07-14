/**
 * A helper function that passes the provided value to the provided function.
 * If an array is provided, the function will be fired for each item in the
 * array.
 *
 * @param  {*}          x a value or array of values
 * @param  {function}   fn the function to call
 * @return {null}
 */
let call = (xs, fn) => [].concat(xs).map(fn)

/**
 * A factory function that creates an event listener util
 *
 * @param  {string}     action 'add' or 'remove'
 * @return {function}
 */
let events = (action) => (xs, e, fn) =>
  call(xs, (x) => x[`${action}EventListener`](e, fn))

/**
 * A factory function that creates a classList util
 *
 * @param  {string}    action 'add', 'remove', 'toggle', or 'contains'
 * @return {function}
 */
let classes =
  (action) =>
  (x, ...cn) =>
    call(x, (x) => x.classList[action](...cn))

/**
 * Add an event listener to one element or an array of elements.
 * Conveniently returns unsubscribe function.
 *
 * @param  {*}           x an element or an array of elements
 * @param  {string}      ev event type
 * @param  {function}    cb callback function
 * @return {function}
 */
export let on = (x, ev, fn) => {
  events('add')(x, ev, fn)
  return () => events('remove')(x, ev, fn)
}

/**
 * Add an event listener and fire only once before unsubscribing.
 *
 * @param  {string}     action 'add' or 'remove' + 'EventListener'
 * @return {void}
 */
export let once = (x, e, fn) => {
  let f = (ev) => {
    events('remove')(x, e, f)
    fn(ev)
  }

  events('add')(x, e, f)
}

/**
 * classList shorthand for adding classes to elements
 *
 * @param  {string}     x an element or an array of elements
 * @param  {string}     cn classname
 * @return {void}
 */
export let add = (x, cns) => classes('add')(x, ...cns.split(' '))

/**
 * classList shorthand for removing classes from elements
 *
 * @param  {string}     x an element or an array of elements
 * @param  {string}     cn classname
 * @return {void}
 */
export let remove = (x, cns) => classes('remove')(x, ...cns.split(' '))

/**
 * classList shorthand for toggling classes on elements
 *
 * @param  {string}     x an element or an array of elements
 * @param  {string}     cn classname
 * @return {void}
 */
export let toggle = (x, cns) => classes('toggle')(x, ...cns.split(' '))

/**
 * classList shorthand for checking if elements contain a given classname
 *
 * @param  {string}     x an element or an array of elements
 * @param  {string}     cn classname
 * @return {boolean}
 */
export let has = (x, cn) => classes('contains')(x, cn).every((v) => v)

/**
 * Get dimensions and pixel density of viewport
 *
 * @return {object}
 */
export let size = () => {
  let d = window.document.documentElement
  return {
    ww: d.clientWidth,
    wh: d.clientHeight,
    dpr: window.devicePixelRatio,
  }
}

/**
 * Get the index of the provided element amongst it's siblings
 *
 * @param {HTMLElement}
 * @return {number}
 */
export let index = (el) => Array.from(el.parentNode.children).indexOf(el)

/**
 * Get the ClientRect of the provided element
 *
 * @param {HTMLElement}
 * @return {DOMRect}
 */
export let rect = (el) =>
  el && typeof el.getBoundingClientRect === 'function'
    ? el.getBoundingClientRect()
    : null

/**
 * Alias for querySelector
 *
 * @param {string}         selector
 * @param {HTMLElement}    container
 * @return {HTMLElement}
 */
export let qs = (selector, container = document) =>
  container.querySelector(selector)

/**
 * Array-returning alias for querySelectorAll
 *
 * @param {string}         selector
 * @param {HTMLElement}    container
 * @return {array}
 */
export let qsa = (selector, container = document) =>
  Array.from(container.querySelectorAll(selector))

/**
 * Noop
 *
 * @return {void}
 */
export let noop = () => {}

/**
 * Clamp a value between two bounds
 *
 * @param  {number} v   Value to clamp
 * @param  {number} min Minimum boundary
 * @param  {number} max Maximum boundary
 * @return {number}     Clamped value
 */
export let clamp = (value, min = 0, max = 1) =>
  value < min ? min : value > max ? max : value

/**
 * Diagonal of a rectangle
 *
 * @param  {number} w Width
 * @param  {number} h Height
 * @return {number}   Diagonal length
 */
export let diagonal = (w, h) => Math.sqrt(w * w + h * h)

/**
 * Distance between two points
 *
 * @param  {number} x1 X coord of the first point
 * @param  {number} y1 Y coord of the first point
 * @param  {number} x2 X coord of the second point
 * @param  {number} y2 Y coord of the second point
 * @return {number}    Computed distance
 */
export let distance = (x1, y1, x2, y2) => diagonal(x1 - x2, y1 - y2)

/**
 * Linear interpolation (lerp)
 *
 * @param  {number} v0 current value
 * @param  {number} v1 target value
 * @param  {number} t  progress
 * @return {number}    Interpolated value
 */
export let lerp = (v0, v1, t) => v0 * (1 - t) + v1 * t

/**
 * Maps a value to a new range
 *
 * @param  {number} value  The incoming value to be converted
 * @param  {number} start1 Lower bound of the value's current range
 * @param  {number} stop1  Upper bound of the value's current range
 * @param  {number} start2 Lower bound of the value's target range
 * @param  {number} stop2  Upper bound of the value's target range
 * @return {number}        Remapped number
 */
export let map = (value, start1, stop1, start2, stop2) =>
  ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2

/**
 * Normalize a value between two bounds
 *
 * @param  {number} value Value to normalize
 * @param  {number} min   Minimum boundary
 * @param  {number} max   Maximum boundary
 * @return {number}       Normalized value
 */
export let norm = (value, min, max) => (value - min) / (max - min)

/**
 * Rounds a value
 *
 * @param  {number} v  Value to round
 * @param  {number} p  Precision
 * @return {number}    Rounded value
 */
export let round = (v, p = 1000) => Math.round(v * p) / p

/**
 * Wrap a value around the given start and end using the modulo operator
 *
 * @param  {number} value  Value to wrap
 * @param  {number} start  Lower limit
 * @param  {number} end    Upper limit
 * @return {number}        Wrapped value
 */
export let wrap = (value, start, end) =>
  start + ((value - start) % (end - start))
