var SingleEvent = require('geval/single')
var MultipleEvent = require('geval/multiple')
var extend = require('xtend')
var Value = require('observ')
var struct = require('observ-struct')
var Delegator = require('dom-delegator')
var main = require('main-loop')
var diff = require('virtual-dom/vtree/diff')
var create = require('virtual-dom/vdom/create-element')
var patch = require('virtual-dom/vdom/patch')
var raf = require('raf')

var mercury = module.exports = {
    // Entry
    app: app,
    // Input
    channels: channels,
    // State
    state: state,
    stateExtend: stateExtend,
    setupComponent: setupComponent,
    Component: Component,
    // Raf
    rafListen: rafListen,
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
  var component = struct(componentBase)
  // activate channels
  component.channels.set(setupChannels(channels, component))
  // component is ready
  return component
}

function setupChannels(funcs, context) {
  return Object.keys(funcs).reduce(createHandle, {});

  function createHandle(acc, name) {
    var handle = Delegator.allocateHandle(funcs[name].bind(null, context))
    acc[name] = handle;
    return acc;
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
// Original Mercury
//

function input(names) {
    if (!names) {
        return SingleEvent();
    }

    return MultipleEvent(names);
}

// creates a fancy state obj from a pojo
// hooks up channels
function state(obj) {
    var copy = extend(obj);
    var $channels = copy.channels;
    var $handles = copy.handles;

    if ($channels) {
        copy.channels = Value(null);
    } else if ($handles) {
        copy.handles = Value(null);
    }

    var observ = struct(copy);
    if ($channels) {
        observ.channels.set(channels($channels, observ));
    } else if ($handles) {
        observ.handles.set(channels($handles, observ));
    }
    return observ;
}

function channels(funcs, context) {
    return Object.keys(funcs).reduce(createHandle, {});

    function createHandle(acc, name) {
        var handle = Delegator.allocateHandle(
            funcs[name].bind(null, context));

        acc[name] = handle;
        return acc;
    }
}

function app(elem, observ, render, opts) {
    Delegator(opts);
    var loop = main(observ(), render, extend({
        diff: diff,
        create: create,
        patch: patch
    }, opts));
    if (elem) {
        elem.appendChild(loop.target);
    }
    return observ(loop.update);
}


function rafListen(observ, fn) {
    var sending = false;
    var currValue;

    return observ(onvalue);

    function onvalue(value) {
        currValue = value;
        if (sending) {
            return;
        }

        sending = true;
        raf(send);
    }

    function send() {
        var oldValue = currValue;
        fn(currValue);
        sending = false;

        if (oldValue !== currValue) {
            sending = true;
            raf(send);
        }
    }
}