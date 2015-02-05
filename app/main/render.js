var h = require('virtual-dom/virtual-hyperscript')
var action = require('value-event/event')
var extend = require('xtend')
var stateExtend = require('../mercury.js').stateExtend
var Wallet = require('../wallet/index.js')
var IdentityManagement = require('../identity-management/index.js')


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

var subviews = [
  { label: 'Identities', name: 'identities' },
  { label: 'Wallet', name: 'wallet' },
  { label: 'Transfer', name: 'transfer' },
]

function controlPanel(state) {
  // add option for each subview
  var content = subviews.map(function(subview){
    // use bold tag for active subview
    var tag = state.currentView === subview.name ? 'b' : 'span'
    return h(tag, {
      'ev-click': action(state.channels.setCurrentView, subview.name)
    }, subview.label)
  })
  // add panel label to front of content
  content.unshift(h('pre', 'CONTROL PANEL'))
  return panel(content)
}

function dappContent(state) {
  var currentView
  switch(state.currentView) {

    case 'identities':
      currentView = IdentityManagement.render(state.idMgmt)
      break

    case 'wallet':
      currentView = Wallet.render(state.wallet)
      break
    // case 'transfer':
    //   currentView = Wallet.render(state.transfer)
    //   break
  }
  return panel([
    h('pre', 'DAPP RUNTIME ENVIRONMENT'),
    currentView,
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