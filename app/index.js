var App = require('./mercury.js').app
var rafListen = require('./mercury.js').rafListen
var Main = require('./main/index.js')

const LOCAL_STORAGE_KEY = 'vapor@0'

// load state from localStorage
var storedState = localStorage.getItem(LOCAL_STORAGE_KEY)
var initialState = storedState ? JSON.parse(storedState) : null
console.log('loaded:', initialState)

var app = window.app = Main(initialState)

// save on throttled change event
rafListen(app, function onChange(value) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value))
  console.log('saved:', JSON.parse(JSON.stringify(value)))
})

// start app
App(document.body, app, Main.render)
console.log('app started.')