var app = require('./mercury.js').app

var Wallet = require('./wallet/index.js')

app(document.body, Wallet(), Wallet.render)

console.log('app started.')