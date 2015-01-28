var WalletComponent = require('../wallet/index.js')

module.exports = {

  newIdentity: function(state){
    var newWallet = new WalletComponent()
    state.wallets.push(newWallet.state)
  },

}