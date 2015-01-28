var h = require('virtual-dom/virtual-hyperscript')
var action = require('value-event/event')
var WalletView = require('../wallet/view')

module.exports = render


function render(state, controller){
  return h('div.counter', [
      'You have ' + state.wallets().length
      + ' wallets.',
      h('input.button', {
          type: 'button',
          value: 'new identity',
          'ev-click': action(controller.newIdentity),
      }),
      h('ul', state.wallets.map(function(walletState){
        console.log('rendering wallet:', walletState())
        debugger
        return h('li', WalletView(walletState))
      })()),
  ]);
}

