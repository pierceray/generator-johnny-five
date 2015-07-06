module.exports = {
  files: [
    'Gruntfile.js',
    'grunt/**/*.js',
    'generators/**/*.js',
    //blacklist
    '!**/node_modules/**',
    '!**/templates/**'
  ],
  options: {
    jshintrc: true,
    reporter: require('jshint-stylish')
  }

};
