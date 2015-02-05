var h = require('virtual-dom/virtual-hyperscript')
var action = require('value-event/event')
var stateExtend = require('../mercury').stateExtend

var IdentityManagement = require('../identity-management/index.js')
var SendEthereum = require('../send-eth/index.js')


module.exports = render


function render(state) {

  // var identityState = stateExtend(state.identityManagement, {
  //   currentIdentity: state.currentIdentity,
  //   identities: state.identities,
  //   channels: {
  //     newIdentity: state.channels.newIdentity,
  //     setCurrentIdentity: state.channels.setCurrentIdentity,
  //   }
  // })

  // var sendEthereumState = stateExtend(state.sendEthereum, {
  //   currentIdentity: state.currentIdentity,
  //   channels: {
  //     sendEthereum: state.channels.sendEthereum,
  //   }
  // })

  return h('div', [
    h('span', 'im the wallet?')
    // section('left', IdentityManagement.render(identityState)),
    // section('right', SendEthereum.render(sendEthereumState)),
  ])
}


function section(type, content) {
  return h('div', content)
}