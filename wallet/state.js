var observStruct = require('observ-struct')
var val = require('observ')
var extend = require('xtend')


module.exports = setupState

window.allStates = allStates = []

function setupState() {

  var defaultState = {
    clickCount: val(0),
  }

  var copy = extend(defaultState);
  var state = observStruct(copy);

  allStates.push(state)

  return state

}