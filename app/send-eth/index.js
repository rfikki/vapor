var Component = require('../mercury.js').Component
var Value = require('observ')
var render = require('./render.js')

module.exports = Component({

  to:       { type: Value,  default: null },
  amount:   { type: Value,  default: 0    },

  channels: {
    setTo: setTo,
    setAmount: setAmount,
  },

}, render)

function setTo(state, data) {
  state.to.set(data.value)
}

function setAmount(state, data) {
  state.amount.set(data.value)
}