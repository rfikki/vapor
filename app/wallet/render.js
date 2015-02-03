var h = require('virtual-dom/virtual-hyperscript')
var action = require('value-event/event')
var extend = require('xtend')

var IdentityManagement = require('../identity-management/list/index.js')
var SendEthereum = require('../send-eth/index.js')


module.exports = render


function render(state) {

  var identityState = stateExtend(state.identityManagement, {
    currentIdentity: state.currentIdentity,
    identities: state.identities,
    channels: {
      newIdentity: state.channels.newIdentity,
    }
  })

  var sendEthereumState = stateExtend(state.sendEthereum, {
    currentIdentity: state.currentIdentity,
    channels: {
      newIdentity: state.channels.newIdentity,
      sendEthereum: state.channels.sendEthereum,
    }
  })

  return h('div', [
    section('left', IdentityManagement.render(identityState)),
    section('right', SendEthereum.render(sendEthereumState)),
  ])
}


function section(type, content) {
  return h('div', content)
}

// util

function stateExtend() {
  var newState = extend.apply(null, arguments)
  var channelArguments = [].slice.apply(arguments)
    .map(function(item){ return item.channels })
    .filter(function(item){ return !!item })
  newState.channels = extend.apply(null, channelArguments)
  return newState
}