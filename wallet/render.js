var h = require('virtual-dom/virtual-hyperscript')
var action = require('value-event/event')

module.exports = render


function render(state){
  return h('div.counter', [
      'wallet: ' + state.balance + ' ETH',
      h('input.button', {
          type: 'button',
          value: 'moar!',
          'ev-click': action(state.channels.moreMoney),
      })
  ])
}





