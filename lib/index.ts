type EventMap<T extends EventTarget> = T extends MediaQueryList
  ? MediaQueryListEventMap
  : T extends Document
  ? DocumentEventMap
  : T extends Window
  ? WindowEventMap
  : HTMLElementEventMap

type EventTypes<T extends EventTarget> = keyof EventMap<T> & string

type EventValue<T extends EventTarget, K extends EventTypes<T>> = Extract<
  EventMap<T>[K],
  Event
>

let error = (msg: string): void => {
  throw new Error(`[martha] ${msg}`)
}

/**
 * @param xs A value or array of values
 * @param fn The function to call
 * @returns A new array populated with the results of calling the provided function on the value or array of values
 */
let call = <T, U>(
  xs: T | T[] | null | undefined,
  fn: (x: T, i: number) => U,
): U[] => {
  let tmp: T[] = []
  return tmp.concat(xs ?? []).map(fn)
}

/**
 * @param action 'add' or 'remove'
 * @returns An event listener utility function
 */
let events =
  (action: 'add' | 'remove') =>
  <T extends EventTarget, K extends EventTypes<T>>(
    xs: T | T[] | null | undefined,
    t: K,
    fn: (ev: EventValue<T, K>) => void,
    opts?: boolean | AddEventListenerOptions,
  ) => {
    if (!xs)
      error(`${action === 'add' ? 'on' : 'off'} target is null or undefined`)
    return call(xs, x =>
      x[`${action}EventListener`](t, fn as EventListener, opts),
    )
  }

/**
 * @param action - 'add' or 'remove'
 * @returns A classList utility function
 */
let classes =
  (
    action: 'add' | 'remove',
  ): ((
    xs: HTMLElement | HTMLElement[] | null | undefined,
    ...cn: string[]
  ) => any[]) =>
  (xs, cns) => {
    if (!xs) error(`${action} target is null or undefined`)
    return call(xs, x => x.classList[action](...cns.split(' ')))
  }

/**
 * Add an event listener to one element or an array of elements
 *
 * @param xs An element or an array of elements
 * @param t Event type
 * @param fn Event handler
 * @param opts The 3rd argument to addEventListener
 * @returns A function to remove the event listener
 */
export let on = <T extends EventTarget, K extends EventTypes<T>>(
  xs: T | T[] | null | undefined,
  t: K,
  fn: (ev: EventValue<T, K>) => void,
  opts?: boolean | AddEventListenerOptions,
) => {
  events('add')(xs, t, fn, opts)
  return () => events('remove')(xs, t, fn, opts)
}

/**
 * Add an event listener that can only fire once
 *
 * @param xs An element or an array of elements
 * @param t Event type
 * @param fn Event handler
 * @param opts The optional 3rd argument to addEventListener
 */
export let once = <T extends EventTarget, K extends EventTypes<T>>(
  xs: T | T[] | null | undefined,
  t: K,
  fn: (ev: EventValue<T, K>) => void,
  opts?: boolean | AddEventListenerOptions,
) => {
  let off = on(
    xs,
    t,
    ev => {
      off()
      fn(ev)
    },
    opts,
  )
}

/**
 * classList shorthand for adding classes to an element or array of elements
 *
 * @param xs An element or an array of elements
 * @param cn Classnames to add
 */
export let add = (
  xs: HTMLElement | HTMLElement[] | null | undefined,
  cns: string,
): void => {
  classes('add')(xs, cns)
}

/**
 * classList shorthand for removing classes from an element or array of elements
 *
 * @param xs An element or an array of elements
 * @param cn Classnames to remove
 */
export let remove = (
  xs: HTMLElement | HTMLElement[] | null | undefined,
  cns: string,
): void => {
  classes('remove')(xs, cns)
}

/**
 * classList shorthand for toggling classes on an element or array of elements
 *
 * @param x An element or an array of elements
 * @param cn Single classname to toggle
 */
export let toggle = (
  xs: HTMLElement | HTMLElement[] | null | undefined,
  cn: string,
  force?: boolean,
): void => {
  if (!xs) error(`toggle target is null or undefined`)
  call(xs, x => x.classList.toggle(cn, force))
}

/**
 * classList shorthand for checking if an element or an array of elements contain a given classname
 *
 * @param xs An element or an array of elements
 * @param cn Single classname
 * @returns True if every element contains provided classname and false if not
 */
export let has = (
  xs: HTMLElement | HTMLElement[] | null | undefined,
  cn: string,
): boolean => {
  if (!xs) error(`has target is null or undefined`)
  return call(xs, x => x.classList.contains(cn)).every(v => v)
}

/**
 * Get, set, or remove attributes from an element
 *
 * @param x An element
 * @param n Attribute name
 * @param v Optional value
 * @returns Value being get, set, or removed
 */
export function attr(x: HTMLElement, n: string): string | null

export function attr(
  x: HTMLElement,
  n: string,
  v: string | number | boolean,
): void

export function attr(x: HTMLElement, n: string, v: boolean | null): void

export function attr(...args: any[]) {
  const [x, n, v] = args
  if (args.length < 3) {
    return x.getAttribute(n)
  } else if (v) {
    x.setAttribute(n, typeof v === 'boolean' ? '' : (v as string))
  } else {
    x.removeAttribute(n)
  }
}

/**
 * Get or set custom properties
 *
 * @param x An element
 * @param n Property name
 * @param v Optional value
 * @returns Value being get or set
 */
export function prop(x: HTMLElement, n: string): string

export function prop(
  x: HTMLElement,
  n: string,
  v: string | null,
  priority?: 'important' | '',
): void

export function prop(...args: any[]) {
  const [x, n, v, priority] = args
  if (args.length < 3) {
    return x.style.getPropertyValue(n)
  } else {
    x.style.setProperty(n, v as string | null, priority)
  }
}

/**
 * Iterate over each item in an array like forEach
 *
 * @param xs Array
 * @param fn Function to call for each item in the provided array
 */
export let each = <T>(xs: T[], fn: (x: T, i: number) => void) => {
  for (let i = 0, l = xs.length; i < l; i++) {
    fn(xs[i], i)
  }
}

/**
 * @returns Object containing viewport dimensions and pixel density
 */
export let size = (): {
  ww: number
  wh: number
  dpr: number
} => {
  return {
    ww: window.innerWidth,
    wh: window.innerHeight,
    dpr: window.devicePixelRatio,
  }
}

/**
 * Get the index of the provided element amongst its siblings
 *
 * @param el A dom element with siblings
 * @returns The index of the element amongst its siblings
 */
export let index = (el: HTMLElement): number => {
  return Array.from(el.parentNode?.children ?? []).indexOf(el)
}

/**
 * Get the DOMRect of the provided element
 *
 * @param el A dom element
 * @returns The DOMRect of the element
 */
export let rect = (el: HTMLElement): DOMRect => el.getBoundingClientRect()

/**
 * Alias for querySelector
 *
 * @param selector
 * @param container
 * @returns The selected element
 */
export let qs = (
  selector: string,
  container: HTMLElement | Document = document,
) => container.querySelector(selector) as HTMLElement

/**
 * Array-returning alias for querySelectorAll
 *
 * @param selector
 * @param container
 * @returns Array of elements
 */
export let qsa = (
  selector: string,
  container: HTMLElement | Document = document,
): HTMLElement[] => Array.from(container.querySelectorAll(selector))

/**
 * Noop
 */
export let noop = () => {}

/**
 * Clamp a value between two bounds
 *
 * @param v Value to clamp
 * @param min Minimum boundary
 * @param max Maximum boundary
 * @returns Clamped value
 */
export let clamp = (value: number, min = 0, max = 1): number =>
  value < min ? min : value > max ? max : value

/**
 * Diagonal of a rectangle
 *
 * @param w Width
 * @param h Height
 * @returns Diagonal length
 */
export let diagonal = (w: number, h: number): number => Math.sqrt(w * w + h * h)

/**
 * Distance between two points
 *
 * @param x1 X coord of the first point
 * @param y1 Y coord of the first point
 * @param x2 X coord of the second point
 * @param y2 Y coord of the second point
 * @returns Computed distance
 */
export let distance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number => diagonal(x1 - x2, y1 - y2)

/**
 * Linear interpolation (lerp)
 *
 * @param v0 current value
 * @param v1 target value
 * @param t progress
 * @returns Interpolated value
 */
export let lerp = (v0: number, v1: number, t: number): number =>
  v0 * (1 - t) + v1 * t

/**
 * Maps a value to a new range
 *
 * @param value The incoming value to be converted
 * @param start1 Lower bound of the value's current range
 * @param stop1 Upper bound of the value's current range
 * @param start2 Lower bound of the value's target range
 * @param stop2 Upper bound of the value's target range
 * @returns Remapped number
 */
export let map = (
  value: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number,
): number => ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2

/**
 * Normalize a value between two bounds
 *
 * @param value Value to normalize
 * @param min Minimum boundary
 * @param max Maximum boundary
 * @returns Normalized value
 */
export let norm = (value: number, min: number, max: number): number =>
  (value - min) / (max - min)

/**
 * Rounds a value
 *
 * @param v Value to round
 * @param p Precision
 * @returns Rounded value
 */
export let round = (v: number, p = 3): number => {
  let f = 10 ** p
  return Math.round(v * f) / f
}

/**
 * Wrap a number around the given length using the modulo operator
 *
 * @param n Number
 * @param l Length
 * @returns Looped index
 */
export let wrap = (n: number, l: number): number =>
  n < 0 ? l + (n % l) : n >= l ? n % l : n
