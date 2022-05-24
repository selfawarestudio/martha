import { suite, test } from 'uvu'
import * as assert from 'uvu/assert'
import { JSDOM } from 'jsdom'
import sinon from 'sinon'
import * as m from '../'

let on = suite('on')

on.before(() => {
  let dom = new JSDOM(`
    <button></button>
    <button></button>
    <button></button>
  `)

  global.window = dom.window
  global.document = dom.window.document
})

on.after.each(() => {
  sinon.restore()
})

on('should add an event listener to a single element', () => {
  let btn = m.qs('button')
  let spy = sinon.spy()

  m.on(btn, 'click', spy)
  btn.dispatchEvent(new window.Event('click'))

  assert.ok(spy.called)
})

on('should add an event listener to an array of elements', () => {
  let btns = m.qsa('button')
  let spy = sinon.spy()

  m.on(btns, 'click', spy)
  btns.forEach(btn => btn.dispatchEvent(new window.Event('click')))

  assert.equal(spy.callCount, 3)
})

on('should return a function to remove the added event listener', () => {
  let btn = m.qs('button')
  let spy = sinon.spy()

  let off = m.on(btn, 'click', spy)
  let click = () => btn.dispatchEvent(new window.Event('click'))

  click()
  off()
  click()

  assert.equal(spy.callCount, 1)
})

on.run()

let once = suite('once')

once.before(() => {
  let dom = new JSDOM(`<button></button>`)

  global.window = dom.window
  global.document = dom.window.document
})

once.after.each(() => {
  sinon.restore()
})

once('should fire the event only once', () => {
  let btn = m.qs('button')
  let spy = sinon.spy()

  m.once(btn, 'click', spy)
  let click = () => btn.dispatchEvent(new window.Event('click'))

  click()
  click()

  assert.equal(spy.callCount, 1)
})

once.run()

let add = suite('add')

add.before(() => {
  let dom = new JSDOM(`
    <div></div>
    <div></div>
    <div></div>
  `)

  global.window = dom.window
  global.document = dom.window.document
})

add.before.each(() => {
  m.each(m.qsa('div'), el => el.removeAttribute('class'))
})

add('should add the class to the element', () => {
  let el = m.qs('div')

  m.add(el, 'foo')

  assert.equal(el.className, 'foo')
})

add('should add multiple classes to the element', () => {
  let el = m.qs('div')

  m.add(el, 'bar baz')

  assert.equal(el.className, 'bar baz')
})

add('should add the class to each element in an array', () => {
  let els = m.qsa('div')

  m.add(els, 'foo')

  m.each(els, el => assert.equal(el.className, 'foo'))
})

add('should add multiple classes to each element in an array', () => {
  let els = m.qsa('div')

  m.add(els, 'bar baz')

  m.each(els, el => assert.equal(el.className, 'bar baz'))
})

add.run()

let remove = suite('remove')

remove.before(() => {
  let dom = new JSDOM(`
    <div class="foo bar baz"></div>
    <div class="foo bar baz"></div>
    <div class="foo bar baz"></div>
  `)

  global.window = dom.window
  global.document = dom.window.document
})

remove.before.each(() => {
  m.each(m.qsa('div'), el => (el.className = 'foo bar baz'))
})

remove('should remove the class from the element', () => {
  let el = m.qs('div')

  m.remove(el, 'foo')

  assert.equal(el.className, 'bar baz')
})

remove('should remove multiple classes from the element', () => {
  let el = m.qs('div')

  m.remove(el, 'bar baz')

  assert.equal(el.className, 'foo')
})

remove('should remove the class from each element in an array', () => {
  let els = m.qsa('div')

  m.remove(els, 'foo')

  m.each(els, el => assert.equal(el.className, 'bar baz'))
})

remove('should remove multiple classes from each element in an array', () => {
  let els = m.qsa('div')

  m.remove(els, 'bar baz')

  m.each(els, el => assert.equal(el.className, 'foo'))
})

remove.run()

let toggle = suite('toggle')

toggle.before(() => {
  let dom = new JSDOM(`
    <div class="foo bar baz"></div>
    <div class="foo bar baz"></div>
    <div class="foo bar baz"></div>
  `)

  global.window = dom.window
  global.document = dom.window.document
})

toggle.before.each(() => {
  m.each(m.qsa('div'), el => (el.className = 'foo bar baz'))
})

toggle('should toggle the provided class on an element', () => {
  let el = m.qs('div')

  m.toggle(el, 'bar')
  m.toggle(el, 'qux')

  assert.equal(el.className, 'foo baz qux')
})

toggle('should toggle the provided class on an array of elements', () => {
  let els = m.qsa('div')

  m.toggle(els, 'bar')
  m.toggle(els, 'qux')

  m.each(els, el => assert.equal(el.className, 'foo baz qux'))
})

toggle('should behave like classList.add when force param is truthy', () => {
  let el = m.qs('div')

  m.toggle(el, 'bar', true)
  m.toggle(el, 'qux', true)

  assert.equal(el.className, 'foo bar baz qux')
})

toggle('should behave like classList.remove when force param is falsy', () => {
  let el = m.qs('div')

  m.toggle(el, 'bar', false)
  m.toggle(el, 'qux', false)

  assert.equal(el.className, 'foo baz')
})

toggle.run()

let has = suite('has')

has('should return true if the element has the class', () => {
  let { window } = new JSDOM(`<div class="foo"></div>`)
  let el = m.qs('div', window.document)

  assert.ok(m.has(el, 'foo'))
})

has('should return false if the element does not have the class', () => {
  let { window } = new JSDOM(`<div class="bar"></div>`)
  let el = m.qs('div', window.document)

  assert.not.ok(m.has(el, 'foo'))
})

has('should return true if every element in the array has the class', () => {
  let { window } = new JSDOM(`
    <div class="foo"></div>
    <div class="foo"></div>
    <div class="foo"></div>
  `)

  let els = m.qsa('div', window.document)

  assert.ok(m.has(els, 'foo'))
})

has(
  'should return false if not all elements in the array have the class',
  () => {
    let { window } = new JSDOM(`
    <div class="foo"></div>
    <div></div>
    <div class="foo"></div>
  `)

    let els = m.qsa('div', window.document)

    assert.not.ok(m.has(els, 'foo'))
  },
)

has.run()

let attr = suite('attr')

attr.before(() => {
  let dom = new JSDOM(`<div></div>`)

  global.window = dom.window
  global.document = dom.window.document
})

attr('should set attributes when a value is provided as third arg', () => {
  let div = m.qs('div')

  m.attr(div, 'foo', 'bar')

  assert.equal(div.getAttribute('foo'), 'bar')
})

attr('should get attribute value when third arg is undefined', () => {
  let div = m.qs('div')

  assert.equal(m.attr(div, 'foo'), 'bar')
})

attr('should remove attribute when third arg is null', () => {
  let div = m.qs('div')

  m.attr(div, 'foo', null)

  assert.not.ok(div.hasAttribute('foo'))
})

attr.run()

let prop = suite('prop')

prop.before(() => {
  let dom = new JSDOM(`<div></div>`)

  global.window = dom.window
  global.document = dom.window.document
})

prop('should set property when a value is provided as third arg', () => {
  let div = m.qs('div')

  m.prop(div as HTMLElement, '--foo', 'bar')

  assert.equal((div as HTMLElement).style.getPropertyValue('--foo'), 'bar')
})

prop('should get property value when third arg is undefined', () => {
  let div = m.qs('div')

  assert.equal(m.prop(div as HTMLElement, '--foo'), 'bar')
})

prop.run()

let each = suite('each')

each('should iterate over each item in the array', () => {
  let array = ['foo', 'bar', 'baz']
  let spy = sinon.spy()

  m.each(array, spy)

  assert.equal(spy.args[0], ['foo', 0])
  assert.equal(spy.args[1], ['bar', 1])
  assert.equal(spy.args[2], ['baz', 2])
})

each.run()

let size = suite('size')

size(
  'should return object containing viewport dimensions and pixel density',
  () => {
    let { window } = new JSDOM('<main></main>')
    global.window = window

    let output = m.size()

    assert.equal(output, { ww: 1024, wh: 768, dpr: 1 })
  },
)

size.run()

let index = suite('index')

index('should return index of provided element amongst siblings', () => {
  let { window } = new JSDOM(`
    <div>
      <div></div>
      <span></span>
      <div></div>
    </div>
  `)

  let el = m.qs('span', window.document)
  let orphan = window.document.createElement('div')

  assert.equal(m.index(el), 1)
  assert.equal(m.index(orphan), -1)
})

index.run()

let rect = suite('rect')

rect('should return DOMRect for provided element', () => {
  let { window } = new JSDOM('<canvas></canvas>')
  let el = m.qs('canvas', window.document)

  assert.equal(m.rect(el), {
    x: 0,
    y: 0,
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  })
})

rect.run()

let selectors = suite('qs, qsa')

selectors('should select dom elements within the provided parent', () => {
  let dom = new JSDOM(`
    <body>
      <header></header>
      <main>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </main>
    </body>
  `)

  global.document = dom.window.document

  let main = m.qs('main')

  assert.equal(main.constructor.name, 'HTMLElement')
  assert.equal(m.qs('header', main), null)

  let items = m.qsa('li', main)

  assert.equal(items.length, 3)
  assert.ok(items.every(item => item.constructor.name === 'HTMLLIElement'))
})

selectors.run()

let noop = suite('noop')

noop('should do nothing', () => {
  assert.equal(m.noop(), undefined)
})

noop.run()

let clamp = suite('clamp')

clamp('should clamp a value between provided boundaries', () => {
  assert.equal(m.clamp(0.5, 0, 1), 0.5)
  assert.equal(m.clamp(-1, 0, 1), 0)
  assert.equal(m.clamp(2, 0, 1), 1)
  assert.equal(m.clamp(0, 0, 1), 0)
  assert.equal(m.clamp(1, 0, 1), 1)
})

clamp.run()

let diagonal = suite('diagonal')

diagonal('should get the diagonal of a rectangle', () => {
  assert.equal(m.diagonal(3, 4), 5)
})

diagonal.run()

let distance = suite('distance')

distance('should get the distance between 2 points', () => {
  assert.equal(m.distance(0, 0, 3, 4), 5)
})

distance.run()

let lerp = suite('lerp')

lerp(
  'should linearly interpolate the first 2 arguments based on the value of the 3rd argument',
  () => {
    assert.equal(m.lerp(0, 1, 0.5), 0.5)
    assert.equal(m.lerp(0, 4, 0.25), 1)
    assert.equal(m.lerp(3, 18, 1 / 3), 8)
    assert.equal(m.lerp(3, 18, 2 / 3), 13)
  },
)

lerp.run()

let map = suite('map')

map('should map the provided value from one range to another', () => {
  assert.equal(m.map(5, 0, 10, 0, 2), 1)
  assert.equal(m.map(32, 0, 100, 0, 50), 16)
})

map.run()

let norm = suite('norm')

norm('normalize a value between 0 and 1', () => {
  assert.equal(m.norm(5, 0, 10), 0.5)
  assert.equal(m.norm(26, 0, 10), 2.6)
  assert.equal(m.norm(32, 0, 100), 0.32)
  assert.equal(m.norm(120, 0, 100), 1.2)
})

norm.run()

let round = suite('round')

round('round provided value to the given decimal place', () => {
  assert.equal(m.round(3.17823, 0), 3)
  assert.equal(m.round(3.17823, 1), 3.2)
  assert.equal(m.round(3.17823, 2), 3.18)
  assert.equal(m.round(3.17823, 3), 3.178)
  assert.equal(m.round(3.17823, 4), 3.1782)
})

round.run()

let wrap = suite('wrap')

wrap('wrap provided index around a given length', () => {
  assert.equal(m.wrap(1, 3), 1)
  assert.equal(m.wrap(3, 3), 0)
  assert.equal(m.wrap(-1, 3), 2)
})

wrap.run()
