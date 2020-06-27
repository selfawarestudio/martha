/**
 * A helper function that passes the provided value to the provided function.
 * If an array is provided, the function will be fired for each item in the
 * array.
 *
 * @param  {*}          x a value or array of values
 * @param  {function}   fn the function to call
 * @return {null}
 */
function call(x, fn) {
  if (Array.isArray(x)) {
    for (let i = 0; i < x.length; i++) fn(x[i])
  } else {
    return fn(x)
  }
}

/**
 * A factory function that creates an event listener util
 *
 * @param  {string}     action 'add' or 'remove'
 * @return {function}
 */
function events(action) {
  return (x, e, fn) => call(x, (x) => x[`${action}EventListener`](e, fn))
}

/**
 * A factory function that creates a classList util
 *
 * @param  {string}    action 'add', 'remove', 'toggle', or 'contains'
 * @return {function}
 */
function classes(action) {
  return (x, ...cn) => call(x, (x) => x.classList[action](...cn))
}

/**
 * Add an event listener to one element or an array of elements.
 * Conveniently returns unsubscribe function.
 *
 * @param  {*}           x an element or an array of elements
 * @param  {string}      ev event type
 * @param  {function}    cb callback function
 * @return {function}
 */
export function on(x, ev, cb) {
  events('add')(x, ev, cb)
  return () => events('remove')(x, ev, cb)
}

/**
 * Add an event listener and fire only once before unsubscribing.
 *
 * @param  {string}     action 'add' or 'remove' + 'EventListener'
 * @return {void}
 */
export function once(x, e, fn) {
  events('add')(x, e, function f(ev) {
    events('remove')(x, e, f)
    fn(ev)
  })
}

/**
 * classList shorthand for adding classes to elements
 *
 * @param  {string}     x an element or an array of elements
 * @param  {string}     cn classname
 * @return {void}
 */
export function add(x, ...cn) {
  classes('add')(x, ...cn)
}

/**
 * classList shorthand for removing classes from elements
 *
 * @param  {string}     x an element or an array of elements
 * @param  {string}     cn classname
 * @return {void}
 */
export function remove(x, ...cn) {
  classes('remove')(x, ...cn)
}

/**
 * classList shorthand for toggling classes on elements
 *
 * @param  {string}     x an element or an array of elements
 * @param  {string}     cn classname
 * @return {void}
 */
export function toggle(x, ...cn) {
  classes('toggle')(x, ...cn)
}

/**
 * classList shorthand for checking if an element contains a classname
 *
 * @param  {string}     x element
 * @param  {string}     cn classname
 * @return {boolean}
 */
export function has(x, cn) {
  return x.classList.contains(cn)
}

/**
 * Get dimensions and pixel density of viewport
 *
 * @return {object}
 */
export function size() {
  return {
    ww: window.innerWidth,
    wh: window.innerHeight,
    dpr: window.devicePixelRatio,
  }
}

/**
 * Get the index of the provided element amongst it's siblings
 *
 * @param {HTMLElement}
 * @return {number}
 */
export function index(el) {
  return Array.from(el.parentNode.children).indexOf(el)
}

/**
 * Get the index of the provided element amongst it's siblings
 *
 * @param {HTMLElement}
 * @return {DOMRect}
 */
export function rect(el) {
  return el.getBoundingClientRect()
}

/**
 * Alias for querySelector
 *
 * @param {string}         selector
 * @param {HTMLElement}    container
 * @return {HTMLElement}
 */
export function qs(selector, container = document) {
  return container.querySelector(selector)
}

/**
 * Array-returning alias for querySelectorAll
 *
 * @param {string}         selector
 * @param {HTMLElement}    container
 * @return {array}
 */
export function qsa(selector, container = document) {
  return [].slice.call(container.querySelectorAll(selector))
}
