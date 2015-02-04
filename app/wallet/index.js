var extend = require('xtend')
var val = require('observ')
var array = require('observ-array')
var setupComponent = require('../mercury.js').state
var render = require('./render.js')
var SendEthereum = require('../send-eth/index.js')
var IdentityManagement = require('../identity-management/list/index.js')
var Identity = require('../identity-management/identity/index.js')

module.exports = Wallet


Wallet.render = render

function Wallet() {

  var defaultState = {
    identityManagement: IdentityManagement(),
    sendEthereum: SendEthereum(),
    currentIdentity: val(null),
    identities: array([]),

    channels: {
      setCurrentIdentity: setCurrentIdentity,
      newIdentity: newIdentity,
    },
  }

  var copy = extend(defaultState)
  var state = setupComponent(copy)
  return state

}

function setCurrentIdentity(state, identity) {
  state.currentIdentity.set(identity)
}

function newIdentity(state){
  var newWallet = Identity()
  state.identities.push(newWallet)
}