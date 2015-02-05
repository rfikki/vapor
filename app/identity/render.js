var h = require('virtual-dom/virtual-hyperscript')
var action = require('value-event/event')

module.exports = render


function render(state){
  return h('span', 'Bob Bogus')
}
