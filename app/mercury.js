var extend = require('xtend')
var Value = require('observ')
var Struct = require('observ-struct')
var Delegator = require('dom-delegator')
var MainLoop = require('main-loop')
var diff = require('virtual-dom/vtree/diff')
var create = require('virtual-dom/vdom/create-element')
var patch = require('virtual-dom/vdom/patch')
var h = require('virtual-dom/virtual-hyperscript')
var raf = require('raf')
var Source = require('geval')

var mercury = module.exports = {
  // Entry
  App: App,
  // Component
  Component: Component,
  // State
  stateExtend: stateExtend,
  // Events
  rafListen: rafListen,
  // Routing
  Router: Router,
  anchor: anchor,
}


//
// Mercury, kumavis style
//

function Component(definition, render) {
  var componentClass = function(state) {
    return setupComponent(definition, state)
  }
  componentClass.render = render
  return componentClass
}

// Takes a component definition, and a pojo state
function setupComponent(definition, state) {
  state = state || {}
  // copy definition
  definition = extend(definition)
  // extract channels
  var channels = definition.channels || {}
  delete definition.channels
  // build component
  var componentBase = { channels: Value(null) }
  for (key in definition) {
    var type = definition[key].type
    // use provided value or default
    var value = (state[key] !== undefined) ? state[key] : definition[key].default
    componentBase[key] = type(value)
  }
  var component = Struct(componentBase)
  // activate channels
  component.channels.set(setupChannels(channels, component))
  // component is ready
  return component
}

function setupChannels(funcs, context) {
  return Object.keys(funcs).reduce(createHandle, {})

  function createHandle(acc, name) {
    var handle = Delegator.allocateHandle(funcs[name].bind(null, context))
    acc[name] = handle
    return acc
  }
}

// intelligently merges pojo states and channels
function stateExtend() {
  var newState = extend.apply(null, arguments)
  var channelArguments = [].slice.apply(arguments)
    .map(function(item){ return item.channels })
    .filter(function(item){ return !!item })
  newState.channels = extend.apply(null, channelArguments)
  return newState
}

//
// Classic Mercury, not-so-lightly modified
//

function App(elem, observ, render, opts) {
  Delegator(opts)
  var loop = MainLoop(observ(), render, extend({
      diff: diff,
      create: create,
      patch: patch
  }, opts))
  if (elem) {
      elem.appendChild(loop.target)
  }
  // activate URL routing and update on change
  Router(function(){ loop.update(observ()) })
  // return component
  return observ(loop.update)
}

function rafListen(observ, fn) {
  var sending = false
  var currValue

  return observ(onvalue)

  function onvalue(value) {
    currValue = value
    if (sending) {
        return
    }

    sending = true
    raf(send)
  }

  function send() {
    var oldValue = currValue
    fn(currValue)
    sending = false

    if (oldValue !== currValue) {
        sending = true
        raf(send)
    }
  }
}

// Router from https://github.com/twilson63/mercury-router/blob/master/lib/router.js
// modified gently
var currentRoute = Router.currentRoute = Value(getCurrentPath())

function Router(update) {
  var inPopState = false
  var popstates = popstate()

  popstates(onPopState)
  currentRoute(onRouteSet)
  currentRoute(update)

  return currentRoute

  function onPopState(uri) {
    inPopState = true
    currentRoute.set(uri)
  }

  function onRouteSet(uri) {
    if (inPopState) {
      inPopState = false
      return
    }

    pushHistoryState('#'+uri)
  }
}

function anchor(props, content) {
  props = extend(props)
  // add hash to target
  var target = props.href
  props.href = '#'+props.href

  props['ev-click'] = function(event){
    event.preventDefault()
    pushState()
  }

  return h('a', props, content)

  function pushState() {
    routeAtom.set(target)
  }
}

function pushHistoryState(uri) {
  window.history.pushState(undefined, document.title, uri)
}

function popstate() {
  return Source(function broadcaster(broadcast) {
    window.addEventListener('popstate', onPopState)

    function onPopState() {
      broadcast(getCurrentPath())
    }
  })
}

function getCurrentPath() {
  return document.location.hash.slice(1)
}