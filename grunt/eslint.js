'use strict'

module.exports = {
  all: [
    'Gruntfile.js',
    'grunt/**/*.js',
    'generators/**/*.js',
    //blacklist
    '!**/node_modules/**',
    '!**/templates/**'
  ]
}
