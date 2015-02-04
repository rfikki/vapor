var extend = require('xtend')
var val = require('observ')
var setupComponent = require('../mercury.js').state
var render = require('./render.js')
var Wallet = require('../wallet/index.js')

module.exports = Main


Main.render = render

function Main() {

  var defaultState = {
    currentView: val(null),
    wallet: Wallet(),

    channels: {},
  }

  var copy = extend(defaultState)
  var state = setupComponent(copy)
  return state

}