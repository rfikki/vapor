var Component = require('../mercury.js').Component
var Value = require('observ')
var ObsArray = require('observ-array')
var SendEthereum = require('../send-eth/index.js')
var IdentityManagement = require('../identity-management/index.js')
var render = require('./render.js')

module.exports = Component({

  identityManagement:   { type: IdentityManagement, default: null },
  sendEthereum:         { type: SendEthereum,       default: null },
  currentIdentity:      { type: Value,              default: null },

  channels: {
    setCurrentIdentity: setCurrentIdentity,
  },

}, render)

function setCurrentIdentity(state, identity) {
  state.currentIdentity.set(identity)
}

