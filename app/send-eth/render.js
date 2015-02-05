var h = require('virtual-dom/virtual-hyperscript')
var action = require('value-event/event')
var changeEvent = require('value-event/change')
var extend = require('xtend')

var IdentityManagement = require('../identity-management/index.js')


module.exports = render


function render(state) {
  return h('div', [
    h('h3', 'Send Ether'),
    h('div.row', [
      col(null, labeledIdentity('from:', state.currentIdentity)),
      col(null, labeledInput('to:', state.to, state.channels.setTo)),
      col(null, labeledInput('amount:', state.amount, state.channels.setAmount)),
    ]),
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
    h('br'),
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

function col(width, content) {
  var className = '.col-xs' + (width ? '-'+width : '')
  return h('div'+className, content)
}