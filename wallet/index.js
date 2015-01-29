var val = require('observ')
var extend = require('xtend')
var setupComponent = require('../mercury.js').state


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