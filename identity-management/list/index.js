var extend = require('xtend')
var val = require('observ')
var array = require('observ-array')
var setupComponent = require('../../mercury.js').state
var render = require('./render.js')

module.exports = IdentityList


IdentityList.render = render

function IdentityList() {

  var defaultState = {
    channels: {},
  }

  var copy = extend(defaultState)
  var state = setupComponent(copy)
  return state

}