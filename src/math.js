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
 * Wrap an index around the given length using the modulo operator
 *
 * e.g. wrap(1, 3) // 1
 *      wrap(3, 3) // 0
 *      wrap(-1, 3) // 2
 *
 * @param  {number} index  Index
 * @param  {number} length Length
 * @return {number}        Looped index
 */
export let wrap = (index, length) =>
  index < 0
    ? (index = length + (index % length))
    : index >= length
    ? index % length
    : index
