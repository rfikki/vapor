var extend = require('xtend')
var val = require('observ')
var array = require('observ-array')

var WalletComponent = require('../wallet/index.js')

module.exports = setupState


function setupState() {

  var defaultState = {
    wallets: array([]),

    channels: {
      newIdentity: newIdentity,
    }
  }

  var copy = extend(defaultState)
  var state = setupComponent(copy)
  return state

}

function newIdentity(state){
  var newWallet = WalletComponent()
  state.wallets.push(newWallet)
}


// util -- from mercury itself
var Delegator = require('dom-delegator')
var observStruct = require('observ-struct')

function setupComponent(obj) {
    var copy = extend(obj)
    var $channels = copy.channels
    var $handles = copy.handles

    if ($channels) {
        copy.channels = val(null)
    } else if ($handles) {
        copy.handles = val(null)
    }

    var observ = observStruct(copy)
    if ($channels) {
        observ.channels.set(channels($channels, observ))
    } else if ($handles) {
        observ.handles.set(channels($handles, observ))
    }
    return observ
}

function channels(funcs, context) {
    return Object.keys(funcs).reduce(createHandle, {})

    function createHandle(acc, name) {
        var handle = Delegator.allocateHandle(
            funcs[name].bind(null, context))

        acc[name] = handle
        return acc
    }
}