var Component = require('../mercury.js').Component
var Value = require('observ')
var Wallet = require('../wallet/index.js')
var IdentityManagement = require('../identity-management/index.js')
var SendEth = require('../send-eth/index.js')
var render = require('./render.js')

module.exports = Component({
  currentView: { type: Value,              default: 'wallet'  },
  wallet:      { type: Wallet,             default: null      },
  idMgmt:      { type: IdentityManagement, default: null      },
  sendEth:     { type: SendEth,            default: null      },

  channels: {
    setCurrentView: setCurrentView,
  },
}, render)

function setCurrentView(state, value) {
  state.currentView.set(value)
}