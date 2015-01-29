var h = require('virtual-dom/virtual-hyperscript')
var action = require('value-event/event')

var WalletView = require('../wallet/render.js')


module.exports = render


function render(state){
  return h('div.counter', [
      'You have ' + state.wallets.length + ' wallets.',
      h('input.button', {
          type: 'button',
          value: 'new identity',
          'ev-click': action(state.channels.newIdentity, state),
      }),
      h('ul', state.wallets.map(function(walletState){
        return h('li', WalletView(walletState))
      })),
  ])
}