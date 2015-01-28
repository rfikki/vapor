var h = require('virtual-dom/virtual-hyperscript')
var valueEvent = require('value-event/event')
var controller = require('./controller.js')

module.exports = render


function render(state){
  return h('div.counter', [
      'The state ', h('code', 'clickCount'),
      ' has value: ' + state.clickCount() + '.',
      h('input.button', {
          type: 'button',
          value: 'Click me!',
          'ev-click': action(controller.clicks, state),
      })
  ]);
}


// util

function action(handler, state){
  return valueEvent(handler.bind(null, state))
}

