var h = require('virtual-dom/virtual-hyperscript')
var action = require('value-event/event')

var Identity = require('../identity/index.js')


module.exports = render


function render(state){
  return h('div.counter', [
    'You have ' + state.identities.length + ' identities.',
    button(state.channels.newIdentity, state, 'new'),
    h('ul', state.identities.map(function(identityState){
      return h('li', Identity.render(identityState))
    })),
  ])
}

function button(channel, context, content){
  return h('button', {
    'ev-click': action(channel, context)
  }, content)
}