var Component = require('../mercury.js').Component
var Value = require('observ')
var Wallet = require('../wallet/index.js')
var render = require('./render.js')

module.exports = Component({
  currentView: { type: Value,  default: 'wallet' },
  wallet:      { type: Wallet, default: null     },

  channels: {
    test: test,
  },
}, render)

function test(state) {
  debugger
}