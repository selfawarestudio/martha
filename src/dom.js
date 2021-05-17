/**
 * A helper function that passes the provided value to the provided function.
 * If an array is provided, the function will be fired for each item in the
 * array.
 *
 * @param  {*}          x a value or array of values
 * @param  {function}   fn the function to call
 * @return {null}
 */
let call = (xs, fn) => [].concat(xs).map((x) => fn(x))

/**
 * A factory function that creates an event listener util
 *
 * @param  {string}     action 'add' or 'remove'
 * @return {function}
 */
let events = (action) => (x, e, fn) =>
  call(x, (x) => x[`${action}EventListener`](e, fn))

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
export let on = (x, ev, cb) => {
  events('add')(x, ev, cb)
  return () => events('remove')(x, ev, cb)
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
 * Get the index of the provided element amongst it's siblings
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
