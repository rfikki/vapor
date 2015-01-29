var extend = require('xtend')
var val = require('observ')
var array = require('observ-array')
var setupComponent = require('../mercury.js').state

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