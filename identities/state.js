var observStruct = require('observ-struct')
var extend = require('xtend')
var val = require('observ')
var array = require('observ-array')


module.exports = setupState


var defaultState = {
  wallets: array([]),
}

function setupState() {

  var copy = extend(defaultState);
  var state = observStruct(copy);
  return state

}