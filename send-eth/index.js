var extend = require('xtend')
var val = require('observ')
var array = require('observ-array')
var setupComponent = require('../mercury.js').state
var render = require('./render.js')
var IdentityManagement = require('../identity-management/list/index.js')
var Identity = require('../identity-management/identity/index.js')

module.exports = Wallet


Wallet.render = render

function Wallet() {

  var defaultState = {
    to: val(''),
    amount: val(0),

    channels: {
      setTo: setTo,
      setAmount: setAmount,
    },
  }

  var copy = extend(defaultState)
  var state = setupComponent(copy)
  return state

}

function setTo(state, data) {
  state.to.set(data.value)
}

function setAmount(state, data) {
  state.amount.set(data.value)
}