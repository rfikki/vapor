var h = require('virtual-dom/virtual-hyperscript')
var action = require('value-event/event')
var changeEvent = require('value-event/change')
var extend = require('xtend')

var IdentityManagement = require('../identity-management/list/index.js')


module.exports = render


function render(state) {
  return h('div', [
    labeledIdentity('from:', state.currentIdentity),
    labeledInput('to:', state.to, state.channels.setTo),
    labeledInput('amount:', state.amount, state.channels.setAmount),
  ])
}

// components

function section(type, content) {
  return h('div', content)
}

function labeledIdentity(label, identity) {
  return h('div', [
    simpleLabel(label),
    h('pre', identity ? identity.address : '<no identity selected>'),
  ])
}

function labeledInput(label, value, sink) {
  return h('div', [
    simpleLabel(label),
    inputBox(value, sink),
  ])
}

function simpleLabel(label) {
  return h('span', label)
}

function inputBox(value, sink) {
  return h('input', {
    type: 'text',
    name: 'value',
    value: String(value),
    'ev-event': changeEvent(sink),
  })
}

// util

function stateExtend() {
  var newState = extend.apply(null, arguments)
  var channelArguments = [].slice.apply(arguments)
    .map(function(item){ return item.channels })
    .filter(function(item){ return !!item })
  newState.channels = extend.apply(null, channelArguments)
  return newState
}

