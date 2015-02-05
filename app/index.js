var App = require('./mercury.js').App
var Router = require('./mercury.js').Router
var rafListen = require('./mercury.js').rafListen
var Main = require('./main/index.js')

const LOCAL_STORAGE_KEY = 'vapor@0'

// load state from localStorage
var storedState = localStorage.getItem(LOCAL_STORAGE_KEY)
var initialState = storedState ? JSON.parse(storedState) : null

var app = window.app = Main(initialState)

// save on throttled change event
rafListen(app, function onChange(value) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value))
})

// start app
App(document.body, app, Main.render)


// for debug
window.require = require