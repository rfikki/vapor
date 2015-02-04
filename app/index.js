var app = require('./mercury.js').app

var Main = require('./main/index.js')

app(document.body, Main(), Main.render)

console.log('app started.')