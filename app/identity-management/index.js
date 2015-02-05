var Component = require('../mercury.js').Component
var Value = require('observ')
var ObsArray = require('observ-array')
var Identity = require('../identity/index.js')
var render = require('./render.js')

module.exports = Component({

  identities: { type: ObsArray,  default: [] },

  channels: {
    newIdentity: newIdentity,
  },

}, render)


function newIdentity(state){
  var newWallet = Identity()
  state.identities.push(newWallet)
}