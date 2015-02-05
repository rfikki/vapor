var h = require('virtual-dom/virtual-hyperscript')
var action = require('value-event/event')

module.exports = render


function render(state) {
  return h('div', [
    h('span', 'whats in your wallet?')
  ])
}


function section(type, content) {
  return h('div', content)
}