'use strict'

module.exports = {
  options: {
    fix: true
  },
  all: [
    'Gruntfile.js',
    'grunt/**/*.js',
    'generators/**/*.js',
    //blacklist
    '!**/node_modules/**',
    '!**/templates/**'
  ]
}
