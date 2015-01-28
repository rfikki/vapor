var State = require('./state.js')
var View = require('./view.js')
var Controller = require('./controller.js')

module.exports = WalletComponent


function WalletComponent() {

  this.state = State()
  this.view = View
  this.controller = channels(Controller, this.state)

}

// base class

var proto = WalletComponent.prototype

proto.render = function(){
  return this.view(this.state, this.controller)
}



// utils
var Delegator = require('dom-delegator')



function channels(funcs, context) {
  return Object.keys(funcs).reduce(createHandle, {})

  function createHandle(acc, name) {
    var handle = Delegator.allocateHandle(
      funcs[name].bind(null, context)
    )

    acc[name] = handle
    return acc
  }
}