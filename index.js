var app = require('./mercury.js').app

var IdentityManagerComponent = require('./identities/index.js')
var IdentityManagerView = require('./identities/render.js')

app(document.body, IdentityManagerComponent(), IdentityManagerView)



// var mainLoop = require('main-loop')
// var Delegator = require('dom-delegator')
// var extend = require('xtend')
// var vdomDiff = require('virtual-dom/vtree/diff')
// var vdomPatch = require('virtual-dom/vdom/patch')
// var vdomCreate = require('virtual-dom/vdom/create-element')

// function app(elem, state, render, opts) {

//   Delegator(opts)

//   var config = extend({
//     create: vdomCreate,
//     diff: vdomDiff,
//     patch: vdomPatch,
//   }, opts)

//   var loop = mainLoop(state(), render, config)
//   if (elem) elem.appendChild(loop.target)
//   return state(loop.update)
// }