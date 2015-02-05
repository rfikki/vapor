var h = require('virtual-dom/virtual-hyperscript')
var action = require('value-event/event')
var extend = require('xtend')
var Router = require('../mercury.js').Router
var anchor = require('../mercury.js').anchor
var Wallet = require('../wallet/index.js')
var SendEth = require('../send-eth/index.js')
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
  { label: 'Identities', route: '/identities' },
  { label: 'Wallet', route: '/wallet' },
  { label: 'Transfer', route: '/transfer' },
]

function controlPanel(state) {
  var currentRoute = Router.currentRoute()
  // add option for each subview
  var content = subviews.map(function(subview){
    // use bold tag for active subview
    var className = (currentRoute === subview.route) ? 'bold' : ''
    return anchor({ className: className, href: subview.route }, subview.label)
  })
  // add panel label to front of content
  content.unshift(h('pre', 'CONTROL PANEL'))
  return panel(content)
}

function dappContent(state) {
  var currentView

  switch(Router.currentRoute()) {

    case '/identities':
      currentView = IdentityManagement.render(state.idMgmt)
      break

    case '/wallet':
      currentView = Wallet.render(state.wallet)
      break

    case '/transfer':
      currentView = SendEth.render(state.sendEth)
      break
  }

  return panel([
    h('pre', 'DAPP RUNTIME ENVIRONMENT'),
    currentView,
  ])
}


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