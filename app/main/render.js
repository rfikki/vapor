var h = require('virtual-dom/virtual-hyperscript')
var action = require('value-event/event')
var extend = require('xtend')

var Wallet = require('../wallet/index.js')


module.exports = render


function render(state) {
  return h('div.vertical-container', [
    fullRow('.top-nav-section', headNav(state)),
    row('.grow-vertical', [
      h('div.side-control-section', controlPanel(state)),
      h('div.main-content-section.col-xs', dappContent(state)),
    ]),
  ])
}

function headNav(state) {
  return panel(h('pre', 'VAPOR VAPOR VAPOR'))
}

function controlPanel(state) {
  return panel(h('pre', 'CONTROL PANEL'))
}

function dappContent(state) {
  return panel([
    h('pre', 'DAPP RUNTIME ENVIRONMENT'),
    Wallet.render(state.wallet),
  ])
}

//

function panel(content) {
  return h('div.panel', content)
}

function fullRow(className, content) {
  return row(className, col(12, content))
}

function row(className, content) {
  return h('div.row'+className, content)
}

function col(width, content) {
  var className = '.col-xs' + (width ? '-'+width : '')
  return h('div'+className, content)
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