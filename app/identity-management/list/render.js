var h = require('virtual-dom/virtual-hyperscript')
var action = require('value-event/event')

var Identity = require('../identity/index.js')


module.exports = render


function render(state){
  return h('div.counter', [
    'You have ' + state.identities.length + ' identities.',
    h('input.button', {
      type: 'button',
      value: 'new identity',
      'ev-click': action(state.channels.newIdentity, state),
    }),

    h('ul', state.identities.map(function(identityState){
      return h('li', [
        Identity.render(identityState),
        button(state.channels.setCurrentIdentity, identityState, 'select')
      ])
    })),
  ])
}

function button(channel, context, content){
  return h('button', {
    'ev-click': action(channel, context)
  }, content)
}