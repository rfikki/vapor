var Component = require('../mercury.js').Component
var Value = require('observ')
var render = require('./render.js')

module.exports = Component({

  address:  { type: Value,  default: '0x1234' },
  balance:  { type: Value,  default: 0        },

  channels: {},

}, render)