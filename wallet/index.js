var val = require('observ')
var extend = require('xtend')


module.exports = WalletComponent


function WalletComponent() {

  var defaultState = {
    balance: val(0),

    channels: {
      moreMoney: moreMoney,
    },
  }

  var copy = extend(defaultState)
  var state = setupComponent(copy)

  return state

}


function moreMoney(state){
  state.balance.set(state.balance() + 1)
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