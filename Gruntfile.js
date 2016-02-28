'use strict';
module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-config')(grunt, {
    loadGruntTasks: {
      pattern: ['grunt-*', 'gruntify-*'],
      config: require('./package.json'),
      scope: 'devDependencies'
    }
  });
};
