var val = require('observ')
var extend = require('xtend')
var setupComponent = require('../../mercury.js').state
var render = require('./render.js')

module.exports = Identity


Identity.render = render

function Identity() {

  var defaultState = {
    address: val('0x1234'),
    balance: val(0),

    channels: {},
  }

  var copy = extend(defaultState)
  var state = setupComponent(copy)

  return state

}