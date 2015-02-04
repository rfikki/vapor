var extend = require('xtend')
var val = require('observ')
var setupComponent = require('../mercury.js').state
var render = require('./render.js')

module.exports = Main


Main.render = render

function Main() {

  var defaultState = {
    currentView: val(null),

    channels: {},
  }

  var copy = extend(defaultState)
  var state = setupComponent(copy)
  return state

}